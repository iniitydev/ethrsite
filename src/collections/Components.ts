import { CollectionConfig } from 'payload/types'

const Components: CollectionConfig = {
  slug: 'components',
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
        { label: 'Header', value: 'header' },
        { label: 'Footer', value: 'footer' },
        { label: 'Hero', value: 'hero' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Content', value: 'content' },
        { label: 'Sidebar', value: 'sidebar' },
        { label: 'Form', value: 'form' },
        { label: 'Card', value: 'card' },
        { label: 'Button', value: 'button' },
        { label: 'Gallery', value: 'gallery' },
        { label: 'Testimonial', value: 'testimonial' },
        { label: 'Pricing', value: 'pricing' },
        { label: 'Contact', value: 'contact' },
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
    },
    {
      name: 'componentType',
      type: 'select',
      options: [
        { label: 'React Component', value: 'react' },
        { label: 'HTML/CSS', value: 'html' },
        { label: 'Custom Element', value: 'custom' },
      ],
      defaultValue: 'react',
    },
    {
      name: 'code',
      type: 'group',
      fields: [
        {
          name: 'html',
          type: 'code',
          admin: {
            language: 'html',
          },
        },
        {
          name: 'css',
          type: 'code',
          admin: {
            language: 'css',
          },
        },
        {
          name: 'javascript',
          type: 'code',
          admin: {
            language: 'javascript',
          },
        },
        {
          name: 'react',
          type: 'code',
          admin: {
            language: 'jsx',
          },
        },
      ],
    },
    {
      name: 'props',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'String', value: 'string' },
            { label: 'Number', value: 'number' },
            { label: 'Boolean', value: 'boolean' },
            { label: 'Array', value: 'array' },
            { label: 'Object', value: 'object' },
            { label: 'Function', value: 'function' },
          ],
          required: true,
        },
        {
          name: 'defaultValue',
          type: 'text',
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'styles',
      type: 'group',
      fields: [
        {
          name: 'cssClasses',
          type: 'text',
        },
        {
          name: 'inlineStyles',
          type: 'code',
          admin: {
            language: 'css',
          },
        },
        {
          name: 'responsive',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        {
          name: 'semantic',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'ariaLabels',
          type: 'text',
        },
        {
          name: 'metaTags',
          type: 'json',
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

export default Components