// Testimonials Carousel Initialization
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the testimonials carousel if it exists
  if (document.querySelector('.testimonials-carousel')) {
    $('.testimonials-carousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      dots: true,
      autoplay: true,
      autoplayTimeout: 5000,
      autoplayHoverPause: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        },
        992: {
          items: 3
        }
      },
      navText: [
        '<i class="fas fa-chevron-left"></i>',
        '<i class="fas fa-chevron-right"></i>'
      ]
    });
  }
});