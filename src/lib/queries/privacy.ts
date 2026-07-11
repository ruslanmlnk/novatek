import { cache } from 'react'

import { db } from '../payload'
import type { SeoData } from '../seo'

export const privacyDefaults = {
  lastUpdated: 'Oct 30, 2025',
  sections: [
    {
      title: 'Collecting Personal Information',
      body: 'Novatek Engineering collects information provided through contact forms, quote requests and direct communication channels. This may include your name, company details, email address, phone number and any files or technical documentation submitted as part of a project inquiry.\nWe collect this information solely for the purpose of evaluating requests, preparing quotations and providing engineering and manufacturing services.',
    },
    {
      title: 'Use of Information',
      body: 'Information submitted through our website is used to respond to inquiries, process project requests, provide technical consultations and improve our services.\nWe do not sell, rent or distribute personal information to third parties for marketing purposes.',
    },
    {
      title: 'Technical Files & Project Data',
      body: 'Drawings, CAD models, technical specifications and other project-related files submitted to Novatek Engineering are treated as confidential information.\nAll project data is used exclusively for quotation, engineering review, manufacturing planning and project execution purposes.',
    },
    {
      title: 'Sharing Personal Information',
      body: 'We may share information with trusted suppliers, manufacturing partners or service providers only when necessary to fulfill a project request or provide requested services.\nAny such sharing is limited to information required for project execution and is subject to appropriate confidentiality practices.',
    },
    {
      title: 'Cookies & Analytics',
      body: 'Our website may use cookies and analytics tools to improve user experience, monitor website performance and understand visitor behavior.\nThis information is collected in an aggregated form and does not personally identify individual users.',
    },
    {
      title: 'Data Security',
      body: 'Novatek Engineering implements reasonable technical and organizational measures to protect personal information, project documentation and submitted files against unauthorized access, disclosure or misuse.\nWhile we strive to maintain secure systems, no method of electronic transmission or storage can guarantee absolute security.',
    },
    {
      title: 'Third-Party Links',
      body: 'Our website may contain links to external websites or third-party resources. Novatek Engineering is not responsible for the privacy practices, content or security policies of external websites.',
    },
    {
      title: 'Contact Information',
      body: 'If you have any questions regarding this Privacy Policy or the handling of your information, please contact Novatek Engineering through the contact details provided on our website.',
    },
  ],
}

export const getPrivacyData = cache(async (): Promise<typeof privacyDefaults & { seo: SeoData }> => {
  const payload = await db()
  const privacy = await payload.findGlobal({ slug: 'privacy' })

  return {
    seo: privacy.seo ?? null,
    lastUpdated: privacy.lastUpdated || privacyDefaults.lastUpdated,
    sections: privacy.sections?.length
      ? privacy.sections.map((section) => ({ title: section.title, body: section.body }))
      : privacyDefaults.sections,
  }
})
