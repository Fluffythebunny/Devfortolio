// profile set up
const portfolioData = {
    developer: {
        name: "Your Name",
        title: "Full Stack Developer",
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername"
        // everything about your profile
    },
    projects: [
        {
            title: "Project 1",
            description: "A modern web application built with React",
            technologies: ["React", "Node.js", "MongoDB"],
            image: "project1.jpg",
            liveLink: "https://project1.com",
            githubLink: "https://github.com/yourusername/project1"
            // add more projects here
        }
    ],
    skills: [
        "JavaScript", "React", "Node.js", "Python", "MongoDB", 
        "SQL", "Git", "Docker", "AWS", "TypeScript"
        // add or remove skills here
    ]
};

function createGlassOrbs() {
    const orbsContainer = document.createElement('div');
    orbsContainer.className = 'orbs-container';
    
    for (let i = 0; i < 5; i++) {
        const orb = document.createElement('div');
        orb.className = 'glass-orb';
        const size = Math.random() * 200 + 100;
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.left = `${Math.random() * 100}vw`;
        orb.style.top = `${Math.random() * 100}vh`;
        orb.style.animation = `float ${Math.random() * 3 + 2}s ease-in-out infinite alternate`;
        orbsContainer.appendChild(orb);
    }
    
    document.body.prepend(orbsContainer);
}

function initPortfolio() {
    updateDeveloperInfo();
    renderProjects();
    renderSkills();
    createGlassOrbs();
    initializeEventListeners();
}

function updateDeveloperInfo() {
    document.getElementById('dev-name').textContent = portfolioData.developer.name;
    document.getElementById('dev-title').textContent = portfolioData.developer.title;
    
    document.getElementById('github-link').href = portfolioData.developer.github;
    document.getElementById('linkedin-link').href = portfolioData.developer.linkedin;
    document.getElementById('twitter-link').href = portfolioData.developer.twitter;
}

function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    portfolioData.projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.liveLink}" target="_blank">Live Demo</a>
                <a href="${project.githubLink}" target="_blank">GitHub</a>
            </div>
        `;
        
        projectsContainer.appendChild(projectCard);
    });
}

function renderSkills() {
    const skillsContainer = document.getElementById('skills-container');
    
    portfolioData.skills.forEach(skill => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.textContent = skill;
        skillsContainer.appendChild(skillTag);
    });
}

function initializeEventListeners() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
    });
}

function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = 'rgba(100, 255, 218, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();
}

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initParticles();
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
