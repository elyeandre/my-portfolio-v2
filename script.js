const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('#nav-list a');





// Toggle hamburger menu
hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Close nav when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Close nav when clicking outside
document.addEventListener('click', (e) => {
  const isClickInside = nav.contains(e.target) || hamburger.contains(e.target);
  if (!isClickInside) {
    nav.classList.remove('active');
  }
});

//for viewing certificates
const lightboxLinks = document.querySelectorAll('.lightbox');
const lightboxOverlay = document.getElementById('lightbox-overlay');
const lightboxImg = document.getElementById('lightbox-img');

lightboxLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    lightboxImg.src = this.href;
    lightboxOverlay.style.display = 'flex';
  });
});

// Add click event listener for certificate close button
document.addEventListener('DOMContentLoaded', function() {
  const certificateClose = document.querySelector('.certificate-close');
  if (certificateClose) {
    certificateClose.addEventListener('click', function(e) {
      e.stopPropagation();
      closeCertificateLightbox();
    });
  }
});

// Global function for closing certificate lightbox
function closeCertificateLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const img = document.getElementById('lightbox-img');
  if (overlay) {
    overlay.style.display = 'none';
  }
  if (img) {
    img.src = '';
  }
}

// Alias for backwards compatibility with inline HTML onclick handlers
function closeLightbox() {
  closeCertificateLightbox();
}

// Resume Modal Logic
const resumeModal = document.getElementById("resumeModal");
const resumeOpenBtn = document.querySelector(".downloadresume-btn");
const resumeCloseBtn = document.querySelector(".resume-close");

if (resumeOpenBtn && resumeModal) {
  resumeOpenBtn.onclick = () => {
    resumeModal.style.display = "block";
    document.body.classList.add('modal-open');
  };
}

if (resumeCloseBtn && resumeModal) {
  resumeCloseBtn.onclick = () => {
    resumeModal.style.display = "none";
    document.body.classList.remove('modal-open');
  };
}

window.addEventListener("click", (e) => {
  if (e.target === resumeModal) {
    resumeModal.style.display = "none";
    document.body.classList.remove('modal-open');
  }
});

// Resume form
document.getElementById("resumeRequestForm").addEventListener("submit", function (e) {
  const email = document.getElementById("resumeEmailInput").value;
  if (!email) {
    e.preventDefault();
    return;
  }
});

// Contact form handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    const name = document.getElementById('contactNameInput').value.trim();
    const email = document.getElementById('contactEmailInput').value.trim();
    const subject = document.getElementById('contactSubjectInput').value.trim();
    const message = document.getElementById('contactMessageInput').value.trim();

    if (!name || !email || !subject || !message) {
      e.preventDefault();
      alert('Please fill in all required fields.');
      return;
    }
    
    // Show success message after form submission
    setTimeout(() => {
      contactForm.reset();
      alert('Thank you for your message! I\'ll get back to you soon.');
    }, 1000);
  });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  // Create intersection observer for lazy loading
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          img.classList.add('loaded');
          observer.unobserve(img);
        }
      }
    });
  }, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  });

  // Observe all lazy images
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => {
    imageObserver.observe(img);
  });

  // Fallback for browsers that don't support Intersection Observer
  if (!('IntersectionObserver' in window)) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      img.classList.add('loaded');
    });
  }
});

 function openModal(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'flex';
      document.body.classList.add('modal-open');
    }
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = 'none';
    }
    document.body.classList.remove('modal-open');
  }

  

  // Optional: Close modal on outside click
  window.addEventListener('click', function(e) {
    document.querySelectorAll('.project-modal').forEach(modal => {
      if (e.target === modal) {
        modal.style.display = 'none';
  document.body.classList.remove('modal-open');
      }
    });
  });
  
  const scrollToTopBtn = document.getElementById('scrollToTop');
  const sections = document.querySelectorAll('section');

// Update the highlightActiveSection function
function highlightActiveSection() {
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Calculate viewport thresholds
    const viewportThreshold = window.innerHeight * 0.3;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Check if section is in view
    if (window.pageYOffset >= (sectionTop - viewportThreshold) && 
        window.pageYOffset <= (sectionBottom - viewportThreshold)) {
      currentSection = section.getAttribute('id');
    }
  });
  
  // Special case for last section at bottom of page
  const scrollBottom = window.pageYOffset + window.innerHeight;
  const pageBottom = document.documentElement.scrollHeight;
  
  if (scrollBottom >= pageBottom - 10) {
    currentSection = sections[sections.length - 1].getAttribute('id');
  }
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

  // Scroll to top button visibility
  function toggleScrollToTop() {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  }

  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Scroll to top functionality
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

 // Initialize
 highlightActiveSection();
 toggleScrollToTop();
 
 // Event listeners
 window.addEventListener('scroll', () => {
   highlightActiveSection();
   toggleScrollToTop();
 });

// Carousel functionality
function changeSlide(button, direction) {
  const projectCard = button.closest('.project-card');
  const slides = projectCard.querySelectorAll('.carousel-slide');
  const dots = projectCard.querySelectorAll('.dot');
  
  let currentSlide = 0;
  slides.forEach((slide, index) => {
    if (slide.classList.contains('active')) {
      currentSlide = index;
    }
  });
  
  // Remove active class from current slide and dot
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  // Calculate new slide index
  currentSlide += direction;
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  } else if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  
  // Add active class to new slide and dot
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function currentSlide(dot, slideIndex) {
  const projectCard = dot.closest('.project-card');
  const slides = projectCard.querySelectorAll('.carousel-slide');
  const dots = projectCard.querySelectorAll('.dot');
  
  // Remove active class from all slides and dots
  slides.forEach(slide => slide.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  
  // Add active class to selected slide and dot
  slides[slideIndex - 1].classList.add('active');
  dots[slideIndex - 1].classList.add('active');
}

// Auto-play carousel (optional)
function autoPlayCarousels() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    setInterval(() => {
      const nextButton = card.querySelector('.carousel-next');
      if (nextButton && !card.matches(':hover')) {
        changeSlide(nextButton, 1);
      }
    }, 4000); // Change slide every 4 seconds
  });
}

// Initialize auto-play when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait a bit before starting auto-play to let everything load
  setTimeout(autoPlayCarousels, 2000);
  
  // Initialize lightbox functionality
  initializeLightbox();
  
  // Check and conditionally show inspect buttons
  checkInspectButtons();

  // Set dynamic footer year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

// Function to check inspect buttons - always show regardless of image count
function checkInspectButtons() {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    const images = card.querySelectorAll('.carousel-slide img');
    const inspectBtn = card.querySelector('.project-inspect-btn');
    
    if (inspectBtn && images.length > 0) {
      // Always show inspect button regardless of image count
      inspectBtn.style.display = 'inline-block';
      
      /* Previous logic that hid buttons for single images:
      // Get unique image sources
      const uniqueImages = new Set();
      images.forEach(img => uniqueImages.add(img.src));
      
      // Hide inspect button if there's only one unique image
      if (uniqueImages.size <= 1) {
        inspectBtn.style.display = 'none';
      } else {
        inspectBtn.style.display = 'inline-block';
      }
      */
    }
  });
}

// Lightbox functionality for project images
let currentLightboxImages = [];
let currentLightboxIndex = 0;
let currentProjectTitle = '';

function initializeLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  
  // Close lightbox events
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function(e) {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });
  }
  
  // Navigation events
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => navigateLightbox(1));
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (lightboxModal && lightboxModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        navigateLightbox(-1);
      } else if (e.key === 'ArrowRight') {
        navigateLightbox(1);
      }
    }
  });
  
  // Touch gesture support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  if (lightboxModal) {
    lightboxModal.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    lightboxModal.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipeGesture();
    }, { passive: true });
  }
  
  function handleSwipeGesture() {
    const swipeThreshold = 50; // Minimum distance for swipe
    const swipeDistance = touchEndX - touchStartX;
    
    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous image
        navigateLightbox(-1);
      } else {
        // Swipe left - go to next image
        navigateLightbox(1);
      }
    }
  }
}

function openProjectLightbox(button) {
  const projectCard = button.closest('.project-card');
  const projectTitleElement = projectCard.querySelector('.project-title');
  const allImages = projectCard.querySelectorAll('.carousel-slide img');
  
  // Store project information
  currentProjectTitle = projectTitleElement ? projectTitleElement.textContent : 'Project Images';
  currentLightboxImages = Array.from(allImages);
  currentLightboxIndex = 0; // Start with first image
  
  // Show lightbox
  const lightboxModal = document.getElementById('lightbox-modal');
  if (lightboxModal) {
    lightboxModal.classList.add('active');
    lightboxModal.style.display = 'flex';
    
    // Update lightbox content
    updateLightboxContent();
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  if (lightboxModal) {
    lightboxModal.classList.remove('active');
    lightboxModal.style.display = 'none';
  }
  
  // Restore body scroll
  document.body.style.overflow = 'auto';
}

function navigateLightbox(direction) {
  currentLightboxIndex += direction;
  
  // Handle wraparound
  if (currentLightboxIndex >= currentLightboxImages.length) {
    currentLightboxIndex = 0;
  } else if (currentLightboxIndex < 0) {
    currentLightboxIndex = currentLightboxImages.length - 1;
  }
  
  updateLightboxContent();
}

function updateLightboxContent() {
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCounter = document.getElementById('lightbox-counter');
  
  if (currentLightboxImages.length > 0) {
    const currentImg = currentLightboxImages[currentLightboxIndex];
    
    // Update image
    if (lightboxImage) {
      lightboxImage.src = currentImg.src;
      lightboxImage.alt = currentImg.alt;
      
      // Check if image is from a portrait slide (for mobile app screenshots)
      const isPortrait = currentProjectTitle.includes('Streamely') || 
                        (currentImg.parentElement && 
                         currentImg.parentElement.classList.contains('portrait-slide'));
        
      // Apply portrait class if needed
      if (isPortrait) {
        lightboxImage.classList.add('portrait-image');
      } else {
        lightboxImage.classList.remove('portrait-image');
      }
    }
    
    // Update title and counter
    if (lightboxTitle) {
      lightboxTitle.textContent = currentProjectTitle;
    }
    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${currentLightboxImages.length}`;
    }
  }
}