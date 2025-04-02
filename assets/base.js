// Simple JavaScript to make the navigation links smooth scroll
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links that point to sections
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Scroll smoothly to the target
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to the current navigation item
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    // Call the function on scroll
    window.addEventListener('scroll', highlightCurrentSection);


    // CTA button on the banner
    const cta = document.querySelector('.banner-btn');
    const popup = document.querySelector('.popup-modal');

    // open when clicking the CTA
    cta.addEventListener('click', () => {
        document.body.style.overflow = 'hidden';
        popup.style.display = 'block';    
        setTimeout(() => {
            popup.style.opacity = '100%';
        },10);
    });

    // close when clicking outside the popup content
    window.addEventListener('click', (e) => {
        if (e.target === popup) {
            document.body.style.overflow = '';
            popup.style.opacity = '0%';
            setTimeout(() => {
                popup.style.display = 'none';   
            }, 300);
        }
    });

    // Countdown timer:
    function shipmentCountdownTimer(){
        let now = new Date();
        let deadline = new Date();
        deadline.setHours(15, 0, 0, 0); // kl 15:00

        let countDownTimer = document.getElementById('countdown-timer');
        let deadlineText = document.getElementById('deadline-text');
        
        // difference between deadline and the time now
        let difference = deadline - now;

        // countdown calculations
        let hours = Math.floor(difference / (1000 * 60 * 60));
        let min = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        let sec = Math.floor((difference % (1000 * 60)) / 1000);

        if(now < deadline){
            // set the time into the html
            countDownTimer.textContent = `${hours} : ${min} : ${sec}`

        } else{
            // when time excedes the deadline
            deadlineText.textContent = "Bestil inden kl. 15 for afsendelse samme dag.";
            countDownTimer.textContent = ``;
        }

    }

    shipmentCountdownTimer();
    setInterval(shipmentCountdownTimer, 1000); 
});