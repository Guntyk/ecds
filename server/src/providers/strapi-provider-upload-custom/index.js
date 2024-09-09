const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  init(providerOptions) {
    this.uploadUrl =
      providerOptions.uploadUrl || "https://d0c7f715738e1445.cdn.express/";

    return {
      async upload(file) {
        const form = new FormData();
        form.append("file", file.buffer, {
          filename: file.name,
          contentType: file.mime,
        });

        try {
          const response = await axios.post(this.uploadUrl, form, {
            headers: {
              ...form.getHeaders(),
            },
          });

          return {
            url: response.data.url,
          };
        } catch (err) {
          throw new Error(`Failed to upload file: ${err.message}`);
        }
      },

      async uploadStream(file) {
        const form = new FormData();
        form.append("file", file.stream, {
          filename: file.name,
          contentType: file.mime,
        });

        try {
          const response = await axios.post(this.uploadUrl, form, {
            headers: {
              ...form.getHeaders(),
            },
          });

          return {
            url: response.data.url,
          };
        } catch (err) {
          throw new Error(`Failed to upload stream: ${err.message}`);
        }
      },

      async delete(file) {
        const deleteUrl = `${this.uploadUrl}/${file.key}`;

        try {
          await axios.delete(deleteUrl);
        } catch (err) {
          throw new Error(`Failed to delete file: ${err.message}`);
        }
      },
    };
  },
};
