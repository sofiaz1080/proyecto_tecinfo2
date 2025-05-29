document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic "Donate Now" and "Monetary Support" buttons in Hero section
    document.querySelectorAll('.hero-buttons .btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetSectionId = this.dataset.section;
            document.getElementById(targetSectionId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate stats numbers on scroll
    const statsSection = document.querySelector('#sobre-nosotros');
    const statNumbers = document.querySelectorAll('.stat-number');

    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            let current = 0;
            const increment = target / 200; // Adjust for animation speed

            const updateNumber = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target;
                }
            };
            updateNumber();
        });
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(statsSection); // Stop observing once animated
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the section is visible

    if (statsSection) {
        observer.observe(statsSection);
    }


    // Show/hide food donation form based on button click
    const foodDonationButtons = document.querySelectorAll('.food-donation-options .btn-donate');
    const foodDonationForm = document.getElementById('food-donation-form');
    const foodTypeSelect = document.getElementById('food-type');

    foodDonationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const foodType = this.dataset.item;
            foodTypeSelect.value = foodType; // Pre-select the food type
            foodDonationForm.style.display = 'block'; // Show the form
            // Scroll to the form
            foodDonationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Handle food donation form submission (example)
    foodDonationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu donación de alimentos! Nos pondremos en contacto contigo pronto.');
        // In a real application, you'd send this data to a server
        foodDonationForm.reset();
        foodDonationForm.style.display = 'none'; // Hide form after submission
    });

    // Handle money donation amount selection
    const moneyOptionCards = document.querySelectorAll('.money-option-card:not(.custom-amount-card)');
    const customMoneyAmountInput = document.getElementById('custom-money-amount');
    const btnCustomMoney = document.getElementById('btn-custom-money');
    const moneyAmountDisplay = document.getElementById('money-amount-display');
    const moneyDonationForm = document.getElementById('money-donation-form');

    let selectedDonationAmount = 0;

    moneyOptionCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            moneyOptionCards.forEach(c => c.classList.remove('active'));
            document.querySelector('.custom-amount-card')?.classList.remove('active');

            this.classList.add('active'); // Add active class to clicked card
            selectedDonationAmount = parseFloat(this.dataset.amount);
            moneyAmountDisplay.value = `$${selectedDonationAmount.toFixed(2)}`;
            moneyDonationForm.style.display = 'block';
            moneyDonationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    btnCustomMoney.addEventListener('click', function() {
        moneyOptionCards.forEach(c => c.classList.remove('active'));
        document.querySelector('.custom-amount-card')?.classList.add('active');

        const customAmount = parseFloat(customMoneyAmountInput.value);
        if (customAmount > 0) {
            selectedDonationAmount = customAmount;
            moneyAmountDisplay.value = `$${selectedDonationAmount.toFixed(2)}`;
            moneyDonationForm.style.display = 'block';
            moneyDonationForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            alert('Por favor, ingresa una cantidad válida para tu donación.');
        }
    });

    // Update display when custom amount input changes (without clicking button)
    customMoneyAmountInput.addEventListener('input', function() {
        // This makes the display update as they type, but the 'active' state and form show
        // will only happen when btnCustomMoney is clicked or a preset card is clicked.
        // If you want the form to show *immediately* on typing, move the form.style.display = 'block'; here.
        // For now, it requires button click for custom amount.
    });


    // Toggle payment details based on radio button selection
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    const cardDetails = document.getElementById('card-details');

    paymentMethods.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });

    // Handle money donation form submission (example)
    moneyDonationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (selectedDonationAmount > 0) {
            alert(`¡Gracias por tu donación de $${selectedDonationAmount.toFixed(2)}! Tu apoyo es invaluable.`);
            // In a real application, you'd send this data to a payment gateway
            moneyDonationForm.reset();
            moneyAmountDisplay.value = '$0.00';
            selectedDonationAmount = 0;
            moneyDonationForm.style.display = 'none'; // Hide form after submission
            moneyOptionCards.forEach(c => c.classList.remove('active'));
            document.querySelector('.custom-amount-card')?.classList.remove('active');
            customMoneyAmountInput.value = '';
        } else {
            alert('Por favor, selecciona o ingresa una cantidad para donar.');
        }
    });

    // Contact form submission (example)
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('¡Gracias por tu mensaje! Te responderemos a la brevedad.');
        // In a real application, send this data to a server
        contactForm.reset();
    });

    // GSAP animations for sections on scroll
    gsap.registerPlugin(ScrollTrigger);

    // Fade in and slide up elements in each section
    gsap.utils.toArray('.info-section h3, .info-section p, .stat-item, .donation-section h3, .donation-section .section-description, .option-card, .money-option-card, .contact-section h3, .contact-section p, .contact-info, .contact-form').forEach(element => {
        gsap.from(element, {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: "top 80%", // When top of element is 80% down the viewport
                toggleActions: "play none none none", // Play animation once
                // markers: true // Uncomment for debugging scroll triggers
            }
        });
    });
});
