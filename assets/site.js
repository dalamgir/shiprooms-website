// Set to your published signup form URL when ready (for example, a Tally form).
const SIGNUP_URL = '';

const stages = {
  context: {
    eyebrow: 'THE FOUNDATION', title: 'Context that compounds.',
    description: 'Every requirement, decision, and conversation builds on the last. Your team starts with understanding, every time.',
    items: [['↗', 'YOUR INTENT', 'Make team planning feel effortless.', 'Captured'], ['≡', 'SHARED UNDERSTANDING', 'Requirements, with the reasoning attached.', 'Connected'], ['✓', 'EVERY NEXT STEP', 'Grounded in what you actually decided.', 'Traceable']],
    note: 'Ask “why?” and follow the thread back to its source.'
  },
  team: {
    eyebrow: 'THE COLLABORATION', title: 'Specialists. Not silos.',
    description: 'One coordinating agent keeps the team moving. Specialists design, build, and review—with a shared understanding of the goal.',
    items: [['◇', 'COORDINATE', 'Turn the goal into a connected delivery plan.', 'Plan'], ['⌘', 'CREATE', 'Design and engineering work in step.', 'Build'], ['✓', 'CHALLENGE', 'Independent review, with findings you can inspect.', 'Verify']],
    note: 'Talk to one coordinator. Reach a specialist whenever you need.'
  },
  direction: {
    eyebrow: 'THE HUMAN ELEMENT', title: 'Your judgment. In the loop.',
    description: 'Spend your attention on decisions that shape the product. See what needs you, why it matters, and what happens next.',
    items: [['↗', 'SEE THE TRADEOFFS', 'Compare design directions and recommendations.', 'Review'], ['⊙', 'MAKE THE CALL', 'Approve the direction. Refine what needs work.', 'Decide'], ['✓', 'KEEP WORK MOVING', 'Independent work continues around the decision.', 'Continue']],
    note: 'Clear approvals. Visible blockers. No guessing what you agreed to.'
  },
  delivery: {
    eyebrow: 'THE FOLLOW-THROUGH', title: 'Launch is a beginning.',
    description: 'The vision goes beyond deployment: verify the experience, watch production, and turn what you learn into the next improvement.',
    items: [['✓', 'RELEASE WITH EVIDENCE', 'Acceptance criteria, checks, and a recovery plan.', 'Verify'], ['⊙', 'STAY WITH THE PRODUCT', 'Surface incidents and confirm recovery.', 'Observe'], ['↗', 'CLOSE THE LOOP', 'Bring user feedback back into product decisions.', 'Evolve']],
    note: 'Your code. Your infrastructure. Your knowledge, from day one.'
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
