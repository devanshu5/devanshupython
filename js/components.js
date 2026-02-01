/* =========================================
   Dynamic Components (Header/Footer)
   ========================================= */

const Components = {
    header: `
    <div class="header-container">
        <div class="logo">
            <i class="fab fa-python"></i>
            DevanshuPython
        </div>
        <nav>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About</a></li>
                <li><a href="typing-test.html">Typing Test</a></li>
                <li><a href="timetable" target="_blank">Timetable</a></li>
                <li><a href="https://devahelper.blogspot.com" target="_blank">Blog</a></li>
                <li><a href="contact.html">Contact</a></li>
            </ul>
        </nav>
        <div class="hamburger">
            <i class="fas fa-bars"></i>
        </div>
    </div>
    `,

    footer: `
    <div class="footer-container">
        <div class="footer-brand">
            <div class="footer-logo">
                <i class="fas fa-code"></i> DevanshuPython
            </div>
            <p>Your premier destination for mastering Python and coding concepts. Join thousands of students learning effectively.</p>
            <div class="social-icons">
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-github"></i></a>
            </div>
        </div>

        <div class="footer-links">
            <h4 class="footer-heading">Quick Links</h4>
            <ul>
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="contact.html">Contact</a></li>
                <li><a href="timetable" target="_blank">Timetable</a></li>
            </ul>
        </div>

        <div class="footer-links">
            <h4 class="footer-heading">Student Resources</h4>
            <ul>
                <li><a href="typing-test.html">Typing Speed Test</a></li>
                <li><a href="https://devahelper.blogspot.com" target="_blank">DevaHelper Blog</a></li>
                <li><a href="#">Python Cheatsheet</a></li>
                <li><a href="#">Project Ideas</a></li>
            </ul>
        </div>
        
        <div class="footer-links">
            <h4 class="footer-heading">Get in Touch</h4>
            <ul>
                <li><a href="mailto:support@devanshupython.com">support@devanshupython.com</a></li>

                <li><a href="#">New Delhi, India</a></li>
            </ul>
        </div>
    </div>

    <div class="footer-bottom">
        <p>&copy; 2025 DevanshuPython. All rights reserved. | <a href="#" style="color: var(--accent-cyan);">Privacy Policy</a> | <a href="#" style="color: var(--accent-cyan);">Terms of Service</a></p>
    </div>
    `
};

document.addEventListener('DOMContentLoaded', () => {
    // Inject Header
    const headerEl = document.querySelector('.header');
    if (headerEl) {
        headerEl.innerHTML = Components.header;
        setActiveLink();
        initHamburger();
    }

    // Inject Footer
    const footerEl = document.querySelector('.footer');
    if (footerEl) {
        footerEl.innerHTML = Components.footer;
    }
});

// Highlight Current Page
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            // Add a class for styling active state if needed (using inline style for now or CSS class)
            // Existing CSS doesn't have a specific .active class for links, 
            // but we can add color: var(--primary) inline or rely on a new class.
            link.style.color = 'var(--primary)';
        }
    });
}

// Initialize Hamburger Menu
function initHamburger() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle icon
            const icon = hamburger.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}
