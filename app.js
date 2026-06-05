import { websites } from './websites.js';

// 1. Inject Websites from websites.js
const grid = document.getElementById('grid');
websites.forEach(site => {
  const card = document.createElement('a');
  card.href = site.url;
  card.className = 'card';
  card.innerHTML = `
    <h3>${site.name}</h3>
    <p>${site.description}</p>
  `;
  grid.appendChild(card);
});

// 2. Smooth Scroll Button
document.getElementById('scroll-trigger').addEventListener('click', () => {
  document.getElementById('portfolio-section').scrollIntoView({ behavior: 'smooth' });
});

// 3. Scroll Reveal Animations (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, idx * 100); // staggered index delay layout
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .trust-card').forEach(card => observer.observe(card));

// 4. Gold Dot Background
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

const particles = [];
const particleCount = 65;

for (let i = 0; i < particleCount; i++) {
  particles.push({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    radius: Math.random() * 1.5 + 0.5
  });
}

function draw() {
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = 'rgba(7, 7, 7, 1)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particleCount; i++) {
    const p1 = particles[i];

    p1.x += p1.vx;
    p1.y += p1.vy;

    if (p1.x < 0 || p1.x > width) p1.vx *= -1;
    if (p1.y < 0 || p1.y > height) p1.vy *= -1;

    ctx.beginPath();
    ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(216, 185, 107, 0.55)';
    ctx.fill();

    for (let j = i + 1; j < particleCount; j++) {
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 150) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = `rgba(216, 185, 107, ${0.085 * (1 - dist / 150)})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();
