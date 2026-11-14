# DESIGN.md — MyPortofolio · Anugrah Roffiq Ramadhan (Nugi)

Portofolio personal statis (`index.html`, `style.css`, `script.js`) tanpa build step. Mengadopsi bahasa visual dark-obsidian dengan aksen sky-blue, kaca likuid, pencahayaan reaktif, serta dimensi 3D interaktif yang tetap menjaga autentisitas profil **Anugrah Roffiq Ramadhan (Nugi)** sebagai pelajar PPLG di SMK Skill Village Islamic School, Cikarang Barat, Bekasi.

---

## 1. Struktur Halaman & Alur Pengunjung

1. **Preloader Curtain (`#welcome-screen`)**: Layar pembuka arsitektural bergaya gelap (`NUGI.` SVG monogram, grid koordinat halus, aura sky-blue, serta indikator progres nyata yang memantau DOM, tipografi, gambar potret, dan inisialisasi Three.js) sebelum tirai terangkat mulus menuju Hero.
2. **Floating Liquid-Glass Navbar (`#site-navbar`)**: Navigasi tetap di bagian atas (`Home`, `About`, `Portfolio`, `Contact`) lengkap dengan pill penanda aktif yang bergerak halus mengikuti scrollspy, tombol mute/unmute WebAudio UI SFX, serta drawer kaca untuk layar seluler.
3. **Hero (`#Home`)**:
   - Tipografi display gradien biru-ke-putih (`Welcome to My Portfolio`), typewriter peran (`Web Developer`, `UI/UX Designer`, `PPLG Student`, `Game Dev Enthusiast`), deskripsi singkat, dua aksi utama (`Lihat Projek`, `Hubungi Saya`), serta tautan `FIND ME` (`GitHub`, `Instagram`, `TikTok`).
   - **3D Interactive ID Lanyard (`#lanyard-canvas`)**: Dibangun di Three.js dengan pendulum physics, rotasi halus saat hover, serta interaksi drag pointer dengan tali pita bertuliskan `NUGI.DEV • PPLG`.
4. **About Me (`#About`) & Education / Focus (`experience-section`)**:
   - Komposisi 3 kolom (`Hi, I'm Anugrah Roffiq Ramadhan`, panggung potret tengah, biografi PPLG & UI/UX).
   - **Dual-Layer Spider-Man Spotlight Portrait**: Foto natural (`assets/portrait-about.webp`) yang menyingkap lapisan kostum Spider-Man ter-align piksel (`assets/portrait-spiderman.webp`) melalui *radial cursor mask* halus (`--hover-x` / `--hover-y`) di desktop, kunci klik/tap penuh, serta animasi pulsa halus di layar sentuh seluler.
   - Panel **Education**, **Focus & Learning**, serta **3 Stat Cards** (`5 Projects`, `10 Tech Stack`, `3 Focus Areas`) berbingkai `.liquid-metal-border` canvas.
5. **Focus Coding Music Player (`spotify-section`)**: Kartu Spotify dark-theme embed resmi yang terhubung langsung ke playlist **Focus Coding** (`https://open.spotify.com/playlist/0cF2K9ACAqGr0nDEIBNo6F`) dengan skeleton shimmer transisi, daftar lagu nyata, pemutaran aktif, serta tautan langsung `Putar di Spotify`.
6. **Portfolio Showcase (`#Portofolio`) & Project Detail View (`#project-detail-view`)**:
   - 4 tab konten: **Projects** (5 karya nyata dengan pratinjau & detail SPA), **UI/UX Design**, **Learning Path**, dan **Tech Stack** (12 ikon SVG vektor akurat dalam kartu `.border-glow-card`).
   - Klik `Details ->` membuka tampilan detail proyek terpisah (`#project/<slug>`) lengkap dengan tautan `Live Demo` & `Source Code` nyata, tombol kembali ke posisi scroll semula, dan chip `Technologies Used`.
7. **Hubungi Saya (`#Contact`) & Footer (`footer.footer-root`)**:
   - Formulir kontak terhubung ke `FormSubmit` (`nugi5555.a@gmail.com`), tautan sosial (`Instagram @cynicc___`, `TikTok @velraithe_`, `GitHub AnugrahRoffiqR`), tombol salin email cepat, dan papan **Komentar Pengunjung** lokal (`localStorage`) dengan dukungan foto profil opsional.

---

## 2. Tipografi, Warna & Efek Permukaan

- **Font**: `Inter` (UI & tubuh teks), `Space Grotesk` (tampilan teknis / detail), `JetBrains Mono` (badge, statistik, metadata).
- **Palet Inti**: Obsidian navy (`#02050b` / `#050a18`), teks putih terang (`#f8fafc`), teks sekunder abu kebiruan (`#94a3b8`), aksen biru listrik (`#2c67ed` & `#38bdf8`).
- **Aset Visual (`assets/`)**:
  - `assets/portrait-about.webp` — potret bersih transparan untuk About Me.
  - `assets/portrait-spiderman.webp` — lapisan kostum Spider-Man transparan ter-align piksel dengan potret About untuk interaksi sorot kursor.
  - `assets/portrait-blue.webp` — potret lencana ID card 3D.
  - `assets/work-{tasks,store,marvel,calculator,login}.webp` — tangkapan layar proyek nyata.

---

## 3. Aksesibilitas & Gerak (`prefers-reduced-motion`)

- Mendukung `@media (prefers-reduced-motion: reduce)` di CSS dan `REDUCED_MOTION` di JS: preloader dilewati seketika, meteor latar disembunyikan, scroll reveal langsung aktif penuh (`opacity: 1`), serta loop animasi latar dihentikan.
- Elemen `[hidden]` dipastikan tersembunyi konsisten (`display: none !important`), seluruh gambar memiliki atribut `alt`, tombol dan tab memakai `aria-selected` / `aria-pressed` / `aria-expanded`, dan section target memiliki `scroll-margin-top: 86px` agar tidak tertutup navbar tetap.
