import { CollectionConfig } from 'payload/types'

const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'type', 'startDate', 'endDate'],
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
      name: 'type',
      type: 'select',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Social Media', value: 'social' },
        { label: 'Content', value: 'content' },
        { label: 'Promotional', value: 'promotional' },
        { label: 'Onboarding', value: 'onboarding' },
      ],
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Active', value: 'active' },
        { label: 'Paused', value: 'paused' },
        { label: 'Completed', value: 'completed' },
      ],
      defaultValue: 'draft',
    },
    {
      name: 'startDate',
      type: 'date',
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'targetAudience',
      type: 'group',
      fields: [
        {
          name: 'segments',
          type: 'relationship',
          relationTo: 'user-profiles',
          hasMany: true,
        },
        {
          name: 'criteria',
          type: 'json',
        },
      ],
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'channels',
      type: 'group',
      fields: [
        {
          name: 'email',
          type: 'checkbox',
        },
        {
          name: 'social',
          type: 'checkbox',
        },
        {
          name: 'push',
          type: 'checkbox',
        },
        {
          name: 'inApp',
          type: 'checkbox',
        },
      ],
    },
    {
      name: 'metrics',
      type: 'group',
      fields: [
        {
          name: 'sent',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'opened',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'clicked',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'converted',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'automation',
      type: 'group',
      fields: [
        {
          name: 'trigger',
          type: 'select',
          options: [
            { label: 'User Signup', value: 'signup' },
            { label: 'Page Visit', value: 'page_visit' },
            { label: 'Form Submission', value: 'form_submission' },
            { label: 'Purchase', value: 'purchase' },
          ],
        },
        {
          name: 'delay',
          type: 'number',
          label: 'Delay (hours)',
        },
        {
          name: 'conditions',
          type: 'json',
        },
      ],
    },
  ],
}

export default Campaigns