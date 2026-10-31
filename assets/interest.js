const interestForm = document.getElementById('interest-form');
const interestStatus = document.getElementById('interest-status');
const interestSubmit = interestForm.querySelector('button[type="submit"]');
const interestLabel = interestSubmit.querySelector('.interest-submit-label');
const interestSuccess = document.getElementById('interest-success');
const interestEndpoint = interestForm.getAttribute('action');
const interestReady = /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(interestEndpoint);
let interestSending = false;

if (interestReady) {
  interestSubmit.disabled = false;
  interestStatus.textContent = '';
} else {
  interestSubmit.disabled = true;
  interestStatus.textContent = 'Registration is temporarily unavailable. Please check back shortly.';
}

interestForm.addEventListener('submit', async event => {
  event.preventDefault();
  if (!interestReady || interestSending || !interestForm.reportValidity()) return;

  interestSending = true;
  interestSubmit.disabled = true;
  interestForm.setAttribute('aria-busy', 'true');
  interestLabel.textContent = 'Sending…';
  interestStatus.textContent = 'Sending your registration…';
  interestStatus.classList.remove('is-error');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(interestEndpoint, {
      method: 'POST',
      body: new FormData(interestForm),
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || result?.ok !== true) {
      const detail = result?.errors?.map(error => error.message).filter(Boolean).join(' ');
      throw new Error(detail || (response.status === 429
        ? 'Registration is temporarily busy. Please try again later.'
        : 'We couldn’t save your registration. Please try again shortly.'));
    }
    // Only show success after Formspree has accepted the submission.
    interestForm.reset();
    interestForm.hidden = true;
    document.getElementById('interest-hint').hidden = true;
    interestStatus.textContent = '';
    interestSuccess.hidden = false;
    interestSuccess.focus();
  } catch (error) {
    interestStatus.textContent = error.name === 'AbortError'
      ? 'This is taking longer than expected. We couldn’t confirm your registration. Please try again shortly.'
      : error instanceof TypeError
        ? 'We couldn’t connect. Check your internet connection and try again. Your details are still here.'
        : error.message;
    interestStatus.classList.add('is-error');
  } finally {
    clearTimeout(timeout);
    interestSending = false;
    interestSubmit.disabled = false;
    interestLabel.textContent = 'Register interest';
    interestForm.removeAttribute('aria-busy');
  }
});
