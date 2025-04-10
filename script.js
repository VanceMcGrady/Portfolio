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

  // Banner collapse on scroll functionality
  const aboutSection = document.getElementById("about");
  let lastScrollTop = 0;

  // Function to handle banner collapse/expand based on scroll position
  function handleBannerOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Collapse banner when scrolling down beyond 150px
    if (scrollTop > 150) {
      aboutSection.classList.add("collapsed");
    } else {
      // Expand banner when near the top of the page
      aboutSection.classList.remove("collapsed");
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleBannerOnScroll);

  // Initial check for page load position
  handleBannerOnScroll();

  // Testimonials carousel functionality
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  let currentTestimonial = 0;
  const testimonialInterval = 10000; // Change testimonial every 10 seconds

  function showTestimonial(index) {
    // Hide all testimonials
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show the selected testimonial and activate its dot
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");

    // Update current testimonial index
    currentTestimonial = index;
  }

  // Auto rotate through testimonials
  function rotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Set up click events for dots - fixed to prevent multiple intervals
  if (dots.length > 0) {
    for (let i = 0; i < dots.length; i++) {
      dots[i].onclick = function () {
        // Stop the current rotation
        clearInterval(testimonialRotation);
        testimonialRotation = null;

        // Show the selected testimonial
        showTestimonial(i);

        // Create a new interval with proper timing
        testimonialRotation = setInterval(
          rotateTestimonials,
          testimonialInterval
        );
      };
    }
  }

  // Start the testimonial rotation
  let testimonialRotation = setInterval(
    rotateTestimonials,
    testimonialInterval
  );

  // Pause rotation when hovering over testimonials
  const testimonialCarousel = document.querySelector(".testimonial-carousel");
  if (testimonialCarousel) {
    testimonialCarousel.addEventListener("mouseenter", () => {
      // Clear interval and set to null when mouse enters
      clearInterval(testimonialRotation);
      testimonialRotation = null;
    });

    // Resume rotation when mouse leaves
    testimonialCarousel.addEventListener("mouseleave", () => {
      // Only create new interval if none exists
      if (!testimonialRotation) {
        testimonialRotation = setInterval(
          rotateTestimonials,
          testimonialInterval
        );
      }
    });
  }

  // Initialize the first testimonial
  if (testimonials.length > 0) {
    showTestimonial(0);
  }
});
