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
      handler: 'automation-workflow.aiContentSuggestions',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Automated SEO Audit
    {
      method: 'POST',
      path: '/automation-workflows/scheduled-audit',
      handler: 'automation-workflow.scheduledAudit',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Execute workflow
    {
      method: 'POST',
      path: '/automation-workflows/:workflow_id/execute',
      handler: 'automation-workflow.executeWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // AI Performance Insights
    {
      method: 'GET',
      path: '/automation-workflows/performance-insights',
      handler: 'automation-workflow.performanceInsights',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Workflow analytics
    {
      method: 'GET',
      path: '/automation-workflows/analytics',
      handler: 'automation-workflow.getAnalytics',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Test workflow
    {
      method: 'POST',
      path: '/automation-workflows/:workflow_id/test',
      handler: 'automation-workflow.testWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Pause/Resume workflow
    {
      method: 'PATCH',
      path: '/automation-workflows/:workflow_id/toggle',
      handler: 'automation-workflow.toggleWorkflow',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Get workflow execution history
    {
      method: 'GET',
      path: '/automation-workflows/:workflow_id/history',
      handler: 'automation-workflow.getExecutionHistory',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // AI Content Calendar
    {
      method: 'GET',
      path: '/automation-workflows/content-calendar',
      handler: 'automation-workflow.getContentCalendar',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Bulk workflow operations
    {
      method: 'POST',
      path: '/automation-workflows/bulk-action',
      handler: 'automation-workflow.bulkAction',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Workflow templates
    {
      method: 'GET',
      path: '/automation-workflows/templates',
      handler: 'automation-workflow.getTemplates',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    
    // Create workflow from template
    {
      method: 'POST',
      path: '/automation-workflows/from-template/:template_id',
      handler: 'automation-workflow.createFromTemplate',
      config: {
        policies: [],
        middlewares: [],
      },
    }
  ]
}; 