import { CollectionConfig } from 'payload/types'

const Templates: CollectionConfig = {
  slug: 'templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'status', 'updatedAt'],
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
      name: 'category',
      type: 'select',
      options: [
        { label: 'Business', value: 'business' },
        { label: 'Portfolio', value: 'portfolio' },
        { label: 'E-commerce', value: 'ecommerce' },
        { label: 'Blog', value: 'blog' },
        { label: 'Landing Page', value: 'landing' },
        { label: 'Corporate', value: 'corporate' },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'previewImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'structure',
      type: 'json',
      required: true,
    },
    {
      name: 'components',
      type: 'array',
      fields: [
        {
          name: 'component',
          type: 'relationship',
          relationTo: 'components',
          required: true,
        },
        {
          name: 'defaultProps',
          type: 'json',
        },
      ],
    },
    {
      name: 'styles',
      type: 'group',
      fields: [
        {
          name: 'css',
          type: 'code',
          admin: {
            language: 'css',
          },
        },
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
      ],
    },
    {
      name: 'tags',
      type: 'text',
      hasMany: true,
    },
    {
      name: 'usageCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Templates