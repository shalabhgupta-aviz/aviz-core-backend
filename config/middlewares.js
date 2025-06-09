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
      origin: ['*'], // or specify your frontend URL
      headers: '*',
    },
  },
{
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https://api.aviznetworks.com'],
          'media-src': ["'self'", 'data:', 'blob:', 'https://api.aviznetworks.com'],
        },
      },
  
    },
  },
];
