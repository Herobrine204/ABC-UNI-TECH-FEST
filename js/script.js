document.addEventListener("DOMContentLoaded", () => {
  const progressFill = document.querySelector(".progress-fill");
  const loader = document.getElementById("loader");
  const bootMessage = document.getElementById("boot-message");

  const messages = [
    "Initializing GPU...",
    "Compiling Innovation...",
    "Optimizing Circuits...",
    "Loading Code & Culture...",
    "Overclocking Creativity...",
    "System Ready!"
  ];

  let progress = 0;
  let msgIndex = 0;

  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 1000);
      }, 500);
    }
    progressFill.style.width = progress + "%";

    bootMessage.textContent = messages[msgIndex];
    msgIndex = (msgIndex + 1) % messages.length;
  }, 600);
});
const starsContainer = document.querySelector('.stars');

function createStar() {
  const star = document.createElement('div');
  star.classList.add('star');
  
  star.style.left = Math.random() * window.innerWidth + "px";
  star.style.top = Math.random() * window.innerHeight + "px";
  
  star.style.animationDelay = Math.random() * 5 + "s";
  star.style.animationDuration = (1.5 + Math.random()) + "s";

  starsContainer.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 7000);
}

setInterval(createStar, 200);

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ffffff'; // Particle color
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        let color = '#ffffff';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                // Line color matches your button color for consistency
                ctx.strokeStyle = `rgba(0, 255, 200, ${opacityValue})`; 
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}

window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

    init();
animate();
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const formMessage = document.getElementById('form-message');
    
    const teamDetailsSection = document.getElementById('team-details');
    const teamEventCheckboxes = form.querySelectorAll('input[name="events"]');
    const toggleTeamDetails = () => {
        const isTeamEventSelected = Array.from(teamEventCheckboxes).some(cb => cb.checked);
        
        if (isTeamEventSelected) {
            teamDetailsSection.style.display = 'flex';
        } else {
            teamDetailsSection.style.display = 'none';
        }
    };

    teamEventCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', toggleTeamDetails);
    });


    form.addEventListener('submit', (event) => {
        event.preventDefault();
        formMessage.textContent = '';
        formMessage.style.color = '';

        const fullName = form.elements['fullName'].value.trim();
        const email = form.elements['email'].value.trim();
        const phone = form.elements['phone'].value.trim();
        const college = form.elements['college'].value.trim();
        const interestedEvents = form.querySelectorAll('input[name="events"]:checked');
        
        const teamName = form.elements['teamName'].value.trim();
        const isTeamSectionVisible = teamDetailsSection.style.display === 'flex';


        if (fullName === '') {
            showError('Full Name is required.');
            return;
        }
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        if (!isValidPhone(phone)) {
            showError('Please enter a valid 10-digit phone number.');
            return;
        }
        if (college === '') {
            showError('College Name is required.');
            return;
        }
        if (interestedEvents.length === 0) {
            showError('Please select at least one event of interest.');
            return;
        }
        
        if (isTeamSectionVisible && teamName === '') {
            showError('Team Name is required for hackathon-style events.');
            return;
        }


        showSuccess('Registration successful! We will contact you shortly.');
        form.reset();
        toggleTeamDetails(); 
    });

    function showError(message) {
        formMessage.textContent = message;
        formMessage.style.color = 'red';
    }

    function showSuccess(message) {
        formMessage.textContent = message;
        formMessage.style.color = 'lightgreen';
    }

    function isValidEmail(email) {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(email);
    }

    function isValidPhone(phone) {
        const regex = /^\d{10}$/;
        return regex.test(phone);
    }
});


