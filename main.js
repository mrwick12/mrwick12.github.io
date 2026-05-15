/* ════════════════════════════════════════════════════
   AKSHAT TIWARI — Portfolio JS
   Vanilla ES6+ · No heavy frameworks
   ════════════════════════════════════════════════════ */

'use strict';

// ── CUSTOM CURSOR ──────────────────────────────────────
const cur  = document.getElementById('cur');
const ring = document.getElementById('cur-ring');

if (cur && ring) {
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px';
    cur.style.top  = my + 'px';
  });

  (function trackRing() {
    rx += (mx - rx) * .11;
    ry += (my - ry) * .11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(trackRing);
  })();

  const hoverSel = 'a,button,.kpi,.p-card,.cert-card,.sk-group,.t-card,.edu-card,.float-card';
  document.querySelectorAll(hoverSel).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
  });
}

// ── PARTICLE CANVAS ────────────────────────────────────
(function initParticles() {
  const cv  = document.getElementById('canvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  let W, H;

  const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
  resize();
  addEventListener('resize', resize);

  const N = 180;
  const pts = Array.from({ length: N }, () => ({
    x: Math.random() * 4000,
    y: Math.random() * 3000,
    vx: (Math.random() - .5) * .12,
    vy: (Math.random() - .5) * .09,
    r: Math.random() * 1.4 + .2,
    o: Math.random(),
    os: Math.random() * .006 + .002,
    c: Math.random() < .7 ? '5,245,216' : Math.random() < .5 ? '240,180,41' : '255,77,28'
  }));

  function drawFrame() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      p.o += p.os;
      if (p.o > 1 || p.o < .05) p.os *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.o * .6})`;
      ctx.fill();
    });

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 130) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(5,245,216,${(1 - d / 130) * .04})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawFrame);
  }
  drawFrame();
})();

// ── HERO 3D CANVAS (Three.js) ──────────────────────────
(function initHero3D() {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
  renderer.setClearColor(0x000000, 0);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, .1, 100);
  camera.position.z = 3.5;

  // Main torus knot — feels futuristic / 3D-portfolio-ish
  const geo  = new THREE.TorusKnotGeometry(1, .28, 180, 24, 2, 3);
  const mat  = new THREE.MeshStandardMaterial({
    color: 0x05f5d8,
    emissive: 0x024040,
    metalness: .8,
    roughness: .15,
    wireframe: false
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  // Wireframe overlay
  const wireMat  = new THREE.MeshBasicMaterial({ color: 0x05f5d8, wireframe: true, opacity: .12, transparent: true });
  const wireMesh = new THREE.Mesh(geo, wireMat);
  scene.add(wireMesh);

  // Ambient + point lights
  const ambient = new THREE.AmbientLight(0xffffff, .3);
  scene.add(ambient);

  const ptLight1 = new THREE.PointLight(0x05f5d8, 3, 10);
  ptLight1.position.set(3, 3, 3);
  scene.add(ptLight1);

  const ptLight2 = new THREE.PointLight(0xf0b429, 2, 10);
  ptLight2.position.set(-3, -2, 2);
  scene.add(ptLight2);

  const ptLight3 = new THREE.PointLight(0xff4d1c, 1.5, 10);
  ptLight3.position.set(0, -3, -2);
  scene.add(ptLight3);

  // Floating particles around the knot
  const pGeo = new THREE.BufferGeometry();
  const pCount = 300;
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i++) {
    pPos[i] = (Math.random() - .5) * 8;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({ color: 0x05f5d8, size: .025, transparent: true, opacity: .5 });
  const pMesh = new THREE.Points(pGeo, pMat);
  scene.add(pMesh);

  // Mouse parallax
  let targetRX = 0, targetRY = 0;
  const heroEl = document.getElementById('hero');
  if (heroEl) {
    heroEl.addEventListener('mousemove', e => {
      const r = heroEl.getBoundingClientRect();
      targetRY = ((e.clientX - r.left) / r.width  - .5) * .8;
      targetRX = ((e.clientY - r.top)  / r.height - .5) * .5;
    });
    heroEl.addEventListener('mouseleave', () => { targetRX = 0; targetRY = 0; });
  }

  // Resize observer
  const ro = new ResizeObserver(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
  ro.observe(canvas.parentElement);

  // Animate
  let t = 0;
  function animate() {
    t += .006;
    mesh.rotation.x  += (.3 * targetRX - mesh.rotation.x) * .06 + .003;
    mesh.rotation.y  += (.3 * targetRY - mesh.rotation.y) * .06 + .006;
    wireMesh.rotation.x = mesh.rotation.x;
    wireMesh.rotation.y = mesh.rotation.y;
    pMesh.rotation.y += .001;

    ptLight1.position.x = Math.sin(t * .7) * 3;
    ptLight1.position.y = Math.cos(t * .5) * 3;
    ptLight2.position.x = Math.cos(t * .6) * 3;
    ptLight2.position.y = Math.sin(t * .4) * -2;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── TYPED TEXT ────────────────────────────────────────
(function initTyped() {
  const el = document.getElementById('typed');
  if (!el) return;

  const phrases = [
    'Senior Software Engineer',
    'Java & Spring Boot Developer',
    'React & TypeScript Expert',
    'Docker & Cloud Enthusiast',
    'Performance Optimizer',
    'AI-powered Dev Advocate'
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const ph = phrases[pi];
    if (!deleting) {
      el.textContent = ph.slice(0, ++ci);
      if (ci === ph.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      el.textContent = ph.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 38 : 85);
  }
  type();
})();

// ── SCROLL PROGRESS BAR ───────────────────────────────
(function initScrollBar() {
  const bar = document.getElementById('bar');
  const nav = document.getElementById('nav');
  if (!bar || !nav) return;

  addEventListener('scroll', () => {
    const pct = scrollY / (document.body.scrollHeight - innerHeight) * 100;
    bar.style.width = pct + '%';
    nav.classList.toggle('compact', scrollY > 80);
  }, { passive: true });
})();

// ── SCROLL REVEAL ─────────────────────────────────────
(function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('on'); });
  }, { threshold: .08 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
})();

// ── KPI COUNTER ANIMATION ─────────────────────────────
(function initCounters() {
  const kpiEls = document.querySelectorAll('.kpi__num[data-target]');
  if (!kpiEls.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el     = e.target;
      const raw    = el.dataset.target;   // e.g. "50" or "5000"
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const target = parseFloat(raw);
      const dur    = 1800;
      const start  = performance.now();

      function step(now) {
        const progress = Math.min((now - start) / dur, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        const val      = Math.round(ease * target);
        el.textContent = prefix + val.toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: .5 });

  kpiEls.forEach(el => obs.observe(el));
})();

// ── 3D TILT ON PROJECT CARDS ──────────────────────────
(function initTilt() {
  document.querySelectorAll('.p-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rc = card.getBoundingClientRect();
      const x  = (e.clientX - rc.left) / rc.width  - .5;
      const y  = (e.clientY - rc.top)  / rc.height - .5;
      card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg) translateY(-10px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
})();

// ── MAGNETIC BUTTONS ──────────────────────────────────
(function initMagnetic() {
  document.querySelectorAll('.btn, .submit-btn').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rc = btn.getBoundingClientRect();
      const x  = (e.clientX - rc.left - rc.width  / 2) * .25;
      const y  = (e.clientY - rc.top  - rc.height / 2) * .25;
      btn.style.transform = `translate(${x}px,${y}px) translateY(-3px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
})();

// ── HAMBURGER MENU ────────────────────────────────────
(function initHamburger() {
  const burger    = document.getElementById('burger');
  const mobileNav = document.getElementById('mobile-nav');
  if (!burger || !mobileNav) return;

  function toggle(open) {
    burger.setAttribute('aria-expanded', String(open));
    mobileNav.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  burger.addEventListener('click', () => {
    const isOpen = burger.getAttribute('aria-expanded') === 'true';
    toggle(!isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => toggle(false));
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') toggle(false);
  });
})();

// ── CONTACT FORM ──────────────────────────────────────
(function initForm() {
  const btn = document.getElementById('send-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const name  = document.getElementById('fn').value.trim();
    const email = document.getElementById('fe').value.trim();
    const msg   = document.getElementById('fm').value.trim();
    const out   = document.getElementById('form-msg');

    if (!name || !email || !msg) {
      out.style.color = 'var(--fire)';
      out.textContent = '// error: all fields required';
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      out.style.color = 'var(--fire)';
      out.textContent = '// error: invalid email address';
      return;
    }

    out.style.color = 'var(--teal)';
    out.textContent = '// success: message sent — Akshat will reply soon ✓';
    document.getElementById('fn').value = '';
    document.getElementById('fe').value = '';
    document.getElementById('fm').value = '';
  });
})();

// ── STAGGER ANIMATION ON SECTION ENTRY ───────────────
(function initStagger() {
  // Stagger children of grids once parent section enters
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      Array.from(e.target.children).forEach((child, i) => {
        child.style.transitionDelay = (i * 0.08) + 's';
        child.classList.add('on');
      });
      obs.unobserve(e.target);
    });
  }, { threshold: .1 });

  document.querySelectorAll('.proj-grid, .cert-grid, .skills-layout, .kpi-grid').forEach(el => {
    // Pre-mark children as reveal
    Array.from(el.children).forEach(child => {
      if (!child.classList.contains('reveal')) child.classList.add('reveal');
    });
    obs.observe(el);
  });
})();
