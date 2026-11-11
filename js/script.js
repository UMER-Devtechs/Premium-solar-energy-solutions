// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

// Menu open/close karne ke liye
menuToggle.addEventListener('click', (e) => {
    e.stopPropagation(); // Event ko bubble hone se roke
    nav.classList.toggle('active');
});

// Jab menu ke andar kisi link par click ho, to band ho jaye
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Jab menu ke BAHAR (screen par kisi aur jagah) tap/click karein, to band ho jaye
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

// ===== Header Scroll Effect =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ===== Counter Animation (Hero Stats) =====
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.getAttribute('data-count');
            let current = 0;
            const increment = target / 60;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    el.textContent = target + (target >= 1000 ? '+' : '');
                }
            };
            updateCounter();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));