export const locales = ['en', 'bg'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'bg'
}

export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`
}

export function localizeHref(href: string, locale: Locale): string {
  if (
    locale === defaultLocale ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('http://') ||
    href.startsWith('https://')
  ) {
    return href
  }

  return `${localePrefix(locale)}${href.startsWith('/') ? href : `/${href}`}`
}

export const dictionary = {
  en: {
    common: {
      all: 'All',
      next: 'Next',
      home: 'Home',
      services: 'Services',
      features: 'Features',
      view: 'View',
      getAQuote: 'Get A Quote',
      requestAQuote: 'Request A Quote',
      contactUs: 'Contact Us',
      getInTouch: 'Get in touch',
      findUs: 'Find us',
      privacyPolicy: 'Privacy Policy',
      switchLanguage: 'Switch language',
    },
    footer: {
      mainLinks: 'Main links',
      services: 'Services',
      contactInfo: 'Contact info',
    },
    pages: {
      services: {
        eyebrow: 'What We Do',
        titleBefore: 'Our ',
        titleAccent: 'services',
        metaTitle: 'Services - Novatek Engineering',
        metaDescription:
          'Explore Novatek Engineering services including laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
      },
      portfolio: {
        eyebrow: 'Portfolio',
        titleBefore: 'Our ',
        titleAccent: 'Case studies',
        filters: 'Portfolio filters',
        metaTitle: 'Portfolio - Novatek Engineering',
        metaDescription:
          'Explore Novatek Engineering case studies across laser cutting, CNC machining, 3D scanning, 3D printing, engineering design and custom manufacturing.',
      },
      blog: {
        eyebrow: 'Blog',
        titleBefore: 'Engineering ',
        titleAccent: 'insights',
        filters: 'Blog categories',
        metaTitle: 'Blog - Novatek Engineering',
        metaDescription:
          'Engineering insights, manufacturing guides and industry news from Novatek Engineering.',
      },
      about: {
        metaTitle: 'About Us - Novatek Engineering',
        metaDescription:
          'Novatek Engineering delivers precision engineering and manufacturing solutions built on years of technical expertise.',
      },
      contact: {
        metaTitle: 'Contact - Novatek Engineering',
        metaDescription:
          'Contact Novatek Engineering for manufacturing, engineering and quote requests.',
        headingBefore: "Let's discuss your ",
        headingAccent: 'project',
      },
      privacy: {
        title: 'Privacy Policy',
        lastUpdated: 'Last updated',
        metaTitle: 'Privacy Policy - Novatek Engineering',
        metaDescription:
          'Privacy policy for Novatek Engineering website visitors and quote requests.',
      },
      service: {
        metaTitle: 'Service - Novatek Engineering',
        metaDescription: 'Precision engineering and manufacturing services by Novatek Engineering.',
        overviewEyebrow: 'Service Overview',
        applicationsEyebrow: 'Applications',
        industryColumn: 'Industry',
        applicationsColumn: 'Applications',
        industriesTitleAfter: ' solutions for different industries',
      },
      project: {
        metaTitle: 'Case Study - Novatek Engineering',
        metaDescription: 'Novatek Engineering case study.',
        relatedEyebrow: 'Related Projects',
        relatedTitleBefore: 'More',
        relatedTitleAccent: ' case studies',
        viewAll: 'View All Cases',
      },
      article: {
        metaTitle: 'Article - Novatek Engineering',
        metaDescription: 'Engineering insights from Novatek Engineering.',
        share: 'Share this article',
        relatedEyebrow: 'Related Articles',
        relatedTitleBefore: 'More ',
        relatedTitleAccent: 'articles',
        viewAll: 'View All Articles',
      },
    },
    form: {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      phone: 'Phone number',
      projectDescription: 'Project description',
      uploadFiles: 'Upload files',
      supportedFormats: 'Supported formats',
      noFiles: 'No files selected',
      fileSelected: 'file selected',
      filesSelected: 'files selected',
      sending: 'Sending...',
      sendRequest: 'Send Request',
      europe: 'We accept orders and project requests across Europe.',
      fileNaming:
        'For laser cutting files, use this naming format: Material_Thickness_File name - Quantity.',
      firstNamePlaceholder: 'Your first name',
      lastNamePlaceholder: 'Your last name',
      emailPlaceholder: 'you@example.com',
      phonePlaceholder: '+359 ...',
      messagePlaceholder: 'Tell us what you need manufactured or engineered',
    },
    submissions: {
      required: 'Please fill in your name, email, phone number and project description.',
      invalidEmail: 'Please enter a valid email address.',
      maxFiles: 'Please upload no more than 8 files.',
      totalTooLarge: 'The total upload size is too large.',
      fileTooLarge: 'is larger than 25 MB.',
      unsupportedFormat: 'is not a supported file format.',
      success: 'Your request has been sent. We will contact you shortly.',
      error: 'Something went wrong. Please try again.',
    },
  },
  bg: {
    common: {
      all: 'Всички',
      next: 'Напред',
      home: 'Начало',
      services: 'Услуги',
      features: 'Характеристики',
      view: 'Виж',
      getAQuote: 'Получете оферта',
      requestAQuote: 'Заявете оферта',
      contactUs: 'Контакти',
      getInTouch: 'Свържете се',
      findUs: 'Намерете ни',
      privacyPolicy: 'Политика за поверителност',
      switchLanguage: 'Смяна на езика',
    },
    footer: {
      mainLinks: 'Основни връзки',
      services: 'Услуги',
      contactInfo: 'Контактна информация',
    },
    pages: {
      services: {
        eyebrow: 'Какво правим',
        titleBefore: 'Нашите ',
        titleAccent: 'услуги',
        metaTitle: 'Услуги - Novatek Engineering',
        metaDescription:
          'Разгледайте услугите на Novatek Engineering: лазерно рязане, CNC обработка, 3D сканиране, 3D печат, инженерно проектиране и custom производство.',
      },
      portfolio: {
        eyebrow: 'Портфолио',
        titleBefore: 'Нашите ',
        titleAccent: 'проекти',
        filters: 'Филтри на портфолиото',
        metaTitle: 'Портфолио - Novatek Engineering',
        metaDescription:
          'Разгледайте проекти на Novatek Engineering в лазерно рязане, CNC обработка, 3D сканиране, 3D печат, инженерно проектиране и custom производство.',
      },
      blog: {
        eyebrow: 'Блог',
        titleBefore: 'Инженерни ',
        titleAccent: 'статии',
        filters: 'Категории в блога',
        metaTitle: 'Блог - Novatek Engineering',
        metaDescription: 'Инженерни статии, производствени насоки и новини от Novatek Engineering.',
      },
      about: {
        metaTitle: 'За нас - Novatek Engineering',
        metaDescription:
          'Novatek Engineering предоставя прецизни инженерни и производствени решения, изградени върху технически опит.',
      },
      contact: {
        metaTitle: 'Контакти - Novatek Engineering',
        metaDescription:
          'Свържете се с Novatek Engineering за производство, инженерни услуги и заявки за оферта.',
        headingBefore: 'Нека обсъдим вашия ',
        headingAccent: 'проект',
      },
      privacy: {
        title: 'Политика за поверителност',
        lastUpdated: 'Последна актуализация',
        metaTitle: 'Политика за поверителност - Novatek Engineering',
        metaDescription:
          'Политика за поверителност за посетители на сайта и заявки за оферта към Novatek Engineering.',
      },
      service: {
        metaTitle: 'Услуга - Novatek Engineering',
        metaDescription: 'Прецизни инженерни и производствени услуги от Novatek Engineering.',
        overviewEyebrow: 'Преглед на услугата',
        applicationsEyebrow: 'Приложения',
        industryColumn: 'Индустрия',
        applicationsColumn: 'Приложения',
        industriesTitleAfter: ' решения за различни индустрии',
      },
      project: {
        metaTitle: 'Проект - Novatek Engineering',
        metaDescription: 'Проект на Novatek Engineering.',
        relatedEyebrow: 'Свързани проекти',
        relatedTitleBefore: 'Още',
        relatedTitleAccent: ' проекти',
        viewAll: 'Вижте всички проекти',
      },
      article: {
        metaTitle: 'Статия - Novatek Engineering',
        metaDescription: 'Инженерни статии от Novatek Engineering.',
        share: 'Споделете статията',
        relatedEyebrow: 'Свързани статии',
        relatedTitleBefore: 'Още ',
        relatedTitleAccent: 'статии',
        viewAll: 'Вижте всички статии',
      },
    },
    form: {
      firstName: 'Име',
      lastName: 'Фамилия',
      email: 'Имейл адрес',
      phone: 'Телефон',
      projectDescription: 'Описание на проекта',
      uploadFiles: 'Качете файлове',
      supportedFormats: 'Поддържани формати',
      noFiles: 'Няма избрани файлове',
      fileSelected: 'избран файл',
      filesSelected: 'избрани файла',
      sending: 'Изпращане...',
      sendRequest: 'Изпратете заявка',
      europe: 'Приемаме поръчки и проектни заявки от цяла Европа.',
      fileNaming:
        'За файлове за лазерно рязане използвайте този формат на именуване: Дебелина_Материал_Име на файла - Количество.',
      firstNamePlaceholder: 'Вашето име',
      lastNamePlaceholder: 'Вашата фамилия',
      emailPlaceholder: 'you@example.com',
      phonePlaceholder: '+359 ...',
      messagePlaceholder: 'Опишете какво трябва да бъде произведено или проектирано',
    },
    submissions: {
      required: 'Моля, попълнете име, имейл, телефон и описание на проекта.',
      invalidEmail: 'Моля, въведете валиден имейл адрес.',
      maxFiles: 'Моля, качете не повече от 8 файла.',
      totalTooLarge: 'Общият размер на файловете е твърде голям.',
      fileTooLarge: 'е по-голям от 25 MB.',
      unsupportedFormat: 'не е поддържан файлов формат.',
      success: 'Вашата заявка е изпратена. Ще се свържем с вас скоро.',
      error: 'Нещо се обърка. Моля, опитайте отново.',
    },
  },
} as const

export function t(locale: Locale) {
  return dictionary[locale]
}
