export const PLAY_SEO = 'https://play.google.com/store/apps/details?id=com.devndespro.seo';

export const navItems = [
  { id: 'products', label: 'Products', path: '/#home-products', icon: 'fa-cubes' },
  { id: 'solutions', label: 'Solutions', path: '/#home-solutions', icon: 'fa-layer-group' },
  { id: 'cases', label: 'Case Studies', path: '/#home-cases', icon: 'fa-briefcase' },
  { id: 'platform', label: 'Platform', path: '/#home-platform', icon: 'fa-server' },
  { id: 'packages', label: 'Packages', path: '/#home-packages', icon: 'fa-box-open' },
  { id: 'blog', label: 'Blog', path: '/blog', icon: 'fa-newspaper' },
  { id: 'contact', label: 'Contact', path: '/#home-contact', icon: 'fa-envelope' }
];

const seo = (slug) => `/seo/${slug}`;

export const solutionMenu = [
  {
    icon: 'fa-laptop-code',
    title: 'Web applications',
    text: 'Custom dashboards, portals, and product platforms.',
    to: '/#home-solutions'
  },
  {
    icon: 'fa-rocket',
    title: 'SaaS products',
    text: 'Our own tools and new SaaS products, built to ship.',
    to: '/#home-products'
  },
  {
    icon: 'fa-pen-nib',
    title: 'Product design',
    text: 'UX, interface systems, and Figma-to-code delivery.',
    to: '/#home-solutions'
  },
  {
    icon: 'fa-gears',
    title: 'Engineering',
    text: 'Full-stack, APIs, DevOps, and cloud reliability.',
    to: '/#home-platform'
  }
];

export const solutionApps = [
  {
    region: 'Norway',
    icon: 'fa-flag',
    items: [
      { label: 'Web Developer Norway', labelNo: 'Webutvikler Norge', href: '/services/web-developer-norway' },
      { label: 'Web Developer Stavanger', labelNo: 'Webutvikler Stavanger', href: '/web-developer-stavanger' },
      { label: 'Web Developer Oslo', labelNo: 'Webutvikler Oslo', href: '/web-developer-oslo' },
      { label: 'Web Developer Bergen', labelNo: 'Webutvikler Bergen', href: '/web-developer-bergen' },
      { label: 'Web Developer Trondheim', labelNo: 'Webutvikler Trondheim', href: '/web-developer-trondheim' },
      { label: 'Web Utvikler Norge', labelNo: 'Webutvikler Norge', href: seo('web-utvikler-norge') },
      { label: 'Web Design Norway', labelNo: 'Nettsidedesign Norge', href: seo('web-design-company-norway') },
      { label: 'SEO Services Norway', labelNo: 'SEO-tjenester Norge', href: seo('seo-services-norway') },
      { label: 'Freelance Web Developer Norway', labelNo: 'Freelance webutvikler Norge', href: seo('freelance-web-developer-norway') },
      { label: 'UX UI Designer Norway', labelNo: 'UX/UI-designer Norge', href: seo('ux-ui-designer-norway') }
    ]
  },
  {
    region: 'Europe',
    icon: 'fa-earth-europe',
    items: [
      { label: 'Web Design Europe', labelNo: 'Nettsidedesign Europa', href: seo('web-design-europe') },
      { label: 'Web Development Europe', labelNo: 'Nettutvikling Europa', href: seo('web-development-europe') },
      { label: 'Full Stack Development EU', labelNo: 'Fullstack-utvikling EU', href: seo('full-stack-development-norway') },
      { label: 'Web App Development EU', labelNo: 'Webapp-utvikling EU', href: seo('web-application-development-norway') },
      { label: 'Mobile App Development Europe', labelNo: 'Mobilapp-utvikling Europa', href: seo('mobile-app-development-europe') }
    ]
  },
  {
    region: 'USA',
    icon: 'fa-earth-americas',
    items: [
      { label: 'Web Developer USA', labelNo: 'Webutvikler USA', href: '/services/web-developer-usa' },
      { label: 'Web Developer New York', labelNo: 'Webutvikler New York', href: '/web-developer-new-york' },
      { label: 'Web Developer California', labelNo: 'Webutvikler California', href: '/web-developer-california' },
      { label: 'Web Developer Texas', labelNo: 'Webutvikler Texas', href: '/web-developer-texas' },
      { label: 'Web Developer Florida', labelNo: 'Webutvikler Florida', href: '/web-developer-florida' },
      { label: 'Hire Web Developer USA', labelNo: 'Ansett webutvikler USA', href: seo('hire-web-developer-usa') },
      { label: 'Web Design Agency USA', labelNo: 'Nettsidedesignbyrå USA', href: seo('web-design-agency-usa') }
    ]
  },
  {
    region: 'India',
    icon: 'fa-globe',
    items: [
      { label: 'Web Developer India', labelNo: 'Webutvikler India', href: '/services/web-developer-india' },
      { label: 'Web Developer Chennai', labelNo: 'Webutvikler Chennai', href: '/web-developer-chennai' },
      { label: 'Web Developer Bangalore', labelNo: 'Webutvikler Bangalore', href: '/web-developer-bangalore' },
      { label: 'Web Developer Hyderabad', labelNo: 'Webutvikler Hyderabad', href: '/web-developer-hyderabad' },
      { label: 'Web Developer Mumbai', labelNo: 'Webutvikler Mumbai', href: '/web-developer-mumbai' },
      { label: 'Web Design Company India', labelNo: 'Nettsidedesign India', href: seo('web-design-company-india') },
      { label: 'Affordable Web Dev India', labelNo: 'Rimelig webutvikling India', href: seo('affordable-website-development-india') },
      { label: 'SEO Agency India', labelNo: 'SEO-byrå India', href: seo('seo-agency-india') }
    ]
  },
  {
    region: 'Engineering',
    icon: 'fa-screwdriver-wrench',
    items: [
      { label: 'Full Stack Norway', labelNo: 'Fullstack Norge', href: seo('full-stack-development-norway') },
      { label: 'Web App Norway', labelNo: 'Webapp Norge', href: seo('web-application-development-norway') },
      { label: 'Full Stack USA', labelNo: 'Fullstack USA', href: seo('full-stack-development-usa') },
      { label: 'Web App USA', labelNo: 'Webapp USA', href: seo('web-application-development-usa') },
      { label: 'Full Stack India', labelNo: 'Fullstack India', href: seo('full-stack-development-india') },
      { label: 'DevOps Norway', labelNo: 'DevOps Norge', href: seo('devops-services-norway') },
      { label: 'Mobile App Development', labelNo: 'Mobilapp-utvikling', href: seo('mobile-app-development') },
      { label: 'Responsive Web Design', labelNo: 'Responsivt nettsidedesign', href: seo('responsive-web-design') }
    ]
  }
];

export const products = [
  {
    id: 'seo',
    index: '01',
    status: 'Live on web & Android',
    type: 'AI SEO, GEO & AEO platform',
    name: 'SEO.devndespro',
    summary: 'An AI-powered platform for SEO, GEO and AEO, technical audits, AI search visibility, keyword tracking, backlink monitoring, and site performance. Now also on Google Play.',
    image: '/images/seo_dashboard.png',
    href: 'https://seo.devndespro.com',
    playHref: PLAY_SEO,
    cta: 'Explore SEO Tool',
    tags: ['SEO', 'GEO', 'AEO', 'Android'],
    features: [
      'Technical SEO audits in minutes',
      'GEO and AEO visibility tracking',
      'Keyword and backlink monitoring',
      'Core Web Vitals and crawl health'
    ]
  },
  {
    id: 'tenderlyst',
    index: '02',
    status: 'Early access',
    type: 'AI tender & RFP platform',
    name: 'Tenderlyst',
    summary: 'AI-powered tender discovery and RFP management for teams that need to find opportunities, manage proposals, and win more contracts.',
    image: '/images/work-tenderlyst-web.png',
    href: 'https://www.tenderlyst.com/',
    cta: 'Request Early Access',
    features: [
      'Tender and RFP discovery',
      'Opportunity management',
      'Proposal workflow automation',
      'Compliance-aware writing support'
    ]
  }
];

export const solutions = [
  {
    index: '01',
    icon: 'design',
    name: 'Product UX/UI & Design Systems',
    text: 'Research, flows, Figma prototypes, and interface systems that make products easier to use and easier to ship.',
    tags: ['User Research', 'Interaction Flows', 'Figma Prototyping', 'Design Systems']
  },
  {
    index: '02',
    icon: 'code',
    name: 'Full-Stack Product Engineering',
    text: 'React, Next.js, and Node delivery from first screen to production APIs, data models, and admin workflows.',
    tags: ['Next.js / React', 'Node.js APIs', 'TypeScript', 'Database Design']
  },
  {
    index: '03',
    icon: 'cloud',
    name: 'DevOps, Cloud & Reliability',
    text: 'Azure-ready infrastructure, CI/CD, monitoring, and hardening so launches stay fast and stable.',
    tags: ['Azure / Cloud', 'CI/CD Pipelines', 'Monitoring', 'Security Hardening']
  },
  {
    index: '04',
    icon: 'growth',
    name: 'SEO, Analytics & Growth',
    text: 'Technical SEO, local visibility, analytics, and conversion work that turns a site into a growth channel.',
    tags: ['Technical SEO', 'Local SEO', 'Analytics', 'Conversion Optimization']
  }
];

export const cases = [
  {
    index: '01',
    title: 'JPA Solutions',
    category: ['Education', 'WordPress', 'Chennai'],
    desc: 'Full website design and development for an MSME-certified software training institute. Built for course discovery and enquiry conversion, serving 18,000+ students a year.',
    tags: ['WordPress', 'UI Design', 'SEO', 'Lead Forms'],
    metrics: [
      { value: '18K+', label: 'Students / year' },
      { value: '99', label: 'PageSpeed' }
    ],
    image: '/images/work-jpa.png',
    href: 'https://www.jpasolutions.in'
  },
  {
    index: '02',
    title: 'Tenderlyst Web',
    category: ['SaaS', 'RFP Platform', 'Norway'],
    desc: 'AI-powered RFP and proposal management for Energy and IT teams. Full UI/UX and frontend so teams can prepare compliant proposals faster.',
    tags: ['Next.js', 'UI/UX Design', 'Figma', 'i18n'],
    metrics: [
      { value: '10x', label: 'Faster proposals' },
      { value: '50%', label: 'Win rate lift' }
    ],
    image: '/images/work-tenderlyst-web.png',
    href: 'https://www.tenderlyst.com/'
  },
  {
    index: '03',
    title: 'Tenderlyst App',
    category: ['SaaS', 'RFP Platform', 'Global'],
    desc: 'Norwegian-localised application with multilingual UI, demo booking, and a full proposal management dashboard.',
    tags: ['React', 'TypeScript', 'Tailwind', 'AI Integration'],
    metrics: [
      { value: '2', label: 'Languages' },
      { value: 'AI', label: 'Writing support' }
    ],
    image: '/images/work-tenderlyst-app.png',
    href: 'https://www.tenderlyst.com/'
  }
];

export const packageCurrencies = [
  { id: 'nok', label: 'NOK', symbol: 'kr' },
  { id: 'eur', label: 'EUR', symbol: '€' },
  { id: 'usd', label: 'USD', symbol: '$' },
  { id: 'ind', label: 'INR', symbol: '$' }
];

export const packages = [
  {
    id: 'foundation',
    level: 'Foundation',
    name: 'Starter Presence',
    text: 'For small businesses that need a professional website and a clear SEO foundation.',
    cta: 'Start Small',
    featured: false,
    prices: {
      nok: { amount: '990', alt: '~$95 USD' },
      eur: { amount: '85', alt: '~$95 USD' },
      usd: { amount: '95', alt: '~EUR 85' },
      ind: { amount: '39', alt: '~INR 3,300/mo' }
    },
    items: [
      'Website up to 5 pages',
      'Mobile-first UI/UX polish',
      'Basic technical SEO',
      'Google Business Profile guidance',
      'Monthly SEO health report',
      'Email support'
    ]
  },
  {
    id: 'growth',
    level: 'Growth',
    name: 'Business Growth',
    text: 'For SMBs that want stronger visibility, better conversion, and consistent SEO progress.',
    cta: 'Grow My Business',
    featured: true,
    badge: 'Best for SMB',
    prices: {
      nok: { amount: '1,790', alt: '~$169 USD' },
      eur: { amount: '155', alt: '~$169 USD' },
      usd: { amount: '169', alt: '~EUR 155' },
      ind: { amount: '69', alt: '~INR 5,800/mo' }
    },
    items: [
      'Website up to 8 pages',
      'Conversion-focused landing sections',
      'On-page SEO and schema basics',
      '2 SEO blog posts per month',
      'SEO audit tool access included',
      'Monthly strategy check-in'
    ]
  },
  {
    id: 'authority',
    level: 'Authority',
    name: 'Market Authority',
    text: 'For medium businesses that need deeper SEO, content systems, and a growth roadmap.',
    cta: 'Scale With Us',
    featured: false,
    dark: true,
    prices: {
      nok: { amount: '2,990', alt: '~$279 USD · or a tailored quote' },
      eur: { amount: '255', alt: '~$279 USD · or a tailored quote' },
      usd: { amount: '279', alt: '~EUR 255 · or a tailored quote' },
      ind: { amount: '109', alt: '~INR 9,100/mo · or a tailored quote' }
    },
    items: [
      'Everything in Business Growth',
      'Website up to 15 pages',
      'Advanced technical SEO',
      '4 SEO blog posts per month',
      'Core Web Vitals improvement',
      'Priority support and monthly roadmap'
    ]
  }
];

export const capabilities = [
  { title: 'UX Strategy', sub: 'Research, IA, user flows', icon: 'fa-sitemap' },
  { title: 'UI Systems', sub: 'Design systems, prototyping', icon: 'fa-swatchbook' },
  { title: 'Full-Stack', sub: 'Frontend and backend delivery', icon: 'fa-laptop-code' },
  { title: 'DevOps Platform', sub: 'CI/CD, cloud, observability', icon: 'fa-cloud' },
  { title: 'Backend APIs', sub: 'Node, data modeling, integrations', icon: 'fa-plug' },
  { title: 'Growth Ops', sub: 'SEO, GEO & AEO', icon: 'fa-magnifying-glass-chart' }
];

export const skills = [
  { name: 'Full-Stack Development', value: 97 },
  { name: 'Cloud, Azure & DevOps', value: 98 },
  { name: 'Backend APIs & Integrations', value: 96 },
  { name: 'UX / UI Design & Figma', value: 92 },
  { name: 'SEO & Digital Growth', value: 90 }
];

export const process = [
  {
    index: '01',
    name: 'Discover & Define',
    text: 'We start with users, goals, and constraints. No assumptions before the work is scoped.'
  },
  {
    index: '02',
    name: 'Design & Prototype',
    text: 'Every screen is designed in Figma first, so you can shape the product before development starts.'
  },
  {
    index: '03',
    name: 'Build & Test',
    text: 'Clean, documented code, tested across devices, and performance-minded from the first commit.'
  },
  {
    index: '04',
    name: 'Launch & Grow',
    text: 'We monitor, refine, and iterate after launch so the product keeps compounding.'
  }
];

export const reviews = [
  {
    name: 'Rohit Pillai',
    initials: 'RP',
    stars: 5,
    quote: 'They are very professional. They understand the clients requirements. I am very happy with their service.'
  },
  {
    name: 'Komahan Kundal',
    initials: 'KK',
    stars: 5,
    quote: 'I had a great experience with Devndespro. They clearly understand both design and technical aspects. They focus not just on building websites, but also on performance and user experience.'
  },
  {
    name: 'Gumparlapati J.',
    initials: 'GJ',
    stars: 5,
    quote: 'Excellent service and they always make sure customers are satisfied. Kind, respectful, and helpful. I would highly recommend them.'
  },
  {
    name: 'John Williams',
    company: 'Procurement People',
    initials: 'JW',
    stars: 4,
    quote: 'Professional, reliable and easy to work with. Devndespro delivers high quality web solutions with a good focus on performance and user experience.'
  },
  {
    name: 'Pirabukannan',
    company: 'Onearkive',
    initials: 'P',
    stars: 5,
    quote: 'I approached Devndespro for designing our mobile app in Onearkive and they delivered it with excellent quality.'
  }
];

export const articles = [
  {
    slug: 'ui-ux-product-clarity',
    category: 'UX / Strategy',
    title: 'UI, UX, and product clarity: where teams lose conversions',
    desc: 'A field guide to reducing friction in digital journeys and turning visual polish into measurable conversion lift.',
    read: '6 min',
    body: [
      'Most conversion problems are not visual. They are structural. Visitors arrive with a job to do, then spend too long working out what the product is, who it is for, and what happens next.',
      'We start every engagement by mapping intent, not screens. What is the visitor trying to decide? What proof do they need? Where does the page ask for effort before it has earned trust?',
      'The practical fixes are usually simple: a clearer first sentence, one primary action, faster load on the first screen, and enough specifics that a serious buyer can move without guessing.',
      'Polish still matters. It just works better after the message, structure, and path are honest.'
    ]
  },
  {
    slug: 'core-web-vitals-founders',
    category: 'Performance',
    title: 'Core Web Vitals for founders: what matters and what does not',
    desc: 'A no-noise breakdown of speed, layout stability, and interaction quality that affects rankings and user trust.',
    read: '7 min',
    body: [
      'Founders do not need a 40-metric dashboard. They need to know if the page feels fast, stays still while it loads, and responds when someone taps.',
      'Largest Contentful Paint tells you whether the first useful screen arrives quickly. Cumulative Layout Shift tells you if buttons jump. Interaction to Next Paint tells you if the interface feels alive.',
      'The fastest wins are usually image weight, font loading, unused JavaScript, and third-party scripts that were added “just in case”.',
      'We treat performance as a product decision, not a late audit. Fast pages convert more calmly, and search systems can index them with more confidence.'
    ]
  },
  {
    slug: 'service-page-seo-structure',
    category: 'SEO / Content',
    title: 'How to structure service pages that rank and convert',
    desc: 'The structure we use for local and global service pages so search engines and buyers understand value fast.',
    read: '5 min',
    body: [
      'A strong service page answers four questions quickly: what you do, who it is for, how the work happens, and what to do next.',
      'We use a clear H1, a short proof line, scoped outcomes, a process, relevant examples, and a single call to action. Schema and internal links support the page; they do not replace the writing.',
      'Local pages need place, delivery model, and language that matches how buyers search. Global pages need sharper positioning and fewer generic claims.',
      'If a buyer can explain your offer after one scroll, the page is doing its job for both people and search.'
    ]
  },
  {
    slug: 'web-designer-norway',
    category: 'Web Design',
    title: 'What makes a great web designer in Norway',
    desc: 'A practical breakdown of design quality, strategy, and what businesses should look for before hiring.',
    read: '6 min',
    body: [
      'In Norway, buyers expect clarity, restraint, and systems that work in real life, on mobile, in both languages, and under the weather of a busy operations day.',
      'A strong designer here is not only visual. They understand trust, accessibility, and the difference between a brochure and a working business site.',
      'Look for process: discovery before decoration, prototypes before build, and a point of view about conversion. Ask how they handle content, performance, and handover.',
      'The right partner should make your offer easier to understand, not just more decorated.'
    ]
  },
  {
    slug: 'web-developer-norway',
    category: 'Engineering',
    title: 'Modern web development in Norway: best practices',
    desc: 'Performance, architecture, deployment, and SEO practices used to build durable, scalable products.',
    read: '7 min',
    body: [
      'Modern delivery in Norway looks like this: a clear stack, predictable deploys, measured performance, and content that search engines can read without theatre.',
      'We prefer React and Next.js when the product needs component systems and growth. We keep the backend boring and documented. We put CI/CD and monitoring in place before the marketing launch.',
      'SEO is not a plugin at the end. Headings, metadata, structured data, and speed are part of the same build.',
      'The goal is a site that a small team can keep improving without rebuilding it every year.'
    ]
  }
];

export const faqs = [
  {
    q: 'Do you work with clients outside Stavanger?',
    a: 'Yes. We are based in Stavanger, Norway, and work with clients across Europe, the USA, India, and APAC. Most work is delivered remotely with structured updates and regular calls.'
  },
  {
    q: 'What does a typical project cost?',
    a: 'Cost depends on scope, complexity, timeline, and integrations. After we review your brief, you get a clear estimate and phased plan within 24 hours.'
  },
  {
    q: 'How long does a website or web app take?',
    a: 'A standard business website is typically 3–5 weeks. Larger applications with APIs, integrations, and DevOps usually take 8–16 weeks, with milestones agreed before kickoff.'
  },
  {
    q: 'Can you do UI/UX design without development?',
    a: 'Yes. We offer standalone UX discovery, Figma prototypes, design systems, and audits that your in-house or external team can implement.'
  }
];
