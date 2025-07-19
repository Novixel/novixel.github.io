// JavaScript for interactive elements and enhanced user experience

/**
 * Handles the opening and closing of the mobile navigation menu.
 * Toggles a CSS class to show/hide the menu and animate the hamburger icon.
 */
function setupMobileNavigation() {
    // Get references to the navigation toggle button and the navigation links list
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Add an event listener to the toggle button for 'click' events
    navToggle.addEventListener('click', function() {
        // Toggle the 'nav-open' class on the navLinks list.
        // This class will control the visibility and animation of the menu via CSS.
        navLinks.classList.toggle('nav-open');
        // Toggle the 'open' class on the navToggle button.
        // This class will animate the hamburger icon into a close (X) icon via CSS.
        navToggle.classList.toggle('open');
    });

    // Close the mobile menu when a navigation link is clicked
    // This is important for single-page layouts where links scroll to sections
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            // Remove the 'nav-open' class to hide the menu
            navLinks.classList.remove('nav-open');
            // Remove the 'open' class to revert the hamburger icon
            navToggle.classList.remove('open');
        });
    });
}

/**
 * Handles the submission of the contact form.
 * Prevents default form submission and simulates an AJAX request.
 * In a real application, this would send data to a server.
 */
function handleContactFormSubmission() {
    // Get a reference to the contact form and the message display area
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Add an event listener for the 'submit' event on the form
    contactForm.addEventListener('submit', function(event) {
        // Prevent the default form submission behavior (which would reload the page)
        event.preventDefault();

        // Simulate a form submission process
        // In a real scenario, you would collect form data (e.g., using new FormData(contactForm)),
        // then use `fetch()` or `XMLHttpRequest` to send it to a backend server.

        // Display a "sending" message to the user
        formMessage.style.display = 'block';
        formMessage.className = 'form-message'; // Reset classes
        formMessage.textContent = 'Sending your message...';

        // Simulate a network request delay
        setTimeout(function() {
            // After the simulated delay, assume success for this example
            const success = true; // In a real app, this would be based on server response

            if (success) {
                formMessage.classList.add('success');
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
                contactForm.reset(); // Clear the form fields on success
            } else {
                formMessage.classList.add('error');
                formMessage.textContent = 'Oops! Something went wrong. Please try again or call us directly.';
            }

            // Optionally hide the message after a few seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 8000); // Hide after 8 seconds
        }, 2000); // Simulate 2-second delay for server response
    });
}

/**
 * Manages the dark mode functionality, including user preference and persistence.
 * It checks localStorage for a saved theme, otherwise respects the OS preference.
 */
function setupDarkModeToggle() {
    const toggleButton = document.querySelector('.dark-mode-toggle');
    if (!toggleButton) return; // Exit if the button isn't on the page

    const body = document.body;
    const icon = toggleButton.querySelector('i');

    // Function to apply the selected theme
    const applyTheme = (isDark) => {
        body.classList.toggle('dark-mode', isDark);
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Event listener for the toggle button
    toggleButton.addEventListener('click', () => {
        const isCurrentlyDark = body.classList.contains('dark-mode');
        applyTheme(!isCurrentlyDark);
    });

    // Initialize theme on page load
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        applyTheme(true);
    } else {
        // Default to light theme if no preference is saved or detected
        applyTheme(false);
    }
}

/**
 * Initializes all necessary JavaScript functions once the DOM is fully loaded.
 * This ensures that all HTML elements are available before the script tries to interact with them.
 */
document.addEventListener('DOMContentLoaded', function() {
    setupMobileNavigation();       // Set up the mobile navigation menu functionality
    // handleContactFormSubmission(); // Set up the contact form submission logic
    setupDarkModeToggle();         // Set up the dark mode toggle functionality
    // Potentially add more functions here, e.g., for testimonial carousels,
    // smooth scrolling animations, lazy loading images, etc.
});