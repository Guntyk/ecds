const axios = require("axios");
const crypto = require("crypto");
const FormData = require("form-data");

let authToken = null;

async function getAuthToken(url, username, password) {
  try {
    const response = await axios.post(`${url}/~/action/storage/auth/login/`, {
      username: username,
      password: password,
    });

    authToken = response.data.callback.token;
  } catch (error) {
    console.error("Failed to get auth token:", error.message);
    throw error;
  }
}

async function uploadFile(url, file, path) {
  try {
    if (!authToken) {
      throw new Error(
        "Auth token is not available. Please authenticate first."
      );
    }

    console.log(file);

    const formData = new FormData();
    formData.append("file", file.buffer, { filename: file.name });
    formData.append("path", path);

    const response = await axios.post(`${url}/~/upload`, formData, {
      headers: {
        "Storage-Token": authToken,
        ...formData.getHeaders(),
      },
    });

    if (response.status === 200) {
      const listResponse = await axios.post(
        `${url}/~/action/storage/manage/ls/`,
        { path: "/" },
        {
          headers: {
            "Storage-Token": authToken,
            ...formData.getHeaders(),
          },
        }
      );

      console.log(listResponse.data);

      if (listResponse.status === 200) {
        const uniqueId = crypto.randomUUID();
        return {
          id: uniqueId,
          name: file.name,
          url: `${url}/${file.name}`,
          size: file.size,
        };
      }
    }
  } catch (error) {
    console.error("Failed to upload file:", error.message);
    throw error;
  }
}

module.exports = {
  init(providerOptions) {
    const { url, username, password } = providerOptions;

    getAuthToken(url, username, password);

    return {
      async upload(file) {
        return uploadFile(url, file, "/");
      },

      async delete(file) {
        try {
          if (!authToken) {
            throw new Error(
              "Auth token is not available. Please authenticate first."
            );
          }

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
