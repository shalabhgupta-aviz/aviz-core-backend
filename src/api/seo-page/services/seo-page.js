'use strict';

/**
 * seo-page service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const fs = require('fs').promises;
const path = require('path');

module.exports = createCoreService('api::seo-page.seo-page', ({ strapi }) => ({
  // Generate XML sitemap
  async generateSitemap() {
    try {
      const seoPages = await strapi.entityService.findMany('api::seo-page.seo-page', {
        filters: { is_active: true },
        populate: ['og_image', 'page_thumbnail']
      });

      const sitemapEntries = await strapi.entityService.findMany('api::sitemap.sitemap', {
        filters: { is_active: true, include_in_sitemap: true }
      });

      const baseUrl = process.env.SITE_URL || 'https://example.com';
      
      let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

      // Add SEO pages
      for (const page of seoPages) {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${baseUrl}${page.page_url}</loc>\n`;
        sitemapXml += `    <lastmod>${page.updatedAt.toISOString()}</lastmod>\n`;
        sitemapXml += '    <changefreq>weekly</changefreq>\n';
        sitemapXml += '    <priority>0.8</priority>\n';
        sitemapXml += '  </url>\n';
      }

      // Add sitemap entries
      for (const entry of sitemapEntries) {
        sitemapXml += '  <url>\n';
        sitemapXml += `    <loc>${baseUrl}${entry.url}</loc>\n`;
        sitemapXml += `    <lastmod>${entry.last_modified ? entry.last_modified.toISOString() : new Date().toISOString()}</lastmod>\n`;
        sitemapXml += `    <changefreq>${entry.change_freq}</changefreq>\n`;
        sitemapXml += `    <priority>${entry.priority}</priority>\n`;
        sitemapXml += '  </url>\n';
      }

      sitemapXml += '</urlset>';

      // Save sitemap to public directory
      const sitemapPath = path.join(strapi.dirs.public, 'sitemap.xml');
      await fs.writeFile(sitemapPath, sitemapXml, 'utf8');

      return { success: true, message: 'Sitemap generated successfully' };
    } catch (error) {
      console.error('Error generating sitemap:', error);
      throw error;
    }
  },

  // Generate robots.txt
  async generateRobotsTxt() {
    try {
      const seoPages = await strapi.entityService.findMany('api::seo-page.seo-page', {
        filters: { is_active: true }
      });

      const baseUrl = process.env.SITE_URL || 'https://example.com';
      
      let robotsTxt = `User-agent: *\n`;
      robotsTxt += `Allow: /\n\n`;
      robotsTxt += `Sitemap: ${baseUrl}/sitemap.xml\n\n`;

      // Add custom robots.txt rules for specific pages
      for (const page of seoPages) {
        if (page.robots_txt) {
          robotsTxt += `${page.robots_txt}\n`;
        }
      }

      // Save robots.txt to public directory
      const robotsPath = path.join(strapi.dirs.public, 'robots.txt');
      await fs.writeFile(robotsPath, robotsTxt, 'utf8');

      return { success: true, message: 'Robots.txt generated successfully' };
    } catch (error) {
      console.error('Error generating robots.txt:', error);
      throw error;
    }
  },

  // Calculate SEO score for a page
  async calculateSeoScore(pageData) {
    let score = 100;
    const issues = [];

    // Check meta title
    if (!pageData.meta_title || pageData.meta_title.length < 30) {
      score -= 10;
      issues.push('Meta title too short or missing');
    } else if (pageData.meta_title.length > 60) {
      score -= 5;
      issues.push('Meta title too long');
    }

    // Check meta description
    if (!pageData.meta_description || pageData.meta_description.length < 120) {
      score -= 10;
      issues.push('Meta description too short or missing');
    } else if (pageData.meta_description.length > 160) {
      score -= 5;
      issues.push('Meta description too long');
    }

    // Check OG image
    if (!pageData.og_image) {
      score -= 10;
      issues.push('OG image missing');
    }

    // Check canonical URL
    if (!pageData.canonical_url) {
      score -= 5;
      issues.push('Canonical URL missing');
    }

    // Check keywords
    if (!pageData.keywords) {
      score -= 5;
      issues.push('Keywords missing');
    }

    return {
      score: Math.max(0, score),
      issues
    };
  },

  // Get SEO analytics summary
  async getSeoAnalytics() {
    try {
      const seoPages = await strapi.entityService.findMany('api::seo-page.seo-page', {
        filters: { is_active: true }
      });

      const totalPages = seoPages.length;
      const pagesWithIssues = seoPages.filter(page => page.seo_score < 80).length;
      const averageScore = seoPages.reduce((sum, page) => sum + (page.seo_score || 0), 0) / totalPages;

      return {
        totalPages,
        pagesWithIssues,
        averageScore: Math.round(averageScore),
        pagesNeedingAttention: seoPages.filter(page => page.seo_score < 70).length
      };
    } catch (error) {
      console.error('Error getting SEO analytics:', error);
      throw error;
    }
  }
})); 