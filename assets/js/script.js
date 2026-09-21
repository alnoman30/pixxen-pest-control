// ============================================
// MOBILE MENU & NAVBAR
// ============================================
// Desktop dropdown: + / − icon toggle
document.addEventListener("DOMContentLoaded", function () {
  const desktopDropdown = document.querySelector(".desktop-dropdown");
  const dropdownIcon = document.querySelector(".desktop-dropdown-icon");

  if (desktopDropdown && dropdownIcon) {
    desktopDropdown.addEventListener("mouseenter", function () {
      dropdownIcon.textContent = "−";
    });
    desktopDropdown.addEventListener("mouseleave", function () {
      dropdownIcon.textContent = "+";
    });
  }
});

// ── Mobile 2-panel menu ──
document.addEventListener("DOMContentLoaded", function () {
  const overlay = document.getElementById("mobile-overlay");
  const wrapper = document.getElementById("mobile-menu-wrapper");
  const mmMain = document.getElementById("mm-main");
  const mmServices = document.getElementById("mm-services");
  const toggleBtn = document.getElementById("mobile-menu-toggle");
  const closeBtn = document.getElementById("mm-close");
  const servicesTrig = document.getElementById("mm-services-trigger");
  const backBtn = document.getElementById("mm-back");
  const servicesClose = document.getElementById("mm-services-close");

  function openMenu() {
    wrapper.classList.add("active");
    overlay.classList.add("active");
    wrapper.classList.remove("services-open");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    wrapper.classList.remove("active", "services-open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  function openServices() {
    wrapper.classList.add("services-open");
  }

  function closeServices() {
    wrapper.classList.remove("services-open");
  }

  // Open via hamburger
  toggleBtn && toggleBtn.addEventListener("click", openMenu);

  // Close buttons
  closeBtn && closeBtn.addEventListener("click", closeMenu);
  servicesClose && servicesClose.addEventListener("click", closeMenu);

  // Overlay click → close
  overlay && overlay.addEventListener("click", closeMenu);

  // SERVICES → slide to panel 2
  servicesTrig && servicesTrig.addEventListener("click", openServices);

  // BACK → slide back to panel 1
  backBtn && backBtn.addEventListener("click", closeServices);

  // Close nav links (non-services) also close menu
  document.querySelectorAll(".mm-nav-link:not(button)").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Service cards close menu
  document.querySelectorAll(".mm-service-card").forEach((card) => {
    card.addEventListener("click", closeMenu);
  });

  // Resize: close on desktop
  window.addEventListener("resize", function () {
    if (window.innerWidth >= 1024) closeMenu();
  });
});

//full width and height menu -

(function () {
  const overlay = document.getElementById("pixxen-menu");
  const topPanel = document.getElementById("menu-top");
  const botPanel = document.getElementById("menu-bottom");
  const closeBtn = document.getElementById("menu-close");
  const openBtn = document.getElementById("desktop-sidebar");
  const cols = document.querySelectorAll(".nav-col");
  const logoWrap = document.getElementById("bottom-logo");

  const DESKTOP_MIN = 1024;
  function isDesktop() {
    return window.innerWidth >= DESKTOP_MIN;
  }

  // ─── Pre-set initial states ───────────────────────────────────
  gsap.set(topPanel, { y: "-100%" });
  gsap.set(botPanel, { y: "100%" });
  gsap.set(cols, { y: 40, opacity: 0 });
  gsap.set(logoWrap, { y: 30, opacity: 0 });

  let isOpen = false;
  let isAnimating = false;

  // ─── OPEN ─
  function openMenu() {
    if (!isDesktop() || isOpen || isAnimating) return;
    isAnimating = true;

    document.body.classList.add("menu-open");
    overlay.classList.add("is-open");

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = true;
        isAnimating = false;
      },
    });

    tl.to(topPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(botPanel, { y: "0%", duration: 0.75, ease: "power4.out" }, 0);
    tl.to(
      cols,
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" },
      0.45,
    );
    tl.to(
      logoWrap,
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
      0.5,
    );
  }

  // ─── CLOSE ───
  function closeMenu() {
    if (!isOpen || isAnimating) return;
    isAnimating = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isOpen = false;
        isAnimating = false;
        overlay.classList.remove("is-open");
        document.body.classList.remove("menu-open");
        gsap.set(cols, { y: 40, opacity: 0 });
        gsap.set(logoWrap, { y: 30, opacity: 0 });
      },
    });

    tl.to(
      [...cols].reverse(),
      { y: -20, opacity: 0, duration: 0.3, stagger: 0.04, ease: "power2.in" },
      0,
    );
    tl.to(
      logoWrap,
      { y: 20, opacity: 0, duration: 0.25, ease: "power2.in" },
      0,
    );
    tl.to(topPanel, { y: "-100%", duration: 0.65, ease: "power4.in" }, 0.2);
    tl.to(botPanel, { y: "100%", duration: 0.65, ease: "power4.in" }, 0.2);
  }

  // Resize: viewport
  window.addEventListener("resize", () => {
    if (!isDesktop() && isOpen) {
      gsap.killTweensOf([topPanel, botPanel, cols, logoWrap]);
      gsap.set(topPanel, { y: "-100%" });
      gsap.set(botPanel, { y: "100%" });
      gsap.set(cols, { y: 40, opacity: 0 });
      gsap.set(logoWrap, { y: 30, opacity: 0 });
      overlay.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      isOpen = false;
      isAnimating = false;
    }
  });

  // ─── Events
  openBtn.addEventListener("click", openMenu);
  closeBtn.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Prevent background scroll when menu open
  const style = document.createElement("style");
  style.textContent = `body.menu-open { overflow: hidden; }`;
  document.head.appendChild(style);
})();

//smooth scroll

// Initialize Lenis
const lenis = new Lenis({
  duration: 1.4,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical",
  gestureDirection: "vertical",
  smoothWheel: true,
  wheelMultiplier: 1.3,
  infinite: false,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pixxen Pest control js start
document.querySelectorAll(".pest-cta-button").forEach((button) => {
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    button.style.setProperty("--x", `${x}px`);
    button.style.setProperty("--y", `${y}px`);
  });
});


// Pest control faq system
document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".pest-faq-item");

    faqItems.forEach(function (item) {
        const trigger = item.querySelector(".pest-faq-trigger");
        const content = item.querySelector(".pest-faq-content");
        const icon = item.querySelector(".pest-icon-close img");

        trigger.addEventListener("click", function () {
            const isOpen = item.classList.contains("active");

            // Close all FAQs
            faqItems.forEach(function (faq) {
                faq.classList.remove("active");

                const faqContent = faq.querySelector(".pest-faq-content");
                const faqIcon = faq.querySelector(".pest-icon-close img");

                faqContent.style.maxHeight = "0px";

                if (faqIcon) {
                    faqIcon.style.transform = "rotate(0deg)";
                }
            });

            // Open clicked FAQ
            if (!isOpen) {
                item.classList.add("active");

                content.style.maxHeight = content.scrollHeight + "px";

                if (icon) {
                    icon.style.transform = "rotate(45deg)";
                }
            }
        });
    });
});


// Pest conroll hero section animation
 document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(SplitText);

    const title = document.querySelector(".pest-hero-title");
    const arrow = document.querySelector(".pest-scrolldown-arrow");
    const border = document.querySelector(".pest-border-line");
    const checklist = document.querySelector(".pest-hero-checklist");
    const checklistItems = document.querySelectorAll(
      ".pest-hero-checklist-item"
    );
    const banner = document.querySelector(".pest-hero-banner");
    const description = document.querySelector(".pest-hero-description");
    const icons = document.querySelector(".pest-hero-icons");
    const iconItems = document.querySelectorAll(".pest-hero-icon-item");

    /* =========================================
       TITLE - SplitText + Blur Reveal
    ========================================= */
    let titleSplit;

    if (title) {
      titleSplit = new SplitText(title, {
        type: "words,chars",
        wordsClass: "pest-title-word",
        charsClass: "pest-title-char",
      });

      gsap.set(titleSplit.chars, {
        opacity: 0,
        y: 35,
        filter: "blur(8px)",
        rotateX: -35,
        transformOrigin: "50% 100%",
      });

      gsap.to(titleSplit.chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 1.15,
        ease: "power3.out",
        stagger: {
          each: 0.025,
          from: "start",
        },
        delay: 0.15,
      });
    }

    /* =========================================
       BORDER LINE
    ========================================= */
    if (border) {
      gsap.fromTo(
        border,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.inOut",
          delay: 0.65,
        }
      );
    }

    /* =========================================
       CHECKLIST CONTAINER
    ========================================= */
    if (checklist) {
      gsap.fromTo(
        checklist,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: 0.75,
        }
      );
    }

    /* =========================================
       CHECKLIST ITEMS
    ========================================= */
    if (checklistItems.length) {
      gsap.fromTo(
        checklistItems,
        {
          opacity: 0,
          x: -18,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.85,
        }
      );
    }

    /* =========================================
       HERO IMAGE
    ========================================= */
    if (banner) {
      gsap.fromTo(
        banner,
        {
          opacity: 0,
          y: 70,
          scale: 0.92,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          delay: 0.35,
        }
      );

      // Very subtle floating movement after entrance
      gsap.to(banner, {
        y: -8,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.8,
      });
    }

    /* =========================================
       DESCRIPTION
    ========================================= */
    if (description) {
      gsap.fromTo(
        description,
        {
          opacity: 0,
          y: 30,
          filter: "blur(4px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.65,
        }
      );
    }

    /* =========================================
       ICON CONTAINER
    ========================================= */
    if (icons) {
      gsap.fromTo(
        icons,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.9,
        }
      );
    }

    /* =========================================
       ICON ITEMS
    ========================================= */
    if (iconItems.length) {
      gsap.fromTo(
        iconItems,
        {
          opacity: 0,
          scale: 0.75,
          y: 20,
          rotate: -5,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 0.8,
          ease: "back.out(1.5)",
          stagger: 0.12,
          delay: 1,
        }
      );
    }

    /* =========================================
       SCROLL ARROW
    ========================================= */
    if (arrow) {
      gsap.fromTo(
        arrow,
        {
          opacity: 0,
          x: -25,
        },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          delay: 1.15,
        }
      );

      // Subtle continuous movement
      gsap.to(arrow, {
        x: 8,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2,
      });
    }
  });

  // 
    document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(SplitText, ScrollTrigger);

    /* =========================================
       SECTION HEADING REVEAL
       Reusable for every .pest-heading-reveal
    ========================================= */
    const sectionHeadings = document.querySelectorAll(
      ".pest-heading-reveal"
    );

    sectionHeadings.forEach((heading) => {
      const split = new SplitText(heading, {
        type: "words,chars",
        wordsClass: "pest-heading-word",
        charsClass: "pest-heading-char",
      });

      // Initial state
      gsap.set(split.chars, {
        opacity: 0,
        y: 35,
        filter: "blur(8px)",
        rotateX: -35,
        transformOrigin: "50% 100%",
      });

      // Animate when heading enters viewport
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 1.05,
        ease: "power3.out",
        stagger: {
          each: 0.025,
          from: "start",
        },
        scrollTrigger: {
          trigger: heading,
          start: "top 82%",
          once: true,
        },
      });
    });
  });