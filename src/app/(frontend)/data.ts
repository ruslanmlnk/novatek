export type NavItem = {
  label: string
  href: string
}

export type ButtonData = {
  label: string
  href: string
}

export type HighlightedText = {
  before?: string
  accent: string
  after?: string
}

export type SectionHeadingData = {
  eyebrow: string
  title: HighlightedText
  button?: ButtonData
}

export type Service = {
  title: string
  image: string
  features: string[]
}

export const siteData = {
  brand: {
    name: 'Novatek',
    tagline: 'Engineering',
  },
  nav: [
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacts', href: '/contact' },
  ] satisfies NavItem[],
  hero: {
    backgroundImage: '/assets/novatek/figma-f56c2eedc3-2880.png',
    eyebrow: 'Custom manufacturing solutions',
    title: {
      before: 'Precision ',
      accent: 'engineering & manufacturing',
    },
    description:
      'Laser cutting, CNC machining, 3D scanning, reverse engineering and custom manufacturing solutions with fast turnaround and engineering precision.',
    buttons: [
      { label: 'Request A Quote', href: '#quote' },
      { label: 'View Services', href: '#services' },
    ] satisfies ButtonData[],
  },
  whyChoose: {
    heading: {
      eyebrow: 'Why Choose Us',
      title: {
        before: 'Driven by precision, built for ',
        accent: 'modern manufacturing',
      },
      button: { label: 'Learn More About Us', href: '#about' },
    } satisfies SectionHeadingData,
    cards: [
      {
        eyebrow: 'Custom solutions',
        metric: '20+',
        description: 'Completed engineering and manufacturing projects across multiple industries',
        image: '/assets/novatek/figma-5401cf17d5-112.png',
      },
      {
        title: 'Fast turnaround',
        description: 'Efficient production workflows with reliable delivery timelines',
        image: '/assets/novatek/figma-f70dfc9338-819.png',
      },
      {
        eyebrow: 'Trusted engineering',
        metric: '100+',
        description:
          'Trusted by businesses across multiple industrial sectors and manufacturing industries',
        rating: '4.9',
      },
    ],
  },
  services: {
    heading: {
      eyebrow: 'What We Do',
      title: {
        before: 'Advanced ',
        accent: 'engineering services',
        after: ' for industrial production',
      },
      button: { label: 'Get A Quote', href: '#quote' },
    } satisfies SectionHeadingData,
    items: [
      {
        title: 'Laser Cutting',
        image: '/assets/novatek/figma-d3ba282810-740.png',
        features: [
          'High-precision CNC laser cutting',
          'Clean and accurate edge finishing',
          'Complex shape manufacturing',
          'Steel, aluminum & stainless steel',
        ],
      },
      {
        title: 'CNC Machining',
        image: '/assets/novatek/figma-1b907ecfd6-740.png',
        features: [
          'Precision CNC milling solutions',
          'Custom part manufacturing',
          'Industrial-grade machining accuracy',
          'Support for complex geometries',
        ],
      },
      {
        title: '3D Scanning',
        image: '/assets/novatek/figma-56a5847ee2-740.png',
        features: [
          'High-precision 3D scanning',
          'CAD-ready digital models',
          'Reverse engineering support',
          'Accurate geometry capture',
        ],
      },
      {
        title: '3D Printing',
        image: '/assets/novatek/figma-5971e7f1e3-740.png',
        features: [
          'Rapid prototyping solutions',
          'Functional printed components',
          'Fast design iteration workflow',
          'Custom production parts',
        ],
      },
      {
        title: 'Engineering & Design',
        image: '/assets/novatek/figma-1a0dffa91f-740.png',
        features: [
          'CAD modeling & design',
          'Production-ready technical drawings',
          'Design optimization for manufacturing',
        ],
      },
      {
        title: 'Custom Solutions',
        image: '/assets/novatek/figma-b29e3ab540-740.png',
        features: [
          'Custom engineering requests',
          'Prototype development support',
          'Technical consulting services',
          'Tailored manufacturing solutions',
        ],
      },
    ] satisfies Service[],
  },
  process: {
    eyebrow: 'How It Works',
    title: {
      before: 'A streamlined process ',
      accent: 'from idea to delivery',
    },
    image: '/assets/novatek/process-01.png',
    features: [
      'CAD and drawing upload',
      'Multiple file formats supported',
      'Fast request processing',
      'Direct communication',
    ],
    steps: [
      {
        number: '01',
        title: 'Upload your request',
        image: '/assets/novatek/process-01.png',
        description:
          'Send your drawings, files or project requirements through our website. We review every request individually to understand your production needs.',
        features: [
          'CAD and drawing upload',
          'Multiple file formats supported',
          'Fast request processing',
          'Direct communication',
        ],
      },
      {
        number: '02',
        title: 'Engineering review',
        mobileTitle: 'Engineering Analysis',
        image: '/assets/novatek/process-02.png',
        description:
          'Our specialists analyze the project, materials and technical requirements to determine the most effective manufacturing solution.',
        features: [
          'Technical project assessment',
          'Material selection support',
          'Production planning',
          'Engineering consultation',
        ],
      },
      {
        number: '03',
        title: 'Manufacturing process',
        mobileTitle: 'Precision Production',
        image: '/assets/novatek/process-03.png',
        description:
          'Using modern equipment and precision technologies, we manufacture parts according to your specifications and quality standards.',
        features: [
          'Laser cutting technology',
          'CNC machining processes',
          '3D scanning solutions',
          'Quality control procedures',
        ],
      },
      {
        number: '04',
        title: 'Delivery & support',
        mobileTitle: 'Quality & Delivery',
        image: '/assets/novatek/process-04.png',
        description:
          'Completed parts are prepared for delivery, while our team remains available to provide updates and ongoing project support.',
        features: [
          'Secure packaging',
          'Reliable delivery service',
          'Project status updates',
          'Ongoing customer support',
        ],
      },
    ],
  },
  projects: {
    eyebrow: 'Selected Projects',
    title: {
      before: 'Engineering solutions ',
      accent: 'delivered in practice',
    },
    featured: {
      category: 'Laser cutting',
      title: 'Custom Metal Components',
      description: 'Precision-cut steel components manufactured for industrial applications',
      image: '/assets/novatek/projects-featured-1450.png',
      button: { label: 'View Project', href: '/portfolio/custom-metal-components' },
    },
    cta: {
      title: 'Want to see more projects?',
      description:
        'Explore our portfolio of engineering, manufacturing and reverse engineering projects',
      button: { label: 'View All Projects', href: '/portfolio' },
    },
  },
  testimonials: {
    eyebrow: 'Client Testimonials',
    title: {
      before: 'What our clients ',
      accent: 'say about us',
    },
    badge: 'Happy clients worldwide',
    quote:
      'Their precision engineering and attention to detail exceeded our expectations. From prototyping to delivery, the entire process was seamless and professional.',
    author: 'John Matthews',
    role: 'Procurement Manager',
    avatars: [
      '/assets/novatek/figma-46db34ac37-100.png',
      '/assets/novatek/figma-c97031fe59-100.png',
      '/assets/novatek/figma-79734b25a6-100.png',
      '/assets/novatek/figma-e7f71b3351-100.png',
    ],
  },
  quote: {
    title: 'Ready to start your next project?',
    button: { label: 'Request A Quote', href: '#quote' },
  },
  faq: {
    eyebrow: 'FAQ',
    title: {
      before: 'Frequently Asked ',
      accent: 'Questions',
    },
    items: [
      {
        question: 'What are common manufacturing processes?',
        answer:
          'The most common manufacturing processes include CNC machining, sheet metal fabrication, laser cutting, 3D printing and assembly workflows.',
      },
      {
        question: 'What file formats do you accept?',
        answer:
          'We can review CAD files, technical drawings, STEP, STL, DXF, PDF and common image references.',
      },
      {
        question: 'What is the maximum material thickness?',
        answer:
          'It depends on the material and process. Send the specification and we will confirm the best production route.',
      },
      {
        question: 'Can you manufacture custom parts?',
        answer:
          'Yes. Custom parts, prototypes and short production runs are part of our engineering workflow.',
      },
      {
        question: 'What industries use laser cutting?',
        answer:
          'Industrial production, construction, automotive, furniture, signage and product development all use laser cutting.',
      },
      {
        question: 'How long does production take?',
        answer:
          'Turnaround depends on complexity, material availability and quantity. Simple requests can move quickly after approval.',
      },
    ],
  },
  footer: {
    tagline: 'Engineering solutions built on precision. Manufacturing delivered with confidence.',
    mapImage: '/assets/novatek/figma-c96280815e-655.png',
    contact: [
      '+359 878 668 410',
      'office@novatek-engineering.com',
      '42 Vasil Levski Blvd, Plovdiv 4003, Bulgaria',
    ],
    copyright: 'Novatek Engineering LTD © 2026',
    socials: ['Instagram', 'TikTok'],
  },
}
