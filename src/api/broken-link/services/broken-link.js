'use strict';

/**
 * broken-link service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::broken-link.broken-link');
