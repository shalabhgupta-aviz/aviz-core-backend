'use strict';

/**
 * page-detection controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::page-detection.page-detection', ({ strapi }) => ({
  
  // Custom create method to handle page detection from Gatsby
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      
      // Check if page already exists
      const existingPage = await strapi.entityService.findMany('api::page-detection.page-detection', {
        filters: {
          path: data.path
        }
      });

      let result;
      
      if (existingPage && existingPage.length > 0) {
        // Update existing page
        result = await strapi.entityService.update('api::page-detection.page-detection', existingPage[0].id, {
          data: {
            ...data,
            detectedAt: new Date().toISOString()
          }
        });
        
        ctx.send({
          data: result,
          message: 'Page updated successfully'
        });
      } else {
        // Create new page detection
        result = await strapi.entityService.create('api::page-detection.page-detection', {
          data: {
            ...data,
            detectedAt: new Date().toISOString()
          }
        });
        
        ctx.send({
          data: result,
          message: 'Page detected and created successfully'
        });
      }
      
    } catch (error) {
      console.error('Error in page detection:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Get all detected pages with SEO status
  async findWithSeoStatus(ctx) {
    try {
      const { query } = ctx;
      
      const pages = await strapi.entityService.findMany('api::page-detection.page-detection', {
        filters: query.filters || {},
        sort: query.sort || { detectedAt: 'desc' },
        populate: '*'
      });

      // Add SEO analysis status for each page
      const pagesWithSeoStatus = pages.map(page => ({
        ...page,
        seoStatus: this.calculateSeoStatus(page),
        needsAttention: this.needsAttention(page)
      }));

      ctx.send({
        data: pagesWithSeoStatus,
        meta: {
          total: pagesWithSeoStatus.length
        }
      });
      
    } catch (error) {
      console.error('Error fetching pages with SEO status:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Analyze SEO for a specific page
  async analyzeSeo(ctx) {
    try {
      const { id } = ctx.params;
      
      const page = await strapi.entityService.findOne('api::page-detection.page-detection', id);
      
      if (!page) {
        return ctx.throw(404, 'Page not found');
      }

      // Perform SEO analysis (mock implementation)
      const seoAnalysis = await this.performSeoAnalysis(page);
      
      // Update page with analysis results
      const updatedPage = await strapi.entityService.update('api::page-detection.page-detection', id, {
        data: {
          seoScore: seoAnalysis.score,
          lastAnalyzed: new Date().toISOString(),
          analysisResults: seoAnalysis.results,
          seoTitle: seoAnalysis.suggestions.title,
          seoDescription: seoAnalysis.suggestions.description
        }
      });

      ctx.send({
        data: updatedPage,
        analysis: seoAnalysis
      });
      
    } catch (error) {
      console.error('Error analyzing SEO:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Bulk analyze all pages
  async bulkAnalyzeSeo(ctx) {
    try {
      const pages = await strapi.entityService.findMany('api::page-detection.page-detection', {
        filters: {
          needsSEO: true,
          status: 'active'
        }
      });

      const results = [];
      
      for (const page of pages) {
        try {
          const seoAnalysis = await this.performSeoAnalysis(page);
          
          await strapi.entityService.update('api::page-detection.page-detection', page.id, {
            data: {
              seoScore: seoAnalysis.score,
              lastAnalyzed: new Date().toISOString(),
              analysisResults: seoAnalysis.results
            }
          });

          results.push({
            id: page.id,
            path: page.path,
            score: seoAnalysis.score,
            status: 'analyzed'
          });
          
        } catch (error) {
          results.push({
            id: page.id,
            path: page.path,
            status: 'error',
            error: error.message
          });
        }
      }

      ctx.send({
        message: 'Bulk SEO analysis completed',
        results: results,
        total: pages.length,
        analyzed: results.filter(r => r.status === 'analyzed').length,
        errors: results.filter(r => r.status === 'error').length
      });
      
    } catch (error) {
      console.error('Error in bulk SEO analysis:', error);
      ctx.throw(500, 'Internal Server Error');
    }
  },

  // Helper method to calculate SEO status
  calculateSeoStatus(page) {
    if (!page.lastAnalyzed) return 'pending';
    if (page.seoScore >= 80) return 'good';
    if (page.seoScore >= 60) return 'warning';
    return 'critical';
  },

  // Helper method to check if page needs attention
  needsAttention(page) {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    return (
      !page.lastAnalyzed ||
      new Date(page.lastAnalyzed) < oneWeekAgo ||
      page.seoScore < 60 ||
      !page.seoTitle ||
      !page.seoDescription
    );
  },

  // Mock SEO analysis implementation
  async performSeoAnalysis(page) {
    // This would integrate with real SEO analysis tools
    // For now, returning mock data
    
    const score = Math.floor(Math.random() * 40) + 60; // Random score 60-100
    
    const results = {
      title: {
        present: !!page.seoTitle,
        length: page.seoTitle?.length || 0,
        optimal: page.seoTitle?.length >= 30 && page.seoTitle?.length <= 60
      },
      description: {
        present: !!page.seoDescription,
        length: page.seoDescription?.length || 0,
        optimal: page.seoDescription?.length >= 120 && page.seoDescription?.length <= 160
      },
      keywords: {
        present: !!page.seoKeywords,
        count: page.seoKeywords?.split(',').length || 0
      },
      performance: {
        loadTime: page.loadTime || Math.random() * 3 + 1,
        mobileOptimized: page.mobileOptimized || Math.random() > 0.5
      },
      technical: {
        canonicalUrl: !!page.canonicalUrl,
        structured_data: !!page.structuredData,
        crawlable: page.crawlable
      }
    };

    const suggestions = {
      title: page.seoTitle || `${page.type.charAt(0).toUpperCase() + page.type.slice(1)} - Aviz Networks`,
      description: page.seoDescription || `Learn more about ${page.type} at Aviz Networks. Network observability and management solutions.`
    };

    return {
      score,
      results,
      suggestions,
      analyzedAt: new Date().toISOString()
    };
  }
})); 