import type { ButtonData, HighlightedText } from '../data'

export const aboutData = {
  hero: {
    eyebrow: 'Who We Are',
    title: { before: 'About ', accent: 'us' } satisfies HighlightedText,
    image: '/assets/novatek/figma-bcfa9eacaa-1398.png',
    description:
      'We help businesses transform ideas into manufacturable solutions through precision engineering, advanced production technologies and a commitment to quality at every stage of the process.',
    button: { label: 'Contact Us', href: '/#contacts' } satisfies ButtonData,
  },
  story: {
    eyebrow: 'Our Story',
    title: {
      before: 'Engineering excellence built through years of ',
      accent: 'precision manufacturing',
      after: ' and technical expertise',
    } satisfies HighlightedText,
    image: '/assets/novatek/figma-b032621cfa-588.png',
    storyHeading: 'Our story',
    storyText:
      'Novatek Engineering was founded to provide reliable engineering and manufacturing solutions for businesses requiring precision, speed and technical expertise. By combining modern technologies with a practical approach, we help transform concepts, drawings and existing components into production-ready solutions. Our focus is not only on manufacturing parts, but on solving engineering challenges through quality, efficiency and dependable execution.',
    capabilitiesHeading: 'Our capabilities',
    button: { label: 'Explore Our Services', href: '/#services' } satisfies ButtonData,
  },
  techPartners: {
    eyebrow: 'Technology Partners',
    title: {
      before: 'Powered by industry-leading ',
      accent: 'engineering technologies',
    } satisfies HighlightedText,
    partners: [
      { name: 'Haas Automation', image: '/assets/novatek/figma-9c02c0c372-154.png' },
      { name: 'Partner', image: '/assets/novatek/figma-03f3037f7f-400.png' },
      { name: 'Partner', image: '/assets/novatek/figma-68655a2d2a-296.png' },
    ],
  },
}
