import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutAbout extends Struct.SingleTypeSchema {
  collectionName: 'abouts';
  info: {
    description: 'Write about yourself and the content you create';
    displayName: 'About';
    pluralName: 'abouts';
    singularName: 'about';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAnalyticsIntegrationAnalyticsIntegration
  extends Struct.CollectionTypeSchema {
  collectionName: 'analytics_integrations';
  info: {
    description: 'Store analytics data from various sources';
    displayName: 'Analytics Integration';
    pluralName: 'analytics-integrations';
    singularName: 'analytics-integration';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    data: Schema.Attribute.JSON & Schema.Attribute.Required;
    dateRange: Schema.Attribute.String;
    domain: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    keyword: Schema.Attribute.String;
    lastUpdated: Schema.Attribute.DateTime &
      Schema.Attribute.DefaultTo<'2024-01-18T00:00:00.000Z'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::analytics-integration.analytics-integration'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    source: Schema.Attribute.Enumeration<
      [
        'google-analytics',
        'search-console',
        'ahrefs',
        'semrush',
        'technical-audit',
      ]
    > &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAutomationWorkflowsAutomationWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'automation_workflows';
  info: {
    description: 'AI-powered automation workflows for SEO tasks, content suggestions, and performance monitoring';
    displayName: 'Automation Workflows';
    pluralName: 'automation-workflows';
    singularName: 'automation-workflow';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    actions: Schema.Attribute.JSON;
    ai_settings: Schema.Attribute.JSON;
    created_by: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    execution_count: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    execution_history: Schema.Attribute.JSON;
    last_execution: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::automation-workflows.automation-workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    next_execution: Schema.Attribute.DateTime;
    notification_settings: Schema.Attribute.JSON;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'critical']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    publishedAt: Schema.Attribute.DateTime;
    schedule: Schema.Attribute.JSON;
    status: Schema.Attribute.Enumeration<
      ['active', 'paused', 'inactive', 'error']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'active'>;
    success_rate: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<100>;
    tags: Schema.Attribute.JSON;
    target_sites: Schema.Attribute.JSON;
    triggers: Schema.Attribute.JSON;
    updated_by: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow_type: Schema.Attribute.Enumeration<
      ['scheduled', 'trigger', 'manual', 'ai_powered']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'scheduled'>;
  };
}

export interface ApiBrokenLinkBrokenLink extends Struct.CollectionTypeSchema {
  collectionName: 'broken_links';
  info: {
    displayName: 'Broken Link';
    pluralName: 'broken-links';
    singularName: 'broken-link';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    anchor_text: Schema.Attribute.String;
    broken_url: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    error_message: Schema.Attribute.String;
    found_date: Schema.Attribute.DateTime;
    link_status: Schema.Attribute.Enumeration<['active', 'fixed', 'ignored']>;
    link_type: Schema.Attribute.Enumeration<['internal', 'external']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::broken-link.broken-link'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    source_page: Schema.Attribute.String & Schema.Attribute.Required;
    status_code: Schema.Attribute.Integer;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCollegeCollege extends Struct.CollectionTypeSchema {
  collectionName: 'colleges';
  info: {
    description: 'College information and courses';
    displayName: 'College';
    pluralName: 'colleges';
    singularName: 'college';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    about: Schema.Attribute.Text;
    categories: Schema.Attribute.JSON;
    courses: Schema.Attribute.JSON;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    excerpt: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::college.college'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    placements: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    reviews: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    virtualTourLink: Schema.Attribute.String;
    youtubeVideos: Schema.Attribute.JSON;
  };
}

export interface ApiContentCalendarContentCalendar
  extends Struct.CollectionTypeSchema {
  collectionName: 'content_calendars';
  info: {
    displayName: 'Content Calendar';
    pluralName: 'content-calendars';
    singularName: 'content-calendar';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    author: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    featured_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::content-calendar.content-calendar'
    > &
      Schema.Attribute.Private;
    meta_description: Schema.Attribute.String;
    meta_title: Schema.Attribute.String;
    post_content_type: Schema.Attribute.Enumeration<
      [
        'blog',
        'guide',
        'newsroom',
        'report',
        'video',
        'solution-brief',
        'case-study',
      ]
    >;
    post_status: Schema.Attribute.Enumeration<
      ['draft', 'scheduled', 'published', 'archived']
    >;
    publishedAt: Schema.Attribute.DateTime;
    scheduled_date: Schema.Attribute.DateTime;
    seo_status: Schema.Attribute.Enumeration<['green', 'yellow', 'red']>;
    slug: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    word_count: Schema.Attribute.Integer;
  };
}

export interface ApiEventEvent extends Struct.CollectionTypeSchema {
  collectionName: 'events';
  info: {
    description: 'Events from WordPress with speakers and structured content';
    displayName: 'Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf_fields: Schema.Attribute.JSON;
    author: Schema.Attribute.JSON;
    booth_number: Schema.Attribute.String;
    categories: Schema.Attribute.JSON;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    date_and_time: Schema.Attribute.String;
    duration: Schema.Attribute.String;
    event_date: Schema.Attribute.String;
    event_venue: Schema.Attribute.String;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_images: Schema.Attribute.JSON;
    featured_media: Schema.Attribute.Media<'images'>;
    hashtags: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    post_url: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo_description: Schema.Attribute.Text;
    seo_title: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    speakers: Schema.Attribute.JSON;
    status: Schema.Attribute.Enumeration<['publish', 'draft', 'private']> &
      Schema.Attribute.DefaultTo<'publish'>;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.Component<'shared.title', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wp_id: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiGlobalGlobal extends Struct.SingleTypeSchema {
  collectionName: 'globals';
  info: {
    description: 'Define global settings';
    displayName: 'Global';
    pluralName: 'globals';
    singularName: 'global';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    favicon: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global.global'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    siteDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGuideGuide extends Struct.CollectionTypeSchema {
  collectionName: 'guides';
  info: {
    description: 'Guides and documentation from WordPress with download capabilities';
    displayName: 'Guide';
    pluralName: 'guides';
    singularName: 'guide';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf_fields: Schema.Attribute.JSON;
    author: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    download_file: Schema.Attribute.Media<'files'>;
    download_url: Schema.Attribute.String;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_images: Schema.Attribute.JSON;
    featured_media: Schema.Attribute.Media<'images' | 'files'>;
    file_size: Schema.Attribute.String;
    guide_type: Schema.Attribute.Enumeration<
      ['technical', 'business', 'whitepaper', 'ebook', 'datasheet']
    > &
      Schema.Attribute.DefaultTo<'technical'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::guide.guide'> &
      Schema.Attribute.Private;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    pages: Schema.Attribute.Integer;
    post_url: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo_description: Schema.Attribute.Text;
    seo_title: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<['publish', 'draft', 'private']> &
      Schema.Attribute.DefaultTo<'publish'>;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.Component<'shared.title', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wp_id: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiPageDetectionPageDetection
  extends Struct.CollectionTypeSchema {
  collectionName: 'page_detections';
  info: {
    description: 'Automatically detected pages from Gatsby frontend';
    displayName: 'Page Detection';
    pluralName: 'page-detections';
    singularName: 'page-detection';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  attributes: {
    analysisResults: Schema.Attribute.JSON;
    brokenLinks: Schema.Attribute.JSON;
    canonicalUrl: Schema.Attribute.String;
    category: Schema.Attribute.Enumeration<
      [
        'general',
        'blog',
        'case-study',
        'solution-brief',
        'guide',
        'report',
        'video',
        'webinar',
        'podcast',
        'news',
      ]
    > &
      Schema.Attribute.DefaultTo<'general'>;
    component: Schema.Attribute.String & Schema.Attribute.Required;
    crawlable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    detectedAt: Schema.Attribute.DateTime & Schema.Attribute.Required;
    indexed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isDynamic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isResource: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastAnalyzed: Schema.Attribute.DateTime;
    loadTime: Schema.Attribute.Decimal;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::page-detection.page-detection'
    > &
      Schema.Attribute.Private;
    metaData: Schema.Attribute.JSON;
    mobileOptimized: Schema.Attribute.Boolean;
    needsSEO: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.String;
    ogTitle: Schema.Attribute.String;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    redirects: Schema.Attribute.JSON;
    seoDescription: Schema.Attribute.Text;
    seoKeywords: Schema.Attribute.String;
    seoScore: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    seoTitle: Schema.Attribute.String;
    source: Schema.Attribute.Enumeration<
      ['gatsby-build', 'manual', 'strapi-content']
    > &
      Schema.Attribute.DefaultTo<'gatsby-build'>;
    status: Schema.Attribute.Enumeration<['active', 'inactive', 'archived']> &
      Schema.Attribute.DefaultTo<'active'>;
    structuredData: Schema.Attribute.JSON;
    type: Schema.Attribute.Enumeration<
      [
        'homepage',
        'resource',
        'company',
        'product',
        'calculator',
        'for-you',
        'partner',
        'solution',
        'page',
      ]
    > &
      Schema.Attribute.DefaultTo<'page'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPodcastPodcast extends Struct.CollectionTypeSchema {
  collectionName: 'podcasts';
  info: {
    description: 'Podcasts and audio content from WordPress';
    displayName: 'Podcast';
    pluralName: 'podcasts';
    singularName: 'podcast';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf_fields: Schema.Attribute.JSON;
    audio_file: Schema.Attribute.Media<'audios'>;
    author: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    duration: Schema.Attribute.String;
    episode_number: Schema.Attribute.Integer;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_images: Schema.Attribute.JSON;
    featured_media: Schema.Attribute.Media<'images'>;
    guests: Schema.Attribute.JSON;
    hosts: Schema.Attribute.JSON;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::podcast.podcast'
    > &
      Schema.Attribute.Private;
    media_url: Schema.Attribute.String;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    post_url: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    season: Schema.Attribute.Integer;
    seo_description: Schema.Attribute.Text;
    seo_title: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<['publish', 'draft', 'private']> &
      Schema.Attribute.DefaultTo<'publish'>;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.Component<'shared.title', false>;
    transcript: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wp_id: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiPostPost extends Struct.CollectionTypeSchema {
  collectionName: 'posts';
  info: {
    displayName: 'Post';
    pluralName: 'posts';
    singularName: 'post';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf: Schema.Attribute.JSON;
    author: Schema.Attribute.Integer;
    categories: Schema.Attribute.JSON;
    class_list: Schema.Attribute.JSON;
    coauthors: Schema.Attribute.JSON;
    comment_status: Schema.Attribute.String;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    date_gmt: Schema.Attribute.DateTime;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_media: Schema.Attribute.Integer;
    format: Schema.Attribute.String;
    guid: Schema.Attribute.Component<'shared.guid', false>;
    link: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::post.post'> &
      Schema.Attribute.Private;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    modified_gmt: Schema.Attribute.DateTime;
    ping_status: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.String;
    status: Schema.Attribute.String;
    sticky: Schema.Attribute.Boolean;
    tags: Schema.Attribute.JSON;
    template: Schema.Attribute.String;
    title: Schema.Attribute.Component<'shared.title', false>;
    type: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wp_id: Schema.Attribute.Integer;
    yoast_head: Schema.Attribute.Text;
    yoast_head_json: Schema.Attribute.JSON;
  };
}

export interface ApiRedirectRedirect extends Struct.CollectionTypeSchema {
  collectionName: 'redirects';
  info: {
    description: 'Manage 301/302 redirects';
    displayName: 'Redirect';
    pluralName: 'redirects';
    singularName: 'redirect';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    hits: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    last_hit: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::redirect.redirect'
    > &
      Schema.Attribute.Private;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    redirect_type: Schema.Attribute.Enumeration<
      ['redirect301', 'redirect302', 'temporary', 'permanent']
    >;
    source_url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    target_url: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReportReport extends Struct.CollectionTypeSchema {
  collectionName: 'reports';
  info: {
    description: 'Reports and research documents from WordPress';
    displayName: 'Report';
    pluralName: 'reports';
    singularName: 'report';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf_fields: Schema.Attribute.JSON;
    author: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    download_file: Schema.Attribute.Media<'files'>;
    download_url: Schema.Attribute.String;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_images: Schema.Attribute.JSON;
    featured_media: Schema.Attribute.Media<'images' | 'files'>;
    file_size: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::report.report'
    > &
      Schema.Attribute.Private;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    pages: Schema.Attribute.Integer;
    post_url: Schema.Attribute.String;
    publication_date: Schema.Attribute.Date;
    publishedAt: Schema.Attribute.DateTime;
    report_type: Schema.Attribute.Enumeration<
      ['industry', 'technical', 'market', 'research', 'analyst']
    > &
      Schema.Attribute.DefaultTo<'industry'>;
    seo_description: Schema.Attribute.Text;
    seo_title: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<['publish', 'draft', 'private']> &
      Schema.Attribute.DefaultTo<'publish'>;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.Component<'shared.title', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    wp_id: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiSeoAuditSeoAudit extends Struct.CollectionTypeSchema {
  collectionName: 'seo_audits';
  info: {
    displayName: 'SEO Audit';
    pluralName: 'seo-audits';
    singularName: 'seo-audit';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    keyword_density: Schema.Attribute.Decimal;
    last_audit: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::seo-audit.seo-audit'
    > &
      Schema.Attribute.Private;
    meta_description: Schema.Attribute.String;
    meta_title: Schema.Attribute.String;
    page_url: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    readability_score: Schema.Attribute.Integer;
    seo_score: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    seo_status: Schema.Attribute.Enumeration<['good', 'warning', 'error']>;
    target_keywords: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url_slug: Schema.Attribute.String;
  };
}

export interface ApiSeoPageSeoPage extends Struct.CollectionTypeSchema {
  collectionName: 'seo_pages';
  info: {
    description: 'SEO metadata for individual pages';
    displayName: 'SEO Page';
    pluralName: 'seo-pages';
    singularName: 'seo-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    canonical_url: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    keywords: Schema.Attribute.Text;
    last_audit: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::seo-page.seo-page'
    > &
      Schema.Attribute.Private;
    meta_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    meta_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    og_description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    og_image: Schema.Attribute.Media<'images'>;
    og_title: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    page_thumbnail: Schema.Attribute.Media<'images'>;
    page_title: Schema.Attribute.String & Schema.Attribute.Required;
    page_url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    robots_txt: Schema.Attribute.Text;
    schema_markup: Schema.Attribute.JSON;
    seo_score: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSiteAnalyticSiteAnalytic
  extends Struct.CollectionTypeSchema {
  collectionName: 'site_analytics';
  info: {
    displayName: 'Site Analytic';
    pluralName: 'site-analytics';
    singularName: 'site-analytic';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avg_session_duration: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<0>;
    bounce_rate: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    conversion_rate: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    core_web_vitals: Schema.Attribute.JSON;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'2024-12-31T18:30:00.000Z'>;
    device_type: Schema.Attribute.Enumeration<['desktop', 'mobile', 'tablet']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::site-analytic.site-analytic'
    > &
      Schema.Attribute.Private;
    page_speed: Schema.Attribute.Decimal;
    page_url: Schema.Attribute.String & Schema.Attribute.Required;
    page_views: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    seo_score: Schema.Attribute.Integer;
    traffic_source: Schema.Attribute.Enumeration<
      ['organic', 'direct', 'social', 'referral', 'paid']
    >;
    unique_visitors: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    visitors: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface ApiSitemapSitemap extends Struct.CollectionTypeSchema {
  collectionName: 'sitemaps';
  info: {
    description: 'XML sitemap configuration and generation';
    displayName: 'Sitemap';
    pluralName: 'sitemaps';
    singularName: 'sitemap';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    change_freq: Schema.Attribute.Enumeration<
      ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
    > &
      Schema.Attribute.DefaultTo<'weekly'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    include_in_sitemap: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    is_active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    last_modified: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sitemap.sitemap'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    priority: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.5>;
    publishedAt: Schema.Attribute.DateTime;
    sitemap_type: Schema.Attribute.Enumeration<
      ['page', 'post', 'category', 'custom']
    > &
      Schema.Attribute.DefaultTo<'page'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApiTcoCalculatorTcoCalculator
  extends Struct.CollectionTypeSchema {
  collectionName: 'tco_calculators';
  info: {
    description: 'TCO Calculator plans and results from WordPress (ONES and OPB)';
    displayName: 'TCO Calculator';
    pluralName: 'tco-calculators';
    singularName: 'tco-calculator';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf_fields: Schema.Attribute.JSON;
    author: Schema.Attribute.JSON;
    calculator_data: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    company_size: Schema.Attribute.Enumeration<
      ['small', 'medium', 'large', 'enterprise']
    >;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_images: Schema.Attribute.JSON;
    featured_media: Schema.Attribute.Media<'images'>;
    industry: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::tco-calculator.tco-calculator'
    > &
      Schema.Attribute.Private;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    payback_period: Schema.Attribute.String;
    post_url: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    roi_percentage: Schema.Attribute.Decimal;
    savings_estimate: Schema.Attribute.Decimal;
    seo_description: Schema.Attribute.Text;
    seo_title: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    status: Schema.Attribute.Enumeration<['publish', 'draft', 'private']> &
      Schema.Attribute.DefaultTo<'publish'>;
    tags: Schema.Attribute.JSON;
    tco_type: Schema.Attribute.Enumeration<['ones_tco', 'opb_tco']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.Component<'shared.title', false>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    use_case: Schema.Attribute.String;
    wp_id: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiVideoVideo extends Struct.CollectionTypeSchema {
  collectionName: 'videos';
  info: {
    description: 'Videos and webinars from WordPress';
    displayName: 'Video';
    pluralName: 'videos';
    singularName: 'video';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    acf_fields: Schema.Attribute.JSON;
    author: Schema.Attribute.JSON;
    categories: Schema.Attribute.JSON;
    content: Schema.Attribute.Component<'shared.content', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime;
    duration: Schema.Attribute.String;
    embed_code: Schema.Attribute.Text;
    excerpt: Schema.Attribute.Component<'shared.excerpt', false>;
    featured_images: Schema.Attribute.JSON;
    featured_media: Schema.Attribute.Media<'images' | 'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::video.video'> &
      Schema.Attribute.Private;
    media_url: Schema.Attribute.String;
    meta: Schema.Attribute.JSON;
    modified: Schema.Attribute.DateTime;
    post_url: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    seo_description: Schema.Attribute.Text;
    seo_title: Schema.Attribute.String;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
    speakers: Schema.Attribute.JSON;
    status: Schema.Attribute.Enumeration<['publish', 'draft', 'private']> &
      Schema.Attribute.DefaultTo<'publish'>;
    tags: Schema.Attribute.JSON;
    thumbnail_url: Schema.Attribute.String;
    title: Schema.Attribute.Component<'shared.title', false>;
    transcript: Schema.Attribute.Text;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    video_file: Schema.Attribute.Media<'videos'>;
    video_type: Schema.Attribute.Enumeration<
      ['webinar', 'demo', 'tutorial', 'interview', 'presentation']
    > &
      Schema.Attribute.DefaultTo<'webinar'>;
    wp_id: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ApiWebsiteAnalyticsWebsiteAnalytic
  extends Struct.CollectionTypeSchema {
  collectionName: 'website_analytics';
  info: {
    description: 'Website analytics and performance data';
    displayName: 'Website Analytics';
    pluralName: 'website-analytics';
    singularName: 'website-analytic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    avg_session_duration: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<0>;
    bounce_rate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    conversion_rate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    core_web_vitals: Schema.Attribute.JSON;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.Date & Schema.Attribute.Required;
    device_type: Schema.Attribute.Enumeration<['desktop', 'mobile', 'tablet']>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::website-analytics.website-analytic'
    > &
      Schema.Attribute.Private;
    page_speed: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    page_views: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    pxage_url: Schema.Attribute.String & Schema.Attribute.Required;
    seo_score: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    traffic_source: Schema.Attribute.Enumeration<
      ['organic', 'direct', 'social', 'referral', 'paid']
    >;
    unique_visitors: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    visitors: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about.about': ApiAboutAbout;
      'api::analytics-integration.analytics-integration': ApiAnalyticsIntegrationAnalyticsIntegration;
      'api::automation-workflows.automation-workflow': ApiAutomationWorkflowsAutomationWorkflow;
      'api::broken-link.broken-link': ApiBrokenLinkBrokenLink;
      'api::college.college': ApiCollegeCollege;
      'api::content-calendar.content-calendar': ApiContentCalendarContentCalendar;
      'api::event.event': ApiEventEvent;
      'api::global.global': ApiGlobalGlobal;
      'api::guide.guide': ApiGuideGuide;
      'api::page-detection.page-detection': ApiPageDetectionPageDetection;
      'api::podcast.podcast': ApiPodcastPodcast;
      'api::post.post': ApiPostPost;
      'api::redirect.redirect': ApiRedirectRedirect;
      'api::report.report': ApiReportReport;
      'api::seo-audit.seo-audit': ApiSeoAuditSeoAudit;
      'api::seo-page.seo-page': ApiSeoPageSeoPage;
      'api::site-analytic.site-analytic': ApiSiteAnalyticSiteAnalytic;
      'api::sitemap.sitemap': ApiSitemapSitemap;
      'api::tco-calculator.tco-calculator': ApiTcoCalculatorTcoCalculator;
      'api::video.video': ApiVideoVideo;
      'api::website-analytics.website-analytic': ApiWebsiteAnalyticsWebsiteAnalytic;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
