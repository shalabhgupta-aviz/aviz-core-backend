'use strict';

/**
 * automation-workflows router
 */

module.exports = {
  routes: [
    // AI Content Suggestions
    {
      method: 'GET',
      path: '/automation-workflows/ai-content-suggestions',
      handler: 'automation-workflows.aiContentSuggestions',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Automated SEO Audit
    {
      method: 'POST',
      path: '/automation-workflows/scheduled-audit',
      handler: 'automation-workflows.scheduledAudit',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Execute workflow
    {
      method: 'POST',
      path: '/automation-workflows/:workflow_id/execute',
      handler: 'automation-workflows.executeWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // AI Performance Insights
    {
      method: 'GET',
      path: '/automation-workflows/performance-insights',
      handler: 'automation-workflows.performanceInsights',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Workflow analytics
    {
      method: 'GET',
      path: '/automation-workflows/analytics',
      handler: 'automation-workflows.getAnalytics',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Test workflow
    {
      method: 'POST',
      path: '/automation-workflows/:workflow_id/test',
      handler: 'automation-workflows.testWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Pause/Resume workflow
    {
      method: 'PATCH',
      path: '/automation-workflows/:workflow_id/toggle',
      handler: 'automation-workflows.toggleWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Get workflow execution history
    {
      method: 'GET',
      path: '/automation-workflows/:workflow_id/history',
      handler: 'automation-workflows.getExecutionHistory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // AI Content Calendar
    {
      method: 'GET',
      path: '/automation-workflows/content-calendar',
      handler: 'automation-workflows.getContentCalendar',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Bulk workflow operations
    {
      method: 'POST',
      path: '/automation-workflows/bulk-action',
      handler: 'automation-workflows.bulkAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Workflow templates
    {
      method: 'GET',
      path: '/automation-workflows/templates',
      handler: 'automation-workflows.getTemplates',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Create workflow from template
    {
      method: 'POST',
      path: '/automation-workflows/from-template/:template_id',
      handler: 'automation-workflows.createFromTemplate',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ]
}; 