// Experiencia de cumpleaños: animaciones suaves sin librerías externas.
const body = document.body;
const welcomeScreen = document.getElementById('welcomeScreen');
const startExperience = document.getElementById('startExperience');
const fallingGarden = document.getElementById('fallingGarden');
const celebrateButton = document.getElementById('celebrateButton');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fallingSymbols = ['🌼', '🌻', '❁', '✦'];

function closeWelcome() {
  body.classList.add('ready');
  setTimeout(() => welcomeScreen?.remove(), 1000);
}

function createFallingItem(intense = false) {
  const item = document.createElement('span');
  item.className = 'falling-item';
  item.textContent = fallingSymbols[Math.floor(Math.random() * fallingSymbols.length)];
  item.style.left = `${Math.random() * 100}vw`;
  item.style.setProperty('--size', `${intense ? 18 + Math.random() * 26 : 14 + Math.random() * 18}px`);
  item.style.setProperty('--duration', `${intense ? 3 + Math.random() * 3 : 9 + Math.random() * 8}s`);
  item.style.setProperty('--drift', `${-80 + Math.random() * 160}px`);
  item.style.animationDelay = `${Math.random() * (intense ? 0.8 : 4)}s`;
  fallingGarden.appendChild(item);
  item.addEventListener('animationend', () => item.remove());
}

function startAmbientGarden() {
  if (prefersReducedMotion) return;
  for (let index = 0; index < 18; index += 1) createFallingItem();
  setInterval(() => createFallingItem(), 850);
}

function startCelebrationRain() {
  if (prefersReducedMotion) return;
  let bursts = 0;
  const burstInterval = setInterval(() => {
    for (let index = 0; index < 18; index += 1) createFallingItem(true);
    bursts += 1;
    if (bursts > 10) clearInterval(burstInterval);
  }, 220);
}

function observeRevealElements() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}

startExperience?.addEventListener('click', closeWelcome);
celebrateButton?.addEventListener('click', startCelebrationRain);
window.addEventListener('load', () => {
  observeRevealElements();
  startAmbientGarden();
  setTimeout(closeWelcome, 3200);
});
