document.addEventListener('DOMContentLoaded', initTestiScroll);
// Extracted from template.html on 2026-05-04. All scripts below were previously inline.

// ===================== PACKAGES INIT =====================
window.pkgSetCur = function(k) {
  var D = window.PKG_DATA;
  if (!D) return;
  window._pkgCur = k || 'nok';
  var r = D[window._pkgCur];
  var c = document.getElementById('pkg-cards');
  var a = document.getElementById('pkg-addons');
  if (!c || !a || !r) return;
  function ck(){ return '<span class="pkg-check"><i class="fa-solid fa-check" aria-hidden="true"></i></span>'; }
  c.innerHTML = r.plans.map(function(p){
    return '<div class="pkg-card'+(p.hot?' pkg-hot':'')+'>'+ 
      (p.badge?'<div class="pkg-badge">'+p.badge+'</div>':'')+
      '<div class="pkg-tag">'+p.tag+'</div>'+
      '<div class="pkg-name">'+p.name+'</div>'+
      (p.price?'<span class="pkg-price">'+r.sym+p.price+'<sub>'+p.per+'</sub></span>':'<span class="pkg-price-custom">Custom</span>')+
      '<div class="pkg-alt">'+p.alt+'</div>'+
      '<div class="pkg-desc">'+p.desc+'</div>'+
      '<div class="pkg-chips"><span class="pkg-chip-host"><i class="fa-solid fa-globe"></i> Domain setup included</span><span class="pkg-chip-seo"><i class="fa-solid fa-chart-line"></i> SEO Tool FREE</span></div>'+
      '<div class="pkg-feats-label">What\'s included</div>'+
      '<ul class="pkg-feats">'+p.feats.map(function(f){return '<li>'+ck()+'<span>'+f+'</span></li>';}).join('')+'</ul>'+
      '<div class="pkg-guar"><i class="fa-solid fa-shield-halved"></i><p>'+p.guar+'</p></div>'+
      (p.ping?'<a href="#contact" class="pkg-cta pkg-cta-outline">Let\'s talk <i class="fa-solid fa-arrow-right"></i></a>':'<a href="#contact" class="pkg-cta pkg-cta-solid">Start a Project <i class="fa-solid fa-arrow-right"></i></a>')+
      '</div>';
  }).join('');
  a.innerHTML = r.addons.map(function(x){
    return '<div class="pkg-addon"><strong>'+x.n+'</strong><span>'+x.p+'</span></div>';
  }).join('');
};
window.PKG_DATA = { /* ...data omitted for brevity, keep in template.html... */ };
window._pkgCur = 'nok';
document.addEventListener('DOMContentLoaded', function() {
  var sel = document.getElementById('pkg-currency');
  if (sel) sel.value = 'nok';
  window.pkgSetCur('nok');
});
window.addEventListener('load', function() {
  var el = document.getElementById('pkg-cards');
  if (el && !el.innerHTML.trim()) window.pkgSetCur('nok');
});

// ===================== FREE AUDIT MODAL SCRIPT =====================
document.addEventListener('DOMContentLoaded', function () {
  var overlay      = document.getElementById('audit-modal');
  var openBtn      = document.getElementById('free-audit-btn');
  var closeBtn     = document.getElementById('audit-modal-close');
  var doneBtn      = document.getElementById('audit-done-close');
  var submitBtn    = document.getElementById('audit-submit');
  var stepForm     = document.getElementById('audit-step-form');
  var stepLoading  = document.getElementById('audit-step-loading');
  var stepDone     = document.getElementById('audit-step-done');
  var errorEl      = document.getElementById('audit-error');
  var progressBar  = document.getElementById('audit-progress-bar');
  var scorePreview = document.getElementById('audit-score-preview');
  if (!overlay) return;
  var PAGE_LOAD_TIME = Date.now();
  var scrollTriggered = false;
  var triggerTimeout  = null;
  function openModal() {
    if (!overlay || overlay.dataset.dismissed === 'true') return;
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    var nameInput = document.getElementById('audit-name');
    if (nameInput) setTimeout(function() { nameInput.focus(); }, 100);
  }
  function closeModal() {
    overlay.dataset.dismissed = 'true';
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    resetSteps();
    clearFields();
  }
  function resetSteps() {
    if (stepForm)    stepForm.hidden    = false;
    if (stepLoading) stepLoading.hidden = true;
    if (stepDone)    stepDone.hidden    = true;
    if (errorEl)     errorEl.hidden     = true;
    if (progressBar) progressBar.style.width = '0%';
  }
  function clearFields() {
    ['audit-name', 'audit-email', 'audit-url'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
  }
  function handleAuditScroll() {
    if (scrollTriggered) return;
    var pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (pageHeight <= 0) return;
    var scrollPercent = window.scrollY / pageHeight;
    var timeOnPage    = Date.now() - PAGE_LOAD_TIME;
    if (scrollPercent > 0.15 && timeOnPage > 2000) {
      scrollTriggered = true;
      window.removeEventListener('scroll', handleAuditScroll);
      triggerTimeout = setTimeout(openModal, 700);
    }
  }
  if (openBtn) {
    openBtn.addEventListener('click', function () {
      overlay.dataset.dismissed = 'false';
      clearTimeout(triggerTimeout);
      resetSteps();
      openModal();
    });
  }
  window.addEventListener('scroll', handleAuditScroll, { passive: true });
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (doneBtn)  doneBtn.addEventListener('click',  closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.style.display !== 'none') closeModal();
  });
  if (submitBtn) {
    submitBtn.addEventListener('click', async function () {
      var name     = document.getElementById('audit-name').value.trim();
      var email    = document.getElementById('audit-email').value.trim();
      var url      = document.getElementById('audit-url').value.trim();
      var honeypot = document.getElementById('audit-honeypot').value;
      errorEl.hidden = true;
      if (!name || !email || !url) {
        errorEl.textContent = 'Please fill in all fields.';
        errorEl.hidden = false;
        return;
      }
      var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!EMAIL_RE.test(email)) {
        errorEl.textContent = 'Please enter a valid email address.';
        errorEl.hidden = false;
        return;
      }
      var urlToSend = url;
      if (!/^https?:\/\//i.test(urlToSend)) {
        urlToSend = 'https://' + urlToSend;
      }
      stepForm.hidden    = true;
      stepLoading.hidden = false;
      var pct = 0;
      var interval = setInterval(function() {
        pct = Math.min(pct + Math.random() * 8, 88);
        progressBar.style.width = pct + '%';
      }, 400);
      try {
        var res = await fetch('https://devndespro-production.up.railway.app/api/free-audit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: name, email: email, url: urlToSend, honeypot: honeypot }),
        });
        clearInterval(interval);
        progressBar.style.width = '100%';
        var data = await res.json();
        var score    = data.score    || 0;
        var critical = data.critical || 0;
        var warnings = data.warnings || 0;
        var color    = score >= 80 ? '#16A34A' : score >= 60 ? '#D97706' : '#DC2626';
        var ctaText = score >= 80
          ? 'Your site looks healthy! Want to stay ahead of competitors?'
          : score >= 60
          ? 'Some issues found. Want us to fix them for you?'
          : 'Critical issues detected. Let us help you fix them fast.';
        var ctaBtnText = score >= 80
          ? 'Book a Free Growth Call'
          : 'Get a Free Fix Plan';
        if (!res.ok || !data.ok) {
          if (scorePreview) {
            scorePreview.innerHTML +=
              '<div style="margin-top:20px;padding:16px;background:rgba(255,107,43,0.1);border:1px solid rgba(255,107,43,0.3);border-radius:10px;text-align:center;">' +
                '<p style="font-size:0.88rem;color:#ccc;margin-bottom:12px;">' + ctaText + '</p>' +
                '<a href="https://api.whatsapp.com/send?phone=4740975201" target="_blank" style="display:block;background:#FF6B2B;color:#fff;padding:0.7rem 1rem;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;">' + ctaBtnText + ' →</a>' +
              '</div>';
          }
          stepLoading.hidden = true;
          stepDone.hidden    = false;
          if (errorEl) {
            errorEl.textContent = data.error || 'Something went wrong. Please try again.';
            errorEl.hidden = false;
          }
          return;
        }
        scorePreview.innerHTML =
          '<div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin:16px 0;">' +
            '<div style="text-align:center;"><div style="font-size:2.5rem;font-weight:800;color:' + color + ';">' + score + '</div><div style="font-size:12px;color:#9CA3AF;margin-top:4px;">Health Score</div></div>' +
            '<div style="text-align:center;"><div style="font-size:2.5rem;font-weight:800;color:#DC2626;">' + critical + '</div><div style="font-size:12px;color:#9CA3AF;margin-top:4px;">Critical</div></div>' +
            '<div style="text-align:center;"><div style="font-size:2.5rem;font-weight:800;color:#D97706;">' + warnings + '</div><div style="font-size:12px;color:#9CA3AF;margin-top:4px;">Warnings</div></div>' +
          '</div>' +
          '<div style="margin-top:20px;padding:16px;background:rgba(255,107,43,0.1);border:1px solid rgba(255,107,43,0.3);border-radius:10px;text-align:center;">' +
            '<p style="font-size:0.88rem;color:#ccc;margin-bottom:12px;">' + ctaText + '</p>' +
            '<a href="https://api.whatsapp.com/send?phone=4740975201" target="_blank" style="display:block;background:#FF6B2B;color:#fff;padding:0.7rem 1rem;border-radius:8px;text-decoration:none;font-weight:600;font-size:0.9rem;">' + ctaBtnText + ' →</a>' +
          '</div>';
        stepLoading.hidden = true;
        stepDone.hidden    = false;
        if (typeof gtag === 'function') {
          gtag('event', 'generate_lead', { currency: 'NOK', value: 1000 });
        }
      } catch (err) {
        clearInterval(interval);
        stepLoading.hidden = true;
        stepForm.hidden    = false;
        errorEl.textContent = 'Network error. Please try again.';
        errorEl.hidden = false;
      }
    });
  }
}); // end DOMContentLoaded

// ===================== CUSTOM CURSOR SCRIPT =====================
document.addEventListener('mousemove', function (e) {
  const cur  = document.getElementById('cur');
  const curR = document.getElementById('cur-r');
  if (cur)  cur.style.transform  = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
  if (curR) curR.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
});

// ===================== GA4 CONTACT FORM LEAD TRACKING =====================
document.addEventListener('DOMContentLoaded', function () {
  var contactForm = document.querySelector('.c-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      if (typeof gtag === 'function') {
        gtag('event', 'generate_lead', { currency: 'NOK', value: 1500 });
      }
    });
  }
});

// ===================== TESTIMONIALS SCROLL =====================
function initTestiScroll() {
  var wrap = document.querySelector('.testi-scroll-wrap');
  var prev = document.querySelector('.testi-prev');
  var next = document.querySelector('.testi-next');
  if (!wrap) return;
  if (next) {
    next.addEventListener('click', function () {
      wrap.scrollBy({ left: 336, behavior: 'smooth' });
    });
  }
  if (prev) {
    prev.addEventListener('click', function () {
      wrap.scrollBy({ left: -336, behavior: 'smooth' });
    });
  }
  var isDown = false, startX, scrollLeft;
  wrap.addEventListener('mousedown', function (e) {
    isDown = true;
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });
  wrap.addEventListener('mouseleave', function () {
    isDown = false;
  });
  wrap.addEventListener('mouseup', function () {
    isDown = false;
  });
  wrap.addEventListener('mousemove', function (e) {
    if (!isDown) return;
    e.preventDefault();
    var x = e.pageX - wrap.offsetLeft;
    wrap.scrollLeft = scrollLeft - (x - startX);
  });
}
document.addEventListener('DOMContentLoaded', initTestiScroll);

// ===================== TRACK VIEW =====================
fetch('https://devndespro-production.up.railway.app/api/track-view', {
  method: 'POST'
});

// SCROLLSPY DEBUG
window.addEventListener("scroll", function () {
  console.clear();
  console.log("---- SCROLL DEBUG ----");
  console.log("scrollY:", Math.round(window.scrollY));

  document.querySelectorAll(".nav-menu a[href^='#']").forEach(function (link) {
    const id = link.getAttribute("href");
    const section = document.querySelector(id);

    if (!section) {
      console.log(id, "SECTION NOT FOUND");
      return;
    }

    const rect = section.getBoundingClientRect();

    console.log({
      link: id,
      top: Math.round(rect.top),
      bottom: Math.round(rect.bottom),
      active: link.classList.contains("active")
    });
  });
});

// SIMPLE NAV ACTIVE: click + hover only
window.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.forEach(a => a.classList.remove("active"));
      link.classList.add("active");
      console.log("CLICK ACTIVE:", link.textContent.trim(), link.getAttribute("href"));
    });

    link.addEventListener("mouseenter", function () {
      console.log("HOVER:", link.textContent.trim(), link.getAttribute("href"));
    });
  });
});

// PACKAGE CURRENCY FIX
function initPackageCurrency() {
  const select = document.getElementById("pkgCurrency");
  const prices = document.querySelectorAll(".pkg-price");

  if (!select || prices.length === 0) return;

  const symbols = {
    NOK: "kr",
    USD: "$",
    EUR: "�",
    INR: "?"
  };

  function formatPrice(value) {
    return Number(value).toLocaleString("en-US");
  }

  function updateCurrency(currency) {
    prices.forEach(function (price) {
      const value = price.dataset[currency.toLowerCase()];
      const currencyEl = price.querySelector(".pkg-currency");
      const amountEl = price.querySelector(".pkg-amount");

      if (!value || !currencyEl || !amountEl) return;

      currencyEl.textContent = symbols[currency] || currency;
      amountEl.textContent = formatPrice(value);
    });
  }

  select.addEventListener("change", function () {
    updateCurrency(this.value);
  });

  updateCurrency(select.value || "NOK");
}

window.addEventListener("load", initPackageCurrency);
setTimeout(initPackageCurrency, 500);

// NAV SCROLL SHRINK
window.addEventListener('scroll', function() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 10) {
    nav.classList.add('s');
  } else {
    nav.classList.remove('s');
  }
});
