// Archive projects data
// Add year, madeAt fields to your projects
const ARCHIVE_PROJECTS = [
  // Add your projects here with year, title, madeAt, tech, and github fields
  // Example:
  // {
  //   year: '2025',
  //   title: 'Project Name',
  //   madeAt: 'Company Name', // or '—' if personal project
  //   tech: ['Tech1', 'Tech2', 'Tech3'],
  //   github: 'https://github.com/...',
  //   external: 'https://project.com' // optional
  // }
  
  // For now, using projects from CONFIG and adding default values
];

// Function to render archive table
function renderArchiveTable() {
  const tableBody = document.getElementById('archiveTableBody');
  if (!tableBody) return;

  // Combine CONFIG projects with ARCHIVE_PROJECTS
  // If ARCHIVE_PROJECTS is empty, use CONFIG.projects with default values
  let projectsToShow = ARCHIVE_PROJECTS.length > 0 
    ? ARCHIVE_PROJECTS 
    : (typeof CONFIG !== 'undefined' && CONFIG.projects ? CONFIG.projects.map(project => ({
        year: '2024', // Default year - update this
        title: project.title,
        madeAt: '—', // Default to dash
        tech: project.tech,
        github: project.github,
        external: project.external
      })) : []);

  // Sort by year (newest first)
  projectsToShow.sort((a, b) => {
    if (a.year !== b.year) {
      return b.year.localeCompare(a.year);
    }
    return 0;
  });

  tableBody.innerHTML = '';

  projectsToShow.forEach(project => {
    const row = document.createElement('tr');
    
    // Format tech stack with middle dots
    const techStack = project.tech ? project.tech.join(' · ') : '';
    
    row.innerHTML = `
      <td class="archive-year" data-label="Year">${project.year || '—'}</td>
      <td class="archive-title-cell" data-label="Title">${project.title || '—'}</td>
      <td class="archive-made-at" data-label="Made at">${project.madeAt || '—'}</td>
      <td class="archive-tech" data-label="Built with">${techStack || '—'}</td>
      <td data-label="Link">
        ${(project.github || project.external) ? `
          <a href="${project.external || project.github || '#'}" 
             class="archive-link" 
             aria-label="View ${project.title}" 
             target="_blank" 
             rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
            </svg>
          </a>
        ` : '—'}
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Initialize archive table when page loads
document.addEventListener('DOMContentLoaded', () => {
  // Wait for CONFIG to be available if needed
  if (ARCHIVE_PROJECTS.length > 0) {
    renderArchiveTable();
  } else if (typeof CONFIG !== 'undefined' && CONFIG.projects) {
    renderArchiveTable();
  } else {
    // If CONFIG isn't loaded yet, wait a bit
    setTimeout(() => {
      if (typeof CONFIG !== 'undefined' && CONFIG.projects) {
        renderArchiveTable();
      }
    }, 100);
  }
});

// Mobile menu functionality (reuse from main.js)
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');
const body = document.body;

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('blur');
    body.classList.toggle('hidden');
  });

  // Close menu when clicking on links
  const menuLinks = menu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuButton.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('blur', 'hidden');
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      menuButton.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('blur', 'hidden');
    }
  });
}

// Navigation scroll behavior (reuse from main.js)
let lastScroll = 0;
const header = document.getElementById('nav');
let scrolledToTop = true;
let scrollTimeout = null;

function handleScroll() {
  const currentScroll = window.pageYOffset;
  
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
      scrollTimeout = setTimeout(() => {
        header.classList.add('hidden-nav');
      }, 150);
    } else {
      header.classList.remove('hidden-nav');
    }
  }
  
  lastScroll = currentScroll;
}

if (header) {
  window.addEventListener('scroll', handleScroll);
  
  // Show nav when hovering near top of page
  let mouseY = 0;
  document.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
    if (mouseY < 100 && !scrolledToTop) {
      header.classList.remove('hidden-nav');
    }
  });
  
  header.addEventListener('mouseenter', () => {
    header.classList.remove('hidden-nav');
  });
}

