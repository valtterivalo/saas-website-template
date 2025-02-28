/**
 * Careers page functionality for Sola Technologies website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize careers page functionality
    loadJobListings();
    setupJobFilters();
    setupJobSearch();
});

/**
 * Load job listings from the JSON file
 */
async function loadJobListings() {
    try {
        console.log('Attempting to load job listings...');
        const response = await fetch('js/jobs.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load job listings: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Job data loaded successfully:', data);
        
        if (data && data.jobs && data.jobs.length > 0) {
            displayJobListings(data.jobs);
        } else {
            console.warn('No job listings found in the data');
            displayNoJobsMessage();
        }
    } catch (error) {
        console.error('Error loading job listings:', error);
        displayErrorMessage();
    }
}

/**
 * Display job listings in the DOM
 * @param {Array} jobs - Array of job objects
 */
function displayJobListings(jobs) {
    const jobListingsContainer = document.querySelector('.job-listings');
    
    if (!jobListingsContainer) {
        console.error('Job listings container not found');
        return;
    }
    
    // Clear any existing content
    jobListingsContainer.innerHTML = '';
    
    // Create filter options
    const departments = [...new Set(jobs.map(job => job.department))];
    const locations = [...new Set(jobs.map(job => job.location))];
    
    // Create filter section
    const filterSection = document.createElement('div');
    filterSection.className = 'mb-8 flex flex-col md:flex-row justify-between items-start md:items-center';
    
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'w-full md:w-1/3 mb-4 md:mb-0';
    searchContainer.innerHTML = `
        <div class="relative">
            <input type="text" id="job-search" placeholder="Search jobs..." class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
            <svg class="absolute right-3 top-2.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        </div>
    `;
    
    // Create filter dropdowns
    const filtersContainer = document.createElement('div');
    filtersContainer.className = 'flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full md:w-auto';
    
    // Department filter
    const departmentFilter = document.createElement('div');
    departmentFilter.className = 'w-full sm:w-auto';
    departmentFilter.innerHTML = `
        <select id="department-filter" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">All Departments</option>
            ${departments.map(dept => `<option value="${dept}">${dept}</option>`).join('')}
        </select>
    `;
    
    // Location filter
    const locationFilter = document.createElement('div');
    locationFilter.className = 'w-full sm:w-auto';
    locationFilter.innerHTML = `
        <select id="location-filter" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500">
            <option value="">All Locations</option>
            ${locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
        </select>
    `;
    
    filtersContainer.appendChild(departmentFilter);
    filtersContainer.appendChild(locationFilter);
    
    filterSection.appendChild(searchContainer);
    filterSection.appendChild(filtersContainer);
    
    // Create job listing section
    const jobsSection = document.createElement('div');
    jobsSection.className = 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
    // Add jobs to the grid
    jobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsSection.appendChild(jobCard);
    });
    
    // Add both sections to the container
    jobListingsContainer.appendChild(filterSection);
    jobListingsContainer.appendChild(jobsSection);
    
    // Setup event listeners for filters
    setupJobFilters();
    setupJobSearch();
    
    // Make sure job cards are visible with proper styling
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        card.style.display = 'block';
        card.style.visibility = 'visible';
        card.style.opacity = '1';
    });
}

/**
 * Create a job card element
 * @param {Object} job - Job object
 * @returns {HTMLElement} - Job card element
 */
function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 reveal';
    jobCard.setAttribute('data-job-id', job.id);
    jobCard.setAttribute('data-department', job.department);
    jobCard.setAttribute('data-location', job.location);
    // Ensure the card is visible
    jobCard.style.display = 'block';
    jobCard.style.visibility = 'visible';
    jobCard.style.opacity = '1';
    
    jobCard.innerHTML = `
        <div class="p-6">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <h3 class="text-xl font-bold text-black">${job.title}</h3>
                <div class="mt-2 md:mt-0 flex items-center">
                    <span class="inline-block bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full mr-2">${job.department}</span>
                    <span class="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">${job.type}</span>
                </div>
            </div>
            <div class="mb-4">
                <div class="flex items-center text-gray-600 mb-2">
                    <svg class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>${job.location}</span>
                </div>
                <p class="text-gray-700">${job.description}</p>
            </div>
            <button class="view-job-details w-full py-2 bg-white border border-orange-500 text-orange-500 rounded-md hover:bg-orange-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                View Details
            </button>
        </div>
    `;
    
    // Add event listener to the button
    jobCard.querySelector('.view-job-details').addEventListener('click', () => {
        showJobDetails(job);
    });
    
    return jobCard;
}

/**
 * Show job details in a modal
 * @param {Object} job - Job object
 */
function showJobDetails(job) {
    // Create modal backdrop
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4';
    modalBackdrop.id = 'job-modal';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-90vh overflow-y-auto';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'flex justify-between items-start p-6 border-b border-gray-200';
    modalHeader.innerHTML = `
        <div>
            <h2 class="text-2xl font-bold text-black">${job.title}</h2>
            <div class="mt-2 flex flex-wrap gap-2">
                <span class="inline-block bg-orange-100 text-orange-800 text-sm px-3 py-1 rounded-full">${job.department}</span>
                <span class="inline-block bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">${job.location}</span>
                <span class="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">${job.type}</span>
            </div>
        </div>
        <button class="close-modal text-gray-400 hover:text-gray-500 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    `;
    
    // Create modal body
    const modalBody = document.createElement('div');
    modalBody.className = 'p-6';
    
    // Job description
    const descriptionSection = document.createElement('div');
    descriptionSection.className = 'mb-8';
    descriptionSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Overview</h3>
        <p class="text-gray-700">${job.description}</p>
    `;
    
    // Responsibilities
    const responsibilitiesSection = document.createElement('div');
    responsibilitiesSection.className = 'mb-8';
    responsibilitiesSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Responsibilities</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
            ${job.responsibilities.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Requirements
    const requirementsSection = document.createElement('div');
    requirementsSection.className = 'mb-8';
    requirementsSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Requirements</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
            ${job.requirements.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Preferred qualifications
    const preferredSection = document.createElement('div');
    preferredSection.className = 'mb-8';
    preferredSection.innerHTML = `
        <h3 class="text-xl font-bold mb-4">Preferred Qualifications</h3>
        <ul class="list-disc pl-5 space-y-2 text-gray-700">
            ${job.preferred.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Apply section
    const applySection = document.createElement('div');
    applySection.className = 'mt-8 pt-6 border-t border-gray-200';
    applySection.innerHTML = `
        <h3 class="text-xl font-bold mb-4">How to Apply</h3>
        <p class="text-gray-700 mb-6">Ready to join our team? Submit your application by clicking the button below.</p>
        <a href="contact.html?job=${job.id}" class="inline-block px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
            Apply for this Position
        </a>
    `;
    
    // Append sections to modal body
    modalBody.appendChild(descriptionSection);
    modalBody.appendChild(responsibilitiesSection);
    modalBody.appendChild(requirementsSection);
    modalBody.appendChild(preferredSection);
    modalBody.appendChild(applySection);
    
    // Append header and body to modal content
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    
    // Append modal content to backdrop
    modalBackdrop.appendChild(modalContent);
    
    // Append modal to body
    document.body.appendChild(modalBackdrop);
    
    // Add event listener to close button
    modalBackdrop.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modalBackdrop);
    });
    
    // Close modal when clicking outside
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            document.body.removeChild(modalBackdrop);
        }
    });
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    
    // Restore scrolling when modal is closed
    const restoreScrolling = () => {
        document.body.style.overflow = '';
    };
    
    modalBackdrop.querySelector('.close-modal').addEventListener('click', restoreScrolling);
    modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) {
            restoreScrolling();
        }
    });
}

/**
 * Display error message when job listings cannot be loaded
 */
function displayErrorMessage() {
    const jobListingsContainer = document.querySelector('.job-listings');
    
    if (!jobListingsContainer) {
        return;
    }
    
    jobListingsContainer.innerHTML = `
        <div class="text-center py-12">
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 class="mt-2 text-xl font-medium text-gray-900">Unable to load job listings</h3>
            <p class="mt-1 text-gray-500">Please try again later or contact us for assistance.</p>
            <div class="mt-6">
                <a href="contact.html" class="btn-primary">Contact Us</a>
            </div>
        </div>
    `;
}

/**
 * Display a message when no jobs are found
 */
function displayNoJobsMessage() {
    const jobListingsContainer = document.querySelector('.job-listings');
    
    if (jobListingsContainer) {
        jobListingsContainer.innerHTML = `
            <div class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 class="text-xl font-bold mb-2">No Open Positions</h3>
                <p class="text-gray-600 mb-6">We don't have any open positions at the moment. Please check back later or contact us directly.</p>
                <a href="contact.html" class="btn-accent">Contact Us</a>
            </div>
        `;
    }
}

/**
 * Set up job filters functionality
 */
function setupJobFilters() {
    // We'll add event listeners after the job listings are loaded
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'department-filter' || e.target.id === 'location-filter') {
            filterJobs();
        }
    });
    
    document.addEventListener('change', function(e) {
        if (e.target && e.target.id === 'department-filter' || e.target.id === 'location-filter') {
            filterJobs();
        }
    });
}

/**
 * Set up job search functionality
 */
function setupJobSearch() {
    document.addEventListener('input', function(e) {
        if (e.target && e.target.id === 'job-search') {
            filterJobs();
        }
    });
}

/**
 * Filter jobs based on search input and filter selections
 */
function filterJobs() {
    const jobCardsContainer = document.querySelector('.job-cards');
    
    if (!jobCardsContainer) {
        return;
    }
    
    const jobs = JSON.parse(jobCardsContainer.getAttribute('data-jobs'));
    const searchInput = document.getElementById('job-search');
    const departmentFilter = document.getElementById('department-filter');
    const locationFilter = document.getElementById('location-filter');
    
    if (!searchInput || !departmentFilter || !locationFilter) {
        return;
    }
    
    const searchTerm = searchInput.value.toLowerCase();
    const selectedDepartment = departmentFilter.value;
    const selectedLocation = locationFilter.value;
    
    // Filter jobs
    const filteredJobs = jobs.filter(job => {
        // Search term filter
        const matchesSearch = 
            job.title.toLowerCase().includes(searchTerm) || 
            job.description.toLowerCase().includes(searchTerm) ||
            job.department.toLowerCase().includes(searchTerm) ||
            job.location.toLowerCase().includes(searchTerm);
        
        // Department filter
        const matchesDepartment = !selectedDepartment || job.department === selectedDepartment;
        
        // Location filter
        const matchesLocation = !selectedLocation || job.location === selectedLocation;
        
        return matchesSearch && matchesDepartment && matchesLocation;
    });
    
    // Clear existing job cards
    jobCardsContainer.innerHTML = '';
    
    // Display filtered jobs
    if (filteredJobs.length === 0) {
        const noResultsMessage = document.createElement('div');
        noResultsMessage.className = 'text-center py-12';
        noResultsMessage.innerHTML = `
            <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="mt-2 text-xl font-medium text-gray-900">No matching jobs found</h3>
            <p class="mt-1 text-gray-500">Try adjusting your search or filters.</p>
        `;
        jobCardsContainer.appendChild(noResultsMessage);
    } else {
        filteredJobs.forEach(job => {
            const jobCard = createJobCard(job);
            jobCardsContainer.appendChild(jobCard);
        });
    }
} 