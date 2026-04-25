import { useEffect } from 'react';
import template from './template.html?raw';

function App() {
  useEffect(() => {
    const translations = {
      en: {
        'utility.wa': 'Chat on WhatsApp',
        'utility.top': 'Back to top',
        'utility.top.short': 'TOP',
        'nav.services': 'Services',
        'nav.work': 'Work',
        'nav.skills': 'Skills',
        'nav.blog': 'Blog',
        'nav.contact': 'Contact',
        'nav.quote': 'Get Free Quote',
        'hero.kicker': 'Full-Stack + DevOps',
        'hero.line1': 'We Design.',
        'hero.line2': 'We Build.',
        'hero.line3': 'We Grow.',
        'hero.stat1': 'Years of craft',
        'hero.stat2': 'Google rankings',
        'hero.stat3': 'Client retention',
        'hero.desc': 'A premium <strong>React & Next.js web development</strong> and <strong>UI/UX design agency</strong> based in <strong>Stavanger, Norway</strong> serving startups and businesses across <strong>Europe, the USA, India, and APAC</strong>. From Figma to production.',
        'hero.svc1': 'UI/UX Design & Figma Prototyping',
        'hero.svc2': 'React & Next.js Development',
        'hero.svc3': 'DevOps & Azure Cloud Engineering',
        'hero.svc4': 'SEO & Digital Growth',
        'hero.primary': 'Start a Project',
        'hero.secondary': 'View Our Work',
        'hero.explore': 'Explore',
        'cta.mid.title': 'Ready to start your project?',
        'cta.mid.text': 'Get a free consultation and a clear estimate within 24 hours - no commitment needed.',
        'cta.mid.primary': 'Book a Free Call',
        'cta.mid.secondary': 'Get a Quote',
        'cta.bottom.title': "Let's build something that converts.",
        'cta.bottom.text': 'From design to deployment - one team, full ownership, measurable results.',
        'cta.bottom.primary': 'Start a Project',
        'cta.bottom.secondary': 'WhatsApp Us',
        'contact.label': 'Get In Touch',
        'contact.title': "Let's build<br>something <em>remarkable</em>",
        'contact.whatsapp': 'Message directly',
        'contact.status': 'Accepting new projects',
        'contact.response': 'Within 24 hours',
        'form.note': 'Share your scope, timeline, and goals. The message will be sent directly to our inbox.',
        'form.name': 'Your Name',
        'form.name.placeholder': 'Ola Nordmann',
        'form.email': 'Email Address',
        'form.email.placeholder': 'ola@bedrift.no',
        'form.company': 'Company',
        'form.company.placeholder': 'Your company (optional)',
        'form.service': 'Service Needed',
        'form.service.placeholder': 'Type a service and press Enter',
        'form.tag.ux': 'UX/UI Design & Figma',
        'form.tag.fullstack': 'Full-Stack Engineering',
        'form.tag.devops': 'DevOps & Cloud',
        'form.tag.seo': 'SEO & Growth',
        'form.tag.backend': 'Backend APIs',
        'form.tag.package': 'Full Package',
        'form.project': 'About Your Project',
        'form.project.placeholder': "What are you trying to achieve? What's your timeline?",
        'form.submit': 'Send Message',
        'form.remove': 'Remove',
        'form.needService': 'Please add at least one service before sending.',
        'form.sending': 'Sending your message...',
        'form.tryAgain': 'Try Again',
        'form.sendLabel': 'Send Message',
        'form.error': 'Could not send right now. Please try again in a moment.',
        'success.title': 'Message Sent!',
        'success.body': "Thanks <strong>{name}</strong>, we'll get back to you within 24 hours.",
        'success.note': 'Check your inbox - a confirmation email is on its way.'
      },
      no: {
        'utility.wa': 'Chat på WhatsApp',
        'utility.top': 'Til toppen',
        'utility.top.short': 'TOPP',
        'nav.services': 'Tjenester',
        'nav.work': 'Arbeid',
        'nav.skills': 'Kompetanse',
        'nav.blog': 'Blogg',
        'nav.contact': 'Kontakt',
        'nav.quote': 'Få Gratis Tilbud',
        'hero.kicker': 'Fullstack + DevOps',
        'hero.line1': 'Vi Designer.',
        'hero.line2': 'Vi Bygger.',
        'hero.line3': 'Vi Skalerer.',
        'hero.stat1': 'År med erfaring',
        'hero.stat2': 'Google-rangeringer',
        'hero.stat3': 'Kunder som blir',
        'hero.desc': 'Et premium <strong>React & Next.js webutviklings-</strong> og <strong>UI/UX-designbyrå</strong> i <strong>Stavanger, Norge</strong> som hjelper startups og selskaper i <strong>Europa, USA, India og APAC</strong>. Fra Figma til produksjon.',
        'hero.svc1': 'UI/UX-design og Figma-prototyper',
        'hero.svc2': 'React- og Next.js-utvikling',
        'hero.svc3': 'DevOps og Azure skyinfrastruktur',
        'hero.svc4': 'SEO og digital vekst',
        'hero.primary': 'Start et prosjekt',
        'hero.secondary': 'Se arbeidet vårt',
        'hero.explore': 'Utforsk',
        'cta.mid.title': 'Klar til å starte prosjektet ditt?',
        'cta.mid.text': 'Få gratis konsultasjon og et tydelig estimat innen 24 timer - helt uten forpliktelser.',
        'cta.mid.primary': 'Book et Gratis Møte',
        'cta.mid.secondary': 'Få et Tilbud',
        'cta.bottom.title': 'La oss bygge noe som konverterer.',
        'cta.bottom.text': 'Fra design til lansering - ett team, fullt eierskap, målbare resultater.',
        'cta.bottom.primary': 'Start et Prosjekt',
        'cta.bottom.secondary': 'Kontakt på WhatsApp',
        'contact.label': 'Ta Kontakt',
        'contact.title': 'La oss bygge<br>noe <em>enestående</em>',
        'contact.whatsapp': 'Send melding direkte',
        'contact.status': 'Tar imot nye prosjekter',
        'contact.response': 'Innen 24 timer',
        'form.note': 'Del omfang, tidslinje og mål. Meldingen sendes direkte til innboksen vår.',
        'form.name': 'Navnet ditt',
        'form.name.placeholder': 'Ola Nordmann',
        'form.email': 'E-postadresse',
        'form.email.placeholder': 'ola@bedrift.no',
        'form.company': 'Bedrift',
        'form.company.placeholder': 'Bedriften din (valgfritt)',
        'form.service': 'Ønsket Tjeneste',
        'form.service.placeholder': 'Skriv en tjeneste og trykk Enter',
        'form.tag.ux': 'UX/UI Design og Figma',
        'form.tag.fullstack': 'Fullstack Utvikling',
        'form.tag.devops': 'DevOps og Sky',
        'form.tag.seo': 'SEO og Vekst',
        'form.tag.backend': 'Backend API-er',
        'form.tag.package': 'Komplett Pakke',
        'form.project': 'Om Prosjektet Ditt',
        'form.project.placeholder': 'Hva vil du oppnå? Hva er tidslinjen?',
        'form.submit': 'Send Melding',
        'form.remove': 'Fjern',
        'form.needService': 'Legg til minst én tjeneste før du sender.',
        'form.sending': 'Sender meldingen din...',
        'form.tryAgain': 'Prøv Igjen',
        'form.sendLabel': 'Send Melding',
        'form.error': 'Kunne ikke sende nå. Prøv igjen om litt.',
        'success.title': 'Melding sendt!',
        'success.body': 'Takk <strong>{name}</strong>, vi svarer deg innen 24 timer.',
        'success.note': 'Sjekk innboksen din - en bekreftelse er på vei.'
      }
    };

    const sectionTranslations = {
      en: {
        servicesLabel: 'What We Do',
        servicesHeading: 'Full-stack delivery<br>for <em>real growth</em>',
        servicesNote: 'A full-stack and DevOps-first delivery model for teams that need speed and quality. From UX and architecture to cloud infrastructure and growth optimization, everything is handled end-to-end.',
        serviceNames: [
          'Product UX/UI & Design Systems',
          'Full-Stack Product Engineering',
          'DevOps, Cloud & Platform Reliability',
          'SEO, Analytics & Growth Execution'
        ],
        serviceChips: [
          'User Research', 'Interaction Flows', 'Figma Prototyping', 'Design Systems',
          'Next.js / React', 'Node.js APIs', 'TypeScript', 'Database Design',
          'Azure / Cloud', 'CI/CD Pipelines', 'Monitoring', 'Security Hardening',
          'Technical SEO', 'Local SEO', 'Analytics', 'Conversion Optimization'
        ],
        workLabel: 'Selected Work',
        workHeading: 'Projects that<br><em>moved the needle</em>',
        workHint: 'Drag to explore <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        workCats: ['Education · WordPress · Chennai, India', 'SaaS · RFP Platform · Norway', 'SaaS · RFP Platform · Global'],
        workDescs: [
          'Full website design and development for a leading MSME-certified software training institute in Chennai. Built for enquiry conversion and course discovery - serving 18,000+ students annually.',
          'AI-powered RFP and proposal management platform for Energy & IT sectors. Full UI/UX design and frontend - helping teams win contracts faster with built-in compliance tooling.',
          'Norwegian-localised Tenderlyst application with multilingual frontend, language switcher, demo booking flow, and full proposal management dashboard for Energy & IT sectors.'
        ],
        workCtaText: "Like what you see? Let's build something just as impactful for you.",
        workCtaBtn: 'Start a Similar Project',
        processLabel: 'How We Work',
        processHeading: 'Our process.<br><em>Your clarity.</em>',
        processNames: ['Discover & Define', 'Design & Prototype', 'Build & Test', 'Launch & Grow'],
        processDescs: [
          'We listen first. Deep understanding of your users, goals, and constraints before anything is designed or built. No assumptions.',
          'Every screen in Figma first. You interact with a real prototype and shape the product before development begins - no surprises at launch.',
          'Clean, documented code. Tested across every device. Performance-optimised from day one - built to last years, not months.',
          'We monitor, optimise, and iterate post-launch - turning your product into a compounding business asset that improves over time.'
        ],
        faqLabel: 'Common Questions',
        faqHeading: 'What clients<br><em>always ask</em>',
        faqQ: [
          'Do you work with clients outside Stavanger?',
          'What does a typical project cost?',
          'How long does a website or web app take?',
          'Can you do UI/UX design without development?',
          'What makes devndespro different from other freelancers?',
          'Are you available for freelance projects in Norway?'
        ],
        faqA: [
          'Yes. We are based in Stavanger, Norway, and work with clients across Europe, the USA, India, and APAC. Most engagements are delivered remotely with structured updates and regular video calls.',
          'Project cost depends on scope, complexity, timeline, and required integrations. After reviewing your brief, we provide a clear estimate and phased delivery plan within 24 hours.',
          'A standard business website is typically delivered in 3-5 weeks. Larger web applications with backend APIs, integrations, and DevOps setup usually take 8-16 weeks, with milestone timelines shared before kickoff.',
          'Yes. We offer standalone UI/UX services including UX discovery, Figma prototypes, design systems, and audits. You can use these deliverables with your in-house or external engineering team.',
          'I combine UI/UX design, full-stack development, DevOps, and growth support in one workflow. That means direct communication, faster decisions, and consistent execution from strategy to launch.',
          'Yes. We take freelance and long-term delivery projects for Norwegian and international clients, and we are currently accepting new work.'
        ],
        skillsPanel: 'Execution Stack',
        skillsPanelTitles: ['UX Strategy', 'UI Systems', 'Full-Stack', 'DevOps Platform', 'Backend APIs', 'Growth Ops'],
        skillsPanelSubs: [
          'Research, IA, user flows',
          'Design systems, prototyping',
          'Frontend + backend delivery',
          'CI/CD, cloud, observability',
          'Node, data modeling, integrations',
          'SEO, analytics, iteration loops'
        ],
        skillsFoot: ['Full-stack first', 'DevOps-native', 'Built to scale'],
        badgeLabel: 'Years of craft',
        skillsLabel: 'Skills',
        skillsHeading: 'Core capabilities.<br><em>Execution depth.</em>',
        skillsBody: 'I lead delivery as a <strong>full-stack and DevOps-focused builder</strong> who can take products from concept to production. <span class="brand-cal">devndes<span>pro</span></span> combines design precision with engineering depth, cloud reliability, and growth thinking in one streamlined workflow.<br><br>From UX discovery and interface systems to backend architecture, API integrations, CI/CD pipelines, and post-launch optimization, each skill area is applied end-to-end.<br><br>The percentages below reflect practical delivery confidence built over nearly two decades across enterprise and growth-stage teams.',
        skillNames: ['Full-Stack Development', 'Cloud, Azure & DevOps', 'Backend APIs & Integrations', 'UX / UI Design & Figma', 'SEO & Digital Growth'],
        insightsLabel: 'Why It Works',
        insightsHeading: 'Built for ranking.<br><em>Built for revenue.</em>',
        insightsIntro: 'The best websites are clear, fast, and useful. We focus on messaging, structure, and implementation quality so visitors understand your offer quickly and search systems can index your pages confidently.',
        insightsQ: ['Strategy Comes Before Visuals', 'Engineering Quality Supports SEO', 'Content Depth Creates Better Conversion', 'Long-Term Partnerships Need Durable Systems'],
        insightsA: [
          'We start by mapping user intent, business goals, and your ideal conversion path. This creates cleaner page structure, sharper messaging, and calls to action that feel natural instead of forced.',
          'Fast rendering, semantic headings, stable layouts, and clean metadata come from good engineering. We build SEO into delivery from day one so performance and visibility improve together.',
          'A little more context helps serious buyers decide faster. We add the right depth with service details, delivery expectations, and practical next steps that turn interest into qualified enquiries.',
          'We design for growth, not quick fixes. Scalable layouts, maintainable code, and structured content make it easier to launch campaigns, add services, and evolve your website without rebuilding from scratch.'
        ],
        blogLabel: 'Insights Blog',
        blogHeading: 'Read what<br><em>actually drives growth</em>',
        blogIntro: 'Practical notes from real delivery work on UX, frontend architecture, and conversion-first web strategy for modern brands.',
        blogMeta: ['UX/UI · Strategy', 'Performance · Frontend', 'SEO · Content'],
        blogTitles: [
          'UI, UX, and product clarity: where teams lose conversions',
          'Core Web Vitals for founders: what matters and what does not',
          'How to structure service pages that rank and convert'
        ],
        blogDescs: [
          'A field guide to reducing friction in digital journeys and turning visual polish into measurable conversion lift.',
          'A no-noise breakdown of speed, layout stability, and interaction quality that affects rankings and user trust.',
          'The structure we use for local and global service pages so search engines and buyers understand value fast.'
        ],
        blogCta: 'Read Article',
        contactTagline: '"Every project starts with a conversation. Whether you\'re local to Stavanger or building for global markets, we\'ll map the fastest path to results."',
        contactLabels: ['Email', 'Location', 'WhatsApp', 'Status', 'Response'],
        seoLinksTitle: 'Local Service Pages',
        seoLinksNote: 'Explore dedicated pages for each service area and location focus.',
        footerCopy: '© 2026 devndespro · HQ: Stavanger, Norway · Delivery Hub: Chennai, India · Serving Europe, USA & APAC'
      },
      no: {
        servicesLabel: 'Hva Vi Leverer',
        servicesHeading: 'Fullstack levering<br>for <em>reell vekst</em>',
        servicesNote: 'En fullstack- og DevOps-fokusert leveransemodell for team som trenger fart og kvalitet. Fra UX og arkitektur til skyinfrastruktur og vekstoptimalisering - alt leveres ende-til-ende.',
        serviceNames: [
          'Produkt UX/UI og designsystemer',
          'Fullstack produktutvikling',
          'DevOps, sky og plattformstabilitet',
          'SEO, analyse og vekstgjennomforing'
        ],
        serviceChips: [
          'Brukerinnsikt', 'Interaksjonsflyt', 'Figma-prototyping', 'Designsystemer',
          'Next.js / React', 'Node.js API-er', 'TypeScript', 'Databasedesign',
          'Azure / Sky', 'CI/CD-pipelines', 'Overvaking', 'Sikkerhetsherding',
          'Teknisk SEO', 'Lokal SEO', 'Analyse', 'Konverteringsoptimalisering'
        ],
        workLabel: 'Utvalgte Prosjekter',
        workHeading: 'Prosjekter som<br><em>ga tydelig effekt</em>',
        workHint: 'Dra for å utforske <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>',
        workCats: ['Utdanning · WordPress · Chennai, India', 'SaaS · RFP-plattform · Norge', 'SaaS · RFP-plattform · Globalt'],
        workDescs: [
          'Komplett nettsteddesign og utvikling for et ledende MSME-sertifisert programvareinstitutt i Chennai. Bygget for flere henvendelser og enklere kursoppdagelse - over 18 000 studenter i året.',
          'AI-drevet RFP- og tilbudsplattform for energi- og IT-sektoren. Full UI/UX-design og frontend - hjelper team å vinne kontrakter raskere med innebygd etterlevelse.',
          'Norsklokalisert Tenderlyst-applikasjon med flerspråklig frontend, språkbryter, demo-booking og komplett dashbord for tilbudshandtering i energi- og IT-sektoren.'
        ],
        workCtaText: 'Liker du det du ser? La oss bygge noe like slagkraftig for deg.',
        workCtaBtn: 'Start et lignende prosjekt',
        processLabel: 'Slik Jobber Vi',
        processHeading: 'Vår prosess.<br><em>Din tydelighet.</em>',
        processNames: ['Utforske og definere', 'Designe og prototype', 'Bygge og teste', 'Lansere og vokse'],
        processDescs: [
          'Vi lytter først. Dyp forståelse av brukere, mål og begrensninger før noe designes eller bygges. Ingen antakelser.',
          'Alle skjermbilder lages i Figma først. Du tester en realistisk prototype og former produktet før utvikling starter - ingen overraskelser ved lansering.',
          'Ren og dokumentert kode. Testet på alle enheter. Ytelsesoptimalisert fra dag én - bygget for år, ikke måneder.',
          'Vi overvaker, optimaliserer og itererer etter lansering - slik at produktet ditt blir en verdiskapende ressurs som forbedres over tid.'
        ],
        faqLabel: 'Vanlige Spørsmål',
        faqHeading: 'Dette spør<br><em>kunder alltid om</em>',
        faqQ: [
          'Jobber dere med kunder utenfor Stavanger?',
          'Hva koster et typisk prosjekt?',
          'Hvor lang tid tar et nettsted eller en webapp?',
          'Kan dere levere UI/UX uten utvikling?',
          'Hva skiller devndespro fra andre freelancere?',
          'Er dere tilgjengelige for freelanceprosjekter i Norge?'
        ],
        faqA: [
          'Ja. Vi er basert i Stavanger og jobber med kunder i hele Europa, USA, India og APAC. De fleste leveranser skjer remote med faste oppdateringer og videomoter.',
          'Prosjektpris avhenger av omfang, kompleksitet, tidslinje og integrasjoner. Etter gjennomgang av behov får du et tydelig estimat og faseplan innen 24 timer.',
          'Et standard bedriftsnettsted leveres vanligvis på 3-5 uker. Storre webapplikasjoner med backend-API-er, integrasjoner og DevOps tar normalt 8-16 uker.',
          'Ja. Vi tilbyr egne UI/UX-leveranser inkludert UX discovery, Figma-prototyper, designsystemer og revisjoner som teamet ditt kan bygge videre på.',
          'Jeg kombinerer UI/UX-design, fullstack utvikling, DevOps og vekststotte i én arbeidsflyt. Det gir raskere beslutninger og jevn kvalitet fra strategi til lansering.',
          'Ja. Vi tar både freelance- og langsiktige leveranseprosjekter for norske og internasjonale kunder, og har kapasitet for nye oppdrag.'
        ],
        skillsPanel: 'Gjennomføringsstack',
        skillsPanelTitles: ['UX-strategi', 'UI-systemer', 'Fullstack', 'DevOps-plattform', 'Backend API-er', 'Vekstdrift'],
        skillsPanelSubs: [
          'Research, IA, brukerflyt',
          'Designsystemer, prototyper',
          'Frontend + backend levering',
          'CI/CD, sky, observabilitet',
          'Node, datamodellering, integrasjoner',
          'SEO, analyse, iterasjon'
        ],
        skillsFoot: ['Fullstack først', 'DevOps-native', 'Bygget for skalering'],
        badgeLabel: 'År med erfaring',
        skillsLabel: 'Kompetanse',
        skillsHeading: 'Kjernekapasitet.<br><em>Dyp gjennomføring.</em>',
        skillsBody: 'Jeg leder leveranser som en <strong>fullstack- og DevOps-fokusert bygger</strong> som tar produkter fra idé til produksjon. <span class="brand-cal">devndes<span>pro</span></span> kombinerer designpresisjon med teknisk dybde, stabil skyplattform og vekstfokus i én effektiv arbeidsflyt.<br><br>Fra UX discovery og grensesnittsystemer til backend-arkitektur, API-integrasjoner, CI/CD-pipelines og optimalisering etter lansering - hvert kompetanseområde brukes ende-til-ende.<br><br>Prosentene under gjenspeiler praktisk leveringsstyrke bygget opp gjennom nesten to tiår i enterprise- og vekstteam.',
        skillNames: ['Fullstack utvikling', 'Sky, Azure og DevOps', 'Backend API-er og integrasjoner', 'UX / UI Design og Figma', 'SEO og digital vekst'],
        insightsLabel: 'Hvorfor Det Fungerer',
        insightsHeading: 'Bygget for rangering.<br><em>Bygget for inntekter.</em>',
        insightsIntro: 'De beste nettsidene er tydelige, raske og nyttige. Vi fokuserer på budskap, struktur og implementeringskvalitet slik at besøkende forstår tilbudet raskt og søkesystemer indekserer sidene riktig.',
        insightsQ: ['Strategi kommer før visuell stil', 'Teknisk kvalitet styrker SEO', 'Godt innhold gir bedre konvertering', 'Langsiktige samarbeid krever robuste systemer'],
        insightsA: [
          'Vi starter med brukerintensjon, forretningsmål og ønsket konverteringsvei. Det gir renere sidestruktur, skarpere budskap og CTA-er som føles naturlige.',
          'Rask rendering, semantiske overskrifter, stabile layouter og ren metadata kommer fra god engineering. Vi bygger SEO inn fra dag én.',
          'Litt mer kontekst gjør det enklere for seriøse kjøpere å ta beslutning. Vi legger inn riktig dybde med tjenestedetaljer og tydelige neste steg.',
          'Vi designer for vekst, ikke raske fiks. Skalerbar layout, vedlikeholdbar kode og strukturert innhold gjør videre vekst enklere.'
        ],
        blogLabel: 'Innsiktsblogg',
        blogHeading: 'Les hva som<br><em>faktisk skaper vekst</em>',
        blogIntro: 'Praktiske notater fra ekte leveranser om UX, frontend-arkitektur og konverteringsfokusert webstrategi.',
        blogMeta: ['UX/UI · Strategi', 'Ytelse · Frontend', 'SEO · Innhold'],
        blogTitles: [
          'UI, UX og produktklarhet: hvor team mister konverteringer',
          'Core Web Vitals for ledere: hva som betyr noe i praksis',
          'Hvordan strukturere tjenestesider som rangerer og konverterer'
        ],
        blogDescs: [
          'En praktisk guide til å redusere friksjon i brukerreisen og gjøre design til målbar konverteringsvekst.',
          'En tydelig gjennomgang av hastighet, layout-stabilitet og interaksjonskvalitet som påvirker rangering og tillit.',
          'Strukturen vi bruker for lokale og globale tjenestesider slik at både søkemotorer og kjøpere forstår verdien raskt.'
        ],
        blogCta: 'Les artikkel',
        contactTagline: '"Alle prosjekter starter med en samtale. Enten du er lokal i Stavanger eller bygger for globale markeder, finner vi raskeste vei til resultater."',
        contactLabels: ['E-post', 'Lokasjon', 'WhatsApp', 'Status', 'Respons'],
        seoLinksTitle: 'Lokale tjenestesider',
        seoLinksNote: 'Utforsk dedikerte sider for hvert tjenesteområde og lokasjonsfokus.',
        footerCopy: '© 2026 devndespro · Hovedkontor: Stavanger, Norge · Leveransehub: Chennai, India · Betjener Europa, USA og APAC'
      }
    };

    let currentLang = 'no';
    const t = (key, fallback = '') => {
      const dict = translations[currentLang] || translations.no;
      return dict[key] || fallback || key;
    };

    const loader = document.getElementById('loader');

    function hideLoader() {
      if (!loader) return;
      loader.classList.add('hide');
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 900);
    }

    const loaderTimer = window.setTimeout(hideLoader, 2200);

    const cur = document.getElementById('cur');
    const curR = document.getElementById('cur-r');

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = 0;

    const handleMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cur) {
        cur.style.left = `${mx}px`;
        cur.style.top = `${my}px`;
      }
    };

    function animateCursorRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (curR) {
        curR.style.left = `${rx}px`;
        curR.style.top = `${ry}px`;
      }
      rafId = requestAnimationFrame(animateCursorRing);
    }

    document.addEventListener('mousemove', handleMouseMove);
    animateCursorRing();

    const hoverTargets = document.querySelectorAll('a,button,.svc-item,.wcard,.t-card,.p-step,.hss');
    const onHoverIn = () => document.body.classList.add('hov');
    const onHoverOut = () => document.body.classList.remove('hov');

    hoverTargets.forEach((el) => {
      el.addEventListener('mouseenter', onHoverIn);
      el.addEventListener('mouseleave', onHoverOut);
    });

    const waBtn = document.querySelector('.wa');
    const onWaClick = () => {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', {
          event_category: 'WhatsApp',
          event_label: 'WA Button Clicked',
          value: 1
        });
      }
    };
    if (waBtn) waBtn.addEventListener('click', onWaClick);

    const nav = document.getElementById('nav');
    const navToggle = document.querySelector('.nav-toggle');
    const sectionNavLinks = Array.from(
      document.querySelectorAll('.nav-menu a[href^="#"], .nav-cta[href^="#"], .f-nav a[href^="#"]')
    );
    const sectionMap = sectionNavLinks
      .map((link) => {
        const hash = link.getAttribute('href');
        const section = hash ? document.querySelector(hash) : null;
        return section ? { link, hash, section } : null;
      })
      .filter(Boolean);

    const setActiveLink = (hash) => {
      sectionNavLinks.forEach((link) => {
        link.classList.toggle('active', hash ? link.getAttribute('href') === hash : false);
      });
    };

    const scrollToSectionHash = (hash, behavior = 'smooth') => {
      const target = hash ? document.querySelector(hash) : null;
      if (!target) return false;

      target.querySelectorAll('.rv,.rl,.rr').forEach((el) => el.classList.add('on'));

      const anchorSelector = hash ? sectionScrollAnchors[hash] : null;
      const scrollTarget = anchorSelector ? document.querySelector(anchorSelector) || target : target;
      const navHeight = nav ? nav.offsetHeight : 90;
      const top = scrollTarget.getBoundingClientRect().top + window.scrollY - navHeight - 8;

      window.scrollTo({ top, behavior });
      setActiveLink(hash);
      return true;
    };

    const closeMobileMenu = () => {
      if (!nav) return;
      nav.classList.remove('open');
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      }
    };

    const onToggleClick = () => {
      if (!nav || !navToggle) return;
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark" aria-hidden="true"></i>'
        : '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.body.style.overflowX = 'hidden';
    };

    if (navToggle) navToggle.addEventListener('click', onToggleClick);

    const langButtons = Array.from(document.querySelectorAll('.lang-btn'));

    const applyLanguage = (lang) => {
      const activeLang = lang === 'no' ? 'no' : 'en';
      const dict = translations[activeLang] || translations.en;
      currentLang = activeLang;

      const setText = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && typeof value === 'string') el.textContent = value;
      };
      const setHtml = (selector, value) => {
        const el = document.querySelector(selector);
        if (el && typeof value === 'string') el.innerHTML = value;
      };
      const setTextList = (selector, values) => {
        if (!Array.isArray(values)) return;
        const nodes = document.querySelectorAll(selector);
        nodes.forEach((node, index) => {
          if (values[index] !== undefined) node.textContent = values[index];
        });
      };

      const section = sectionTranslations[activeLang] || sectionTranslations.no;

      setText('#services .s-label', section.servicesLabel);
      setHtml('#services .s-h', section.servicesHeading);
      setText('#services .svc-note', section.servicesNote);
      setTextList('#services .svc-name', section.serviceNames);
      setTextList('#services .svc-chip', section.serviceChips);
      setText('#work .s-label', section.workLabel);
      setHtml('#work .s-h', section.workHeading);
      setHtml('#work .work-scroll-hint', section.workHint);
      setTextList('#work .wcard-cat', section.workCats);
      setTextList('#work .wcard-desc', section.workDescs);
      setText('#work .work-cta-text', section.workCtaText);
      setText('#work .work-cta .btn-main', section.workCtaBtn);
      setText('#process .s-label', section.processLabel);
      setHtml('#process .s-h', section.processHeading);
      setTextList('#process .p-name', section.processNames);
      setTextList('#process .p-desc', section.processDescs);
      setText('#faq .s-label', section.faqLabel);
      setHtml('#faq .s-h', section.faqHeading);
      setTextList('#faq .faq-q', section.faqQ);
      setTextList('#faq .faq-a', section.faqA);
      setText('#skills-section .sp-label', section.skillsPanel);
      setTextList('#skills-section .sp-chip span', section.skillsPanelTitles);
      setTextList('#skills-section .sp-chip small', section.skillsPanelSubs);
      setTextList('#skills-section .sp-foot span', section.skillsFoot);
      setText('#skills-section .about-badge .ab-l', section.badgeLabel);
      setText('#skills-section .about-r .s-label', section.skillsLabel);
      setHtml('#skills-section .about-r .s-h', section.skillsHeading);
      setHtml('#skills-section .about-body', section.skillsBody);
      setTextList('#skills-section .sk .sk-n', section.skillNames);
      setText('#insights .s-label', section.insightsLabel);
      setHtml('#insights .s-h', section.insightsHeading);
      setText('#insights .faq-intro', section.insightsIntro);
      setTextList('#insights .faq-q', section.insightsQ);
      setTextList('#insights .faq-a', section.insightsA);
      setText('#blog .blog-label', section.blogLabel);
      setHtml('#blog .blog-heading', section.blogHeading);
      setText('#blog .blog-intro', section.blogIntro);
      setTextList('#blog .blog-meta', section.blogMeta);
      setTextList('#blog .blog-title', section.blogTitles);
      setTextList('#blog .blog-desc', section.blogDescs);
      setTextList('#blog .blog-link-label', [section.blogCta, section.blogCta, section.blogCta]);
      setText('#contact .c-tagline', section.contactTagline);
      setTextList('#contact .c-lbl', section.contactLabels);
      setText('#seo-links .seo-links-title', section.seoLinksTitle);
      setText('#seo-links .seo-links-note', section.seoLinksNote);
      setText('footer .f-copy', section.footerCopy);

      document.documentElement.setAttribute('lang', activeLang);

      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (key && dict[key]) el.textContent = dict[key];
      });
      document.querySelectorAll('[data-i18n-html]').forEach((el) => {
        const key = el.getAttribute('data-i18n-html');
        if (key && dict[key]) el.innerHTML = dict[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (key && dict[key]) el.setAttribute('placeholder', dict[key]);
      });

      langButtons.forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.lang === activeLang);
      });
    };

    const setLanguage = (lang, updateUrl = true) => {
      const activeLang = lang === 'no' ? 'no' : 'en';
      applyLanguage(activeLang);
      try { localStorage.setItem('siteLang', activeLang); } catch { }
      if (updateUrl) {
        const url = new URL(window.location.href);
        if (activeLang === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', 'no');
        window.history.replaceState({}, '', url.toString());
      }
    };

    const onLangClick = (e) => { setLanguage(e.currentTarget.dataset.lang, true); };
    langButtons.forEach((btn) => btn.addEventListener('click', onLangClick));

    const urlLang = new URLSearchParams(window.location.search).get('lang');
    let preferredLang = 'no';
    if (urlLang === 'no') preferredLang = 'no';
    else if (urlLang === 'en') preferredLang = 'en';
    else {
      try {
        const storedLang = localStorage.getItem('siteLang');
        if (storedLang === 'no' || storedLang === 'en') preferredLang = storedLang;
      } catch { }
    }
    setLanguage(preferredLang, false);

    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 767) { e.preventDefault(); dropdown.classList.toggle('open'); }
        });
      }
    });

    const sectionScrollAnchors = {
      '#services': '#services .svc-top',
      '#work': '#work .work-head',
      '#process': '#process > .rv',
      '#skills-section': '#skills-section .about-r',
      '#blog': '#blog .rv',
      '#contact': '#contact .c-l'
    };

    const syncActiveLinkByScroll = () => {
      if (!sectionMap.length) return;
      const firstSectionTop = sectionMap[0].section.offsetTop - 180;
      if (window.scrollY < firstSectionTop) { setActiveLink(null); return; }
      const marker = window.scrollY + 180;
      let currentHash = sectionMap[0].hash;
      sectionMap.forEach(({ hash, section }) => { if (section.offsetTop <= marker) currentHash = hash; });
      setActiveLink(currentHash);
    };

    const onNavLinkClick = (e) => {
      const hash = e.currentTarget.getAttribute('href');
      const target = hash ? document.querySelector(hash) : null;
      if (!target) return;
      e.preventDefault();
      scrollToSectionHash(hash, 'smooth');
      closeMobileMenu();
    };

    sectionNavLinks.forEach((link) => link.addEventListener('click', onNavLinkClick));

    const onScroll = () => {
      if (nav) nav.classList.toggle('s', window.scrollY > 70);
      document.body.classList.toggle('at-top', window.scrollY < 80);
      syncActiveLinkByScroll();
    };
    window.addEventListener('scroll', onScroll);
    onScroll();

    const initialHash = window.location.hash;
    const tryScrollToInitialHash = () => { if (!initialHash) return; scrollToSectionHash(initialHash, 'auto'); };
    const initialHashTimer = window.setTimeout(tryScrollToInitialHash, 60);
    const postLoaderHashTimer = window.setTimeout(tryScrollToInitialHash, 2350);

    const onHashChange = () => { scrollToSectionHash(window.location.hash, 'auto'); };
    window.addEventListener('hashchange', onHashChange);

    const onResize = () => { if (window.innerWidth > 767) closeMobileMenu(); };
    window.addEventListener('resize', onResize);

    const hs = document.getElementById('hscroll');
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => { if (!hs) return; isDown = true; hs.classList.add('active'); startX = e.pageX - hs.offsetLeft; scrollLeft = hs.scrollLeft; };
    const onMouseLeave = () => { isDown = false; };
    const onMouseUp = () => { isDown = false; };
    const onMouseMove = (e) => { if (!hs || !isDown) return; e.preventDefault(); const x = e.pageX - hs.offsetLeft; const walk = (x - startX) * 1.5; hs.scrollLeft = scrollLeft - walk; };

    if (hs) {
      hs.addEventListener('mousedown', onMouseDown);
      hs.addEventListener('mouseleave', onMouseLeave);
      hs.addEventListener('mouseup', onMouseUp);
      hs.addEventListener('mousemove', onMouseMove);
    }

    const revealObserver = new IntersectionObserver(
      (entries) => { entries.forEach((entry, i) => { if (entry.isIntersecting) setTimeout(() => entry.target.classList.add('on'), i * 75); }); },
      { threshold: 0.08 }
    );
    document.querySelectorAll('.rv,.rl,.rr').forEach((el) => revealObserver.observe(el));

    const skillsObserver = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.querySelectorAll('.sk-fill').forEach((bar) => { bar.style.width = `${bar.dataset.w}%`; }); }); },
      { threshold: 0.3 }
    );
    const skillsEl = document.querySelector('.skills');
    if (skillsEl) skillsObserver.observe(skillsEl);

    const contactForm = document.querySelector('.c-form');
    const submitBtn = document.getElementById('fsb');
    const formStatus = document.getElementById('form-status');
    const serviceInput = document.getElementById('service-input');
    const serviceEntry = document.getElementById('service-entry');
    const serviceSelected = document.getElementById('service-selected');
    const serviceSuggestButtons = Array.from(document.querySelectorAll('.service-suggest'));
    const selectedServices = new Set();

    const reqFieldSelectors = ['input[name="name"]', 'input[name="email"]', 'textarea[name="message"]'];
    reqFieldSelectors.forEach((selector) => {
      const input = document.querySelector(selector);
      if (!input) return;
      const star = input.closest('.f-f')?.querySelector('.f-req');
      if (!star) return;
      const check = () => star.classList.toggle('hidden', input.value.trim() !== '');
      input.addEventListener('input', check);
      input.addEventListener('change', check);
      input.addEventListener('blur', check);
      [200, 500, 1000, 1500, 2000, 3000].forEach((d) => setTimeout(check, d));
    });

    const reqServiceStar = document.getElementById('req-service');
    if (serviceInput && reqServiceStar) {
      const checkSvc = () => reqServiceStar.classList.toggle('hidden', serviceInput.value.trim() !== '');
      new MutationObserver(checkSvc).observe(serviceInput, { attributes: true, attributeFilter: ['value'] });
      serviceInput.addEventListener('input', checkSvc);
    }

    const syncServiceInput = () => { if (serviceInput) serviceInput.value = Array.from(selectedServices).join(', '); };

    const renderSelectedServices = () => {
      if (!serviceSelected) return;
      serviceSelected.innerHTML = '';
      selectedServices.forEach((service) => {
        const pill = document.createElement('span');
        pill.className = 'service-pill';
        const label = document.createElement('span');
        label.className = 'service-pill-label';
        label.textContent = service;
        const removeBtn = document.createElement('button');
        removeBtn.type = 'button';
        removeBtn.className = 'service-pill-remove';
        removeBtn.setAttribute('aria-label', `${t('form.remove', 'Remove')} ${service}`);
        removeBtn.dataset.value = service;
        removeBtn.textContent = 'x';
        pill.appendChild(label);
        pill.appendChild(removeBtn);
        serviceSelected.appendChild(pill);
      });
    };

    const addService = (rawValue) => {
      const value = String(rawValue || '').trim();
      if (!value || selectedServices.has(value)) return;
      selectedServices.add(value);
      syncServiceInput();
      renderSelectedServices();
      if (formStatus && formStatus.textContent.trim()) formStatus.textContent = '';
    };

    const removeService = (value) => {
      if (!selectedServices.has(value)) return;
      selectedServices.delete(value);
      syncServiceInput();
      renderSelectedServices();
    };

    const onServiceSuggestClick = (e) => { addService(e.currentTarget.dataset.value); };
    const onServiceEntryKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addService(serviceEntry?.value); if (serviceEntry) serviceEntry.value = ''; }
      if (e.key === 'Backspace' && serviceEntry && serviceEntry.value === '' && selectedServices.size > 0) { const last = Array.from(selectedServices).pop(); if (last) removeService(last); }
    };
    const onServiceSelectedClick = (e) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;
      if (!target.classList.contains('service-pill-remove')) return;
      removeService(target.dataset.value || '');
    };

    serviceSuggestButtons.forEach((tag) => tag.addEventListener('click', onServiceSuggestClick));
    if (serviceEntry) serviceEntry.addEventListener('keydown', onServiceEntryKeydown);
    if (serviceSelected) serviceSelected.addEventListener('click', onServiceSelectedClick);

    const onFormSubmit = async (e) => {
      e.preventDefault();
      if (!contactForm || !submitBtn) return;
      const formData = new FormData(contactForm);
      const payload = Object.fromEntries(formData.entries());
      if (payload.website) return;
      if (!payload.service) {
        if (formStatus) formStatus.textContent = t('form.needService', 'Please add at least one service before sending.');
        return;
      }
      submitBtn.disabled = true;
      submitBtn.innerHTML = `${t('form.sending', 'Sending')} <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>`;
      if (formStatus) formStatus.textContent = t('form.sending', 'Sending your message...');
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok) {
          let errorMessage = '';
          try { const errorData = await response.json(); errorMessage = errorData?.error || ''; } catch { }
          if (!errorMessage && response.status === 404 && contactForm.action === '/api/contact') errorMessage = 'Contact API is not available in local dev.';
          if (!errorMessage) errorMessage = `Request failed (${response.status}).`;
          throw new Error(errorMessage);
        }
        const firstName = payload.name.split(' ')[0];
        contactForm.style.display = 'none';
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'text-align:center;padding:3rem 2rem;color:#fff;';
        const successBody = t('success.body', "Thanks <strong>{name}</strong>, we'll get back to you within 24 hours.").replace('{name}', firstName);
        successMsg.innerHTML = `<i class="fa-solid fa-circle-check" style="font-size:3.5rem;color:#3DD68C;margin-bottom:1.2rem;display:block;"></i><h3 style="font-size:1.8rem;margin-bottom:0.8rem;font-family:inherit;">${t('success.title', 'Message Sent!')}</h3><p style="opacity:0.7;margin-bottom:1.5rem;">${successBody}</p><p style="opacity:0.5;font-size:0.85rem;">${t('success.note', 'Check your inbox - a confirmation email is on its way.')}</p>`;
        contactForm.parentNode.appendChild(successMsg);
        selectedServices.clear();
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { event_category: 'Contact Form', event_label: 'Enquiry Submitted', value: 1 });
        syncServiceInput();
        renderSelectedServices();
      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `${t('form.tryAgain', 'Try Again')} <i class="fa-solid fa-rotate-right" aria-hidden="true"></i>`;
        if (formStatus) formStatus.textContent = error?.message || t('form.error', 'Could not send right now. Please try again in a moment.');
        setTimeout(() => {
          submitBtn.innerHTML = `${t('form.sendLabel', 'Send Message')} <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>`;
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
        }, 1800);
      }
    };

    const designRushWidgets = document.querySelectorAll('div[data-designrush-widget]');
    designRushWidgets.forEach(async (widgetEl) => {
      const agencyId = widgetEl.getAttribute('data-agency-id');
      const style = widgetEl.getAttribute('data-style') || 'dark';
      const loaded = widgetEl.getAttribute('data-loaded');
      if (!agencyId || loaded) return;
      try {
        const url = new URL('https://www.designrush.com/api/widgets/agency-reviews');
        url.searchParams.set('agency_id', agencyId);
        url.searchParams.set('style', style);
        const response = await fetch(url.toString());
        if (response.ok) { widgetEl.innerHTML = await response.text(); widgetEl.setAttribute('data-loaded', '1'); }
      } catch { }
    });

    if (contactForm) contactForm.addEventListener('submit', onFormSubmit);

    // ── FREE AUDIT MODAL ──────────────────────────────────────────────
    const auditOverlay   = document.getElementById('audit-modal');
    const auditOpenBtn   = document.getElementById('free-audit-btn');
    const auditCloseBtn  = document.getElementById('audit-modal-close');
    const auditDoneBtn   = document.getElementById('audit-done-close');
    const auditSubmitBtn = document.getElementById('audit-submit');
    const auditStepForm  = document.getElementById('audit-step-form');
    const auditStepLoad  = document.getElementById('audit-step-loading');
    const auditStepDone  = document.getElementById('audit-step-done');
    const auditError     = document.getElementById('audit-error');
    const auditProgress  = document.getElementById('audit-progress-bar');
    const auditScore     = document.getElementById('audit-score-preview');

    const PAGE_LOAD_TIME = Date.now();
    let auditScrollTriggered = false;
    let auditTriggerTimeout  = null;

    const openAuditModal = () => {
      if (!auditOverlay || auditOverlay.dataset.dismissed === 'true') return;
      auditOverlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const nameEl = document.getElementById('audit-name');
      if (nameEl) setTimeout(() => nameEl.focus(), 100);
    };

    const resetAuditSteps = () => {
      if (auditStepForm) auditStepForm.hidden = false;
      if (auditStepLoad) auditStepLoad.hidden = true;
      if (auditStepDone) auditStepDone.hidden = true;
      if (auditError)    auditError.hidden     = true;
      if (auditProgress) auditProgress.style.width = '0%';
    };

    const clearAuditFields = () => {
      ['audit-name', 'audit-email', 'audit-url'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    };

    const closeAuditModal = () => {
      if (!auditOverlay) return;
      auditOverlay.dataset.dismissed = 'true';
      auditOverlay.style.display = 'none';
      document.body.style.overflow = '';
      document.body.style.overflowX = 'hidden';
      resetAuditSteps();
      clearAuditFields();
    };

    const handleAuditScroll = () => {
      if (auditScrollTriggered) return;
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (pageHeight <= 0) return;
      const scrollPercent = window.scrollY / pageHeight;
      const timeOnPage    = Date.now() - PAGE_LOAD_TIME;
      if (scrollPercent > 0.15 && timeOnPage > 2000) {
        auditScrollTriggered = true;
        window.removeEventListener('scroll', handleAuditScroll);
        auditTriggerTimeout = setTimeout(openAuditModal, 700);
      }
    };

    if (auditOpenBtn) {
      auditOpenBtn.addEventListener('click', () => {
        if (auditOverlay) auditOverlay.dataset.dismissed = 'false';
        clearTimeout(auditTriggerTimeout);
        resetAuditSteps();
        openAuditModal();
      });
    }

    window.addEventListener('scroll', handleAuditScroll, { passive: true });

    if (auditCloseBtn) auditCloseBtn.addEventListener('click', closeAuditModal);
    if (auditDoneBtn)  auditDoneBtn.addEventListener('click', closeAuditModal);

    if (auditOverlay) {
      auditOverlay.addEventListener('click', (e) => { if (e.target === auditOverlay) closeAuditModal(); });
    }

    const onAuditEscape = (e) => {
      if (e.key === 'Escape' && auditOverlay && auditOverlay.style.display !== 'none') closeAuditModal();
    };
    document.addEventListener('keydown', onAuditEscape);

    const onAuditSubmit = async () => {
      if (!auditOverlay) return;
      const name     = (document.getElementById('audit-name')?.value || '').trim();
      const email    = (document.getElementById('audit-email')?.value || '').trim();
      const url      = (document.getElementById('audit-url')?.value || '').trim();
      const honeypot = document.getElementById('audit-honeypot')?.value || '';

      if (auditError) auditError.hidden = true;

      if (!name || !email || !url) {
        if (auditError) { auditError.textContent = 'Please fill in all fields.'; auditError.hidden = false; }
        return;
      }
      const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!EMAIL_RE.test(email)) {
        if (auditError) { auditError.textContent = 'Please enter a valid email address.'; auditError.hidden = false; }
        return;
      }

      const urlToSend = /^https?:\/\//i.test(url) ? url : 'https://' + url;
      if (auditStepForm) auditStepForm.hidden = true;
      if (auditStepLoad) auditStepLoad.hidden = false;

      let pct = 0;
      const interval = setInterval(() => {
        pct = Math.min(pct + Math.random() * 8, 88);
        if (auditProgress) auditProgress.style.width = pct + '%';
      }, 400);

      try {
        const res = await fetch('https://devndespro-production.up.railway.app/api/free-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, url: urlToSend, honeypot }),
        });
        clearInterval(interval);
        if (auditProgress) auditProgress.style.width = '100%';
        const data = await res.json();
        if (!res.ok || !data.ok) {
          if (auditStepLoad) auditStepLoad.hidden = true;
          if (auditStepForm) auditStepForm.hidden = false;
          if (auditError) { auditError.textContent = data.error || 'Something went wrong. Please try again.'; auditError.hidden = false; }
          return;
        }
        const score    = data.score    || 0;
        const critical = data.critical || 0;
        const warnings = data.warnings || 0;
        const color    = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';
        if (auditScore) {
          auditScore.innerHTML =
            '<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin:16px 0;">' +
              '<div style="text-align:center;"><div style="font-size:2.5rem;font-weight:800;color:' + color + ';">' + score + '</div><div style="font-size:12px;color:#9CA3AF;margin-top:4px;">Health Score</div></div>' +
              '<div style="text-align:center;"><div style="font-size:2.5rem;font-weight:800;color:#DC2626;">' + critical + '</div><div style="font-size:12px;color:#9CA3AF;margin-top:4px;">Critical</div></div>' +
              '<div style="text-align:center;"><div style="font-size:2.5rem;font-weight:800;color:#D97706;">' + warnings + '</div><div style="font-size:12px;color:#9CA3AF;margin-top:4px;">Warnings</div></div>' +
            '</div>';
        }
        if (auditStepLoad) auditStepLoad.hidden = true;
        if (auditStepDone) auditStepDone.hidden = false;
      } catch {
        clearInterval(interval);
        if (auditStepLoad) auditStepLoad.hidden = true;
        if (auditStepForm) auditStepForm.hidden = false;
        if (auditError) { auditError.textContent = 'Network error. Please try again.'; auditError.hidden = false; }
      }
    };

    if (auditSubmitBtn) auditSubmitBtn.addEventListener('click', onAuditSubmit);
    // ── END FREE AUDIT MODAL ──────────────────────────────────────────

    return () => {
      clearTimeout(initialHashTimer);
      clearTimeout(postLoaderHashTimer);
      clearTimeout(loaderTimer);
      clearTimeout(auditTriggerTimeout);
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', onAuditEscape);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', handleAuditScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('hashchange', onHashChange);
      if (navToggle) navToggle.removeEventListener('click', onToggleClick);
      langButtons.forEach((btn) => btn.removeEventListener('click', onLangClick));
      sectionNavLinks.forEach((link) => link.removeEventListener('click', onNavLinkClick));
      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });
      if (waBtn) waBtn.removeEventListener('click', onWaClick);
      if (hs) {
        hs.removeEventListener('mousedown', onMouseDown);
        hs.removeEventListener('mouseleave', onMouseLeave);
        hs.removeEventListener('mouseup', onMouseUp);
        hs.removeEventListener('mousemove', onMouseMove);
      }
      if (auditOpenBtn) auditOpenBtn.removeEventListener('click', openAuditModal);
      if (auditCloseBtn) auditCloseBtn.removeEventListener('click', closeAuditModal);
      if (auditDoneBtn) auditDoneBtn.removeEventListener('click', closeAuditModal);
      if (auditSubmitBtn) auditSubmitBtn.removeEventListener('click', onAuditSubmit);
      revealObserver.disconnect();
      skillsObserver.disconnect();
      if (contactForm) contactForm.removeEventListener('submit', onFormSubmit);
      serviceSuggestButtons.forEach((tag) => tag.removeEventListener('click', onServiceSuggestClick));
      if (serviceEntry) serviceEntry.removeEventListener('keydown', onServiceEntryKeydown);
      if (serviceSelected) serviceSelected.removeEventListener('click', onServiceSelectedClick);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: template }} />;
}

export default App;