import { CollectionConfig } from 'payload/types'

const Sites: CollectionConfig = {
  slug: 'sites',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'domain', 'status', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    admin: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'domain',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'Primary domain (e.g., ethr.cloud, ideploy.space)',
      },
    },
    {
      name: 'subdomains',
      type: 'array',
      fields: [
        {
          name: 'subdomain',
          type: 'text',
          required: true,
        },
        {
          name: 'target',
          type: 'text',
          required: true,
          admin: {
            description: 'Target site or service',
          },
        },
      ],
      admin: {
        description: 'Subdomain configurations for multi-service routing',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Development', value: 'development' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'development',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Site description for internal reference',
      },
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
          admin: {
            description: 'URL path (e.g., "/", "/about", "/contact")',
          },
        },
        {
          name: 'isHomepage',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
      admin: {
        description: 'Page routing configuration',
      },
    },
    {
      name: 'theme',
      type: 'group',
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          defaultValue: '#007bff',
          admin: {
            description: 'Primary theme color',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          defaultValue: '#6c757d',
          admin: {
            description: 'Secondary theme color',
          },
        },
        {
          name: 'fontFamily',
          type: 'text',
          defaultValue: 'Inter, sans-serif',
          admin: {
            description: 'Font family for the site',
          },
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
          admin: {
            description: 'Default site title',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Default site description',
          },
        },
        {
          name: 'keywords',
          type: 'text',
          admin: {
            description: 'Comma-separated keywords',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Default Open Graph image',
          },
        },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        {
          name: 'googleAnalytics',
          type: 'text',
          admin: {
            description: 'Google Analytics ID',
          },
        },
        {
          name: 'plausible',
          type: 'text',
          admin: {
            description: 'Plausible Analytics domain',
          },
        },
      ],
    },
    {
      name: 'customCode',
      type: 'group',
      fields: [
        {
          name: 'head',
          type: 'textarea',
          admin: {
            description: 'Custom HTML head code',
          },
        },
        {
          name: 'body',
          type: 'textarea',
          admin: {
            description: 'Custom HTML body code',
          },
        },
      ],
    },
  ],
  timestamps: true,
}

export default Sites