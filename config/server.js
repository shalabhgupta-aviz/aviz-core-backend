// config/server.js
module.exports = ({ env }) => ({
  // url: 'https://api.aviznetworks.com',
  url: 'http://localhost:1338',
  host: '0.0.0.0',
  port: 1338,
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // ✅ Add this:
  allowedHosts: ['api.aviznetworks.com', 'localhost', 'localhost:1338'],
});
