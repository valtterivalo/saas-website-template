/**
 * Common functionality for all pages of the Sola Technologies website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize common functionality
    setupNavbarHighlighting();
});

/**
 * Highlights the current page in the navigation
 */
function setupNavbarHighlighting() {
    // Get the current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('header a');
    
    // Highlight the current page in the navigation
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === pageName) {
            link.classList.add('text-orange-500');
            link.classList.remove('text-black', 'hover:text-orange-500');
        } else {
            link.classList.remove('text-orange-500');
            if (!link.classList.contains('text-black')) {
                link.classList.add('text-black', 'hover:text-orange-500');
            }
        }
    });
} 