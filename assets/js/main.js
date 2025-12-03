function loadPartial(id, filePath) {
    const element = document.getElementById(id);
    if (element) {
        return fetch(filePath)
            .then(response => response.text())
            .then(html => {
                element.innerHTML = html;
            })
            .catch(error => console.error(`Erro ao carregar ${filePath}:`, error));
    }
    return Promise.resolve(); 
}

async function loadPartials() {
    console.log('Iniciando carregamento de parciais...');
    
    const partialsToLoad = [
        { id: 'main-header', path: 'partials/header.html' },
        { id: 'main-footer', path: 'partials/footer.html' },
        { id: 'section-hero', path: 'partials/hero.html' },
        { id: 'section-projects', path: 'partials/projects.html' },
        { id: 'section-about', path: 'partials/about.html' }
    ];

    const promises = partialsToLoad.map(p => loadPartial(p.id, p.path));

    await Promise.all(promises);
    
    console.log('Todos os parciais carregados. Inicializando o portfólio...');
    
    initializePortfolio();
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function initializePortfolio() {
    new SmoothScroll('a[href*="#"]', {
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

    window.addEventListener('scroll', throttle(updateActiveClass, 100));
    window.addEventListener('load', updateActiveClass);
    
    updateActiveClass(); 
    
    loadGithubStats();
}


async function loadGithubStats() {
    try {
        const response = await fetch('https://portfolio-three-gold-45.vercel.app/api/github-stats'); 
        
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


document.addEventListener('DOMContentLoaded', loadPartials);
