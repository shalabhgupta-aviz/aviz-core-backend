'use strict';

/**
 * broken-link router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::broken-link.broken-link');
