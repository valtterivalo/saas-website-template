# Modern AI & SaaS Website

A modern, responsive website for a fictional AI and SaaS company, featuring a clean design, interactive UI elements, and optimized performance.

## 🚀 Features

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Modern UI/UX**: Clean, minimalist design with subtle animations and interactions
- **Interactive Elements**: 
  - Custom cursor effects
  - Hover animations on cards and buttons
  - Parallax-like effects
  - Shine animations on buttons
  - Scroll reveal animations
- **Multiple Page Templates**:
  - Home page with hero section and service highlights
  - About page with company story and team information
  - Services page with detailed offerings
  - Careers page with job listings
  - Contact page with form submission
- **Performance Optimized**: Fast loading with minimal dependencies
- **Accessibility Focused**: Semantic HTML and proper contrast ratios

## 🛠️ Tech Stack

- **HTML5**: Semantic markup for better accessibility and SEO
- **CSS3**: 
  - Custom properties for theming
  - Flexbox and Grid layouts
  - Advanced animations and transitions
  - Media queries for responsive design
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **JavaScript**: 
  - Vanilla JS without frameworks
  - Custom component system
  - Interactive UI elements
  - Form validation
- **particles.js**: For background particle effects
- **SVG**: Custom SVG logo and graphics

## 📋 Getting Started

### Prerequisites

- Any modern web browser
- Basic knowledge of HTML, CSS, and JavaScript
- A code editor (VSCode, Sublime Text, etc.)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/valtterivalo/modern-ai-saas-website.git
   ```

2. Navigate to the project directory:
   ```bash
   cd modern-ai-saas-website
   ```

3. Open the project in your preferred code editor.

4. To view the website, simply open `index.html` in a web browser or use a local development server.

### Using a Local Development Server

For the best development experience, use a local development server:

**With Python:**
```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```

**With Node.js:**
```bash
# Install serve globally
npm install -g serve

# Start server
serve
```

Then navigate to `http://localhost:8000` or the URL provided in your terminal.

## 🧩 Project Structure

```
/
├── assets/
│   └── images/
│       ├── logo.svg
│       └── ...
├── css/
│   └── style.css
├── js/
│   ├── common.js
│   ├── components.js
│   ├── main.js
│   └── ...
├── index.html
├── about.html
├── services.html
├── career.html
├── contact.html
└── README.md
```

## 🧑‍💻 Development

### Styling

The website uses a combination of Tailwind CSS utility classes and custom CSS in `css/style.css`. The custom CSS includes:

- Variables for theming
- Button styles
- Animation definitions
- Custom components
- Interactive elements

### JavaScript Components

The website uses a modular JavaScript approach:

- `components.js`: Contains reusable UI components
- `common.js`: Contains shared utilities and functions
- `main.js`: Main script for page-specific functionality

### Adding New Pages

To add a new page:

1. Copy the structure from an existing HTML file
2. Update the page title, meta description, and content
3. Ensure the navigation highlights the correct active page

## 📝 Customization

### Changing Colors

Update the CSS variables in `css/style.css`:

```css
:root {
    --primary-color: #000000;
    --secondary-color: #ffffff;
    --accent-color: #F97316;
    --cream-color: #f8f5f0;
    --light-gray: #f3f4f6;
    --text-color: #000000;
}
```

### Modifying the Logo

The logo is an SVG file located at `assets/images/logo.svg`. You can edit this file with any SVG editor.

### Adding New Sections

To add a new section to a page:

1. Create a new section element with appropriate classes
2. Follow the existing pattern for responsive design
3. Add any required JavaScript functionality

## 📱 Responsive Design

The website is built with a mobile-first approach and includes:

- Flexible layouts using CSS Grid and Flexbox
- Responsive typography
- Appropriate spacing for different device sizes
- A mobile navigation menu for smaller screens

## 🔍 SEO Considerations

- Semantic HTML structure
- Proper heading hierarchy
- Meta tags for title and description
- Responsive design (mobile-friendly)
- Fast loading times

## 📈 Future Enhancements

Potential enhancements for the future:

- Dark mode toggle
- Newsletter subscription form
- Blog section
- Advanced filtering for job listings
- Integration with a headless CMS
- Additional animations and interactive elements

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/)
- [particles.js](https://vincentgarreau.com/particles.js/)
- [Unsplash](https://unsplash.com/) for placeholder images
- [Google Fonts](https://fonts.google.com/) for the Inter font family 
