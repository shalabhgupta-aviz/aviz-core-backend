'use strict';

/**
 * content-calendar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::content-calendar.content-calendar');
