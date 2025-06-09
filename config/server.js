// config/server.js
module.exports = ({ env }) => ({
  url: 'https://api.aviznetworks.com',
  host: '0.0.0.0',
  port: 1337,
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  // ✅ Add this:
  allowedHosts: ['api.aviznetworks.com', 'localhost'],
});
