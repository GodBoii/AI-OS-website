document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple animation for features on scroll (optional)
    const featureItems = document.querySelectorAll('.feature-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Optional: Reset animation when out of view
                // entry.target.style.opacity = '0';
                // entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the item is visible
    });

    featureItems.forEach(item => {
        item.style.opacity = '0'; // Initially hidden
        item.style.transform = 'translateY(20px)'; // Start slightly lower
        item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(item);
    });

    // Add a subtle animation to the hero title on load
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(-20px)';
        heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Force reflow to ensure transition works
        heroTitle.offsetHeight; 

        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }

});