module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
  {
    name: 'strapi::cors',
    config: {
      origin: ['http://localhost:8000', 'https://api.aviznetworks.com'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true, // only if your frontend sends cookies or auth
    },
  },
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http://localhost:8000'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://api.aviznetworks.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://api.aviznetworks.com'],
        },
      },
    },
  },
];