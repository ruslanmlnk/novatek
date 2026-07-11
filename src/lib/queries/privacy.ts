import { cache } from 'react'

import type { Locale } from '../i18n'
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

const privacyDefaultsBg: typeof privacyDefaults = {
  lastUpdated: '30 октомври 2025',
  sections: [
    {
      title: 'Събиране на лична информация',
      body: 'Novatek Engineering събира информация, предоставена чрез контактни форми, заявки за оферта и директна комуникация. Това може да включва име, фирмени данни, имейл адрес, телефонен номер и файлове или техническа документация, изпратени като част от проектна заявка.\nИзползваме тази информация единствено за оценка на заявки, подготовка на оферти и предоставяне на инженерни и производствени услуги.',
    },
    {
      title: 'Използване на информацията',
      body: 'Информацията, изпратена чрез сайта, се използва за отговор на запитвания, обработка на проектни заявки, технически консултации и подобряване на услугите ни.\nНе продаваме, не отдаваме под наем и не разпространяваме лична информация към трети страни за маркетингови цели.',
    },
    {
      title: 'Технически файлове и проектни данни',
      body: 'Чертежи, CAD модели, технически спецификации и други проектни файлове, изпратени към Novatek Engineering, се третират като поверителна информация.\nВсички проектни данни се използват само за офериране, инженерна оценка, производствено планиране и изпълнение на проекта.',
    },
    {
      title: 'Споделяне на лична информация',
      body: 'Може да споделяме информация с доверени доставчици, производствени партньори или доставчици на услуги само когато това е необходимо за изпълнение на проектна заявка или предоставяне на поискани услуги.\nТакова споделяне е ограничено до информацията, необходима за изпълнението на проекта, и се извършва при подходящи практики за поверителност.',
    },
    {
      title: 'Бисквитки и аналитика',
      body: 'Нашият сайт може да използва бисквитки и аналитични инструменти за подобряване на потребителското изживяване, наблюдение на производителността и разбиране на поведението на посетителите.\nТази информация се събира в обобщен вид и не идентифицира лично отделни потребители.',
    },
    {
      title: 'Сигурност на данните',
      body: 'Novatek Engineering прилага разумни технически и организационни мерки за защита на лична информация, проектна документация и изпратени файлове срещу неоторизиран достъп, разкриване или злоупотреба.\nВъпреки че се стремим да поддържаме сигурни системи, никой метод за електронно предаване или съхранение не може да гарантира абсолютна сигурност.',
    },
    {
      title: 'Връзки към трети страни',
      body: 'Нашият сайт може да съдържа връзки към външни сайтове или ресурси на трети страни. Novatek Engineering не носи отговорност за практиките за поверителност, съдържанието или политиките за сигурност на външни сайтове.',
    },
    {
      title: 'Контактна информация',
      body: 'Ако имате въпроси относно тази Политика за поверителност или обработката на вашата информация, моля, свържете се с Novatek Engineering чрез контактите, посочени на сайта.',
    },
  ],
}

export const getPrivacyData = cache(
  async (locale: Locale = 'en'): Promise<typeof privacyDefaults & { seo: SeoData }> => {
    const payload = await db()
    const privacy = await payload.findGlobal({ slug: 'privacy', locale })
    const defaults = locale === 'bg' ? privacyDefaultsBg : privacyDefaults

    return {
      seo: privacy.seo ?? null,
      lastUpdated: privacy.lastUpdated || defaults.lastUpdated,
      sections: privacy.sections?.length
        ? privacy.sections.map((section) => ({ title: section.title, body: section.body }))
        : defaults.sections,
    }
  },
)
