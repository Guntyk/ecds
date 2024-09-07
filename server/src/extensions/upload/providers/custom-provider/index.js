const axios = require("axios").default;
const FormData = require("form-data");

module.exports = {
  init(providerOptions) {
    const { url, apiKey } = providerOptions; // Assuming apiKey or credentials might be needed

    return {
      // Method to upload files
      async upload(file) {
        const form = new FormData();
        form.append("file", file.stream || file.buffer, file.hash + file.ext);

        try {
          // Send file to Ukraine.com.ua external storage
          const response = await axios.post(`${url}/upload`, form, {
            headers: {
              ...form.getHeaders(),
            },
          });

          // Set the file URL in Strapi
          file.url = `${url}/uploads/${file.hash}${file.ext}`;
        } catch (error) {
          console.error("Upload Error:", error);
          throw new Error("File upload failed.");
        }
      },

      // Method to delete files
      async delete(file) {
        try {
          await axios.delete(`${url}/uploads/${file.hash}${file.ext}`, {
            headers: {
              Authorization: `Bearer ${apiKey}`, // Use this if authentication is required
            },
          });
        } catch (error) {
          console.error("Delete Error:", error);
          throw new Error("File deletion failed.");
        }
      },
    };
  },
};
