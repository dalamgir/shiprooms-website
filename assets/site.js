// Set to your published signup form URL when ready (for example, a Tally form).
const SIGNUP_URL = '';

const stages = {
  context: {
    eyebrow: 'THE FOUNDATION', title: 'Shared context. Across teams.',
    description: 'Connect business goals, requirements, architecture, and decisions so every discipline works from the same understanding.',
    items: [['↗', 'BUSINESS INTENT', 'Simplify customer onboarding across products.', 'Captured'], ['≡', 'SHARED UNDERSTANDING', 'Scope, dependencies, and accountable owners.', 'Connected'], ['✓', 'EVERY NEXT STEP', 'Implementation linked to approved decisions.', 'Traceable']],
    note: 'Keep the reasoning connected as work moves between teams.'
  },
  team: {
    eyebrow: 'THE COLLABORATION', title: 'Many disciplines. One plan.',
    description: 'People and specialist agents work toward shared milestones, with dependencies visible and independent work moving in parallel.',
    items: [['◇', 'ALIGN', 'Product, design, and architecture establish direction.', 'Plan'], ['⌘', 'EXECUTE', 'Engineering and agents carry approved work forward.', 'Build'], ['✓', 'REVIEW', 'Quality and security challenge the work with evidence.', 'Verify']],
    note: 'Coordination belongs in the factory, not in a chain of status meetings.'
  },
  direction: {
    eyebrow: 'THE HUMAN ELEMENT', title: 'Authority stays with your team.',
    description: 'Bring the right decisions to the right people. Required approvals, specialist findings, and unresolved risks stay visible.',
    items: [['↗', 'ROUTE THE DECISION', 'Role-based reviews with clear, accountable owners.', 'Review'], ['⊙', 'ASSESS THE EVIDENCE', 'Inspect tradeoffs, findings, and remaining risks.', 'Decide'], ['✓', 'AUTHORIZE THE NEXT STEP', 'Preserve required sign-offs as work moves forward.', 'Approve']],
    note: 'A completed task is not a release approval. Readiness needs evidence.'
  },
  delivery: {
    eyebrow: 'THE FOLLOW-THROUGH', title: 'Launch is a beginning.',
    description: 'Connect release readiness to production operations, and production learning back to product and engineering.',
    items: [['✓', 'RELEASE WITH EVIDENCE', 'Acceptance checks, required approvals, and recovery plans.', 'Verify'], ['⊙', 'OPERATE TOGETHER', 'Surface incidents, ownership, and verified recovery.', 'Observe'], ['↗', 'CLOSE THE LOOP', 'Turn production insights into proposed improvements.', 'Evolve']],
    note: 'The lifecycle continues after deployment—with the context intact.'
  }
};

const tabs = [...document.querySelectorAll('[data-stage]')];
function selectStage(tab, focus = false) {
  const data = stages[tab.dataset.stage];
  tabs.forEach(item => {
    const selected = item === tab;
    item.setAttribute('aria-selected', String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  document.getElementById('workflow-panel').setAttribute('aria-labelledby', tab.id);
  document.getElementById('panel-eyebrow').textContent = data.eyebrow;
  document.getElementById('panel-number').textContent = `0${tabs.indexOf(tab) + 1} / 04`;
  document.getElementById('panel-title').textContent = data.title;
  document.getElementById('panel-description').textContent = data.description;
  document.getElementById('panel-note').textContent = data.note;
  const flow = document.getElementById('evidence-flow');
  flow.replaceChildren();
  data.items.forEach(([icon, label, detail, status], index) => {
    if (index) {
      const connector = document.createElement('div');
      connector.className = 'evidence-connector';
      flow.append(connector);
    }
    const item = document.createElement('div');
    item.className = 'evidence-item';
    const symbol = document.createElement('span');
    symbol.className = 'evidence-icon'; symbol.textContent = icon; symbol.setAttribute('aria-hidden', 'true');
    const copy = document.createElement('div');
    const small = document.createElement('small'); small.textContent = label;
    const strong = document.createElement('strong'); strong.textContent = detail;
    const state = document.createElement('span'); state.className = 'evidence-state'; state.textContent = status;
    copy.append(small, strong); item.append(symbol, copy, state); flow.append(item);
  });
  if (focus) tab.focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStage(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectStage(tabs[next], true); }
  });
});

if (SIGNUP_URL) {
  const url = new URL(SIGNUP_URL);
  if (url.protocol === 'https:') {
    document.querySelectorAll('[data-signup-link]').forEach(link => {
      link.href = url.href;
      link.hidden = false;
    });
    document.getElementById('signup-pending').hidden = true;
    document.querySelector('.header-cta').firstChild.textContent = 'Get early access ';
    document.querySelector('.hero-actions .button').firstChild.textContent = 'Get early access ';
  }
}
document.getElementById('year').textContent = new Date().getFullYear();
