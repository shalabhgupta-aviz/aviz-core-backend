'use strict';

/**
 * analytics-integration router
 */

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/analytics-integration/google-analytics',
      handler: 'analytics-integration.getGoogleAnalyticsData',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/analytics-integration/search-console',
      handler: 'analytics-integration.getSearchConsoleData',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/analytics-integration/keyword-research',
      handler: 'analytics-integration.getKeywordResearch',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/analytics-integration/competitor-analysis',
      handler: 'analytics-integration.getCompetitorAnalysis',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/analytics-integration/backlink-analysis',
      handler: 'analytics-integration.getBacklinkAnalysis',
      config: {
        auth: false
      }
    },
    {
      method: 'GET',
      path: '/analytics-integration/technical-audit',
      handler: 'analytics-integration.getTechnicalAudit',
      config: {
        auth: false
      }
    }
  ]
}; 