document.addEventListener("DOMContentLoaded", () => {
    // Scroll reveal animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is in view
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(
        entries,
        observer
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // Waitlist Modal Logic
    const modal = document.getElementById('waitlist-modal');
    const waitlistBtns = document.querySelectorAll('.join-waitlist-btn');
    const closeBtn = document.querySelector('.modal-close');
    const overlay = document.querySelector('.modal-overlay');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    waitlistBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Notify Me Form Submit Handler
    const forms = document.querySelectorAll('.notify-form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('.input-field');
            const btn = form.querySelector('.btn-primary');
            
            if(input.value) {
                // Simulate an API call
                const originalText = btn.innerText;
                btn.innerText = "Securing Spot...";
                btn.style.opacity = "0.8";

                setTimeout(() => {
                    btn.innerText = "You're on the list!";
                    btn.style.background = "var(--green-primary)";
                    input.value = "";
                    
                    // Reset after 3 seconds
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.style.background = "";
                        btn.style.opacity = "1";
                        closeModal(); // extra touch: close modal after success
                    }, 3000);
                }, 1000);
            }
        });
    });
});
