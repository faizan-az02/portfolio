// Archive projects data
const ARCHIVE_PROJECTS = [
  {
    year: '2026',
    title: 'Vigilon - AI-Powered Smart Surveillance System',
    madeAt: '—',
    tech: ['Python', 'YOLO', 'Computer Vision', 'OpenCV', 'Deep Learning'],
    github: 'https://github.com/faizan-az02',
    external: '',
  },
  {
    year: '2024',
    title: 'Scalable Streaming Join Engine using MeshJoin',
    madeAt: '—',
    tech: ['Python', 'Streaming', 'Data Processing', 'ETL', 'Algorithms'],
    github: 'https://github.com/faizan-az02',
    external: '',
  },
  {
    year: '2023',
    title: 'Music Recommendation System using Audio Similarity',
    madeAt: '—',
    tech: ['Python', 'LSH', 'Audio Processing', 'MFCC'],
    github: 'https://github.com/faizan-az02',
    external: '',
  },
  {
    year: '2026',
    title: 'Multi-Task Facial Emotion Analysis',
    madeAt: '—',
    tech: ['Python', 'TensorFlow', 'Keras', 'VGG16', 'ResNet50', 'Computer Vision'],
    github: 'https://github.com/faizan-az02/MultiTaskFacialEmotionAnalysis',
    external: '',
  },
  {
    year: '2023',
    title: 'Geometric Image Alignment and Multi-View Image Stitching System',
    madeAt: '—',
    tech: ['Python', 'OpenCV', 'Computer Vision', 'Image Processing'],
    github: 'https://github.com/faizan-az02',
    external: '',
  },
  {
    year: '2023',
    title: 'Image Similarity Search using Locality-Sensitive Hashing',
    madeAt: '—',
    tech: ['Python', 'LSH', 'Computer Vision', 'Web Interface'],
    github: 'https://github.com/faizan-az02',
    external: '',
  },
  {
    year: '2025',
    title: 'Clause Similarity Detection using BiLSTM Encoders',
    madeAt: '—',
    tech: ['Python', 'BiLSTM', 'Data Processing', 'ETL', 'NLP'],
    github: 'https://github.com/faizan-az02/LegalClausesSimilarity',
    external: '',
  },
  {
    year: '2024',
    title: 'Duck Shoot',
    madeAt: '—',
    tech: ['Assemblyx86', 'Logic Building', 'Games', '2D'],
    github: 'https://github.com/faizan-az02/DuckShoot',
    external: '',
  },
  {
    year: '2024',
    title: 'Farewell Management System',
    madeAt: '—',
    tech: ['Python', 'Javascript', 'HTML', 'CSS', "MySQL", "NodeJS", "Express"],
    github: 'https://github.com/faizan-az02/DuckShoot',
    external: '',
  }
  
];

// Function to render archive table
function renderArchiveTable() {
  const tableBody = document.getElementById('archiveTableBody');
  if (!tableBody) {
    console.error('archiveTableBody not found. DOM might not be ready yet.');
    // Try again after a short delay
    setTimeout(renderArchiveTable, 100);
    return;
  }
  
  console.log('archiveTableBody found, rendering projects');

  // Combine CONFIG projects with ARCHIVE_PROJECTS
  // If ARCHIVE_PROJECTS is empty, use CONFIG.projects with default values
  let projectsToShow = ARCHIVE_PROJECTS.length > 0 
    ? ARCHIVE_PROJECTS 
    : (typeof CONFIG !== 'undefined' && CONFIG.projects ? CONFIG.projects.map(project => ({
        year: '2026', // Default year - update this
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

  console.log('Rendering', projectsToShow.length, 'projects');
  tableBody.innerHTML = '';

  if (projectsToShow.length === 0) {
    console.warn('No projects to display');
    return;
  }

  try {
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
  } catch (error) {
    console.error('Error rendering archive table:', error);
  }
}

// Initialize archive table when page loads
function initArchive() {
  console.log('initArchive called, ARCHIVE_PROJECTS length:', ARCHIVE_PROJECTS.length);
  if (ARCHIVE_PROJECTS.length > 0) {
    renderArchiveTable();
    return;
  }
  if (typeof CONFIG !== 'undefined' && CONFIG.projects) {
    renderArchiveTable();
    return;
  }
  console.warn('No projects found to render');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  initArchive();
});

// Fallback for if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  console.log('DOM already ready, calling initArchive');
  setTimeout(initArchive, 1);
}

// Additional fallback on window load
window.addEventListener('load', function() {
  console.log('Window load fired');
  initArchive();
});

// Note: Mobile menu and navigation scroll behavior are handled by main.js
// No need to duplicate that code here

// Force render on script load - final fallback
setTimeout(function() {
  console.log('Final fallback: attempting to render archive');
  console.log('ARCHIVE_PROJECTS:', ARCHIVE_PROJECTS);
  console.log('ARCHIVE_PROJECTS length:', ARCHIVE_PROJECTS ? ARCHIVE_PROJECTS.length : 'undefined');
  const tableBody = document.getElementById('archiveTableBody');
  console.log('tableBody element:', tableBody);
  
  if (ARCHIVE_PROJECTS && ARCHIVE_PROJECTS.length > 0 && tableBody) {
    console.log('All conditions met, calling renderArchiveTable');
    renderArchiveTable();
  } else {
    console.error('Conditions not met:', {
      hasProjects: !!ARCHIVE_PROJECTS,
      projectsLength: ARCHIVE_PROJECTS ? ARCHIVE_PROJECTS.length : 0,
      hasTableBody: !!tableBody
    });
  }
}, 500);


