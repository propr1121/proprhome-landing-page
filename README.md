# ProprHome Landing Page

A modern, responsive landing page for ProprHome - Portugal's next-generation real estate platform that shares success with its users.

## Overview

ProprHome positions itself as "not another portal, but a partner" - a real estate platform that shares success with its users rather than simply charging them for listings. This landing page serves as the primary marketing and user acquisition tool, promoting the Pioneer Program - a one-time €99 lifetime access offer.

## Features

### Target Audiences
- **Real Estate Agents**: AI-powered buyer matching, automated calendar sync, Propr Points rewards
- **Agencies**: CRM integration, real-time analytics, data monetization, team management
- **Buyers & Tenants**: Complete marketplace, AI recommendations, blockchain-verified listings

### Key Differentiators
- Data sharing model - platform grows with users
- Data monetization opportunities
- Complete transparency with no hidden fees
- Blockchain verification for listing authenticity
- AI-powered property matching

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript**: ES6+ features, no dependencies
- **Google Fonts**: Inter typeface

## File Structure

```
proprhome-landing-page-main/
├── index.html           # Main HTML structure
├── styles.css           # All CSS styling and responsive design
├── script.js            # JavaScript for interactivity
├── icons.svg            # SVG sprite for all icons
├── promo-video.mov      # Hero section video
├── pioneer.html         # Pioneer program page
├── pioneer.css          # Pioneer program styles
├── pioneer.js           # Pioneer program JavaScript
├── Union.png            # Union graphic asset
├── Branding/            # Logo and branding assets
├── README.md            # This file
└── SITE_DOCUMENTATION.md # Detailed technical documentation
```

## Getting Started

This is a static website with no build process required.

### Local Development

1. Clone or download the repository
2. Open `index.html` in a web browser
3. For live reloading during development, use any static server:
   ```bash
   # Using Python
   python -m http.server 8000

   # Using Node.js http-server
   npx http-server

   # Using PHP
   php -S localhost:8000
   ```

## Design System

### Color Palette
- **Primary Green**: `#00D188` - CTAs, highlights, brand elements
- **Primary Green Dark**: `#00A86B` - Hover states
- **Text Primary**: `#1F2937` - Main text
- **Background**: `#FFFFFF` - Main background
- **Background Alt**: `#F9FAFB` - Section contrast

### Typography
- **Font**: Inter (Google Fonts)
- **Display**: 40-56px (responsive)
- **H1**: 32-42px (responsive)
- **H2**: 24-32px (responsive)
- **Body**: 16px

### Responsive Breakpoints
- **Desktop**: Default (1200px max-width)
- **Tablet**: ≤1024px
- **Mobile**: ≤768px
- **Small Mobile**: ≤640px

## Key Components

1. **Navigation Bar**: Fixed positioning with scroll effects
2. **Floating Pioneer Pill**: Appears after 800px scroll
3. **Hero Section**: Email capture with promotional video
4. **Tab Interface**: Three user segments with feature grids
5. **Pioneer Program Pricing**: €99 lifetime vs €59/month
6. **Platform Features**: 6-item grid showcasing capabilities
7. **Trust Section**: Blockchain, GDPR, real-time data indicators

## JavaScript Functionality

- Navigation scroll effects
- Mobile menu toggle
- Floating pill visibility
- Tab switching interface
- Email form validation
- Smooth scrolling
- Intersection Observer animations
- Keyboard accessibility (ESC to close menu)
- Reduced motion support

## Performance

- **Lightweight**: ~35KB total (CSS + JS, uncompressed)
- **No dependencies**: Pure vanilla JavaScript
- **SVG sprite system**: Minimal HTTP requests
- **Intersection Observer**: Efficient scroll animations
- **Mobile optimization**: Video hidden on mobile devices

## Accessibility

- Semantic HTML with proper heading hierarchy
- ARIA attributes for tab interface and forms
- Keyboard navigation support
- Custom focus indicators
- `prefers-reduced-motion` support
- Skip link CSS (ready for implementation)

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Opera 75+

## Future Integration Points

### Backend Requirements
- Email capture API
- Payment processing for Pioneer Program
- Analytics tracking (Google Analytics, Mixpanel)
- CRM integration
- User authentication

### Additional Pages
- About page
- Blog
- Careers
- Privacy/Terms/Cookies pages
- Contact form

## Deployment

This static site can be deployed to:
- **Netlify**, **Vercel**, **GitHub Pages** (recommended)
- **Cloudflare Pages**
- **AWS S3 + CloudFront**
- Any static hosting service

### Pre-Launch Optimizations
1. Compress and convert video to efficient formats (WebM, MP4)
2. Minify CSS and JavaScript
3. Add meta tags for social sharing (Open Graph, Twitter Cards)
4. Implement analytics
5. Add favicon
6. Connect backend for email capture
7. Add sitemap.xml and robots.txt
8. Optimize images (WebP, AVIF)

## Documentation

For detailed technical documentation, see [SITE_DOCUMENTATION.md](SITE_DOCUMENTATION.md)

## License

Copyright © 2025 ProprHome. All rights reserved.

## Contact

For questions about the platform or Pioneer Program, visit the landing page or contact through the website.
