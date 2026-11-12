# MyPortofolio — Anugrah Roffiq

Situs portofolio statis. Tidak ada build step, tidak ada framework, tidak ada backend.
Buka `index.html` langsung atau jalankan server statis apa pun.

## Stack

- `index.html` — markup semantik, satu halaman, bahasa Indonesia.
- `style.css` — semua styling. Token desain ada di blok `:root`.
- `script.js` — IIFE tunggal: jam WIB, menu mobile, scrollspy, reveal, parallax, dialog project, form kontak.
- `assets/` — gambar WebP hasil optimasi dan dua font self-hosted.
- File PNG asli di root **jangan dihapus**; itu sumber gambar.

Konten pribadi yang tidak boleh berubah tanpa diminta: nama Anugrah Roffiq, status pelajar PPLG
SMK Skill Village Islamic School, empat project GitHub Pages, email nugi5555.a@gmail.com,
Instagram @cynicc___, TikTok @velraithe_.

## Arah visual

"Nama sebagai monumen": Anton untuk display, Work Sans untuk teks, satu bidang ink `#080b10`,
satu bidang kertas `#e9e9e5`, satu aksen es `#a9dcf4` (di kertas memakai `#0e4f78`),
sudut 0px, tanpa gradient, tanpa glow, tanpa kartu ikon. Delapan prinsip desain
(hierarki, kontras, keseimbangan, keselarasan, kedekatan, pengulangan, ruang kosong, penekanan)
dijelaskan di `DESIGN.md` dan diringkas di komentar atas `style.css`.

## Skill yang dipakai di project ini

Hanya skill berikut yang relevan. Semuanya di-link ke `.opencode/skills/` (junction ke
`~/.config/opencode/skills/`, diabaikan git). Skill Vercel, Neon, Roblox, Python, dan
infrastruktur **tidak** dipakai di sini.

| Kapan | Skill |
| --- | --- |
| Arah visual, layout, gate desain | `design-taste-frontend` |
| Keputusan visual yang belum ada arahnya | `frontend-design` |
| Cek "tidak terasa AI" (halaman, UI, copy, mobile, komentar) | `antislop`, `antislop-ui`, `antislop-copywriting`, `antislop-human`, `antislop-layoutmobile`, `antislop-code` |
| Audit dan tulis ulang teks | `avoid-ai-writing` |
| Layout responsif & breakpoint | `responsive-design` |
| Microinteraction, state, feedback | `interaction-design` |
| Aksesibilitas dan kontras | `accessibility-compliance`, `wcag-audit-patterns` |
| Review UI terhadap pedoman antarmuka | `web-design-guidelines` |
| Verifikasi browser → halaman → form | `verification`, `browser-automation-mcp` (MCP `puppeteer` sudah aktif) |
| Pemeriksaan akhir utang teknis | `ai-debt-detector` |
| Pola JavaScript modern | `modern-javascript-patterns` |

## Gate yang wajib lulus sebelum menyimpan perubahan

```powershell
node "$env:USERPROFILE\.opencode\skills\design-taste-frontend\scripts\lint.mjs" index.html style.css script.js
node "$env:USERPROFILE\.opencode\skills\design-taste-frontend\scripts\inspect.mjs" index.html
```

`lint` harus 0 FAIL. `inspect` harus 0 FAIL; WARN hanya boleh tersisa kalau alasannya bisa
dipertahankan (mis. tidak ada footage karena tidak ada rekaman jujur dari karya sendiri).
Screenshot hasil inspect ada di `.taste-skill/inspect/` dan wajib dilihat sebelum menyatakan selesai.

## Konvensi kode

- CSS: satu deklarasi per baris, komentar penanda bagian dengan format yang sudah ada, ukuran
  teks memakai token `--step-*`, jarak memakai `--gutter` / `--section-gap`.
- JS: tanpa dependency, tanpa build. Semua yang butuh JS diberi kelas dari JS (`.js`, `.reveal`)
  supaya halaman tetap terbaca tanpa JS.
- HTML: teks alternatif gambar ditulis deskriptif, tombol nyata untuk aksi, tautan nyata untuk navigasi.
- Bahasa komentar dan konten: Indonesia, santai tapi tidak alay.

## Alur kerja

1. Baca `DESIGN.md` sebelum mengubah tampilan.
2. Ubah, lalu jalankan gate di atas.
3. Lihat screenshot 1440/768/390.
4. Verifikasi manual: nama muat satu baris di desktop, dialog project, menu mobile, form kontak, jam WIB.
5. Commit savepoint kecil dengan pesan yang jelas.
