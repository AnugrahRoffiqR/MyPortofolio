# DESIGN.md — MyPortofolio · Anugrah Roffiq

Arah visual: **"Nama sebagai monumen"**.
Portofolio statis satu halaman. Tidak ada build step. Semua keputusan di file ini bisa ditelusuri
ke `index.html` dan `style.css`.

Delapan prinsip desain yang dipakai, dipetakan ke tempatnya masing-masing di kode.

---

## 1. Hierarki

Urutan baca ada di DOM, bukan di CSS hack.

- `h1` = "ANUGRAH ROFFIQ", Anton 400, `--step-display` `clamp(3.6rem, 12.6vw, 15rem)`
  (terukur 181px @1440, 91px @390, satu baris di desktop).
- Judul bagian (`Tentang`, `Keahlian`, `Karya`, `Kontak`) = `--step-title` `clamp(2.5rem, 6.4vw, 5.5rem)` (terukur 88px).
- Pernyataan (`.statement`) = `--step-statement` `clamp(1.5rem, 1.6vw + 1.1rem, 2.25rem)`.
- Lead hero (`.hero-lead`) = `--step-lead` 1.375rem.
- Isi = `--step-body` 1.0625rem / 17px / 1.55.
- Label dan metadata = `--step-small` 0.8125rem (huruf besar kecil + tracking).

Lima peran teks, bukan lima belas ukuran. Kalau ragu ukuran mana yang dipakai, jawabannya selalu
salah satu token `--step-*` — tidak ada `px`/`rem` lepas di file CSS.

## 2. Kontras

Dua bidang polos, tidak ada yang lain:

| Teks di atas bidang | Warna | Rasio |
| --- | --- | --- |
| `#f1f1ee` teks di `#080b10` | ink | 17.41:1 |
| `#b4bdc6` teks redup di ink | ink | 10.36:1 |
| `#a9dcf4` aksen di ink | ink | 13.35:1 |
| `#101820` teks di `#e9e9e5` | paper | 14.70:1 |
| `#454c52` teks redup di paper | paper | 7.16:1 |
| `#0e4f78` aksen teks di paper | paper | 7.16:1 |
| `#07131c` teks tombol di `#a9dcf4` | aksen | 12.72:1 |

Semua pas di atas WCAG AA (4.5:1) dan mayoritas AAA (7:1). Kontras juga dipakai pada bobot:
Anton 400 (display padat) vs Work Sans 300–600 (teks). Judul 88–181px tidak pernah berhadapan
dengan glyph yang lebih besar di lingkungannya.

## 3. Keseimbangan

Asimetris di dalam grid 12 kolom, margin luar selalu sama.

- Hero: nama membentang penuh (12 kolom), lalu kolom kiri `.hero-figure` (potret, 2 baris)
  menyeimbangkan kolom kanan `.hero-availability` + `.hero-lead` + `.hero-actions` yang rata bawah.
- Tentang: `.about-figure` kolom 1–4, `.about-text` kolom 6–12, `align-items: end` —
  potret dan pernyataan berakhir di garis dasar yang sama.
- Keahlian: `.skill-row` tiga kolom (nama · penjelasan · tag) — berat teks di tengah, label tepi.
- Karya: `.work-col` dan `.work-col--right` (grid + margin atas 7rem) — dua kolom yang
  tenggelam secara vertikal, bukan empat kartu sejajar.
- Kontak: tautan (kolom lebar) vs form (kolom kanan) diimbangi bidang ink yang sama.

## 4. Keselarasan

Satu grid, dua tepi kiri, satu gutter.

- Semua section memakai `--gutter: clamp(1.25rem, 3.4vw, 3rem)` sehingga tepi kiri header,
  nama, judul bagian, potret, judul footer, dan form kontak berbaris di x yang sama.
- Kolom konten selalu mulai di kolom 6/7/13: hero kanan (`.meta`/`.foot`), `.section-note` rata kanan
  tapi lebarnya konsisten, `.contact-form` rata kanan.
- Sumbu vertikal potret hero dan potret tentang sejajar (keduanya `object-position: center 18%`).
- Tepi kanan konten dan tepi kanan header (`.header-end`) sejajar.

## 5. Kedekatan

Jarak besar menandakan ganti topik; jarak kecil menandakan satu kelompok.

- Antar section: `--section-gap: clamp(5.5rem, 11vw, 12rem)`.
- Kepala section ke isinya: `margin-bottom: clamp(2.5rem, 5vw, 4.5rem)`.
- Di dalam kelompok selalu dekat: `.facts` gap 3.5rem antar grup tapi `dt`-`dd` 0.25rem;
  `.hero-foot` gap 1.25–1.75rem; `.footer-nav` gap 1.5rem; `.work-item` caption 0.75rem di bawah gambar.
- Tidak ada label yang mengambang jauh dari elemen yang dijelaskan — eyebrow/overline yang
  dulu ada sudah dihapus.

## 6. Pengulangan

Satu aksen, satu sudut, satu bentuk tombol.

- Aksen (`--accent` di ink, `--accent-ink` di paper) hanya muncul di: titik status "Terbuka untuk
  kolaborasi", `.motto` (KEEP LEARNING, KEEP CREATING), tombol `.action` (isi aksen, teks `action-fg`),
  tautan fokus, underline fokus, dan `.wordmark-dot`.
- Sudut: `--radius: 0px` dikunci di seluruh file. Tidak ada sudut bulat, tidak ada pill.
- Tombol: satu pola `.action` (isi aksen + panah "↗" SVG inline) dan satu pola `.text-link`
  (garis bawah, hover aksen). Tidak ada varian warna lain.
- Pola yang diulang: `.section-head` (judul kiri + note kanan) ×4, `.work-item` ×4,
  `.skill-row` ×5, `.facts > div` ×3. Pengulangan inilah yang membuat empat section terasa satu halaman.
- Bidang berganti paper → ink → paper → ink, membentuk ritme dua nada.

## 7. Ruang kosong

Ruang kosong adalah konten, bukan sisa.

- Hero hanya berisi: nama (h1), potret, satu kalimat status, satu kalimat lead, dua aksi.
  Sisanya adalah bidang ink kosong (hero di-`overflow: hidden` dan min-height `100svh`).
- Tidak ada kartu, badge, garis dekoratif, atau hiasan pengisi di mana pun.
- `.hero-title` memimpin tanpa sub-heading; nama adalah ruang.
- Karya: satu gambar + caption. Tidak ada grid kartu berisi teks penjual.
- Foto dijalankan `object-fit: cover` / di-crop transparan (`portrait-cutout.webp` dipotong
  persis ke bounding box alpha) supaya tidak ada kekosongan di dalam gambar itu sendiri.

## 8. Penekanan

Kalau semuanya kanan, tidak ada yang kanan.

- Aksen hanya pada aksi dan penanda, tidak pernah pada bidang besar atau teks panjang.
- `h1` adalah satu-satunya ukuran display di halaman (181px) — tidak ada heading lain yang mendekati.
- `.section-title` 88px adalah tertinggi kedua; sisanya di bawah 36px.
- Satu aksi utama per pandangan: "Lihat karya" (hero), "Lihat repositori" (Karya), "Kirim pesan" (Kontak).
- Warna aksen yang sama tidak pernah dipakai untuk dua peran berbeda di area yang sama.

---

## Tipografi

- **Anton** 400 — display saja (nama, judul bagian). Self-hosted `assets/fonts/anton-latin.woff2`.
- **Work Sans** 300–600 — semua teks lain. Self-hosted `assets/fonts/work-sans-latin.woff2`.
- Tanpa webfont CDN. Tanpa font-display yang memblokir teks (`font-display: swap` + `preload`).
- `h1, h2, h3 { line-height: 1; font-weight: 400 }` — display tidak di-bold, Anton sudah padat.
- `text-wrap: pretty / balance` pada lead dan statement.

## Gerak

- `--ease: cubic-bezier(0.16, 1, 0.3, 1)` — satu easing untuk seluruh halaman.
- `@media (prefers-reduced-motion: reduce)` — reveal dan parallax potret dimatikan,
  scroll-smooth dimatikan (`scroll-behavior:auto`).
- Parallax potret hero: transform saja, offset max 5.5% tinggi layar (≈49px di viewport desktop),
  dengan `scale(1.07)` untuk menutupi geseran; hanya di `min-width: 781px`,
  hanya saat scroll (`requestAnimationFrame`).
- Reveal via `IntersectionObserver`, `threshold: 0`, `rootMargin: 0px 0px -8% 0px`,
  plus fallback `settle()` untuk lompat anchor: blok yang sudah menyentuh area baca langsung
  ditampilkan. Tanpa JS, konten tetap tampil karena kelas `.reveal` ditambahkan oleh JS.
- Tidak ada custom cursor, tidak ada typing effect, tidak ada shimmer.

## Aksesibilitas

- `skip-link` ke `#main`, fokus terlihat (`outline: 2px solid currentColor; offset: 4px`)
  di semua elemen interaktif.
- Semua gambar punya `alt` deskriptif; gambar dekoratif tidak dipakai.
- `<dialog>` bawaan untuk viewer project: buka dengan klik, tutup dengan Esc dan tombol tutup,
  fokus kembali ke pemicu (diuji manual).
- `<label>` eksplisit untuk semua field form; tombol submit nyata; `aria-live` tidak dipakai
  pada jam (`clock` `aria-live="off"`) supaya pembaca layar tidak dibanjiri 1 detik sekali.
- Kontras teks ≥ 7:1 di seluruh teks isi.
- Hit area: target interaktif minimal 40px tinggi (tombol/aksi).
- Bahasa: `lang="id"` di `<html>`.

## Imaji

- `assets/portrait-blue.webp` — hero + `og:image`.
- `assets/portrait-cutout.webp` — tentang; dipotong ke bounding box alpha,
  diletakkan dengan `mix-blend-mode: multiply` di atas kertas.
- `assets/work-{store,login,marvel,calculator}.webp` — karya, semua hasil optimasi lokal;
  dipakai di grid karya dan di `<dialog>` viewer project.
- PNG asli di root **tidak dihapus** — sumber jika perlu di-crop ulang.

## Gate verifikasi

Wajib lulus sebelum `git commit`:

```powershell
node "$env:USERPROFILE\.opencode\skills\design-taste-frontend\scripts\lint.mjs" index.html style.css script.js
node "$env:USERPROFILE\.opencode\skills\design-taste-frontend\scripts\inspect.mjs" index.html
```

Status gate terakhir: **lint 0 FAIL · inspect 0 FAIL, 1 WARN**.
WARN yang tersisa: `[no-footage]` — tidak ada video di halaman. Alasan: tidak ada footage
jujur dari karya atau proses belajar Anugrah Roffiq yang bisa dipublikasikan; menambahkan
video stok akan menjadi dekorasi, bukan bukti. Satu-satunya sumber visual yang dipakai
adalah foto Anugrah sendiri dan tangkapan layar projectnya.

Konten pribadi yang dipertahankan dalam redesign ini: nama, status pelajar PPLG di SMK Skill
Village Islamic School, email, Instagram @cynicc___, TikTok @velraithe_, GitHub AnugrahRoffiqR,
dan empat project GitHub Pages (Landing Page Store, Halaman Login, Landing Page Marvel,
Kalkulator Sederhana). Bahasa Indonesia santai.

## Yang sengaja tidak dipakai

- Tidak ada gradient atau glow.
- Tidak ada kartu ikon / bento / tiga kolom generik.
- Tidak ada hairline pembatas antar section yang dekoratif; pemisah satu-satunya adalah
  bidang ink ↔ kertas.
- Tidak ada metrik palsu, testimonial, atau nomor tahun pengalaman.
- Tidak ada animasi scroll yang menahan halaman.
- Tidak ada elemen yang hanya ada untuk "mengisi".
