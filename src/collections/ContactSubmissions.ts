import type { Access, CollectionConfig } from 'payload'

const signedIn: Access = ({ req }) => Boolean(req.user)

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Contact request', plural: 'Contact requests' },
  access: {
    create: signedIn,
    read: signedIn,
    update: signedIn,
    delete: signedIn,
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'phone', 'status', 'createdAt'],
    description: 'Requests submitted from the website contact forms',
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In progress', value: 'in-progress' },
        { label: 'Done', value: 'done' },
        { label: 'Spam', value: 'spam' },
      ],
      required: true,
    },
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true },
        { name: 'lastName', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Project description',
    },
    {
      name: 'attachments',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Uploaded files',
    },
    {
      type: 'collapsible',
      label: 'Submission metadata',
      fields: [
        { name: 'source', type: 'text', admin: { readOnly: true } },
        { name: 'page', type: 'text', admin: { readOnly: true } },
        { name: 'userAgent', type: 'text', admin: { readOnly: true } },
        { name: 'ipAddress', type: 'text', admin: { readOnly: true } },
      ],
    },
  ],
}
