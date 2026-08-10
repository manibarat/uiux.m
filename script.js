/* Portfolio interactions */
(function () {
  const isTouch = matchMedia("(hover: none)").matches;

  // --- Preloader ---
  const pre = document.querySelector(".preloader");
  const percentEl = document.querySelector(".preloader__percent");
  const bar = document.querySelector(".preloader__bar");
  if (pre) {
    let p = 0;
    document.body.classList.add("no-scroll");
    const iv = setInterval(() => {
      p += Math.random() * 12 + 4;
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(finish, 500); }
      if (percentEl) percentEl.textContent = String(Math.floor(p)).padStart(3, "0") + "%";
      if (bar) bar.style.width = p + "%";
    }, 120);
    function finish() {
      pre.classList.add("done");
      document.body.classList.remove("no-scroll");
    }
  }

  // --- Custom cursor ---
  const cursor = document.querySelector(".cursor");
  const cursorLabel = document.querySelector(".cursor__label");
  if (cursor && !isTouch) {
    let mx = 0, my = 0, cx = 0, cy = 0, lx = 0, ly = 0;
    window.addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; });
    (function tick() {
      cx += (mx - cx) * 0.2; cy += (my - cy) * 0.2;
      lx += (mx - lx) * 0.15; ly += (my - ly) * 0.15;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      if (cursorLabel) cursorLabel.style.transform =
        `translate(${lx}px, ${ly}px) translate(-50%, -180%) scale(${cursor.classList.contains("labeled") ? 1 : 0})`;
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll("a, button, .project").forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.classList.add("hover");
        const label = el.getAttribute("data-cursor");
        if (label && cursorLabel) {
          cursorLabel.textContent = label;
          cursor.classList.add("labeled");
        }
      });
      el.addEventListener("mouseleave", () => {
        cursor.classList.remove("hover", "labeled");
      });
    });
  }

  // --- Hero rotating text ---
  const rot = document.querySelector(".hero__title .rotate");
  if (rot) {
    const words = ["UI/UX Designer", "Product Designer"];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      rot.style.opacity = "0";
      rot.style.transform = "translateY(-10px)";
      setTimeout(() => {
        rot.textContent = words[i];
        rot.style.transition = "opacity .5s, transform .5s";
        rot.style.opacity = "1";
        rot.style.transform = "none";
      }, 350);
    }, 2600);
  }

  // --- Hero mouse glow ---
  const glow = document.querySelector(".hero__glow");
  const hero = document.querySelector(".hero");
  if (glow && hero && !isTouch) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      glow.style.transform = `translate(${e.clientX - r.left - 300}px, ${e.clientY - r.top - 300}px)`;
    });
  }

  // --- Reveal on scroll ---
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // --- Active nav highlight ---
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav__links a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const id = en.target.id;
        links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => spy.observe(s));

  // --- Mobile menu ---
  const burger = document.querySelector(".nav__burger");
  const menu = document.querySelector(".mobile-menu");
  if (burger && menu) {
    burger.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }

  // --- Back to top ---
  const top = document.querySelector(".footer__top");
  if (top) top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // --- Magnetic buttons ---
  if (!isTouch) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }
})();

// --- Theme toggle ---
(function () {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

// --- Project modal system ---
(function () {
  const projects = [{"num": "01", "name": "NEXUS", "cat": "Generative AI Automation Platform · UX/UI Case Study", "overview": "NEXUS unifies fragmented AI tools into one intelligent workspace where teams create content, launch campaigns, and orchestrate automated workflows without switching apps.", "problem": "Marketing and content teams juggle 6–10 disconnected AI tools, losing time to context switching, inconsistent brand output, and manual hand-offs between generation, review, and publishing.", "solution": "A modular dashboard with a Brand Hub, drag-and-drop workflow builder, and multi-model content generation (text, image, video) — all wired into a shared content library and analytics layer.", "tags": ["AI Platform", "SaaS", "Dashboard", "Workflow Automation", "UX Research"], "tools": ["Figma", "Photoshop", "Illustrator", "ChatGPT"], "image": "assets/nexus.png", "behance": "https://www.behance.net/gallery/247350391/NEXUS-Automation-Gen-AI-Platform-UXUI-Case-Study"}, {"num": "02", "name": "Assassin's Creed", "cat": "Gamified Interactive Website · UX/UI Case Study", "overview": "A concept marketing site that turns the Assassin's Creed lore into an immersive, scroll-driven story — introducing characters, eras, and factions through cinematic transitions.", "problem": "Traditional gaming landing pages feel like static press kits. Fans want atmosphere, discovery, and lore — not a spec sheet.", "solution": "A dark, cinematic layout with parallax layers, character reveal transitions, and a gamified navigation system that rewards exploration with fragments of story.", "tags": ["Gaming UI", "Web Design", "Gamification", "Interaction Design", "Cinematic"], "tools": ["Figma", "Photoshop", "Illustrator"], "image": "assets/assassins-creed.png", "behance": "https://www.behance.net/gallery/249042107/Gaming-Website"}, {"num": "03", "name": "LUMI", "cat": "AR Powered Skincare Analysis App · UX/UI Case Study", "overview": "LUMI uses the phone camera and augmented reality to scan the user's skin, map concerns, and translate them into a personalised routine and curated product shelf.", "problem": "Shopping for skincare online is overwhelming and generic — users can't tell what actually fits their skin without expensive consultations or endless trial-and-error.", "solution": "An AR scanner with real-time skin mapping, a guided onboarding flow, and a personalised dashboard that evolves as the user tracks progress and results.", "tags": ["Augmented Reality", "Mobile App", "E-Commerce", "UX Research", "Personalisation"], "tools": ["Figma", "Photoshop", "Illustrator"], "image": "assets/lumi.png", "behance": "https://www.behance.net/gallery/250290639/LUMI-AR-Powered-Skincare-Analysis"}, {"num": "04", "name": "COSMOS", "cat": "Apple Vision Pro · Spatial Computing · UX/UI Case Study", "overview": "COSMOS lets users journey through planets, nebulae, galaxies and black holes at human scale — designed natively for the spatial canvas of Apple Vision Pro.", "problem": "Learning about the universe on a flat screen is passive. Existing space apps rely on scrollable text and 2D imagery that fail to convey scale, depth or wonder.", "solution": "A gaze-and-pinch spatial interface with floating information panels, scale-aware travel, and cinematic narration — turning knowledge into an experience you stand inside.", "tags": ["Spatial UI", "Vision Pro", "VR", "Interaction Design", "Concept"], "tools": ["Figma", "Photoshop", "Illustrator"], "image": "assets/cosmos.jpg", "behance": "https://www.behance.net/gallery/252286293/COSMOS-Interactive-Universe-Explorer-for-Vision-Pro"}, {"num": "05", "name": "HUMM", "cat": "AI Mood Detection Music App · UX/UI Case Study", "overview": "HUMM reads emotional cues through AI mood detection and turns them into a living soundtrack — building playlists that adapt to the user's state throughout the day.", "problem": "Music apps recommend based on listening history and genres, not on how a person feels right now. Users spend more time searching for the right mood than listening.", "solution": "A mood-first interface with real-time AI emotion analysis, an animated mood orb, adaptive playlists, and a mood history dashboard that reveals emotional patterns over time.", "tags": ["AI", "Mobile App", "Music", "Emotion Detection", "UX Research"], "tools": ["Figma", "Photoshop", "Illustrator"], "image": "assets/humm.png", "behance": "https://www.behance.net/gallery/253946697/HUMM-AI-Mood-Detection-Music-App-UXUI-Case-Study"}, {"num": "06", "name": "Parallax Gaming Website", "cat": "Cinematic Parallax Website · Interactive Prototype", "overview": "", "problem": "", "solution": "", "tags": ["Parallax", "Gaming", "Cinematic", "Web Design", "Prototype"], "tools": ["Figma", "Photoshop"], "image": "assets/treasure-verse.png", "behance": "", "externalUrl": "https://www.figma.com/proto/lmtJKVFpz8TTiSsaTG3P6x/Untitled?node-id=83-56&starting-point-node-id=83%3A56&t=vCJ1z0fNERARmRoX-1"}];
  const modalHTML = `
    <div class="modal" aria-hidden="true">
      <div class="modal__backdrop"></div>
      <div class="modal__inner">
        <button class="modal__close" aria-label="Close">×</button>
        <div class="modal__media"></div>
        <div class="modal__content">
          <div class="modal__num"></div>
          <h2 class="modal__title"></h2>
          <div class="modal__cat"></div>
          <div class="modal__body"></div>
          <div class="modal__meta"></div>
          <a class="btn btn--primary modal__cta" href="#" target="_blank" rel="noopener noreferrer">View Case Study <span class="arrow">↗</span></a>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  const modal = document.querySelector('.modal');
  const closeBtn = modal.querySelector('.modal__close');
  const backdrop = modal.querySelector('.modal__backdrop');

  function open(p) {
    modal.querySelector('.modal__media').innerHTML = '<img src="' + p.image + '" alt="' + p.name + '" />';
    modal.querySelector('.modal__num').textContent = p.num + ' / 0' + projects.length;
    modal.querySelector('.modal__title').textContent = p.name;
    modal.querySelector('.modal__cat').textContent = p.cat;
    const body = [];
    if (p.overview) body.push('<h4>Overview</h4><p>' + p.overview + '</p>');
    if (p.problem) body.push('<h4>Problem</h4><p>' + p.problem + '</p>');
    if (p.solution) body.push('<h4>Solution</h4><p>' + p.solution + '</p>');
    modal.querySelector('.modal__body').innerHTML = body.join('');
    const meta = [];
    if (p.tags && p.tags.length) meta.push('<div class="modal__block"><h5>Tags</h5><div class="modal__tags">' + p.tags.map(t => '<span>' + t + '</span>').join('') + '</div></div>');
    if (p.tools && p.tools.length) meta.push('<div class="modal__block"><h5>Tools</h5><div class="modal__tools">' + p.tools.map(t => '<span>' + t + '</span>').join('') + '</div></div>');
    modal.querySelector('.modal__meta').innerHTML = meta.join('');
    const cta = modal.querySelector('.modal__cta');
    if (p.behance) { cta.href = p.behance; cta.style.display = ''; }
    else { cta.style.display = 'none'; }
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('open');
    document.body.classList.add('no-scroll');
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  }
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  document.querySelectorAll('.project').forEach(function (el) {
    const idx = parseInt(el.querySelector('.project__num').textContent.split('/')[0].trim(), 10) - 1;
    const p = projects[idx];
    el.addEventListener('click', function () {
      if (p.externalUrl) {
        window.open(p.externalUrl, '_blank', 'noopener,noreferrer');
      } else {
        open(p);
      }
    });
    const v = el.querySelector('video');
    if (v) {
      el.addEventListener('mouseenter', function () { v.currentTime = 0; v.play().catch(function(){}); });
      el.addEventListener('mouseleave', function () { v.pause(); });
    }
  });
})();
