'use strict';

/**
 * automation-workflows router
 */

module.exports = {
  routes: [
    // AI Content Suggestions
    {
      method: 'GET',
      path: '/ai-content-suggestions',
      handler: 'custom-routes.aiContentSuggestions',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Automated SEO Audit
    {
      method: 'POST',
      path: '/scheduled-audit',
      handler: 'custom-routes.scheduledAudit',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Execute workflow
    {
      method: 'POST',
      path: '/:workflow_id/execute',
      handler: 'custom-routes.executeWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // AI Performance Insights
    {
      method: 'GET',
      path: '/performance-insights',
      handler: 'custom-routes.performanceInsights',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Workflow analytics
    {
      method: 'GET',
      path: '/analytics',
      handler: 'custom-routes.getAnalytics',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Test workflow
    {
      method: 'POST',
      path: '/:workflow_id/test',
      handler: 'custom-routes.testWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Pause/Resume workflow
    {
      method: 'PATCH',
      path: '/:workflow_id/toggle',
      handler: 'custom-routes.toggleWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Get workflow execution history
    {
      method: 'GET',
      path: '/:workflow_id/history',
      handler: 'custom-routes.getExecutionHistory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // AI Content Calendar
    {
      method: 'GET',
      path: '/content-calendar',
      handler: 'custom-routes.getContentCalendar',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Bulk workflow operations
    {
      method: 'POST',
      path: '/bulk-action',
      handler: 'custom-routes.bulkAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Workflow templates
    {
      method: 'GET',
      path: '/templates',
      handler: 'custom-routes.getTemplates',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Create workflow from template
    {
      method: 'POST',
      path: '/from-template/:template_id',
      handler: 'custom-routes.createFromTemplate',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ]
}; 