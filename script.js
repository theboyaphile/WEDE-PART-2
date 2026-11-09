document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.querySelector('[data-nav-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
      mobileToggle.textContent = isOpen ? 'close' : 'menu';
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.textContent = 'menu';
      });
    });
  }

  const donateButtons = document.querySelectorAll('a[href="donate.html"]');
  donateButtons.forEach((button) => {
    const isPrimaryButton = button.textContent.trim().toUpperCase().includes('DONATE NOW') ||
      button.classList.contains('bg-secondary-container') ||
      button.classList.contains('bg-primary-container');

    if (isPrimaryButton) {
      button.classList.add('site-donate-button');
    }
  });

  let lastScrollY = window.scrollY || window.pageYOffset || 0;
  const updateStickyDonateVisibility = () => {
    const currentScrollY = window.scrollY || window.pageYOffset || 0;
    const shouldHide = currentScrollY > lastScrollY && currentScrollY > 80;

    document.querySelectorAll('.site-donate-button').forEach((button) => {
      button.classList.toggle('is-hidden', shouldHide);
    });

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', updateStickyDonateVisibility, { passive: true });

  const statusMarkup = (message, type = 'success') => {
    const wrapper = document.createElement('div');
    wrapper.className = `form-status ${type} is-visible`;
    wrapper.setAttribute('role', 'status');
    wrapper.textContent = message;
    return wrapper;
  };

  const setFormStatus = (form, message, type = 'success') => {
    const statusTarget = form.querySelector('[data-form-status]');
    if (!statusTarget) return;
    statusTarget.replaceChildren(statusMarkup(message, type));
  };

  const getDonationAmount = (form) => {
    const selectedAmount = form.querySelector('input[name="amount"]:checked');
    if (!selectedAmount) return 0;

    if (selectedAmount.value === 'other') {
      const customValue = Number(form.querySelector('#custom-amount')?.value || 0);
      return Number.isFinite(customValue) && customValue > 0 ? customValue : 0;
    }

    return Number(selectedAmount.value || 0);
  };

  const getStripeCheckoutUrl = (form) => {
    const donationAmount = getDonationAmount(form);
    const emailValue = form.querySelector('#email')?.value?.trim() || 'demo@hopehaven.test';
    const cents = Math.max(5000, Math.round((Number(donationAmount) || 500) * 100));
    return `https://buy.stripe.com/test_00w3eI2QJb8NejW000?prefilled_email=${encodeURIComponent(emailValue)}&amount=${cents}`;
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    event.preventDefault();

    const formType = form.dataset.formType || 'general';
    let successText = 'Thank you. Your message has been received.';

    if (formType === 'donation') {
      const donationAmount = getDonationAmount(form);
      const emailValue = form.querySelector('#email')?.value?.trim() || 'demo@hopehaven.test';
      successText = 'Demo Stripe test mode is active. Your donation request has been accepted and the secure Stripe test checkout is opening now.';

      setFormStatus(form, successText, 'success');
      const summary = document.createElement('div');
      summary.className = 'demo-checkout-summary';
      summary.innerHTML = `
        <div style="margin-top:12px; padding:12px 14px; border-radius:12px; background:#eef5ff; border:1px solid #cfe0ff; color:#10243d; line-height:1.6; font-size:0.95rem;">
          <strong style="display:block; margin-bottom:4px;">Stripe demo checkout summary</strong>
          <span>Donation: ${donationAmount > 0 ? `R${donationAmount.toLocaleString()}` : 'Custom amount'}</span><br>
          <span>Email: ${emailValue || 'Not provided'}</span><br>
          <span>Mode: Test only — no funds are charged.</span>
        </div>
      `;
      const statusTarget = form.querySelector('[data-form-status]');
      if (statusTarget) {
        statusTarget.appendChild(summary);
      }

      window.setTimeout(() => {
        window.location.href = getStripeCheckoutUrl(form);
      }, 500);

      form.reset();
      return;
    }

    if (formType === 'volunteer') {
      successText = 'Thank you! Your volunteer application has been received. Our team will contact you soon.';
    }

    if (formType === 'contact') {
      successText = 'Thanks for contacting Hope Haven. Your message has been sent successfully.';
    }

    if (formType === 'enquiry') {
      successText = 'Thanks for your enquiry. We will get back to you shortly.';
    }

    setFormStatus(form, successText, 'success');
    form.reset();
  };

  const animatedItems = document.querySelectorAll('[data-animate]');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          entry.target.style.transitionDelay = `${delay}ms`;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedItems.forEach((item) => revealObserver.observe(item));
  } else {
    animatedItems.forEach((item) => item.classList.add('is-visible'));
  }

  document.querySelectorAll('form[data-form-type]').forEach((form) => {
    form.addEventListener('submit', handleFormSubmit);
  });

  const donationForm = document.getElementById('donation-form');
  if (donationForm) {
    const amountInputs = donationForm.querySelectorAll('input[name="amount"]');
    const customAmountContainer = document.getElementById('custom-amount-container');
    const customAmount = document.getElementById('custom-amount');
    const paymentMethodInputs = donationForm.querySelectorAll('input[name="payment_method"]');
    const cardDetails = document.getElementById('card-details');
    const eftDetails = document.getElementById('eft-details');
    const impactDisplay = document.getElementById('impact-display');

    const updateImpact = (amount) => {
      if (!impactDisplay) return;
      const numericAmount = Number(amount || 0);
      let html = `
        <div class="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant">
          <div class="bg-primary-fixed text-on-primary-fixed p-3 rounded-full flex-shrink-0">
            <span class="material-symbols-outlined">school</span>
          </div>
          <div>
            <p class="font-label-bold text-label-bold text-primary">Educational Supplies</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">Helps fund learning support and local community programs.</p>
          </div>
        </div>`;

      if (numericAmount >= 1000) {
        html = `
        <div class="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant">
          <div class="bg-secondary-fixed text-on-secondary-fixed p-3 rounded-full flex-shrink-0">
            <span class="material-symbols-outlined">home_work</span>
          </div>
          <div>
            <p class="font-label-bold text-label-bold text-primary">Provides Safe Shelter</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">A donation of R${numericAmount.toLocaleString()} helps secure emergency shelter and protection.</p>
          </div>
        </div>`;
      } else if (numericAmount >= 500) {
        html = `
        <div class="flex items-center gap-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant">
          <div class="bg-tertiary-fixed text-on-tertiary-fixed p-3 rounded-full flex-shrink-0">
            <span class="material-symbols-outlined">restaurant</span>
          </div>
          <div>
            <p class="font-label-bold text-label-bold text-primary">Provides Meals</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">A donation of R${numericAmount.toLocaleString()} can provide hot meals to families in need.</p>
          </div>
        </div>`;
      }

      impactDisplay.innerHTML = html;
    };

    amountInputs.forEach((radio) => {
      radio.addEventListener('change', (event) => {
        if (event.target.value === 'other') {
          customAmountContainer.classList.remove('hidden');
          customAmount.focus();
          updateImpact(customAmount.value || 0);
        } else {
          customAmountContainer.classList.add('hidden');
          updateImpact(event.target.value);
        }
      });
    });

    if (customAmount) {
      customAmount.addEventListener('input', () => {
        const selected = donationForm.querySelector('input[name="amount"]:checked');
        if (selected && selected.value === 'other') {
          updateImpact(customAmount.value);
        }
      });
    }

    paymentMethodInputs.forEach((radio) => {
      radio.addEventListener('change', () => {
        const isEft = radio.value === 'eft';
        if (cardDetails) cardDetails.classList.toggle('hidden', isEft);
        if (eftDetails) eftDetails.classList.toggle('hidden', !isEft);
      });
    });

    const defaultChecked = donationForm.querySelector('input[name="amount"]:checked');
    if (defaultChecked) updateImpact(defaultChecked.value);
  }
});
