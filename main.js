const projectData = [
  {
    id: "customer-journey",
    category: "uiux",
    name: "Customer Journey Redesign",
    type: "Client Project",
    description: "A user-centered review of a service journey aimed at reducing friction and improving confidence across each decision point.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    role: "UX strategy, research synthesis, interface concepting"
  },
  {
    id: "identity-refresh",
    category: "branding",
    name: "Identity System Refresh",
    type: "Freelance Project",
    description: "A branding project focused on stronger positioning, a clearer tone of voice, and more consistent visual communication.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    role: "Brand strategy, visual direction, asset production"
  },
  {
    id: "kpi-dashboard",
    category: "analytics",
    name: "Executive KPI Dashboard",
    type: "Personal Project",
    description: "A reporting dashboard created to organize a complex operational dataset into a clear visual narrative.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    role: "Data cleaning, dashboard design, reporting"
  },
  {
    id: "service-portal",
    category: "web",
    name: "Service Platform Concept",
    type: "Practice / Concept Project",
    description: "A concept focusing on a clear service selection flow, trust-building content, and direct inquiry actions.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    role: "UX design, information architecture, prototyping"
  },
  {
    id: "campaign-kit",
    category: "graphic",
    name: "Campaign Kit",
    type: "Freelance Project",
    description: "Designed social and promotion graphics for a digital campaign with a consistent visual system and high clarity.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    role: "Creative direction, layout design, campaign assets"
  },
  {
    id: "retail-analytics",
    category: "analytics",
    name: "Retail Operations Insights",
    type: "Practice / Concept Project",
    description: "Sample analysis exploring patterns in operational performance, sales flow, and service stability.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=900&q=80",
    role: "Data preparation, charting, insight communication"
  }
];

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const navToggle = document.querySelector('.dock-toggle');
const dockMenu = document.querySelector('.dock-menu');
const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectDetail = document.getElementById('projectDetail');
const projectForm = document.getElementById('projectForm');
const previewBtn = document.getElementById('previewMessage');
const formStatus = document.getElementById('formStatus');

function applyTheme(nextTheme) {
  document.documentElement.setAttribute('data-theme', nextTheme);
  localStorage.setItem('theme', nextTheme);
  if (themeIcon) {
    themeIcon.textContent = nextTheme === 'dark' ? '🌙' : '☀️';
  }
}

if (themeToggle) {
  const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(currentTheme);

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });
}

if (navToggle && dockMenu) {
  navToggle.addEventListener('click', () => {
    dockMenu.classList.toggle('hidden');
  });
}

function renderPortfolio(filter = 'all') {
  if (!portfolioGrid) return;
  const filtered = filter === 'all' ? projectData : projectData.filter((item) => item.category === filter);
  portfolioGrid.innerHTML = filtered.map((item) => `
    <article class="project-card">
      <img src="${item.image}" alt="${item.name}" />
      <div class="card-body">
        <span class="meta">${item.type}</span>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p><strong>Role:</strong> ${item.role}</p>
        <a href="project-detail.html?project=${item.id}" class="text-link">Read case study</a>
      </div>
    </article>
  `).join('');
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('active', btn === button));
    renderPortfolio(button.dataset.filter);
  });
});

if (projectDetail) {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('project') || 'customer-journey';
  const item = projectData.find((project) => project.id === projectId) || projectData[0];

  projectDetail.innerHTML = `
    <header class="page-banner reveal">
      <p class="eyebrow">Case study</p>
      <h1>${item.name}</h1>
    </header>

    <section class="section reveal">
      <div class="case-content-grid">
        <div>
          <p class="eyebrow">Project overview</p>
          <p>${item.description}</p>
          <ul class="check-list">
            <li><strong>Type:</strong> ${item.type}</li>
            <li><strong>Role:</strong> ${item.role}</li>
            <li><strong>Focus:</strong> structure, clarity, and user-centered decision making.</li>
          </ul>
        </div>
        <div class="detail-panel">
          <p><strong>Objectives:</strong> clarify the value proposition, reduce friction, and create a more confident user experience.</p>
          <p><strong>Target audience:</strong> business decision-makers, users, and stakeholders needing useful information fast.</p>
          <p><strong>Context:</strong> practical project work built around communication, usability, and meaningful outcomes.</p>
        </div>
      </div>
      <div class="case-image">
        <img src="${item.image}" alt="${item.name}" />
      </div>
    </section>

    <section class="section reveal">
      <div class="section-head">
        <p class="eyebrow">Process</p>
        <h2>How the work was shaped.</h2>
      </div>
      <div class="process-grid">
        <div class="process-step"><span>01</span><h3>Research</h3><p>Review context, goals, user needs, and constraints.</p></div>
        <div class="process-step"><span>02</span><h3>Define</h3><p>Map the key decisions and information structure.</p></div>
        <div class="process-step"><span>03</span><h3>Design</h3><p>Shape the experience around clarity and usability.</p></div>
        <div class="process-step"><span>04</span><h3>Refine</h3><p>Improve details based on structure, consistency, and usefulness.</p></div>
      </div>
    </section>

    <section class="section reveal">
      <div class="cta-panel compact">
        <div>
          <p class="eyebrow">Related request</p>
          <h2>Need similar work?</h2>
        </div>
        <a class="button primary" href="contact.html">Request a project</a>
      </div>
    </section>
  `;
}

function getProjectSummary(formData) {
  return {
    name: formData.get('name'),
    email: formData.get('email'),
    service: formData.get('service'),
    description: formData.get('description'),
    deliverables: formData.get('deliverables'),
    deadline: formData.get('deadline'),
    budget: formData.get('budget'),
    channel: formData.get('channel')
  };
}

function validateForm(form) {
  const fields = ['name', 'email', 'service', 'description'];
  for (const field of fields) {
    const value = form.elements[field]?.value?.trim();
    if (!value) {
      return field === 'name' ? 'Name is required.' : field === 'email' ? 'Email is required.' : field === 'service' ? 'Service is required.' : 'Project description is required.';
    }
  }

  const emailValue = form.elements.email.value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    return 'Please enter a valid email address.';
  }

  return '';
}

if (projectForm) {
  projectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = validateForm(projectForm);

    if (error) {
      formStatus.textContent = error;
      return;
    }

    const data = getProjectSummary(new FormData(projectForm));
    const channel = data.channel;

    if (channel === 'whatsapp') {
      const phone = '201027436681';
      const message = encodeURIComponent(
        `Hello Kyrillos, I would like to discuss a project.\n\nService: ${data.service}\nProject Description: ${data.description}\nRequired Deliverables: ${data.deliverables || 'Not specified'}\nTarget Deadline: ${data.deadline || 'Not specified'}\nEstimated Budget: ${data.budget || 'Not specified'}\nPlease review my requirements and let me know the next steps.`
      );
      const url = `https://wa.me/${phone}?text=${message}`;
      window.open(url, '_blank', 'noopener');
      formStatus.textContent = 'WhatsApp was prepared. Please confirm and send the message in WhatsApp.';
    } else {
      const subject = encodeURIComponent(`New Project Inquiry — ${data.service}`);
      const body = encodeURIComponent(
        `Client Name: ${data.name}\nReply Email: ${data.email}\nSelected Service: ${data.service}\nProject Description: ${data.description}\nRequired Deliverables: ${data.deliverables || 'Not specified'}\nTarget Deadline: ${data.deadline || 'Not specified'}\nOptional Budget: ${data.budget || 'Not specified'}\nAdditional Notes: \n`
      );
      window.location.href = `mailto:kyrillos.maurice@gmail.com?subject=${subject}&body=${body}`;
      formStatus.textContent = 'Your email app should open with a prefilled inquiry. Please send the email to complete the request.';
    }
  });
}

if (previewBtn && projectForm) {
  previewBtn.addEventListener('click', () => {
    const error = validateForm(projectForm);
    if (error) {
      formStatus.textContent = error;
      return;
    }

    const data = getProjectSummary(new FormData(projectForm));
    const summary = `Name: ${data.name}\nEmail: ${data.email}\nService: ${data.service}\nDeadline: ${data.deadline || 'Not specified'}\nBudget: ${data.budget || 'Not specified'}\n\nProject Description:\n${data.description}\n\nDeliverables:\n${data.deliverables || 'Not specified'}`;
    formStatus.textContent = summary;
  });
}

if (portfolioGrid) {
  renderPortfolio();
}

const canvas = document.getElementById('flightCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let nodes = [];
  let pointer = { x: 0, y: 0 };

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    buildNodes();
  }

  function buildNodes() {
    const rect = canvas.getBoundingClientRect();
    nodes = [
      { x: rect.width * 0.20, y: rect.height * 0.28, label: 'Strategy' },
      { x: rect.width * 0.38, y: rect.height * 0.18, label: 'Design' },
      { x: rect.width * 0.56, y: rect.height * 0.32, label: 'Build' },
      { x: rect.width * 0.72, y: rect.height * 0.48, label: 'Insights' },
      { x: rect.width * 0.82, y: rect.height * 0.68, label: 'Results' }
    ];

    particles = Array.from({ length: 45 }, (_, i) => ({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: 2 + Math.random() * 3,
      alpha: 0.4 + Math.random() * 0.6,
      orbit: i % 5,
      offset: Math.random() * Math.PI * 2
    }));
  }

  function drawPath(a, b) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.quadraticCurveTo(
      (a.x + b.x) / 2,
      Math.min(a.y, b.y) - 40,
      b.x,
      b.y
    );
    ctx.strokeStyle = 'rgba(184, 109, 70, 0.45)';
    ctx.lineWidth = 1.2;
    ctx.stroke();
  }

  function animate() {
    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        drawPath(a, b);
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx + (pointer.x - rect.width / 2) * 0.00008;
      p.y += p.vy + (pointer.y - rect.height / 2) * 0.00008;

      if (p.x < 0 || p.x > rect.width) p.vx *= -1;
      if (p.y < 0 || p.y > rect.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(214,161,122,${p.alpha})`;
      ctx.fill();
    }

    nodes.forEach((node) => {
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      const dist = Math.hypot(dx, dy) || 1;
      const influence = Math.max(0, 1 - dist / 180);
      const glowX = node.x + dx * 0.06;
      const glowY = node.y + dy * 0.06;

      ctx.beginPath();
      ctx.arc(glowX, glowY, 14 + influence * 14, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(184,109,70,${0.15 + influence * 0.3})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, 5.5 + influence * 3, 0, Math.PI * 2);
      ctx.fillStyle = '#d6a17a';
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = event.clientX - rect.left;
    pointer.y = event.clientY - rect.top;
  });

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(animate);
}

if (document.querySelector('.dock-toggle')) {
  document.querySelector('.dock-toggle').addEventListener('click', () => {
    const menu = document.querySelector('.dock-menu');
    if (menu) menu.classList.toggle('hidden');
  });
}
