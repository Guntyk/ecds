module.exports = {
  settings: {
    logger: {
      level: "info",
    },
    errors: {
      stack: false,
    },
    security: {
      headers: {
        contentSecurityPolicy: false,
      },
    },
    cors: {
      enabled: true,
      origin: "http://185.25.117.139/",
    },
    poweredBy: {
      enabled: false,
    },
    query: {
      limit: 10000,
    },
    body: {
      multiparty: true,
    },
    session: {
      enabled: true,
      name: "strapi.sid",
      secret: process.env.APP_KEYS,
      rolling: true,
      cookie: {
        maxAge: 86400000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      },
    },
    favicon: {
      path: "./public/favicon.ico",
    },
    public: {
      path: "./public",
    },
  },
};
