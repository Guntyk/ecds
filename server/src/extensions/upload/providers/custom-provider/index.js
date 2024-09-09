const axios = require("axios").default;

module.exports = {
  init(providerOptions) {
    return {
      upload(file) {
        return new Promise((resolve, reject) => {
          axios
            .post(providerOptions.url, {
              file: file.buffer.toString("base64"),
              filename: file.hash,
              mime: file.mime,
            })
            .then((response) => {
              file.url = `${providerOptions.url}/${file.hash}`;
              resolve();
            })
            .catch((err) => reject(err));
        });
      },

      delete(file) {
        return new Promise((resolve, reject) => {
          axios
            .delete(`${providerOptions.url}/${file.hash}`)
            .then(() => resolve())
            .catch((err) => reject(err));
        });
      },
    };
  },
};
