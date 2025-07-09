'use strict';

/**
 * seo-audit service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::seo-audit.seo-audit');
