// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark-mode';
if (currentTheme === 'light-mode') {
    htmlElement.classList.add('light-mode');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('light-mode');
    const isLightMode = htmlElement.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light-mode' : 'dark-mode');
    themeToggle.textContent = isLightMode ? '☀️' : '🌙';
});

// Category Filter
const categoryBtns = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        categoryBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');

        // Get selected category
        const selectedCategory = btn.getAttribute('data-category');

        // Filter products
        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (selectedCategory === 'all') {
                card.classList.remove('hidden');
                card.style.animation = 'slideUp 0.6s ease-out';
            } else if (cardCategory === selectedCategory) {
                card.classList.remove('hidden');
                card.style.animation = 'slideUp 0.6s ease-out';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Set "ALL" as default active category
document.querySelector('[data-category="all"]').classList.add('active');

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation on load
window.addEventListener('load', () => {
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});