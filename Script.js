// ===================================
// Mobile Menu Toggle
// ===================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
const navLinkItems = document.querySelectorAll('.nav-link');
navLinkItems.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===================================
// Smooth Scroll Navigation
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Active Navigation Link on Scroll
// ===================================
const sections = document.querySelectorAll('section');
const navLinksArray = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Form Validation
// ===================================
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const subjectError = document.getElementById('subjectError');
const messageError = document.getElementById('messageError');
const formSuccess = document.getElementById('formSuccess');

// Validation functions
function validateName() {
    const nameValue = nameInput.value.trim();
    
    if (nameValue === '') {
        showError(nameInput, nameError, 'Name is required');
        return false;
    } else if (nameValue.length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        return false;
    } else {
        showSuccess(nameInput, nameError);
        return true;
    }
}

function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailValue === '') {
        showError(emailInput, emailError, 'Email is required');
        return false;
    } else if (!emailRegex.test(emailValue)) {
        showError(emailInput, emailError, 'Please enter a valid email');
        return false;
    } else {
        showSuccess(emailInput, emailError);
        return true;
    }
}

function validateSubject() {
    const subjectValue = subjectInput.value.trim();
    
    if (subjectValue === '') {
        showError(subjectInput, subjectError, 'Subject is required');
        return false;
    } else if (subjectValue.length < 5) {
        showError(subjectInput, subjectError, 'Subject must be at least 5 characters');
        return false;
    } else {
        showSuccess(subjectInput, subjectError);
        return true;
    }
}

function validateMessage() {
    const messageValue = messageInput.value.trim();
    
    if (messageValue === '') {
        showError(messageInput, messageError, 'Message is required');
        return false;
    } else if (messageValue.length < 10) {
        showError(messageInput, messageError, 'Message must be at least 10 characters');
        return false;
    } else {
        showSuccess(messageInput, messageError);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.add('error');
    errorElement.textContent = message;
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    errorElement.textContent = '';
}

// Real-time validation
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
subjectInput.addEventListener('blur', validateSubject);
messageInput.addEventListener('blur', validateMessage);

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();
    
    // If all validations pass
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Show success message
        formSuccess.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
        
        // In a real application, you would send the form data to a server here
        console.log('Form submitted successfully!');
        console.log({
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        });
    } else {
        // Scroll to the first error
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// ===================================
// Scroll Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===================================
// Project Link Click Handlers
// ===================================
const projectLinks = document.querySelectorAll('.project-link');
projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Prevent navigation if href is just "#"
        if (link.getAttribute('href') === '#') {
            e.preventDefault();
            alert('This is a demo link. Replace with your actual project URL!');
        }
    });
});

// ===================================
// Utility: Add smooth entrance animations
// ===================================
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
    
    // Log welcome message
    console.log('%c Welcome to Aliya Khan\'s Portfolio! ', 'background: #6366f1; color: white; font-size: 16px; padding: 10px;');
    console.log('%c Built with HTML, CSS, and JavaScript ', 'background: #8b5cf6; color: white; font-size: 12px; padding: 5px;');
});

// ===================================
// Back to Top Button (Optional Enhancement)
// ===================================
// Create back to top button dynamically
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '↑';
backToTopButton.setAttribute('aria-label', 'Back to top');
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #6366f1;
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

document.body.appendChild(backToTopButton);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effect for back to top button
backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.backgroundColor = '#4f46e5';
    backToTopButton.style.transform = 'translateY(-5px)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.backgroundColor = '#6366f1';
    backToTopButton.style.transform = 'translateY(0)';
});
