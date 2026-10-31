import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../assets/interest.js', import.meta.url), 'utf8');

function setup(fetch, endpoint = 'https://formspree.io/f/testform') {
  const element = () => ({
    hidden: false, disabled: true, textContent: '',
    classList: { add() {}, remove() {} },
    setAttribute() {}, removeAttribute() {},
    focus() { this.focused = true; }
  });
  const ids = Object.fromEntries(['interest-form', 'interest-status', 'interest-success', 'interest-hint'].map(id => [id, element()]));
  const button = element();
  const label = element();
  const form = ids['interest-form'];
  ids['interest-success'].hidden = true;
  button.querySelector = () => label;
  form.querySelector = () => button;
  form.getAttribute = () => endpoint;
  form.reportValidity = () => true;
  form.addEventListener = (_, callback) => { form.submit = callback; };
  form.reset = () => { form.didReset = true; };
  vm.runInNewContext(source, {
    document: { getElementById: id => ids[id] }, fetch,
    FormData: class { constructor(value) { this.form = value; } },
    AbortController, setTimeout, clearTimeout, TypeError
  });
  return { form, button, label, status: ids['interest-status'], success: ids['interest-success'], submit: () => form.submit({ preventDefault() {} }) };
}

test('a confirmed submission sends form data and reveals an accessible confirmation', async () => {
  const ui = setup(async (url, options) => {
    assert.equal(url, 'https://formspree.io/f/testform');
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Accept, 'application/json');
    assert.equal(options.body.form, ui.form);
    return { ok: true, json: async () => ({ ok: true }) };
  });
  await ui.submit();
  assert.equal(ui.form.didReset, true);
  assert.equal(ui.form.hidden, true);
  assert.equal(ui.success.hidden, false);
  assert.equal(ui.success.focused, true);
});

test('provider rejection preserves entries and allows a retry', async () => {
  const ui = setup(async () => ({ ok: false, status: 422, json: async () => ({ errors: [{ message: 'Please provide a valid email.' }] }) }));
  await ui.submit();
  assert.equal(ui.form.didReset, undefined);
  assert.equal(ui.form.hidden, false);
  assert.equal(ui.success.hidden, true);
  assert.equal(ui.button.disabled, false);
  assert.match(ui.status.textContent, /valid email/);
});

test('network failures do not claim success or erase entries', async () => {
  const ui = setup(async () => { throw new TypeError('Failed to fetch'); });
  await ui.submit();
  assert.equal(ui.form.didReset, undefined);
  assert.equal(ui.success.hidden, true);
  assert.match(ui.status.textContent, /internet connection/);
  assert.equal(ui.button.disabled, false);
});

test('a successful HTTP response without provider confirmation is not accepted', async () => {
  const ui = setup(async () => ({ ok: true, json: async () => { throw new Error('HTML response'); } }));
  await ui.submit();
  assert.equal(ui.success.hidden, true);
  assert.equal(ui.form.didReset, undefined);
});

test('repeated submits while a request is pending send only once', async () => {
  let resolveRequest;
  let requests = 0;
  const ui = setup(() => { requests++; return new Promise(resolve => { resolveRequest = resolve; }); });
  const pending = ui.submit();
  assert.equal(ui.button.disabled, true);
  await ui.submit();
  assert.equal(requests, 1);
  resolveRequest({ ok: true, json: async () => ({ ok: true }) });
  await pending;
});

test('missing endpoint and invalid input never submit', async () => {
  let requests = 0;
  const offline = setup(() => { requests++; }, '');
  await offline.submit();
  const invalid = setup(() => { requests++; });
  invalid.form.reportValidity = () => false;
  await invalid.submit();
  assert.equal(requests, 0);
  assert.equal(offline.button.disabled, true);
});
