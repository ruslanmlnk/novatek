/**
 * Fills the "bg" locale of the CMS with Bulgarian translations.
 * Globals are translated from the static bg datasets (same content by index),
 * collections via an exact-string EN → BG map. Array row ids are preserved so
 * the shared (non-localized) structure and the EN locale stay untouched.
 * Untranslated strings are left to fall back to EN and reported at the end.
 * Usage: npm run payload run scripts/fill-bg-locale.ts
 */
import { getPayload } from 'payload'

Object.assign(process.env, { NODE_ENV: 'production' })

const { default: config } = await import('../src/payload.config')
const { siteDataBg } = await import('../src/app/(frontend)/data.bg')
const { aboutDataBg } = await import('../src/app/(frontend)/about/data.bg')

const misses = new Set<string>()

const TR: Record<string, string> = {
  // Services — titles & hero titles
  'Laser Cutting': 'Лазерно рязане',
  'CNC Machining': 'CNC обработка',
  '3D Scanning': '3D сканиране',
  '3D Printing': '3D печат',
  'Engineering & Design': 'Инженеринг и дизайн',
  'Custom Solutions': 'Персонализирани решения',
  'Precision ': 'Прецизно ',
  'laser cutting': 'лазерно рязане',
  ' for industrial and custom projects': ' за индустриални и персонализирани проекти',
  'CNC machining': 'CNC обработка',
  ' for complex industrial components': ' за сложни индустриални компоненти',
  'High-precision ': 'Високопрецизно ',
  '3D scanning': '3D сканиране',
  ' for engineering and manufacturing': ' за инженерство и производство',
  'Industrial ': 'Индустриален ',
  '3D printing': '3D печат',
  ' for prototypes and functional parts': ' за прототипи и функционални части',
  'Custom engineering ': 'Персонализирани инженерни ',
  solutions: 'решения',
  ' for unique manufacturing challenges': ' за уникални производствени предизвикателства',
  'Engineering & design': 'Инженеринг и дизайн',
  ' for custom manufacturing solutions': ' за персонализирани производствени решения',
  // Overview headings
  'Precision laser cutting': 'Прецизно лазерно рязане',
  'Precision CNC machining': 'Прецизна CNC обработка',
  'High-precision 3D scanning': 'Високопрецизно 3D сканиране',
  'Industrial 3D printing': 'Индустриален 3D печат',
  'Custom engineering solutions': 'Персонализирани инженерни решения',
  // Overviews
  'Our laser cutting services provide accurate and efficient manufacturing for custom and industrial applications. Using CNC-controlled equipment, we produce complex parts with clean edges, tight tolerances and consistent quality across every production run.\nFrom prototypes and one-off components to large-scale production batches, we help businesses reduce lead times while maintaining precision and reliability.\nOur solutions are suitable for a wide range of industries and technical requirements. Whether for prototypes, custom parts or production batches, every project is delivered with a focus on precision, quality and manufacturing efficiency.':
    'Нашите услуги за лазерно рязане осигуряват точно и ефективно производство за персонализирани и индустриални приложения. С CNC-управлявано оборудване произвеждаме сложни детайли с чисти ръбове, тесни допуски и постоянно качество при всяка производствена серия.\nОт прототипи и единични компоненти до големи производствени серии, помагаме на бизнесите да съкратят сроковете, като запазват прецизността и надеждността.\nНашите решения са подходящи за широк спектър от индустрии и технически изисквания. Независимо дали става дума за прототипи, персонализирани детайли или производствени серии, всеки проект се изпълнява с фокус върху прецизността, качеството и производствената ефективност.',
  'Our CNC machining services deliver high-precision manufacturing for custom and industrial components. Using advanced CNC milling equipment, we produce complex parts with exceptional accuracy, tight tolerances and reliable repeatability across every production run. From one-off prototypes to full-scale production batches, we manufacture components that meet demanding technical specifications. Our machining solutions are suitable for a wide range of industries and engineering applications. Whether for precision parts, custom assemblies or production components, every project is completed with a focus on accuracy, consistency and manufacturing excellence.':
    'Нашите услуги за CNC обработка осигуряват високопрецизно производство на персонализирани и индустриални компоненти. С модерно CNC фрезово оборудване произвеждаме сложни детайли с изключителна точност, тесни допуски и надеждна повторяемост при всяка производствена серия. От единични прототипи до пълномащабни производствени серии, произвеждаме компоненти, отговарящи на взискателни технически спецификации. Нашите решения за механична обработка са подходящи за широк спектър от индустрии и инженерни приложения. Независимо дали става дума за прецизни детайли, персонализирани възли или производствени компоненти, всеки проект се изпълнява с фокус върху точността, последователността и производственото съвършенство.',
  'Our 3D scanning services provide accurate digital capture of existing components for engineering, inspection and reverse engineering applications. Using advanced optical scanning technology, we create detailed CAD-ready models with exceptional precision and reliability. From individual parts to complex mechanical assemblies, we help accelerate product development, quality inspection and manufacturing workflows. Our scanning solutions are suitable for a wide range of industrial and technical applications. Whether for reverse engineering, quality control or product development, every project is completed with a focus on accuracy, efficiency and dependable digital results.':
    'Нашите услуги за 3D сканиране осигуряват точно дигитално заснемане на съществуващи компоненти за инженерни, инспекционни и обратно инженерни приложения. С модерна оптична сканираща технология създаваме детайлни CAD-готови модели с изключителна прецизност и надеждност. От отделни детайли до сложни механични възли, помагаме за ускоряване на разработката на продукти, контрола на качеството и производствените процеси. Нашите решения за сканиране са подходящи за широк спектър от индустриални и технически приложения. Независимо дали става дума за обратно инженерство, контрол на качеството или разработка на продукти, всеки проект се изпълнява с фокус върху точността, ефективността и надеждните дигитални резултати.',
  'Our 3D printing services provide fast and cost-effective production of prototypes, functional components and custom parts. Using modern additive manufacturing technologies, we produce accurate models with complex geometries and consistent quality. From concept validation to low-volume production, we help accelerate product development while reducing manufacturing time and material waste. Our 3D printing solutions support a wide range of engineering and industrial applications. Whether for prototyping, product development or custom manufacturing, every project is completed with a focus on precision, efficiency, repeatability and reliable production.':
    'Нашите услуги за 3D печат осигуряват бързо и рентабилно производство на прототипи, функционални компоненти и персонализирани детайли. С модерни технологии за адитивно производство създаваме точни модели със сложна геометрия и постоянно качество. От валидиране на концепции до малки производствени серии, помагаме за ускоряване на разработката на продукти, като намаляваме производственото време и отпадъците от материали. Нашите решения за 3D печат поддържат широк спектър от инженерни и индустриални приложения. Независимо дали става дума за прототипиране, разработка на продукти или персонализирано производство, всеки проект се изпълнява с фокус върху прецизността, ефективността, повторяемостта и надеждното производство.',
  'Our custom solutions are designed for projects that require a unique engineering approach beyond standard manufacturing processes. We work closely with clients to develop tailored solutions that meet specific technical, functional and production requirements. From custom components and prototype development to specialized manufacturing support, we combine engineering expertise with modern technologies to deliver reliable and efficient results. Every solution is developed with practicality, precision and long-term performance in mind. Whether for one-off projects, complex assemblies or specialized production requirements, every project is completed with a focus on flexibility, innovation, efficiency and dependable execution.':
    'Нашите персонализирани решения са предназначени за проекти, изискващи уникален инженерен подход отвъд стандартните производствени процеси. Работим в тясно сътрудничество с клиентите, за да разработим индивидуални решения, отговарящи на конкретни технически, функционални и производствени изисквания. От персонализирани компоненти и разработка на прототипи до специализирана производствена поддръжка, съчетаваме инженерен опит с модерни технологии, за да постигнем надеждни и ефективни резултати. Всяко решение се разработва с мисъл за практичност, прецизност и дългосрочна ефективност. Независимо дали става дума за единични проекти, сложни възли или специализирани производствени изисквания, всеки проект се изпълнява с фокус върху гъвкавостта, иновациите, ефективността и надеждното изпълнение.',
  'Our engineering and design services help transform concepts, sketches and existing components into production-ready solutions. Using advanced CAD software and practical engineering expertise, we develop accurate technical documentation optimized for manufacturing. From concept development to production-ready designs, we support every stage of the engineering process with a focus on functionality, manufacturability and long-term performance. Our solutions are tailored to meet the technical requirements of a wide range of industries. Whether for product development, reverse engineering or design optimization, every project is completed with a focus on precision, efficiency, innovation and reliable engineering solutions.':
    'Нашите услуги по инженеринг и дизайн помагат концепции, скици и съществуващи компоненти да се превърнат в готови за производство решения. С модерен CAD софтуер и практически инженерен опит разработваме точна техническа документация, оптимизирана за производство. От разработка на концепции до готови за производство проекти, подкрепяме всеки етап от инженерния процес с фокус върху функционалността, технологичността и дългосрочната ефективност. Нашите решения са съобразени с техническите изисквания на широк спектър от индустрии. Независимо дали става дума за разработка на продукти, обратно инженерство или оптимизация на дизайна, всеки проект се изпълнява с фокус върху прецизността, ефективността, иновациите и надеждните инженерни решения.',
  // Service SEO
  'Laser Cutting - Novatek Engineering': 'Лазерно рязане - Novatek Engineering',
  'CNC Machining - Novatek Engineering': 'CNC обработка - Novatek Engineering',
  '3D Scanning - Novatek Engineering': '3D сканиране - Novatek Engineering',
  '3D Printing - Novatek Engineering': '3D печат - Novatek Engineering',
  'Engineering & Design - Novatek Engineering': 'Инженеринг и дизайн - Novatek Engineering',
  'Custom Solutions - Novatek Engineering': 'Персонализирани решения - Novatek Engineering',
  'Our CNC machining services deliver high-precision manufacturing for custom and industrial components.':
    'Нашите услуги за CNC обработка осигуряват високопрецизно производство на персонализирани и индустриални компоненти.',
  'Our 3D scanning services provide accurate digital capture of existing components for engineering, inspection and reverse engineering applications.':
    'Нашите услуги за 3D сканиране осигуряват точно дигитално заснемане на съществуващи компоненти за инженерни, инспекционни и обратно инженерни приложения.',
  'Our 3D printing services provide fast and cost-effective production of prototypes, functional components and custom parts.':
    'Нашите услуги за 3D печат осигуряват бързо и рентабилно производство на прототипи, функционални компоненти и персонализирани детайли.',
  'Our custom solutions are designed for projects that require a unique engineering approach beyond standard manufacturing processes.':
    'Нашите персонализирани решения са предназначени за проекти, изискващи уникален инженерен подход отвъд стандартните производствени процеси.',
  'Our engineering and design services help transform concepts, sketches and existing components into production-ready solutions.':
    'Нашите услуги по инженеринг и дизайн помагат концепции, скици и съществуващи компоненти да се превърнат в готови за производство решения.',
  'Our laser cutting services provide accurate and efficient manufacturing for custom and industrial applications.':
    'Нашите услуги за лазерно рязане осигуряват точно и ефективно производство за персонализирани и индустриални приложения.',
  // Card feature lists
  'High-precision CNC laser cutting': 'Високопрецизно CNC лазерно рязане',
  'Clean and accurate edge finishing': 'Чисти и точни ръбове',
  'Complex shape manufacturing': 'Производство на сложни форми',
  'Steel, aluminum & stainless steel': 'Стомана, алуминий и неръждаема стомана',
  'Precision machining': 'Прецизна механична обработка',
  'Complex geometries': 'Сложни геометрии',
  'Custom materials': 'Персонализирани материали',
  'Reliable production': 'Надеждно производство',
  'High-precision scanning': 'Високопрецизно сканиране',
  'CAD-ready models': 'CAD-готови модели',
  'Reverse engineering': 'Обратно инженерство',
  'Reliable inspection': 'Надеждна инспекция',
  'Rapid prototyping': 'Бързо прототипиране',
  'Custom components': 'Персонализирани компоненти',
  'Fast production': 'Бързо производство',
  'Tailored solutions': 'Индивидуални решения',
  'Prototype development': 'Разработка на прототипи',
  'Technical consulting': 'Технически консултации',
  'Flexible production': 'Гъвкаво производство',
  'CAD modeling': 'CAD моделиране',
  'Product development': 'Разработка на продукти',
  'Design optimization': 'Оптимизация на дизайна',
  'Technical documentation': 'Техническа документация',
  // Overview cards
  'High-precision cutting': 'Високопрецизно рязане',
  'Accurate CNC laser cutting with clean edges and minimal tolerances':
    'Точно CNC лазерно рязане с чисти ръбове и минимални допуски',
  'Manufacture intricate shapes and detailed components with precision':
    'Прецизно производство на сложни форми и детайлни компоненти',
  'Multiple materials': 'Разнообразни материали',
  'Suitable for steel, stainless steel, aluminum and other metals':
    'Подходящо за стомана, неръждаема стомана, алуминий и други метали',
  'Fast turnaround': 'Бърза изработка',
  'Efficient production workflows with reliable delivery timelines':
    'Ефективни производствени процеси с надеждни срокове за доставка',
  'High-accuracy CNC milling for complex parts with tight tolerances':
    'Високоточно CNC фрезоване на сложни детайли с тесни допуски',
  'Manufacture intricate components with exceptional precision':
    'Производство на сложни компоненти с изключителна прецизност',
  'Suitable for aluminum, steel, brass and engineering plastics':
    'Подходящо за алуминий, стомана, месинг и инженерни пластмаси',
  'Consistent machining quality with dependable delivery timelines':
    'Постоянно качество на обработката с надеждни срокове за доставка',
  'Capture complex geometries with exceptional accuracy':
    'Заснемане на сложни геометрии с изключителна точност',
  'Generate detailed digital models for engineering workflows':
    'Създаване на детайлни дигитални модели за инженерни процеси',
  'Recreate existing components for design and manufacturing':
    'Пресъздаване на съществуващи компоненти за дизайн и производство',
  'Support quality control with accurate digital measurements':
    'Подпомагане на контрола на качеството с точни дигитални измервания',
  'Produce functional prototypes quickly for testing and product validation':
    'Бързо производство на функционални прототипи за тестване и валидиране',
  'Create intricate designs that are difficult to manufacture traditionally':
    'Създаване на сложни дизайни, трудни за традиционно производство',
  'Manufacture tailored parts for engineering and industrial applications':
    'Производство на индивидуални детайли за инженерни и индустриални приложения',
  'Reduce development time with efficient additive manufacturing':
    'Съкращаване на времето за разработка чрез ефективно адитивно производство',
  'Engineering services designed around your specific project requirements':
    'Инженерни услуги, съобразени с конкретните изисквания на вашия проект',
  'Develop custom prototypes for testing, validation and production':
    'Разработка на персонализирани прототипи за тестване, валидиране и производство',
  'Receive expert guidance for complex engineering and manufacturing projects':
    'Експертни насоки за сложни инженерни и производствени проекти',
  'Support for one-off, low-volume and specialized manufacturing requests':
    'Поддръжка за единични, малкосерийни и специализирани производствени заявки',
  'Develop accurate 3D models and technical drawings for manufacturing':
    'Разработка на точни 3D модели и технически чертежи за производство',
  'Transform concepts into functional and production-ready designs':
    'Превръщане на концепции във функционални и готови за производство дизайни',
  'Improve existing products for better performance and manufacturability':
    'Подобряване на съществуващи продукти за по-добра ефективност и технологичност',
  'Prepare complete engineering documentation for production processes':
    'Изготвяне на пълна инженерна документация за производствените процеси',
  // Industries
  'Industrial Manufacturing': 'Индустриално производство',
  'Engineering & Prototyping': 'Инженеринг и прототипиране',
  'Construction & Architecture': 'Строителство и архитектура',
  'Automation & Robotics': 'Автоматизация и роботика',
  'Engineering & Product Development': 'Инженеринг и разработка на продукти',
  'Maintenance & Repair': 'Поддръжка и ремонт',
  'Product Development': 'Разработка на продукти',
  'Manufacturing Support': 'Производствена поддръжка',
  'Engineering & Innovation': 'Инженеринг и иновации',
  'Specialized Manufacturing': 'Специализирано производство',
  'Engineering Projects': 'Инженерни проекти',
  'Industrial Support': 'Индустриална поддръжка',
  'Reverse Engineering': 'Обратно инженерство',
  // Applications
  'Machine components': 'Машинни компоненти',
  'Equipment parts': 'Части за оборудване',
  'Mounting brackets': 'Монтажни скоби',
  'Structural metal elements': 'Конструктивни метални елементи',
  'Custom technical parts': 'Персонализирани технически детайли',
  'Small production batches': 'Малки производствени серии',
  'Product testing components': 'Компоненти за тестване на продукти',
  'Decorative metal panels': 'Декоративни метални панели',
  'Facade components': 'Фасадни компоненти',
  'Custom metal structures': 'Персонализирани метални конструкции',
  'Precision-cut architectural elements': 'Прецизно изрязани архитектурни елементи',
  'Precision machine parts': 'Прецизни машинни части',
  'Industrial equipment': 'Индустриално оборудване',
  'Tooling components': 'Инструментални компоненти',
  'Mechanical assemblies': 'Механични възли',
  'Prototype machining': 'Обработка на прототипи',
  'Custom mechanical parts': 'Персонализирани механични части',
  'Functional prototypes': 'Функционални прототипи',
  'Precision testing components': 'Прецизни компоненти за тестване',
  'Robotic components': 'Роботизирани компоненти',
  'Production tooling': 'Производствена екипировка',
  'Equipment inspection': 'Инспекция на оборудване',
  'Quality verification': 'Проверка на качеството',
  'CAD model creation': 'Създаване на CAD модели',
  'Product redesign': 'Редизайн на продукти',
  'Replacement parts': 'Резервни части',
  'Equipment documentation': 'Документация на оборудване',
  'Wear analysis': 'Анализ на износването',
  'Legacy component digitization': 'Дигитализация на стари компоненти',
  'Concept validation': 'Валидиране на концепции',
  'Functional testing': 'Функционално тестване',
  'Design iterations': 'Дизайн итерации',
  'Custom fixtures': 'Персонализирани приспособления',
  'Low-volume production': 'Малкосерийно производство',
  'Complex assemblies': 'Сложни възли',
  'Specialized fabrication': 'Специализирана изработка',
  'Custom engineering': 'Персонализиран инженеринг',
  'Production assistance': 'Производствено съдействие',
  'Manufacturing optimization': 'Оптимизация на производството',
  'Project planning': 'Планиране на проекти',
  'Concept design': 'Концептуален дизайн',
  '3D CAD modeling': '3D CAD моделиране',
  'Production-ready designs': 'Готови за производство дизайни',
  'Existing part analysis': 'Анализ на съществуващи детайли',
  'CAD model recreation': 'Пресъздаване на CAD модели',
  'Design improvements': 'Подобрения на дизайна',
  'Assembly development': 'Разработка на възли',
  'Production documentation': 'Производствена документация',
  // Categories
  'Manufacturing Guides': 'Производствени ръководства',
  'Engineering Insights': 'Инженерни статии',
  'Industry News': 'Новини от индустрията',
  // Projects
  'Custom metal components': 'Персонализирани метални компоненти',
  'Precision-cut steel components manufactured for industrial applications':
    'Прецизно изрязани стоманени компоненти за индустриални приложения',
  'Product development solutions': 'Решения за разработка на продукти',
  'Custom engineering design and CAD development for manufacturing projects':
    'Персонализиран инженерен дизайн и CAD разработка за производствени проекти',
  'Reverse engineered fixtures': 'Обратно инженерни приспособления',
  'Digital capture and redesign workflow for worn production fixtures':
    'Дигитално заснемане и редизайн на износени производствени приспособления',
  'CNC machine parts': 'CNC машинни части',
  'Precision-machined components prepared for industrial equipment maintenance':
    'Прецизно обработени компоненти за поддръжка на индустриално оборудване',
  'Rapid prototype housings': 'Бързи прототипни корпуси',
  'Functional printed housings used to validate product fit and assembly':
    'Функционални печатани корпуси за валидиране на сглобката и съвместимостта',
  'Custom production support': 'Персонализирана производствена поддръжка',
  'A tailored manufacturing plan combining design review, prototyping and delivery':
    'Индивидуален производствен план, съчетаващ преглед на дизайна, прототипиране и доставка',
  // Posts
  'Manufacturing trends': 'Производствени тенденции',
  'Latest developments in engineering and industrial production technologies':
    'Най-новите разработки в инженерните и индустриалните производствени технологии',
  'Modern techniques for recreating and optimizing existing components':
    'Модерни техники за пресъздаване и оптимизиране на съществуващи компоненти',
  'Laser cutting tips': 'Съвети за лазерно рязане',
  'Practical insights for improving production efficiency and part quality':
    'Практични съвети за подобряване на производствената ефективност и качеството на детайлите',
  // Privacy
  'Oct 30, 2025': '30 октомври 2025',
  'Collecting Personal Information': 'Събиране на лична информация',
  'Novatek Engineering collects information provided through contact forms, quote requests and direct communication channels. This may include your name, company details, email address, phone number and any files or technical documentation submitted as part of a project inquiry.\nWe collect this information solely for the purpose of evaluating requests, preparing quotations and providing engineering and manufacturing services.':
    'Novatek Engineering събира информация, предоставена чрез контактни форми, заявки за оферта и директни канали за комуникация. Това може да включва вашето име, данни за компанията, имейл адрес, телефонен номер и всички файлове или техническа документация, изпратени като част от запитване по проект.\nСъбираме тази информация единствено с цел оценка на заявките, изготвяне на оферти и предоставяне на инженерни и производствени услуги.',
  'Use of Information': 'Използване на информацията',
  'Information submitted through our website is used to respond to inquiries, process project requests, provide technical consultations and improve our services.\nWe do not sell, rent or distribute personal information to third parties for marketing purposes.':
    'Информацията, подадена чрез нашия уебсайт, се използва за отговор на запитвания, обработка на заявки по проекти, предоставяне на технически консултации и подобряване на нашите услуги.\nНие не продаваме, не отдаваме и не разпространяваме лична информация на трети страни за маркетингови цели.',
  'Technical Files & Project Data': 'Технически файлове и проектни данни',
  'Drawings, CAD models, technical specifications and other project-related files submitted to Novatek Engineering are treated as confidential information.\nAll project data is used exclusively for quotation, engineering review, manufacturing planning and project execution purposes.':
    'Чертежи, CAD модели, технически спецификации и други файлове по проекти, изпратени на Novatek Engineering, се третират като поверителна информация.\nВсички проектни данни се използват изключително за целите на офериране, инженерен преглед, производствено планиране и изпълнение на проекта.',
  'Sharing Personal Information': 'Споделяне на лична информация',
  'We may share information with trusted suppliers, manufacturing partners or service providers only when necessary to fulfill a project request or provide requested services.\nAny such sharing is limited to information required for project execution and is subject to appropriate confidentiality practices.':
    'Може да споделяме информация с доверени доставчици, производствени партньори или доставчици на услуги само когато това е необходимо за изпълнение на заявка по проект или предоставяне на заявени услуги.\nВсяко такова споделяне се ограничава до информацията, необходима за изпълнението на проекта, и подлежи на подходящи практики за поверителност.',
  'Cookies & Analytics': 'Бисквитки и анализи',
  'Our website may use cookies and analytics tools to improve user experience, monitor website performance and understand visitor behavior.\nThis information is collected in an aggregated form and does not personally identify individual users.':
    'Нашият уебсайт може да използва бисквитки и аналитични инструменти за подобряване на потребителското изживяване, наблюдение на производителността на сайта и разбиране на поведението на посетителите.\nТази информация се събира в обобщен вид и не идентифицира лично отделните потребители.',
  'Data Security': 'Сигурност на данните',
  'Novatek Engineering implements reasonable technical and organizational measures to protect personal information, project documentation and submitted files against unauthorized access, disclosure or misuse.\nWhile we strive to maintain secure systems, no method of electronic transmission or storage can guarantee absolute security.':
    'Novatek Engineering прилага разумни технически и организационни мерки за защита на личната информация, проектната документация и изпратените файлове срещу неоторизиран достъп, разкриване или злоупотреба.\nМакар да се стремим да поддържаме сигурни системи, нито един метод за електронно предаване или съхранение не може да гарантира абсолютна сигурност.',
  'Third-Party Links': 'Връзки към трети страни',
  'Our website may contain links to external websites or third-party resources. Novatek Engineering is not responsible for the privacy practices, content or security policies of external websites.':
    'Нашият уебсайт може да съдържа връзки към външни сайтове или ресурси на трети страни. Novatek Engineering не носи отговорност за практиките за поверителност, съдържанието или политиките за сигурност на външните уебсайтове.',
  'Contact Information': 'Информация за контакт',
  'If you have any questions regarding this Privacy Policy or the handling of your information, please contact Novatek Engineering through the contact details provided on our website.':
    'Ако имате въпроси относно тази Политика за поверителност или обработката на вашата информация, моля, свържете се с Novatek Engineering чрез данните за контакт, посочени на нашия уебсайт.',
}

function tr(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  const hit = TR[value]
  if (!hit) {
    misses.add(value)
    return undefined
  }
  return hit
}

const payload = await getPayload({ config })

// ---------- Globals ----------
const homeEn = await payload.findGlobal({ slug: 'home', locale: 'en' })
const sBg = siteDataBg
await payload.updateGlobal({
  slug: 'home',
  locale: 'bg',
  data: {
    hero: {
      eyebrow: sBg.hero.eyebrow,
      title: { before: sBg.hero.title.before, accent: sBg.hero.title.accent },
      description: sBg.hero.description,
    },
    whyChoose: {
      heading: {
        eyebrow: sBg.whyChoose.heading.eyebrow,
        title: {
          before: sBg.whyChoose.heading.title.before,
          accent: sBg.whyChoose.heading.title.accent,
        },
      },
      projectsCard: {
        eyebrow: sBg.whyChoose.cards[0].eyebrow,
        description: sBg.whyChoose.cards[0].description,
      },
      turnaroundCard: {
        title: sBg.whyChoose.cards[1].title,
        description: sBg.whyChoose.cards[1].description,
      },
      trustedCard: {
        eyebrow: sBg.whyChoose.cards[2].eyebrow,
        description: sBg.whyChoose.cards[2].description,
      },
    },
    services: {
      heading: {
        eyebrow: sBg.services.heading.eyebrow,
        title: {
          before: sBg.services.heading.title.before,
          accent: sBg.services.heading.title.accent,
          after: sBg.services.heading.title.after,
        },
      },
    },
    process: {
      heading: {
        eyebrow: sBg.process.eyebrow,
        title: { before: sBg.process.title.before, accent: sBg.process.title.accent },
      },
      steps: (homeEn.process?.steps ?? []).map((step, index) => ({
        id: step.id,
        title: sBg.process.steps[index]?.title ?? step.title,
        mobileTitle: sBg.process.steps[index]?.mobileTitle,
        description: sBg.process.steps[index]?.description ?? step.description,
        features: (step.features ?? []).map((row, fIndex) => ({
          id: row.id,
          text: sBg.process.steps[index]?.features?.[fIndex] ?? row.text,
        })),
      })),
    },
    projects: {
      heading: {
        eyebrow: sBg.projects.eyebrow,
        title: { before: sBg.projects.title.before, accent: sBg.projects.title.accent },
      },
      cta: { title: sBg.projects.cta.title, description: sBg.projects.cta.description },
    },
    testimonials: {
      heading: {
        eyebrow: sBg.testimonials.eyebrow,
        title: {
          before: sBg.testimonials.title.before,
          accent: sBg.testimonials.title.accent,
        },
      },
      badge: sBg.testimonials.badge,
      items: (homeEn.testimonials?.items ?? []).map((item, index) => ({
        id: item.id,
        quote: sBg.testimonials.items[index]?.quote ?? item.quote,
        author: sBg.testimonials.items[index]?.author ?? item.author,
        role: sBg.testimonials.items[index]?.role ?? item.role,
      })),
    },
    quoteBanner: { title: sBg.quote.title },
    faq: {
      heading: {
        eyebrow: sBg.faq.eyebrow,
        title: { before: sBg.faq.title.before, accent: sBg.faq.title.accent },
      },
      items: (homeEn.faq?.items ?? []).map((item, index) => ({
        id: item.id,
        question: sBg.faq.items[index]?.question ?? item.question,
        answer: sBg.faq.items[index]?.answer ?? item.answer,
      })),
    },
  },
})
console.log('home: bg locale filled')

await payload.updateGlobal({
  slug: 'site',
  locale: 'bg',
  data: {
    contacts: { address: sBg.footer.contact[2] },
    footer: { tagline: sBg.footer.tagline, copyright: sBg.footer.copyright },
  },
})
console.log('site: bg locale filled')

const aBg = aboutDataBg
await payload.updateGlobal({
  slug: 'about',
  locale: 'bg',
  data: {
    hero: {
      eyebrow: aBg.hero.eyebrow,
      title: { before: aBg.hero.title.before, accent: aBg.hero.title.accent },
      description: aBg.hero.description,
    },
    story: {
      heading: {
        eyebrow: aBg.story.eyebrow,
        title: {
          before: aBg.story.title.before,
          accent: aBg.story.title.accent,
          after: aBg.story.title.after,
        },
      },
      storyText: aBg.story.storyText,
    },
    techPartners: {
      heading: {
        eyebrow: aBg.techPartners.eyebrow,
        title: {
          before: aBg.techPartners.title.before,
          accent: aBg.techPartners.title.accent,
        },
      },
    },
  },
})
console.log('about: bg locale filled')

const privacyEn = await payload.findGlobal({ slug: 'privacy', locale: 'en' })
await payload.updateGlobal({
  slug: 'privacy',
  locale: 'bg',
  data: {
    lastUpdated: tr(privacyEn.lastUpdated) ?? privacyEn.lastUpdated,
    sections: (privacyEn.sections ?? []).map((section) => ({
      id: section.id,
      title: tr(section.title) ?? section.title,
      body: tr(section.body) ?? section.body,
    })),
  },
})
console.log('privacy: bg locale filled')

// ---------- Collections ----------
const services = await payload.find({ collection: 'services', locale: 'en', limit: 100 })
for (const doc of services.docs) {
  await payload.update({
    collection: 'services',
    id: doc.id,
    locale: 'bg',
    data: {
      title: tr(doc.title) ?? doc.title,
      heroTitle: {
        before: tr(doc.heroTitle?.before) ?? doc.heroTitle?.before,
        accent: tr(doc.heroTitle?.accent) ?? doc.heroTitle?.accent,
        after: tr(doc.heroTitle?.after) ?? doc.heroTitle?.after,
      },
      overviewHeading: tr(doc.overviewHeading) ?? doc.overviewHeading,
      overview: tr(doc.overview) ?? doc.overview,
      features: (doc.features ?? []).map((row) => ({
        id: row.id,
        text: tr(row.text) ?? row.text,
      })),
      cards: (doc.cards ?? []).map((card) => ({
        id: card.id,
        title: tr(card.title) ?? card.title,
        description: tr(card.description) ?? card.description,
      })),
      industries: (doc.industries ?? []).map((row) => ({
        id: row.id,
        industry: tr(row.industry) ?? row.industry,
        applications: (row.applications ?? []).map((app) => ({
          id: app.id,
          text: tr(app.text) ?? app.text,
        })),
      })),
      seo: {
        title: tr(doc.seo?.title) ?? doc.seo?.title,
        description: tr(doc.seo?.description) ?? doc.seo?.description,
      },
    },
  })
  console.log(`service "${doc.title}": bg locale filled`)
}

const projectDocs = (await payload.find({ collection: 'projects', locale: 'en', limit: 100 })).docs
for (const doc of projectDocs) {
  await payload.update({
    collection: 'projects',
    id: doc.id,
    locale: 'bg',
    data: {
      title: tr(doc.title) ?? doc.title,
      description: tr(doc.description) ?? doc.description,
    },
  })
  console.log(`projects "${doc.title}": bg locale filled`)
}

const postDocs = (await payload.find({ collection: 'posts', locale: 'en', limit: 100 })).docs
for (const doc of postDocs) {
  await payload.update({
    collection: 'posts',
    id: doc.id,
    locale: 'bg',
    data: {
      title: tr(doc.title) ?? doc.title,
      description: tr(doc.description) ?? doc.description,
      // content is a required localized richText field — carry the EN
      // content over as a placeholder so the bg locale stays valid until
      // someone translates it by hand in the admin
      content: doc.content,
    },
  })
  console.log(`posts "${doc.title}": bg locale filled`)
}

for (const collection of ['project-categories', 'post-categories'] as const) {
  const { docs } = await payload.find({ collection, locale: 'en', limit: 100 })
  for (const doc of docs) {
    await payload.update({
      collection,
      id: doc.id,
      locale: 'bg',
      data: { title: tr(doc.title) ?? doc.title },
    })
  }
  console.log(`${collection}: bg locale filled`)
}

if (misses.size) {
  console.log('\nStrings left in English (no translation found):')
  for (const value of misses) console.log(' -', value.slice(0, 90))
} else {
  console.log('\nAll strings translated.')
}
process.exit(0)
