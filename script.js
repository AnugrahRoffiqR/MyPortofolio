/* ==========================================================================
   Portfolio interactions
   1. Jam WIB langsung
   2. Menu mobile
   3. Scrollspy navigasi
   4. Animasi masuk per bagian
   5. Parallax ringan pada potret
   6. Dialog detail project
   7. Form kontak tanpa reload
   ========================================================================== */

(() => {
    'use strict';

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ---------------------------------------------------------------------
       1. Jam WIB
       ------------------------------------------------------------------ */
    const clock = document.querySelector('#clock');
    const jakartaTime = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const renderClock = () => {
        if (clock) {
            clock.textContent = `WIB ${jakartaTime.format(new Date())}`;
        }
    };

    renderClock();
    window.setInterval(renderClock, 1000);

    /* ---------------------------------------------------------------------
       2. Menu mobile
       ------------------------------------------------------------------ */
    const menuToggle = document.querySelector('#menu-toggle');
    const siteNav = document.querySelector('#site-nav');

    const setMenu = (open) => {
        if (!menuToggle || !siteNav) return;
        menuToggle.setAttribute('aria-expanded', String(open));
        siteNav.classList.toggle('is-open', open);
    };

    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
        });

        siteNav.addEventListener('click', (event) => {
            if (event.target.closest('a')) setMenu(false);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && siteNav.classList.contains('is-open')) {
                setMenu(false);
                menuToggle.focus();
            }
        });

        document.addEventListener('click', (event) => {
            if (!siteNav.classList.contains('is-open')) return;
            if (event.target.closest('.site-header')) return;
            setMenu(false);
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 780) setMenu(false);
        });
    }

    /* ---------------------------------------------------------------------
       3. Scrollspy: tautan yang sedang dibaca diberi aria-current
       ------------------------------------------------------------------ */
    const navLinks = Array.from(document.querySelectorAll('.site-nav a[href^="#"]'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    const setCurrent = (id) => {
        navLinks.forEach((link) => {
            if (link.getAttribute('href') === `#${id}`) {
                link.setAttribute('aria-current', 'true');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    if ('IntersectionObserver' in window && sections.length) {
        const spy = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setCurrent(entry.target.id);
            });
        }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

        sections.forEach((section) => spy.observe(section));
    }

    /* ---------------------------------------------------------------------
       4. Animasi masuk: elemen diberi .reveal oleh JS, jadi konten tetap
          terlihat kalau skrip ini gagal dimuat.
       ------------------------------------------------------------------ */
    const revealGroups = [
        ['.section-head', 0],
        ['.about-figure', 0],
        ['.about-text', 80],
        ['.skill-row', 70],
        ['.work-item', 90],
        ['.contact-links', 0],
        ['.contact-form', 90],
        ['.work-foot', 0],
        ['.footer-invite', 0],
        ['.footer-nav', 90],
        ['.footer-legal', 140]
    ];

    const revealTargets = [];

    revealGroups.forEach(([selector, step]) => {
        document.querySelectorAll(selector).forEach((element, index) => {
            element.classList.add('reveal');
            element.style.setProperty('--reveal-delay', `${index * step}ms`);
            revealTargets.push(element);
        });
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
        revealTargets.forEach((element) => element.classList.add('is-in'));
    } else {
        const revealer = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });

        revealTargets.forEach((element) => revealer.observe(element));

        /* Lompat ke #anchor bisa mendaratkan blok tinggi hanya sedikit di layar,
           jadi blok yang sudah menyentuh area baca langsung ditampilkan. */
        const settle = () => {
            revealTargets.forEach((element) => {
                const box = element.getBoundingClientRect();
                if (box.top < window.innerHeight * 0.92) element.classList.add('is-in');
            });
        };

        window.addEventListener('hashchange', settle);
        window.addEventListener('load', settle);
    }

    /* ---------------------------------------------------------------------
       5. Parallax potret: hanya transform, hanya di layar lebar
       ------------------------------------------------------------------ */
    const heroFigure = document.querySelector('.hero-figure');
    const heroImage = heroFigure ? heroFigure.querySelector('img') : null;

    if (heroImage && !reduceMotion && window.matchMedia('(min-width: 781px)').matches) {
        let frame = 0;

        const shiftPortrait = () => {
            frame = 0;
            const offset = Math.min(window.scrollY, window.innerHeight) * 0.055;
            heroImage.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.07)`;
        };

        window.addEventListener('scroll', () => {
            if (frame) return;
            frame = window.requestAnimationFrame(shiftPortrait);
        }, { passive: true });

        shiftPortrait();
    }

    /* ---------------------------------------------------------------------
       6. Dialog detail project
       ------------------------------------------------------------------ */
    const projects = {
        store: {
            title: 'Landing Page Store',
            tech: 'HTML · CSS · JavaScript',
            description:
                'Landing page bertema toko parfum: navigasi ringkas, hero dengan produk sebagai fokus, dan tipografi besar yang mengarahkan mata ke satu aksi.',
            image: 'assets/work-store.webp',
            alt: 'Landing page toko parfum dengan judul Find Your Signature Scent',
            href: 'https://anugrahroffiqr.github.io/MyLandingPageStore/'
        },
        calculator: {
            title: 'Kalkulator Sederhana',
            tech: 'HTML · CSS · JavaScript',
            description:
                'Kalkulator dengan operasi dasar, tombol besar yang mudah ditekan, dan palet pastel yang lembut. Logika perhitungan ditulis tanpa library.',
            image: 'assets/work-calculator.webp',
            alt: 'Kalkulator pastel dengan tombol angka dan operator',
            href: 'https://anugrahroffiqr.github.io/MyCalculator/'
        },
        login: {
            title: 'Halaman Login',
            tech: 'HTML · CSS · JavaScript',
            description:
                'Halaman login dengan ilustrasi kucing, form ringkas, dan validasi dasar sebelum data dikirim. Fokus dibuat jelas supaya mudah diisi dari ponsel.',
            image: 'assets/work-login.webp',
            alt: 'Halaman login dengan ilustrasi kucing pastel',
            href: 'https://anugrahroffiqr.github.io/MyHalamanLogin/'
        },
        marvel: {
            title: 'Landing Page Marvel',
            tech: 'HTML · CSS · JavaScript',
            description:
                'Landing page bertema Marvel: hero sinematik, judul raksasa, dan navigasi yang tidak menutupi gambar utama.',
            image: 'assets/work-marvel.webp',
            alt: 'Landing page Marvel dengan tipografi Black Panther',
            href: 'https://anugrahroffiqr.github.io/MyLandingPageMarvel/'
        }
    };

    const dialog = document.querySelector('#project-dialog');

    if (dialog && typeof dialog.showModal === 'function') {
        const dialogImage = dialog.querySelector('#dialog-image');
        const dialogTitle = dialog.querySelector('#dialog-title');
        const dialogTech = dialog.querySelector('#dialog-tech');
        const dialogDesc = dialog.querySelector('#dialog-desc');
        const dialogLink = dialog.querySelector('#dialog-link');
        const closeButton = dialog.querySelector('#dialog-close');
        let lastTrigger = null;

        document.querySelectorAll('.work-open[data-project]').forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                const project = projects[trigger.dataset.project];
                if (!project) return;

                event.preventDefault();
                lastTrigger = trigger;

                dialogImage.src = project.image;
                dialogImage.alt = project.alt;
                dialogTitle.textContent = project.title;
                dialogTech.textContent = project.tech;
                dialogDesc.textContent = project.description;
                dialogLink.href = project.href;

                dialog.showModal();
                document.documentElement.style.overflow = 'hidden';
            });
        });

        const closeDialog = () => {
            dialog.close();
            document.documentElement.style.overflow = '';
            if (lastTrigger) lastTrigger.focus();
        };

        closeButton.addEventListener('click', closeDialog);

        dialog.addEventListener('cancel', () => {
            document.documentElement.style.overflow = '';
            if (lastTrigger) lastTrigger.focus();
        });

        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) closeDialog();
        });
    }

    /* ---------------------------------------------------------------------
       7. Form kontak: kirim lewat fetch, status ditulis di halaman
       ------------------------------------------------------------------ */
    const form = document.querySelector('#contact-form');
    const status = document.querySelector('#form-status');
    const submitButton = document.querySelector('#submit-btn');

    if (form && status && submitButton) {
        const buttonLabel = submitButton.innerHTML;

        const report = (message, state) => {
            status.textContent = message;
            if (state) status.dataset.state = state;
            else delete status.dataset.state;
        };

        form.addEventListener('submit', async (event) => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            submitButton.disabled = true;
            submitButton.textContent = 'Mengirim…';
            report('', null);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { Accept: 'application/json' }
                });

                if (!response.ok) throw new Error('failed');

                report('Pesan terkirim. Terima kasih sudah menghubungi!', 'ok');
                form.reset();
            } catch (error) {
                report('Pesan gagal dikirim. Coba lagi, atau email nugi5555.a@gmail.com.', 'error');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = buttonLabel;
            }
        });
    }
})();
