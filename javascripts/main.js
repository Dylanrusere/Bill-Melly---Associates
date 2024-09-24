// sticky Navigation
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
  });
  
// Ham Menu
const hamMenu = document.querySelector(".menu");
const offMenu = document.querySelector(".offScreenMenu");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offMenu.classList.toggle("active");
});

//Hero Section
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".img-slide");
const contents = document.querySelectorAll(".content");

var currentSlide = 0;

const sliderNav = function(manual) {
    btns.forEach((btn) => {
        btn.classList.remove("active");
    });

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    contents.forEach((content) => {
        content.classList.remove("active");
    });

    currentSlide = manual !== undefined ? manual : currentSlide; // Update currentSlide if manual is defined

    btns[currentSlide].classList.add("active");
    slides[currentSlide].classList.add("active");
    contents[currentSlide].classList.add("active");
};

// Navigation buttons
btns.forEach((btn, i) => {
    btn.addEventListener("click", () => {
        sliderNav(i);
    });
});

// Automatic slider
const autoSlider = () => {
    currentSlide = (currentSlide + 1) % slides.length; // Loop back to the first slide
    sliderNav();
};

// Set interval for automatic sliding
setInterval(autoSlider, 7000); // Change slide every 5 seconds


// Counter
// Get all counter elements
const counters = document.querySelectorAll('.counter');

// Function to animate the counter
const animateCounter = (counter, target, duration) => {
    let count = parseInt(counter.querySelector('.number_counter').textContent, 10); // Starting number
    const increment = Math.ceil(target / (duration / 50)); // Calculate increment based on duration
    const interval = setInterval(() => {
        count += increment;
        if (count >= target) {
            count = target; // Ensure we don't exceed the target
            clearInterval(interval); // Stop counting
        }
        counter.querySelector('.number_counter').textContent = count; // Update the displayed number
    }, 50); // Adjust timing as necessary
};

// Observer callback to start counting
const startCounting = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.target, 10); // Get target from data attribute
            let duration; // Variable to hold duration based on the target

            // Set duration based on target value
            switch (target) {
                case 15: // Years of Experience
                    duration = 2000; // 2 seconds
                    break;
                case 5000: // Happy Clients
                    duration = 4000; // 4 seconds
                    break;
                case 50: // Countries Covered
                    duration = 3000; // 3 seconds
                    break;
                case 500: // Number of Employees (start from 400)
                    animateCounter(entry.target, target, duration);
                    return; // Skip calling animateCounter again below
                default:
                    duration = 2000; // Default duration if no match
            }

            animateCounter(entry.target, target, duration); // Start animation
            observer.unobserve(entry.target); // Stop observing this element
        }
    });
};

// Create an Intersection Observer
const observer = new IntersectionObserver(startCounting, {
    threshold: 1.0 // Trigger when the entire element is visible
});

// Observe each counter element
counters.forEach(counter => {
    observer.observe(counter);
});

// Adjust the target value for Number of Employees to start from 400
document.querySelector('.employees_employed_container').dataset.target = 500; // Set target to 500
document.querySelector('.employees_employed_container .number_counter').textContent = 400; // Start from 400
