// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close mobile menu when clicking on a link
  const mobileMenuLinks = mobileMenu?.querySelectorAll("a");
  mobileMenuLinks?.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });

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

  // Add fade-in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements with fade-in class
  document.querySelectorAll(".fade-in-on-scroll").forEach((el) => {
    observer.observe(el);
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
