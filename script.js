// Page loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.page-loader');
  const progress = document.querySelector('.loader-progress');
  
  let width = 0;
  const interval = setInterval(() => {
    width += Math.random() * 15;
    if (width >= 100) {
      width = 100;
      progress.style.width = width + '%';
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
      }, 500);
      clearInterval(interval);
    } else {
      progress.style.width = width + '%';
    }
  }, 100);
});

// Custom cursor - improved performance
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Direct update for main cursor
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

// Smooth follower animation
function animateFollower() {
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;
  
  followerX += dx * 0.2;
  followerY += dy * 0.2;
  
  cursorFollower.style.left = followerX + 'px';
  cursorFollower.style.top = followerY + 'px';
  
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Interactive elements
const interactiveElements = document.querySelectorAll('a, button, .interactive');
interactiveElements.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor-hover');
    cursorFollower.classList.add('cursor-hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor-hover');
    cursorFollower.classList.remove('cursor-hover');
  });
});

// Particles
function createParticles() {
  const container = document.getElementById('particles');
  const particleCount = 30; // Reduced for better performance
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    container.appendChild(particle);
  }
}
createParticles();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animated counters - only for satisfaction stat
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
          if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
}

// Animate skill bars
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
          bar.style.width = progress + '%';
        }, 500);
        observer.unobserve(bar);
      }
    });
  }, observerOptions);

  skillBars.forEach(bar => observer.observe(bar));
}

// Form submission
function handleFormSubmission() {
  const form = document.querySelector('.contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add form submission logic here
    alert('Wiadomość została wysłana! (Demo)');
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  animateSkillBars();
  handleFormSubmission();
});

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const shapes = document.querySelectorAll('.shape');
  
  shapes.forEach((shape, index) => {
    const speed = 0.5 + (index * 0.1);
    const yPos = -(scrolled * speed);
    shape.style.transform = `translateY(${yPos}px)`;
  });
});