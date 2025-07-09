'use strict';

/**
 * seo-page router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

const defaultRouter = createCoreRouter('api::seo-page.seo-page');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: 'GET',
    path: '/seo-pages/url/:url',
    handler: 'api::seo-page.seo-page.getByUrl',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'GET',
    path: '/seo-pages/all',
    handler: 'api::seo-page.seo-page.getAll',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'PUT',
    path: '/seo-pages/:id/score',
    handler: 'api::seo-page.seo-page.updateScore',
    config: {
      policies: [],
      middlewares: [],
    },
  },
  {
    method: 'PUT',
    path: '/seo-pages/bulk-update',
    handler: 'api::seo-page.seo-page.bulkUpdate',
    config: {
      policies: [],
      middlewares: [],
    },
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes); 