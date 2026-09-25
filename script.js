// ===============================
// SELEKSI ELEMEN DOM
// ===============================

// ikon hamburger untuk membuka/menutup menu di layar kecil
const menuIcon = document.querySelector('#menu-icon');
// wadah menu navigasi utama
const navbar = document.querySelector('.navbar');

// elemen-elemen yang akan diberi efek mengetik
const typingText = document.querySelector('.typing-text');
const typingRole = document.querySelector('.typing-role');
const typingMotto = document.querySelector('.typing-motto');
const typingContact = document.querySelector('.typing-contact');

// elemen untuk menampilkan jam GMT+7
const timezoneValue = document.querySelector('.timezone-value');


// ===============================
// UPDATE JAM DAN ZONA WAKTU
// ===============================

// memperbarui teks jam sesuai waktu Jakarta (GMT+7)
const updateTimezone = () => {

    // hentikan jika elemen jam tidak ada di halaman
    if (!timezoneValue) {
        return;
    }

    // format waktu Jakarta menjadi jam:menit:detik (format 24 jam)
    const jakartaTime = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date());

    // tampilkan hasilnya ke elemen jam
    timezoneValue.textContent = `GMT+7 · ${jakartaTime}`;
};

// jalankan sekali saat halaman dimuat
updateTimezone();

// perbarui jam setiap 1 detik
setInterval(updateTimezone, 1000);


// ===============================
// EFEK MENGETIK
// ===============================

// mengetik ulang isi teks sebuah elemen huruf demi huruf
// element : elemen target
// speed   : jeda antar huruf (ms)
// repeat  : true jika animasi diulang terus
const typeText = (element, speed, repeat = false) => {

    // hentikan jika elemen tidak ditemukan
    if (!element) {
        return;
    }

    // ambil teks asli lalu rapikan spasi berlebih
    const textToType = element.textContent
        .trim()
        .replace(/\s+/g, ' ');

    // posisi huruf yang sedang diketik
    let textIndex = 0;

    // kosongkan teks dan tampilkan kursor berkedip
    element.textContent = '';
    element.classList.add('is-typing');

    // menambahkan satu huruf setiap kali dipanggil
    const addNextCharacter = () => {

        // selama masih ada huruf, tambahkan huruf berikutnya
        if (textIndex < textToType.length) {

            element.textContent += textToType[textIndex];

            textIndex += 1;

            // panggil lagi setelah jeda sesuai speed
            setTimeout(addNextCharacter, speed);

            return;
        }

        // jika mode ulang aktif, tunggu 2.5 detik lalu mulai dari awal
        if (repeat) {

            setTimeout(() => {

                element.textContent = '';
                textIndex = 0;

                addNextCharacter();

            }, 2500);

            return;
        }

        // selesai mengetik, hilangkan kursor
        element.classList.remove('is-typing');
    };

    // mulai mengetik
    addNextCharacter();
};


// ===============================
// EFEK MENGETIK ROLE
// ===============================

// mengetik beberapa teks role secara bergantian tanpa henti
// element : elemen target
// roles   : daftar teks role
// speed   : jeda antar huruf (ms)
const typeRoles = (element, roles, speed) => {

    // hentikan jika elemen tidak ditemukan
    if (!element) {
        return;
    }

    // indeks role yang sedang ditampilkan
    let roleIndex = 0;

    // mengetik role saat ini dari awal
    const typeNextRole = () => {

        const role = roles[roleIndex];

        // posisi huruf dalam role
        let characterIndex = 0;

        // kosongkan teks dan tampilkan kursor
        element.textContent = '';
        element.classList.add('is-typing');

        // menambahkan satu huruf role setiap kali dipanggil
        const addNextCharacter = () => {

            // selama masih ada huruf, tambahkan huruf berikutnya
            if (characterIndex < role.length) {

                element.textContent += role[characterIndex];

                characterIndex += 1;

                setTimeout(addNextCharacter, speed);

                return;
            }

            // role selesai diketik, tunggu 2.5 detik lalu pindah ke role berikutnya
            setTimeout(() => {

                // kembali ke role pertama jika sudah di role terakhir
                roleIndex = (roleIndex + 1) % roles.length;

                typeNextRole();

            }, 2500);
        };

        addNextCharacter();
    };

    // mulai dari role pertama
    typeNextRole();
};


// ===============================
// JALANKAN ANIMASI MENGETIK
// ===============================

// nama di bagian home (sekali jalan)
typeText(typingText, 140);

// role yang berganti-ganti
typeRoles(
    typingRole,
    [
        'Frontend Developer',
        'Web Developer'
    ],
    100
);

// moto hidup (diulang terus)
typeText(typingMotto, 80, true);

// teks kontak (diulang terus, jika elemennya ada)
typeText(typingContact, 140, true);


// ===============================
// MENU MOBILE
// ===============================

if (menuIcon && navbar) {

    // klik ikon menu: ubah ikon menjadi X dan tampilkan/sembunyikan navbar
    menuIcon.onclick = () => {

        menuIcon.classList.toggle('bx-x');

        navbar.classList.toggle('active');
    };


    // menutup menu setelah link diklik

    const navLinks = navbar.querySelectorAll('a');

    navLinks.forEach((link) => {

        link.onclick = () => {

            // kembalikan ikon ke bentuk hamburger
            menuIcon.classList.remove('bx-x');

            // sembunyikan navbar
            navbar.classList.remove('active');
        };

    });
}


// ===============================
// NAVBAR ACTIVE LINK HANDLING
// ===============================

// semua link di navbar
const navLinks = document.querySelectorAll('.navbar a');
// semua section yang memiliki id (tujuan link navbar)
const sections = document.querySelectorAll('section[id]');


// Fungsi untuk set active link
const setActiveLink = (href) => {
    navLinks.forEach(link => {
        // hapus status aktif dari semua link
        link.classList.remove('active');
        // beri status aktif hanya pada link yang href-nya cocok
        if (link.getAttribute('href') === href) {
            link.classList.add('active');
        }
    });
};


// 1. Handle klik pada navbar link
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Hapus active dari semua, tambah ke yang diklik
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});


// 2. Scrollspy - update active link berdasarkan scroll position
const scrollSpy = () => {
    // id section yang sedang terlihat
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // offset untuk header
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        // cek apakah posisi scroll berada di dalam section ini
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });

    // jika sudah di dasar halaman, aktifkan section terakhir (contact)
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    if (atBottom && sections.length) {
        currentSectionId = sections[sections.length - 1].getAttribute('id');
    }

    // tandai link navbar yang sesuai dengan section aktif
    if (currentSectionId) {
        setActiveLink(`#${currentSectionId}`);
    }
};

// Throttle scroll event untuk performa
let scrollTimeout;
window.addEventListener('scroll', () => {
    // batalkan pengecekan sebelumnya agar tidak dijalankan berulang-ulang
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    // jalankan scrollSpy 50ms setelah scroll berhenti
    scrollTimeout = setTimeout(scrollSpy, 50);
});

// Jalankan sekali saat load untuk memastikan posisi awal benar
scrollSpy();


// ===============================
// FORM CONTACT
// ===============================

// form kontak di bagian contact
const contactForm = document.querySelector('#contact-form');

if (contactForm) {

    // kirim form lewat fetch (AJAX) tanpa pindah halaman
    contactForm.onsubmit = async (e) => {

        // cegah form reload halaman
        e.preventDefault();

        // tombol kirim
        const submitBtn =
            document.querySelector('#submit-btn');

        // simpan teks asli tombol untuk dikembalikan nanti
        const originalText =
            submitBtn.value;

        // tampilkan status mengirim dan nonaktifkan tombol
        submitBtn.value = 'Sending...';

        submitBtn.disabled = true;


        try {

            // kirim data form ke FormSubmit
            const response = await fetch(
                contactForm.action,
                {
                    method: 'POST',

                    // ambil semua isi input form
                    body: new FormData(contactForm),

                    // minta balasan dalam format JSON
                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );


            // cek apakah pengiriman berhasil
            if (response.ok) {

                alert(
                    'Pesan berhasil terkirim ke email Nugi!'
                );

                // kosongkan form setelah berhasil
                contactForm.reset();

            } else {

                alert(
                    'Gagal mengirim pesan. Silakan coba lagi.'
                );
            }


        } catch (error) {

            // terjadi jika koneksi internet bermasalah
            alert(
                'Terjadi kesalahan koneksi.'
            );

        } finally {

            // kembalikan tombol ke kondisi semula
            submitBtn.value = originalText;

            submitBtn.disabled = false;
        }
    };
}
