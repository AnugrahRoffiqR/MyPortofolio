import * as THREE from 'three';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const COMMENTS_STORAGE_KEY = 'nugi_portfolio_comments_v1';
const EMAIL_ADDRESS = 'nugi5555.a@gmail.com';

/* ========================================================================
   Brand & Tech Icons (Inline SVG — zero external asset failures)
   ======================================================================== */
const TECH_ICONS = {
  HTML5: '<svg viewBox="0 0 32 32" fill="none"><path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#E44D26"/><path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529"/><path d="M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z" fill="#fff"/></svg>',
  CSS3: '<svg viewBox="0 0 32 32" fill="none"><path d="M5.9 27.2L3.7 2H28.3L26.1 27.2L16 30L5.9 27.2Z" fill="#1572B6"/><path d="M16 27.9L24.2 25.6L26.1 4.1H16V27.9Z" fill="#33A9DC"/><path d="M16 13.2H20.1L20.4 10H16V6.9H23.7L22.9 16.3H16V13.2ZM16 21.2L12.6 20.3L12.3 17.8H9.2L9.7 22.7L16 24.4V21.2Z" fill="#fff"/><path d="M19.8 16.2L19.5 20.3L16 21.2V24.4L22.3 22.7L22.9 16.2H19.8ZM16 6.9V10H8.6L8.3 6.9H16ZM16 13.2V16.3H12.6L12.3 13.2H16Z" fill="#EBEBEB"/></svg>',
  JavaScript: '<svg viewBox="0 0 32 32" fill="none"><rect x="2" y="2" width="28" height="28" rx="4" fill="#F5DE19"/><path d="M20.8 23.9a2.8 2.8 0 0 0 2.6 1.6c1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-1.9-1.7l-.7-.3c-1.9-.8-3.2-1.8-3.2-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.7 2.1l-2 1.3a1.8 1.8 0 0 0-1.7-1.1c-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.6 1.6l.7.3c2.2 1 3.5 1.9 3.5 4.1 0 2.4-1.9 3.7-4.4 3.7a5 5 0 0 1-4.8-2.7l1.9-1.2zm-9.3.2c.4.7.8 1.4 1.7 1.4.9 0 1.4-.3 1.4-1.7V14.9h2.6v9c0 2.7-1.6 4-3.9 4a4.1 4.1 0 0 1-3.9-2.4l2.1-1.4z" fill="#111"/></svg>',
  Figma: '<svg viewBox="0 0 32 32" fill="none"><path d="M11.5 28a4.5 4.5 0 0 0 4.5-4.5V19h-4.5a4.5 4.5 0 0 0 0 9z" fill="#0ACF83"/><path d="M7 14.5A4.5 4.5 0 0 1 11.5 10H16v9h-4.5A4.5 4.5 0 0 1 7 14.5z" fill="#A259FF"/><path d="M7 6.5A4.5 4.5 0 0 1 11.5 2H16v9h-4.5A4.5 4.5 0 0 1 7 6.5z" fill="#F24E1E"/><path d="M16 2h4.5a4.5 4.5 0 1 1 0 9H16V2z" fill="#FF7262"/><path d="M25 14.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z" fill="#1ABCFE"/></svg>',
  Git: '<svg viewBox="0 0 32 32" fill="none"><path d="M29.4 14.6L17.4 2.6a2 2 0 0 0-2.8 0l-2.5 2.5 3.1 3.1a2.4 2.4 0 0 1 3 3l3 3a2.4 2.4 0 1 1-1.4 1.3l-2.8-2.8v7.4a2.4 2.4 0 1 1-2 0v-7.5a2.4 2.4 0 0 1-1.3-3.1l-3.1-3.1-8 8a2 2 0 0 0 0 2.8l12 12a2 2 0 0 0 2.8 0l11.9-11.9a2 2 0 0 0 0-2.8z" fill="#F05032"/></svg>',
  GitHub: '<svg viewBox="0 0 24 24" fill="#ffffff"><path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.11.79-.25.79-.55v-2.16c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.74.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.05 0 0 .97-.31 3.16 1.18a10.95 10.95 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.63 1.58.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.07.78 2.15v3.19c0 .31.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z"/></svg>',
  Express: '<svg viewBox="0 0 32 32" fill="none"><rect x="2.5" y="4.5" width="27" height="23" rx="6" fill="#0F172A" stroke="#64748B" stroke-width="1.4"/><path d="M7.5 20.5v-9h6.2v1.8H9.5v1.8h3.6v1.7H9.5v1.9h4.4v1.8H7.5zm8.3 0 3.1-4.6-2.9-4.4h2.3l1.8 2.9 1.8-2.9h2.2l-2.9 4.4 3.1 4.6h-2.3l-2-3.1-2 3.1h-2.2z" fill="#F8FAFC"/></svg>',
  'Node.js': '<svg viewBox="0 0 32 32" fill="none"><path d="M16 2.4 27.8 9.2v13.6L16 29.6 4.2 22.8V9.2L16 2.4Z" fill="#539E43"/><path d="M11.6 10.6h2.2v7.6c0 1.8-.9 2.9-2.8 2.9-.8 0-1.6-.2-2.2-.6l.7-1.7c.4.2.9.4 1.3.4.6 0 .8-.3.8-1.1v-7.5zm4.5 8.1 1.4-1.5c.7.6 1.5 1 2.4 1 .9 0 1.4-.4 1.4-1 0-.6-.5-.9-1.7-1.2-1.8-.5-3-1.1-3-2.9 0-1.7 1.4-2.9 3.4-2.9 1.3 0 2.4.4 3.2 1.1l-1.3 1.5c-.6-.5-1.3-.8-2-.8-.8 0-1.2.4-1.2.9 0 .6.4.9 1.7 1.2 1.9.5 3.1 1.1 3.1 3 0 1.8-1.4 3-3.7 3-1.4 0-2.7-.5-3.5-1.4z" fill="#fff"/></svg>',
  PostgreSQL: '<svg viewBox="0 0 32 32" fill="none"><path d="M22.7 5.2c-2.5-.3-4.6.7-5.8 1.6-1.2-.5-2.6-.7-4.1-.5-4.3.5-7.4 4.1-7.4 8.7 0 2.5.9 5.5 2.4 7.7.9 1.3 2 2 2.9 1.9.9-.1 1.5-.9 1.5-2.2v-2.1c1.1.5 2.4.7 3.7.5v3.9c0 2.1 1.1 3.6 2.9 3.6 1.9 0 3.2-1.5 3.4-4 .1-1 .1-2.3.1-3.4.5-.8 1-1.9 1.3-3.2.5.1 1 .1 1.6-.1 1.7-.7 2.8-2.6 2.4-4.7-.4-2.1-2-3.5-3.8-3.6-.3-1.9-1.1-3.8-1.1-4.1z" fill="#336791"/><path d="M16.9 6.8c2.2-1.3 4.8-1.7 6.3-.3 1.3 1.2 1.6 3.7 1.1 6.7-.4 2.5-1.4 5.1-2.1 6.7-.5 1.1-.8 2.8-.9 4.5-.1 1.6-.9 2.8-2 2.8-1.2 0-1.9-1.1-1.9-2.8V19c-1.5.5-3.4.4-4.8-.3v3.5c0 1.4-.7 2.2-1.7 2.1-.9-.1-1.9-.9-2.7-2.2-1.3-2.1-2-4.8-1.8-7.4.3-4 2.9-7.1 6.8-7.5 1.4-.2 2.6.1 3.7.6z" stroke="#E0F2FE" stroke-width="1.35" stroke-linejoin="round"/><circle cx="13.2" cy="13.2" r="1.15" fill="#fff"/><circle cx="19.1" cy="13.2" r="1.15" fill="#fff"/></svg>',
  Vercel: '<svg viewBox="0 0 32 32" fill="none"><path d="M16 5L29 27H3L16 5z" fill="#ffffff"/></svg>',
  'GitHub Pages': '<svg viewBox="0 0 32 32" fill="none"><rect x="3" y="5" width="26" height="22" rx="4.5" fill="#1D4ED8" stroke="#60A5FA" stroke-width="1.2"/><path d="M3 10.5h26" stroke="#93C5FD" stroke-width="1.4"/><circle cx="7.2" cy="7.8" r="1.1" fill="#E0F2FE"/><circle cx="10.6" cy="7.8" r="1.1" fill="#E0F2FE"/><rect x="7.5" y="14.2" width="17" height="2.4" rx="1.2" fill="#E0F2FE"/><rect x="7.5" y="19" width="11.5" height="2.4" rx="1.2" fill="#93C5FD"/></svg>',
  'VS Code': '<svg viewBox="0 0 32 32" fill="none"><path d="M23.5 3.5l5 2.4v20.2l-5 2.4L10 17.3l-4.7 3.6L3 19.6V12.4l2.3-1.3L10 14.7 23.5 3.5z" fill="#007ACC"/><path d="M23.5 3.5l5 2.4v20.2l-5 2.4V3.5z" fill="#0065A9"/><path d="M10 17.3l13.5 11.2V3.5L10 14.7v2.6z" fill="#1F9CF0" opacity="0.85"/></svg>',
};

const PROJECTS = [
  {
    id: 'manajemen-tugas-web',
    title: 'Manajemen Tugas Web',
    shortDesc:
      'Aplikasi web workspace manajemen tugas tim dengan alur peran Owner & Member, pengingat deadline otomatis, dan analitik penyelesaian.',
    fullDesc:
      'Manajemen Tugas Web adalah aplikasi fullstack berbasis Express dan PostgreSQL untuk mengatur daftar tugas tim secara terstruktur. Mendukung manajemen status tugas, pengingat tenggat waktu, statistik progres real-time melalui grafik, serta halaman autentikasi terlindungi.',
    thumbnail: 'assets/work-tasks.webp',
    liveUrl: 'https://manajemen-tugas-web.vercel.app',
    repoUrl: 'https://github.com/AnugrahRoffiqR/manajemen-tugas-web',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Express', 'PostgreSQL', 'Vercel'],
  },
  {
    id: 'landing-page-store',
    title: 'Landing Page Store',
    shortDesc:
      'Halaman pendaratan etalase toko online dengan hierarki promo utama, susunan produk terstruktur, dan tata letak responsif.',
    fullDesc:
      'Projek landing page ini berfokus pada bagaimana menyajikan hero banner promo, daftar produk, serta bagian ajakan bertindak (CTA) agar terlihat rapi dan mudah dipindai pengunjung pada layar desktop maupun perangkat seluler.',
    thumbnail: 'assets/work-store.webp',
    liveUrl: 'https://anugrahroffiqr.github.io/MyLandingPageStore/',
    repoUrl: 'https://github.com/AnugrahRoffiqR/MyLandingPageStore',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
  },
  {
    id: 'landing-page-marvel',
    title: 'Landing Page Marvel',
    shortDesc:
      'Eksperimen halaman showcase bertema pahlawan super dengan komposisi gelap dramatis, galeri visual, dan antarmuka responsif.',
    fullDesc:
      'Projek latihan eksplorasi UI yang menggabungkan palet warna bertema sinematik, pengelompokan konten karakter secara visual, serta pengaturan jarak dan tipografi judul agar tampilan tetap seimbang di berbagai ukuran layar.',
    thumbnail: 'assets/work-marvel.webp',
    liveUrl: 'https://anugrahroffiqr.github.io/MyLandingPageMarvel/',
    repoUrl: 'https://github.com/AnugrahRoffiqR/MyLandingPageMarvel',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
  },
  {
    id: 'kalkulator-sederhana',
    title: 'Kalkulator Sederhana',
    shortDesc:
      'Aplikasi kalkulator web interaktif dengan grid tombol presisi, dukungan operasi aritmetika, dan umpan balik status aktif.',
    fullDesc:
      'Dibangun untuk melatih logika JavaScript DOM serta kerapian CSS Grid. Menyediakan tombol angka dan operator yang nyaman diklik, layar pratinjau hasil yang mudah dibaca, serta penanganan reset dan koreksi input secara langsung.',
    thumbnail: 'assets/work-calculator.webp',
    liveUrl: 'https://anugrahroffiqr.github.io/MyCalculator/',
    repoUrl: 'https://github.com/AnugrahRoffiqR/MyCalculator',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'GitHub Pages'],
  },
  {
    id: 'halaman-login',
    title: 'Halaman Login',
    shortDesc:
      'Desain antarmuka formulir masuk yang bersih dengan fokus pada keterbacaan label, keselarasan kartu, dan ergonomi input.',
    fullDesc:
      'Eksperimen komponen UI autentikasi untuk mengasah kepekaan terhadap spasi, ukuran tombol, kontras kolom masukan, dan keterpaduan visual di tengah layar secara konsisten pada desktop hingga ponsel.',
    thumbnail: 'assets/work-login.webp',
    liveUrl: 'https://anugrahroffiqr.github.io/MyHalamanLogin/',
    repoUrl: 'https://github.com/AnugrahRoffiqR/MyHalamanLogin',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'GitHub Pages'],
  },
];

const DESIGN_ITEMS = [
  {
    meta: 'UI Systems & Figma',
    title: 'Struktur Wireframe & Hierarki Visual',
    desc: 'Merancang kerangka tata letak di Figma sebelum menulis kode CSS, memastikan konsistensi spasi, skala huruf, dan titik fokus utama setiap bagian halaman.',
    tags: ['Figma', 'Visual Hierarchy', 'Typography Scale'],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 9h18M9 21V9"/></svg>',
  },
  {
    meta: 'Product UI',
    title: 'Desain Dashboard & Kartu Aksi',
    desc: 'Mengutamakan kejelasan informasi pada Manajemen Tugas Web: membedakan kartu ringkasan, lencana tenggat waktu, serta tombol tindakan sesuai peran pengguna.',
    tags: ['Dashboard UX', 'Status Badges', 'Clarity'],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  },
  {
    meta: 'Responsive Craft',
    title: 'Ergonomi Form & Mobile Adaptation',
    desc: 'Memastikan ukuran area sentuh nyaman di ponsel, fokus keyboard terlihat jelas, dan grid beralih rapi tanpa pergeseran tata letak horizontal.',
    tags: ['Mobile-First', 'Form UX', 'Accessibility'],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" x2="12.01" y1="18" y2="18"/></svg>',
  },
];

const LEARNING_ITEMS = [
  {
    meta: 'Tahap 01 • Sekolah & Dasar',
    title: 'Dasar Pemrograman & Web Semantik',
    desc: 'Memulai perjalanan sebagai siswa PPLG di SMK Skill Village Islamic School dengan mempelajari struktur HTML5, gaya CSS Grid/Flexbox, dan logika dasar JavaScript.',
    tags: ['HTML5', 'CSS3', 'DOM Logic'],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>',
  },
  {
    meta: 'Tahap 02 • Kolaborasi & Publikasi',
    title: 'Alur Kerja Git & Publikasi Proyek',
    desc: 'Membiasakan dokumentasi projek, pencatatan perubahan lewat Git/GitHub, serta merilis eksperimen landing page dan aplikasi ringan melalui GitHub Pages.',
    tags: ['Git Workflow', 'GitHub Pages', 'Documentation'],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" x2="6" y1="9" y2="21"/></svg>',
  },
  {
    meta: 'Tahap 03 • Eksplorasi Fullstack & Gim',
    title: 'Integrasi Backend & Eksplorasi Gim',
    desc: 'Melangkah ke API server dasar dengan Express dan PostgreSQL pada Manajemen Tugas Web sembari terus mengeksplorasi minat di desain antarmuka dan pengembangan gim.',
    tags: ['Express', 'PostgreSQL', 'Game Interest'],
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>',
  },
];

const TECH_STACK_LIST = [
  'HTML5',
  'CSS3',
  'JavaScript',
  'Figma',
  'Git',
  'GitHub',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Vercel',
  'GitHub Pages',
  'VS Code',
];

/* ========================================================================
   WebAudio UI SFX & Lo-Fi Ambient Synth
   ======================================================================== */
const AudioEngine = (() => {
  let ctx = null;
  let sfxEnabled = true;

  function ensureContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function playClick(freq = 640, duration = 0.055) {
    if (!sfxEnabled) return;
    const c = ensureContext();
    if (!c) return;
    try {
      const now = c.currentTime;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, now + duration);
      gain.gain.setValueAtTime(0.035, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + duration + 0.01);
    } catch {
      // Ignore audio gesture restrictions silently
    }
  }

  return {
    ensureContext,
    playClick,
    isSfxEnabled: () => sfxEnabled,
    toggleSfx: () => {
      sfxEnabled = !sfxEnabled;
      if (sfxEnabled) playClick(720, 0.07);
      return sfxEnabled;
    },
  };
})();

/* ========================================================================
   Preloader (Real Asset & Runtime Readiness Telemetry)
   ======================================================================== */
let resolveLanyardReady = () => {};
const lanyardReadyPromise = new Promise((resolve) => {
  resolveLanyardReady = resolve;
});

function collectCriticalImages() {
  const urls = new Set(['assets/portrait-about.webp', 'assets/portrait-spiderman.webp']);
  document.querySelectorAll('img[src]').forEach((img) => {
    if (img.loading !== 'lazy' && img.getAttribute('src')) {
      urls.add(img.getAttribute('src'));
    }
  });
  return [...urls];
}

function preloadImageUrl(src, timeoutMs = 1500) {
  return new Promise((resolve) => {
    const existing = [...document.images].find((img) => img.getAttribute('src') === src);
    if (existing && existing.complete && existing.naturalWidth > 0) {
      resolve();
      return;
    }
    const probe = new Image();
    let settled = false;
    const done = () => {
      if (settled) return;
      settled = true;
      resolve();
    };
    const timer = window.setTimeout(done, timeoutMs);
    probe.addEventListener('load', () => {
      window.clearTimeout(timer);
      done();
    }, { once: true });
    probe.addEventListener('error', () => {
      window.clearTimeout(timer);
      done();
    }, { once: true });
    probe.src = src;
  });
}

function initPreloader() {
  const curtain = document.getElementById('welcome-screen');
  const numEl = document.getElementById('welcome-percent-num');
  const barEl = document.getElementById('welcome-progress-bar');
  const headEl = document.getElementById('welcome-progress-head');
  const trackEl = barEl?.parentElement;
  const statusEl = document.getElementById('welcome-status-text');
  if (!curtain) return;

  const setStatus = (pct) => {
    const clean = Math.max(0, Math.min(100, Math.round(pct)));
    if (numEl) numEl.textContent = String(clean).padStart(2, '0');
    if (barEl) barEl.style.transform = `scaleX(${clean / 100})`;
    if (headEl) headEl.style.left = `${clean}%`;
    if (trackEl) trackEl.classList.toggle('is-active', clean > 1 && clean < 100);
    if (statusEl) {
      if (clean < 42) statusEl.textContent = 'Memuat tipografi & layout...';
      else if (clean < 78) statusEl.textContent = 'Menyiapkan potret & aset...';
      else if (clean < 100) statusEl.textContent = 'Inisialisasi panggung 3D...';
      else statusEl.textContent = 'Siap ditampilkan';
    }
  };

  if (REDUCED_MOTION) {
    setStatus(100);
    curtain.classList.add('is-leaving');
    curtain.setAttribute('aria-hidden', 'true');
    return;
  }

  let targetProgress = 18;
  let displayProgress = 0;
  let finished = false;
  const startedAt = performance.now();

  const bumpTarget = (next) => {
    if (next > targetProgress) targetProgress = Math.min(100, next);
  };

  if (document.readyState !== 'loading') bumpTarget(32);
  else document.addEventListener('DOMContentLoaded', () => bumpTarget(32), { once: true });

  Promise.resolve(document.fonts?.ready).then(() => bumpTarget(56)).catch(() => bumpTarget(56));

  const imgTasks = collectCriticalImages().map((url) => preloadImageUrl(url, 1500));
  Promise.all(imgTasks).then(() => bumpTarget(80));

  const loadPromise = document.readyState === 'complete'
    ? Promise.resolve()
    : new Promise((resolve) => window.addEventListener('load', resolve, { once: true }));

  const lanyardBounded = Promise.race([
    lanyardReadyPromise,
    new Promise((resolve) => window.setTimeout(resolve, 1100)),
  ]);

  Promise.all([
    loadPromise,
    lanyardBounded,
    Promise.all(imgTasks),
    Promise.resolve(document.fonts?.ready).catch(() => {}),
  ]).then(() => bumpTarget(100));

  // Failsafe ceiling so external CDNs can never freeze entrance
  window.setTimeout(() => bumpTarget(100), 2100);

  const finishPreloader = () => {
    if (finished) return;
    finished = true;
    setStatus(100);
    window.setTimeout(() => {
      curtain.classList.add('is-leaving');
      curtain.setAttribute('aria-hidden', 'true');
      revealVisibleOnLoad();
    }, 150);
  };

  const tick = (now) => {
    const elapsed = now - startedAt;
    const minVisualGate = elapsed >= 340;
    const effectiveTarget = targetProgress >= 100 && !minVisualGate ? 94 : targetProgress;

    const gap = effectiveTarget - displayProgress;
    if (gap > 0.05) {
      const rate = effectiveTarget >= 100 ? 0.24 : 0.14;
      displayProgress += Math.max(gap * rate, 0.9);
      if (displayProgress > effectiveTarget) displayProgress = effectiveTarget;
    }

    setStatus(displayProgress);

    if (targetProgress >= 100 && minVisualGate && displayProgress >= 99.4) {
      finishPreloader();
      return;
    }
    window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
}

/* ========================================================================
   Navbar Scrollspy, Active Pill, Mobile Drawer & SFX Toggle
   ======================================================================== */
function initNavbar() {
  const navbar = document.getElementById('site-navbar');
  const desktopNav = document.getElementById('navbar-desktop-links');
  const pill = document.getElementById('navbar-active-pill');
  const links = [...document.querySelectorAll('.navbar-link-item')];
  const mobileLinks = [...document.querySelectorAll('.navbar-mobile-link')];
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('navbar-mobile-menu');
  const sfxBtn = document.getElementById('sfx-toggle-btn');
  const sfxIconOn = document.getElementById('sfx-icon-on');
  const sfxIconOff = document.getElementById('sfx-icon-off');

  let activeId = 'Home';

  function positionPill(targetLink) {
    if (!pill || !desktopNav || !targetLink || desktopNav.offsetParent === null) return;
    pill.style.width = `${targetLink.offsetWidth}px`;
    pill.style.height = `${targetLink.offsetHeight}px`;
    pill.style.transform = `translate3d(${targetLink.offsetLeft}px, ${targetLink.offsetTop}px, 0)`;
    pill.style.opacity = '1';
  }

  function setActiveNav(id) {
    activeId = id;
    links.forEach((a) => {
      const match = a.dataset.nav === id;
      a.classList.toggle('is-active', match);
      if (match) positionPill(a);
    });
    mobileLinks.forEach((a) => {
      a.classList.toggle('is-active', a.dataset.nav === id);
    });
  }

  const initialActive = links.find((a) => a.classList.contains('is-active')) || links[0];
  window.requestAnimationFrame(() => positionPill(initialActive));
  window.addEventListener('resize', () => {
    const cur = links.find((a) => a.dataset.nav === activeId);
    positionPill(cur);
  });

  links.forEach((a) => {
    a.addEventListener('click', () => {
      AudioEngine.playClick(680, 0.05);
      setActiveNav(a.dataset.nav);
    });
  });

  // Scroll state & Section Scrollspy
  const sections = ['Home', 'About', 'Portofolio', 'Contact']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function onScroll() {
    if (navbar) {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 36);
    }
    const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 40;
    let current = sections[0]?.id || 'Home';
    if (nearBottom) {
      current = 'Contact';
    } else {
      const triggerViewportY = window.innerHeight * 0.42;
      for (const sec of sections) {
        if (sec.getBoundingClientRect().top <= triggerViewportY) {
          current = sec.id;
        }
      }
    }
    if (current !== activeId) setActiveNav(current);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile Menu Drawer
  if (mobileToggle && mobileMenu) {
    const closeMenu = () => {
      mobileMenu.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    };
    mobileToggle.addEventListener('click', () => {
      AudioEngine.playClick(600, 0.05);
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        AudioEngine.playClick(660, 0.05);
        closeMenu();
      });
    });
  }

  // SFX Toggle
  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      const enabled = AudioEngine.toggleSfx();
      sfxBtn.setAttribute('aria-pressed', String(enabled));
      sfxBtn.classList.toggle('is-muted', !enabled);
      sfxBtn.title = enabled ? 'Matikan Suara SFX' : 'Aktifkan Suara SFX';
      if (sfxIconOn) sfxIconOn.style.display = enabled ? 'block' : 'none';
      if (sfxIconOff) sfxIconOff.style.display = enabled ? 'none' : 'block';
    });
  }
}

/* ========================================================================
   Particle Starfield Canvas (Multi-Layer Rising Stars & Depth Parallax)
   ======================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  const isSmallViewport = () => window.innerWidth < 768;
  const isLowPowerDevice =
    typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;

  // Pre-render soft circular cosmic snow-dust sprites (diffuse core + gentle atmospheric halo)
  const createDustSprite = (coreRgb, haloRgb, haloAlpha) => {
    const size = 48;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const sctx = c.getContext('2d');
    if (!sctx) return c;
    const half = size * 0.5;
    const g = sctx.createRadialGradient(half, half, 0, half, half, half);
    g.addColorStop(0, `rgba(${coreRgb}, 1)`);
    g.addColorStop(0.18, `rgba(${coreRgb}, 0.84)`);
    g.addColorStop(0.38, `rgba(${haloRgb}, ${haloAlpha})`);
    g.addColorStop(0.68, `rgba(${haloRgb}, ${(haloAlpha * 0.28).toFixed(3)})`);
    g.addColorStop(1, `rgba(${haloRgb}, 0)`);
    sctx.fillStyle = g;
    sctx.fillRect(0, 0, size, size);
    return c;
  };

  const sprites = {
    snowWhite: createDustSprite('255, 255, 255', '238, 246, 255', 0.34),
    softBlue: createDustSprite('232, 244, 255', '147, 197, 253', 0.38),
    subtleCyan: createDustSprite('224, 249, 255', '103, 232, 249', 0.36),
  };

  let w = 0;
  let h = 0;
  let dust = [];
  let pointerTargetX = 0;
  let pointerTargetY = 0;
  let pointerCurX = 0;
  let pointerCurY = 0;
  let pointerActive = false;
  let rafId = 0;
  let lastTs = 0;
  let simClock = 0;

  const smoothEdge = (v) => {
    const clamped = Math.max(0, Math.min(1, v));
    return clamped * clamped * (3 - 2 * clamped);
  };

  function getTargetParticleCount() {
    const mobile = isSmallViewport();
    if (mobile) return isLowPowerDevice ? 85 : 115;
    return isLowPowerDevice ? 180 : 255;
  }

  function createParticlesForViewport() {
    const total = getTargetParticleCount();
    const list = [];

    // 3 spatial depth layers: far micro-dust (48%), mid floating dust (36%), near soft-glow motes (16%)
    for (let i = 0; i < total; i += 1) {
      const roll = i / total;
      let layer = 0;
      if (roll > 0.84) layer = 2;
      else if (roll > 0.48) layer = 1;

      const depth =
        layer === 0
          ? 0.18 + Math.random() * 0.2
          : layer === 1
            ? 0.44 + Math.random() * 0.26
            : 0.76 + Math.random() * 0.32;

      // Gentle upward float speeds (~10-16 px/s far, ~18-27 px/s mid, ~28-40 px/s near)
      const baseSpeed = layer === 0 ? 0.011 : layer === 1 ? 0.021 : 0.034;
      const speedY = -(baseSpeed + depth * 0.012 + (Math.random() - 0.5) * 0.004);

      // Organic lateral drift (some particles drift left, some right) + soft sway eddy
      const driftSign = Math.random() > 0.5 ? 1 : -1;
      const driftX = driftSign * (0.0018 + Math.random() * 0.0068) * (0.65 + depth * 0.6);
      const wobbleAmpX = (0.003 + Math.random() * 0.008) * (0.6 + depth * 0.55);
      const wobbleFreq = 0.24 + Math.random() * 0.44;
      const phase = Math.random() * Math.PI * 2;
      const twinkleSpeed = 0.48 + Math.random() * 1.15;
      const twinkleDepth = layer === 0 ? 0.22 : layer === 1 ? 0.3 : 0.36;

      // Soft snow-dust speck radii: tiny, small, and occasional slightly larger luminous motes
      const radius =
        layer === 0
          ? 0.7 + Math.random() * 0.55
          : layer === 1
            ? 1.15 + Math.random() * 0.75
            : 1.85 + Math.random() * 1.05;

      const baseAlpha =
        layer === 0
          ? 0.16 + Math.random() * 0.22
          : layer === 1
            ? 0.32 + Math.random() * 0.3
            : 0.48 + Math.random() * 0.32;

      // Dominant white + light ice-blue + occasional subtle cyan
      const tintRoll = Math.random();
      const sprite =
        tintRoll > 0.84
          ? sprites.subtleCyan
          : tintRoll > 0.46
            ? sprites.softBlue
            : sprites.snowWhite;

      list.push({
        x: Math.random(),
        y: Math.random(),
        layer,
        depth,
        radius,
        baseAlpha,
        speedY,
        driftX,
        wobbleAmpX,
        wobbleFreq,
        phase,
        twinkleSpeed,
        twinkleDepth,
        sprite,
        glowScale: layer === 2 ? 3.1 : layer === 1 ? 2.55 : 2.15,
      });
    }
    return list;
  }

  function resize() {
    const mobile = isSmallViewport();
    const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, isLowPowerDevice ? 1.5 : 2);
    w = Math.max(1, window.innerWidth);
    h = Math.max(1, window.innerHeight);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const expectedCount = getTargetParticleCount();
    if (dust.length !== expectedCount) {
      dust = createParticlesForViewport();
    }
    if (REDUCED_MOTION) drawFrame(0);
  }

  function drawFrame(dt) {
    ctx.clearRect(0, 0, w, h);

    const mobile = isSmallViewport();

    if (!REDUCED_MOTION && dt > 0) {
      simClock += dt;
      const follow = 1 - Math.exp(-dt / 0.38);
      const targetX = pointerActive ? -pointerTargetX : 0;
      const targetY = pointerActive ? -pointerTargetY : 0;
      pointerCurX += (targetX - pointerCurX) * follow;
      pointerCurY += (targetY - pointerCurY) * follow;
    }

    const pxMaxShift = mobile ? 10 : 24;
    const spanY = 1.1;

    for (let i = 0; i < dust.length; i += 1) {
      const p = dust[i];
      if (!REDUCED_MOTION && dt > 0) {
        p.y += p.speedY * dt;
        p.x += p.driftX * dt;
        if (p.y < -0.05) {
          p.y += spanY;
          p.x = Math.random();
        }
        if (p.x < -0.04) p.x += 1.08;
        else if (p.x > 1.04) p.x -= 1.08;
      }

      // Soft bottom-entry & top-exit opacity fade for seamless infinite rise
      const yNorm = (p.y + 0.05) / spanY;
      const edgeFade = smoothEdge(yNorm / 0.12) * smoothEdge((1 - yNorm) / 0.12);
      if (edgeFade <= 0.005) continue;

      const shimmer = REDUCED_MOTION
        ? 1
        : 1 - p.twinkleDepth * (0.5 + 0.5 * Math.sin(simClock * p.twinkleSpeed + p.phase));

      const alpha = p.baseAlpha * edgeFade * shimmer;
      if (alpha <= 0.01) continue;

      const swayX = REDUCED_MOTION ? 0 : Math.sin(simClock * p.wobbleFreq + p.phase) * p.wobbleAmpX;
      const parallaxX = pointerCurX * pxMaxShift * p.depth;
      const parallaxY = pointerCurY * pxMaxShift * p.depth;
      const sx = (((p.x + swayX + 1.04) % 1.08) - 0.04) * w + parallaxX;
      const sy = p.y * h + parallaxY;

      const drawSize = p.radius * 2 * p.glowScale;
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.drawImage(p.sprite, sx - drawSize * 0.5, sy - drawSize * 0.5, drawSize, drawSize);
    }
    ctx.globalAlpha = 1;
  }

  function tick(now) {
    rafId = 0;
    if (document.hidden || REDUCED_MOTION) return;
    const dt = lastTs ? Math.min(0.05, Math.max(0.001, (now - lastTs) / 1000)) : 0.016;
    lastTs = now;
    drawFrame(dt);
    rafId = window.requestAnimationFrame(tick);
  }

  const startLoop = () => {
    if (REDUCED_MOTION) {
      drawFrame(0);
      return;
    }
    if (!rafId && !document.hidden) {
      lastTs = 0;
      rafId = window.requestAnimationFrame(tick);
    }
  };

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch' || isSmallViewport() || !w || !h) return;
      pointerActive = true;
      pointerTargetX = (e.clientX / w) * 2 - 1;
      pointerTargetY = (e.clientY / h) * 2 - 1;
    },
    { passive: true },
  );
  document.documentElement.addEventListener('pointerleave', () => {
    pointerActive = false;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    } else if (!document.hidden) {
      startLoop();
    }
  });

  resize();
  startLoop();
}

function initAmbientParallax() {
  if (REDUCED_MOTION) return;
  const orbs = [...document.querySelectorAll('.gsap-ambient-orb')];
  if (!orbs.length) return;

  let targetY = window.scrollY;
  let currentY = targetY;
  let rafId = 0;

  function applyTransforms() {
    orbs.forEach((orb, i) => {
      const factor = (i === 1 ? -0.035 : 0.025) * (i + 1);
      const dy = Math.max(-80, Math.min(80, currentY * factor * 0.4));
      const dx = Math.sin(currentY * 0.001 + i) * 14;
      orb.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    });
  }

  function tick() {
    currentY += (targetY - currentY) * 0.06;
    applyTransforms();
    if (Math.abs(targetY - currentY) > 0.05) {
      rafId = window.requestAnimationFrame(tick);
    } else {
      currentY = targetY;
      applyTransforms();
      rafId = 0;
    }
  }

  window.addEventListener(
    'scroll',
    () => {
      targetY = window.scrollY;
      if (!rafId) {
        rafId = window.requestAnimationFrame(tick);
      }
    },
    { passive: true },
  );

  applyTransforms();
}

/* ========================================================================
   Scroll Reveal (IntersectionObserver)
   ======================================================================== */
let revealObserver = null;

function revealVisibleOnLoad() {
  const els = [...document.querySelectorAll('[data-reveal]:not(.is-revealed)')];
  const vh = window.innerHeight;
  els.forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.top < vh * 0.96) el.classList.add('is-revealed');
  });
}

function initScrollReveal() {
  const targets = [...document.querySelectorAll('[data-reveal]')];
  if (REDUCED_MOTION || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-revealed'));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' },
  );

  targets.forEach((el, idx) => {
    el.style.setProperty('--reveal-delay', `${(idx % 4) * 70}ms`);
    revealObserver.observe(el);
  });

  // Safety reveal pass in case fast programmatic scrolling skips observer threshold
  window.setTimeout(revealVisibleOnLoad, 1400);
}

/* ========================================================================
   Hero Typewriter
   ======================================================================== */
function initTypewriter() {
  const el = document.getElementById('hero-typewriter');
  if (!el) return;
  const roles = [
    'Web Developer',
    'UI/UX Designer',
    'PPLG Student',
    'Game Dev Enthusiast',
  ];
  if (REDUCED_MOTION) {
    el.textContent = roles[0];
    return;
  }

  let roleIdx = 0;
  let charIdx = roles[0].length;
  let deleting = true;

  function step() {
    const word = roles[roleIdx];
    if (deleting) {
      charIdx--;
      el.textContent = word.slice(0, Math.max(0, charIdx));
      if (charIdx <= 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        window.setTimeout(step, 340);
        return;
      }
      window.setTimeout(step, 46);
    } else {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx >= word.length) {
        deleting = true;
        window.setTimeout(step, 1800);
        return;
      }
      window.setTimeout(step, 74);
    }
  }
  window.setTimeout(step, 1700);
}

/* ========================================================================
   About Me Dual-Layer Spider-Man Cursor Spotlight
   ======================================================================== */
function initAboutSpotlight() {
  const stage = document.getElementById('about-portrait-stage');
  const portrait = stage?.querySelector('.about-portrait');
  const aboutSection = document.getElementById('About');
  const scopeEl = aboutSection?.querySelector('.about-container-inner') || stage;
  if (!stage || !portrait || !scopeEl) return;

  let targetX = 50;
  let targetY = 50;
  let currentX = 50;
  let currentY = 50;
  let velX = 0;
  let velY = 0;
  let lastPointerX = null;
  let lastPointerY = null;
  let lastPointerTs = 0;
  let lastFrameTs = 0;
  let rafId = 0;
  let leaveTimer = 0;
  let isHovered = false;
  let stickyDesktop = false;

  const isCoarsePointer = () =>
    window.matchMedia('(max-width: 767px), (hover: none), (pointer: coarse)').matches;

  const stopRaf = () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = 0;
    }
  };

  const resetSpotlight = () => {
    window.clearTimeout(leaveTimer);
    leaveTimer = 0;
    isHovered = false;
    stickyDesktop = false;
    velX = 0;
    velY = 0;
    lastPointerX = null;
    lastPointerY = null;
    stopRaf();
    stage.classList.remove('spider-hovered', 'is-portrait-hovered');
    stage.style.removeProperty('--hover-rx');
    stage.style.removeProperty('--hover-ry');
    stage.style.removeProperty('--spider-shift-x');
    stage.style.removeProperty('--spider-shift-y');
  };

  const applyVars = () => {
    const rx = (134 + Math.max(-6, Math.min(12, Math.abs(velX) * 0.012 - Math.abs(velY) * 0.005))).toFixed(1);
    const ry = (134 + Math.max(-6, Math.min(12, Math.abs(velY) * 0.012 - Math.abs(velX) * 0.005))).toFixed(1);
    const sx = Math.max(-5, Math.min(5, velX * 0.0035)).toFixed(2);
    const sy = Math.max(-4, Math.min(4, velY * 0.0035)).toFixed(2);
    stage.style.setProperty('--hover-x', `${currentX.toFixed(2)}%`);
    stage.style.setProperty('--hover-y', `${currentY.toFixed(2)}%`);
    stage.style.setProperty('--hover-rx', `${rx}px`);
    stage.style.setProperty('--hover-ry', `${ry}px`);
    stage.style.setProperty('--spider-shift-x', `${sx}px`);
    stage.style.setProperty('--spider-shift-y', `${sy}px`);
  };

  const animateSpotlight = (now) => {
    const ts = typeof now === 'number' ? now : performance.now();
    const dt = lastFrameTs ? Math.min(0.05, Math.max(0.001, (ts - lastFrameTs) / 1000)) : 0.016;
    lastFrameTs = ts;

    const follow = REDUCED_MOTION ? 1 : 1 - Math.exp(-44 * dt);
    const decay = REDUCED_MOTION ? 0 : Math.exp(-16 * dt);

    currentX += (targetX - currentX) * follow;
    currentY += (targetY - currentY) * follow;
    velX *= decay;
    velY *= decay;

    applyVars();

    const posSettled = Math.abs(targetX - currentX) < 0.03 && Math.abs(targetY - currentY) < 0.03;
    const velSettled = Math.abs(velX) < 3 && Math.abs(velY) < 3;
    if (REDUCED_MOTION || (posSettled && velSettled)) {
      currentX = targetX;
      currentY = targetY;
      velX = 0;
      velY = 0;
      applyVars();
      rafId = 0;
      return;
    }

    rafId = window.requestAnimationFrame(animateSpotlight);
  };

  const isInsidePortraitSilhouette = (clientX, clientY, targetEl) => {
    if (targetEl?.closest?.('.about-intro, .about-bio, a, button, .top-navbar')) return null;
    const rect = portrait.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    const nx = (clientX - rect.left) / rect.width;
    const ny = (clientY - rect.top) / rect.height;
    // Match measured opaque WebP portrait bounds so outer sleeves, cuff, and hair stay active
    if (nx < 0.14 || nx > 0.96 || ny < 0.2 || ny > 0.995) return null;
    return {
      rect,
      pctX: Math.max(0, Math.min(100, nx * 100)),
      pctY: Math.max(0, Math.min(100, ny * 100)),
    };
  };

  const scheduleLeave = () => {
    if (leaveTimer) return;
    stage.classList.remove('is-portrait-hovered');
    isHovered = false;
    lastPointerX = null;
    lastPointerY = null;
    leaveTimer = window.setTimeout(() => {
      leaveTimer = 0;
      stage.classList.remove('spider-hovered');
      velX = 0;
      velY = 0;
      stopRaf();
    }, 120);
  };

  const trackPointer = (e) => {
    if (e.pointerType === 'touch' || isCoarsePointer()) return;
    const hit = isInsidePortraitSilhouette(e.clientX, e.clientY, e.target);
    if (!hit) {
      if (isHovered) scheduleLeave();
      return;
    }

    window.clearTimeout(leaveTimer);
    leaveTimer = 0;

    if (stickyDesktop) {
      stickyDesktop = false;
      stage.setAttribute('data-spider-visible', 'false');
    }

    const now = performance.now();
    if (!REDUCED_MOTION && isHovered && lastPointerX !== null && lastPointerTs) {
      const pdt = Math.max(0.008, (now - lastPointerTs) / 1000);
      const instVx = Math.max(-1600, Math.min(1600, (e.clientX - lastPointerX) / pdt));
      const instVy = Math.max(-1600, Math.min(1600, (e.clientY - lastPointerY) / pdt));
      velX = velX * 0.45 + instVx * 0.55;
      velY = velY * 0.45 + instVy * 0.55;
    }
    lastPointerX = e.clientX;
    lastPointerY = e.clientY;
    lastPointerTs = now;

    targetX = hit.pctX;
    targetY = hit.pctY;

    stage.classList.add('is-portrait-hovered');
    if (!isHovered) {
      isHovered = true;
      currentX = targetX;
      currentY = targetY;
      velX = 0;
      velY = 0;
      applyVars();
      stage.classList.add('spider-hovered');
    } else {
      stage.classList.add('spider-hovered');
      if (REDUCED_MOTION) {
        currentX = targetX;
        currentY = targetY;
        velX = 0;
        velY = 0;
        applyVars();
      } else if (!rafId) {
        lastFrameTs = now;
        rafId = window.requestAnimationFrame(animateSpotlight);
      }
    }
  };

  scopeEl.addEventListener('pointermove', trackPointer, { passive: true });
  scopeEl.addEventListener('pointerleave', () => {
    if (!isCoarsePointer()) scheduleLeave();
  });

  scopeEl.addEventListener('click', (e) => {
    if (isCoarsePointer()) {
      if (!e.target?.closest?.('.about-portrait-stage')) return;
      const visible = stage.getAttribute('data-spider-visible') === 'true';
      stage.setAttribute('data-spider-visible', visible ? 'false' : 'true');
      return;
    }
    if (isInsidePortraitSilhouette(e.clientX, e.clientY, e.target)) {
      const visible = stage.getAttribute('data-spider-visible') === 'true';
      stickyDesktop = !visible;
      stage.setAttribute('data-spider-visible', stickyDesktop ? 'true' : 'false');
    }
  });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stage.classList.toggle('is-in-view', entry.isIntersecting);
          if (!entry.isIntersecting) resetSpotlight();
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(stage);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) resetSpotlight();
  });
}

/* ========================================================================
   Liquid Metal Animated Border Canvas (on Stat Cards & Project Cards)
   ======================================================================== */
function initLiquidMetalBorders() {
  const containers = [...document.querySelectorAll('.liquid-metal-border')];
  if (!containers.length) return;

  let visibleSet = new Set();
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSet.add(entry.target);
        else visibleSet.delete(entry.target);
      });
    },
    { threshold: 0.05 },
  );

  containers.forEach((box, idx) => {
    box.dataset.shaderPhase = String(idx * 1.15);
    obs.observe(box);
  });

  function renderBorders(time) {
    const t = time * 0.00055;
    visibleSet.forEach((box) => {
      const canvas = box.querySelector('canvas');
      if (!canvas) return;
      const w = box.clientWidth;
      const h = box.clientHeight;
      if (w < 10 || h < 10) return;

      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const angle = t + Number(box.dataset.shaderPhase || 0);
      const cx = w / 2;
      const cy = h / 2;
      const grad = ctx.createConicGradient(angle, cx, cy);
      grad.addColorStop(0.0, 'rgba(56, 189, 248, 0.55)');
      grad.addColorStop(0.16, 'rgba(226, 232, 240, 0.85)');
      grad.addColorStop(0.32, 'rgba(30, 58, 138, 0.25)');
      grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.45)');
      grad.addColorStop(0.68, 'rgba(191, 219, 254, 0.72)');
      grad.addColorStop(0.84, 'rgba(15, 23, 42, 0.2)');
      grad.addColorStop(1.0, 'rgba(56, 189, 248, 0.55)');

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    });

    if (!REDUCED_MOTION) window.requestAnimationFrame(renderBorders);
  }
  window.requestAnimationFrame(renderBorders);
}

/* ========================================================================
   Interactive 3D Lanyard (Physical ID Card + PBD Twist Rope + 180° Flip)
   ======================================================================== */
const NUGI_GITHUB_QR_MATRIX = [
  '11111110000110100011001111111',
  '10000010010100001010101000001',
  '10111010011010110100101011101',
  '10111010001001001011101011101',
  '10111010000010000000001011101',
  '10000010111010011101101000001',
  '11111110101010101010101111111',
  '00000000001011011101100000000',
  '10010110101110101001010100000',
  '10111001001101011100101001001',
  '10000111010101110011010011110',
  '10010101101101001011100010110',
  '01000011011000111100111001011',
  '00001100101001111000110000000',
  '01011010110011101110101111111',
  '10110100101100000100111001010',
  '11011110010001001000100100010',
  '00001001001001111010111101001',
  '10000110101100100110010110011',
  '00001001110100111100110110011',
  '10111010111010000001111110100',
  '00000000100010101001100010111',
  '11111110000100001100101010010',
  '10000010111110110010100011100',
  '10111010011000011100111110001',
  '10111010101111000101101111110',
  '10111010011100101001100011101',
  '10000010000111001101110010010',
  '11111110111110100100111111010',
];

function createSeededRng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawRoundedRectPath(ctx, x, y, w, h, r) {
  const rad = Math.max(0, Math.min(r, w * 0.5, h * 0.5));
  const k = rad * 0.4477;
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.lineTo(x + w - rad, y);
  ctx.bezierCurveTo(x + w - k, y, x + w, y + k, x + w, y + rad);
  ctx.lineTo(x + w, y + h - rad);
  ctx.bezierCurveTo(x + w, y + h - k, x + w - k, y + h, x + w - rad, y + h);
  ctx.lineTo(x + rad, y + h);
  ctx.bezierCurveTo(x + k, y + h, x, y + h - k, x, y + h - rad);
  ctx.lineTo(x, y + rad);
  ctx.bezierCurveTo(x, y + k, x + k, y, x + rad, y);
  ctx.closePath();
}

function drawThreeRoundedShape(target, x, y, w, h, r) {
  const rad = Math.max(0, Math.min(r, w * 0.5, h * 0.5));
  const k = rad * 0.4477;
  target.moveTo(x + rad, y);
  target.lineTo(x + w - rad, y);
  target.bezierCurveTo(x + w - k, y, x + w, y + k, x + w, y + rad);
  target.lineTo(x + w, y + h - rad);
  target.bezierCurveTo(x + w, y + h - k, x + w - k, y + h, x + w - rad, y + h);
  target.lineTo(x + rad, y + h);
  target.bezierCurveTo(x + k, y + h, x, y + h - k, x, y + h - rad);
  target.lineTo(x, y + rad);
  target.bezierCurveTo(x, y + k, x + k, y, x + rad, y);
}

function drawSchoolCrestEmblem(ctx, cx, cy, size) {
  ctx.save();
  ctx.translate(cx, cy);
  const s = size * 0.5;

  // Outer shield
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.lineTo(s * 0.86, -s * 0.72);
  ctx.quadraticCurveTo(s * 0.92, s * 0.16, 0, s * 1.02);
  ctx.quadraticCurveTo(-s * 0.92, s * 0.16, -s * 0.86, -s * 0.72);
  ctx.closePath();
  ctx.fillStyle = '#0e2954';
  ctx.fill();
  ctx.lineWidth = Math.max(2, size * 0.06);
  ctx.strokeStyle = '#e5b84b';
  ctx.stroke();

  // Inner blue field
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.76);
  ctx.lineTo(s * 0.64, -s * 0.54);
  ctx.quadraticCurveTo(s * 0.68, s * 0.12, 0, s * 0.78);
  ctx.quadraticCurveTo(-s * 0.68, s * 0.12, -s * 0.64, -s * 0.54);
  ctx.closePath();
  ctx.fillStyle = '#1f64d6';
  ctx.fill();

  // Geometric star + book emblem inside shield
  ctx.fillStyle = '#f8f2e4';
  ctx.beginPath();
  ctx.arc(0, -s * 0.18, s * 0.22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#e5b84b';
  ctx.fillRect(-s * 0.34, s * 0.14, s * 0.68, s * 0.12);
  ctx.fillStyle = '#f8f2e4';
  ctx.fillRect(-s * 0.26, s * 0.3, s * 0.52, s * 0.08);
  ctx.restore();
}

function paintArchivalPaperBase(ctx, w, h, seed = 101) {
  const baseGrad = ctx.createLinearGradient(0, 0, w, h);
  baseGrad.addColorStop(0, '#eee7d7');
  baseGrad.addColorStop(0.55, '#e7dfd0');
  baseGrad.addColorStop(1, '#ddd4c2');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  // Subtle curved architectural drafting grid
  ctx.save();
  ctx.strokeStyle = 'rgba(13, 25, 44, 0.075)';
  ctx.lineWidth = 1.6;
  const step = 42;
  for (let i = -h; i < w + h; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.quadraticCurveTo(i + 48, h * 0.5, i + 12, h);
    ctx.stroke();
  }
  for (let j = 0; j < h; j += step) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.quadraticCurveTo(w * 0.5, j - 16, w, j + 8);
    ctx.stroke();
  }

  // Deterministic tactile paper grain speckles
  const rng = createSeededRng(seed);
  for (let i = 0; i < 4200; i += 1) {
    const px = rng() * w;
    const py = rng() * h;
    const sz = 0.8 + rng() * 1.9;
    ctx.fillStyle = rng() > 0.5 ? 'rgba(18, 28, 44, 0.038)' : 'rgba(255, 252, 245, 0.07)';
    ctx.fillRect(px, py, sz, sz);
  }
  ctx.restore();
}

function drawCardSchoolLogo(ctx, logoImg, cx, cy, targetH) {
  if (!logoImg || logoImg.naturalWidth <= 0 || logoImg.naturalHeight <= 0) return;
  const ratio = logoImg.naturalWidth / logoImg.naturalHeight;
  const drawH = targetH;
  const drawW = drawH * ratio;
  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(logoImg, cx - drawW * 0.5, cy - drawH * 0.5, drawW, drawH);
  ctx.restore();
}

function drawArchivalCardFace(canvas, isFront, portraitImg, schoolLogoImg = null, waveBgImg = null) {
  const w = 1024;
  const h = 1536;
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Outer matte obsidian sleeve bevel frame (visible around imagePadding margin)
  ctx.fillStyle = '#0c111b';
  ctx.fillRect(0, 0, w, h);

  const padX = Math.round(w * 0.036);
  const padY = Math.round(h * 0.036);
  const iw = w - padX * 2;
  const ih = h - padY * 2;

  ctx.save();
  drawRoundedRectPath(ctx, padX, padY, iw, ih, 48);
  ctx.clip();
  ctx.translate(padX, padY);

  if (isFront) {
    paintArchivalPaperBase(ctx, iw, ih, 317);

    // Top-left dark navy tag badge + hairline rule
    ctx.fillStyle = '#0d192c';
    ctx.fillRect(72, 54, 212, 62);
    ctx.fillStyle = '#f2ebdc';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 32px "Plus Jakarta Sans", "Arial Narrow", sans-serif';
    ctx.fillText('STUDENT', 178, 86);

    ctx.strokeStyle = '#0d192c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(284, 85);
    ctx.lineTo(426, 85);
    ctx.lineTo(426, 142);
    ctx.stroke();

    // Top-right SMK Skill Village crest & typography
    drawCardSchoolLogo(ctx, schoolLogoImg, 640, 86, 74);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#0d192c';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SMK SKILL VILLAGE', 684, 72);
    ctx.font = '700 18px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ISLAMIC SCHOOL', 684, 96);
    ctx.fillStyle = '#254a82';
    ctx.font = '700 16px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('JONGGOL • PPLG', 684, 118);

    // Architectural corner-dot wireframe box behind "DEVELOPER"
    const bx = 54;
    const by = 142;
    const bw = iw - 108;
    const bh = 216;
    ctx.strokeStyle = '#0d192c';
    ctx.lineWidth = 2.5;
    ctx.strokeRect(bx, by, bw, bh);
    [
      [bx, by],
      [bx + bw, by],
      [bx, by + bh],
      [bx + bw, by + bh],
      [426, by],
    ].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(dx, dy, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0d192c';
      ctx.fill();
    });

    // Giant condensed heading behind foreground portrait
    ctx.save();
    ctx.translate(iw * 0.5, by + bh * 0.54);
    ctx.scale(0.84, 1.18);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 166px "Plus Jakarta Sans", Impact, sans-serif';
    ctx.fillStyle = '#0d192c';
    ctx.fillText('DEVELOPER', 0, 4);
    ctx.restore();

    // Diagonal stamped micro ticket peeking behind V/E
    ctx.save();
    ctx.translate(310, 266);
    ctx.rotate(-0.22);
    ctx.fillStyle = '#efe8d8';
    ctx.fillRect(-52, -26, 104, 52);
    ctx.strokeStyle = '#0d192c';
    ctx.lineWidth = 2;
    ctx.strokeRect(-52, -26, 104, 52);
    ctx.fillStyle = '#0d192c';
    ctx.font = '800 18px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('original', 0, -2);
    for (let s = -40; s <= 40; s += 14) {
      ctx.beginPath();
      ctx.moveTo(s, 22);
      ctx.lineTo(s + 12, 4);
      ctx.lineWidth = 4;
      ctx.stroke();
    }
    ctx.restore();

    // Left rectangular backdrop image behind Nugi
    const ax = 82;
    const ay = 468;
    const aw = 438;
    const ah = 650;
    ctx.save();
    ctx.beginPath();
    ctx.rect(ax, ay, aw, ah);
    ctx.clip();
    if (waveBgImg && waveBgImg.naturalWidth > 0 && waveBgImg.naturalHeight > 0) {
      const imgRatio = waveBgImg.naturalWidth / waveBgImg.naturalHeight;
      const boxRatio = aw / ah;
      let sx = 0;
      let sy = 0;
      let sw = waveBgImg.naturalWidth;
      let sh = waveBgImg.naturalHeight;
      if (imgRatio > boxRatio) {
        sw = waveBgImg.naturalHeight * boxRatio;
        sx = (waveBgImg.naturalWidth - sw) * 0.5;
      } else {
        sh = waveBgImg.naturalWidth / boxRatio;
        sy = (waveBgImg.naturalHeight - sh) * 0.38;
      }
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(waveBgImg, sx, sy, sw, sh, ax, ay, aw, ah);
    } else {
      ctx.fillStyle = '#12315f';
      ctx.fillRect(ax, ay, aw, ah);
    }
    ctx.restore();

    // Right framed vertical sidebar rule ("SOFTWARE & GAME DEV")
    const vx = iw - 234;
    const vy = 414;
    const vw = 180;
    const vh = 770;
    ctx.strokeStyle = '#0d192c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(vx, vy);
    ctx.lineTo(vx + vw, vy);
    ctx.moveTo(vx, vy);
    ctx.lineTo(vx, vy + vh);
    ctx.moveTo(vx + vw, vy);
    ctx.lineTo(vx + vw, vy + vh);
    ctx.stroke();
    [
      [vx, vy],
      [vx + vw, vy],
    ].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.arc(dx, dy, 6.5, 0, Math.PI * 2);
      ctx.fillStyle = '#0d192c';
      ctx.fill();
    });

    ctx.save();
    ctx.translate(vx + vw * 0.52, vy + vh * 0.5);
    ctx.rotate(-Math.PI / 2);
    ctx.scale(0.84, 1.15);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 54px "Plus Jakarta Sans", Impact, sans-serif';
    ctx.fillStyle = '#0d192c';
    ctx.fillText('SOFTWARE & GAME DEV', 0, 2);
    ctx.restore();

    // Foreground cutout portrait of Nugi layered cleanly above backdrop & text
    if (portraitImg && portraitImg.naturalWidth > 0) {
      const targetH = ih * 0.9;
      const scale = targetH / portraitImg.naturalHeight;
      const drawW = portraitImg.naturalWidth * scale;
      const drawH = portraitImg.naturalHeight * scale;
      const drawX = iw * 0.452 - drawW * 0.5345;
      const drawY = ih * 0.925 - drawH;

      ctx.save();
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.shadowColor = 'rgba(7, 15, 29, 0.34)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetX = -8;
      ctx.shadowOffsetY = 12;
      ctx.drawImage(portraitImg, drawX, drawY, drawW, drawH);
      ctx.restore();
    }

    // Floating slanted editorial nameplate ribbon over lower torso
    ctx.save();
    ctx.translate(iw * 0.46, 1020);
    ctx.rotate(-0.042);
    ctx.shadowColor = 'rgba(7, 15, 29, 0.34)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 8;
    ctx.fillStyle = '#efe8d7';
    ctx.fillRect(-355, -39, 710, 78);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'rgba(13, 25, 44, 0.25)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-355, -39, 710, 78);
    ctx.fillStyle = '#0d192c';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 40px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ANUGRAH ROFFIQ RAMADHAN', 0, 2);
    ctx.restore();

    // Deep midnight footer band
    const fy = ih - 246;
    ctx.fillStyle = '#0b1629';
    ctx.fillRect(0, fy, iw, 246);

    // Bold footer title "PORTFOLIO"
    ctx.save();
    ctx.translate(64, fy + 132);
    ctx.scale(0.84, 1.15);
    ctx.fillStyle = '#efe8d8';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = '900 84px "Plus Jakarta Sans", Impact, sans-serif';
    ctx.fillText('PORTFOLIO', 0, 0);
    ctx.restore();

    // Delicate overlapping concentric geometric rings motif in center
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 232, 216, 0.48)';
    ctx.lineWidth = 1.3;
    for (let rIdx = 0; rIdx < 7; rIdx += 1) {
      ctx.beginPath();
      ctx.arc(542 + rIdx * 10, fy + 132, 30, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();

    // Subtle footer tagline on bottom-right
    ctx.fillStyle = '#dce4f2';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('Crafted with', 694, fy + 118);
    ctx.fillText('precision', 694, fy + 148);
  } else {
    // BACK FACE — 100% left-to-right readable with genuine scannable QR code
    paintArchivalPaperBase(ctx, iw, ih, 541);

    // Top-right corner diagonal midnight accent stripes
    ctx.save();
    ctx.fillStyle = '#111926';
    for (let s = 0; s < 3; s += 1) {
      ctx.beginPath();
      ctx.moveTo(iw - 210 + s * 64, 0);
      ctx.lineTo(iw - 166 + s * 64, 0);
      ctx.lineTo(iw, 166 - s * 64);
      ctx.lineTo(iw, 210 - s * 64);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Top-left torn stamp ("SCAN HERE ///////")
    ctx.save();
    ctx.translate(220, 126);
    ctx.rotate(-0.11);
    ctx.shadowColor = 'rgba(10, 18, 32, 0.26)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetY = 6;
    ctx.fillStyle = '#f1ead9';
    ctx.fillRect(-176, -68, 352, 136);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
    ctx.strokeStyle = 'rgba(13, 25, 44, 0.16)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-176, -68, 352, 136);

    ctx.fillStyle = '#0f1726';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 54px "Plus Jakarta Sans", Impact, sans-serif';
    ctx.fillText('SCAN HERE', 0, -18);

    for (let xOff = -140; xOff <= 120; xOff += 44) {
      ctx.beginPath();
      ctx.moveTo(xOff, 50);
      ctx.lineTo(xOff + 22, 18);
      ctx.lineTo(xOff + 42, 18);
      ctx.lineTo(xOff + 20, 50);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Top-center/right School emblem + identity
    drawCardSchoolLogo(ctx, schoolLogoImg, 480, 134, 92);
    ctx.fillStyle = '#0f1726';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '900 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('SMK SKILL', 536, 114);
    ctx.fillText('VILLAGE', 536, 144);
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#254a82';
    ctx.fillText('JONGGOL', 536, 172);

    // Right vertical textured charcoal column
    const colX = iw - 196;
    const colY = 232;
    const colW = 146;
    const colH = 928;
    ctx.fillStyle = '#111926';
    ctx.fillRect(colX, colY, colW, colH);

    // Top diagonal cream slashes inside right column
    ctx.fillStyle = '#e7dfd0';
    for (let d = 0; d < 2; d += 1) {
      ctx.beginPath();
      ctx.moveTo(colX + 42, colY + 42 + d * 36);
      ctx.lineTo(colX + 102, colY + 18 + d * 36);
      ctx.lineTo(colX + 102, colY + 34 + d * 36);
      ctx.lineTo(colX + 42, colY + 58 + d * 36);
      ctx.closePath();
      ctx.fill();
    }

    ctx.save();
    ctx.translate(colX + colW * 0.5, colY + colH * 0.56);
    ctx.rotate(Math.PI / 2);
    ctx.scale(0.84, 1.08);
    ctx.fillStyle = '#efe8d8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 54px "Plus Jakarta Sans", Impact, sans-serif';
    ctx.fillText('SOFTWARE & GAME DEV', 0, 0);
    ctx.restore();

    // Central dark textured panel containing scannable QR code
    const qx = 58;
    const qy = 264;
    const qw = iw - 284;
    const qh = 842;
    ctx.save();
    ctx.fillStyle = '#111926';
    ctx.fillRect(qx, qy, qw, qh);

    // Subtle paper grain across dark panel
    const rngDark = createSeededRng(881);
    for (let i = 0; i < 2400; i += 1) {
      ctx.fillStyle = rngDark() > 0.4 ? 'rgba(241, 234, 217, 0.045)' : 'rgba(4, 8, 16, 0.16)';
      ctx.fillRect(qx + rngDark() * qw, qy + rngDark() * qh, 2, 2);
    }

    // Left slant strips matching torn aesthetic
    ctx.fillStyle = '#e7dfd0';
    for (let sy = qy + 180; sy < qy + 520; sy += 76) {
      ctx.beginPath();
      ctx.moveTo(qx, sy + 28);
      ctx.lineTo(qx + 38, sy);
      ctx.lineTo(qx + 38, sy + 36);
      ctx.lineTo(qx, sy + 64);
      ctx.closePath();
      ctx.fill();
    }

    // "CONNECT WITH ME / NUGI.DEV"
    ctx.fillStyle = '#efe8d8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 44px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('CONNECT WITH ME', qx + qw * 0.5 + 10, qy + 84);

    ctx.font = '600 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('GITHUB', qx + qw * 0.5 + 10, qy + 136);
    ctx.strokeStyle = '#efe8d8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(qx + 86, qy + 136);
    ctx.lineTo(qx + qw * 0.5 - 78, qy + 136);
    ctx.moveTo(qx + qw * 0.5 + 98, qy + 136);
    ctx.lineTo(qx + qw - 64, qy + 136);
    ctx.stroke();

    // Render authentic crisp vector 29x29 QR matrix in archival cream
    const rows = NUGI_GITHUB_QR_MATRIX.length;
    const qrBoxSize = 468;
    const modSize = qrBoxSize / rows;
    const qrLeft = qx + (qw - qrBoxSize) * 0.5 + 10;
    const qrTop = qy + 194;
    ctx.fillStyle = '#efe8d8';
    for (let r = 0; r < rows; r += 1) {
      const row = NUGI_GITHUB_QR_MATRIX[r];
      for (let c = 0; c < rows; c += 1) {
        if (row[c] === '1') {
          ctx.fillRect(
            Math.floor(qrLeft + c * modSize),
            Math.floor(qrTop + r * modSize),
            Math.ceil(modSize),
            Math.ceil(modSize),
          );
        }
      }
    }

    // Subtle handle underneath QR
    ctx.fillStyle = 'rgba(239, 232, 216, 0.82)';
    ctx.font = '600 21px "Plus Jakarta Sans", monospace';
    ctx.fillText('@AnugrahRoffiqR', qx + qw * 0.5 + 10, qrTop + qrBoxSize + 62);
    ctx.restore();

    // Bottom dark archival plaque (Name + Role)
    const py = ih - 242;
    ctx.save();
    ctx.fillStyle = '#111926';
    drawRoundedRectPath(ctx, 64, py, iw - 128, 178, 12);
    ctx.fill();
    ctx.fillStyle = '#efe8d8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '900 42px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('ANUGRAH ROFFIQ RAMADHAN', iw * 0.5, py + 62);

    ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#dce4f2';
    ctx.fillText('Web Dev & UI/UX Designer', iw * 0.5, py + 122);
    ctx.strokeStyle = 'rgba(239, 232, 216, 0.72)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(116, py + 122);
    ctx.lineTo(240, py + 122);
    ctx.moveTo(iw - 240, py + 122);
    ctx.lineTo(iw - 116, py + 122);
    ctx.stroke();
    ctx.restore();
  }

  // Soft glossy edge vignette & punch-slot interior depth hint
  ctx.fillStyle = '#090d14';
  drawRoundedRectPath(ctx, iw * 0.5 - 102, 28, 204, 42, 21);
  ctx.fill();

  ctx.restore();
}

function createStrapTexture() {
  const c = document.createElement('canvas');
  c.width = 256;
  c.height = 512;
  const ctx = c.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(c);

  // Deep matte nylon charcoal base
  ctx.fillStyle = '#0c0e13';
  ctx.fillRect(0, 0, c.width, c.height);

  // Subtle vertical twill grain & edge stitched borders
  ctx.fillStyle = 'rgba(255, 255, 255, 0.035)';
  for (let y = 0; y < c.height; y += 4) {
    ctx.fillRect(0, y, c.width, 1);
  }
  ctx.fillStyle = 'rgba(226, 232, 240, 0.16)';
  for (let y = 0; y < c.height; y += 16) {
    ctx.fillRect(14, y, 3, 9);
    ctx.fillRect(c.width - 17, y, 3, 9);
  }

  // Repeat crisp white woven logo "(N) NugiDev" cleanly along strap
  for (let y = 128; y < c.height; y += 256) {
    ctx.save();
    ctx.translate(c.width * 0.5, y);
    ctx.rotate(Math.PI / 2);

    // Circular monogram mark (N)
    ctx.strokeStyle = '#e8eef8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-84, 0, 22, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#e8eef8';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = '800 22px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('N', -84, 1);

    ctx.textAlign = 'left';
    ctx.font = '700 34px "Plus Jakarta Sans", sans-serif';
    ctx.fillText('NugiDev', -48, 2);
    ctx.restore();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

function createCardMicroNormalMap() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(c);
  const rng = createSeededRng(7);
  const raw = Float32Array.from({ length: 16384 }, () => rng());
  const blurSample = (x, y) => {
    let sum = 0;
    for (let dy = -1; dy <= 1; dy += 1) {
      for (let dx = -1; dx <= 1; dx += 1) {
        sum += raw[((y + dy + 128) % 128) * 128 + ((x + dx + 128) % 128)];
      }
    }
    return (sum / 9) * 1.4;
  };
  const img = ctx.createImageData(128, 128);
  for (let y = 0; y < 128; y += 1) {
    for (let x = 0; x < 128; x += 1) {
      const gx = blurSample(x - 1, y) - blurSample(x + 1, y);
      const gy = blurSample(x, y - 1) - blurSample(x, y + 1);
      const len = Math.hypot(gx, gy, 1);
      const idx = (y * 128 + x) * 4;
      img.data[idx] = ((gx / len) * 0.5 + 0.5) * 255;
      img.data[idx + 1] = ((gy / len) * 0.5 + 0.5) * 255;
      img.data[idx + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(5, 7);
  return tex;
}

function createWeaveNormalMap() {
  const rng = createSeededRng(19);
  const noise = Float32Array.from({ length: 16384 }, () => rng());
  const ridge = (t) => Math.sqrt(Math.max(0, 1 - 4 * t * t));
  const height = (x, y) => {
    const ix = ((x % 128) + 128) % 128;
    const iy = ((y % 128) + 128) % 128;
    const gx = (ix / 128) * 8;
    const gy = (iy / 128) * 8;
    const cx = Math.floor(gx);
    const cy = Math.floor(gy);
    const fx = gx - cx - 0.5;
    const fy = gy - cy - 0.5;
    const even = (cx + cy) % 2 === 0;
    const u = ridge(fx) * (0.55 + 0.45 * Math.cos(fy * Math.PI * (even ? 1 : 0.6)));
    const v = ridge(fy) * (0.55 + 0.45 * Math.cos(fx * Math.PI * (even ? 0.6 : 1)));
    return (even ? Math.max(u, v * 0.7) : Math.max(v, u * 0.7)) + noise[iy * 128 + ix] * 0.08;
  };
  const data = new Uint8Array(65536);
  for (let y = 0; y < 128; y += 1) {
    for (let x = 0; x < 128; x += 1) {
      const gx = (height(x - 1, y) - height(x + 1, y)) * 1.6;
      const gy = (height(x, y - 1) - height(x, y + 1)) * 1.6;
      const len = Math.hypot(gx, gy, 1);
      const idx = (y * 128 + x) * 4;
      data[idx] = ((gx / len) * 0.5 + 0.5) * 255;
      data[idx + 1] = ((gy / len) * 0.5 + 0.5) * 255;
      data[idx + 2] = ((1 / len) * 0.5 + 0.5) * 255;
      data[idx + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, 128, 128);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

function createStudioSoftboxEnv(renderer) {
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0.035, 0.038, 0.048);
  const panelGeo = new THREE.PlaneGeometry(1, 1);
  const mats = [];
  const addPanel = (intensity, pos, scale, rotZ = 0) => {
    const m = new THREE.MeshBasicMaterial({
      color: new THREE.Color(intensity, intensity, intensity),
      side: THREE.DoubleSide,
    });
    mats.push(m);
    const mesh = new THREE.Mesh(panelGeo, m);
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.lookAt(0, 0, 0);
    if (rotZ) mesh.rotateZ(rotZ);
    envScene.add(mesh);
  };
  addPanel(2.6, [0, 4.5, 8], [9, 4]);
  addPanel(5.8, [-5.5, 0.5, 7], [0.9, 14]);
  addPanel(4.0, [5, -0.5, 8], [0.6, 14]);
  addPanel(3.4, [0, -1, 9], [24, 0.35], Math.PI / 3);
  addPanel(2.5, [1, 2.5, 9], [24, 0.2], Math.PI / 3);
  addPanel(1.4, [0, 6, -6], [12, 4]);
  addPanel(0.55, [0, -7, 1], [16, 6]);
  addPanel(0.95, [8, 0, -2], [4, 10]);

  const rt = pmrem.fromScene(envScene, 0.035);
  pmrem.dispose();
  panelGeo.dispose();
  mats.forEach((m) => m.dispose());
  return rt;
}

function initLanyard() {
  const container = document.getElementById('lanyard-container');
  const stage = container?.querySelector('.lanyard');
  const canvas = document.getElementById('lanyard-canvas');
  if (!container || !stage || !canvas) return;

  const syncMobileClass = () => {
    container.classList.toggle('is-mobile', window.innerWidth <= 767);
  };
  syncMobileClass();

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch {
    resolveLanyardReady();
    return;
  }

  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;

  const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  const scene = new THREE.Scene();
  const envRT = createStudioSoftboxEnv(renderer);
  scene.environment = envRT.texture;

  const FOV_DEG = 24;
  const camera = new THREE.PerspectiveCamera(FOV_DEG, 1, 0.1, 200);
  const rigRoot = new THREE.Group();
  scene.add(rigRoot);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
  keyLight.position.set(-2.5, 4, 6);
  const fillLight = new THREE.DirectionalLight(0xeef4ff, 0.42);
  fillLight.position.set(3, -1, 4);
  scene.add(keyLight, fillLight);

  // Physical card geometry dimensions (portrait 2:3 ratio matching Alfari)
  const CARD_W = 1.6;
  const CARD_H = 2.4;
  const CARD_THICK = 0.018;
  const CARD_BEVEL = 0.007;
  const CARD_RAD = 0.12;
  const SLOT = { width: 0.34, height: 0.072, y: CARD_H * 0.5 - 0.13 };
  const RING_Y = CARD_H * 0.5 - 0.055;
  const RING_RADIUS = 0.095;
  const HANG_Y = RING_Y + RING_RADIUS;
  const STRAP_WIDTH = 0.223; // 0.36 * 0.62

  // Card body with punched oval slot & rounded chamfered bevel
  const bodyShape = new THREE.Shape();
  drawThreeRoundedShape(
    bodyShape,
    -CARD_W / 2 + CARD_BEVEL,
    -CARD_H / 2 + CARD_BEVEL,
    CARD_W - CARD_BEVEL * 2,
    CARD_H - CARD_BEVEL * 2,
    Math.max(CARD_RAD - CARD_BEVEL, 0.01),
  );
  const slotHole = new THREE.Path();
  drawThreeRoundedShape(
    slotHole,
    -SLOT.width / 2 - CARD_BEVEL,
    SLOT.y - SLOT.height / 2 - CARD_BEVEL,
    SLOT.width + CARD_BEVEL * 2,
    SLOT.height + CARD_BEVEL * 2,
    SLOT.height * 0.5 + CARD_BEVEL,
  );
  bodyShape.holes.push(slotHole);

  const bodyGeo = new THREE.ExtrudeGeometry(bodyShape, {
    depth: CARD_THICK,
    bevelEnabled: true,
    bevelThickness: CARD_BEVEL,
    bevelSize: CARD_BEVEL,
    bevelSegments: 5,
    curveSegments: 24,
  });
  bodyGeo.translate(0, 0, -CARD_THICK * 0.5);

  // Face plate geometry matching outer silhouette + punched oval slot
  const faceGeo = new THREE.ShapeGeometry(bodyShape, 24);
  const facePos = faceGeo.getAttribute('position');
  const faceUv = faceGeo.getAttribute('uv');
  for (let i = 0; i < facePos.count; i += 1) {
    faceUv.setXY(i, (facePos.getX(i) + CARD_W / 2) / CARD_W, (facePos.getY(i) + CARD_H / 2) / CARD_H);
  }
  faceUv.needsUpdate = true;

  // Metallic brushed clasp collar + rings
  const clampShape = new THREE.Shape();
  const clampW = STRAP_WIDTH * 1.16;
  drawThreeRoundedShape(clampShape, -clampW / 2 + 0.014, -0.061, clampW - 0.028, 0.122, 0.024);
  const clampGeo = new THREE.ExtrudeGeometry(clampShape, {
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.014,
    bevelSize: 0.014,
    bevelSegments: 6,
    curveSegments: 10,
  });
  clampGeo.translate(0, 0, -0.01);

  // Dynamic Front & Back Canvas Textures
  const frontCanvas = document.createElement('canvas');
  const backCanvas = document.createElement('canvas');
  const frontTex = new THREE.CanvasTexture(frontCanvas);
  frontTex.colorSpace = THREE.SRGBColorSpace;
  frontTex.anisotropy = maxAniso;
  const backTex = new THREE.CanvasTexture(backCanvas);
  backTex.colorSpace = THREE.SRGBColorSpace;
  backTex.anisotropy = maxAniso;

  const strapTex = createStrapTexture();
  strapTex.anisotropy = maxAniso;
  const cardNormal = createCardMicroNormalMap();
  const weaveNormal = createWeaveNormalMap();

  const cardBodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#141923'),
    roughness: 0.34,
    metalness: 0.05,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });
  const frontMat = new THREE.MeshPhysicalMaterial({
    map: frontTex,
    normalMap: cardNormal,
    normalScale: new THREE.Vector2(0.045, 0.045),
    roughness: 0.4,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });
  const backMat = new THREE.MeshPhysicalMaterial({
    map: backTex,
    normalMap: cardNormal,
    normalScale: new THREE.Vector2(0.045, 0.045),
    roughness: 0.4,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
  });
  const metalMat = new THREE.MeshStandardMaterial({
    color: '#d9dce2',
    metalness: 1,
    roughness: 0.16,
  });
  const strapMat = new THREE.MeshPhysicalMaterial({
    map: strapTex,
    normalMap: weaveNormal,
    normalScale: new THREE.Vector2(0.7, 0.7),
    roughness: 0.68,
    sheen: 1,
    sheenRoughness: 0.42,
    sheenColor: new THREE.Color(0.32, 0.33, 0.36),
    side: THREE.DoubleSide,
  });

  // Load ID card portrait, official SMK Skill Village logo, and ocean backdrop cleanly
  const portraitImg = new Image();
  const schoolLogoImg = new Image();
  const waveBgImg = new Image();
  portraitImg.decoding = 'async';
  schoolLogoImg.decoding = 'async';
  waveBgImg.decoding = 'async';

  const readyImg = (img) => (img.complete && img.naturalWidth > 0 ? img : null);
  const redrawCardFront = () => {
    drawArchivalCardFace(frontCanvas, true, readyImg(portraitImg), readyImg(schoolLogoImg), readyImg(waveBgImg));
    frontTex.needsUpdate = true;
  };
  const redrawCardBack = () => {
    drawArchivalCardFace(backCanvas, false, null, readyImg(schoolLogoImg), null);
    backTex.needsUpdate = true;
  };

  redrawCardFront();
  redrawCardBack();

  portraitImg.onload = () => {
    redrawCardFront();
    wakePhysics();
  };
  schoolLogoImg.onload = () => {
    redrawCardFront();
    redrawCardBack();
    wakePhysics();
  };
  waveBgImg.onload = () => {
    redrawCardFront();
    wakePhysics();
  };

  portraitImg.src = 'assets/portrait-about.webp';
  schoolLogoImg.src = 'assets/smk-skill-village-logo.png';
  waveBgImg.src = 'assets/card-wave-bg.jpg';

  const cardGroup = new THREE.Group();
  const bodyMesh = new THREE.Mesh(bodyGeo, cardBodyMat);
  const frontMesh = new THREE.Mesh(faceGeo, frontMat);
  const backMesh = new THREE.Mesh(faceGeo.clone(), backMat);
  frontMesh.position.z = 0.0166;
  backMesh.position.z = -0.0166;
  backMesh.rotation.y = Math.PI;
  const splitRingMesh = new THREE.Mesh(new THREE.TorusGeometry(RING_RADIUS, 0.0135, 18, 72), metalMat);
  splitRingMesh.position.set(0, RING_Y, 0);
  splitRingMesh.rotation.y = Math.PI / 2 - 0.68;
  cardGroup.add(bodyMesh, frontMesh, backMesh, splitRingMesh);
  rigRoot.add(cardGroup);

  const clampGroup = new THREE.Group();
  const clampCollarMesh = new THREE.Mesh(clampGeo, metalMat);
  clampCollarMesh.position.y = 0.107;
  const swivelLoopMesh = new THREE.Mesh(new THREE.TorusGeometry(0.036, 0.0105, 14, 40), metalMat);
  clampGroup.add(clampCollarMesh, swivelLoopMesh);
  rigRoot.add(clampGroup);

  // High-resolution ribbon geometry (72 spline samples, 4 cross-section vertices)
  const RIBBON_SEGS = 72;
  const CROSS_U = [0, 0.07, 0.93, 1];
  const CROSS_ANGLES = [-0.95, -0.28, 0.28, 0.95].map((a) => [Math.cos(a), Math.sin(a)]);
  const ribbonGeo = new THREE.BufferGeometry();
  ribbonGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(RIBBON_SEGS * 4 * 3), 3));
  ribbonGeo.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(RIBBON_SEGS * 4 * 3), 3));
  ribbonGeo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(RIBBON_SEGS * 4 * 2), 2));
  const ribbonIndices = [];
  for (let i = 0; i < RIBBON_SEGS - 1; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const a = i * 4 + j;
      ribbonIndices.push(a, a + 4, a + 1, a + 1, a + 4, a + 5);
    }
  }
  ribbonGeo.setIndex(ribbonIndices);
  const strapMesh = new THREE.Mesh(ribbonGeo, strapMat);
  strapMesh.frustumCulled = false;
  rigRoot.add(strapMesh);

  // PBD 4-link rope + Rigid Body State
  const ROPE_LINKS = 4;
  const NODE_INV_MASS = 20;
  const SUB_DT = 1 / 960;
  const phys = {
    nodes: Array.from({ length: ROPE_LINKS + 1 }, () => new THREE.Vector3()),
    prevNodes: Array.from({ length: ROPE_LINKS + 1 }, () => new THREE.Vector3()),
    velNodes: Array.from({ length: ROPE_LINKS + 1 }, () => new THREE.Vector3()),
    lengths: new Float64Array(ROPE_LINKS),
    impulses: new Float64Array(ROPE_LINKS),
    rest: 0.4,
    anchor: new THREE.Vector3(),
    body: {
      position: new THREE.Vector3(),
      prevPosition: new THREE.Vector3(),
      velocity: new THREE.Vector3(),
      quaternion: new THREE.Quaternion(),
      prevQuaternion: new THREE.Quaternion(),
      angular: new THREE.Vector3(),
      mass: 1,
      invInertia: new THREE.Vector3(
        12 / (CARD_H * CARD_H + 0.032 * 0.032),
        12 / (CARD_W * CARD_W + 0.032 * 0.032),
        12 / (CARD_W * CARD_W + CARD_H * CARD_H),
      ),
      hang: new THREE.Vector3(0, HANG_Y, 0),
    },
    grab: null,
    turn: 0,
    twist: 0,
    twistRaw: 0,
    calm: 0,
  };

  // Scratch vectors to avoid per-frame GC churn
  const _va = new THREE.Vector3();
  const _vb = new THREE.Vector3();
  const _vc = new THREE.Vector3();
  const _vd = new THREE.Vector3();
  const _ve = new THREE.Vector3();
  const _vf = new THREE.Vector3();
  const _vg = new THREE.Vector3();
  const _vpin = new THREE.Vector3();
  const _qa = new THREE.Quaternion();
  const _qb = new THREE.Quaternion();
  const _splinePts = [];
  const _splineCurve = new THREE.CatmullRomCurve3(_splinePts, false, 'centripetal');
  const _sampledPts = Array.from({ length: RIBBON_SEGS }, () => new THREE.Vector3());
  const _frameX = Array.from({ length: RIBBON_SEGS }, () => new THREE.Vector3());
  const _basisMat = new THREE.Matrix4();
  const _sUp = new THREE.Vector3();
  const _sTan = new THREE.Vector3();
  const _sCam = new THREE.Vector3();
  const _sAcross = new THREE.Vector3();
  const _sFacing = new THREE.Vector3();
  const _sEnd = new THREE.Vector3();
  const _rTop = new THREE.Vector3();
  const _rTip = new THREE.Vector3();

  function invMassAtBodyPoint(body, localArm, dir) {
    const rxc = _vc.crossVectors(localArm, dir);
    _qb.copy(body.quaternion).invert();
    _vd.copy(rxc).applyQuaternion(_qb);
    _vd.set(_vd.x * body.invInertia.x, _vd.y * body.invInertia.y, _vd.z * body.invInertia.z);
    _vd.applyQuaternion(body.quaternion);
    return 1 / body.mass + rxc.dot(_vd);
  }

  function applyWorldDeltaToBody(body, localArm, delta) {
    body.position.addScaledVector(delta, 1 / body.mass);
    const torque = _ve.crossVectors(localArm, delta);
    _qb.copy(body.quaternion).invert();
    _vf.copy(torque).applyQuaternion(_qb);
    _vf.set(_vf.x * body.invInertia.x, _vf.y * body.invInertia.y, _vf.z * body.invInertia.z);
    _vf.applyQuaternion(body.quaternion);
    const { x, y, z, w } = body.quaternion;
    body.quaternion.x += 0.5 * (_vf.x * w + _vf.y * z - _vf.z * y);
    body.quaternion.y += 0.5 * (_vf.y * w + _vf.z * x - _vf.x * z);
    body.quaternion.z += 0.5 * (_vf.z * w + _vf.x * y - _vf.y * x);
    body.quaternion.w += 0.5 * (-_vf.x * x - _vf.y * y - _vf.z * z);
    body.quaternion.normalize();
  }

  function solveLink(idx, dt, cfg) {
    const nodeA = phys.nodes[idx];
    const wA = idx === 0 ? 0 : NODE_INV_MASS;
    const isLast = idx === ROPE_LINKS - 1;
    const arm = _vg;
    let nodeB = phys.nodes[idx + 1];
    if (isLast) {
      arm.copy(phys.body.hang).applyQuaternion(phys.body.quaternion);
      nodeB = _vb.copy(phys.body.position).add(arm);
    }
    const diff = _va.subVectors(nodeB, nodeA);
    const len = diff.length();
    const stretch = len - phys.rest;
    if (stretch <= 0 || len < 1e-9) return;
    const dir = diff.divideScalar(len);
    const wB = isLast ? invMassAtBodyPoint(phys.body, arm, dir) : NODE_INV_MASS;
    const rate = (len - phys.lengths[idx]) / dt;
    const impulse =
      (cfg.hold * Math.tanh((cfg.stiffness * stretch) / cfg.hold) +
        cfg.spring * stretch +
        cfg.bandDamping * Math.max(0, rate)) *
        dt *
        dt -
      phys.impulses[idx];
    if (impulse <= 0) return;
    const clamped = Math.min(stretch / (wA + wB), impulse);
    phys.impulses[idx] += clamped;
    if (wA) nodeA.addScaledVector(dir, clamped * wA);
    if (isLast) {
      applyWorldDeltaToBody(phys.body, arm, dir.multiplyScalar(-clamped));
    } else {
      nodeB.addScaledVector(dir, -clamped * wB);
    }
  }

  function resetSimulation(swingIn = false) {
    const { nodes, prevNodes, velNodes, body, anchor } = phys;
    nodes[0].copy(anchor);
    for (let i = 1; i <= ROPE_LINKS; i += 1) {
      nodes[i].copy(nodes[i - 1]);
      if (swingIn) nodes[i].x += phys.rest;
      else nodes[i].y -= phys.rest;
    }
    body.quaternion.identity();
    if (swingIn) body.quaternion.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.PI / 2);
    const hangWorld = _va.copy(body.hang).applyQuaternion(body.quaternion);
    body.position.copy(nodes[ROPE_LINKS]).sub(hangWorld);
    body.prevPosition.copy(body.position);
    body.prevQuaternion.copy(body.quaternion);
    body.velocity.set(0, 0, 0);
    body.angular.set(0, 0, 0);
    if (swingIn) {
      body.velocity.set(-4.2, -1.3, 0);
      body.angular.z = -5.0;
    }
    for (let i = 0; i <= ROPE_LINKS; i += 1) {
      prevNodes[i].copy(nodes[i]);
      velNodes[i].set(0, 0, 0);
    }
    phys.lengths.fill(phys.rest);
    phys.turn = 0;
    phys.twist = 0;
    phys.twistRaw = 0;
    phys.calm = 0;
  }

  let worldH = 4;
  let worldW = 4;
  let introX = 0;
  let introStart = null;
  let simTime = 0;
  let lastFrameMs = performance.now();
  let rafId = 0;
  let initialized = false;
  let inViewport = true;
  let destroyed = false;
  let autoReturning = false;
  let nextAutoFlipAt = 10 + Math.random() * 6;
  let isHoveringCard = false;

  function configureFraming(width, height) {
    const aspect = Math.max(0.25, width / height);
    worldH = CARD_H / 0.62;
    const minWorldW = CARD_W / 0.72;
    if (worldH * aspect < minWorldW) {
      worldH = minWorldW / aspect;
    }
    worldW = worldH * aspect;

    camera.aspect = aspect;
    camera.position.set(0, 0, worldH / 2 / Math.tan((FOV_DEG * Math.PI) / 360));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();

    const isMobile = window.innerWidth <= 767;
    const anchorPct = isMobile ? 0.5 : window.innerWidth >= 1024 ? 0.73 : 0.74;
    const anchorX = (anchorPct - 0.5) * worldW;
    const anchorY = worldH * 0.5 + 0.06;
    // Match strapLength 0.59 so badge centers comfortably in upper-right hero slot clear of navbar
    const hangPointY = worldH * 0.5 - worldH * (0.12 + 0.3 * 0.59) + (HANG_Y - CARD_H * 0.5);
    const totalRopeLen = Math.max(0.5, anchorY - hangPointY);

    phys.anchor.set(anchorX, anchorY, 0);
    phys.rest = totalRopeLen / ROPE_LINKS;
    phys.nodes[0].copy(phys.anchor);
    phys.prevNodes[0].copy(phys.anchor);

    if (!initialized) {
      if (!REDUCED_MOTION) {
        introX = worldW * 1.1;
        rigRoot.position.x = introX;
      }
      resetSimulation(!REDUCED_MOTION);
      initialized = true;
    }
  }

  function stepPhysics(dt) {
    const cfg = {
      gravity: 48,
      hold: 48 * 4.5,
      stiffness: 48 * 40,
      spring: 48 * 0.28 * ROPE_LINKS,
      bandDamping: 48 * 0.14 * ROPE_LINKS,
      linearDrag: 0.66,
      angularDrag: 1.18,
      air: 0.15,
      broadside: 0.5,
      spinAir: 0.03,
      nodeDrag: 2,
      nodeAir: 0.2,
      twist: 30,
      twistDamping: 3,
      grip: 40,
      gripDamping: 6,
      breeze: REDUCED_MOTION ? 0 : 0.1,
    };

    const steps = Math.max(1, Math.ceil(dt / SUB_DT - 1e-6));
    const subDt = dt / steps;
    const wx = cfg.breeze * (Math.sin(simTime * 0.53) * 0.7 + Math.sin(simTime * 1.31 + 1.7) * 0.3) * 3;
    const wz = cfg.breeze * Math.sin(simTime * 0.37 + 0.6) * 2;
    const nodeDragMul = Math.exp(-cfg.nodeDrag * subDt);
    const linDragMul = Math.exp(-cfg.linearDrag * subDt);
    const angDragMul = Math.exp(-cfg.angularDrag * subDt);
    const grab = phys.grab;
    const { nodes, prevNodes, velNodes, body } = phys;

    for (let s = 0; s < steps; s += 1) {
      for (let i = 1; i < ROPE_LINKS; i += 1) {
        const v = velNodes[i];
        v.y -= cfg.gravity * subDt;
        v.x += wx * subDt;
        v.z += wz * subDt;
        prevNodes[i].copy(nodes[i]);
        nodes[i].addScaledVector(v, subDt);
      }

      body.prevPosition.copy(body.position);
      body.prevQuaternion.copy(body.quaternion);

      if (grab) {
        const dq = _qa.copy(grab.rotation).multiply(_qb.copy(body.quaternion).invert());
        if (dq.w < 0) dq.set(-dq.x, -dq.y, -dq.z, -dq.w);
        const torque = _va.set(dq.x, dq.y, dq.z).multiplyScalar(2 * cfg.grip);
        torque.addScaledVector(body.angular, -cfg.gripDamping);
        _qb.copy(body.quaternion).invert();
        _vb.copy(torque).applyQuaternion(_qb);
        _vb.set(_vb.x * body.invInertia.x, _vb.y * body.invInertia.y, _vb.z * body.invInertia.z);
        _vb.applyQuaternion(body.quaternion);
        body.angular.addScaledVector(_vb, subDt);
      }

      // Compute continuous twist angle around card UP axis
      const upVec = _va.set(0, 1, 0).applyQuaternion(body.quaternion);
      const projFwd = _vb.set(-upVec.x * upVec.z, -upVec.y * upVec.z, 1 - upVec.z * upVec.z);
      if (projFwd.lengthSq() > 0.001) {
        const cardFwd = _vd.set(0, 0, 1).applyQuaternion(body.quaternion);
        const rawAngle = Math.atan2(_ve.crossVectors(projFwd, cardFwd).dot(upVec), projFwd.dot(cardFwd));
        let deltaAngle = rawAngle - phys.twistRaw;
        if (deltaAngle > Math.PI) deltaAngle -= Math.PI * 2;
        else if (deltaAngle < -Math.PI) deltaAngle += Math.PI * 2;
        phys.twist += deltaAngle;
        phys.twistRaw = rawAngle;
      }

      if (!grab) {
        const upVel = body.angular.dot(upVec);
        body.angular.addScaledVector(
          upVec,
          (cfg.twist * (phys.turn - phys.twist) - cfg.twistDamping * upVel) * subDt,
        );
      }

      body.velocity.y -= cfg.gravity * subDt;
      body.velocity.x += wx * 0.35 * subDt;
      body.velocity.z += wz * 0.35 * subDt;
      body.position.addScaledVector(body.velocity, subDt);

      // Quaternion step
      const dAng = _vf.copy(body.angular).multiplyScalar(subDt);
      const qx = body.quaternion.x;
      const qy = body.quaternion.y;
      const qz = body.quaternion.z;
      const qw = body.quaternion.w;
      body.quaternion.x += 0.5 * (dAng.x * qw + dAng.y * qz - dAng.z * qy);
      body.quaternion.y += 0.5 * (dAng.y * qw + dAng.z * qx - dAng.x * qz);
      body.quaternion.z += 0.5 * (dAng.z * qw + dAng.x * qy - dAng.y * qx);
      body.quaternion.w += 0.5 * (-dAng.x * qx - dAng.y * qy - dAng.z * qz);
      body.quaternion.normalize();

      phys.impulses.fill(0);
      if (grab) _vpin.lerpVectors(grab.from, grab.target, (s + 1) / steps);

      for (let iter = 0; iter < 2; iter += 1) {
        for (let k = 0; k < ROPE_LINKS; k += 1) solveLink(k, subDt, cfg);
        if (grab) {
          const arm = _vg.copy(grab.local).applyQuaternion(body.quaternion);
          const corr = _va.copy(_vpin).sub(body.position).sub(arm);
          const cLen = corr.length();
          if (cLen >= 1e-9) {
            const cDir = corr.divideScalar(cLen);
            applyWorldDeltaToBody(body, arm, cDir.multiplyScalar(cLen / invMassAtBodyPoint(body, arm, cDir)));
          }
        }
      }

      for (let i = 1; i < ROPE_LINKS; i += 1) {
        const v = velNodes[i].subVectors(nodes[i], prevNodes[i]).divideScalar(subDt).multiplyScalar(nodeDragMul);
        v.multiplyScalar(1 / (1 + cfg.nodeAir * v.length() * subDt));
      }

      body.velocity.subVectors(body.position, body.prevPosition).divideScalar(subDt);
      const qDelta = _qa.copy(body.prevQuaternion).invert().premultiply(body.quaternion);
      body.angular.set(qDelta.x, qDelta.y, qDelta.z).multiplyScalar((2 / subDt) * (qDelta.w < 0 ? -1 : 1));

      const cardNormalVec = _va.set(0, 0, 1).applyQuaternion(body.quaternion);
      const normSpeed = body.velocity.dot(cardNormalVec);
      const slipVel = _vb.copy(body.velocity).addScaledVector(cardNormalVec, -normSpeed);
      slipVel.multiplyScalar(1 / (1 + cfg.air * slipVel.length() * subDt));
      body.velocity
        .copy(slipVel)
        .addScaledVector(cardNormalVec, normSpeed / (1 + cfg.broadside * Math.abs(normSpeed) * subDt))
        .multiplyScalar(linDragMul);
      body.angular.multiplyScalar(angDragMul / (1 + cfg.spinAir * body.angular.length() * subDt));

      if (body.velocity.lengthSq() > 3600) body.velocity.setLength(60);
      if (body.angular.lengthSq() > 1600) body.angular.setLength(40);

      nodes[ROPE_LINKS].copy(body.hang).applyQuaternion(body.quaternion).add(body.position);
      for (let k = 0; k < ROPE_LINKS; k += 1) {
        phys.lengths[k] = nodes[k].distanceTo(nodes[k + 1]);
      }
    }

    if (grab) grab.from.copy(grab.target);

    let energy = body.velocity.lengthSq() + body.angular.lengthSq() * 0.3;
    for (let i = 1; i < ROPE_LINKS; i += 1) energy += velNodes[i].lengthSq() * 0.05;
    phys.calm = energy < 2e-4 ? phys.calm + dt : 0;
  }

  function updateStrapAndClamp() {
    const endNode = phys.nodes[ROPE_LINKS];
    const leadLen = 0.236;
    let pivotIdx = 3;
    while (pivotIdx > 0 && phys.nodes[pivotIdx].distanceTo(endNode) < leadLen * 1.1) {
      pivotIdx -= 1;
    }
    const strapUp = _sUp.subVectors(phys.nodes[pivotIdx], endNode);
    if (strapUp.lengthSq() < 1e-8) {
      strapUp.set(0, 1, 0).applyQuaternion(phys.body.quaternion);
    }
    strapUp.normalize();
    _rTop.copy(endNode).addScaledVector(strapUp, leadLen);
    _rTip.copy(endNode).addScaledVector(strapUp, 0.0885);

    _splinePts.length = 0;
    for (let i = 0; i <= pivotIdx; i += 1) _splinePts.push(phys.nodes[i]);
    _splinePts.push(_rTop, _rTip);
    _splineCurve.updateArcLengths();

    for (let i = 0; i < RIBBON_SEGS; i += 1) {
      _splineCurve.getPointAt(i / (RIBBON_SEGS - 1), _sampledPts[i]);
    }

    const totalLen = _splineCurve.getLength();
    const twistRegion = 1 - _rTop.distanceTo(_rTip) / Math.max(totalLen, 0.001);
    const posAttr = ribbonGeo.getAttribute('position');
    const normAttr = ribbonGeo.getAttribute('normal');
    const uvAttr = ribbonGeo.getAttribute('uv');
    const restTotal = phys.rest * ROPE_LINKS;
    const uvRepeat = restTotal / (STRAP_WIDTH * 2);
    const dynamicWidth = STRAP_WIDTH / Math.pow(Math.max(1, totalLen / Math.max(restTotal, 0.001)), 0.35);

    for (let i = 0; i < RIBBON_SEGS; i += 1) {
      _sTan.subVectors(_sampledPts[Math.min(RIBBON_SEGS - 1, i + 1)], _sampledPts[Math.max(0, i - 1)]);
      if (_sTan.lengthSq() < 1e-12) _sTan.set(0, -1, 0);
      _sTan.normalize();
      _sCam.subVectors(camera.position, _sampledPts[i]).normalize();
      const sideAxis = _frameX[i].crossVectors(_sCam, _sTan);
      if (sideAxis.lengthSq() < 1e-10) {
        sideAxis.copy(i > 0 ? _frameX[i - 1] : _va.set(1, 0, 0));
      }
      sideAxis.normalize();
      if (i > 0 && sideAxis.dot(_frameX[i - 1]) < 0) sideAxis.negate();

      const localTwist = -phys.twist * Math.pow(Math.min(1, i / (RIBBON_SEGS - 1) / Math.max(0.05, twistRegion)), 1.3);
      _sFacing.crossVectors(_sTan, sideAxis);
      _sAcross.copy(sideAxis).multiplyScalar(Math.cos(localTwist)).addScaledVector(_sFacing, Math.sin(localTwist));
      _sFacing.crossVectors(_sTan, _sAcross);

      const pt = _sampledPts[i];
      const vCoord = (1 - i / (RIBBON_SEGS - 1)) * uvRepeat;
      for (let j = 0; j < 4; j += 1) {
        const vertIdx = i * 4 + j;
        const offsetW = (CROSS_U[j] - 0.5) * dynamicWidth;
        const [ca, sa] = CROSS_ANGLES[j];
        posAttr.setXYZ(vertIdx, pt.x + _sAcross.x * offsetW, pt.y + _sAcross.y * offsetW, pt.z + _sAcross.z * offsetW);
        normAttr.setXYZ(
          vertIdx,
          _sFacing.x * ca + _sAcross.x * sa,
          _sFacing.y * ca + _sAcross.y * sa,
          _sFacing.z * ca + _sAcross.z * sa,
        );
        uvAttr.setXY(vertIdx, CROSS_U[j], vCoord);
      }
    }

    _sEnd.copy(_sAcross);
    posAttr.needsUpdate = true;
    normAttr.needsUpdate = true;
    uvAttr.needsUpdate = true;

    _sAcross.copy(_sEnd).addScaledVector(strapUp, -_sEnd.dot(strapUp)).normalize();
    _sFacing.crossVectors(_sAcross, strapUp).normalize();
    _basisMat.makeBasis(_sAcross, strapUp, _sFacing);
    clampGroup.quaternion.setFromRotationMatrix(_basisMat);
    clampGroup.position.copy(endNode);
  }

  function triggerFlip(hitWorldPos, impulse = 9) {
    const upAxis = _va.set(0, 1, 0).applyQuaternion(phys.body.quaternion);
    let sign = phys.turn > 0 ? -1 : 1;
    if (phys.turn === 0 && hitWorldPos) {
      const toCam = _vc.subVectors(hitWorldPos, camera.position).normalize();
      sign = _vb.subVectors(hitWorldPos, phys.body.position).cross(toCam).dot(upAxis) < 0 ? -1 : 1;
    }
    phys.turn = phys.turn === 0 ? Math.PI * sign : 0;
    phys.body.angular.addScaledVector(upAxis, impulse * sign);
    wakePhysics();
  }

  // Expose lightweight clean flip helper only for keyboard/focus convenience
  container.setAttribute('aria-description', 'Interactive 3D ID Badge. Drag to swing or click to flip 180 degrees.');

  // Raycast interaction (true 3D mesh intersection -> hover grab, drag, click-to-flip)
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let clickTracker = null;

  function castCard(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return null;
    ndc.set(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    cardGroup.updateMatrixWorld();
    return raycaster.intersectObjects([bodyMesh, frontMesh, backMesh], false)[0] || null;
  }

  function setCanvasCursor(value) {
    if (canvas.style.cursor !== value) canvas.style.cursor = value;
  }

  function onPointerDown(e) {
    if (e.button > 0) return;
    const hit = castCard(e.clientX, e.clientY);
    if (!hit) return;

    autoReturning = false;
    nextAutoFlipAt = simTime + 12 + Math.random() * 6;
    const localPt = hit.point.clone().sub(phys.body.position).applyQuaternion(phys.body.quaternion.clone().invert());
    phys.grab = {
      local: localPt,
      rotation: phys.body.quaternion.clone(),
      reach: hit.distance,
      from: hit.point.clone(),
      target: hit.point.clone(),
    };
    clickTracker = { x: e.clientX, y: e.clientY, time: performance.now(), point: hit.point.clone() };
    canvas.setPointerCapture?.(e.pointerId);
    setCanvasCursor('grabbing');
    e.preventDefault();
    wakePhysics();
  }

  function onPointerMove(e) {
    if (phys.grab) {
      const rect = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      if (clickTracker && Math.hypot(e.clientX - clickTracker.x, e.clientY - clickTracker.y) > 7) {
        clickTracker = null;
      }
      raycaster.ray.at(phys.grab.reach, phys.grab.target);
      wakePhysics();
      return;
    }

    if (e.pointerType !== 'touch') {
      isHoveringCard = !!castCard(e.clientX, e.clientY);
      setCanvasCursor(isHoveringCard ? 'grab' : 'default');
    }
  }

  function onPointerUp(e) {
    if (!phys.grab) return;
    const releaseTracker = clickTracker;
    phys.grab = null;
    clickTracker = null;
    canvas.releasePointerCapture?.(e.pointerId);

    if (releaseTracker && e.type === 'pointerup' && performance.now() - releaseTracker.time < 450) {
      triggerFlip(releaseTracker.point, 9);
      nextAutoFlipAt = simTime + 12 + Math.random() * 6;
    }

    if (e.pointerType !== 'touch') {
      isHoveringCard = !!castCard(e.clientX, e.clientY);
      setCanvasCursor(isHoveringCard ? 'grab' : 'default');
    } else {
      isHoveringCard = false;
      setCanvasCursor('default');
    }
    wakePhysics();
  }

  function onTouchStart(e) {
    if (e.touches.length === 1 && castCard(e.touches[0].clientX, e.touches[0].clientY)) {
      e.preventDefault();
    }
  }

  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);
  canvas.addEventListener('lostpointercapture', onPointerUp);
  canvas.addEventListener('touchstart', onTouchStart, { passive: false });

  function renderFrame() {
    cardGroup.position.copy(phys.body.position);
    cardGroup.quaternion.copy(phys.body.quaternion);
    updateStrapAndClamp();
    renderer.render(scene, camera);
    resolveLanyardReady();
  }

  function tick(now) {
    rafId = 0;
    if (destroyed) return;
    const dt = Math.min(1 / 30, Math.max(1 / 240, (now - lastFrameMs) / 1000));
    lastFrameMs = now;
    simTime += dt;

    if (introX > 0) {
      if (introStart === null) introStart = now;
      const p = Math.min(1, Math.max(0, (now - introStart) / 100));
      rigRoot.position.x = introX * Math.pow(1 - p, 3);
      if (p === 1) introX = 0;
    }

    // Subtle idle auto-flip (paused whenever hovered/grabbed or reduced motion)
    if (!REDUCED_MOTION && !phys.grab && !isHoveringCard) {
      if (autoReturning && phys.twist * Math.sign(phys.turn || 1) >= Math.PI * 0.85) {
        autoReturning = false;
        triggerFlip(phys.body.position, 3.5);
        nextAutoFlipAt = simTime + 10 + Math.random() * 10;
      } else if (!autoReturning && phys.turn === 0 && simTime >= nextAutoFlipAt) {
        triggerFlip(phys.body.position, 3.5);
        autoReturning = phys.turn !== 0;
      }
    }

    stepPhysics(dt);
    if (
      !Number.isFinite(
        phys.body.position.x + phys.body.position.y + phys.body.position.z + phys.body.quaternion.w,
      )
    ) {
      phys.grab = null;
      resetSimulation(false);
    }

    renderFrame();

    const shouldStayAwake = !(phys.calm > 1.2 && !phys.grab && REDUCED_MOTION);
    if (inViewport && shouldStayAwake) {
      rafId = window.requestAnimationFrame(tick);
    }
  }

  function wakePhysics() {
    phys.calm = 0;
    if (!rafId && inViewport && !destroyed) {
      lastFrameMs = performance.now();
      rafId = window.requestAnimationFrame(tick);
    }
  }

  function handleResize() {
    syncMobileClass();
    const w = Math.max(1, stage.clientWidth || container.clientWidth);
    const h = Math.max(1, stage.clientHeight || container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    configureFraming(w, h);
    renderFrame();
  }

  const ro = new ResizeObserver(handleResize);
  ro.observe(stage);
  window.addEventListener('resize', handleResize);

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      inViewport = !!entries[0]?.isIntersecting;
      if (inViewport) wakePhysics();
    });
    io.observe(stage);
  }

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && inViewport) wakePhysics();
  });

  handleResize();
  wakePhysics();
}
/* ========================================================================
   Spotify Embed Loader State
   ======================================================================== */
function initSpotifyEmbed() {
  const iframe = document.getElementById('spotify-embed-frame');
  const skeleton = document.getElementById('spotify-player-skeleton');
  const openLink = document.getElementById('spotify-open-link');

  openLink?.addEventListener('click', () => {
    AudioEngine.playClick(690, 0.05);
  });

  if (!iframe || !skeleton) return;

  const markLoaded = () => {
    skeleton.classList.add('is-loaded');
  };

  iframe.addEventListener('load', markLoaded, { once: true });

  // Arm failsafe timeout only once lazy iframe enters preload range.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        window.setTimeout(markLoaded, 3200);
      }
    }, { rootMargin: '400px 0px' });
    observer.observe(iframe);
  } else {
    window.setTimeout(markLoaded, 3200);
  }
}

/* ========================================================================
   Portfolio Rendering, Tabs, Project Detail View & Cursor Glow
   ======================================================================== */
function createIconSpan(name) {
  return TECH_ICONS[name] || '';
}

function renderPortfolio() {
  const projectsGrid = document.getElementById('projects-grid');
  const designGrid = document.getElementById('design-grid');
  const learningGrid = document.getElementById('learning-grid');
  const skillsGrid = document.getElementById('skills-grid');

  if (projectsGrid) {
    projectsGrid.innerHTML = PROJECTS.map(
      (p) => `
      <article class="portfolio-project-card">
        <div class="liquid-metal-border portfolio-project-metal-border" aria-hidden="true"><canvas></canvas></div>
        <div class="portfolio-project-card-content">
          <div class="portfolio-card-thumbnail">
            <img
              alt="Thumbnail ${p.title}"
              loading="lazy"
              decoding="async"
              class="skeleton-image portfolio-card-thumbnail-image"
              src="${p.thumbnail}"
            >
          </div>
          <div class="portfolio-card-body">
            <h3 class="portfolio-card-title">${p.title}</h3>
            <p class="portfolio-card-desc">${p.shortDesc}</p>
            <button type="button" class="portfolio-details-btn" data-project-id="${p.id}">
              <span>Details</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </article>`,
    ).join('');
  }

  if (designGrid) {
    designGrid.innerHTML = DESIGN_ITEMS.map(
      (d) => `
      <article class="portfolio-showcase-card">
        <div class="portfolio-showcase-icon" aria-hidden="true">${d.icon}</div>
        <span class="portfolio-showcase-meta">${d.meta}</span>
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
        <div class="portfolio-showcase-tags">${d.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </article>`,
    ).join('');
  }

  if (learningGrid) {
    learningGrid.innerHTML = LEARNING_ITEMS.map(
      (l) => `
      <article class="portfolio-showcase-card">
        <div class="portfolio-showcase-icon" aria-hidden="true">${l.icon}</div>
        <span class="portfolio-showcase-meta">${l.meta}</span>
        <h3>${l.title}</h3>
        <p>${l.desc}</p>
        <div class="portfolio-showcase-tags">${l.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </article>`,
    ).join('');
  }

  if (skillsGrid) {
    skillsGrid.innerHTML = TECH_STACK_LIST.map(
      (name) => `
      <article class="border-glow-card portfolio-skill-card"
        style="
          --card-bg: linear-gradient(135deg, rgba(18, 27, 44, 0.92), rgba(10, 15, 28, 0.92));
          --border-radius: 18px;
          --glow-padding: 20px;
          --cone-spread: 25;
          --glow-color: hsl(212deg 95% 68% / 100%);
        "
      >
        <span class="edge-light" aria-hidden="true"></span>
        <div class="border-glow-inner portfolio-skill-card-content">
          <div class="portfolio-skill-mark" aria-hidden="true">
            <div class="portfolio-skill-logo">${createIconSpan(name)}</div>
          </div>
          <p class="portfolio-skill-name">${name}</p>
        </div>
      </article>`,
    ).join('');
  }
}

function initTabsAndDetailView() {
  const tabBtns = [...document.querySelectorAll('.portfolio-tab-btn')];
  const panels = {
    projects: document.getElementById('tab-projects'),
    design: document.getElementById('tab-design'),
    learning: document.getElementById('tab-learning'),
    tech: document.getElementById('tab-tech'),
  };

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      AudioEngine.playClick(740, 0.05);
      const tabKey = btn.dataset.tab;
      tabBtns.forEach((b) => {
        const isActive = b === btn;
        b.classList.toggle('is-active', isActive);
        b.setAttribute('aria-selected', String(isActive));
      });
      Object.entries(panels).forEach(([k, panel]) => {
        if (!panel) return;
        const active = k === tabKey;
        panel.hidden = !active;
        if (active) panel.classList.add('is-revealed');
      });
    });
  });

  // Project Detail View
  const homeView = document.getElementById('home-main-view');
  const detailView = document.getElementById('project-detail-view');
  const backBtn = document.getElementById('project-detail-back');
  const crumbTitle = document.getElementById('detail-crumb-title');
  const titleEl = document.getElementById('detail-title');
  const descEl = document.getElementById('detail-description');
  const actionsEl = document.getElementById('detail-actions');
  const techListEl = document.getElementById('detail-tech-list');
  const previewImg = document.getElementById('detail-preview-img');

  let savedScrollY = 0;

  function openProjectDetail(projectId, pushHash = true) {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project || !homeView || !detailView) return;

    savedScrollY = window.scrollY;
    if (crumbTitle) crumbTitle.textContent = project.title;
    if (titleEl) titleEl.textContent = project.title;
    if (descEl) descEl.textContent = project.fullDesc;

    if (previewImg) {
      previewImg.src = project.thumbnail;
      previewImg.alt = `Pratinjau ${project.title}`;
    }

    if (actionsEl) {
      const links = [];
      if (project.liveUrl) {
        links.push(`
          <a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer" class="project-detail-btn solid">
            <span>Live Demo</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M7 7h10v10"></path><path d="M7 17 17 7"></path>
            </svg>
          </a>`);
      }
      if (project.repoUrl) {
        links.push(`
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-detail-btn outline">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
            <span>Source Code</span>
          </a>`);
      }
      actionsEl.innerHTML = links.join('');
    }

    if (techListEl) {
      techListEl.innerHTML = project.tech
        .map(
          (t) => `<span class="project-detail-tech-chip" data-glow="true">${createIconSpan(t)}${t}</span>`,
        )
        .join('');
    }

    homeView.hidden = true;
    detailView.hidden = false;
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (pushHash) {
      window.history.pushState({ projectId }, '', `#project/${projectId}`);
    }
  }

  function closeProjectDetail(fromPopState = false) {
    if (!homeView || !detailView || detailView.hidden) return;
    detailView.hidden = true;
    homeView.hidden = false;
    if (!fromPopState && window.location.hash.startsWith('#project/')) {
      window.history.pushState(null, '', '#Portofolio');
    }
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: savedScrollY || 0, behavior: 'auto' });
    });
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.portfolio-details-btn');
    if (btn && btn.dataset.projectId) {
      AudioEngine.playClick(780, 0.06);
      openProjectDetail(btn.dataset.projectId);
    }
  });

  backBtn?.addEventListener('click', () => {
    AudioEngine.playClick(580, 0.05);
    closeProjectDetail(false);
  });

  window.addEventListener('popstate', () => {
    if (window.location.hash.startsWith('#project/')) {
      const slug = window.location.hash.replace('#project/', '');
      openProjectDetail(slug, false);
    } else {
      closeProjectDetail(true);
    }
  });

  if (window.location.hash.startsWith('#project/')) {
    openProjectDetail(window.location.hash.replace('#project/', ''), false);
  }
}

function initCursorGlow() {
  if (REDUCED_MOTION) return;

  // Border Glow Card Pointer Angle + Edge Proximity
  document.addEventListener('pointermove', (e) => {
    document.querySelectorAll('.border-glow-card').forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const angle = (Math.atan2(y - cy, x - cx) * 180) / Math.PI + 90;

      const distToEdge = Math.min(x, y, rect.width - x, rect.height - y);
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      const proximity = inside
        ? Math.max(0, Math.min(100, 100 - (distToEdge / Math.min(cx, cy)) * 45))
        : 0;

      card.style.setProperty('--cursor-angle', `${angle.toFixed(1)}deg`);
      card.style.setProperty('--edge-proximity', proximity.toFixed(1));
    });

    // Fixed viewport coordinates for .project-detail-tech-chip radial highlight
    document.documentElement.style.setProperty('--tech-glow-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--tech-glow-y', `${e.clientY}px`);
  });
}

/* ========================================================================
   Contact Form (FormSubmit AJAX), Copy Email & Visitor Comments Board
   ======================================================================== */
function formatRelativeTime(iso) {
  const diffMin = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (diffMin < 1) return 'baru saja';
  if (diffMin < 60) return `${diffMin} menit lalu`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr} jam lalu`;
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function resizeAvatarToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca gambar'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('File gambar tidak valid'));
      img.onload = () => {
        const size = 96;
        const c = document.createElement('canvas');
        c.width = size;
        c.height = size;
        const ctx = c.getContext('2d');
        const minSide = Math.min(img.width, img.height);
        const sx = (img.width - minSide) / 2;
        const sy = (img.height - minSide) / 2;
        ctx.drawImage(img, sx, sy, minSide, minSide, 0, 0, size, size);
        resolve(c.toDataURL('image/webp', 0.84));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

function initContactAndComments() {
  // Contact FormSubmit AJAX
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const submitLabel = document.getElementById('contact-submit-label');
  const statusBox = document.getElementById('contact-status');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      AudioEngine.playClick(700, 0.06);
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Mengirim...';
      if (statusBox) {
        statusBox.hidden = true;
        statusBox.classList.remove('is-error');
      }

      try {
        const formData = new FormData(contactForm);
        const res = await fetch(contactForm.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });
        if (!res.ok) throw new Error('Gagal mengirim pesan');
        contactForm.reset();
        if (statusBox) {
          statusBox.textContent = 'Pesan berhasil terkirim ke email Nugi. Terima kasih sudah menghubungi!';
          statusBox.hidden = false;
        }
      } catch {
        if (statusBox) {
          statusBox.textContent = `Pengiriman gagal atau sedang offline. Silakan email langsung ke ${EMAIL_ADDRESS}.`;
          statusBox.classList.add('is-error');
          statusBox.hidden = false;
        }
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = 'Kirim Pesan';
      }
    });
  }

  // Copy Email Button
  const copyBtn = document.getElementById('copy-email-btn');
  const copyLabel = document.getElementById('copy-email-label');
  copyBtn?.addEventListener('click', async () => {
    AudioEngine.playClick(760, 0.05);
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      if (copyLabel) copyLabel.textContent = 'Tersalin!';
      window.setTimeout(() => {
        if (copyLabel) copyLabel.textContent = 'Salin';
      }, 2000);
    } catch {
      window.location.href = `mailto:${EMAIL_ADDRESS}`;
    }
  });

  // Visitor Comments Guestbook (localStorage)
  const commentForm = document.getElementById('comment-form');
  const commentName = document.getElementById('comment-name');
  const commentMsg = document.getElementById('comment-message');
  const commentPhoto = document.getElementById('comment-photo');
  const photoLabel = document.getElementById('comment-photo-label');
  const errorBox = document.getElementById('comment-error');
  const countSpan = document.getElementById('comment-count');
  const listEl = document.getElementById('comments-list');

  let pendingAvatar = '';

  function loadComments() {
    try {
      const raw = window.localStorage.getItem(COMMENTS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function renderComments() {
    const items = loadComments();
    if (countSpan) countSpan.textContent = `(${items.length})`;
    if (!listEl) return;

    listEl.textContent = '';
    if (!items.length) {
      const empty = document.createElement('p');
      empty.className = 'contact-comments-empty';
      empty.textContent = 'Belum ada komentar. Jadilah yang pertama meninggalkan pesan.';
      listEl.appendChild(empty);
      return;
    }

    items.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'contact-comment-item';

      if (item.avatar) {
        const img = document.createElement('img');
        img.className = 'contact-comment-avatar';
        img.src = item.avatar;
        img.alt = '';
        article.appendChild(img);
      } else {
        const fallback = document.createElement('span');
        fallback.className = 'contact-comment-avatar contact-comment-avatar-fallback';
        fallback.setAttribute('aria-hidden', 'true');
        fallback.innerHTML =
          '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"></circle><path d="M20 21a8 8 0 0 0-16 0"></path></svg>';
        article.appendChild(fallback);
      }

      const content = document.createElement('div');
      content.className = 'contact-comment-content';

      const meta = document.createElement('div');
      meta.className = 'contact-comment-meta';
      const strong = document.createElement('strong');
      strong.textContent = item.name;
      const time = document.createElement('time');
      time.dateTime = item.createdAt;
      time.textContent = formatRelativeTime(item.createdAt);
      meta.append(strong, time);

      const p = document.createElement('p');
      p.textContent = item.message;

      content.append(meta, p);
      article.appendChild(content);
      listEl.appendChild(article);
    });
  }

  commentPhoto?.addEventListener('change', async () => {
    if (errorBox) errorBox.hidden = true;
    const file = commentPhoto.files?.[0];
    if (!file) {
      pendingAvatar = '';
      if (photoLabel) photoLabel.querySelector('span').textContent = 'Pilih Foto Profil';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      pendingAvatar = '';
      commentPhoto.value = '';
      if (errorBox) {
        errorBox.textContent = 'Ukuran gambar maksimal 5MB.';
        errorBox.hidden = false;
      }
      return;
    }
    try {
      pendingAvatar = await resizeAvatarToDataUrl(file);
      if (photoLabel) photoLabel.querySelector('span').textContent = file.name;
    } catch {
      pendingAvatar = '';
    }
  });

  commentForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    AudioEngine.playClick(720, 0.05);
    const nameVal = (commentName?.value || '').trim();
    const msgVal = (commentMsg?.value || '').trim();
    if (!nameVal || !msgVal) return;

    const items = loadComments();
    items.unshift({
      name: nameVal.slice(0, 80),
      message: msgVal.slice(0, 1000),
      avatar: pendingAvatar,
      createdAt: new Date().toISOString(),
    });
    try {
      window.localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(items.slice(0, 30)));
    } catch {
      // Ignore storage full errors
    }

    commentForm.reset();
    pendingAvatar = '';
    if (photoLabel) photoLabel.querySelector('span').textContent = 'Pilih Foto Profil';
    renderComments();
  });

  renderComments();

  // Footer Back To Top
  document.getElementById('back-to-top-btn')?.addEventListener('click', () => {
    AudioEngine.playClick(640, 0.05);
    window.scrollTo({ top: 0, behavior: REDUCED_MOTION ? 'auto' : 'smooth' });
  });
}

/* ========================================================================
   Boot
   ======================================================================== */
function boot() {
  initPreloader();
  initNavbar();
  initParticles();
  initAmbientParallax();
  initTypewriter();
  initLanyard();
  initAboutSpotlight();
  renderPortfolio();
  initTabsAndDetailView();
  initCursorGlow();
  initLiquidMetalBorders();
  initSpotifyEmbed();
  initContactAndComments();
  initScrollReveal();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
