const axios = require("axios");
const crypto = require("crypto");
const streamifier = require("streamifier");
const mime = require("mime-types");
const FormData = require("form-data");

let authToken = null;
let validUntil = null;

async function getAuthToken(url, username, password) {
  try {
    const response = await axios.post(`${url}/~/action/storage/auth/login/`, {
      username: username,
      password: password,
    });
    authToken = response.data.callback.token;
    validUntil = new Date(response.data.callback.valid_until);
    console.log(validUntil);
    console.log(new Date() >= validUntil);
  } catch (error) {
    console.error("Failed to get auth token:", error.message);
    throw error;
  }
}

function isTokenExpired() {
  if (!validUntil) return true;
  return new Date() >= validUntil;
}

async function ensureValidToken(url, username, password) {
  if (isTokenExpired()) {
    console.log("Auth token expired, re-authenticating...");
    await getAuthToken(url, username, password);
  }
}

async function getAllStoredFiles(url) {
  try {
    await ensureValidToken();

    const response = await axios.post(
      `${url}/~/action/storage/manage/ls/`,
      { path: "/" },
      {
        headers: { "Storage-Token": authToken },
      }
    );
    return response.data.callback;
  } catch (error) {
    console.error("Failed to get remote URL:", error.message);
    throw error;
  }
}

module.exports = {
  init(providerOptions) {
    const { url, username, password } = providerOptions;
    getAuthToken(url, username, password);

    return {
      async upload(file) {
        try {
          await ensureValidToken(url, username, password);

          const readStream = streamifier.createReadStream(file.buffer);
          const formData = new FormData();
          formData.append("file", readStream, { filename: file.name });
          formData.append("path", "/");

          const uploadResponse = await axios.post(`${url}/~/upload`, formData, {
            headers: {
              "Storage-Token": authToken,
              ...formData.getHeaders(),
            },
          });

          if (uploadResponse.status === 200) {
            const remoteFiles = await getAllStoredFiles(url);
            const addedFile = remoteFiles.find(
              ({ name }) => name === file.name
            );

            if (addedFile) {
              const fileHash = crypto
                .createHash("md5")
                .update(file.name)
                .digest("hex");

              file.url = `${url}/${file.name}`;
              file.hash = fileHash;
              file.ext = `.${file.name.split(".").pop()}`;
              file.mime = mime.lookup(file.name);
              file.size = file.size;

              return file;
            } else {
              throw new Error(
                "File upload failed, file not found on remote server."
              );
            }
          }
        } catch (error) {
          console.error("Failed to upload file:", error.message);
          throw error;
        }
      },

      async delete(file) {
        try {
          await ensureValidToken(url, username, password);

          await axios.post(
            `${url}/~/action/storage/manage/delete/`,
            {
              path: "/",
              items: [file.name],
            },
            {
              headers: { "Storage-Token": authToken },
            }
          );
        } catch (error) {
          console.error("Failed to delete file:", error.message);
          throw error;
        }
      },
    };
  },
};
