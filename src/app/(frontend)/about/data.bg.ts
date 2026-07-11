import type { ButtonData, HighlightedText } from '../data'
import type { aboutData } from './data'

/** Bulgarian static fallback content — mirrors the shape of `aboutData`. */
export const aboutDataBg: typeof aboutData = {
  hero: {
    eyebrow: 'Кои сме ние',
    title: { before: 'За ', accent: 'нас' } satisfies HighlightedText,
    image: '/assets/novatek/figma-bcfa9eacaa-1398.png',
    description:
      'Помагаме на бизнесите да превърнат идеите си в производими решения чрез прецизно инженерство, модерни производствени технологии и ангажимент към качеството на всеки етап от процеса.',
    button: { label: 'Свържете се с нас', href: '/#contacts' } satisfies ButtonData,
  },
  story: {
    eyebrow: 'Нашата история',
    title: {
      before: 'Инженерно съвършенство, изградено през годините на ',
      accent: 'прецизно производство',
      after: ' и технически опит',
    } satisfies HighlightedText,
    image: '/assets/novatek/figma-b032621cfa-588.png',
    storyHeading: 'Нашата история',
    storyText:
      'Novatek Engineering е създадена, за да предоставя надеждни инженерни и производствени решения за бизнеси, които изискват прецизност, скорост и технически опит. Съчетавайки модерните технологии с практичен подход, помагаме концепции, чертежи и съществуващи компоненти да се превърнат в готови за производство решения. Фокусът ни е не само върху изработката на детайли, а върху решаването на инженерни предизвикателства чрез качество, ефективност и надеждно изпълнение.',
    capabilitiesHeading: 'Нашите възможности',
    button: { label: 'Разгледайте услугите ни', href: '/#services' } satisfies ButtonData,
  },
  techPartners: {
    eyebrow: 'Технологични партньори',
    title: {
      before: 'Задвижвани от водещи ',
      accent: 'инженерни технологии',
    } satisfies HighlightedText,
    partners: [
      { name: 'Revopoint', image: '/assets/novatek/revopoint.svg' },
      { name: 'Bambu Store', image: '/assets/novatek/figma-03f3037f7f-400.png' },
      { name: 'Haas Automation', image: '/assets/novatek/figma-9c02c0c372-154.png' },
      { name: 'Bodor Laser', image: '/assets/novatek/figma-68655a2d2a-296.png' },
      { name: 'INSIZE', image: '/assets/novatek/insize.png' },
    ],
  },
}
