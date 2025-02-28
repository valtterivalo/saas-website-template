/**
 * Debug utilities for Sola Technologies website
 * This file contains debugging tools to help diagnose issues
 */

document.addEventListener('DOMContentLoaded', function() {
    // Check if debug mode is enabled via URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const debugMode = urlParams.get('debug') === 'true';
    
    if (debugMode) {
        console.log('Debug mode enabled');
        initializeDebugTools();
    }
});

/**
 * Initialize debug tools
 */
function initializeDebugTools() {
    // Add debug panel to the page
    createDebugPanel();
    
    // Log page information
    logPageInfo();
    
    // Check for common issues
    checkForCommonIssues();
}

/**
 * Create a debug panel on the page
 */
function createDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.className = 'debug-panel';
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 12px;
        z-index: 10000;
        max-width: 300px;
        max-height: 300px;
        overflow: auto;
    `;
    
    // Add title
    const title = document.createElement('h3');
    title.textContent = 'Debug Panel';
    title.style.margin = '0 0 10px 0';
    debugPanel.appendChild(title);
    
    // Add content container
    const content = document.createElement('div');
    content.id = 'debug-content';
    debugPanel.appendChild(content);
    
    // Add buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '10px';
    
    // Test jobs button
    const testJobsButton = document.createElement('button');
    testJobsButton.textContent = 'Test Jobs API';
    testJobsButton.style.marginRight = '5px';
    testJobsButton.style.padding = '3px 5px';
    testJobsButton.addEventListener('click', testJobsApi);
    buttonContainer.appendChild(testJobsButton);
    
    // Close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.padding = '3px 5px';
    closeButton.addEventListener('click', () => debugPanel.remove());
    buttonContainer.appendChild(closeButton);
    
    debugPanel.appendChild(buttonContainer);
    
    // Add to body
    document.body.appendChild(debugPanel);
    
    console.log('Debug panel created');
}

/**
 * Log page information to the debug panel
 */
function logPageInfo() {
    const content = document.getElementById('debug-content');
    if (!content) return;
    
    const pageInfo = document.createElement('div');
    pageInfo.innerHTML = `
        <p><strong>Page:</strong> ${window.location.pathname.split('/').pop() || 'index.html'}</p>
        <p><strong>Scripts Loaded:</strong></p>
        <ul style="margin: 0; padding-left: 20px;">
            ${Array.from(document.scripts).map(script => {
                const src = script.src.split('/').pop();
                return src ? `<li>${src}</li>` : '';
            }).filter(Boolean).join('')}
        </ul>
    `;
    
    content.appendChild(pageInfo);
}

/**
 * Check for common issues
 */
function checkForCommonIssues() {
    const content = document.getElementById('debug-content');
    if (!content) return;
    
    const issues = [];
    
    // Check for cursor elements
    if (!document.querySelector('.custom-cursor') || !document.querySelector('.custom-cursor-dot')) {
        issues.push('Custom cursor elements missing');
    }
    
    // Check for particles container
    if (!document.getElementById('particles-js')) {
        issues.push('Particles container missing');
    }
    
    // Check for job listings container on career page
    if (window.location.pathname.includes('career') && !document.querySelector('.job-listings')) {
        issues.push('Job listings container missing');
    }
    
    // Display issues
    const issuesElement = document.createElement('div');
    issuesElement.innerHTML = `
        <p><strong>Issues Found:</strong></p>
        ${issues.length > 0 
            ? `<ul style="margin: 0; padding-left: 20px; color: #ff6b6b;">
                ${issues.map(issue => `<li>${issue}</li>`).join('')}
               </ul>`
            : '<p style="color: #6bff6b;">No issues found</p>'}
    `;
    
    content.appendChild(issuesElement);
}

/**
 * Test the jobs API
 */
async function testJobsApi() {
    const content = document.getElementById('debug-content');
    if (!content) return;
    
    const resultElement = document.createElement('div');
    resultElement.innerHTML = '<p><strong>Testing Jobs API...</strong></p>';
    content.appendChild(resultElement);
    
    try {
        const response = await fetch('js/jobs.json');
        
        if (!response.ok) {
            throw new Error(`Failed to load job listings: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        resultElement.innerHTML += `
            <p style="color: #6bff6b;">Jobs API response successful</p>
            <p>Jobs found: ${data.jobs ? data.jobs.length : 0}</p>
            ${data.jobs && data.jobs.length > 0 
                ? `<p>First job: ${data.jobs[0].title}</p>` 
                : '<p>No jobs in response</p>'}
        `;
    } catch (error) {
        resultElement.innerHTML += `
            <p style="color: #ff6b6b;">Error: ${error.message}</p>
        `;
    }
} 