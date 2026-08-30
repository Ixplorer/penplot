/* ==========================================================================
   PENPLOT PARTNERS CONSTRUCTION
   Master Corporate Dynamic JavaScript Logic with Background Puzzle Assembly
   Operating Scope: Nationwide Nigeria (Operating Offices: Abuja & Lagos)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 0. Construction Site Background Puzzle Assembly Engine
  // ------------------------------------------------------------------------
  const preloaderOverlay = document.getElementById('preloaderOverlay');
  const preloaderProgressBar = document.getElementById('preloaderProgressBar');
  const preloaderPercent = document.getElementById('preloaderPercent');
  const preloaderStatusText = document.getElementById('preloaderStatusText');

  if (preloaderOverlay && preloaderProgressBar && preloaderPercent && preloaderStatusText) {
    let progress = 0;
    const statusMessages = [
      { threshold: 20, text: 'Assembling Site Grid Tiles...' },
      { threshold: 45, text: 'Locking Structural Blueprints...' },
      { threshold: 75, text: 'Regulatory & Site Verification...' },
      { threshold: 100, text: 'Site Assembly Complete.' }
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 6) + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);

        preloaderProgressBar.style.width = '100%';
        preloaderPercent.textContent = '100%';
        preloaderStatusText.textContent = 'Site Assembly Complete.';

        // Assemble all 9 tiles
        for (let i = 1; i <= 9; i++) {
          const tile = document.getElementById(`tile-${i}`);
          if (tile) tile.classList.add('assembled');
        }

        setTimeout(() => {
          preloaderOverlay.classList.add('fade-out');
        }, 500);
      } else {
        preloaderProgressBar.style.width = `${progress}%`;
        preloaderPercent.textContent = `${progress}%`;

        // Calculate how many puzzle tiles (1 to 9) should lock into place
        const tilesToLock = Math.min(9, Math.floor((progress / 100) * 10));
        for (let i = 1; i <= tilesToLock; i++) {
          const tile = document.getElementById(`tile-${i}`);
          if (tile) tile.classList.add('assembled');
        }

        const currentMsg = statusMessages.find(m => progress <= m.threshold);
        if (currentMsg) preloaderStatusText.textContent = currentMsg.text;
      }
    }, 45);
  }

  // ------------------------------------------------------------------------
  // 1. Scroll Construction Assembly Animation Observer
  // ------------------------------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.12
  };

  const constructObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-construct, .stagger-parent').forEach(el => {
    constructObserver.observe(el);
  });

  // ------------------------------------------------------------------------
  // 2. Theme Switcher (Dark / Light Mode)
  // ------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('penplot_theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      localStorage.setItem('penplot_theme', isLight ? 'light' : 'dark');
      themeToggleBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      showToast(isLight ? 'Switched to Light Theme' : 'Switched to Dark Theme');
    });
  }

  // ------------------------------------------------------------------------
  // 3. Sticky Header & Mobile Navigation
  // ------------------------------------------------------------------------
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
  });

  // ------------------------------------------------------------------------
  // 4. Interactive Service Tabs (Services A, B, C, D)
  // ------------------------------------------------------------------------
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.service-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-service');

      tabBtns.forEach(b => b.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(`panel-${target}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
        targetPanel.classList.add('reveal-construct');
        setTimeout(() => targetPanel.classList.add('active'), 50);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 5. Interactive Project Cost & Timeline Estimator
  // ------------------------------------------------------------------------
  const serviceSelect = document.getElementById('estimatorService');
  const scaleInput = document.getElementById('estimatorScale');
  const scaleDisplay = document.getElementById('scaleValueDisplay');
  const locationSelect = document.getElementById('estimatorLocation');
  const prioritySelect = document.getElementById('estimatorPriority');

  const priceOutput = document.getElementById('calculatedPrice');
  const durationOutput = document.getElementById('calculatedDuration');
  const briefBtn = document.getElementById('downloadBriefBtn');

  if (scaleInput && scaleDisplay) {
    scaleInput.addEventListener('input', (e) => {
      scaleDisplay.textContent = `${e.target.value} sqm / units`;
      calculateCost();
    });
  }

  if (serviceSelect) serviceSelect.addEventListener('change', calculateCost);
  if (locationSelect) locationSelect.addEventListener('change', calculateCost);
  if (prioritySelect) prioritySelect.addEventListener('change', calculateCost);

  function calculateCost() {
    if (!serviceSelect || !scaleInput || !priceOutput || !durationOutput) return;

    const service = serviceSelect.value;
    const scale = parseInt(scaleInput.value) || 250;
    const location = locationSelect ? locationSelect.value : 'maitama';
    const priority = prioritySelect ? prioritySelect.value : 'standard';

    let baseRateNaira = 180000;
    let baseWeeks = 12;

    if (service === 'planning') { baseRateNaira = 30000; baseWeeks = 4; }
    else if (service === 'supplies') { baseRateNaira = 50000; baseWeeks = 2; }
    else if (service === 'merchandise') { baseRateNaira = 70000; baseWeeks = 3; }

    let locationMult = 1.0;
    if (location === 'maitama' || location === 'asokoro' || location === 'lekki') locationMult = 1.25;
    else if (location === 'guzape' || location === 'katampe' || location === 'vi') locationMult = 1.18;
    else if (location === 'interstate') locationMult = 1.20;

    let priorityMult = priority === 'express' ? 1.2 : 1.0;

    const minEst = Math.round((scale * baseRateNaira * locationMult * priorityMult) / 1000000) * 1000000;
    const maxEst = Math.round(minEst * 1.25);
    const calculatedWeeks = Math.max(2, Math.round((scale / 100) * baseWeeks * (priority === 'express' ? 0.75 : 1.0)));

    priceOutput.textContent = `₦${(minEst / 1000000).toFixed(1)}M - ₦${(maxEst / 1000000).toFixed(1)}M NGN`;
    durationOutput.textContent = `${calculatedWeeks} - ${calculatedWeeks + 4} Weeks`;
  }
  calculateCost();

  if (briefBtn) {
    briefBtn.addEventListener('click', () => {
      const modalTitle = document.getElementById('modalTitle');
      const modalBody = document.getElementById('modalBody');

      if (modalTitle && modalBody) {
        modalTitle.textContent = 'Project Estimate Brief Generated';
        modalBody.innerHTML = `
          <div style="background: var(--bg-subtle); padding: 1.5rem; border-radius: 12px; border: 1px solid var(--border-teal); margin-bottom: 1.5rem;">
            <p style="margin-bottom:0.5rem;"><strong>Estimated Budget Range:</strong> <span style="color: var(--arctic-bright); font-weight:700;">${priceOutput.textContent}</span></p>
            <p style="margin-bottom:0.5rem;"><strong>Projected Timeline:</strong> ${durationOutput.textContent}</p>
            <p style="margin-bottom:0;"><strong>Nationwide Execution:</strong> Operating Desks in Abuja & Lagos</p>
          </div>
          <p style="color: var(--text-muted); font-size:0.9rem; margin-bottom:1.5rem;">
            Our senior engineering team at Penplot Partners Construction will review your brief details and schedule a site consultation in your region.
          </p>
          <button class="btn btn-primary" style="width:100%" onclick="closeModal(); document.getElementById('contact').scrollIntoView({behavior:'smooth'});">
            Proceed to Request Official Site Consultation <i class="fas fa-arrow-right"></i>
          </button>
        `;
        openModal();
      }
    });
  }

  // ------------------------------------------------------------------------
  // 6. Portfolio Showcase Filtering & Lightbox
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      portfolioCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) card.style.display = 'block';
        else card.style.display = 'none';
      });
    });
  });

  portfolioCards.forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('.portfolio-title')?.textContent || 'Project Showcase';
      const loc = card.querySelector('.portfolio-location')?.textContent || 'Nigeria';
      const imgSrc = card.querySelector('img')?.getAttribute('src') || '';

      const modalTitle = document.getElementById('modalTitle');
      const modalBody = document.getElementById('modalBody');

      if (modalTitle && modalBody) {
        modalTitle.textContent = title;
        modalBody.innerHTML = `
          <img src="${imgSrc}" alt="${title}" style="width:100%; height:260px; object-fit:cover; border-radius:12px; margin-bottom:1.5rem;">
          <p style="color: var(--arctic-bright); font-weight:600; margin-bottom:0.5rem;"><i class="fas fa-map-marker-alt"></i> ${loc}</p>
          <p style="color: var(--text-muted); line-height:1.6; margin-bottom:1.5rem;">Fully engineered and executed under Penplot Partners Construction site administration standards.</p>
        `;
        openModal();
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. Client Portal Tracking Demo & RFP Form
  // ------------------------------------------------------------------------
  const trackBtn = document.getElementById('trackProjectBtn');
  const projectInput = document.getElementById('portalProjectId');

  if (trackBtn && projectInput) {
    trackBtn.addEventListener('click', () => {
      const id = projectInput.value.trim().toUpperCase();
      showToast(`Fetching live updates for ${id}...`);
      const fill = document.querySelector('.progress-bar-fill');
      if (fill) {
        const rand = Math.floor(Math.random() * 30) + 65;
        fill.style.width = `${rand}%`;
        const percentageText = document.getElementById('portalProgressPercent');
        if (percentageText) percentageText.textContent = `${rand}%`;
      }
    });
  }

  const rfpForm = document.getElementById('rfpForm');
  if (rfpForm) {
    rfpForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalTitle = document.getElementById('modalTitle');
      const modalBody = document.getElementById('modalBody');

      if (modalTitle && modalBody) {
        modalTitle.textContent = 'Proposal Request Received';
        modalBody.innerHTML = `
          <div style="text-align: center; padding: 1rem;">
            <i class="fas fa-check-circle" style="font-size: 3rem; color: #10B981; margin-bottom: 1rem;"></i>
            <h4 style="font-family: var(--font-heading); font-size: 1.3rem; margin-bottom: 0.5rem;">Thank You for Reaching Penplot Partners Construction</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin-bottom: 1.5rem;">
              Your inquiry has been logged in our corporate portal. Our senior project engineering team will review your specifications and reach out within 24 hours.
            </p>
            <button class="btn btn-primary" style="width:100%" onclick="closeModal()">Close Window</button>
          </div>
        `;
        openModal();
        rfpForm.reset();
      }
    });
  }

  // Modal Helpers & Partner Bio Modal Logic
  const infoModal = document.getElementById('infoModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  const partnerBios = {
    femi: {
      name: "Femi Ibrahim Sheleru",
      title: "Lead Partner | Quantity Surveyor & Supply Chain Management Specialist",
      credentials: "QSRBN Registered Quantity Surveyor • Certified PMP® (PMI)",
      bio: `
        <p><strong>Femi Ibrahim Sheleru</strong> is an accomplished and registered Quantity Surveyor and certified Project Management Professional with the Project Management Institute with extensive experience in construction cost management, project planning, contract administration, and infrastructure development. Over the course of his career, he has successfully applied his technical expertise to ensure efficient resource utilization, cost control, and value-driven project delivery.</p>
        <br>
        <p>Building on this strong foundation, Femi has transitioned into supply chain management and currently serves as a Supply Chain Manager with Centre for Integrated Health Programs. In this role, he oversees procurement, logistics, and supply chain operations that support critical health programs and interventions. His unique blend of technical, operational, and strategic management skills enables him to optimize processes, strengthen systems, and ensure the timely availability of essential commodities and services.</p>
        <br>
        <p>Femi is recognized for his professionalism, leadership, analytical thinking, and commitment to operational excellence. He is passionate about leveraging efficient supply chain systems and sound resource management practices to improve organizational performance and contribute to sustainable development outcomes.</p>
      `
    },
    mustapha: {
      name: "Engr. Mustapha A. Bello",
      title: "Partner | Head of Civil & Structural Engineering",
      credentials: "COREN Registered Engineer • Member IAENG",
      bio: `
        <p><strong>Engr. Mustapha A. Bello</strong> is a distinguished Civil and Structural Engineer registered with the Council for the Regulation of Engineering in Nigeria (COREN) and a full member of the International Association of Engineers (IAENG).</p>
        <br>
        <p>With over 15 years of industry leadership in structural analysis, heavy soil mechanics, foundation engineering, and civil highway design, Engr. Bello leads Penplot's structural integrity audits and construction site engineering teams across Abuja and Lagos operating zones.</p>
        <br>
        <p>He is committed to upholding rigorous safety standards, modern concrete technologies, and environmental compliance on all civil works and multi-story estate developments.</p>
      `
    },
    david: {
      name: "Arc. David O. Adeleke",
      title: "Partner | Architectural Design & Project Planning",
      credentials: "Principal Architect • Project Planning Lead",
      bio: `
        <p><strong>Arc. David O. Adeleke</strong> brings over a decade of expertise in architectural design, masterplanning, and urban development across Nigeria.</p>
        <br>
        <p>As Head of Architectural Design & Project Planning at Penplot Partners, he directs conceptual space planning, 3D visualization, and regulatory permit tracking with urban planning boards including FCDA (Abuja) and LASPPPA (Lagos).</p>
        <br>
        <p>He also coordinates Penplot's general consumable supplies arm, ensuring high-tensile steel rebars, cement batches, and heavy machinery logistics arrive at project sites on schedule.</p>
      `
    }
  };

  const partnerImages = {
    femi: 'assets/images/Femi Sheleru.jpeg',
    mustapha: 'assets/images/partner_mustapha_bello.png',
    david: 'assets/images/partner_david_adeleke.png'
  };

  const teamRefCards = document.querySelectorAll('.team-ref-card');
  teamRefCards.forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-partner');
      const partner = partnerBios[key];
      const imgSrc = partnerImages[key];
      if (partner && infoModal && modalTitle && modalBody) {
        modalTitle.innerHTML = `
          <div style="display: flex; align-items: center; gap: 1.25rem; margin-bottom: 0.5rem;">
            <img src="${imgSrc}" alt="${partner.name}" style="width: 65px; height: 65px; border-radius: 50%; object-fit: cover; border: 2px solid var(--arctic-bright); box-shadow: 0 0 15px var(--teal-glow); flex-shrink: 0;">
            <div>
              <span style="color: var(--arctic-bright); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.5px; display: block; font-weight: 700;">${partner.credentials}</span>
              <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin: 0; color: #FFFFFF;">${partner.name}</h3>
            </div>
          </div>
        `;
        modalBody.innerHTML = `
          <div style="color: var(--arctic-bright); font-weight: 600; font-size: 0.92rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.6rem;">${partner.title}</div>
          <div style="line-height: 1.8; color: var(--text-muted); font-size: 0.95rem;">${partner.bio}</div>
        `;
        window.openModal();
      }
    });
  });

  window.openModal = () => infoModal?.classList.add('active');
  window.closeModal = () => infoModal?.classList.remove('active');

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (infoModal) {
    infoModal.addEventListener('click', (e) => {
      if (e.target === infoModal) closeModal();
    });
  }

  function showToast(msg) {
    let toast = document.getElementById('corporateToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'corporateToast';
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--bg-card);
        border: 1px solid var(--border-teal);
        color: var(--text-main);
        padding: 0.8rem 1.5rem;
        border-radius: 10px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        font-size: 0.9rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-info-circle" style="color:var(--arctic-bright)"></i> ${msg}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(20px)';
    }, 3000);
  }
});
