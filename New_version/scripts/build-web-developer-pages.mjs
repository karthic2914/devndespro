import fs from 'fs';
import path from 'path';

const host = 'https://www.devndespro.com';
const root = path.resolve('public');

const countries = {
  norway: {
    code: 'norway',
    name: 'Norway',
    adjective: 'Norwegian',
    area: 'Norway',
    currency: 'NOK',
    hours: 'Norwegian business hours',
    hub: 'Stavanger',
    stackExtra: ['Norwegian SEO', 'GDPR', 'Vipps'],
    seoExtra: '/seo/freelance-web-developer-norway',
    seoExtraLabel: 'Freelance Web Developer Norway',
    seoExtra2: '/seo/full-stack-development-norway',
    seoExtra2Label: 'Full Stack Norway'
  },
  usa: {
    code: 'usa',
    name: 'USA',
    adjective: 'US',
    area: 'United States',
    currency: 'USD',
    hours: 'US time zones, EST to PST',
    hub: 'Stavanger, with US-hours overlap',
    stackExtra: ['Stripe', 'ADA-ready', 'Core Web Vitals'],
    seoExtra: '/seo/hire-web-developer-usa',
    seoExtraLabel: 'Hire Web Developer USA',
    seoExtra2: '/seo/web-application-development-usa',
    seoExtra2Label: 'Web App Development USA'
  },
  india: {
    code: 'india',
    name: 'India',
    adjective: 'Indian',
    area: 'India',
    currency: 'INR',
    hours: 'IST, with overlap for Europe and the US',
    hub: 'the Chennai delivery hub',
    stackExtra: ['English delivery', 'GST-ready', 'Core Web Vitals'],
    seoExtra: '/seo/affordable-website-development-india',
    seoExtraLabel: 'Affordable Web Dev India',
    seoExtra2: '/seo/web-application-development-india',
    seoExtra2Label: 'Web App Development India'
  }
};

const pages = [
  {
    kind: 'country',
    country: 'norway',
    slug: 'norway',
    path: '/services/web-developer-norway',
    place: 'Norway',
    badge: 'Senior web developer — Norway',
    title: 'Web Developer Norway | React & Next.js | devndespro',
    h1: 'Web Developer <em>Norway</em>',
    description: 'Senior web developer in Norway. React, Next.js, and full-stack delivery from Stavanger. GDPR, Vipps, and Norwegian SEO built in. Quote in 24 hours.',
    hero: 'A senior React and Next.js web developer for Norwegian companies. Design, engineering, DevOps, and SEO in one engagement — from Stavanger, across Norway.',
    market: 'Norwegian buyers expect quiet quality: fast pages, GDPR by default, Vipps when payments matter, and copy that works in Norwegian and English. Agencies often split that across four people. We keep it with one senior owner.',
    need: 'Hiring a web developer in Norway in 2026 means more than HTML. You need component frameworks, Core Web Vitals, a data model that survives GDPR, and someone who can ship without a project manager sitting between you and the work.',
    industries: ['Energy and maritime suppliers', 'Professional services and consulting', 'SaaS and product teams', 'Public-facing SMBs and clinics', 'Education and research orgs'],
    pricing: 'Norwegian agency seniors often bill NOK 1,400–2,500 per hour after markup. Junior rates sit closer to NOK 600–900. We quote fixed scopes in NOK, with a 24-hour estimate, so you are not buying hours you cannot audit.',
    why: [
      ['fa-user-tie', 'Senior owner', '19+ years across enterprise, SaaS, and agency delivery. You talk to the person who ships.'],
      ['fa-flag', 'Norwegian market fit', 'GDPR, Vipps, .no SEO, and bilingual sites are default, not extras.'],
      ['fa-layer-group', 'Full stack', 'Figma, React, Next.js, Node, Azure, and technical SEO in one thread.'],
      ['fa-map-location-dot', 'Cities covered', 'Stavanger HQ, plus Oslo, Bergen, and Trondheim on remote delivery.'],
      ['fa-coins', 'No agency markup', 'Senior quality without a bench of account managers.'],
      ['fa-clock', 'Clear timeline', 'Business sites in 3–5 weeks. Applications in 8–16 weeks.']
    ],
    faqs: [
      ['Are you a freelance web developer or an agency in Norway?', 'devndespro is a registered studio in Stavanger. One senior developer owns design, build, cloud, and SEO. You get agency-level craft without agency overhead.'],
      ['Do you only work in Stavanger?', 'No. Norway work is delivered remotely with Norwegian hours. City pages cover Stavanger, Oslo, Bergen, and Trondheim.'],
      ['Can you build a bilingual Norwegian and English site?', 'Yes. Structure, metadata, and content models are planned for both languages from the first prototype.'],
      ['How fast can we get a quote?', 'Share a brief and you get scope, timeline, and a fixed estimate within 24 hours.']
    ]
  },
  {
    kind: 'country',
    country: 'usa',
    slug: 'usa',
    path: '/services/web-developer-usa',
    place: 'USA',
    badge: 'Senior web developer — USA',
    title: 'Web Developer USA | React & Next.js | devndespro',
    h1: 'Web Developer <em>USA</em>',
    description: 'Hire a senior web developer for US companies. React, Next.js, and full-stack product work with EST–PST overlap. Stripe, ADA-ready delivery, quote in 24 hours.',
    hero: 'A senior web developer for US startups and operators who want product-grade React and Next.js without a bloated bench. Overlap across Eastern and Pacific hours, scoped in USD.',
    market: 'US teams are spoiled for choice and short on trust. The search “web developer in USA” is crowded with staff-aug shops and local agencies. We compete on ownership: one senior builder, written scope, US-hours overlap, and pages that can rank.',
    need: 'US buyers need a developer who can sit in product conversations, not only tickets. That means TypeScript, Next.js, Stripe, accessible UI, and analytics that a founder can read without a slide deck.',
    industries: ['SaaS and B2B software', 'Professional services and clinics', 'E-commerce and DTC brands', 'Fintech and ops tools', 'Agencies that need a senior overflow partner'],
    pricing: 'US senior agency rates often land between $150 and $250 per hour once overhead is included. We quote fixed USD scopes. You see the work, the calendar, and the number before we start.',
    why: [
      ['fa-user-tie', 'Senior product engineer', '19+ years shipping web apps, not only marketing sites.'],
      ['fa-earth-americas', 'US hours overlap', 'Standups and reviews that work for New York, Texas, Florida, and California teams.'],
      ['fa-credit-card', 'US product stack', 'React, Next.js, Stripe, and analytics wired for growth, not vanity.'],
      ['fa-universal-access', 'Accessible by default', 'Keyboard paths, contrast, and semantic HTML so you are not retrofitting ADA later.'],
      ['fa-coins', 'Fixed USD quotes', 'A 24-hour estimate. No surprise retainers.'],
      ['fa-shield-halved', 'DesignRush verified', 'A public studio profile, not an anonymous bench.']
    ],
    faqs: [
      ['Are you based in the United States?', 'HQ is Stavanger, Norway. US work is remote, with overlap from EST to PST and a written communication cadence.'],
      ['Can you replace a US agency for a product build?', 'For a defined web app or site, yes. You get one senior owner instead of a pod of juniors.'],
      ['Do you work with US payments and hosting?', 'Yes. Stripe, common US analytics, and cloud on Azure or the host you already use.'],
      ['Which US markets do you cover?', 'Country page plus New York, California, Texas, and Florida. Same studio, local landing pages for search.']
    ]
  },
  {
    kind: 'country',
    country: 'india',
    slug: 'india',
    path: '/services/web-developer-india',
    place: 'India',
    badge: 'Senior web developer — India',
    title: 'Web Developer India | React & Next.js | devndespro',
    h1: 'Web Developer <em>India</em>',
    description: 'Senior web developer in India with a Chennai delivery hub. React, Next.js, and full-stack apps for Indian and global teams. Clear English delivery. Quote in 24 hours.',
    hero: 'A senior web developer for Indian companies and global teams who want Chennai-side delivery with European product standards. React, Next.js, and SEO in one build.',
    market: 'India has no shortage of developers. It has a shortage of owners. “Web developer in India” often means a bench, a PM, and a rotating cast. We sell the opposite: a named senior, a Chennai hub for delivery, and the same stack we ship in Norway and the US.',
    need: 'Indian product companies need English communication, predictable milestones, and code that a Western client or a local CFO can both live with. That is design systems, Next.js, APIs, and Core Web Vitals — not a theme install.',
    industries: ['SaaS exporters and GCC teams', 'D2C and marketplace brands', 'Professional services and clinics', 'Education and edtech', 'Founders who need a senior overflow pair'],
    pricing: 'India pricing is wide. Cheap retainers hide rework. We quote fixed INR or USD scopes from a 24-hour estimate, with GST-ready invoicing when you need it.',
    why: [
      ['fa-user-tie', 'Senior owner', 'You are not passed to a trainee after the sales call.'],
      ['fa-location-dot', 'Chennai hub', 'Delivery rooted in Chennai, with city pages for Bangalore, Hyderabad, and Mumbai.'],
      ['fa-comments', 'Clear English', 'Written updates, recorded decisions, and reviews that travel across time zones.'],
      ['fa-layer-group', 'Product stack', 'React, Next.js, Node, and Azure — the same system as our Norway and US work.'],
      ['fa-coins', 'Honest India rates', 'Fixed quotes. No bait-and-switch retainers.'],
      ['fa-clock', 'IST-first, global overlap', 'Standups that work for India, Europe, and US mornings.']
    ],
    faqs: [
      ['Is this a staffing company in India?', 'No. devndespro is a studio. India work runs through our Chennai delivery hub with one senior owner on the build.'],
      ['Do you only take global outsourcing work?', 'No. We build for Indian companies as well as teams that want India-side delivery with Western PM quality.'],
      ['Can you work with an existing Indian tech team?', 'Yes. We can own a workstream, a redesign, or a greenfield app without taking over your company.'],
      ['How do cities fit under this page?', 'This is the India hub. Chennai, Bangalore, Hyderabad, and Mumbai each have their own page.']
    ]
  },
  {
    kind: 'city',
    country: 'norway',
    slug: 'stavanger',
    path: '/web-developer-stavanger',
    place: 'Stavanger',
    badge: 'Based in Stavanger',
    title: 'Web Developer Stavanger | Local React & Next.js Studio',
    h1: 'Web Developer <em>Stavanger</em>',
    description: 'Web developer in Stavanger, Norway. Senior React and Next.js, built locally. Energy, maritime, and SMB sites with GDPR and Norwegian SEO. Quote in 24 hours.',
    hero: 'A web developer actually based in Stavanger. Senior React and Next.js for energy suppliers, maritime firms, and local companies who want a studio down the road, not a distant bench.',
    market: 'Stavanger buyers can meet the person who ships. That still matters in energy, maritime, and professional services, where trust beats a glossy Oslo pitch deck.',
    need: 'Local companies need a developer who understands Norwegian operations, can sit in a workshop, and still ships modern React — not a 2014 WordPress clone with a new coat of paint.',
    industries: ['Energy and oil-service suppliers', 'Maritime and offshore services', 'Local clinics and professional firms', 'Retail and hospitality groups', 'Municipal and civic projects'],
    pricing: 'Stavanger projects are quoted in NOK as a fixed scope. A brochure site and a customer portal are not the same job, and the estimate will say so.',
    why: [
      ['fa-location-dot', 'Local studio', 'HQ in Stavanger. Workshops and reviews in person when they help.'],
      ['fa-industry', 'Energy-literate', 'Suppliers here need sober UX, secure portals, and English/Norwegian content.'],
      ['fa-search', 'Stavanger SEO', 'Pages aimed at Stavanger and Rogaland search, not generic Norway copy.'],
      ['fa-code', 'Modern stack', 'React, Next.js, Node, Azure — the same bar as our Oslo work.'],
      ['fa-shield-halved', 'GDPR default', 'Consent, processing, and hosting choices that fit Norwegian law.'],
      ['fa-clock', 'Fast start', 'Estimate in 24 hours. Clear milestones after that.']
    ],
    faqs: [
      ['Are you actually in Stavanger?', 'Yes. devndespro is based in Stavanger. Remote is available, local is possible.'],
      ['Can you replace our Oslo agency?', 'If the work is a site or web app with a defined owner, yes. You stop paying for coordination layers.'],
      ['Do you build customer portals for energy suppliers?', 'Yes. Authenticated apps, document flows, and integrations are a normal brief here.'],
      ['Norwegian or English?', 'Both. Most Stavanger sites need both, and we plan for that in the IA.']
    ]
  },
  {
    kind: 'city',
    country: 'norway',
    slug: 'oslo',
    path: '/web-developer-oslo',
    place: 'Oslo',
    badge: 'Serving Oslo remotely',
    title: 'Web Developer Oslo | React & Next.js for Capital Teams',
    h1: 'Web Developer <em>Oslo</em>',
    description: 'Web developer for Oslo businesses. Senior React and Next.js, remote from Stavanger, Norwegian hours. Finance, SaaS, and professional services. Quote in 24 hours.',
    hero: 'A senior web developer for Oslo teams who want capital-city quality without a capital-city agency markup. Remote delivery on Norwegian hours, with weekly live reviews.',
    market: 'Oslo is the most competitive web market in Norway. Buyers compare you with every other firm on Karenslyst allé. The site has to feel international and still rank on Google.no.',
    need: 'Oslo companies need a developer who can hold a product conversation with a CEO and a tech lead in the same week. Speed, design restraint, and SEO that survives a crowded SERP.',
    industries: ['Finance, fintech, and funds', 'SaaS and product companies', 'Legal and consulting firms', 'Media and culture orgs', 'Healthcare and clinics'],
    pricing: 'Oslo agency quotes often hide PM time. We send a fixed NOK scope within 24 hours, with what is in and what is not.',
    why: [
      ['fa-city', 'Oslo-level craft', 'Interfaces that look at home next to the best capital-city product teams.'],
      ['fa-video', 'Remote, not absent', 'Weekly video reviews, daily async notes, Norwegian working hours.'],
      ['fa-search', 'Oslo SEO', 'Queries people actually type in Oslo, not recycled national keywords.'],
      ['fa-code', 'React and Next.js', 'The stack Oslo product teams already expect.'],
      ['fa-shield-halved', 'GDPR and trust', 'Cookie, privacy, and hosting decisions that pass a legal review.'],
      ['fa-coins', 'No Oslo markup', 'Senior delivery without inner-city overhead.']
    ],
    faqs: [
      ['Do you work in Oslo if you are based in Stavanger?', 'Yes. Most Oslo clients prefer structured remote delivery. We travel when a workshop is worth it.'],
      ['How do you compete with Oslo agencies?', 'One senior owner, faster decisions, and no junior relay. The work is the pitch.'],
      ['Can you join an existing Oslo product team?', 'Yes, as a defined workstream: a marketing site, an app, or a redesign.'],
      ['How long does an Oslo project take?', 'Marketing sites 3–5 weeks. Applications 8–16 weeks, in milestones.']
    ]
  },
  {
    kind: 'city',
    country: 'norway',
    slug: 'bergen',
    path: '/web-developer-bergen',
    place: 'Bergen',
    badge: 'Serving Bergen remotely',
    title: 'Web Developer Bergen | React Sites for West Coast Firms',
    h1: 'Web Developer <em>Bergen</em>',
    description: 'Web developer for Bergen and Vestland. Senior React and Next.js for maritime, tourism, and professional firms. Norwegian hours, quote in 24 hours.',
    hero: 'A senior web developer for Bergen companies that need west-coast credibility online: maritime, tourism, education, and professional services, shipped on React and Next.js.',
    market: 'Bergen firms sell on reputation. The site has to feel local enough for Vestland and strong enough for export clients who will never visit Bryggen.',
    need: 'You need bilingual content, weather-proof performance on mobile, and booking or enquiry flows that do not leak on a ferry Wi-Fi connection.',
    industries: ['Maritime and aquaculture', 'Tourism and hospitality', 'University spinouts and education', 'Local professional services', 'Retail groups on the west coast'],
    pricing: 'Fixed NOK quotes. A seasonal tourism site and a supplier portal are priced as different products, because they are.',
    why: [
      ['fa-anchor', 'West-coast context', 'Maritime and tourism briefs are normal, not a stretch.'],
      ['fa-mobile-screen', 'Mobile first', 'Bergen traffic is phone-heavy. We design for that, not a desktop leftover.'],
      ['fa-search', 'Bergen SEO', 'City and Vestland terms, plus English for export pages.'],
      ['fa-code', 'Modern delivery', 'React, Next.js, and CI/CD so updates do not wait on an agency queue.'],
      ['fa-video', 'Remote cadence', 'Norwegian hours, weekly live reviews, written decisions.'],
      ['fa-coins', 'Clear money', 'Estimate in 24 hours. No retainer fog.']
    ],
    faqs: [
      ['Do you have an office in Bergen?', 'No. Delivery is remote from Stavanger, with the same process we use for Oslo.'],
      ['Can you handle a tourism site with seasonal peaks?', 'Yes. Performance, content, and enquiry flows are planned for peaks, not only launch week.'],
      ['Norwegian and English?', 'Yes. Most Bergen export firms need both.'],
      ['What is a typical timeline?', '3–5 weeks for a business site. Longer for apps with integrations.']
    ]
  },
  {
    kind: 'city',
    country: 'norway',
    slug: 'trondheim',
    path: '/web-developer-trondheim',
    place: 'Trondheim',
    badge: 'Serving Trondheim remotely',
    title: 'Web Developer Trondheim | React for Tech and Research Teams',
    h1: 'Web Developer <em>Trondheim</em>',
    description: 'Web developer for Trondheim. Senior React and Next.js for NTNU spinouts, research, and Mid-Norway companies. Remote, Norwegian hours, quote in 24 hours.',
    hero: 'A senior web developer for Trondheim’s tech and research economy: spinouts, specialist manufacturers, and firms that need a product site, not a brochure.',
    market: 'Trondheim punches above its size because of NTNU and the research cluster. Buyers here sniff out fluff. They want architecture, not slogans.',
    need: 'A developer who can talk to engineers, still design a calm UI, and ship documentation that a new hire can read in six months.',
    industries: ['Deep tech and NTNU spinouts', 'Research and health tech', 'Specialist manufacturing', 'Professional services in Trøndelag', 'SaaS teams hiring their first product site'],
    pricing: 'Fixed NOK scopes. If the brief is really an application, we will say so instead of selling a “website” that collapses at auth.',
    why: [
      ['fa-flask', 'Tech-literate', 'Comfortable with researchers, CTOs, and first-time founders.'],
      ['fa-code', 'Product stack', 'React, Next.js, TypeScript, APIs — not a theme shop.'],
      ['fa-search', 'Trondheim SEO', 'Local terms plus English for international talent and customers.'],
      ['fa-book', 'Maintainable code', 'The next developer should not have to reverse-engineer our work.'],
      ['fa-video', 'Remote, structured', 'Norwegian hours, milestones, no mystery sprints.'],
      ['fa-coins', 'Honest scope', '24-hour estimate with inclusions and exclusions.']
    ],
    faqs: [
      ['Do you work with NTNU spinouts?', 'Yes. Early product sites, dashboards, and marketing systems are a common Trondheim brief.'],
      ['Can you pair with an in-house developer?', 'Yes. We can own frontend, the public site, or a defined app slice.'],
      ['Is this only marketing websites?', 'No. Web applications, portals, and SaaS UIs are in scope.'],
      ['How do you handle IP and code access?', 'You own the repo. We work in your Git, or hand over ours at launch.']
    ]
  },
  {
    kind: 'city',
    country: 'usa',
    slug: 'new-york',
    path: '/web-developer-new-york',
    place: 'New York',
    badge: 'Serving New York remotely',
    title: 'Web Developer New York | React & Next.js for NYC Teams',
    h1: 'Web Developer <em>New York</em>',
    description: 'Web developer for New York companies. Senior React and Next.js with EST overlap. SaaS, finance, and professional services. Fixed USD quotes in 24 hours.',
    hero: 'A senior web developer for New York teams who need product-grade React without a Manhattan agency burn rate. EST overlap, written scopes, and pages built to convert.',
    market: 'New York does not wait. If the site feels slow or vague, the buyer is already on a competitor. Finance, media, and SaaS all expect polish by Tuesday.',
    need: 'You need a developer who can join a 9am ET standup, ship in public, and not disappear into a 12-hour timezone gap.',
    industries: ['Fintech and professional services', 'SaaS and marketplaces', 'Media and content companies', 'Clinics and specialist practices', 'Studios that need senior overflow'],
    pricing: 'NYC agencies price for rent. We quote fixed USD. You pay for the build, not Midtown overhead.',
    why: [
      ['fa-city', 'NYC standard', 'Tight UI, fast pages, no decorative fluff.'],
      ['fa-clock', 'EST overlap', 'Reviews that fit a New York calendar.'],
      ['fa-credit-card', 'Stripe and growth', 'Payments, analytics, and SEO wired from day one.'],
      ['fa-universal-access', 'Accessible UI', 'Keyboard, contrast, and semantics for real users and real risk.'],
      ['fa-code', 'Next.js delivery', 'The stack NY product teams already hire for.'],
      ['fa-coins', 'Fixed USD', 'Estimate in 24 hours. No open-ended retainer.']
    ],
    faqs: [
      ['Are you in New York?', 'No. Delivery is remote with Eastern Time overlap. Most NY clients never needed an office visit.'],
      ['Can you work with a NY design team?', 'Yes. We can take Figma as source, or run design and code together.'],
      ['Do you sign US-style MSAs?', 'We work from a clear statement of work. Legal review is welcome before kickoff.'],
      ['How fast can a NY marketing site launch?', 'Typically 3–5 weeks once scope is locked.']
    ]
  },
  {
    kind: 'city',
    country: 'usa',
    slug: 'california',
    path: '/web-developer-california',
    place: 'California',
    badge: 'Serving California remotely',
    title: 'Web Developer California | React for SF, LA, and SaaS Teams',
    h1: 'Web Developer <em>California</em>',
    description: 'Web developer for California companies. Senior React and Next.js for SF, LA, and statewide SaaS teams. Pacific overlap, USD quotes in 24 hours.',
    hero: 'A senior web developer for California product companies — Bay Area, Los Angeles, and statewide SaaS — who want Next.js craft without a 15-person pod.',
    market: 'California teams have seen every pitch. They care whether you can ship a design system, a billing flow, and a site that does not tank Lighthouse.',
    need: 'A partner who understands product language, can work Pacific hours for a few blocks a day, and will not turn a landing page into a six-month program.',
    industries: ['SaaS and developer tools', 'Consumer and DTC brands', 'Entertainment-adjacent startups', 'Climate and hardware-software firms', 'Agencies needing a senior build partner'],
    pricing: 'Bay Area retainers are priced like rent. We quote a fixed USD scope. If it is an app, we call it an app.',
    why: [
      ['fa-rocket', 'Product, not brochure', 'Comfortable inside SaaS roadmaps and founder briefs.'],
      ['fa-clock', 'Pacific overlap', 'Enough shared hours for LA and SF standups.'],
      ['fa-code', 'App-ready stack', 'React, Next.js, TypeScript, design systems.'],
      ['fa-gauge-high', 'Performance', 'Core Web Vitals treated as a launch requirement.'],
      ['fa-search', 'California SEO', 'State and metro pages when the business actually serves them.'],
      ['fa-coins', 'Fixed quotes', '24-hour estimate in USD.']
    ],
    faqs: [
      ['Do you cover both SF and LA?', 'Yes. This page is statewide. Delivery is remote with Pacific overlap.'],
      ['Can you rebuild a Webflow or Framer site in Next.js?', 'Yes, when you have outgrown a page builder and need a real codebase.'],
      ['Will you work under an existing VP Eng?', 'Yes. We can be a scoped contributor, not only a turnkey studio.'],
      ['Typical California timeline?', 'Sites in 3–5 weeks. Product UI and apps in 8–16 weeks.']
    ]
  },
  {
    kind: 'city',
    country: 'usa',
    slug: 'texas',
    path: '/web-developer-texas',
    place: 'Texas',
    badge: 'Serving Texas remotely',
    title: 'Web Developer Texas | React for Austin, Dallas, and Houston',
    h1: 'Web Developer <em>Texas</em>',
    description: 'Web developer for Texas businesses. Senior React and Next.js for Austin, Dallas, Houston, and statewide operators. Central Time overlap. Quote in 24 hours.',
    hero: 'A senior web developer for Texas companies that are scaling past a template: Austin product teams, Dallas operators, Houston industry firms.',
    market: 'Texas buyers want straight talk. They are hiring because growth outran the Squaresite, not because they want a brand film.',
    need: 'A developer who can ship a credible site this quarter, then grow it into a portal without a rewrite.',
    industries: ['Austin SaaS and startups', 'Dallas professional services', 'Houston industrial and energy-adjacent firms', 'Healthcare practices', 'Regional retailers'],
    pricing: 'Fixed USD. Texas projects often start as a site and grow into tools. The first quote stays honest about that line.',
    why: [
      ['fa-map', 'Statewide', 'Austin, Dallas, Houston, San Antonio — one studio, local pages.'],
      ['fa-clock', 'Central Time overlap', 'Work blocks that fit a Texas day.'],
      ['fa-code', 'Growable stack', 'Next.js that can become an app, not a dead template.'],
      ['fa-industry', 'Operator-friendly', 'Clear demos, clear admin, fewer mysteries.'],
      ['fa-search', 'Texas SEO', 'City and state terms that match how customers search.'],
      ['fa-coins', 'No fluff retainers', '24-hour estimate, then build.']
    ],
    faqs: [
      ['Austin or Dallas — does it matter?', 'Same delivery. The page you found should match the market you serve; the build process does not change.'],
      ['Can you integrate with HubSpot or a CRM?', 'Yes, when it is in scope. We will not pretend a widget is a strategy.'],
      ['Do you do e-commerce?', 'Headless or lightweight storefronts, yes. A full marketplace is a different brief.'],
      ['How do we start?', 'Send the brief. You get a written estimate within 24 hours.']
    ]
  },
  {
    kind: 'city',
    country: 'usa',
    slug: 'florida',
    path: '/web-developer-florida',
    place: 'Florida',
    badge: 'Serving Florida remotely',
    title: 'Web Developer Florida | React for Miami, Tampa, and Orlando',
    h1: 'Web Developer <em>Florida</em>',
    description: 'Web developer for Florida companies. Senior React and Next.js for Miami, Tampa, Orlando, and statewide SMBs. EST overlap, USD quotes in 24 hours.',
    hero: 'A senior web developer for Florida firms that need to look national: Miami professional services, Tampa operators, Orlando visitor businesses, and statewide SMBs.',
    market: 'Florida search is noisy with cheap page-builders. The companies who win look faster, clearer, and more trustworthy than the template next door.',
    need: 'Mobile performance, enquiry forms that actually notify someone, and SEO that targets the cities you can serve — not the whole Southeast by accident.',
    industries: ['Professional services and clinics', 'Hospitality and local brands', 'Real-estate and property services', 'Logistics and home services', 'Founders moving operations to Florida'],
    pricing: 'Fixed USD scopes. A five-page site and a booking platform are priced as different jobs.',
    why: [
      ['fa-sun', 'Florida-aware', 'Hospitality, services, and seasonal traffic patterns are normal briefs.'],
      ['fa-mobile-screen', 'Phone-first', 'Most Florida visits are mobile. We design for that first.'],
      ['fa-clock', 'Eastern Time', 'Overlap with Miami, Tampa, and Orlando calendars.'],
      ['fa-search', 'City-level SEO', 'Miami is not Orlando. Pages and metadata stay honest.'],
      ['fa-code', 'Not a template mill', 'React and Next.js when you have outgrown WordPress soup.'],
      ['fa-coins', 'Clear quotes', 'Estimate in 24 hours.']
    ],
    faqs: [
      ['Do you only serve Miami?', 'No. This is a Florida page covering Miami, Tampa, Orlando, and statewide remote work.'],
      ['Can you rebuild a Wix or Squarespace site?', 'Yes, into a maintainable Next.js codebase when you are ready to own it.'],
      ['Bilingual English and Spanish?', 'We can structure the site for it. Native Spanish copy should come from you or a writer we agree on.'],
      ['Typical timeline?', '3–5 weeks for a business site once content is in motion.']
    ]
  },
  {
    kind: 'city',
    country: 'india',
    slug: 'chennai',
    path: '/web-developer-chennai',
    place: 'Chennai',
    badge: 'Chennai delivery hub',
    title: 'Web Developer Chennai | React & Next.js Studio Hub',
    h1: 'Web Developer <em>Chennai</em>',
    description: 'Web developer in Chennai. Senior React and Next.js from our India delivery hub. Product sites and web apps for local and global teams. Quote in 24 hours.',
    hero: 'A senior web developer through our Chennai hub: React and Next.js for Chennai companies and for global teams who want India-side delivery with a named owner.',
    market: 'Chennai is our India anchor. IT corridor firms, manufacturers, and exporters need English-grade product UI, not another outsourced brochure.',
    need: 'Someone who can sit in IST, write things down, and ship a codebase a European client will accept in review.',
    industries: ['IT services and product teams', 'Manufacturing and export firms', 'Healthcare and education', 'D2C brands in Tamil Nadu', 'Global clients using the Chennai hub'],
    pricing: 'INR or USD, fixed. Hub work is still scoped like a studio, not like a body shop.',
    why: [
      ['fa-location-dot', 'Hub city', 'Chennai is where India delivery is rooted.'],
      ['fa-comments', 'English written well', 'Updates and specs that survive a client forward.'],
      ['fa-code', 'Same stack as Norway', 'React, Next.js, Node, Azure.'],
      ['fa-clock', 'IST-first', 'Standups that fit Chennai, with Europe/US overlap when needed.'],
      ['fa-users', 'Not a bench', 'A senior owner. No rotating juniors after kickoff.'],
      ['fa-coins', 'Fixed quotes', '24-hour estimate, GST-ready when required.']
    ],
    faqs: [
      ['Is the Chennai hub a separate company?', 'No. It is how we deliver India work inside the same studio.'],
      ['Can Chennai teams still get a local-feeling site?', 'Yes. Tamil Nadu businesses get the same craft as export-facing SaaS.'],
      ['Do you staff contractors by the month?', 'No. We sell scoped builds and defined retainers for work we own.'],
      ['How do we start?', 'Send a brief to hello@devndespro.com. Estimate in 24 hours.']
    ]
  },
  {
    kind: 'city',
    country: 'india',
    slug: 'bangalore',
    path: '/web-developer-bangalore',
    place: 'Bangalore',
    badge: 'Serving Bangalore remotely',
    title: 'Web Developer Bangalore | React for SaaS and Startups',
    h1: 'Web Developer <em>Bangalore</em>',
    description: 'Web developer for Bangalore (Bengaluru). Senior React and Next.js for SaaS, startups, and product teams. Chennai hub delivery, IST hours, quote in 24 hours.',
    hero: 'A senior web developer for Bangalore product companies who are tired of PM-and-bench outsourcing. React, Next.js, and a named owner, delivered from our Chennai hub.',
    market: 'Bengaluru has world-class engineers and a lot of noisy agencies. Founders here want someone who has shipped SaaS UI, not someone reading a tutorial during your sprint.',
    need: 'Design systems, auth-ready Next.js, and a marketing site that does not embarrass the product behind it.',
    industries: ['SaaS and B2B software', 'Consumer startups', 'GCC and product orgs', 'Fintech and ops tools', 'Founders hiring their first serious site'],
    pricing: 'INR or USD fixed scopes. Bangalore rates vary wildly; we will not pretend a landing page is a six-month squad.',
    why: [
      ['fa-rocket', 'SaaS-native', 'Comfortable with product marketing sites and app shells.'],
      ['fa-code', 'TypeScript delivery', 'The bar Bangalore teams already use internally.'],
      ['fa-search', 'Startup SEO', 'Pages that can rank for the product, not only the brand.'],
      ['fa-comments', 'Direct owner', 'No account executive translating your ticket.'],
      ['fa-clock', 'IST cadence', 'Reviews that fit a Bengaluru calendar.'],
      ['fa-coins', 'Scoped money', 'Estimate in 24 hours.']
    ],
    faqs: [
      ['Are you in Bangalore or Chennai?', 'India delivery is anchored in Chennai. Bangalore work is remote inside IST, which is how most product teams already work.'],
      ['Can you work with our in-house React team?', 'Yes. We can own the public site, a redesign, or a product surface.'],
      ['Do you do branding as well?', 'UI and product design, yes. A full brand identity is only in scope if we agree it up front.'],
      ['Typical timeline?', 'Sites 3–5 weeks. Product UI 8–16 weeks.']
    ]
  },
  {
    kind: 'city',
    country: 'india',
    slug: 'hyderabad',
    path: '/web-developer-hyderabad',
    place: 'Hyderabad',
    badge: 'Serving Hyderabad remotely',
    title: 'Web Developer Hyderabad | React for Enterprise and Product Teams',
    h1: 'Web Developer <em>Hyderabad</em>',
    description: 'Web developer for Hyderabad. Senior React and Next.js for enterprise IT, pharma-adjacent, and product teams. Studio delivery, IST hours, quote in 24 hours.',
    hero: 'A senior web developer for Hyderabad companies that need enterprise-calm UI: product teams, IT orgs, and firms who cannot ship a playful startup template to a procurement board.',
    market: 'Hyderabad buyers often have a security questionnaire before they have a homepage. The work has to look serious and still move.',
    need: 'Accessible UI, documented components, and a Next.js app that survives an IT review.',
    industries: ['Enterprise IT and GCC units', 'Pharma and life-science firms', 'B2B SaaS', 'Professional services', 'Internal tools that leaked into “the website”'],
    pricing: 'Fixed INR or USD. If procurement needs a longer SOW, we will write one that matches the build, not a fantasy squad.',
    why: [
      ['fa-building', 'Enterprise tone', 'UI that passes a conservative stakeholder, not only Dribbble.'],
      ['fa-shield-halved', 'Review-ready', 'Semantic HTML, performance, and a repo you can scan.'],
      ['fa-code', 'React and Next.js', 'The stack Hyderabad product groups already hire.'],
      ['fa-comments', 'Written decisions', 'Less hallway folklore, more spec.'],
      ['fa-clock', 'IST delivery', 'From the Chennai hub, on a Hyderabad calendar.'],
      ['fa-coins', 'Clear commercial', '24-hour estimate to start.']
    ],
    faqs: [
      ['Can you work through a Hyderabad IT vendor process?', 'Yes, if the process is documented. We will not invent a 40-person org chart to win a form.'],
      ['Do you build internal portals?', 'Yes. Authenticated apps are a normal brief.'],
      ['On-prem or cloud?', 'Cloud on Azure is native for us. Other hosts are fine when they are in the brief.'],
      ['How do we begin?', 'A written brief, then a fixed estimate within 24 hours.']
    ]
  },
  {
    kind: 'city',
    country: 'india',
    slug: 'mumbai',
    path: '/web-developer-mumbai',
    place: 'Mumbai',
    badge: 'Serving Mumbai remotely',
    title: 'Web Developer Mumbai | React for Finance, Media, and Brands',
    h1: 'Web Developer <em>Mumbai</em>',
    description: 'Web developer for Mumbai. Senior React and Next.js for finance, media, and consumer brands. Fast, credible sites. IST delivery, quote in 24 hours.',
    hero: 'A senior web developer for Mumbai companies who need the site to look like the business: finance, media, D2C, and professional firms that cannot afford a cheap first impression.',
    market: 'Mumbai judges quickly. If the motion is clumsy or the story is vague, you have already lost the tab. The work has to feel expensive without becoming theatre.',
    need: 'Strong typography, ruthless performance on mid-range Androids, and SEO for brand plus category terms.',
    industries: ['BFSI and fintech', 'Media and entertainment brands', 'D2C and lifestyle', 'Agencies and consultancies', 'Family businesses professionalising their site'],
    pricing: 'INR or USD, fixed. Mumbai “premium agency” quotes often buy slides. Ours buy a repository.',
    why: [
      ['fa-landmark', 'Finance-capable', 'Calm UI, trust, and forms that a compliance team can live with.'],
      ['fa-bolt', 'Fast on real phones', 'Performance budgets, not only desktop Lighthouse.'],
      ['fa-search', 'Mumbai SEO', 'Brand and category terms for how Mumbai actually searches.'],
      ['fa-code', 'Product stack', 'React and Next.js when the next step is an app, not another PDF.'],
      ['fa-clock', 'IST, decisive', 'Short feedback loops. No week-long silence.'],
      ['fa-coins', 'Studio pricing', 'Estimate in 24 hours.']
    ],
    faqs: [
      ['Do you have a Mumbai office?', 'No. Delivery is remote via the Chennai hub, which is how most Mumbai product work already runs.'],
      ['Can you work with our Mumbai agency on design?', 'Yes. We can be the engineering partner behind an existing creative team.'],
      ['E-commerce in scope?', 'Headless or compact storefronts, yes. A full marketplace needs its own scope.'],
      ['Launch time?', '3–5 weeks for a marketing site with content ready.']
    ]
  }
];

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function related(page) {
  const country = countries[page.country];
  const hubs = pages.filter((item) => item.kind === 'country');
  const cities = pages.filter((item) => item.kind === 'city' && item.country === page.country);
  const links = [];

  if (page.kind === 'city') {
    const hub = hubs.find((item) => item.country === page.country);
    links.push([hub.path, `Web Developer ${hub.place}`]);
  }

  cities
    .filter((item) => item.path !== page.path)
    .forEach((item) => links.push([item.path, `Web Developer ${item.place}`]));

  hubs
    .filter((item) => item.path !== page.path && item.country !== page.country)
    .forEach((item) => links.push([item.path, `Web Developer ${item.place}`]));

  links.push([country.seoExtra, country.seoExtraLabel]);
  links.push([country.seoExtra2, country.seoExtra2Label]);

  return links.slice(0, 8);
}

function jsonLd(page) {
  const url = `${host}${page.path}`;
  const country = countries[page.country];
  const service = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `devndespro — web developer ${page.place}`,
    description: page.description,
    url,
    areaServed: page.kind === 'country' ? country.area : page.place,
    provider: {
      '@type': 'Organization',
      name: 'devndespro',
      url: host,
      logo: `${host}/images/DDDP_logo.png`,
      email: 'hello@devndespro.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Stavanger',
        addressCountry: 'NO'
      }
    },
    offers: {
      '@type': 'Offer',
      description: 'Free consultation and project estimate within 24 hours',
      price: '0',
      priceCurrency: country.currency === 'NOK' ? 'NOK' : 'USD'
    }
  };

  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${host}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: `Web Developer ${country.name}`,
        item: `${host}/services/web-developer-${country.code}`
      }
    ]
  };
  if (page.kind === 'city') {
    crumbs.itemListElement.push({
      '@type': 'ListItem',
      position: 3,
      name: `Web Developer ${page.place}`,
      item: url
    });
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: page.faqs.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a }
    }))
  };

  return { service, crumbs, faq };
}

function render(page) {
  const country = countries[page.country];
  const url = `${host}${page.path}`;
  const ld = jsonLd(page);
  const chips = ['React', 'Next.js', 'Node.js', 'TypeScript', 'Figma', 'PostgreSQL', 'Azure', 'CI/CD', ...country.stackExtra, 'Responsive'];
  const cityLinks = pages.filter((item) => item.kind === 'city' && item.country === page.country);
  const links = related(page);
  const why = page.why.map(([icon, title, text]) => `
    <div class="why-card">
      <div class="why-icon"><i class="fa-solid ${icon}"></i></div>
      <h3>${title}</h3>
      <p>${text}</p>
    </div>`).join('');
  const faqs = page.faqs.map(([q, a]) => `
    <div class="faq-item">
      <div class="faq-q">${q}</div>
      <div class="faq-a">${a}</div>
    </div>`).join('');
  const relatedHtml = links.map(([href, label]) => `
    <a href="${href}" class="related-link"><i class="fa-solid fa-arrow-right"></i> ${label}</a>`).join('');
  const places = page.kind === 'country'
    ? `
<section class="section">
  <span class="s-label">Where we work</span>
  <h2 class="s-h">City pages under<br><em>${page.place}</em></h2>
  <p class="s-body">Country search and city search are different jobs. These pages support the same studio, with copy for each market.</p>
  <div class="place-grid">
    ${cityLinks.map((item) => `<a class="place-card" href="${item.path}"><strong>Web developer ${item.place}</strong><span>Open the ${item.place} page</span></a>`).join('')}
  </div>
</section>`
    : `
<section class="section">
  <span class="s-label">Country hub</span>
  <h2 class="s-h">Part of our <em>${country.name}</em> work</h2>
  <p class="s-body"><a href="/services/web-developer-${country.code}">Web developer ${country.name}</a> is the parent page. Sister markets: ${cityLinks.filter((item) => item.path !== page.path).map((item) => `<a href="${item.path}">${item.place}</a>`).join(', ')}.</p>
</section>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  <link rel="canonical" href="${url}">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${host}/images/work-tenderlyst-app.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.title)}">
  <meta name="twitter:description" content="${esc(page.description)}">
  <script type="application/ld+json">${JSON.stringify(ld.service)}</script>
  <script type="application/ld+json">${JSON.stringify(ld.crumbs)}</script>
  <script type="application/ld+json">${JSON.stringify(ld.faq)}</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;1,400&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
  <link rel="stylesheet" href="/css/seo-landing.css">
  <script src="/js/site-analytics.js" defer></script>
</head>
<body>
<nav class="top-nav">
  <a href="/" class="logo" aria-label="devndespro home"><img src="/images/DDDP_logo.png" alt="devndespro logo" width="1280" height="655"></a>
  <div class="top-nav-links">
    <a href="/">Back to Home</a>
    <a href="/#home-cases">Our Work</a>
    <a href="/#home-contact" class="btn-nav">Get Free Quote</a>
  </div>
</nav>

<div class="crumb">
  <a href="/">Home</a>
  <span>/</span>
  <a href="/services/web-developer-${country.code}">Web Developer ${country.name}</a>
  ${page.kind === 'city' ? `<span>/</span><span>Web Developer ${page.place}</span>` : ''}
</div>

<section class="hero">
  <div class="hero-badge"><i class="fa-solid fa-circle-check"></i>${page.badge}</div>
  <h1>${page.h1}</h1>
  <p class="hero-sub">${page.hero}</p>
  <div class="hero-actions">
    <a href="/#home-contact" class="btn-primary"><i class="fa-solid fa-arrow-right"></i> Start a Project</a>
    <a href="/#home-cases" class="btn-secondary"><i class="fa-solid fa-eye"></i> View Our Work</a>
  </div>
</section>

<div class="stats-strip"><div class="stat-item"><span class="stat-n">19+</span><span class="stat-l">Years</span></div><div class="stat-item"><span class="stat-n">100%</span><span class="stat-l">Retention</span></div><div class="stat-item"><span class="stat-n">24h</span><span class="stat-l">Quote</span></div><div class="stat-item"><span class="stat-n">${country.currency}</span><span class="stat-l">Scoped</span></div></div>

<div class="trust-bar">
  <div class="trust-item"><i class="fa-solid fa-shield-check"></i> DesignRush Verified</div>
  <div class="trust-item"><i class="fa-solid fa-globe"></i> Norway · USA · India · Europe</div>
  <div class="trust-item"><i class="fa-brands fa-react"></i> React & Next.js Specialists</div>
  <div class="trust-item"><i class="fa-solid fa-award"></i> 19+ Years of Craft</div>
</div>

<section class="section">
  <span class="s-label">Why this page exists</span>
  <h2 class="s-h">Web developer in<br><em>${page.place}</em></h2>
  <p class="s-body">${page.market}</p>
  <div class="why-grid">${why}</div>
</section>

<div class="divider"></div>

<section class="section">
  <span class="s-label">Technology</span>
  <h2 class="s-h">The stack that<br><em>delivers results</em></h2>
  <p class="s-body">Every ${page.place} build uses a modern stack, then adds what that market actually needs — ${country.hours}, ${country.hub}.</p>
  <div class="stack-grid">
    ${chips.map((chip) => `<div class="stack-chip"><i class="fa-solid fa-check"></i><span>${chip}</span></div>`).join('')}
  </div>
</section>

<div class="divider"></div>

<section class="section">
  <span class="s-label">The Process</span>
  <h2 class="s-h">Clear steps.<br><em>No surprises.</em></h2>
  <p class="s-body">From brief to launch, the same sequence whether you found us on the ${country.name} hub or this ${page.place} page.</p>
  <div class="process-grid">
    <div class="p-step"><div class="p-num">01</div><h3>Brief</h3><p>Share the project. Get a 24-hour estimate in ${country.currency}.</p></div>
    <div class="p-step"><div class="p-num">02</div><h3>Design</h3><p>Figma prototype before production code.</p></div>
    <div class="p-step"><div class="p-num">03</div><h3>Build</h3><p>React and Next.js, shipped in milestones.</p></div>
    <div class="p-step"><div class="p-num">04</div><h3>Launch</h3><p>CI/CD, monitoring, and SEO you can measure.</p></div>
  </div>
</section>

<div class="divider"></div>

<section class="section">
  <div class="content-rich">
    <span class="s-label">Deep Dive</span>
    <h2>Web developer in ${page.place}</h2>
    <p>${page.market}</p>
    <p>${page.need}</p>
    <h2>What ${page.place} teams actually need</h2>
    <p>${page.need} HQ is Stavanger, Norway. ${page.kind === 'city' ? `${page.place} work is delivered remotely unless you are in Stavanger.` : `${country.name} work is organised from ${country.hub}.`} You still get a senior owner, not a relay of juniors.</p>
    <h2>Industries we take in ${page.place}</h2>
    <ul>${page.industries.map((item) => `<li>${item}</li>`).join('')}</ul>
    <h2>${page.place} pricing and quotes</h2>
    <p>${page.pricing}</p>
  </div>
</section>

${places}

<section class="section section-sm">
  <div class="cta-strip">
    <h2>Ready to start your ${page.place} project?</h2>
    <p>Share the brief. You get scope, timeline, and a ${country.currency} estimate within 24 hours.</p>
    <div class="cta-actions">
      <a href="/#home-contact" class="btn-primary"><i class="fa-solid fa-paper-plane"></i> Send Your Brief</a>
      <a href="https://api.whatsapp.com/send?phone=4740975201" class="btn-secondary" target="_blank" rel="noopener"><i class="fa-brands fa-whatsapp"></i> WhatsApp Us</a>
    </div>
  </div>
</section>

<section class="section">
  <span class="s-label">Common Questions</span>
  <h2 class="s-h">What ${page.place} clients<br><em>always ask</em></h2>
  <div class="faq-list">${faqs}</div>
</section>

<section class="section">
  <span class="s-label">Explore More</span>
  <h2 class="s-h">Related <em>pages</em></h2>
  <div class="related-grid">${relatedHtml}</div>
</section>

<footer>
  <div class="footer-inner">
    <p class="footer-copy">© 2026 devndespro · Stavanger, Norway · Serving USA, Europe &amp; India</p>
    <nav class="footer-links">
      <a href="/">Home</a>
      <a href="/services/web-developer-norway">Norway</a>
      <a href="/services/web-developer-usa">USA</a>
      <a href="/services/web-developer-india">India</a>
      <a href="/#home-contact">Contact</a>
    </nav>
  </div>
</footer>
</body>
</html>
`;
}

fs.mkdirSync(path.join(root, 'services'), { recursive: true });

for (const page of pages) {
  const file = page.path.startsWith('/services/')
    ? path.join(root, 'services', `${page.slug === 'norway' || page.slug === 'usa' || page.slug === 'india' ? `web-developer-${page.slug}` : page.slug}.html`)
    : path.join(root, `${page.path.replace(/^\//, '')}.html`);
  fs.writeFileSync(file, render(page), 'utf8');
  console.log('wrote', file.replace(`${root}\\`, '').replace(`${root}/`, ''));
}
