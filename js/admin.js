/**
 * Admin functionality for Sola Technologies website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin functionality
    loadJobListings();
    setupEventListeners();
});

/**
 * Load job listings from the JSON file
 */
async function loadJobListings() {
    try {
        const response = await fetch('js/jobs.json');
        if (!response.ok) {
            throw new Error('Failed to load job listings');
        }
        
        const data = await response.json();
        displayJobListings(data.jobs);
    } catch (error) {
        console.error('Error loading job listings:', error);
        displayErrorMessage();
    }
}

/**
 * Display job listings in the table
 * @param {Array} jobs - Array of job objects
 */
function displayJobListings(jobs) {
    const tableBody = document.getElementById('job-listings-table');
    
    if (!tableBody) {
        console.error('Job listings table not found');
        return;
    }
    
    // Clear any existing content
    tableBody.innerHTML = '';
    
    // Create table rows
    jobs.forEach(job => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-200 hover:bg-gray-50';
        row.setAttribute('data-job-id', job.id);
        
        row.innerHTML = `
            <td class="py-4 px-6 text-left whitespace-nowrap">
                <div class="font-medium">${job.title}</div>
            </td>
            <td class="py-4 px-6 text-left whitespace-nowrap">
                ${job.department}
            </td>
            <td class="py-4 px-6 text-left whitespace-nowrap">
                ${job.location}
            </td>
            <td class="py-4 px-6 text-left whitespace-nowrap">
                ${job.type}
            </td>
            <td class="py-4 px-6 text-center whitespace-nowrap">
                <div class="flex justify-center space-x-2">
                    <button class="edit-job text-blue-500 hover:text-blue-700" data-job-id="${job.id}">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                    <button class="delete-job text-red-500 hover:text-red-700" data-job-id="${job.id}">
                        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

/**
 * Display error message when job listings cannot be loaded
 */
function displayErrorMessage() {
    const tableBody = document.getElementById('job-listings-table');
    
    if (!tableBody) {
        return;
    }
    
    tableBody.innerHTML = `
        <tr>
            <td colspan="5" class="py-8 text-center">
                <div class="text-red-500">
                    <svg class="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h3 class="mt-2 text-xl font-medium">Unable to load job listings</h3>
                    <p class="mt-1">Please try refreshing the page or check the console for errors.</p>
                </div>
            </td>
        </tr>
    `;
}

/**
 * Set up event listeners for the admin interface
 */
function setupEventListeners() {
    // Add job button
    const addJobBtn = document.getElementById('add-job-btn');
    if (addJobBtn) {
        addJobBtn.addEventListener('click', () => {
            openJobModal();
        });
    }
    
    // Close modal buttons
    const closeModalButtons = document.querySelectorAll('.close-modal');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeJobModal();
        });
    });
    
    // Close delete modal buttons
    const closeDeleteModalButtons = document.querySelectorAll('.close-delete-modal');
    closeDeleteModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeDeleteModal();
        });
    });
    
    // Add item buttons
    document.getElementById('add-responsibility').addEventListener('click', () => {
        addListItem('responsibilities-container');
    });
    
    document.getElementById('add-requirement').addEventListener('click', () => {
        addListItem('requirements-container');
    });
    
    document.getElementById('add-preferred').addEventListener('click', () => {
        addListItem('preferred-container');
    });
    
    // Remove item buttons (delegated event)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('.remove-item')) {
            const button = e.target.closest('.remove-item');
            const container = button.closest('div');
            const parentContainer = container.parentNode;
            
            // Don't remove if it's the only item
            if (parentContainer.children.length > 1) {
                parentContainer.removeChild(container);
            }
        }
    });
    
    // Edit job buttons (delegated event)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('.edit-job')) {
            const button = e.target.closest('.edit-job');
            const jobId = button.getAttribute('data-job-id');
            editJob(jobId);
        }
    });
    
    // Delete job buttons (delegated event)
    document.addEventListener('click', function(e) {
        if (e.target && e.target.closest('.delete-job')) {
            const button = e.target.closest('.delete-job');
            const jobId = button.getAttribute('data-job-id');
            openDeleteModal(jobId);
        }
    });
    
    // Job form submission
    const jobForm = document.getElementById('job-form');
    if (jobForm) {
        jobForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveJob();
        });
    }
    
    // Confirm delete button
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', function() {
            deleteJob();
        });
    }
}

/**
 * Add a new list item to a container
 * @param {string} containerId - ID of the container to add the item to
 */
function addListItem(containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        return;
    }
    
    const newItem = document.createElement('div');
    newItem.className = 'flex items-center';
    
    // Determine the input name based on the container
    let inputName = 'items[]';
    if (containerId === 'responsibilities-container') {
        inputName = 'responsibilities[]';
    } else if (containerId === 'requirements-container') {
        inputName = 'requirements[]';
    } else if (containerId === 'preferred-container') {
        inputName = 'preferred[]';
    }
    
    newItem.innerHTML = `
        <input type="text" name="${inputName}" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
        <button type="button" class="remove-item ml-2 text-red-500 hover:text-red-700">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
    `;
    
    container.appendChild(newItem);
}

/**
 * Open the job modal for adding a new job
 */
function openJobModal() {
    const modal = document.getElementById('job-form-modal');
    const modalTitle = document.getElementById('modal-title');
    const form = document.getElementById('job-form');
    
    if (!modal || !modalTitle || !form) {
        return;
    }
    
    // Reset the form
    form.reset();
    document.getElementById('job-id').value = '';
    
    // Reset list containers to have one item each
    resetListContainer('responsibilities-container');
    resetListContainer('requirements-container');
    resetListContainer('preferred-container');
    
    // Update modal title
    modalTitle.textContent = 'Add New Job';
    
    // Show the modal
    modal.classList.remove('hidden');
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
}

/**
 * Close the job modal
 */
function closeJobModal() {
    const modal = document.getElementById('job-form-modal');
    
    if (!modal) {
        return;
    }
    
    // Hide the modal
    modal.classList.add('hidden');
    
    // Restore scrolling on body
    document.body.style.overflow = '';
}

/**
 * Open the delete confirmation modal
 * @param {string} jobId - ID of the job to delete
 */
function openDeleteModal(jobId) {
    const modal = document.getElementById('delete-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    
    if (!modal || !confirmDeleteBtn) {
        return;
    }
    
    // Set the job ID on the confirm button
    confirmDeleteBtn.setAttribute('data-job-id', jobId);
    
    // Show the modal
    modal.classList.remove('hidden');
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
}

/**
 * Close the delete confirmation modal
 */
function closeDeleteModal() {
    const modal = document.getElementById('delete-modal');
    
    if (!modal) {
        return;
    }
    
    // Hide the modal
    modal.classList.add('hidden');
    
    // Restore scrolling on body
    document.body.style.overflow = '';
}

/**
 * Reset a list container to have one empty item
 * @param {string} containerId - ID of the container to reset
 */
function resetListContainer(containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        return;
    }
    
    // Clear the container
    container.innerHTML = '';
    
    // Add one empty item
    addListItem(containerId);
}

/**
 * Edit a job
 * @param {string} jobId - ID of the job to edit
 */
async function editJob(jobId) {
    try {
        const response = await fetch('js/jobs.json');
        if (!response.ok) {
            throw new Error('Failed to load job data');
        }
        
        const data = await response.json();
        const job = data.jobs.find(j => j.id === jobId);
        
        if (!job) {
            throw new Error('Job not found');
        }
        
        // Open the modal
        const modal = document.getElementById('job-form-modal');
        const modalTitle = document.getElementById('modal-title');
        
        if (!modal || !modalTitle) {
            return;
        }
        
        // Update modal title
        modalTitle.textContent = 'Edit Job';
        
        // Fill the form with job data
        document.getElementById('job-id').value = job.id;
        document.getElementById('job-title').value = job.title;
        document.getElementById('job-department').value = job.department;
        document.getElementById('job-location').value = job.location;
        document.getElementById('job-type').value = job.type;
        document.getElementById('job-description').value = job.description;
        
        // Fill responsibilities
        const responsibilitiesContainer = document.getElementById('responsibilities-container');
        responsibilitiesContainer.innerHTML = '';
        job.responsibilities.forEach(responsibility => {
            const item = document.createElement('div');
            item.className = 'flex items-center';
            item.innerHTML = `
                <input type="text" name="responsibilities[]" value="${responsibility}" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                <button type="button" class="remove-item ml-2 text-red-500 hover:text-red-700">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;
            responsibilitiesContainer.appendChild(item);
        });
        
        // Fill requirements
        const requirementsContainer = document.getElementById('requirements-container');
        requirementsContainer.innerHTML = '';
        job.requirements.forEach(requirement => {
            const item = document.createElement('div');
            item.className = 'flex items-center';
            item.innerHTML = `
                <input type="text" name="requirements[]" value="${requirement}" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                <button type="button" class="remove-item ml-2 text-red-500 hover:text-red-700">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;
            requirementsContainer.appendChild(item);
        });
        
        // Fill preferred qualifications
        const preferredContainer = document.getElementById('preferred-container');
        preferredContainer.innerHTML = '';
        job.preferred.forEach(preferred => {
            const item = document.createElement('div');
            item.className = 'flex items-center';
            item.innerHTML = `
                <input type="text" name="preferred[]" value="${preferred}" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500" required>
                <button type="button" class="remove-item ml-2 text-red-500 hover:text-red-700">
                    <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;
            preferredContainer.appendChild(item);
        });
        
        // Show the modal
        modal.classList.remove('hidden');
        
        // Prevent scrolling on body
        document.body.style.overflow = 'hidden';
    } catch (error) {
        console.error('Error editing job:', error);
        alert('Failed to load job data. Please try again.');
    }
}

/**
 * Save a job (add or update)
 */
async function saveJob() {
    try {
        // Get form data
        const jobId = document.getElementById('job-id').value;
        const jobTitle = document.getElementById('job-title').value;
        const jobDepartment = document.getElementById('job-department').value;
        const jobLocation = document.getElementById('job-location').value;
        const jobType = document.getElementById('job-type').value;
        const jobDescription = document.getElementById('job-description').value;
        
        // Get responsibilities
        const responsibilityInputs = document.querySelectorAll('input[name="responsibilities[]"]');
        const responsibilities = Array.from(responsibilityInputs).map(input => input.value);
        
        // Get requirements
        const requirementInputs = document.querySelectorAll('input[name="requirements[]"]');
        const requirements = Array.from(requirementInputs).map(input => input.value);
        
        // Get preferred qualifications
        const preferredInputs = document.querySelectorAll('input[name="preferred[]"]');
        const preferred = Array.from(preferredInputs).map(input => input.value);
        
        // Load existing jobs
        const response = await fetch('js/jobs.json');
        if (!response.ok) {
            throw new Error('Failed to load job data');
        }
        
        const data = await response.json();
        let jobs = data.jobs;
        
        // Create new job object
        const newJob = {
            id: jobId || generateJobId(jobTitle),
            title: jobTitle,
            department: jobDepartment,
            location: jobLocation,
            type: jobType,
            description: jobDescription,
            responsibilities: responsibilities,
            requirements: requirements,
            preferred: preferred
        };
        
        // Update or add the job
        if (jobId) {
            // Update existing job
            const index = jobs.findIndex(job => job.id === jobId);
            if (index !== -1) {
                jobs[index] = newJob;
            } else {
                jobs.push(newJob);
            }
        } else {
            // Add new job
            jobs.push(newJob);
        }
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just update the UI
        displayJobListings(jobs);
        
        // Close the modal
        closeJobModal();
        
        // Show success message
        alert(`Job ${jobId ? 'updated' : 'added'} successfully!`);
        
        // Note: In a real application, you would save the updated jobs to the server
        console.log('Updated jobs:', jobs);
        console.log('In a real application, this would be saved to the server.');
    } catch (error) {
        console.error('Error saving job:', error);
        alert('Failed to save job. Please try again.');
    }
}

/**
 * Delete a job
 */
async function deleteJob() {
    try {
        const confirmDeleteBtn = document.getElementById('confirm-delete');
        const jobId = confirmDeleteBtn.getAttribute('data-job-id');
        
        if (!jobId) {
            throw new Error('Job ID not found');
        }
        
        // Load existing jobs
        const response = await fetch('js/jobs.json');
        if (!response.ok) {
            throw new Error('Failed to load job data');
        }
        
        const data = await response.json();
        let jobs = data.jobs;
        
        // Remove the job
        jobs = jobs.filter(job => job.id !== jobId);
        
        // In a real application, you would send this data to a server
        // For this demo, we'll just update the UI
        displayJobListings(jobs);
        
        // Close the modal
        closeDeleteModal();
        
        // Show success message
        alert('Job deleted successfully!');
        
        // Note: In a real application, you would save the updated jobs to the server
        console.log('Updated jobs:', jobs);
        console.log('In a real application, this would be saved to the server.');
    } catch (error) {
        console.error('Error deleting job:', error);
        alert('Failed to delete job. Please try again.');
    }
}

/**
 * Generate a job ID from the job title
 * @param {string} title - Job title
 * @returns {string} - Generated job ID
 */
function generateJobId(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
} 