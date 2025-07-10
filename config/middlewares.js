module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',

  // ✅ CORS must come BEFORE security in order to work properly
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000',
        'http://localhost:8000',
        'https://api.aviznetworks.com',
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      credentials: true,
    },
  },

  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': [
            "'self'",
            'https:',
            'http://localhost:3000',
            'http://localhost:8000',
            'https://api.aviznetworks.com',
          ],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'https://api.aviznetworks.com',
            'http://localhost:3000',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'https://api.aviznetworks.com',
            'http://localhost:3000',
          ],
          'frame-src': [
            "'self'",
            'https://api.aviznetworks.com',
            'http://localhost:3000',
          ],
        },
      },
    },
  },
];
