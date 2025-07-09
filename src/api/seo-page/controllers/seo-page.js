'use strict';

/**
 * seo-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::seo-page.seo-page', ({ strapi }) => ({
  // Get SEO data for a specific page URL
  async getByUrl(ctx) {
    const { url } = ctx.params;
    
    try {
      const seoPage = await strapi.entityService.findMany('api::seo-page.seo-page', {
        filters: { page_url: url, is_active: true },
        populate: ['og_image', 'page_thumbnail']
      });
      
      return seoPage[0] || null;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Get all SEO pages with pagination
  async getAll(ctx) {
    const { page = 1, pageSize = 10, search = '' } = ctx.query;
    
    try {
      const filters = { is_active: true };
      if (search) {
        filters.$or = [
          { page_title: { $containsi: search } },
          { page_url: { $containsi: search } }
        ];
      }

      const seoPages = await strapi.entityService.findMany('api::seo-page.seo-page', {
        filters,
        populate: ['og_image', 'page_thumbnail'],
        pagination: {
          page: parseInt(page),
          pageSize: parseInt(pageSize)
        },
        sort: { updatedAt: 'desc' }
      });

      return seoPages;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Update SEO score for a page
  async updateScore(ctx) {
    const { id } = ctx.params;
    const { seo_score, last_audit } = ctx.request.body;
    
    try {
      const updatedPage = await strapi.entityService.update('api::seo-page.seo-page', id, {
        data: {
          seo_score,
          last_audit: last_audit || new Date()
        }
      });
      
      return updatedPage;
    } catch (error) {
      ctx.throw(500, error);
    }
  },

  // Bulk update SEO data
  async bulkUpdate(ctx) {
    const { pages } = ctx.request.body;
    
    try {
      const results = [];
      for (const page of pages) {
        const result = await strapi.entityService.update('api::seo-page.seo-page', page.id, {
          data: page.data
        });
        results.push(result);
      }
      
      return results;
    } catch (error) {
      ctx.throw(500, error);
    }
  }
})); 