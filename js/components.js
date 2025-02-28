/**
 * Components for Sola Technologies website
 * This file contains reusable components that can be included in multiple pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeLayout();
});

/**
 * Initialize the layout by applying common components
 */
function initializeLayout() {
    // Apply components in the correct order
    loadNavbar();
    loadFooter();
    
    // Add cursor elements if they don't exist
    ensureCursorElements();
    
    // Log success message
    console.log('Layout components initialized successfully');
}

/**
 * Loads the navbar component
 */
function loadNavbar() {
    // Get the current page path for highlighting the active link
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Create the navbar HTML
    const navbarHTML = `
    <div class="container mx-auto px-4 py-4">
        <nav class="flex items-center justify-between">
            <div class="flex items-center">
                <a href="index.html" class="flex items-center">
                    <img src="assets/images/logo.svg" alt="Sola Technologies Logo" class="h-10">
                    <span class="ml-3 text-2xl font-bold text-black">Sola</span>
                </a>
            </div>
            <div class="hidden md:flex space-x-8">
                <a href="index.html" class="${pageName === 'index.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} font-medium">Home</a>
                <a href="about.html" class="${pageName === 'about.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} font-medium">About</a>
                <a href="services.html" class="${pageName === 'services.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} font-medium">Services</a>
                <a href="career.html" class="${pageName === 'career.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} font-medium">Careers</a>
                <a href="contact.html" class="${pageName === 'contact.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} font-medium">Contact</a>
            </div>
            <div class="md:hidden">
                <button type="button" class="text-black hover:text-orange-500 focus:outline-none" id="mobile-menu-button">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </nav>
        <div class="md:hidden hidden" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <a href="index.html" class="${pageName === 'index.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} block px-3 py-2 font-medium">Home</a>
                <a href="about.html" class="${pageName === 'about.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} block px-3 py-2 font-medium">About</a>
                <a href="services.html" class="${pageName === 'services.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} block px-3 py-2 font-medium">Services</a>
                <a href="career.html" class="${pageName === 'career.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} block px-3 py-2 font-medium">Careers</a>
                <a href="contact.html" class="${pageName === 'contact.html' ? 'text-orange-500' : 'text-black hover:text-orange-500 transition-colors'} block px-3 py-2 font-medium">Contact</a>
            </div>
        </div>
    </div>
    `;
    
    // Find the header element
    const header = document.querySelector('header');
    
    // Insert the navbar HTML into the header
    if (header) {
        header.innerHTML = navbarHTML;
        
        // Setup mobile menu toggle
        setupMobileMenu();
    } else {
        console.error('Header element not found');
    }
}

/**
 * Setup mobile menu toggle functionality
 */
function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

/**
 * Loads the footer component
 */
function loadFooter() {
    // Create the footer HTML
    const footerHTML = `
    <div class="container mx-auto px-4 py-12">
        <div class="flex flex-col md:flex-row justify-between items-center">
            <div class="mb-6 md:mb-0">
                <a href="index.html" class="flex items-center">
                    <img src="assets/images/logo.svg" alt="Sola Technologies Logo" class="h-8">
                    <span class="ml-3 text-xl font-bold text-black">Sola Technologies</span>
                </a>
                <p class="mt-2 text-sm text-gray-500">Powering Innovation with AI</p>
            </div>
            <div class="flex space-x-6">
                <a href="index.html" class="hover:text-orange-500 transition-colors">Home</a>
                <a href="about.html" class="hover:text-orange-500 transition-colors">About</a>
                <a href="services.html" class="hover:text-orange-500 transition-colors">Services</a>
                <a href="career.html" class="hover:text-orange-500 transition-colors">Careers</a>
                <a href="contact.html" class="hover:text-orange-500 transition-colors">Contact</a>
            </div>
        </div>
        <div class="border-t border-gray-200 mt-8 pt-8 text-sm text-center">
            <p>&copy; 2025 Sola Technologies. All rights reserved.</p>
        </div>
    </div>
    `;
    
    // Find the footer element
    const footer = document.querySelector('footer');
    
    // Insert the footer HTML into the footer
    if (footer) {
        footer.innerHTML = footerHTML;
    } else {
        console.error('Footer element not found');
    }
}

/**
 * Ensure cursor elements exist in the DOM
 */
function ensureCursorElements() {
    // Check if cursor elements already exist
    let cursor = document.querySelector('.custom-cursor');
    let cursorDot = document.querySelector('.custom-cursor-dot');
    
    // If cursor elements don't exist, create them
    if (!cursor) {
        cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        console.log('Custom cursor element created');
    }
    
    if (!cursorDot) {
        cursorDot = document.createElement('div');
        cursorDot.className = 'custom-cursor-dot';
        document.body.appendChild(cursorDot);
        console.log('Custom cursor dot element created');
    }
} 