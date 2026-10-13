// Mark JS as available so reveal animations only apply when scripts run
document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", function () {

    const navbar = document.getElementById("navbar");
    const navLinks = document.getElementById("navLinks");
    const menuToggle = document.getElementById("menuToggle");
    const progress = document.getElementById("scrollProgress");
    const toTop = document.getElementById("toTop");


    // ---------- Typing effect ----------
    const typedEl = document.getElementById("typed");
    const words = ["Full-Stack Developer", "React.js Developer", "Node.js Developer", "Problem Solver"];
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {
        const word = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typedEl.textContent = word.substring(0, charIndex);

        let delay = deleting ? 45 : 90;

        if (!deleting && charIndex === word.length) {
            delay = 1600;
            deleting = true;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        setTimeout(type, delay);
    }

    if (typedEl) {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            typedEl.textContent = words[0];
        } else {
            type();
        }
    }


    // ---------- Mobile menu ----------
    function closeMenu() {
        navLinks.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", function () {
        const isOpen = navLinks.classList.toggle("open");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", closeMenu);
    });


    // ---------- Scroll effects (navbar, progress bar, back-to-top) ----------
    function onScroll() {
        const scrollTop = window.scrollY;
        const height = document.documentElement.scrollHeight - window.innerHeight;

        progress.style.width = (height > 0 ? (scrollTop / height) * 100 : 0) + "%";
        navbar.classList.toggle("scrolled", scrollTop > 20);
        toTop.classList.toggle("show", scrollTop > 600);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    toTop.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    // ---------- Reveal on scroll ----------
    const revealEls = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        revealEls.forEach(function (el) {
            el.classList.add("visible");
        });
    }


    // ---------- Count-up numbers ----------
    const counters = document.querySelectorAll("[data-count]");

    function runCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.suffix || "";
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) {
                requestAnimationFrame(tick);
            }
        }

        requestAnimationFrame(tick);
    }

    if ("IntersectionObserver" in window) {
        const counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    runCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach(function (el) {
            counterObserver.observe(el);
        });
    } else {
        counters.forEach(function (el) {
            el.textContent = el.dataset.count + (el.dataset.suffix || "");
        });
    }


    // ---------- Highlight active nav link ----------
    const sections = document.querySelectorAll("section[id]");
    const links = navLinks.querySelectorAll("a");

    if ("IntersectionObserver" in window) {
        const navObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    links.forEach(function (link) {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === "#" + entry.target.id
                        );
                    });
                }
            });
        }, { rootMargin: "-45% 0px -50% 0px" });

        sections.forEach(function (section) {
            navObserver.observe(section);
        });
    }


    // ---------- Placeholder project link ----------
    document.querySelectorAll('.project-link[href="#"]').forEach(function (link) {
        link.addEventListener("click", function (e) {
            e.preventDefault();
        });
    });

});