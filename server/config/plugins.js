const { env } = require("@strapi/utils");

module.exports = () => {
  const isProduction = env("PRODUCTION") === "true";

  const config = {
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
  };

  if (isProduction) {
    config.upload = {
      enabled: true,
      config: {
        provider: "strapi-provider-upload-custom",
        providerOptions: {
          username: env("STORAGE_NAME"),
          password: env("STORAGE_PASSWORD"),
          url: env("STORAGE_URL"),
        },
      },
    };
  }

  return config;
};
