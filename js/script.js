document.addEventListener('DOMContentLoaded', function() {
  // Handle page loader
  const loader = document.querySelector('.loader-container');
  
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
      
      // Start animations after loader is hidden
      setTimeout(() => {
        initAnimations();
      }, 500);
    }, 1500);
  } else {
    initAnimations();
  }
  
  function initAnimations() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 767;
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-mobile .nav-link');
    
    if (menuToggle && closeMenu && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu icon
        const spans = document.querySelectorAll('.menu-icon span');
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(8px, -8px)';
      });
      
      closeMenu.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset menu icon
        const spans = document.querySelectorAll('.menu-icon span');
        spans[0].style.transform = 'rotate(0) translate(0)';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'rotate(0) translate(0)';
      });
      
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
          
          // Reset menu icon
          const spans = document.querySelectorAll('.menu-icon span');
          spans[0].style.transform = 'rotate(0) translate(0)';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'rotate(0) translate(0)';
        });
      });
    }
    
    // Navbar scroll effect with passive listener
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');
    
    function handleScroll() {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
        if (backToTop) {
          backToTop.classList.add('active');
          backToTop.style.display = 'flex';
        }
      } else {
        navbar.classList.remove('scrolled');
        if (backToTop) {
          backToTop.classList.remove('active');
          backToTop.style.display = 'none';
        }
      }
    }
    
    // // Use requestAnimationFrame for smooth scroll handling
    // let ticking = false;
    // window.addEventListener('scroll', function() {
    //   if (!ticking) {
    //     window.requestAnimationFrame(function() {
    //       handleScroll();
    //       ticking = false;
    //     });
    //     ticking = true;
    //   }
    // }, { passive: true });
    
    // // Initial call
    // handleScroll();
    
    // Update on window resize
    // window.addEventListener('resize', () => {
    //   handleScroll();
    // });
    
    // Back to top button with native smooth scroll
    if (backToTop) {
      backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Scroll to anchor links smoothly (only if not mobile)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: isMobile ? 'auto' : 'smooth' });
        }
      });
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-dot');
    const heroNextBtn = document.querySelector('.hero-nav-btn.next');
    const heroPrevBtn = document.querySelector('.hero-nav-btn.prev');
    
    if (heroSlides.length > 0) {
      let currentSlide = 0;
      let slideInterval;
      
      function goToSlide(index) {
        // Hide all slides
        heroSlides.forEach(slide => {
          slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        heroDots.forEach(dot => {
          dot.classList.remove('active');
        });
        
        // Show selected slide
        heroSlides[index].classList.add('active');
        
        // Add active class to selected dot
        heroDots[index].classList.add('active');
        
        // Update current slide index
        currentSlide = index;
        
        // Reset interval
        clearInterval(slideInterval);
        startSlideInterval();
      }
      
      function nextSlide() {
        let newIndex = currentSlide + 1;
        if (newIndex >= heroSlides.length) {
          newIndex = 0;
        }
        goToSlide(newIndex);
      }
      
      function prevSlide() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
          newIndex = heroSlides.length - 1;
        }
        goToSlide(newIndex);
      }
      
      function startSlideInterval() {
        slideInterval = setInterval(nextSlide, 6000);
      }
      
      // Set up event listeners
      if (heroNextBtn) {
        heroNextBtn.addEventListener('click', function() {
          nextSlide();
        });
      }
      
      if (heroPrevBtn) {
        heroPrevBtn.addEventListener('click', function() {
          prevSlide();
        });
      }
      
      heroDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
          goToSlide(index);
        });
      });
      
      // Start the slideshow
      startSlideInterval();
      
      // Hero Section Animation
      const heroTimeline = gsap.timeline();
      
      heroTimeline.from('.hero-slide.active .reveal-text', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out'
      });
      
      heroTimeline.from('.hero-slide.active .reveal', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: function() {
          // Ensure buttons stay visible after animation
          gsap.set('.hero-slide.active .reveal', {
            opacity: 1,
            y: 0
          });
        }
      }, '-=0.5');
      
      heroTimeline.from('.hero-nav, .scroll-down', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');
    }
    
    // Count Up Animation
    const numberElements = document.querySelectorAll('.count-up');
    
    function animateValue(obj, start, end, duration) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
    
    // Intersection Observer for count-up
    if (numberElements.length > 0) {
      const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            const countTo = parseInt(target.getAttribute('data-count'));
            animateValue(target, 0, countTo, 2000);
            countObserver.unobserve(target);
          }
        });
      }, { threshold: 0.5 });
      
      numberElements.forEach(number => {
        countObserver.observe(number);
      });
    }
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal-element, .fade-in, .slide-in-left, .slide-in-right');
    
    if (revealElements.length > 0) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      revealElements.forEach(element => {
        revealObserver.observe(element);
      });
    }
    
    // Testimonials Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const testimonialNext = document.querySelector('.testimonial-btn.next');
    const testimonialPrev = document.querySelector('.testimonial-btn.prev');
    
    if (testimonialSlides.length > 0) {
      let currentTestimonial = 0;
      let testimonialInterval;
      
      function goToTestimonial(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
          slide.classList.remove('active');
          gsap.to(slide, { opacity: 0, duration: 0.3, display: 'none' });
        });
        
        // Remove active class from all dots
        testimonialDots.forEach(dot => {
          dot.classList.remove('active');
        });
        
        // Show selected slide
        gsap.to(testimonialSlides[index], { opacity: 1, duration: 0.5, display: 'block' });
        testimonialSlides[index].classList.add('active');
        
        // Add active class to selected dot
        testimonialDots[index].classList.add('active');
        
        // Update current slide index
        currentTestimonial = index;
        
        // Reset interval
        clearInterval(testimonialInterval);
        startTestimonialInterval();
      }
      
      function nextTestimonial() {
        let newIndex = currentTestimonial + 1;
        if (newIndex >= testimonialSlides.length) {
          newIndex = 0;
        }
        goToTestimonial(newIndex);
      }
      
      function prevTestimonial() {
        let newIndex = currentTestimonial - 1;
        if (newIndex < 0) {
          newIndex = testimonialSlides.length - 1;
        }
        goToTestimonial(newIndex);
      }
      
      function startTestimonialInterval() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
      }
      
      // Set up event listeners
      if (testimonialNext) {
        testimonialNext.addEventListener('click', function() {
          nextTestimonial();
        });
      }
      
      if (testimonialPrev) {
        testimonialPrev.addEventListener('click', function() {
          prevTestimonial();
        });
      }
      
      testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
          goToTestimonial(index);
        });
      });
      
      // Start the slideshow
      startTestimonialInterval();
    }
    
    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.service-icon'), {
          y: -5,
          scale: 1.1,
          color: '#f59e0b',
          duration: 0.3,
          ease: 'power1.out'
        });
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.service-icon'), {
          y: 0,
          scale: 1,
          color: '#3b82f6',
          duration: 0.3,
          ease: 'power1.out'
        });
      });
    });
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
      question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        const isOpen = answer.style.maxHeight !== '';
        
        // Close all other FAQs first
        faqQuestions.forEach(q => {
          const a = q.nextElementSibling;
          const i = q.querySelector('i');
          if (q !== question) {
            a.style.maxHeight = null;
            a.style.padding = '0 1.5rem';
            i.style.transform = 'rotate(0)';
          }
        });
        
        // Toggle current FAQ
        if (isOpen) {
          answer.style.maxHeight = null;
          answer.style.padding = '0 1.5rem';
          icon.style.transform = 'rotate(0)';
        } else {
          answer.style.maxHeight = answer.scrollHeight + 'px';
          answer.style.padding = '0 1.5rem';
          icon.style.transform = 'rotate(180deg)';
        }
      });
    });

    // Contact Form Submission (if on contact page)
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form submission)
        setTimeout(() => {
          console.log('Form submitted:', { name, email, message });
          
          // Show success message
          const formStatus = document.getElementById('form-status');
          formStatus.classList.add('success');
          formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you shortly.';
          formStatus.style.display = 'block';
          
          // Reset form
          contactForm.reset();
          
          // Reset button
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          
          // Hide success message after 5 seconds
          setTimeout(() => {
            formStatus.style.display = 'none';
          }, 5000);
        }, 1500);
      });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Show success message (replace with actual submission logic)
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
      });
    }
  }
});
 