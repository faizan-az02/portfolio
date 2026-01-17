// Configuration
const CONFIG = {
  email: 'faizan.professional02@gmail.com',
  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/faizan-az02',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/faizan-az02',
    },
  ],
  projects: [
    {
      title: 'Music Recommendation System using Audio Similarity',
      description: 'Developed a content-based music recommendation system using Locality-Sensitive Hashing (LSH). Extracted MFCC audio features for compact track representations and built a user interface to play tracks and display recommendations.',
      tech: ['Python', 'LSH', 'Audio Processing', 'MFCC'],
      github: 'https://github.com/faizan-az02/MusicRecommendationSystem',
      external: '',
    },
    {
      title: 'Geometric Image Alignment and Multi-View Image Stitching System',
      description: 'Developed a computer vision pipeline for geometric image alignment and multi-view image stitching using OpenCV. Applied affine transformations to align heterogeneous inputs and generate structured image mosaics.',
      tech: ['Python', 'OpenCV', 'Computer Vision', 'Image Processing'],
      github: 'https://github.com/faizan-az02/ImageStitching',
      external: '',
    },
    {
      title: 'Clause Similarity Detection using BiLSTM Encoders',
      description: 'Detected semantic similarity between clause pairs using BiLSTM encoders with mean and attention pooling. Achieved 99.90% accuracy with the attention-based model.',
      tech: ['Python', 'Keras', 'BiLSTM', 'Deep Learning', 'NLP'],
      github: 'https://github.com/faizan-az02/LegalClausesSimilarity',
      external: '',
    },
  ],
};

// Navigation scroll behavior
let lastScroll = 0;
let scrollDirection = 'down';
const header = document.getElementById('nav');
let scrolledToTop = true;
let scrollTimeout = null;

function handleScroll() {
  const currentScroll = window.pageYOffset;
  
  // Clear any existing timeout
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  
  if (currentScroll < 50) {
    scrolledToTop = true;
    header.classList.remove('scrolled', 'hidden-nav');
  } else {
    scrolledToTop = false;
    header.classList.add('scrolled');
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down - hide nav after a delay
      scrollDirection = 'down';
      scrollTimeout = setTimeout(() => {
        header.classList.add('hidden-nav');
      }, 150);
    } else {
      // Scrolling up - show nav immediately
      scrollDirection = 'up';
      header.classList.remove('hidden-nav');
    }
  }
  
  lastScroll = currentScroll;
}

// Show nav when hovering near top of page
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
  mouseY = e.clientY;
  if (mouseY < 100 && !scrolledToTop) {
    // Mouse is near top - show nav
    header.classList.remove('hidden-nav');
  }
});

// Also show nav when mouse enters header area
header.addEventListener('mouseenter', () => {
  header.classList.remove('hidden-nav');
});

window.addEventListener('scroll', handleScroll);

// Mobile menu toggle
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const body = document.body;

function closeMenu() {
  if (menuButton) menuButton.classList.remove('active');
  if (menu) menu.classList.remove('active');
  body.classList.remove('blur', 'hidden');
}

if (menuButton && menu) {
  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    menuButton.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('blur');
    body.classList.toggle('hidden');
  });
}

// Close button inside menu
const menuClose = document.getElementById('menuClose');
if (menuClose) {
  menuClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });
}

// Close menu when clicking on links
const menuLinks = menu.querySelectorAll('a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menu.classList.contains('active')) {
    closeMenu();
  }
});

// Swipe to close menu on mobile (swipe RIGHT to close)
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

if (menu) {
  menu.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  menu.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, { passive: true });
}

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX; // Positive = swipe right
  const verticalDistance = Math.abs(touchStartY - touchEndY);
  
  // Swipe RIGHT (positive distance) to close, and vertical movement should be minimal
  if (swipeDistance > 100 && verticalDistance < 50 && menu.classList.contains('active')) {
    closeMenu();
  }
}

// Close menu when clicking outside (on backdrop)
if (menu) {
  menu.addEventListener('click', (e) => {
    // If click is on the menu itself (not on nav or links), close it
    if (e.target === menu) {
      closeMenu();
    }
  });
}

// Also close when clicking on the backdrop overlay
document.addEventListener('click', (e) => {
  if (menu && menu.classList.contains('active')) {
    // Check if click is outside the menu
    const menuRect = menu.getBoundingClientRect();
    const clickX = e.clientX;
    const clickY = e.clientY;
    
    // If click is to the left of the menu (on the backdrop), close it
    if (clickX < menuRect.left) {
      closeMenu();
    }
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Update active section after scroll completes
      const targetId = target.getAttribute('id');
      setTimeout(() => {
        // Remove active from all
        navLinks.forEach(link => {
          link.classList.remove('active');
        });
        // Add active to clicked link
        const clickedLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
        if (clickedLink) {
          clickedLink.classList.add('active');
        }
        // Then let the scroll handler take over
        setTimeout(highlightActiveSection, 300);
      }, 600);
    }
  });
});

// Active section highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightActiveSection() {
  const scrollPosition = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
  const offset = 150; // Trigger point from top of viewport
  let currentNavLink = '';

  // Get section positions
  const aboutSection = document.querySelector('#about');
  const jobsSection = document.querySelector('#jobs');
  const featuredSection = document.querySelector('#featured');
  const projectsSection = document.querySelector('#projects');
  const contactSection = document.querySelector('#contact');

  // Remove active class from all nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });

  // Determine which nav link should be active based on scroll position
  if (!aboutSection || scrollPosition < aboutSection.offsetTop - offset) {
    // Before About section - highlight About
    currentNavLink = 'about';
  } else if (!jobsSection || scrollPosition < jobsSection.offsetTop - offset) {
    // Between About and Jobs - highlight About (keep it highlighted)
    currentNavLink = 'about';
  } else if (!featuredSection || scrollPosition < featuredSection.offsetTop - offset) {
    // Between Jobs and Featured - highlight Experience
    currentNavLink = 'jobs';
  } else if (!projectsSection || scrollPosition < projectsSection.offsetTop - offset) {
    // Between Featured and Projects - highlight Work (when entering featured)
    currentNavLink = 'projects';
  } else if (!contactSection || scrollPosition < contactSection.offsetTop - offset) {
    // Between Projects and Contact - highlight Work
    currentNavLink = 'projects';
  } else {
    // Past Contact - highlight Contact
    currentNavLink = 'contact';
  }

  // Add active class to corresponding nav link
  if (currentNavLink) {
    const activeLink = document.querySelector(`.nav-links a[href="#${currentNavLink}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Run on scroll with throttling (using different variable name to avoid conflict)
let highlightTimeout;
let isScrolling = false;

function handleHighlightScroll() {
  if (!isScrolling) {
    highlightActiveSection();
    isScrolling = true;
  }
  clearTimeout(highlightTimeout);
  highlightTimeout = setTimeout(() => {
    highlightActiveSection();
    isScrolling = false;
  }, 10);
}

window.addEventListener('scroll', handleHighlightScroll, { passive: true });

// Run on page load
window.addEventListener('load', () => {
  setTimeout(highlightActiveSection, 100);
});
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(highlightActiveSection, 100);
});

// Jobs tab switching
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');
const tabHighlight = document.querySelector('.tab-highlight');

function switchTab(index) {
  // Update buttons
  tabButtons.forEach((btn, i) => {
    const isActive = i === index;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive);
    btn.setAttribute('tabindex', isActive ? '0' : '-1');
  });
  
  // Update panels
  tabPanels.forEach((panel, i) => {
    const isActive = i === index;
    panel.classList.toggle('active', isActive);
    panel.setAttribute('aria-hidden', !isActive);
    panel.hidden = !isActive;
  });
  
  // Update highlight position
  if (window.innerWidth > 600) {
    tabHighlight.style.transform = `translateY(${index * 42}px)`;
  } else {
    tabHighlight.style.transform = `translateX(${index * 120}px)`;
  }
}

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => switchTab(index));
  
  // Keyboard navigation
  button.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = index > 0 ? index - 1 : tabButtons.length - 1;
      switchTab(prevIndex);
      tabButtons[prevIndex].focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = index < tabButtons.length - 1 ? index + 1 : 0;
      switchTab(nextIndex);
      tabButtons[nextIndex].focus();
    }
  });
});

// Initialize tab highlight position
if (tabHighlight) {
  if (window.innerWidth > 600) {
    tabHighlight.style.transform = 'translateY(0)';
  } else {
    tabHighlight.style.transform = 'translateX(0)';
  }
}

// Handle window resize for tab highlight
window.addEventListener('resize', () => {
  const activeTab = document.querySelector('.tab-button.active');
  if (activeTab && tabHighlight) {
    const index = Array.from(tabButtons).indexOf(activeTab);
    if (window.innerWidth > 600) {
      tabHighlight.style.transform = `translateY(${index * 42}px)`;
    } else {
      tabHighlight.style.transform = `translateX(${index * 120}px)`;
    }
  }
});

// Projects show more/less
const showMoreBtn = document.getElementById('showMoreBtn');
const projectsGrid = document.getElementById('projectsGrid');
const GRID_LIMIT = 6;
let showAll = false;

function renderProjects(limit = null) {
  if (!projectsGrid) return;
  
  projectsGrid.innerHTML = '';
  const projectsToShow = limit ? CONFIG.projects.slice(0, limit) : CONFIG.projects;
  
  projectsToShow.forEach(project => {
    const li = document.createElement('li');
    li.className = 'project-card';
    li.innerHTML = `
      <div class="project-card-inner">
        <div class="project-card-top">
          <div class="project-card-folder">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <div class="project-card-links">
            ${project.github ? `<a href="${project.github}" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>` : ''}
            ${project.external ? `<a href="${project.external}" aria-label="External" class="external" target="_blank" rel="noopener noreferrer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>` : ''}
          </div>
        </div>
        <h3 class="project-card-title">
          <a href="${project.external || project.github || '#'}" target="_blank" rel="noopener noreferrer">${project.title}</a>
        </h3>
        <div class="project-card-description">
          <p>${project.description}</p>
        </div>
        <ul class="project-card-tech">
          ${project.tech.map(t => `<li>${t}</li>`).join('')}
        </ul>
      </div>
    `;
    projectsGrid.appendChild(li);
  });
  
  // Show/hide button
  if (CONFIG.projects.length > GRID_LIMIT) {
    showMoreBtn.style.display = 'block';
    showMoreBtn.textContent = showAll ? 'Show Less' : 'Show More';
  } else {
    showMoreBtn.style.display = 'none';
  }
}

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    showAll = !showAll;
    renderProjects(showAll ? null : GRID_LIMIT);
  });
}

// Initialize projects
if (projectsGrid && CONFIG.projects.length > 0) {
  renderProjects(GRID_LIMIT);
}

// ScrollReveal animations
if (typeof ScrollReveal !== 'undefined') {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;
  
  if (!prefersReducedMotion) {
    const sr = ScrollReveal({
      origin: 'bottom',
      distance: isMobile ? '10px' : '20px',
      duration: isMobile ? 400 : 500,
      delay: isMobile ? 50 : 200,
      rotate: { x: 0, y: 0, z: 0 },
      opacity: 0,
      scale: 1,
      easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
      mobile: true,
      reset: false,
      useDelay: 'always',
      viewFactor: isMobile ? 0.1 : 0.25,
    });

    // Reveal sections with mobile-optimized delays
    const heroDelay = isMobile ? 50 : 100;
    const sectionDelay = isMobile ? 50 : 200;
    const interval = isMobile ? 50 : 100;

    sr.reveal('.hero-greeting', { delay: heroDelay });
    sr.reveal('.hero h2', { delay: heroDelay + 50 });
    sr.reveal('.hero h3', { delay: heroDelay + 100 });
    sr.reveal('.hero-description', { delay: heroDelay + 150 });
    sr.reveal('.email-link', { delay: heroDelay + 200 });
    sr.reveal('#about', { delay: sectionDelay });
    sr.reveal('#jobs', { delay: sectionDelay });
    sr.reveal('#featured', { delay: sectionDelay });
    sr.reveal('#projects', { delay: sectionDelay });
    sr.reveal('#contact', { delay: sectionDelay });
    sr.reveal('.featured-project', { interval: interval });
    sr.reveal('.project-card', { interval: interval });
  }
}

// Handle external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
  if (link.hostname !== window.location.hostname) {
    link.setAttribute('rel', 'noopener noreferrer');
    link.setAttribute('target', '_blank');
  }
});

// Update social links and email from config
function updateSocialLinks() {
  // Update side social links
  const socialList = document.querySelector('.social ul');
  if (socialList && CONFIG.socialMedia) {
    socialList.innerHTML = CONFIG.socialMedia.map(social => {
      const icon = social.name === 'GitHub' 
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
          </svg>`;
      
      return `
        <li>
          <a href="${social.url}" aria-label="${social.name}" target="_blank" rel="noopener noreferrer">
            ${icon}
          </a>
        </li>
      `;
    }).join('');
  }
  
  // Update email
  const emailLink = document.querySelector('.email a');
  if (emailLink) {
    emailLink.textContent = CONFIG.email;
    emailLink.href = `mailto:${CONFIG.email}`;
  }
  
  // Update contact email link
  const contactEmailLink = document.querySelector('#contact .email-link');
  if (contactEmailLink) {
    contactEmailLink.href = `mailto:${CONFIG.email}`;
  }
}

// Pro Tip Popup
function showProTipPopup() {
  // Check if user has seen the popup in this session
  const hasSeenProTip = sessionStorage.getItem('hasSeenProTip');
  
  if (!hasSeenProTip) {
    const popup = document.getElementById('proTipPopup');
    const closeButton = document.getElementById('proTipClose');
    const messageElement = document.getElementById('proTipMessage');
    
    if (!popup) {
      console.warn('Pro tip popup element not found');
      return;
    }
    
    // Detect mobile device
    const isMobile = window.innerWidth <= 768 || ('ontouchstart' in window || navigator.maxTouchPoints > 0);
    
    // Update message based on device type
    if (messageElement) {
      messageElement.textContent = isMobile ? 'Tap on the photos' : 'Hover on the photos';
    }
    
    // Show popup after a short delay for better UX
    setTimeout(() => {
      popup.classList.add('show');
    }, 1000);
    
    // Close button functionality
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        closeProTipPopup();
      });
    }
    
    // Close on backdrop click
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        closeProTipPopup();
      }
    });
    
    // Close on Escape key
    const escapeHandler = (e) => {
      if (e.key === 'Escape' && popup.classList.contains('show')) {
        closeProTipPopup();
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
  }
}

function closeProTipPopup() {
  const popup = document.getElementById('proTipPopup');
  if (popup) {
    popup.classList.remove('show');
    // Mark as seen in this session
    sessionStorage.setItem('hasSeenProTip', 'true');
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  updateSocialLinks();
  showProTipPopup();
});

// Debug function: Call this in console to reset and show popup again
// window.resetProTip = () => { localStorage.removeItem('hasSeenProTip'); location.reload(); };

