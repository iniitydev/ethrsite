import { CollectionConfig } from 'payload/types'

const UserProfiles: CollectionConfig = {
  slug: 'user-profiles',
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
    },
    {
      name: 'company',
      type: 'text',
    },
    {
      name: 'website',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'social',
      type: 'group',
      fields: [
        {
          name: 'twitter',
          type: 'text',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
        {
          name: 'github',
          type: 'text',
        },
      ],
    },
    {
      name: 'marketingData',
      type: 'group',
      fields: [
        {
          name: 'source',
          type: 'text',
        },
        {
          name: 'campaign',
          type: 'text',
        },
        {
          name: 'leadScore',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'lastEngagement',
          type: 'date',
        },
      ],
    },
    {
      name: 'communicationPreferences',
      type: 'group',
      fields: [
        {
          name: 'preferredLanguage',
          type: 'select',
          options: [
            { label: 'English', value: 'en' },
            { label: 'Spanish', value: 'es' },
            { label: 'French', value: 'fr' },
          ],
          defaultValue: 'en',
        },
        {
          name: 'chatEnabled',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'aiAssistantEnabled',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
  ],
}

export default UserProfiles