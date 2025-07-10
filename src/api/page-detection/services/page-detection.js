'use strict';

/**
 * page-detection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::page-detection.page-detection', ({ strapi }) => ({
  
  // Find pages that need SEO analysis
  async findPagesNeedingAnalysis() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return await strapi.entityService.findMany('api::page-detection.page-detection', {
      filters: {
        $or: [
          { lastAnalyzed: { $null: true } },
          { lastAnalyzed: { $lt: oneWeekAgo.toISOString() } },
          { seoScore: { $lt: 60 } }
        ],
        status: 'active',
        needsSEO: true
      },
      sort: { detectedAt: 'desc' }
    });
  },

  // Get SEO statistics
  async getSeoStatistics() {
    const allPages = await strapi.entityService.findMany('api::page-detection.page-detection', {
      filters: { status: 'active' }
    });

    const stats = {
      total: allPages.length,
      analyzed: allPages.filter(p => p.lastAnalyzed).length,
      needsAnalysis: allPages.filter(p => !p.lastAnalyzed).length,
      goodSeo: allPages.filter(p => p.seoScore >= 80).length,
      warningSeo: allPages.filter(p => p.seoScore >= 60 && p.seoScore < 80).length,
      criticalSeo: allPages.filter(p => p.seoScore < 60).length,
      byType: {},
      byCategory: {}
    };

    // Group by type
    allPages.forEach(page => {
      stats.byType[page.type] = (stats.byType[page.type] || 0) + 1;
    });

    // Group by category
    allPages.forEach(page => {
      stats.byCategory[page.category] = (stats.byCategory[page.category] || 0) + 1;
    });

    return stats;
  },

  // Sync page data from external source
  async syncPageData(pageData) {
    try {
      const existingPage = await strapi.entityService.findMany('api::page-detection.page-detection', {
        filters: { path: pageData.path }
      });

      if (existingPage.length > 0) {
        return await strapi.entityService.update('api::page-detection.page-detection', existingPage[0].id, {
          data: {
            ...pageData,
            detectedAt: new Date().toISOString()
          }
        });
      } else {
        return await strapi.entityService.create('api::page-detection.page-detection', {
          data: {
            ...pageData,
            detectedAt: new Date().toISOString()
          }
        });
      }
    } catch (error) {
      strapi.log.error('Error syncing page data:', error);
      throw error;
    }
  },

  // Get pages by category with SEO status
  async getPagesByCategory(category) {
    return await strapi.entityService.findMany('api::page-detection.page-detection', {
      filters: {
        category: category,
        status: 'active'
      },
      sort: { detectedAt: 'desc' }
    });
  },

  // Update SEO data for a page
  async updateSeoData(pageId, seoData) {
    return await strapi.entityService.update('api::page-detection.page-detection', pageId, {
      data: {
        ...seoData,
        lastAnalyzed: new Date().toISOString()
      }
    });
  }

})); 