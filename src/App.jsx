import { useEffect } from 'react';
import template from './template.html?raw';

function App() {
  useEffect(() => {
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

    const closeMobileMenu = () => {
      if (!nav) return;
      nav.classList.remove('open');
      if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    };

    const onToggleClick = () => {
      if (!nav || !navToggle) return;
      const isOpen = nav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    };

    if (navToggle) navToggle.addEventListener('click', onToggleClick);

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

      target.querySelectorAll('.rv,.rl,.rr').forEach((el) => el.classList.add('on'));

      const anchorSelector = hash ? sectionScrollAnchors[hash] : null;
      const scrollTarget = anchorSelector ? document.querySelector(anchorSelector) || target : target;

      const navHeight = nav ? nav.offsetHeight : 90;
      const top = scrollTarget.getBoundingClientRect().top + window.scrollY - navHeight - 8;
      window.scrollTo({ top, behavior: 'smooth' });

      setActiveLink(hash);
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
          <p style="opacity:0.7;margin-bottom:1.5rem;">Thanks <strong>${payload.name}</strong>, we'll get back to you within 24 hours.</p>
          <p style="opacity:0.5;font-size:0.85rem;">Check your inbox — a confirmation email is on its way.</p>
        `;
        contactForm.parentNode.appendChild(successMsg);

        selectedServices.clear();
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
      clearTimeout(loaderTimer);
      cancelAnimationFrame(rafId);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (navToggle) navToggle.removeEventListener('click', onToggleClick);
      sectionNavLinks.forEach((link) => link.removeEventListener('click', onNavLinkClick));

      hoverTargets.forEach((el) => {
        el.removeEventListener('mouseenter', onHoverIn);
        el.removeEventListener('mouseleave', onHoverOut);
      });

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