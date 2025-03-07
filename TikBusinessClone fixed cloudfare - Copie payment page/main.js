// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Testimonial Slider
    const testimonials = [
        {
            text: "Excellent service! The team was professional and thorough.",
            author: "John Smith, Business Owner"
        },
        {
            text: "Best cleaning service we've ever used. Highly recommended!",
            author: "Sarah Johnson, Office Manager"
        },
        {
            text: "Reliable, efficient, and friendly staff. Great attention to detail.",
            author: "Michael Brown, Homeowner"
        }
    ];

    let currentTestimonial = 0;
    const testimonialElement = document.querySelector('.testimonial');

    function updateTestimonial() {
        const testimonial = testimonials[currentTestimonial];
        testimonialElement.innerHTML = `
            <p>${testimonial.text}</p>
            <cite>- ${testimonial.author}</cite>
        `;
    }

    // Change testimonial every 5 seconds
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonial();
    }, 5000);

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.backgroundColor = 'white';
        }
    });
});
