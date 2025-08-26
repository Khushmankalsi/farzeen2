// Wait for GSAP to load before executing any animations
function waitForGSAP(callback) {
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    callback();
  } else {
    setTimeout(() => waitForGSAP(callback), 100);
  }
}

// Main initialization function
function initializeAnimations() {
  // Check if GSAP is available
  if (typeof gsap === "undefined") {
    console.error(
      "GSAP library is not loaded. Please include GSAP before this script."
    );
    return;
  }

  // Register ScrollTrigger plugin
  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.error(
      "ScrollTrigger plugin is not loaded. Please include ScrollTrigger plugin."
    );
    return;
  }

  // Set initial body opacity
  gsap.set("body", { opacity: 0 });

  // Initialize all animations
  initTimelineAnimations();
  initHeroAnimations();
  initSectionAnimations();
  initInteractiveAnimations();
  initLoadingAnimation();
}

// Initialize animations when both DOM and GSAP are ready
document.addEventListener("DOMContentLoaded", () => {
  waitForGSAP(initializeAnimations);
});

function initTimelineAnimations() {
  // Check if timeline elements exist
  const timelineTitle = document.querySelector(
    ".section-timeline .timeline-title"
  );
  const timelineSubtitle = document.querySelector(
    ".section-timeline .timeline-subtitle"
  );

  if (timelineTitle && timelineSubtitle) {
    // Animate header elements
    gsap
      .timeline()
      .to(timelineTitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        timelineSubtitle,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      );
  }

  // Animate timeline steps
  const steps = document.querySelectorAll(".section-timeline .timeline-step");
  const progressFill = document.querySelector(
    ".section-timeline .timeline-progress-fill"
  );

  if (steps.length > 0) {
    steps.forEach((step, index) => {
      // Create timeline for each step
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            step.classList.add("active");
            updateProgressLine(index + 1, steps.length);
          },
          onLeave: () => {
            if (index < steps.length - 1) {
              step.classList.remove("active");
            }
          },
          onEnterBack: () => {
            step.classList.add("active");
            updateProgressLine(index + 1, steps.length);
          },
          onLeaveBack: () => {
            step.classList.remove("active");
            updateProgressLine(index, steps.length);
          },
        },
      });

      // Animate step appearance
      tl.to(step, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      // Animate step content elements
      const stepNumber = step.querySelector(".step-number");
      const stepTitle = step.querySelector(".step-title");
      const stepDescription = step.querySelector(".step-description");
      const stepFeatures = step.querySelectorAll(".feature-item");
      const stepIcon = step.querySelector(".step-icon");

      // Stagger animations for content elements
      const contentElements = [stepNumber, stepTitle, stepDescription].filter(
        Boolean
      );

      if (contentElements.length > 0) {
        tl.from(
          contentElements,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      if (stepFeatures.length > 0) {
        tl.from(
          stepFeatures,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.7)",
          },
          "-=0.3"
        );
      }

      if (stepIcon) {
        tl.from(
          stepIcon,
          {
            opacity: 0,
            scale: 0.5,
            rotation: -180,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );
      }
    });
  }

  // Add hover animations for interactive elements
  addHoverAnimations();

  // Add scroll-based parallax effects
  addParallaxEffects();
}

function updateProgressLine(currentStep, totalSteps) {
  const progressFill = document.querySelector(
    ".section-timeline .timeline-progress-fill"
  );

  if (progressFill) {
    const percentage = (currentStep / totalSteps) * 100;
    gsap.to(progressFill, {
      height: `${percentage}%`,
      duration: 0.8,
      ease: "power2.out",
    });
  }
}

function addHoverAnimations() {
  // Animate step content on hover
  const stepContents = document.querySelectorAll(
    ".section-timeline .step-content"
  );

  stepContents.forEach((content) => {
    const stepNumber = content.querySelector(".step-number");
    const featureItems = content.querySelectorAll(".feature-item");

    content.addEventListener("mouseenter", () => {
      if (stepNumber) {
        gsap.to(stepNumber, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (featureItems.length > 0) {
        gsap.to(featureItems, {
          y: -3,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });
      }
    });

    content.addEventListener("mouseleave", () => {
      if (stepNumber) {
        gsap.to(stepNumber, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      if (featureItems.length > 0) {
        gsap.to(featureItems, {
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });
      }
    });
  });
}

function addParallaxEffects() {
  // Add subtle parallax to step icons
  const stepIcons = document.querySelectorAll(".section-timeline .step-icon");

  stepIcons.forEach((icon) => {
    gsap.to(icon, {
      y: -30,
      scrollTrigger: {
        trigger: icon,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });

  // Add floating animation to step numbers
  const stepNumbers = document.querySelectorAll(
    ".section-timeline .step-number"
  );

  stepNumbers.forEach((number, index) => {
    gsap.to(number, {
      y: -10,
      duration: 2 + index * 0.2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      delay: index * 0.3,
    });
  });
}

function initHeroAnimations() {
  // Set initial states for elements
  const heroElements = [
    ".hero-title",
    ".hero-subtitle",
    ".brand-script",
    ".appointment-btn",
  ];
  const existingHeroElements = heroElements.filter((selector) =>
    document.querySelector(selector)
  );

  if (existingHeroElements.length > 0) {
    gsap.set(existingHeroElements, {
      opacity: 0,
      y: 50,
    });
  }

  const socialIcons = document.querySelectorAll(".social-icon");
  if (socialIcons.length > 0) {
    gsap.set(socialIcons, {
      opacity: 0,
      x: -50,
    });
  }

  // Hero section animations - load on page load
  const heroTL = gsap.timeline({ delay: 0.5 });

  const brandScript = document.querySelector(".brand-script");
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const appointmentBtn = document.querySelector(".appointment-btn");

  if (brandScript) {
    heroTL.to(brandScript, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    });
  }

  if (heroTitle) {
    heroTL.to(
      heroTitle,
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out",
      },
      "-=0.8"
    );
  }

  if (heroSubtitle) {
    heroTL.to(
      heroSubtitle,
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.6"
    );
  }

  if (appointmentBtn) {
    heroTL.to(
      appointmentBtn,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );
  }

  if (socialIcons.length > 0) {
    heroTL.to(
      socialIcons,
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.6"
    );
  }
}

function initSectionAnimations() {
  // Section 2 animations
  const section2 = document.querySelector(".section-2");
  if (section2) {
    ScrollTrigger.create({
      trigger: section2,
      start: "top 80%",
      animation: gsap
        .timeline()
        .fromTo(
          ".section-2 .img-con",
          {
            opacity: 0,
            scale: 0.8,
            rotation: -10,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".main-con .text-1-italic",
          {
            opacity: 0,
            x: -100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".main-con .text-1-bold",
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".text-2 p",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )
        .fromTo(
          ".icon-box",
          {
            opacity: 0,
            y: 40,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        ),
    });
  }

  // Section 3 Services animations
  const servicesSection = document.querySelector(".services-section");
  if (servicesSection) {
    ScrollTrigger.create({
      trigger: servicesSection,
      start: "top 80%",
      animation: gsap
        .timeline()
        .fromTo(
          ".services-section h1",
          {
            opacity: 0,
            y: -50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".services-section p",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        ),
    });
  }

  // Grid cards animation
  const grid = document.querySelector(".grid");
  if (grid) {
    ScrollTrigger.create({
      trigger: grid,
      start: "top 80%",
      animation: gsap
        .timeline()
        .fromTo(
          ".intro",
          {
            opacity: 0,
            x: -100,
            rotation: -5,
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 1.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".intro h2",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".intro p",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".cta",
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        )
        .fromTo(
          ".service",
          {
            opacity: 0,
            y: 60,
            rotation: 2,
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
          },
          "-=1"
        )
        .fromTo(
          ".service .copy",
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.8"
        )
    });
  }

  // Section 4 (Know Your Artist) animations
  const section4 = document.querySelector(".section-4");
  if (section4) {
    ScrollTrigger.create({
      trigger: section4,
      start: "top 80%",
      animation: gsap
        .timeline()
        .fromTo(
          ".sec-4-img",
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".section-4 .main-title",
          {
            opacity: 0,
            x: 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.8"
        )
        .fromTo(
          ".section-4 h4",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".section-4 p",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4"
        ),
    });
  }

  // Section 5 (Testimonials) animations
  const section5 = document.querySelector(".section-5");
  if (section5) {
    ScrollTrigger.create({
      trigger: section5,
      start: "top 80%",
      animation: gsap
        .timeline()
        .fromTo(
          ".section-5 h2",
          {
            opacity: 0,
            y: -40,
            rotation: -5,
          },
          {
            opacity: 1,
            y: 0,
            rotation: 0,
            duration: 1,
            ease: "power2.out",
          }
        )
        .fromTo(
          ".section-5 h4",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        ),
    });
  }

  // Testimonial cards animation
  const cardsWrap = document.querySelector(".cards-wrap");
  if (cardsWrap) {
    ScrollTrigger.create({
      trigger: cardsWrap,
      start: "top 85%",
      animation: gsap.fromTo(
        ".t-card",
        {
          opacity: 0,
          y: 80,
          rotation: 5,
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power2.out",
        }
      ),
    });
  }

  // Footer animations
  const footer = document.querySelector("footer");
  if (footer) {
    ScrollTrigger.create({
      trigger: footer,
      start: "top 85%",
      animation: gsap
        .timeline()
        .fromTo(
          "footer .main-title",
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          }
        )
        .fromTo(
          "footer p",
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.6"
        )
        .fromTo(
          ".buttons-sec .btn",
          {
            opacity: 0,
            y: 40,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.4"
        ),
    });
  }

  // Smooth reveal animation for decorative elements
  const decorativeFlourish = document.querySelector(".decorative-flourish1");
  if (decorativeFlourish) {
    ScrollTrigger.create({
      trigger: decorativeFlourish,
      start: "top 90%",
      animation: gsap.fromTo(
        ".decorative-flourish1",
        {
          opacity: 0,
          scale: 0.5,
          rotation: 180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: "power2.out",
        }
      ),
    });
  }
}

function initInteractiveAnimations() {
  // Service cards hover animations
  const serviceCards = document.querySelectorAll(".service");
  serviceCards.forEach((card) => {
    const image = card.querySelector(".media img");
    const content = card.querySelector(".copy");

    card.addEventListener("mouseenter", () => {
      if (image) {
        gsap.to(image, {
          scale: 1.1,
          // rotation: 2,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (content) {
        gsap.to(content, {
          x: 5,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (image) {
        gsap.to(image, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
      if (content) {
        gsap.to(content, {
          x: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // Testimonial cards hover effects
  const testimonialCards = document.querySelectorAll(".t-card");
  testimonialCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("featured")) {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("featured")) {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    });
  });

  // Button hover animations
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });

  // Parallax effect for hero background
  const hero = document.querySelector(".hero");
  if (hero) {
    gsap.to(hero, {
      backgroundPosition: "50% 100px",
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }

  // Smooth scroll reveal for images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    ScrollTrigger.create({
      trigger: img,
      start: "top 90%",
      animation: gsap.fromTo(
        img,
        {
          opacity: 0,
          scale: 1.1,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        }
      ),
    });
  });

  // Add smooth scrolling for better user experience
  smoothScroll();
}

// Add smooth scrolling for anchor links
function smoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        });
      }
    });
  });
}

function initLoadingAnimation() {
  // Loading animation
  window.addEventListener("load", () => {
    gsap.to("body", {
      opacity: 1,
      duration: 0.5,
    });
  });
}

// Add resize handler for responsive animations
window.addEventListener("resize", () => {
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

// Export functions for potential external use
window.GSAPAnimations = {
  initializeAnimations,
  initTimelineAnimations,
  initHeroAnimations,
  initSectionAnimations,
  initInteractiveAnimations,
  waitForGSAP,
};
