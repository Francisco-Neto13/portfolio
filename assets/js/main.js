var scroll = new SmoothScroll('a[href*="#"]', {
    speed: 800, 
    offset: 85, 
    easing: 'easeInOutCubic' 
});


const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section');    

function updateActiveClass() {
    let current = ''; 

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (pageYOffset >= sectionTop - 85) { 
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveClass);

window.addEventListener('load', updateActiveClass);