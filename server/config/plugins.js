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
});
