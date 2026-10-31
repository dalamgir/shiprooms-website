const stages = {
  "define": {
    "eyebrow": "01 — DEFINE",
    "title": "Turn intent into shared direction.",
    "description": "People bring the business context. AI agents help make it specific, connected, and ready to act on.",
    "items": [
      [
        "⊙",
        "PEOPLE",
        "Set outcomes, priorities, constraints, and acceptance criteria.",
        "Direct"
      ],
      [
        "⌘",
        "AI AGENTS",
        "Clarify requirements, surface assumptions, and draft the plan.",
        "Propose"
      ],
      [
        "✓",
        "SHARED RESULT",
        "An agreed brief with owners and decisions attached.",
        "Align"
      ]
    ],
    "note": "People confirm assumptions before they become approved requirements."
  },
  "design": {
    "eyebrow": "02 — DESIGN",
    "title": "Explore options. Choose with intent.",
    "description": "Designers and architects shape the experience and technical direction, with agents developing and reviewing alternatives.",
    "items": [
      [
        "⊙",
        "PEOPLE",
        "Bring user insight. Choose UX and architecture directions.",
        "Shape"
      ],
      [
        "⌘",
        "AI AGENTS",
        "Propose designs, compare tradeoffs, and review the options.",
        "Explore"
      ],
      [
        "✓",
        "SHARED RESULT",
        "Approved designs with rationale and feedback preserved.",
        "Decide"
      ]
    ],
    "note": "Design and architecture decisions stay connected to the original goals."
  },
  "build": {
    "eyebrow": "03 — BUILD",
    "title": "Build together. Keep context intact.",
    "description": "Engineers guide technical work and contribute directly. AI agents implement approved plans and coordinate dependencies.",
    "items": [
      [
        "⊙",
        "PEOPLE",
        "Set engineering standards, review changes, and edit code.",
        "Guide"
      ],
      [
        "⌘",
        "AI AGENTS",
        "Implement, document, and bring working previews for feedback.",
        "Execute"
      ],
      [
        "✓",
        "SHARED RESULT",
        "Working software traceable to the decisions behind it.",
        "Create"
      ]
    ],
    "note": "Explicit handoffs keep human edits and agent work coordinated."
  },
  "verify": {
    "eyebrow": "04 — VERIFY",
    "title": "Make readiness an evidence-based decision.",
    "description": "Quality, security, and product teams define the standard. Independent agents help test the work against it.",
    "items": [
      [
        "⊙",
        "PEOPLE",
        "Review acceptance evidence, security findings, and risks.",
        "Assess"
      ],
      [
        "⌘",
        "AI AGENTS",
        "Run checks, investigate failures, and propose fixes.",
        "Test"
      ],
      [
        "✓",
        "SHARED RESULT",
        "Visible evidence, unresolved blockers, and required sign-offs.",
        "Verify"
      ]
    ],
    "note": "Agent activity is not proof of readiness. Unmet criteria stay visible."
  },
  "ship": {
    "eyebrow": "05 — SHIP",
    "title": "Release with a shared understanding.",
    "description": "Delivery, engineering, and operations teams own the release decision. Agents prepare and execute within approved boundaries.",
    "items": [
      [
        "⊙",
        "PEOPLE",
        "Approve the release, access settings, and recovery plan.",
        "Authorize"
      ],
      [
        "⌘",
        "AI AGENTS",
        "Prepare deployment, execute approved steps, and verify health.",
        "Deploy"
      ],
      [
        "✓",
        "SHARED RESULT",
        "A verified release with clear ownership and recovery paths.",
        "Release"
      ]
    ],
    "note": "Required human sign-offs remain part of the path to production."
  },
  "evolve": {
    "eyebrow": "06 — EVOLVE",
    "title": "Learn from production. Improve together.",
    "description": "Operations and product teams stay connected after launch, with agents turning production signals into actionable work.",
    "items": [
      [
        "⊙",
        "PEOPLE",
        "Set response policies and prioritize the next improvements.",
        "Steer"
      ],
      [
        "⌘",
        "AI AGENTS",
        "Monitor, investigate incidents, and propose fixes and follow-ups.",
        "Learn"
      ],
      [
        "✓",
        "SHARED RESULT",
        "Verified recovery and new work grounded in real feedback.",
        "Improve"
      ]
    ],
    "note": "Agents act within approved policies and escalate when human judgment is needed."
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
  document.getElementById('panel-number').textContent = `${String(tabs.indexOf(tab) + 1).padStart(2, '0')} / ${String(tabs.length).padStart(2, '0')}`;
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

document.getElementById('year').textContent = new Date().getFullYear();
