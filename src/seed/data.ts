/**
 * Initial content used only by the seed script (`npx payload run src/seed/index.ts`).
 * After seeding, the CMS is the single source of truth for this data.
 */

export const postCategories = ['Manufacturing Guides', 'Engineering Insights', 'Industry News']

export const projectCategories = [
  'Laser Cutting',
  'CNC Machining',
  '3D Scanning',
  '3D Printing',
  'Engineering & Design',
  'Custom Solutions',
]

type SeedService = {
  title: string
  slug: string
  image: string
  features: string[]
  heroTitle: { before?: string; accent: string; after?: string }
  heroImage?: string
  overviewHeading: string
  overview: string
  cards: { title: string; description: string }[]
  industries: { industry: string; applications: string[] }[]
}

export const services: SeedService[] = [
  {
    title: 'Laser Cutting',
    slug: 'laser-cutting',
    image: '/assets/novatek/figma-d3ba282810-740.png',
    features: [
      'High-precision CNC laser cutting',
      'Clean and accurate edge finishing',
      'Complex shape manufacturing',
      'Steel, aluminum & stainless steel',
    ],
    heroTitle: { before: 'Precision ', accent: 'laser cutting', after: ' for industrial and custom projects' },
    heroImage: '/assets/novatek/figma-91f2ab3835-2584.png',
    overviewHeading: 'Precision laser cutting',
    overview:
      'Our laser cutting services provide accurate and efficient manufacturing for custom and industrial applications. Using CNC-controlled equipment, we produce complex parts with clean edges, tight tolerances and consistent quality across every production run.\nFrom prototypes and one-off components to large-scale production batches, we help businesses reduce lead times while maintaining precision and reliability.\nOur solutions are suitable for a wide range of industries and technical requirements. Whether for prototypes, custom parts or production batches, every project is delivered with a focus on precision, quality and manufacturing efficiency.',
    cards: [
      { title: 'High-precision cutting', description: 'Accurate CNC laser cutting with clean edges and minimal tolerances' },
      { title: 'Complex geometries', description: 'Manufacture intricate shapes and detailed components with precision' },
      { title: 'Multiple materials', description: 'Suitable for steel, stainless steel, aluminum and other metals' },
      { title: 'Fast turnaround', description: 'Efficient production workflows with reliable delivery timelines' },
    ],
    industries: [
      { industry: 'Industrial Manufacturing', applications: ['Machine components', 'Equipment parts', 'Mounting brackets', 'Structural metal elements'] },
      { industry: 'Engineering & Prototyping', applications: ['Prototype development', 'Custom technical parts', 'Small production batches', 'Product testing components'] },
      { industry: 'Construction & Architecture', applications: ['Decorative metal panels', 'Facade components', 'Custom metal structures', 'Precision-cut architectural elements'] },
    ],
  },
  {
    title: 'CNC Machining',
    slug: 'cnc-machining',
    image: '/assets/novatek/figma-1b907ecfd6-740.png',
    features: [
      'Precision CNC milling solutions',
      'Custom part manufacturing',
      'Industrial-grade machining accuracy',
      'Support for complex geometries',
    ],
    heroTitle: { before: 'Precision ', accent: 'CNC machining', after: ' for complex industrial components' },
    heroImage: '/assets/novatek/figma-b39c6ba314-2584.png',
    overviewHeading: 'Precision CNC machining',
    overview:
      'Our CNC machining services deliver high-precision manufacturing for custom and industrial components. Using advanced CNC milling equipment, we produce complex parts with exceptional accuracy, tight tolerances and reliable repeatability across every production run.\nFrom one-off prototypes to full-scale production batches, we manufacture components that meet demanding technical specifications. Our machining solutions are suitable for a wide range of industries and engineering applications.\nWhether for precision parts, custom assemblies or production components, every project is completed with a focus on accuracy, consistency and manufacturing excellence.',
    cards: [
      { title: 'Precision machining', description: 'High-accuracy CNC milling for complex parts with tight tolerances' },
      { title: 'Complex geometries', description: 'Manufacture intricate components with exceptional precision' },
      { title: 'Custom materials', description: 'Suitable for aluminum, steel, brass and engineering plastics' },
      { title: 'Reliable production', description: 'Consistent machining quality with dependable delivery timelines' },
    ],
    industries: [
      { industry: 'Industrial Manufacturing', applications: ['Precision machine parts', 'Industrial equipment', 'Tooling components', 'Mechanical assemblies'] },
      { industry: 'Engineering & Prototyping', applications: ['Prototype machining', 'Custom mechanical parts', 'Functional prototypes', 'Precision testing components'] },
      { industry: 'Automation & Robotics', applications: ['Robotic components', 'Automation fixtures', 'Precision mounting systems', 'Motion control parts'] },
    ],
  },
  {
    title: '3D Scanning',
    slug: '3d-scanning',
    image: '/assets/novatek/figma-56a5847ee2-740.png',
    features: [
      'High-precision 3D scanning',
      'CAD-ready digital models',
      'Reverse engineering support',
      'Accurate geometry capture',
    ],
    heroTitle: { before: 'Accurate ', accent: '3D scanning', after: ' for inspection and reverse engineering' },
    overviewHeading: 'Accurate 3D scanning',
    overview:
      'Our 3D scanning services capture precise digital geometry of physical parts for inspection, digitization and reverse engineering workflows. High-resolution scanners record complex surfaces with fine detail.\nScan data becomes CAD-ready references that support redesign, quality control and reproduction of legacy components.\nCombined with our engineering review, scanning turns physical objects into practical, production-ready documentation.',
    cards: [
      { title: 'High-precision scanning', description: 'Fine surface detail captured with high-resolution equipment' },
      { title: 'Complex geometries', description: 'Reliable capture of intricate shapes and organic surfaces' },
      { title: 'CAD-ready output', description: 'Scan-to-CAD models prepared for redesign and production' },
      { title: 'Fast turnaround', description: 'Quick digitization workflow with clear deliverables' },
    ],
    industries: [
      { industry: 'Reverse Engineering', applications: ['Legacy part capture', 'Discontinued components', 'CAD reconstruction', 'Design recovery'] },
      { industry: 'Quality Inspection', applications: ['Geometry comparison', 'Deviation analysis', 'Incoming part checks', 'Production validation'] },
      { industry: 'Product Development', applications: ['Product redesign', 'Fit and clearance studies', 'Digital archiving', 'Prototype iteration'] },
    ],
  },
  {
    title: '3D Printing',
    slug: '3d-printing',
    image: '/assets/novatek/figma-5971e7f1e3-740.png',
    features: [
      'Rapid prototyping solutions',
      'Functional printed components',
      'Fast design iteration workflow',
      'Custom production parts',
    ],
    heroTitle: { before: 'Rapid ', accent: '3D printing', after: ' for prototypes and production parts' },
    overviewHeading: 'Rapid 3D printing',
    overview:
      'Our 3D printing services support rapid prototyping and functional printed parts for fit checks, design validation and low-volume production. Modern printers and engineering materials deliver dependable results.\nFast design iteration keeps development moving — print, test, adjust and reprint within days instead of weeks.\nFrom concept models to end-use components, every print is prepared with attention to strength, accuracy and surface quality.',
    cards: [
      { title: 'Rapid prototyping', description: 'Functional prototypes produced in days for fast validation' },
      { title: 'Complex geometries', description: 'Print shapes that are impractical for machining' },
      { title: 'Engineering materials', description: 'Durable filaments and resins for functional testing' },
      { title: 'Fast turnaround', description: 'Quick iteration workflow with reliable delivery' },
    ],
    industries: [
      { industry: 'Product Development', applications: ['Concept models', 'Fit-test components', 'Design validation parts', 'Presentation prototypes'] },
      { industry: 'Manufacturing Support', applications: ['Assembly aids', 'Custom jigs and fixtures', 'Tooling inserts', 'Spare parts'] },
      { industry: 'Custom Production', applications: ['Custom enclosures', 'Low-volume parts', 'Replacement components', 'Functional end-use parts'] },
    ],
  },
  {
    title: 'Engineering & Design',
    slug: 'engineering-design',
    image: '/assets/novatek/figma-1a0dffa91f-740.png',
    features: [
      'CAD modeling & design',
      'Production-ready technical drawings',
      'Design optimization for manufacturing',
    ],
    heroTitle: { before: 'Practical ', accent: 'engineering & design', after: ' for production-ready solutions' },
    overviewHeading: 'Engineering & design support',
    overview:
      'Our engineering and design services turn ideas, sketches and existing parts into production-ready documentation. CAD modeling, technical drawings and manufacturability review are handled by one team.\nDesign optimization reduces cost and lead time before manufacturing starts, avoiding rework and material waste.\nWhether you need a single drawing or complete product documentation, deliverables are prepared for real production conditions.',
    cards: [
      { title: 'CAD modeling', description: 'Accurate 3D models built for manufacturing and assembly' },
      { title: 'Technical drawings', description: 'Production-ready documentation with tolerances and notes' },
      { title: 'Design optimization', description: 'Manufacturability review that reduces cost and lead time' },
      { title: 'Fast turnaround', description: 'Clear milestones and quick engineering feedback' },
    ],
    industries: [
      { industry: 'Product Development', applications: ['New product design', 'Mechanical redesign', 'Concept engineering', 'Design for manufacturing'] },
      { industry: 'Manufacturing Documentation', applications: ['Production drawings', 'Assembly documentation', 'Material specifications', 'Revision management'] },
      { industry: 'Technical Consulting', applications: ['Process selection', 'Material recommendations', 'Cost optimization', 'Feasibility studies'] },
    ],
  },
  {
    title: 'Custom Solutions',
    slug: 'custom-solutions',
    image: '/assets/novatek/figma-b29e3ab540-740.png',
    features: [
      'Custom engineering requests',
      'Prototype development support',
      'Technical consulting services',
      'Tailored manufacturing solutions',
    ],
    heroTitle: { before: 'Flexible ', accent: 'custom solutions', after: ' for non-standard manufacturing tasks' },
    overviewHeading: 'Custom manufacturing solutions',
    overview:
      'Our custom solutions combine engineering review, prototyping and mixed-process manufacturing for non-standard parts and projects that do not fit a single technology.\nWe select the right combination of laser cutting, machining, printing and design work for each request, keeping quality and budget under control.\nFrom one-off components to tailored production support, every project gets a practical manufacturing route and a single point of contact.',
    cards: [
      { title: 'Custom engineering', description: 'Tailored solutions for non-standard technical requests' },
      { title: 'Mixed processes', description: 'Laser cutting, machining and printing combined per project' },
      { title: 'Prototype support', description: 'Development support from first sample to production' },
      { title: 'Fast turnaround', description: 'Direct communication and efficient project handling' },
    ],
    industries: [
      { industry: 'Industrial Upgrades', applications: ['Special-purpose components', 'Equipment modernization', 'Custom adapters', 'Machine improvements'] },
      { industry: 'Prototype Assemblies', applications: ['Multi-part prototypes', 'Functional assemblies', 'Pre-production samples', 'Pilot batches'] },
      { industry: 'One-off Production', applications: ['Unique components', 'Replacement parts', 'Custom hardware', 'Small-series manufacturing'] },
    ],
  },
]

type SeedCase = {
  heroImage?: string
  overview: string
  approach: string
  gallery?: string[]
  specs: string[]
  results: string
}

type SeedProject = {
  title: string
  slug: string
  category: string
  description: string
  image: string
  caseStudy: SeedCase
}

const genericCase = {
  overview:
    "This project combined Novatek Engineering's manufacturing review, production planning and quality-focused delivery for a practical industrial application.",
  approach:
    'The team reviewed project files, confirmed technical requirements and selected the process path that best matched the target geometry, material and timeline.',
  specs: ['Machine components', 'Equipment parts', 'Mounting brackets', 'Structural metal elements'],
  results:
    'The completed work delivered reliable production quality, clear communication and a repeatable process that can be scaled or adapted for similar manufacturing needs.',
}

export const projects: SeedProject[] = [
  {
    title: 'Custom metal components',
    slug: 'custom-metal-components',
    category: 'Laser Cutting',
    description: 'Precision-cut steel components manufactured for industrial applications',
    image: '/assets/novatek/figma-bd8c47baa0-560.png',
    caseStudy: {
      heroImage: '/assets/novatek/figma-5107c2d1a7-2024.png',
      gallery: [
        '/assets/novatek/figma-62c65108ad-632.png',
        '/assets/novatek/figma-10f924eaeb-632.png',
        '/assets/novatek/figma-02ed1d64bc-632.png',
      ],
      overview:
        'Our laser cutting services provide accurate and efficient manufacturing for custom and industrial applications. Using CNC-controlled equipment, we produce complex parts with clean edges, tight tolerances and consistent quality across every production run.',
      approach:
        'The project involved producing a range of custom steel components using CNC laser cutting technology. Special attention was given to dimensional accuracy, material utilization and edge quality to ensure every part met production requirements. By optimizing cutting parameters and workflow efficiency, we achieved consistent results across all manufactured components.',
      specs: ['Machine components', 'Equipment parts', 'Mounting brackets', 'Structural metal elements'],
      results:
        'The completed components were delivered with high dimensional accuracy, clean edge quality and consistent repeatability across the production run. The project demonstrated the efficiency of CNC laser cutting for manufacturing durable industrial parts while maintaining fast turnaround times and reliable production standards.',
    },
  },
  {
    title: 'Product development solutions',
    slug: 'product-development-solutions',
    category: 'Engineering & Design',
    description: 'Custom engineering design and CAD development for manufacturing projects',
    image: '/assets/novatek/figma-3c3206f498-560.png',
    caseStudy: { ...genericCase },
  },
  {
    title: 'Reverse engineered fixtures',
    slug: 'reverse-engineered-fixtures',
    category: '3D Scanning',
    description: 'Digital capture and redesign workflow for worn production fixtures',
    image: '/assets/novatek/figma-56a5847ee2-740.png',
    caseStudy: { ...genericCase },
  },
  {
    title: 'CNC machine parts',
    slug: 'cnc-machine-parts',
    category: 'CNC Machining',
    description: 'Precision-machined components prepared for industrial equipment maintenance',
    image: '/assets/novatek/figma-1b907ecfd6-740.png',
    caseStudy: { ...genericCase },
  },
  {
    title: 'Rapid prototype housings',
    slug: 'rapid-prototype-housings',
    category: '3D Printing',
    description: 'Functional printed housings used to validate product fit and assembly',
    image: '/assets/novatek/figma-5971e7f1e3-740.png',
    caseStudy: { ...genericCase },
  },
  {
    title: 'Custom production support',
    slug: 'custom-production-support',
    category: 'Custom Solutions',
    description: 'A tailored manufacturing plan combining design review, prototyping and delivery',
    image: '/assets/novatek/figma-b29e3ab540-740.png',
    caseStudy: { ...genericCase },
  },
]

type SeedPost = {
  title: string
  slug: string
  category: string
  date: string
  description: string
  image: string
  heroImage: string
  article: {
    overview: string
    keyPoints: string[]
    details: string
    quote: string
    conclusion: string
  }
}

export const posts: SeedPost[] = [
  {
    title: 'Laser cutting tips',
    slug: 'laser-cutting-tips',
    category: 'Manufacturing Guides',
    date: '2025-10-17',
    description: 'Practical insights for improving production efficiency and part quality',
    image: '/assets/novatek/figma-a1ccef41a1-723.png',
    heroImage: '/assets/novatek/figma-b98e1714f3-2024.png',
    article: {
      overview:
        'Laser cutting performance depends on proper machine setup, material selection and optimized production workflows. By applying best practices throughout the cutting process, manufacturers can achieve cleaner edges, tighter tolerances and greater production efficiency while reducing material waste.',
      keyPoints: [
        'Cutting parameter optimization',
        'Material selection',
        'Edge quality improvement',
        'Production efficiency',
      ],
      details:
        'Consistent laser cutting results require proper machine calibration, optimized cutting parameters and suitable material selection. Following these practices helps improve part quality, reduce production errors and maintain reliable manufacturing performance.',
      quote:
        'True efficiency in manufacturing is not measured by speed alone, but by the ability to create reliable, repeatable and scalable processes. Companies that continuously improve their workflows, embrace innovation and invest in operational excellence are better positioned to meet changing market demands and maintain a competitive advantage.',
      conclusion:
        'As manufacturing technologies continue to evolve, businesses that prioritize process improvement and production efficiency can achieve higher quality standards, faster turnaround times and stronger long-term performance. Modern manufacturing success is built on the combination of skilled expertise, advanced technology and optimized workflows.',
    },
  },
  {
    title: 'Reverse engineering',
    slug: 'reverse-engineering',
    category: 'Engineering Insights',
    date: '2025-10-22',
    description: 'Modern techniques for recreating and optimizing existing components',
    image: '/assets/novatek/figma-69735fffde-723.png',
    heroImage: '/assets/novatek/figma-56a5847ee2-740.png',
    article: {
      overview:
        'Reverse engineering is useful when original drawings are missing, parts have changed over time, or a component needs to be improved before reproduction. A structured digital workflow turns an existing physical part into a reliable manufacturing model.',
      keyPoints: [
        '3D scanning and measurement',
        'CAD reconstruction',
        'Design review and optimization',
        'Manufacturing preparation',
      ],
      details:
        'A strong workflow combines measurement, 3D scanning, CAD reconstruction and engineering review so the final model is practical to manufacture and matches how the part is actually used.',
      quote:
        'The best results come from understanding what the part does, not only what it looks like. Function, fit and material choice all guide the redesign toward a component that performs better than the original.',
      conclusion:
        'With a complete digital model in hand, teams can reproduce discontinued components, correct known weak points and prepare parts for modern manufacturing methods with confidence.',
    },
  },
  {
    title: 'Manufacturing trends',
    slug: 'manufacturing-trends',
    category: 'Industry News',
    date: '2025-10-27',
    description: 'Latest developments in engineering and industrial production technologies',
    image: '/assets/novatek/figma-3e5cadbd87-723.png',
    heroImage: '/assets/novatek/figma-b29e3ab540-740.png',
    article: {
      overview:
        'Modern manufacturing is moving toward faster iteration, flexible production and better digital preparation before parts reach the shop floor. Companies that adapt their processes early benefit from shorter lead times and more predictable results.',
      keyPoints: [
        'Digital process preparation',
        'Additive manufacturing growth',
        'Flexible small-batch production',
        'Integrated CAD-to-CNC workflows',
      ],
      details:
        'CAD, 3D scanning, additive manufacturing and CNC processes now work together more often, making it easier to validate parts before full production and to switch between prototyping and serial manufacturing.',
      quote:
        'For small and mid-sized projects, clearer estimates, fewer reworks and a smoother path from concept to finished component are the real measures of manufacturing progress.',
      conclusion:
        'Manufacturers that embrace these tools gain shorter lead times, more consistent quality and a stronger position in a rapidly changing industry.',
    },
  },
]
