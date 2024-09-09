const { env } = require("@strapi/utils");

module.exports = () => ({
  upload: {
    provider: "custom-provider",
    providerOptions: {
      url: env("STORAGE_URL", "https://d0c7f715738e1445.cdn.express"),
    },
  },
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
});
