module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'", "https:"],
          "script-src": ["'self'", "https:"],
          "style-src": ["'self'", "https:", "'unsafe-inline'"],
          "img-src": ["'self'", "data:", "blob:", "https://euro-dance.org"],
          "connect-src": [
            "'self'",
            "https:",
            "http://localhost:1337",
            "ws:",
            "wss:",
            "http://euro-dance.org",
            "https://euro-dance.org",
          ],
          "frame-ancestors": [
            "'self'",
            "http://euro-dance.org",
            "https://euro-dance.org",
          ],
          "media-src": ["'self'", "data:", "blob:"],
          "object-src": ["'none'"],
          "upgrade-insecure-requests": [],
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      enabled: true,
      origin: [
        "http://localhost:1337",
        "http://euro-dance.org",
        "https://euro-dance.org",
      ],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      headers: ["Content-Type", "Authorization", "Origin", "Accept"],
      keepHeaderOnError: true,
      credentials: true,
    },
  },
  "strapi::poweredBy",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
