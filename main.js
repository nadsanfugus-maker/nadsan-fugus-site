// NADSAN-FUGUS — shared behavior

document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('nav.links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      const expanded = links.classList.contains('open');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Mark active nav link
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.links a').forEach(a => {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // Generic form submit handling (Formspree-ready).
  // Replace YOUR_FORM_ID in each form's action attribute with your real Formspree endpoint.
  document.querySelectorAll('form[data-ajax="true"]').forEach(form => {
    const successBox = form.querySelector('.form-success') || form.parentElement.querySelector('.form-success');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const action = form.getAttribute('action');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (action.includes('YOUR_FORM_ID')) {
        alert('Form endpoint not yet connected. See README for setup instructions.');
        return;
      }
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }
      try {
        const res = await fetch(action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          form.reset();
          if (successBox) successBox.classList.add('show');
        } else {
          alert('Something went wrong. Please try again or email us directly.');
        }
      } catch (err) {
        alert('Network error. Please try again or email us directly.');
      } finally {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send'; }
      }
    });
  });
});
