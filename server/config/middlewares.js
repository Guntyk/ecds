module.exports = [
  "strapi::logger",
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          "default-src": ["'self'", "https:", "http:"],
          "script-src": ["'self'", "https:", "http:", "'unsafe-inline'"],
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
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: "strapi::cors",
    config: {
      origin: [
        "http://localhost:3000",
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
