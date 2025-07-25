// config/server.js
module.exports = ({ env }) => ({
  url: 'https://api.aviznetworks.com',  // Change to production URL
  host: '0.0.0.0',
  port: 1338,
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  admin: {
    url: '/admin',  // Ensure admin path is set
    serveAdminPanel: true,
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
  // ✅ Add this:
  allowedHosts: ['api.aviznetworks.com', 'localhost', 'localhost:1338'],
});
