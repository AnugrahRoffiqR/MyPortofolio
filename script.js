// ===============================
// SELEKSI ELEMEN DOM
// ===============================

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

const typingText = document.querySelector('.typing-text');
const typingRole = document.querySelector('.typing-role');
const typingMotto = document.querySelector('.typing-motto');
const typingContact = document.querySelector('.typing-contact');

const timezoneValue = document.querySelector('.timezone-value');


// ===============================
// UPDATE JAM DAN ZONA WAKTU
// ===============================

const updateTimezone = () => {

    if (!timezoneValue) {
        return;
    }

    const jakartaTime = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date());

    timezoneValue.textContent = `GMT+7 · ${jakartaTime}`;
};

updateTimezone();

setInterval(updateTimezone, 1000);


// ===============================
// EFEK MENGETIK
// ===============================

const typeText = (element, speed, repeat = false) => {

    if (!element) {
        return;
    }

    const textToType = element.textContent
        .trim()
        .replace(/\s+/g, ' ');

    let textIndex = 0;

    element.textContent = '';
    element.classList.add('is-typing');

    const addNextCharacter = () => {

        if (textIndex < textToType.length) {

            element.textContent += textToType[textIndex];

            textIndex += 1;

            setTimeout(addNextCharacter, speed);

            return;
        }

        if (repeat) {

            setTimeout(() => {

                element.textContent = '';
                textIndex = 0;

                addNextCharacter();

            }, 2500);

            return;
        }

        element.classList.remove('is-typing');
    };

    addNextCharacter();
};


// ===============================
// EFEK MENGETIK ROLE
// ===============================

const typeRoles = (element, roles, speed) => {

    if (!element) {
        return;
    }

    let roleIndex = 0;

    const typeNextRole = () => {

        const role = roles[roleIndex];

        let characterIndex = 0;

        element.textContent = '';
        element.classList.add('is-typing');

        const addNextCharacter = () => {

            if (characterIndex < role.length) {

                element.textContent += role[characterIndex];

                characterIndex += 1;

                setTimeout(addNextCharacter, speed);

                return;
            }

            setTimeout(() => {

                roleIndex = (roleIndex + 1) % roles.length;

                typeNextRole();

            }, 2500);
        };

        addNextCharacter();
    };

    typeNextRole();
};


// ===============================
// JALANKAN ANIMASI MENGETIK
// ===============================

typeText(typingText, 140);

typeRoles(
    typingRole,
    [
        'Frontend Developer',
        'Web Developer'
    ],
    100
);

typeText(typingMotto, 80, true);

typeText(typingContact, 140, true);


// ===============================
// MENU MOBILE
// ===============================

if (menuIcon && navbar) {

    menuIcon.onclick = () => {

        menuIcon.classList.toggle('bx-x');

        navbar.classList.toggle('active');
    };


    // menutup menu setelah link diklik

    const navLinks = navbar.querySelectorAll('a');

    navLinks.forEach((link) => {

        link.onclick = () => {

            menuIcon.classList.remove('bx-x');

            navbar.classList.remove('active');
        };

    });
}


// ===============================
// NAVBAR ACTIVE LINK HANDLING
// ===============================

const navLinks = document.querySelectorAll('.navbar a');
const sections = document.querySelectorAll('section[id]');


// Fungsi untuk set active link
const setActiveLink = (href) => {
    navLinks.forEach(link => {
        link.classList.remove('active');
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
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // offset untuk header
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = sectionId;
        }
    });

    // jika sudah di dasar halaman, aktifkan section terakhir (contact)
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 2;

    if (atBottom && sections.length) {
        currentSectionId = sections[sections.length - 1].getAttribute('id');
    }

    if (currentSectionId) {
        setActiveLink(`#${currentSectionId}`);
    }
};

// Throttle scroll event untuk performa
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(scrollSpy, 50);
});

// Jalankan sekali saat load untuk memastikan posisi awal benar
scrollSpy();


// ===============================
// FORM CONTACT
// ===============================

const contactForm = document.querySelector('#contact-form');

if (contactForm) {

    contactForm.onsubmit = async (e) => {

        e.preventDefault();

        const submitBtn =
            document.querySelector('#submit-btn');

        const originalText =
            submitBtn.value;

        submitBtn.value = 'Sending...';

        submitBtn.disabled = true;


        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: 'POST',

                    body: new FormData(contactForm),

                    headers: {
                        'Accept': 'application/json'
                    }
                }
            );


            if (response.ok) {

                alert(
                    'Pesan berhasil terkirim ke email Nugi!'
                );

                contactForm.reset();

            } else {

                alert(
                    'Gagal mengirim pesan. Silakan coba lagi.'
                );
            }


        } catch (error) {

            alert(
                'Terjadi kesalahan koneksi.'
            );

        } finally {

            submitBtn.value = originalText;

            submitBtn.disabled = false;
        }
    };
}