document.addEventListener("DOMContentLoaded", () => {
  // Typewriter effect
  const typewriterElement = document.getElementById("typewriter-text");
  const phrases = [
    "Building robust, scalable applications with elegant solutions.",
    "Turning complex problems into simple solutions.",
    "Creating modern web experiences that perform and delight.",
    "Passionate about clean code and user-centric design.",
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Deleting text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster when deleting
    } else {
      // Typing text
      typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100; // Normal speed when typing
    }

    // If phrase is complete, wait and then delete
    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end of the phrase
    }
    // If deletion is complete, move to next phrase
    else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(typeWriter, typingSpeed);
  }

  // Start the typewriter effect
  typeWriter();

  // Mobile menu toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");
      navLinks.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      navLinks.classList.remove("active");
    });
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll(".section");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href").substring(1) === current) {
        item.classList.add("active");
      }
    });
  });

  // Scroll reveal animation
  const revealElements = document.querySelectorAll(
    ".project-card, .timeline-item, .skill-category"
  );

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      } else {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
      }
    });
  };

  // Initialize styles for reveal elements
  revealElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  window.addEventListener("scroll", revealOnScroll);
  // Initial check
  revealOnScroll();
});
