// Product Filtering
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card-detailed');

  // Show all products initially
  productCards.forEach(card => {
    card.style.display = 'block';
    card.style.opacity = '1';
    card.style.visibility = 'visible';
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');

      const category = button.getAttribute('data-category');

      productCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.visibility = 'visible';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.visibility = 'hidden';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

// Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
  const scrollElements = document.querySelectorAll('[data-scroll]');

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('is-visible');
    element.style.opacity = '1';
    element.style.visibility = 'visible';
  };

  const hideScrollElement = (element) => {
    element.classList.remove('is-visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // Initial check for elements in view
  handleScrollAnimation();

  // Add scroll event listener
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
}); 