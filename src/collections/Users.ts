import { CollectionConfig } from 'payload/types'

const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
    depth: 0,
  },
  admin: {
    useAsTitle: 'email',
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
      name: 'role',
      type: 'select',
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Content Editor',
          value: 'content-editor',
        },
        {
          label: 'Marketing Manager',
          value: 'marketing-manager',
        },
        {
          label: 'End User',
          value: 'end-user',
        },
      ],
      defaultValue: 'end-user',
      required: true,
    },
    {
      name: 'profile',
      type: 'relationship',
      relationTo: 'user-profiles',
      hasMany: false,
    },
    {
      name: 'preferences',
      type: 'group',
      fields: [
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'marketingEmails',
          type: 'checkbox',
          defaultValue: false,
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
      ],
    },
  ],
}

export default Users