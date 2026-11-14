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
   Particle Starfield Canvas & Ambient Parallax Orbs
   ======================================================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let w = 0;
  let h = 0;
  const count = window.innerWidth < 768 ? 50 : 92;
  const stars = Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    r: 0.7 + Math.random() * 1.5,
    alpha: 0.24 + Math.random() * 0.56,
    vx: (Math.random() - 0.5) * 0.00018,
    vy: -0.0001 - Math.random() * 0.00022,
    blueTint: Math.random() > 0.62,
  }));

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function drawFrame() {
    ctx.clearRect(0, 0, w, h);
    for (const s of stars) {
      if (!REDUCED_MOTION) {
        s.x = (s.x + s.vx + 1) % 1;
        s.y = (s.y + s.vy + 1) % 1;
      }
      ctx.beginPath();
      ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2);
      ctx.fillStyle = s.blueTint
        ? `rgba(96, 165, 250, ${s.alpha})`
        : `rgba(226, 232, 240, ${s.alpha * 0.78})`;
      ctx.fill();
    }
    if (!REDUCED_MOTION) window.requestAnimationFrame(drawFrame);
  }
  drawFrame();
}

function initAmbientParallax() {
  if (REDUCED_MOTION) return;
  const orbs = [...document.querySelectorAll('.gsap-ambient-orb')];
  if (!orbs.length) return;

  let targetY = window.scrollY;
  let currentY = targetY;

  window.addEventListener(
    'scroll',
    () => {
      targetY = window.scrollY;
    },
    { passive: true },
  );

  function tick() {
    currentY += (targetY - currentY) * 0.06;
    orbs.forEach((orb, i) => {
      const factor = (i === 1 ? -0.035 : 0.025) * (i + 1);
      const dy = Math.max(-80, Math.min(80, currentY * factor * 0.4));
      const dx = Math.sin(currentY * 0.001 + i) * 14;
      orb.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
    });
    window.requestAnimationFrame(tick);
  }
  tick();
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
  if (!stage || !portrait) return;

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stage.classList.toggle('is-in-view', entry.isIntersecting);
          if (!entry.isIntersecting) {
            stage.classList.remove('spider-hovered');
          }
        });
      },
      { threshold: 0.2 },
    );
    obs.observe(stage);
  }

  let targetX = 50;
  let targetY = 50;
  let currentX = 50;
  let currentY = 50;
  let rafId = 0;
  let leaveTimer = 0;
  let isHovered = false;

  const isCoarsePointer = () =>
    window.matchMedia('(max-width: 767px), (hover: none), (pointer: coarse)').matches;

  const applyVars = () => {
    stage.style.setProperty('--hover-x', `${currentX.toFixed(2)}%`);
    stage.style.setProperty('--hover-y', `${currentY.toFixed(2)}%`);
  };

  const animateSpotlight = () => {
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    if (REDUCED_MOTION || (Math.abs(dx) < 0.08 && Math.abs(dy) < 0.08)) {
      currentX = targetX;
      currentY = targetY;
      applyVars();
      rafId = 0;
      return;
    }
    currentX += dx * 0.26;
    currentY += dy * 0.26;
    applyVars();
    rafId = window.requestAnimationFrame(animateSpotlight);
  };

  const updatePointer = (clientX, clientY) => {
    const rect = portrait.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    targetX = Math.max(-15, Math.min(115, ((clientX - rect.left) / rect.width) * 100));
    targetY = Math.max(-15, Math.min(115, ((clientY - rect.top) / rect.height) * 100));

    if (!isHovered) {
      isHovered = true;
      currentX = targetX;
      currentY = targetY;
      applyVars();
    } else if (!rafId) {
      rafId = window.requestAnimationFrame(animateSpotlight);
    }
  };

  stage.addEventListener('pointerenter', (e) => {
    if (e.pointerType === 'touch' || isCoarsePointer()) return;
    window.clearTimeout(leaveTimer);
    updatePointer(e.clientX, e.clientY);
    stage.classList.add('spider-hovered');
  });

  stage.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'touch' || isCoarsePointer()) return;
    window.clearTimeout(leaveTimer);
    updatePointer(e.clientX, e.clientY);
    stage.classList.add('spider-hovered');
  });

  stage.addEventListener('pointerleave', () => {
    isHovered = false;
    window.clearTimeout(leaveTimer);
    leaveTimer = window.setTimeout(() => {
      stage.classList.remove('spider-hovered');
    }, 180);
  });

  stage.addEventListener('click', () => {
    const visible = stage.getAttribute('data-spider-visible') === 'true';
    stage.setAttribute('data-spider-visible', visible ? 'false' : 'true');
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
   Interactive 3D Lanyard (Three.js + Pendulum Drag Physics)
   ======================================================================== */
function createLanyardCardTexture(front = true) {
  const w = 680;
  const h = 1020;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Card dark obsidian navy background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, '#091229');
  bg.addColorStop(0.55, '#070c1c');
  bg.addColorStop(1, '#040610');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Subtle circuit/dot grid
  ctx.fillStyle = 'rgba(148, 163, 184, 0.08)';
  for (let gx = 40; gx < w - 20; gx += 34) {
    for (let gy = 40; gy < h - 20; gy += 34) {
      ctx.fillRect(gx, gy, 2, 2);
    }
  }

  // Glow radial accent
  const glow = ctx.createRadialGradient(w * 0.75, h * 0.16, 10, w * 0.75, h * 0.16, 320);
  glow.addColorStop(0, 'rgba(44, 103, 237, 0.36)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Outer card rim
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.25)';
  ctx.lineWidth = 4;
  ctx.strokeRect(16, 16, w - 32, h - 32);

  // Punch hole slot detail at top
  ctx.fillStyle = '#03050c';
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.38)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.roundRect(w / 2 - 64, 42, 128, 22, 11);
  ctx.fill();
  ctx.stroke();

  if (front) {
    // Top Brand Header
    ctx.fillStyle = '#60a5fa';
    ctx.font = '700 26px "JetBrains Mono", monospace';
    ctx.textAlign = 'left';
    ctx.fillText('NUGI.DEV // PASS', 56, 124);

    ctx.fillStyle = '#00f0ff';
    ctx.beginPath();
    ctx.arc(w - 70, 114, 8, 0, Math.PI * 2);
    ctx.fill();

    // Portrait Ring Backdrop
    const cx = w / 2;
    const cy = 350;
    const rad = 148;
    const ringGrad = ctx.createLinearGradient(cx - rad, cy - rad, cx + rad, cy + rad);
    ringGrad.addColorStop(0, '#2c67ed');
    ringGrad.addColorStop(1, '#38bdf8');
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(cx, cy, rad + 10, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#0c1b3a';
    ctx.beginPath();
    ctx.arc(cx, cy, rad, 0, Math.PI * 2);
    ctx.fill();

    // Fallback monogram until photo finishes loading
    ctx.fillStyle = '#93c5fd';
    ctx.font = '800 96px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NR', cx, cy + 32);

    // Name & Role
    ctx.textAlign = 'center';
    ctx.fillStyle = '#f8fafc';
    ctx.font = '800 60px Inter, sans-serif';
    ctx.fillText('NUGI', cx, 590);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '500 28px Inter, sans-serif';
    ctx.fillText('Anugrah Roffiq Ramadhan', cx, 640);

    // Pill Role Tag
    ctx.fillStyle = 'rgba(44, 103, 237, 0.25)';
    ctx.strokeStyle = 'rgba(96, 165, 250, 0.55)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(cx - 210, 680, 420, 56, 28);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#93c5fd';
    ctx.font = '700 24px Inter, sans-serif';
    ctx.fillText('WEB DEV & UI/UX DESIGNER', cx, 717);

    // School & Location footer details
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.fillRect(56, 782, w - 112, 2);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '600 20px "JetBrains Mono", monospace';
    ctx.fillText('JURUSAN / SEKOLAH', 56, 826);

    ctx.fillStyle = '#f1f5f9';
    ctx.font = '700 26px Inter, sans-serif';
    ctx.fillText('PPLG • SMK Skill Village', 56, 864);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 22px Inter, sans-serif';
    ctx.fillText('Cikarang Barat, Bekasi', 56, 902);

    // Minimal decorative barcode stripes bottom right
    ctx.fillStyle = 'rgba(147, 197, 253, 0.55)';
    [0, 12, 20, 34, 42, 52, 66, 74, 88, 96].forEach((offset, i) => {
      ctx.fillRect(w - 164 + offset, 840, i % 2 === 0 ? 6 : 3, 56);
    });
  } else {
    // Card Back Face
    ctx.textAlign = 'center';
    ctx.fillStyle = '#38bdf8';
    ctx.font = '700 32px "JetBrains Mono", monospace';
    ctx.fillText('< NUGI.DEV />', w / 2, 340);

    ctx.fillStyle = '#e2e8f0';
    ctx.font = '700 42px Inter, sans-serif';
    ctx.fillText('Anugrah Roffiq R.', w / 2, 420);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '400 26px Inter, sans-serif';
    ctx.fillText('Software & Game Development', w / 2, 470);
    ctx.fillText('Bekasi, Indonesia', w / 2, 512);

    ctx.strokeStyle = 'rgba(96, 165, 250, 0.35)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(120, 600, w - 240, 120, 20);
    ctx.stroke();

    ctx.fillStyle = '#60a5fa';
    ctx.font = '600 22px "JetBrains Mono", monospace';
    ctx.fillText('HTML • CSS • JS • FIGMA', w / 2, 650);
    ctx.fillText('GIT • EXPRESS • POSTGRESQL', w / 2, 690);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  // Asynchronously paint Nugi's real portrait inside the front circle once image loads
  if (front) {
    const img = new Image();
    img.src = 'assets/portrait-blue.webp';
    img.onload = () => {
      const cx = w / 2;
      const cy = 350;
      const rad = 148;
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.clip();
      const aspect = img.width / img.height;
      const drawW = rad * 2.15;
      const drawH = drawW / aspect;
      ctx.drawImage(img, cx - drawW / 2, cy - rad * 0.92, drawW, drawH);
      ctx.restore();
      texture.needsUpdate = true;
    };
  }

  return texture;
}

function createStrapTexture() {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 512;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0c1836';
  ctx.fillRect(0, 0, 128, 512);
  ctx.fillStyle = 'rgba(56, 189, 248, 0.24)';
  ctx.fillRect(8, 0, 4, 512);
  ctx.fillRect(116, 0, 4, 512);

  ctx.save();
  ctx.translate(64, 256);
  ctx.rotate(Math.PI / 2);
  ctx.fillStyle = '#e2e8f0';
  ctx.font = '700 32px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('NUGI.DEV  •  PPLG', 0, 0);
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 2.2);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function initLanyard() {
  const container = document.getElementById('lanyard-container');
  const canvas = document.getElementById('lanyard-canvas');
  if (!container || !canvas) return;

  function syncMobileLayoutClass() {
    container.classList.toggle('is-mobile', window.innerWidth <= 767);
  }
  syncMobileLayoutClass();
  window.addEventListener('resize', syncMobileLayoutClass);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch {
    resolveLanyardReady();
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100);
  camera.position.set(0, 0.1, 11.2);

  // Studio Lights
  scene.add(new THREE.AmbientLight(0xdbeafe, 1.35));
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(4, 6, 7);
  scene.add(keyLight);

  const rimLight = new THREE.PointLight(0x38bdf8, 4.5, 18);
  rimLight.position.set(-4, -2, 5);
  scene.add(rimLight);

  const topLight = new THREE.DirectionalLight(0x60a5fa, 1.6);
  topLight.position.set(-3, 8, -4);
  scene.add(topLight);

  // Card Group (Metal Clip + Ring + Rounded Acrylic Badge)
  const cardPivot = new THREE.Group();
  scene.add(cardPivot);

  const cardShape = new THREE.Shape();
  const cw = 2.04;
  const ch = 3.06;
  const cr = 0.16;
  cardShape.moveTo(-cw / 2 + cr, -ch / 2);
  cardShape.lineTo(cw / 2 - cr, -ch / 2);
  cardShape.quadraticCurveTo(cw / 2, -ch / 2, cw / 2, -ch / 2 + cr);
  cardShape.lineTo(cw / 2, ch / 2 - cr);
  cardShape.quadraticCurveTo(cw / 2, ch / 2, cw / 2 - cr, ch / 2);
  cardShape.lineTo(-cw / 2 + cr, ch / 2);
  cardShape.quadraticCurveTo(-cw / 2, ch / 2, -cw / 2, ch / 2 - cr);
  cardShape.lineTo(-cw / 2, -ch / 2 + cr);
  cardShape.quadraticCurveTo(-cw / 2, -ch / 2, -cw / 2 + cr, -ch / 2);

  const cardGeo = new THREE.ExtrudeGeometry(cardShape, {
    depth: 0.055,
    bevelEnabled: true,
    bevelThickness: 0.015,
    bevelSize: 0.015,
    bevelSegments: 3,
  });
  cardGeo.center();

  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x3b82f6,
    metalness: 0.55,
    roughness: 0.28,
  });

  const faceGeo = new THREE.PlaneGeometry(cw - 0.04, ch - 0.04);
  const frontMat = new THREE.MeshStandardMaterial({
    map: createLanyardCardTexture(true),
    roughness: 0.34,
    metalness: 0.14,
  });
  const backMat = new THREE.MeshStandardMaterial({
    map: createLanyardCardTexture(false),
    roughness: 0.38,
    metalness: 0.14,
  });

  const cardBody = new THREE.Mesh(cardGeo, edgeMat);
  const frontFace = new THREE.Mesh(faceGeo, frontMat);
  frontFace.position.z = 0.044;
  const backFace = new THREE.Mesh(faceGeo, backMat);
  backFace.position.z = -0.044;
  backFace.rotation.y = Math.PI;

  const badgeGroup = new THREE.Group();
  badgeGroup.position.set(0, -ch / 2 - 0.24, 0);
  badgeGroup.add(cardBody, frontFace, backFace);
  cardPivot.add(badgeGroup);

  // Silver Clasp Hardware
  const metalMat = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.88,
    roughness: 0.2,
  });
  const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.22, 0.14), metalMat);
  clamp.position.set(0, -0.18, 0);
  const hook = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.025, 10, 24), metalMat);
  hook.position.set(0, -0.02, 0);
  cardPivot.add(clamp, hook);

  // Lanyard Woven Strap Ribbon
  const strapTex = createStrapTexture();
  const strapMat = new THREE.MeshStandardMaterial({
    map: strapTex,
    roughness: 0.72,
    metalness: 0.08,
    side: THREE.DoubleSide,
  });
  let strapMesh = null;

  function anchorForViewport() {
    if (window.innerWidth >= 1024) return { x: 1.58, y: 5.4, z: 11.2 };
    if (window.innerWidth >= 768) return { x: 1.28, y: 6.15, z: 11.6 };
    return { x: 0, y: 5.4, z: 10.6 };
  }

  // Pendulum Physics State
  const initialVP = anchorForViewport();
  let anchorPos = new THREE.Vector3(initialVP.x, initialVP.y, 0);
  const ropeLen = 3.55;
  let bobPos = new THREE.Vector3(anchorPos.x, anchorPos.y - ropeLen, 0);
  let bobVel = new THREE.Vector3(0.45, 0, 0);
  let cardRotY = -0.22;
  let cardRotYVel = 0;

  let dragging = false;
  let hovered = false;
  const dragTarget = new THREE.Vector3();
  const rayPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    const vp = anchorForViewport();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = vp.z;
    camera.updateProjectionMatrix();
    anchorPos.x = vp.x;
    anchorPos.y = vp.y;
    if (!dragging) {
      bobPos.x = anchorPos.x + (bobPos.x - anchorPos.x) * 0.5;
      bobPos.y = anchorPos.y - ropeLen;
    }
  }
  resize();
  window.addEventListener('resize', resize);

  function pointerToWorld(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    raycaster.ray.intersectPlane(rayPlane, dragTarget);
    return dragTarget;
  }

  canvas.addEventListener('pointerdown', (e) => {
    pointerToWorld(e.clientX, e.clientY);
    // Only grab if clicking near the lanyard card on desktop (let text col clicks pass naturally)
    const dist = Math.hypot(dragTarget.x - bobPos.x, dragTarget.y - (bobPos.y - 1.5));
    if (window.innerWidth >= 1024 && dist > 2.4) return;
    dragging = true;
    canvas.setPointerCapture(e.pointerId);
    AudioEngine.playClick(540, 0.04);
  });

  canvas.addEventListener('pointermove', (e) => {
    pointerToWorld(e.clientX, e.clientY);
    const dist = Math.hypot(dragTarget.x - bobPos.x, dragTarget.y - (bobPos.y - 1.5));
    hovered = dist < 2.2;
    if (!dragging) return;
    const desired = new THREE.Vector3(dragTarget.x, dragTarget.y + 1.45, Math.sin((dragTarget.x - anchorPos.x) * 0.5) * 0.35);
    bobVel.copy(desired).sub(bobPos).multiplyScalar(14);
    bobPos.copy(desired);
  });

  const endDrag = (e) => {
    if (!dragging) return;
    dragging = false;
    try {
      canvas.releasePointerCapture(e.pointerId);
    } catch {
      // No capture active
    }
  };
  canvas.addEventListener('pointerup', endDrag);
  canvas.addEventListener('pointercancel', endDrag);

  function buildFlatStrapGeometry(curve, segments = 24, halfWidth = 0.145) {
    const positions = [];
    const normals = [];
    const uvs = [];
    const indices = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const p = curve.getPoint(t);
      const tangent = curve.getTangent(t);
      const sideX = -tangent.y;
      const sideY = tangent.x;
      const len = Math.hypot(sideX, sideY) || 1;
      const sx = (sideX / len) * halfWidth;
      const sy = (sideY / len) * halfWidth;

      positions.push(p.x - sx, p.y - sy, p.z);
      positions.push(p.x + sx, p.y + sy, p.z);
      normals.push(0, 0, 1, 0, 0, 1);
      uvs.push(0, 1 - t, 1, 1 - t);

      if (i < segments) {
        const base = i * 2;
        indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    return geo;
  }

  function updateStrapGeometry() {
    const strapEnd = new THREE.Vector3(bobPos.x, bobPos.y - 0.1, bobPos.z);
    const mid = new THREE.Vector3()
      .addVectors(anchorPos, strapEnd)
      .multiplyScalar(0.5)
      .add(new THREE.Vector3((bobPos.x - anchorPos.x) * -0.15, 0, 0.05));
    const curve = new THREE.CatmullRomCurve3([
      anchorPos.clone(),
      anchorPos.clone().lerp(mid, 0.5),
      mid,
      mid.clone().lerp(strapEnd, 0.5),
      strapEnd,
    ]);
    const ribbonGeo = buildFlatStrapGeometry(curve, 24, 0.145);
    if (strapMesh) {
      strapMesh.geometry.dispose();
      strapMesh.geometry = ribbonGeo;
    } else {
      strapMesh = new THREE.Mesh(ribbonGeo, strapMat);
      scene.add(strapMesh);
    }
  }

  let prevTime = performance.now();
  function animate(now) {
    const dt = Math.min(0.032, (now - prevTime) / 1000);
    prevTime = now;

    if (!dragging) {
      // Damped pendulum + spring return + gentle idle motion
      const gravity = -16.5;
      bobVel.y += gravity * dt;
      if (!REDUCED_MOTION) {
        const breeze = Math.sin(now * 0.0014) * 0.38;
        bobVel.x += breeze * dt;
      }
      bobPos.addScaledVector(bobVel, dt);

      // Constrain strap length
      const diff = new THREE.Vector3().subVectors(bobPos, anchorPos);
      const len = diff.length() || 0.001;
      diff.normalize();
      if (len !== ropeLen) {
        bobPos.copy(anchorPos).addScaledVector(diff, ropeLen);
        const radial = bobVel.dot(diff);
        if (radial > 0 || len > ropeLen) {
          bobVel.addScaledVector(diff, -radial);
        }
      }
      bobVel.multiplyScalar(0.985);
    }

    // Orient card cleanly toward swing velocity
    cardPivot.position.copy(bobPos);
    const swingAngleZ = THREE.MathUtils.clamp((bobPos.x - anchorPos.x) * 0.32, -0.55, 0.55);
    const targetRotY = hovered && !dragging ? 0.14 : -0.18 + Math.sin(now * 0.0009) * 0.14 + bobVel.x * 0.08;
    cardRotYVel += (targetRotY - cardRotY) * 6.5 * dt;
    cardRotYVel *= 0.88;
    cardRotY += cardRotYVel * dt * 10;

    cardPivot.rotation.set(
      THREE.MathUtils.clamp(bobVel.z * 0.06, -0.35, 0.35),
      cardRotY,
      swingAngleZ,
    );

    updateStrapGeometry();
    renderer.render(scene, camera);
    resolveLanyardReady();

    if (!REDUCED_MOTION || dragging) {
      window.requestAnimationFrame(animate);
    } else {
      window.setTimeout(() => window.requestAnimationFrame(animate), 250);
    }
  }
  window.requestAnimationFrame(animate);
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
