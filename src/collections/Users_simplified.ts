import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'firstName', 'lastName', 'role'],
  },
  auth: {
    useAPIKey: true,
    depth: 0,
  },
  access: {
    read: () => true,
    create: () => true,
    update: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return {
        id: {
          equals: user?.id,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'admin') return true
      return false
    },
    admin: ({ req: { user } }) => {
      return user?.role === 'admin'
    },
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Content Editor', value: 'content-editor' },
        { label: 'Marketing Manager', value: 'marketing-manager' },
        { label: 'End User', value: 'end-user' },
      ],
      defaultValue: 'end-user',
      required: true,
      access: {
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: {
        description: 'User biography and description',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'User profile picture',
      },
    },
    {
      name: 'website',
      type: 'text',
      admin: {
        description: 'Personal website URL',
      },
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
          admin: {
            description: 'Twitter username',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          admin: {
            description: 'LinkedIn profile URL',
          },
        },
        {
          name: 'github',
          type: 'text',
          admin: {
            description: 'GitHub username',
          },
        },
      ],
    },
    {
      name: 'preferences',
      type: 'group',
      fields: [
        {
          name: 'theme',
          type: 'select',
          options: [
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
            { label: 'System', value: 'system' },
          ],
          defaultValue: 'system',
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
          name: 'notifications',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable email notifications',
          },
        },
      ],
    },
    {
      name: 'sites',
      type: 'array',
      fields: [
        {
          name: 'site',
          type: 'relationship',
          relationTo: 'sites',
          required: true,
        },
        {
          name: 'permission',
          type: 'select',
          options: [
            { label: 'Owner', value: 'owner' },
            { label: 'Editor', value: 'editor' },
            { label: 'Viewer', value: 'viewer' },
          ],
          defaultValue: 'editor',
          required: true,
        },
      ],
      admin: {
        description: 'Sites this user has access to',
      },
    },
  ],
  timestamps: true,
}

export default Users