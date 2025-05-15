// script.js
document.addEventListener('DOMContentLoaded', () => {
    const mouseElement = document.querySelector('.mouse');
    let scrollTimeout;

    if (mouseElement) {
        window.addEventListener('scroll', () => {
            mouseElement.classList.add('scrolling');

            // Clear the previous timeout to prevent premature removal of the class
            clearTimeout(scrollTimeout);

            // Set a timeout to remove the 'scrolling' class after 300ms of no scrolling
            scrollTimeout = setTimeout(() => {
                mouseElement.classList.remove('scrolling');
            }, 300);
        }, { passive: true }); // Use passive listener for better scroll performance
    } else {
        console.warn("Mouse element with class '.mouse' not found. Scroll animation will not work.");
    }

    // Automatically update the current year in the footer
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});