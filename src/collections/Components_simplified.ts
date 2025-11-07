import { CollectionConfig } from 'payload/types'

const Components: CollectionConfig = {
  slug: 'components',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'type', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
    admin: ({ req: { user } }) => {
      return user?.role === 'admin' || user?.role === 'content-editor'
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
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Component description for editors',
      },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Layout', value: 'layout' },
        { label: 'Content', value: 'content' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Media', value: 'media' },
        { label: 'Form', value: 'form' },
        { label: 'Social', value: 'social' },
        { label: 'E-commerce', value: 'ecommerce' },
      ],
      defaultValue: 'content',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      options: [
        { label: 'HTML', value: 'html' },
        { label: 'React', value: 'react' },
        { label: 'Vue', value: 'vue' },
      ],
      defaultValue: 'html',
      required: true,
    },
    {
      name: 'code',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Component code (HTML, React, or Vue)',
      },
    },
    {
      name: 'styles',
      type: 'textarea',
      admin: {
        description: 'CSS styles for the component',
      },
    },
    {
      name: 'script',
      type: 'textarea',
      admin: {
        description: 'JavaScript for the component',
      },
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
          ],
          defaultValue: 'string',
          required: true,
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            description: 'Default value for this prop',
          },
        },
        {
          name: 'required',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'description',
          type: 'textarea',
          admin: {
            description: 'Description of what this prop does',
          },
        },
      ],
      admin: {
        description: 'Component properties/attributes',
      },
    },
    {
      name: 'preview',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Preview image of the component',
      },
    },
    {
      name: 'tags',
      type: 'text',
      admin: {
        description: 'Comma-separated tags for search',
      },
    },
    {
      name: 'isPublic',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Available for all sites to use',
      },
    },
    {
      name: 'usage',
      type: 'textarea',
      admin: {
        description: 'Usage instructions and examples',
      },
    },
  ],
  timestamps: true,
}

export default Components