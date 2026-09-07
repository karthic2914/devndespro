export const privacyMeta = {
  effective: '7 September 2026',
  updated: '7 September 2026',
  controller: 'Devndespro',
  legal: 'DEVNDESPRO BY NATARAJAN',
  typeEn: 'Sole proprietorship (ENK)',
  typeNo: 'Enkeltpersonforetak (ENK)',
  org: '935 275 261',
  placeEn: 'Stavanger, Norway',
  placeNo: 'Stavanger, Norge',
  email: 'hello@devndespro.com'
};

export const privacy = {
  en: {
    eyebrow: 'Legal',
    title: 'Privacy Policy',
    titleEm: 'Policy',
    intro: 'This policy explains how Devndespro collects, uses, stores, and protects personal data when you use our websites, SEO.devndespro, and the SEO.devndespro Android app.',
    summary: [
      ['Effective date', privacyMeta.effective],
      ['Last updated', privacyMeta.updated],
      ['Data controller', privacyMeta.controller],
      ['Registered legal entity', privacyMeta.legal],
      ['Organisation type', privacyMeta.typeEn],
      ['Organisation number', privacyMeta.org],
      ['Location', privacyMeta.placeEn]
    ],
    contactLabel: 'Privacy contact',
    sections: [
      {
        id: 'scope',
        title: '1. Scope',
        paragraphs: ['This policy applies to:'],
        list: [
          'devndespro.com and related marketing pages',
          'seo.devndespro.com',
          'The SEO.devndespro Android application',
          'Related support, billing, and product communications'
        ],
        after: 'Tenderlyst is a separate product at tenderlyst.com and is covered by its own notices where published. Client project work is handled under the relevant contract.'
      },
      {
        id: 'collect',
        title: '2. Personal data we collect',
        subsections: [
          {
            title: 'Website and contact',
            text: 'If you use the contact form or email us, we process your name, email address, company name, project details, and the topic you select. Messages are sent to our contact API so we can reply.'
          },
          {
            title: 'Account and product use',
            text: 'For SEO.devndespro we may process your name, email, account identifier, company information, project settings, and information you provide in the product or app.'
          },
          {
            title: 'Google account and Search Console',
            text: 'If you choose Google Sign-In or connect Google Search Console, we may receive basic Google profile information, your email, OAuth identifiers, and authorised Search Console data. Search Console access is read-only unless a feature clearly states otherwise.'
          },
          {
            title: 'Website and SEO-analysis information',
            text: 'We process website URLs, publicly accessible website content, technical metadata, performance results, keywords, backlinks, audit findings, reports, and related project settings supplied or generated through the service.'
          },
          {
            title: 'Usage and technical information',
            text: 'We may collect IP address, browser and device information, operating system, app version, timestamps, diagnostic logs, feature usage, and security events. On this website we also store theme and language preferences on your device.'
          },
          {
            title: 'Payment information',
            text: 'If you purchase a plan, Stripe processes payment-card information. We may receive transaction identifiers, subscription status, billing details, and payment history. Devndespro does not store complete payment-card numbers.'
          },
          {
            title: 'Communications',
            text: 'We process messages, support requests, WhatsApp or email correspondence, and feedback that you send to us.'
          }
        ]
      },
      {
        id: 'why',
        title: '3. Why we process personal data',
        paragraphs: ['We process personal data to:'],
        list: [
          'Reply to enquiries and provide requested services',
          'Create, authenticate, and administer user accounts',
          'Provide website audits, SEO analysis, reports, and recommendations',
          'Connect requested Google services',
          'Process subscriptions and payments',
          'Provide customer support and service communications',
          'Maintain security, prevent misuse, and diagnose technical problems',
          'Understand website performance and improve usability',
          'Comply with legal, accounting, and regulatory obligations'
        ]
      },
      {
        id: 'gdpr',
        title: '4. GDPR legal bases',
        paragraphs: ['Where the GDPR applies, we rely on one or more of these legal bases:'],
        list: [
          'Contract: processing needed to provide services you request, including accounts, audits, and support.',
          'Consent: optional integrations, analytics cookies, or marketing where consent is required.',
          'Legitimate interests: securing, maintaining, analysing, and improving our services, and responding to business enquiries.',
          'Legal obligation: bookkeeping and other Norwegian statutory requirements.'
        ]
      },
      {
        id: 'google',
        title: '5. Google API data',
        paragraphs: [
          'Devndespro accesses Google user data only after you provide permission. We use this data to provide the features you request, such as signing in or displaying Search Console information.',
          'Devndespro’s use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.',
          'We do not sell Google user data or use it for advertising. We do not allow humans to read Google user data except with your permission, when required for security or support, or when required by law.',
          'You can revoke Devndespro’s Google access through your Google Account connections.'
        ],
        links: [
          { href: 'https://developers.google.com/terms/api-services-user-data-policy', label: 'Google API Services User Data Policy' },
          { href: 'https://myaccount.google.com/connections', label: 'Google Account connections' }
        ]
      },
      {
        id: 'ai',
        title: '6. AI-assisted features',
        paragraphs: [
          'Some product features may use artificial-intelligence providers, including OpenAI, Anthropic, and Google Gemini, to generate analysis, summaries, or recommendations.',
          'Only information reasonably required to provide the requested feature is sent to these providers. Do not submit confidential, sensitive, or special-category personal data in website content or prompts unless strictly necessary and lawfully permitted.'
        ]
      },
      {
        id: 'sharing',
        title: '7. Service providers and data sharing',
        paragraphs: ['We may share limited data with processors acting on our behalf, including:'],
        list: [
          'Google: authentication, Search Console, PageSpeed, and Google Analytics on this website',
          'Railway: contact-form delivery for this website',
          'DataForSEO: SEO, keyword, and backlink information',
          'OpenAI, Anthropic, and Google Gemini: AI-assisted features',
          'Stripe: subscription and payment processing',
          'Vercel: website hosting',
          'Infrastructure, database, security, and communication providers'
        ],
        after: 'We may also disclose information when required by law, to protect users or our services, or as part of a business reorganisation. We do not sell personal data.'
      },
      {
        id: 'transfers',
        title: '8. International data transfers',
        paragraphs: [
          'Devndespro is established in Norway. Some providers may process data outside Norway or the European Economic Area, including in the United States and India. Where required, we use recognised safeguards such as adequacy decisions, the EU Standard Contractual Clauses, or another lawful transfer mechanism.'
        ]
      },
      {
        id: 'cookies',
        title: '9. Cookies, analytics, and local storage',
        paragraphs: [
          'This website stores theme and language preferences in your browser (localStorage). These are used only to remember your settings.',
          'We use Google Analytics (Measurement ID G-8V84P9DDYH) to understand how the marketing site is used. Analytics may process IP address, device information, and page views.',
          'The SEO product may use essential storage required for authentication, security, and preferences.',
          'You can control cookies through your browser settings. Where consent is required for non-essential analytics, we will only use those technologies after consent.'
        ]
      },
      {
        id: 'retention',
        title: '10. Data retention',
        paragraphs: ['We retain personal data only as long as needed for the purposes in this policy:'],
        list: [
          'Contact-form messages are kept as long as needed to handle the enquiry and follow-up, then deleted or archived as appropriate.',
          'Account and project information is generally retained while your account remains active.',
          'Connected-service tokens are retained until you disconnect the service, delete your account, or the token expires.',
          'Audit and report information is retained until deleted by you or as part of account deletion, subject to backup cycles.',
          'Security and diagnostic logs may be retained for a limited period needed for security and troubleshooting.',
          'Transaction and accounting records are retained as required by Norwegian law, typically up to five years after the relevant financial year.'
        ]
      },
      {
        id: 'security',
        title: '11. Security',
        paragraphs: [
          'We use reasonable technical and organisational safeguards designed to protect personal data. These may include encrypted transmission, authentication controls, access restrictions, monitoring, and secure infrastructure.',
          'No internet service can guarantee absolute security. Users are responsible for protecting their passwords and devices.'
        ]
      },
      {
        id: 'deletion',
        title: '12. Account and data deletion',
        paragraphs: [
          'To request deletion of your SEO.devndespro account and associated personal data, email hello@devndespro.com from the email address connected to your account. Use the subject Account deletion request.',
          'Please identify the account you want deleted. We may need to verify your identity before processing the request. We will delete or anonymise data associated with the account unless retention is required by law, security needs, or the establishment, exercise, or defence of legal claims.',
          'Uninstalling the Android app does not automatically delete your account. You must send a deletion request as described above.'
        ]
      },
      {
        id: 'rights',
        title: '13. Your privacy rights',
        paragraphs: [
          'Under the GDPR you may request access, correction, deletion, restriction, portability, or objection to processing of your personal data. Where processing is based on consent, you may withdraw consent at any time.',
          'Contact hello@devndespro.com to exercise these rights. You may also lodge a complaint with the Norwegian Data Protection Authority, Datatilsynet (datatilsynet.no). See also our short GDPR rights page.'
        ]
      },
      {
        id: 'children',
        title: '14. Children’s privacy',
        paragraphs: [
          'Our services are intended for businesses and professional users and are not directed to children. We do not knowingly collect personal data from children. If you believe a child has provided personal data, contact us so we can investigate and delete it where appropriate.'
        ]
      },
      {
        id: 'changes',
        title: '15. Changes to this policy',
        paragraphs: [
          'We may update this Privacy Policy when our services, providers, or legal obligations change. We will publish the revised policy on this page and update the date shown above. Where appropriate, we will provide additional notice.'
        ]
      },
      {
        id: 'contact',
        title: '16. Contact',
        paragraphs: [
          'For privacy questions, requests, or complaints, contact Devndespro, registered as DEVNDESPRO BY NATARAJAN, organisation number 935 275 261, Stavanger, Norway, at hello@devndespro.com.'
        ]
      }
    ]
  },
  no: {
    eyebrow: 'Juridisk',
    title: 'Personvernerklæring',
    titleEm: 'erklæring',
    intro: 'Denne erklæringen forklarer hvordan Devndespro samler inn, bruker, lagrer og beskytter personopplysninger når du bruker nettstedene våre, SEO.devndespro og Android-appen SEO.devndespro.',
    summary: [
      ['Ikrafttredelse', privacyMeta.effective],
      ['Sist oppdatert', privacyMeta.updated],
      ['Behandlingsansvarlig', privacyMeta.controller],
      ['Registrert foretak', privacyMeta.legal],
      ['Organisasjonsform', privacyMeta.typeNo],
      ['Organisasjonsnummer', privacyMeta.org],
      ['Sted', privacyMeta.placeNo]
    ],
    contactLabel: 'Personvernkontakt',
    sections: [
      {
        id: 'scope',
        title: '1. Omfang',
        paragraphs: ['Denne erklæringen gjelder for:'],
        list: [
          'devndespro.com og relaterte markedssider',
          'seo.devndespro.com',
          'Android-appen SEO.devndespro',
          'Tilhørende support, fakturering og produktkommunikasjon'
        ],
        after: 'Tenderlyst er et eget produkt på tenderlyst.com og dekkes av egne varsler der de er publisert. Kundeprosjekter behandles etter gjeldende avtale.'
      },
      {
        id: 'collect',
        title: '2. Personopplysninger vi samler inn',
        subsections: [
          {
            title: 'Nettsted og kontakt',
            text: 'Hvis du bruker kontaktskjemaet eller sender e-post, behandler vi navn, e-postadresse, firmanavn, prosjektopplysninger og valgt tema. Meldinger sendes til vårt kontakt-API slik at vi kan svare.'
          },
          {
            title: 'Konto og produktbruk',
            text: 'For SEO.devndespro kan vi behandle navn, e-post, kontoidentifikator, firmainformasjon, prosjektinnstillinger og opplysninger du gir i produktet eller appen.'
          },
          {
            title: 'Google-konto og Search Console',
            text: 'Hvis du velger Google-innlogging eller kobler til Google Search Console, kan vi motta grunnleggende Google-profilinformasjon, e-post, OAuth-identifikatorer og autoriserte Search Console-data. Search Console-tilgangen er skrivebeskyttet med mindre en funksjon tydelig sier noe annet.'
          },
          {
            title: 'Nettsted- og SEO-analyse',
            text: 'Vi behandler nettstedsadresser, offentlig tilgjengelig innhold, teknisk metadata, ytelsesresultater, søkeord, tilbakekoblinger, revisjonsfunn, rapporter og relaterte prosjektinnstillinger som leveres eller genereres gjennom tjenesten.'
          },
          {
            title: 'Bruks- og teknisk informasjon',
            text: 'Vi kan samle inn IP-adresse, nettleser- og enhetsinformasjon, operativsystem, appversjon, tidsstempler, diagnostikklogger, funksjonsbruk og sikkerhetshendelser. På dette nettstedet lagrer vi også tema- og språkvalg på enheten din.'
          },
          {
            title: 'Betalingsinformasjon',
            text: 'Hvis du kjøper et abonnement, behandler Stripe betalingskortinformasjon. Vi kan motta transaksjonsidentifikatorer, abonnementsstatus, fakturadetaljer og betalingshistorikk. Devndespro lagrer ikke komplette kortnumre.'
          },
          {
            title: 'Kommunikasjon',
            text: 'Vi behandler meldinger, supportforespørsler, WhatsApp- eller e-postkorrespondanse og tilbakemeldinger du sender oss.'
          }
        ]
      },
      {
        id: 'why',
        title: '3. Hvorfor vi behandler personopplysninger',
        paragraphs: ['Vi behandler personopplysninger for å:'],
        list: [
          'Svare på henvendelser og levere etterspurte tjenester',
          'Opprette, autentisere og administrere brukerkontoer',
          'Levere nettstedrevisjoner, SEO-analyse, rapporter og anbefalinger',
          'Koble til etterspurte Google-tjenester',
          'Behandle abonnement og betalinger',
          'Gi kundesupport og tjenestekommunikasjon',
          'Opprettholde sikkerhet, hindre misbruk og feilsøke',
          'Forstå nettstedets ytelse og forbedre brukervennlighet',
          'Overholde juridiske, regnskapsmessige og regulatoriske plikter'
        ]
      },
      {
        id: 'gdpr',
        title: '4. Behandlingsgrunnlag etter GDPR',
        paragraphs: ['Når GDPR gjelder, baserer vi behandlingen på ett eller flere av disse grunnlagene:'],
        list: [
          'Avtale: behandling som er nødvendig for å levere tjenester du ber om, inkludert konto, revisjoner og support.',
          'Samtykke: valgfrie integrasjoner, analyselinformer eller markedsføring der samtykke kreves.',
          'Berettiget interesse: å sikre, vedlikeholde, analysere og forbedre tjenestene, og å svare på forretningshenvendelser.',
          'Rettslig plikt: bokføring og andre norske lovkrav.'
        ]
      },
      {
        id: 'google',
        title: '5. Google API-data',
        paragraphs: [
          'Devndespro får tilgang til Google-brukerdata bare etter at du har gitt tillatelse. Vi bruker dataene til funksjonene du ber om, for eksempel innlogging eller visning av Search Console-informasjon.',
          'Devndespros bruk og overføring av informasjon mottatt fra Google APIer følger Google API Services User Data Policy, inkludert Limited Use-kravene.',
          'Vi selger ikke Google-brukerdata og bruker dem ikke til annonsering. Vi lar ikke mennesker lese Google-brukerdata unntatt med din tillatelse, når det er nødvendig for sikkerhet eller support, eller når loven krever det.',
          'Du kan trekke tilbake Devndespros Google-tilgang via Google-kontoens tilkoblinger.'
        ],
        links: [
          { href: 'https://developers.google.com/terms/api-services-user-data-policy', label: 'Google API Services User Data Policy' },
          { href: 'https://myaccount.google.com/connections', label: 'Google-kontoens tilkoblinger' }
        ]
      },
      {
        id: 'ai',
        title: '6. KI-assisterte funksjoner',
        paragraphs: [
          'Noen produktfunksjoner kan bruke kunstig-intelligens-leverandører, inkludert OpenAI, Anthropic og Google Gemini, til analyse, sammendrag eller anbefalinger.',
          'Bare informasjon som med rimelighet trengs for den aktuelle funksjonen sendes til disse leverandørene. Ikke send inn fortrolige, sensitive eller særlige kategorier av personopplysninger i nettstedsinnhold eller ledetekster med mindre det er strengt nødvendig og lovlig.'
        ]
      },
      {
        id: 'sharing',
        title: '7. Databehandlere og deling',
        paragraphs: ['Vi kan dele begrensede opplysninger med databehandlere som handler på våre vegne, inkludert:'],
        list: [
          'Google: autentisering, Search Console, PageSpeed og Google Analytics på dette nettstedet',
          'Railway: levering av kontaktskjema fra dette nettstedet',
          'DataForSEO: SEO-, søkeord- og tilbakekoblingsinformasjon',
          'OpenAI, Anthropic og Google Gemini: KI-assisterte funksjoner',
          'Stripe: abonnement og betalingsbehandling',
          'Vercel: nettstedsdrift',
          'Infrastruktur-, database-, sikkerhets- og kommunikasjonsleverandører'
        ],
        after: 'Vi kan også utlevere opplysninger når loven krever det, for å beskytte brukere eller tjenestene, eller ved virksomhetsoverdragelse. Vi selger ikke personopplysninger.'
      },
      {
        id: 'transfers',
        title: '8. Overføring til utlandet',
        paragraphs: [
          'Devndespro er etablert i Norge. Noen leverandører kan behandle data utenfor Norge eller EØS, inkludert i USA og India. Der det kreves, bruker vi anerkjente garantier som adekvansbeslutninger, EUs standardavtaler (SCC) eller en annen lovlig overføringsmekanisme.'
        ]
      },
      {
        id: 'cookies',
        title: '9. Informasjonskapsler, analyse og lokal lagring',
        paragraphs: [
          'Dette nettstedet lagrer tema- og språkvalg i nettleseren (localStorage). Dette brukes bare til å huske innstillingene dine.',
          'Vi bruker Google Analytics (målings-ID G-8V84P9DDYH) for å forstå hvordan markedssiden brukes. Analyse kan behandle IP-adresse, enhetsinformasjon og sidevisninger.',
          'SEO-produktet kan bruke nødvendig lagring for autentisering, sikkerhet og preferanser.',
          'Du kan styre informasjonskapsler i nettleseren. Der samtykke kreves for ikke-nødvendig analyse, bruker vi slike teknologier først etter samtykke.'
        ]
      },
      {
        id: 'retention',
        title: '10. Lagringstid',
        paragraphs: ['Vi lagrer personopplysninger bare så lenge det trengs for formålene i denne erklæringen:'],
        list: [
          'Kontaktskjema-meldinger oppbevares så lenge det trengs for å håndtere henvendelsen, og slettes eller arkiveres deretter.',
          'Konto- og prosjektopplysninger oppbevares vanligvis så lenge kontoen er aktiv.',
          'Tilgangsnøkler til tilkoblede tjenester oppbevares til du kobler fra tjenesten, sletter kontoen eller nøkkelen utløper.',
          'Revisjons- og rapportinformasjon oppbevares til du sletter den eller som del av kontosletting, med forbehold om sikkerhetskopier.',
          'Sikkerhets- og diagnostikklogger kan oppbevares i en begrenset periode for sikkerhet og feilsøking.',
          'Transaksjons- og regnskapsopplysninger oppbevares slik norsk lov krever, vanligvis inntil fem år etter vedkommende regnskapsår.'
        ]
      },
      {
        id: 'security',
        title: '11. Sikkerhet',
        paragraphs: [
          'Vi bruker rimelige tekniske og organisatoriske tiltak for å beskytte personopplysninger. Dette kan omfatte kryptert overføring, autentisering, tilgangsstyring, overvåking og sikker infrastruktur.',
          'Ingen internettjeneste kan garantere absolutt sikkerhet. Brukere er ansvarlige for å beskytte passord og enheter.'
        ]
      },
      {
        id: 'deletion',
        title: '12. Sletting av konto og data',
        paragraphs: [
          'For å be om sletting av SEO.devndespro-kontoen og tilhørende personopplysninger, send e-post til hello@devndespro.com fra e-postadressen knyttet til kontoen. Bruk emnet Account deletion request.',
          'Oppgi hvilken konto som skal slettes. Vi kan måtte bekrefte identiteten din. Vi sletter eller anonymiserer data knyttet til kontoen med mindre oppbevaring kreves av loven, sikkerhetshensyn eller for å fastsette, gjøre gjeldende eller forsvare et rettskrav.',
          'Å avinstallere Android-appen sletter ikke kontoen automatisk. Du må sende en sletteforespørsel som beskrevet over.'
        ]
      },
      {
        id: 'rights',
        title: '13. Dine personvernrettigheter',
        paragraphs: [
          'Etter GDPR kan du be om innsyn, retting, sletting, begrensning, dataportabilitet eller å protestere mot behandling. Der behandlingen bygger på samtykke, kan du trekke samtykket når som helst.',
          'Kontakt hello@devndespro.com for å bruke rettighetene. Du kan også klage til Datatilsynet (datatilsynet.no). Se også den korte GDPR-siden vår.'
        ]
      },
      {
        id: 'children',
        title: '14. Barns personvern',
        paragraphs: [
          'Tjenestene er ment for virksomheter og profesjonelle brukere og er ikke rettet mot barn. Vi samler ikke bevisst inn personopplysninger fra barn. Hvis du mener et barn har gitt personopplysninger, kontakt oss slik at vi kan undersøke og slette dem der det er riktig.'
        ]
      },
      {
        id: 'changes',
        title: '15. Endringer',
        paragraphs: [
          'Vi kan oppdatere denne personvernerklæringen når tjenester, leverandører eller lovkrav endres. Den oppdaterte erklæringen publiseres på denne siden med ny dato. Der det er hensiktsmessig gir vi også annen varsling.'
        ]
      },
      {
        id: 'contact',
        title: '16. Kontakt',
        paragraphs: [
          'For spørsmål, forespørsler eller klager om personvern, kontakt Devndespro, registrert som DEVNDESPRO BY NATARAJAN, organisasjonsnummer 935 275 261, Stavanger, Norge, på hello@devndespro.com.'
        ]
      }
    ]
  }
};
