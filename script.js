/*
 * INTERACTIVITY FOR CHUI TRADERS
 * Author: Your Name (As a Senior Software Engineer)
 * Date: June 2025
 *
 * This script provides functionality for:
 * 1. Mobile Navigation (Hamburger Menu)
 * 2. "Scroll-to-reveal" animations for a modern user experience.
 * 3. A "sticky" header that hides on scroll down and appears on scroll up.
 * 4. Active navigation link highlighting based on scroll position.
 */

// Use a strict mode declaration to catch common coding mistakes.
'use strict';

// Wait for the DOM to be fully loaded before running scripts.
// This is a fundamental best practice to prevent errors from trying to manipulate
// elements that haven't been created yet.
document.addEventListener('DOMContentLoaded', () => {

    /**
     * Mobile Navigation (Hamburger Menu)
     * Toggles the 'active' class on the hamburger menu and the navigation menu
     * to show/hide the menu on smaller screens.
     */
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when a link is clicked.
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    /**
     * "Scroll-to-Reveal" Animation
     * Uses the Intersection Observer API for high-performance scroll animations.
     * This is far more efficient than listening to the 'scroll' event.
     */
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // Configuration for the observer.
    const observerOptions = {
        root: null, // observes intersections relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // Triggers when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting (visible)
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Stop observing the element once it has been animated.
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Attach the observer to each element with the animation class.
    animatedElements.forEach(el => observer.observe(el));


    /**
     * Hide/Show Header on Scroll
     * Provides a better user experience by giving more screen real estate when
     * scrolling down, and making navigation easily accessible when scrolling up.
     */
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', () => {
            if (lastScrollY < window.scrollY && window.scrollY > 100) {
                // If scrolling down and past the initial view, hide header.
                header.style.top = '-80px';
            } else {
                // If scrolling up, show header.
                header.style.top = '0';
            }
            lastScrollY = window.scrollY;
        });
    }


    /**
     * Active Navigation Link Highlighting on Scroll
     * Updates the active class on navigation links as the user scrolls through
     * different sections of the page.
     */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    if(sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                // Subtract a bit from sectionTop to trigger the highlight slightly earlier
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                    currentSectionId = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                // Check if the link's href matches the current section ID
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    }

}); // End of DOMContentLoaded