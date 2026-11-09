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

  const statusMarkup = (message, type = 'success') => {
    const wrapper = document.createElement('div');
    wrapper.className = `form-status ${type} is-visible`;
    wrapper.setAttribute('role', 'status');
    wrapper.textContent = message;
    return wrapper;
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

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    event.preventDefault();

    const formType = form.dataset.formType || 'general';
    const statusTarget = form.querySelector('[data-form-status]');
    let successText = 'Thank you. Your message has been received.';

    if (formType === 'donation') {
      const donationAmount = getDonationAmount(form);
      const emailValue = form.querySelector('#email')?.value?.trim() || '';
      successText = 'Demo Stripe test mode is active. Your donation request has been accepted and is ready for a real Stripe checkout link when you add your own test keys.';

      if (statusTarget) {
        const statusElement = statusMarkup(successText, 'success');
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
        statusElement.appendChild(summary);
        statusTarget.replaceChildren(statusElement);
      }

      form.reset();
      return;
    }

    if (statusTarget) {
      statusTarget.replaceChildren(statusMarkup(successText, 'success'));
    }

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
