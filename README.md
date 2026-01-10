# Personal Portfolio Website

A clean, modern portfolio website built with vanilla HTML, CSS, and JavaScript - matching the reference design.

## Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   ├── style.css      # All styles
│   └── fonts.css      # Font imports
├── js/
│   └── main.js        # All JavaScript functionality
├── images/
│   ├── me.jpg         # Your profile photo
│   └── featured/      # Featured project images
└── README.md
```

## Features

- ✅ Single-page design with smooth scrolling
- ✅ Responsive navigation with mobile menu
- ✅ Hero section with animated text reveal
- ✅ About section with skills list
- ✅ Experience section with tabbed interface
- ✅ Featured projects with alternating layout
- ✅ Projects grid with show more/less
- ✅ Contact section
- ✅ Side social links and email
- ✅ ScrollReveal animations
- ✅ Dark theme (navy/green color scheme)
- ✅ Fully responsive design

## Setup

1. **Update Configuration**
   - Open `js/main.js` and update the `CONFIG` object:
     - Your email
     - Social media links
     - Projects data

2. **Add Your Content**
   - Update `index.html` with your personal information:
     - Name in hero section
     - About text
     - Job experiences
     - Featured projects
     - Skills list

3. **Add Images**
   - Place your profile photo at `images/me.jpg`
   - Add featured project images to `images/featured/`
   - Update image paths in HTML if needed

4. **Customize**
   - Update colors in `css/style.css` (CSS variables at the top)
   - Modify fonts in `css/fonts.css`
   - Adjust animations in `js/main.js`

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design works on mobile devices

## Dependencies

- ScrollReveal.js (loaded via CDN in HTML)

## Notes

- All styles match the reference design
- No build step required - just open `index.html` in a browser
- Can be deployed to any static hosting (GitHub Pages, Netlify, Vercel, etc.)

## Customization Guide

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --green: #64ffda;
  --navy: #0a192f;
  /* etc. */
}
```

### Projects
Add projects to the `CONFIG.projects` array in `js/main.js`:
```javascript
projects: [
  {
    title: 'Project Name',
    description: 'Description',
    tech: ['React', 'Node.js'],
    github: 'https://github.com/...',
    external: 'https://project.com',
  },
]
```

### Social Links
Update in `js/main.js`:
```javascript
socialMedia: [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
  },
]
```

