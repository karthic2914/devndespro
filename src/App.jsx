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
        'form.submit': 'Send Message'
      },
      no: {
        'utility.wa': 'Chat på WhatsApp',
        'utility.top': 'Til toppen',
        'utility.top.short': 'TOPP',
        'nav.services': 'Tjenester',
        'nav.work': 'Arbeid',
        'nav.skills': 'Kompetanse',
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
        'form.submit': 'Send Melding'
      }
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
    // ── WA button click tracking ──
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
      // Lock/unlock body scroll when menu opens/closes
      document.body.style.overflow = isOpen ? 'hidden' : '';
      document.body.style.overflowX = 'hidden';
    };

    if (navToggle) navToggle.addEventListener('click', onToggleClick);

    const langButtons = Array.from(document.querySelectorAll('.lang-btn'));

    const applyLanguage = (lang) => {
      const activeLang = lang === 'no' ? 'no' : 'en';
      const dict = translations[activeLang] || translations.en;

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

      try {
        localStorage.setItem('siteLang', activeLang);
      } catch {
        // Ignore storage restrictions.
      }

      if (updateUrl) {
        const url = new URL(window.location.href);
        if (activeLang === 'en') url.searchParams.delete('lang');
        else url.searchParams.set('lang', 'no');
        window.history.replaceState({}, '', url.toString());
      }
    };

    const onLangClick = (e) => {
      const lang = e.currentTarget.dataset.lang;
      setLanguage(lang, true);
    };

    langButtons.forEach((btn) => btn.addEventListener('click', onLangClick));

    const urlLang = new URLSearchParams(window.location.search).get('lang');
    let preferredLang = 'no';
    if (urlLang === 'no') {
      preferredLang = 'no';
    } else if (urlLang === 'en') {
      preferredLang = 'en';
    } else {
      try {
        const storedLang = localStorage.getItem('siteLang');
        if (storedLang === 'no' || storedLang === 'en') preferredLang = storedLang;
      } catch {
        // Keep Norwegian as default when storage is unavailable.
      }
    }
    setLanguage(preferredLang, false);

    // Mobile dropdown toggle
    const navDropdowns = document.querySelectorAll('.nav-dropdown');
    navDropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 767) {
            e.preventDefault();
            dropdown.classList.toggle('open');
          }
        });
      }
    });

    const sectionScrollAnchors = {
      '#services': '#services .svc-top',
      '#work': '#work .work-head',
      '#process': '#process > .rv',
      '#skills-section': '#skills-section .about-r',
      '#contact': '#contact .c-l'
    };

    const syncActiveLinkByScroll = () => {
      if (!sectionMap.length) return;

      const firstSectionTop = sectionMap[0].section.offsetTop - 180;
      if (window.scrollY < firstSectionTop) {
        setActiveLink(null);
        return;
      }

      const marker = window.scrollY + 180;
      let currentHash = sectionMap[0].hash;

      sectionMap.forEach(({ hash, section }) => {
        if (section.offsetTop <= marker) currentHash = hash;
      });

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
    const tryScrollToInitialHash = () => {
      if (!initialHash) return;
      scrollToSectionHash(initialHash, 'auto');
    };

    const initialHashTimer = window.setTimeout(tryScrollToInitialHash, 60);
    const postLoaderHashTimer = window.setTimeout(tryScrollToInitialHash, 2350);

    const onHashChange = () => {
      scrollToSectionHash(window.location.hash, 'auto');
    };
    window.addEventListener('hashchange', onHashChange);

    const onResize = () => {
      if (window.innerWidth > 767) closeMobileMenu();
    };
    window.addEventListener('resize', onResize);

    const hs = document.getElementById('hscroll');
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onMouseDown = (e) => {
      if (!hs) return;
      isDown = true;
      hs.classList.add('active');
      startX = e.pageX - hs.offsetLeft;
      scrollLeft = hs.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
    };

    const onMouseUp = () => {
      isDown = false;
    };

    const onMouseMove = (e) => {
      if (!hs || !isDown) return;
      e.preventDefault();
      const x = e.pageX - hs.offsetLeft;
      const walk = (x - startX) * 1.5;
      hs.scrollLeft = scrollLeft - walk;
    };

    if (hs) {
      hs.addEventListener('mousedown', onMouseDown);
      hs.addEventListener('mouseleave', onMouseLeave);
      hs.addEventListener('mouseup', onMouseUp);
      hs.addEventListener('mousemove', onMouseMove);
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('on'), i * 75);
          }
        });
      },
      { threshold: 0.08 }
    );

    document.querySelectorAll('.rv,.rl,.rr').forEach((el) => revealObserver.observe(el));

    const skillsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.sk-fill').forEach((bar) => {
              bar.style.width = `${bar.dataset.w}%`;
            });
          }
        });
      },
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

    // ── Required field asterisk watchers ──────────────────────────────
    const reqFieldSelectors = [
      'input[name="name"]',
      'input[name="email"]',
      'textarea[name="message"]',
    ];

    reqFieldSelectors.forEach((selector) => {
      const input = document.querySelector(selector);
      if (!input) return;
      const star = input.closest('.f-f')?.querySelector('.f-req');
      if (!star) return;

      const check = () => star.classList.toggle('hidden', input.value.trim() !== '');

      input.addEventListener('input', check);
      input.addEventListener('change', check);
      input.addEventListener('blur', check);

      // Poll to catch silent browser autofill
      [200, 500, 1000, 1500, 2000, 3000].forEach((d) => setTimeout(check, d));
    });

    // Service asterisk — watch hidden input via MutationObserver
    const reqServiceStar = document.getElementById('req-service');
    if (serviceInput && reqServiceStar) {
      const checkSvc = () =>
        reqServiceStar.classList.toggle('hidden', serviceInput.value.trim() !== '');
      new MutationObserver(checkSvc).observe(serviceInput, {
        attributes: true,
        attributeFilter: ['value'],
      });
      serviceInput.addEventListener('input', checkSvc);
    }
    // ─────────────────────────────────────────────────────────────────

    const syncServiceInput = () => {
      if (serviceInput) serviceInput.value = Array.from(selectedServices).join(', ');
    };

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
        removeBtn.setAttribute('aria-label', `Remove ${service}`);
        removeBtn.dataset.value = service;
        removeBtn.textContent = 'x';

        pill.appendChild(label);
        pill.appendChild(removeBtn);
        serviceSelected.appendChild(pill);
      });
    };

    const addService = (rawValue) => {
      const value = String(rawValue || '').trim();
      if (!value) return;
      if (selectedServices.has(value)) return;

      selectedServices.add(value);
      syncServiceInput();
      renderSelectedServices();

      if (formStatus && formStatus.textContent === 'Please add at least one service before sending.') {
        formStatus.textContent = '';
      }
    };

    const removeService = (value) => {
      if (!selectedServices.has(value)) return;
      selectedServices.delete(value);
      syncServiceInput();
      renderSelectedServices();
    };

    const onServiceSuggestClick = (e) => {
      addService(e.currentTarget.dataset.value);
    };

    const onServiceEntryKeydown = (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addService(serviceEntry?.value);
        if (serviceEntry) serviceEntry.value = '';
      }

      if (e.key === 'Backspace' && serviceEntry && serviceEntry.value === '' && selectedServices.size > 0) {
        const last = Array.from(selectedServices).pop();
        if (last) removeService(last);
      }
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
        if (formStatus) formStatus.textContent = 'Please add at least one service before sending.';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>';
      if (formStatus) formStatus.textContent = 'Sending your message...';

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          let errorMessage = '';
          try {
            const errorData = await response.json();
            errorMessage = errorData?.error || '';
          } catch {
            // ignore
          }

          if (!errorMessage && response.status === 404 && contactForm.action === '/api/contact') {
            errorMessage = 'Contact API is not available in local dev. Use deployed site or run with serverless support.';
          }

          if (!errorMessage) {
            errorMessage = `Request failed (${response.status}).`;
          }

          throw new Error(errorMessage);
        }

        // Use first name only
        const firstName = payload.name.split(' ')[0];

        // Hide form and show success message
        contactForm.style.display = 'none';
        const successMsg = document.createElement('div');
        successMsg.style.cssText = `
          text-align: center;
          padding: 3rem 2rem;
          color: #fff;
        `;
        successMsg.innerHTML = `
          <i class="fa-solid fa-circle-check" style="font-size:3.5rem;color:#3DD68C;margin-bottom:1.2rem;display:block;"></i>
          <h3 style="font-size:1.8rem;margin-bottom:0.8rem;font-family:inherit;">Message Sent!</h3>
          <p style="opacity:0.7;margin-bottom:1.5rem;">Thanks <strong>${firstName}</strong>, we'll get back to you within 24 hours.</p>
          <p style="opacity:0.5;font-size:0.85rem;">Check your inbox — a confirmation email is on its way.</p>
        `;
        contactForm.parentNode.appendChild(successMsg);

        selectedServices.clear();
        // GA4 lead tracking
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', {
            event_category: 'Contact Form',
            event_label: 'Enquiry Submitted',
            value: 1
          });
        }
        syncServiceInput();
        renderSelectedServices();

      } catch (error) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Try Again <i class="fa-solid fa-rotate-right" aria-hidden="true"></i>';
        if (formStatus) {
          formStatus.textContent =
            error?.message || 'Could not send right now. Please try again in a moment.';
        }
        setTimeout(() => {
          submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
          submitBtn.style.background = '';
          submitBtn.style.borderColor = '';
          submitBtn.style.color = '';
        }, 1800);
      }
    };

    if (contactForm) contactForm.addEventListener('submit', onFormSubmit);

    return () => {
      clearTimeout(initialHashTimer);
      clearTimeout(postLoaderHashTimer);
      clearTimeout(loaderTimer);
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', onScroll);
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