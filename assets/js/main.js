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


async function loadGithubStats() {
    try {
        const response = await fetch('http://localhost:3000/api/github-stats'); 
        
        if (!response.ok) {
            console.error('API Serverless falhou com status:', response.status);
            throw new Error('Erro ao buscar estatísticas da API.');
        }

        const data = await response.json();

        document.getElementById("contributions-count").textContent = data.contributions ? data.contributions.toLocaleString('pt-BR') : '---';
        
        document.getElementById("projects-count").textContent = data.repos ? data.repos : '---';
        
        if (data.lines && data.lines > 0) {
             const linesK = (data.lines / 1000).toFixed(1) + "k";
             document.getElementById("lines-count").textContent = linesK;
        } else {
             document.getElementById("lines-count").textContent = '0k';
        }

    } catch (err) {
        console.error('Falha ao carregar estatísticas:', err);
        document.getElementById("contributions-count").textContent = '---';
        document.getElementById("projects-count").textContent = '---';
        document.getElementById("lines-count").textContent = '---';
    }
}

loadGithubStats();