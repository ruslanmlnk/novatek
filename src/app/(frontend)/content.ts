import { siteData } from './data'

export const serviceSlugs: Record<string, string> = {
  '3D Printing': '3d-printing',
  '3D Scanning': '3d-scanning',
  'CNC Machining': 'cnc-machining',
  'Custom Solutions': 'custom-solutions',
  'Engineering & Design': 'engineering-design',
  'Laser Cutting': 'laser-cutting',
}

type ServiceExtra = {
  applications: string[]
  capabilities: string[]
  intro: string
}

export const serviceDetails = siteData.services.items.map((service) => {
  const commonProcess = [
    'Review files, requirements and project constraints',
    'Confirm materials, tolerances and delivery expectations',
    'Prepare the technical production plan',
    'Manufacture, inspect and prepare the result for delivery',
  ]

  const detailMap: Record<string, ServiceExtra> = {
    '3D Printing': {
      intro:
        'Rapid prototyping and functional printed parts for fit checks, design validation and low-volume production support.',
      capabilities: [
        'Prototype production',
        'Functional geometry testing',
        'Design iteration support',
        'Custom production parts',
      ],
      applications: ['Product prototypes', 'Fit-test components', 'Assembly aids', 'Custom enclosures'],
    },
    '3D Scanning': {
      intro:
        'Accurate geometry capture for inspection, digitization and reverse engineering workflows.',
      capabilities: [
        'High-precision 3D scanning',
        'Scan-to-CAD references',
        'Part digitization',
        'Geometry comparison support',
      ],
      applications: [
        'Reverse engineering',
        'Legacy part capture',
        'Quality inspection',
        'Product redesign',
      ],
    },
    'CNC Machining': {
      intro:
        'Precision CNC machining for custom mechanical parts, production fixtures and industrial components.',
      capabilities: [
        'CNC milling solutions',
        'Custom part manufacturing',
        'Complex geometry support',
        'Tolerance-focused engineering review',
      ],
      applications: ['Machine parts', 'Fixtures', 'Tooling', 'Mechanical assemblies'],
    },
    'Custom Solutions': {
      intro:
        'Flexible engineering and manufacturing support for non-standard parts, prototypes and mixed-process projects.',
      capabilities: [
        'Custom engineering requests',
        'Prototype development',
        'Technical consulting',
        'Tailored manufacturing routes',
      ],
      applications: [
        'Special-purpose components',
        'Industrial upgrades',
        'Prototype assemblies',
        'One-off production requests',
      ],
    },
    'Engineering & Design': {
      intro:
        'CAD modeling, production drawings and manufacturability-focused engineering support.',
      capabilities: [
        'CAD modeling and design',
        'Production-ready drawings',
        'Design optimization',
        'Material and process recommendations',
      ],
      applications: [
        'Product development',
        'Mechanical redesign',
        'Production documentation',
        'Technical consultation',
      ],
    },
    'Laser Cutting': {
      intro:
        'High-precision CNC laser cutting for clean, repeatable metal parts and industrial components.',
      capabilities: [
        'DXF and CAD file review',
        'Clean and accurate edge finishing',
        'Complex shape manufacturing',
        'Steel, aluminum and stainless steel',
      ],
      applications: ['Machine guards', 'Mounting brackets', 'Equipment panels', 'Structural parts'],
    },
  }

  const details = detailMap[service.title] ?? {
    applications: service.features,
    capabilities: service.features,
    intro: service.features.join(', '),
  }

  return {
    ...service,
    slug: serviceSlugs[service.title],
    ...details,
    process: commonProcess,
  }
})

export type ServiceDetail = (typeof serviceDetails)[number]

export const portfolioProjects = [
  {
    slug: 'custom-metal-components',
    category: 'Laser Cutting',
    title: 'Custom metal components',
    description: 'Precision-cut steel components manufactured for industrial applications',
    image:
      '/assets/novatek/figma-bd8c47baa0-560.png',
  },
  {
    slug: 'product-development-solutions',
    category: 'Engineering & Design',
    title: 'Product development solutions',
    description: 'Custom engineering design and CAD development for manufacturing projects',
    image:
      '/assets/novatek/figma-3c3206f498-560.png',
  },
  {
    slug: 'reverse-engineered-fixtures',
    category: '3D Scanning',
    title: 'Reverse engineered fixtures',
    description: 'Digital capture and redesign workflow for worn production fixtures',
    image:
      '/assets/novatek/figma-56a5847ee2-740.png',
  },
  {
    slug: 'cnc-machine-parts',
    category: 'CNC Machining',
    title: 'CNC machine parts',
    description: 'Precision-machined components prepared for industrial equipment maintenance',
    image:
      '/assets/novatek/figma-1b907ecfd6-740.png',
  },
  {
    slug: 'rapid-prototype-housings',
    category: '3D Printing',
    title: 'Rapid prototype housings',
    description: 'Functional printed housings used to validate product fit and assembly',
    image:
      '/assets/novatek/figma-5971e7f1e3-740.png',
  },
  {
    slug: 'custom-production-support',
    category: 'Custom Solutions',
    title: 'Custom production support',
    description: 'A tailored manufacturing plan combining design review, prototyping and delivery',
    image:
      '/assets/novatek/figma-b29e3ab540-740.png',
  },
]

export const blogPosts = [
  {
    slug: 'laser-cutting-tips',
    category: 'Manufacturing Guides',
    date: '17 Oct 25',
    title: 'Laser cutting tips',
    description: 'Practical insights for improving production efficiency and part quality',
    image:
      '/assets/novatek/figma-a1ccef41a1-723.png',
    body: [
      'Successful laser cutting starts with clean drawings, clear tolerances and material choices that match the final application.',
      'Nesting strategy, edge requirements and downstream operations can affect turnaround time and cost. Sharing critical dimensions early helps the engineering team choose the right cutting parameters.',
      'When parts will be bent, welded or assembled, include those requirements with the request so the cutting plan supports the complete manufacturing workflow.',
    ],
  },
  {
    slug: 'reverse-engineering',
    category: 'Engineering Insights',
    date: '22 Oct 25',
    title: 'Reverse engineering',
    description: 'Modern techniques for recreating and optimizing existing components',
    image:
      '/assets/novatek/figma-69735fffde-723.png',
    body: [
      'Reverse engineering is useful when original drawings are missing, parts have changed over time, or a component needs to be improved before reproduction.',
      'A strong workflow combines measurement, 3D scanning, CAD reconstruction and engineering review so the final model is practical to manufacture.',
      'The best results come from understanding what the part does, not only what it looks like. Function, fit and material choice all guide the redesign.',
    ],
  },
  {
    slug: 'manufacturing-trends',
    category: 'Industry News',
    date: '27 Oct 25',
    title: 'Manufacturing trends',
    description: 'Latest developments in engineering and industrial production technologies',
    image:
      '/assets/novatek/figma-3e5cadbd87-723.png',
    body: [
      'Modern manufacturing is moving toward faster iteration, flexible production and better digital preparation before parts reach the shop floor.',
      'CAD, 3D scanning, additive manufacturing and CNC processes now work together more often, making it easier to validate parts before full production.',
      'For small and mid-sized projects, this means clearer estimates, fewer reworks and a smoother path from concept to finished component.',
    ],
  },
]
