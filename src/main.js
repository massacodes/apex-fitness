document.addEventListener("DOMContentLoaded", function () {
  // Animate hero section immediately on page load
  setTimeout(() => {
    const heroElements = document.querySelectorAll(
      "section:first-of-type .animate-fade-in-up, section:first-of-type .animate-fade-in-down",
    );
    heroElements.forEach((el) => {
      el.classList.add("animated");
      el.style.opacity = "1";
    });
  }, 100);
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  // Safety check - only add listeners if both elements exist
  if (mobileMenuButton && mobileMenu) {
    // Toggle Logic
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");

      const isOpen = !mobileMenu.classList.contains("hidden");
      console.log("Is the menu open?", isOpen);
    });

    // Close on Outside Click
    document.addEventListener("click", (event) => {
      const isClickInsideMenu = mobileMenu.contains(event.target);
      const isClickOnButton = mobileMenuButton.contains(event.target);

      // Check: Is it open? (It's open if it DOES NOT have the 'hidden' class)
      const isMenuOpen = !mobileMenu.classList.contains("hidden");

      if (!isClickInsideMenu && !isClickOnButton && isMenuOpen) {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      }
    });

    // Close when clicking a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenu.classList.remove("flex");
      });
    });
  }

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", function () {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar?.classList.add("shadow-md");
    } else {
      navbar?.classList.remove("shadow-md");
    }

    lastScroll = currentScroll;
  });

  // Contact form handling
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData);

      // Simulate form submission (in production, this would send to a server)
      console.log("Form submitted:", data);

      // Show success message
      if (formSuccess) {
        formSuccess.classList.remove("hidden");
        contactForm.reset();

        // Scroll to success message
        formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.classList.add("hidden");
        }, 5000);
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href !== "#" && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });

  // Scroll-triggered animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const animationObserver = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Trigger animation by adding animated class
        entry.target.classList.add("animated");
        entry.target.style.opacity = "1";
        animationObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animated elements (except hero section which should animate immediately)
  document
    .querySelectorAll(
      ".animate-fade-in-up, .animate-fade-in-down, .animate-slide-in-left, .animate-slide-in-right, .animate-scale-in, .animate-stagger",
    )
    .forEach((el) => {
      // Check if element is in hero section - if so, animate immediately
      const heroSection = document.querySelector("section:first-of-type");
      if (heroSection && heroSection.contains(el)) {
        el.classList.add("animated");
        el.style.opacity = "1";
      } else {
        animationObserver.observe(el);
      }
    });

  // Trigger stagger animations when parent is visible
  document.querySelectorAll(".animate-stagger").forEach((staggerParent) => {
    const staggerObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animations on children
          const children = entry.target.children;
          Array.from(children).forEach((child, index) => {
            setTimeout(() => {
              child.style.opacity = "1";
            }, index * 100);
          });
          staggerObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    staggerObserver.observe(staggerParent);
  });
});

// Set active navigation link based on current page
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a[href]");

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (
      linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")
    ) {
      link.classList.add("active");
    }
  });
});

// 1. Function to fetch and inject the navbar
async function loadNavbar() {
  try {
    const response = await fetch("/navbar.html");
    const html = await response.text();
    const navPlaceholder = document.getElementById("navbar-placeholder");

    if (navPlaceholder) {
      navPlaceholder.innerHTML = html;

      // 2. Initialize the menu logic ONLY after the HTML exists in the DOM
      initializeMobileMenu();
    }
  } catch (error) {
    console.error("Error loading the navbar:", error);
  }
}

