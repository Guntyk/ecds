const axios = require("axios");
const FormData = require("form-data");

let authToken = null;

async function getAuthToken(username, password) {
  try {
    const response = await axios.post(
      "https://d0c7f715738e1445.cdn.express/~/action/storage/auth/login/",
      {
        username: username,
        password: password,
      }
    );
    console.log(response.data);
    authToken = response.data.callback.token;
  } catch (error) {
    console.error("Failed to get auth token:", error.message);
    throw error;
  }
}

async function uploadFile(file, path) {
  try {
    if (!authToken) {
      throw new Error(
        "Auth token is not available. Please authenticate first."
      );
    }

    const formData = new FormData();
    formData.append("file", file.buffer, { filename: file.name });
    formData.append("path", path);

    const response = await axios.post(
      "https://d0c7f715738e1445.cdn.express/~/upload",
      formData,
      {
        headers: {
          "Storage-Token": authToken,
          ...formData.getHeaders(),
        },
      }
    );

    return { ...file, url: response.data.url };
  } catch (error) {
    console.error("Failed to upload file:", error.message);
    throw error;
  }
}

module.exports = {
  init(providerOptions) {
    const { username, password } = providerOptions;

    getAuthToken(username, password);

    return {
      async upload(file) {
        return uploadFile(file, "/");
      },

      async delete(file) {
        try {
          if (!authToken) {
            throw new Error(
              "Auth token is not available. Please authenticate first."
            );
          }

          await axios.post(
            "https://d0c7f715738e1445.cdn.express/~/action/storage/manage/delete/",
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
