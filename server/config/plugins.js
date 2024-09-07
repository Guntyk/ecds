const { env } = require("@strapi/utils");

module.exports = () => ({
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
    },
  },
  placeholder: {
    enabled: true,
    config: {
      size: 32,
    },
  },
  upload: {
    config: {
      provider: "local",
      providerOptions: {
        sizeLimit: 1000000000,
      },
    },
  },
});
