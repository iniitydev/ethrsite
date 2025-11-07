import { CollectionConfig } from 'payload/types'

const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'domain', 'status', 'template', 'updatedAt'],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
        { label: 'Maintenance', value: 'maintenance' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'templates',
      required: true,
    },
    {
      name: 'pages',
      type: 'array',
      fields: [
        {
          name: 'page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
        },
        {
          name: 'path',
          type: 'text',
          required: true,
        },
        {
          name: 'isHomepage',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'customComponents',
      type: 'array',
      fields: [
        {
          name: 'component',
          type: 'relationship',
          relationTo: 'components',
          required: true,
        },
        {
          name: 'configuration',
          type: 'json',
        },
      ],
    },
    {
      name: 'settings',
      type: 'group',
      fields: [
        {
          name: 'theme',
          type: 'select',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'Auto', value: 'auto' },
          ],
          defaultValue: 'light',
        },
        {
          name: 'language',
          type: 'select',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
          ],
          defaultValue: 'en',
        },
        {
          name: 'timezone',
          type: 'text',
          defaultValue: 'UTC',
        },
        {
          name: 'dateFormat',
          type: 'text',
          defaultValue: 'MM/DD/YYYY',
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'keywords',
          type: 'text',
        },
        {
          name: 'favicon',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalyticsId',
          type: 'text',
        },
        {
          name: 'facebookPixelId',
          type: 'text',
        },
        {
          name: 'trackingEnabled',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'deployment',
      type: 'group',
      fields: [
        {
          name: 'lastDeployed',
          type: 'date',
        },
        {
          name: 'deploymentStatus',
          type: 'select',
          options: [
            { label: 'Not Deployed', value: 'not-deployed' },
            { label: 'Deploying', value: 'deploying' },
            { label: 'Deployed', value: 'deployed' },
            { label: 'Failed', value: 'failed' },
          ],
          defaultValue: 'not-deployed',
        },
        {
          name: 'deploymentUrl',
          type: 'text',
        },
        {
          name: 'buildId',
          type: 'text',
        },
      ],
    },
    {
      name: 'customCode',
      type: 'group',
      fields: [
        {
          name: 'headerCode',
          type: 'code',
          admin: {
            language: 'html',
          },
        },
        {
          name: 'footerCode',
          type: 'code',
          admin: {
            language: 'html',
          },
        },
        {
          name: 'customCSS',
          type: 'code',
          admin: {
            language: 'css',
          },
        },
        {
          name: 'customJS',
          type: 'code',
          admin: {
            language: 'javascript',
          },
        },
      ],
    },
    {
      name: 'integrations',
      type: 'group',
      fields: [
        {
          name: 'googleMapsApiKey',
          type: 'text',
        },
        {
          name: 'stripePublicKey',
          type: 'text',
        },
        {
          name: 'mailchimpApiKey',
          type: 'text',
        },
        {
          name: 'socialMedia',
          type: 'group',
          fields: [
            {
              name: 'facebook',
              type: 'text',
            },
            {
              name: 'twitter',
              type: 'text',
            },
            {
              name: 'instagram',
              type: 'text',
            },
            {
              name: 'linkedin',
              type: 'text',
            },
          ],
        },
      ],
    },
    {
      name: 'performance',
      type: 'group',
      fields: [
        {
          name: 'cacheEnabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'cdnEnabled',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'minifyCSS',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'minifyJS',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'visitorCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Sites