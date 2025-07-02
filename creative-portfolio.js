// Smooth scrolling for navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(item.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation highlighting
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${current}`) {
      item.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);

// Animate skill bars when in view
function animateSkills() {
  const skillFills = document.querySelectorAll('.skill-fill');
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        const level = fill.getAttribute('data-level');
        setTimeout(() => {
          fill.style.width = level + '%';
        }, 500);
        observer.unobserve(fill);
      }
    });
  }, observerOptions);

  skillFills.forEach(fill => observer.observe(fill));
}

// Parallax effect for floating shapes
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = -(scrolled * speed);
      shape.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
    });
  });
}

// Form submission
function initForm() {
  const form = document.querySelector('.form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Animate submit button
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Wysyłanie...';
    submitBtn.style.background = '#10b981';
    
    setTimeout(() => {
      submitBtn.textContent = 'Wysłano!';
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        form.reset();
      }, 2000);
    }, 1500);
  });
}

// Hover effects for work items
function initWorkHovers() {
  const workItems = document.querySelectorAll('.work-item');
  
  workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      workItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.style.opacity = '0.7';
          otherItem.style.transform = 'scale(0.95)';
        }
      });
    });
    
    item.addEventListener('mouseleave', () => {
      workItems.forEach(otherItem => {
        otherItem.style.opacity = '1';
        otherItem.style.transform = 'scale(1)';
      });
    });
  });
}

// Scroll reveal animation
function initScrollReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Elements to animate
  const elementsToAnimate = document.querySelectorAll('.work-item, .profile-card, .contact-method');
  
  elementsToAnimate.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// Cursor trail effect
function initCursorTrail() {
  const trail = [];
  const trailLength = 10;
  
  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement('div');
    dot.style.position = 'fixed';
    dot.style.width = '4px';
    dot.style.height = '4px';
    dot.style.background = '#6366f1';
    dot.style.borderRadius = '50%';
    dot.style.pointerEvents = 'none';
    dot.style.zIndex = '9999';
    dot.style.opacity = (i / trailLength).toString();
    dot.style.transition = 'all 0.1s ease';
    document.body.appendChild(dot);
    trail.push(dot);
  }
  
  let mouseX = 0, mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function updateTrail() {
    trail.forEach((dot, index) => {
      const nextDot = trail[index + 1] || { offsetLeft: mouseX, offsetTop: mouseY };
      
      dot.style.left = nextDot.offsetLeft + 'px';
      dot.style.top = nextDot.offsetTop + 'px';
    });
    
    if (trail[0]) {
      trail[0].style.left = mouseX + 'px';
      trail[0].style.top = mouseY + 'px';
    }
    
    requestAnimationFrame(updateTrail);
  }
  
  updateTrail();
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Add loading animation
  document.body.style.opacity = '0';
  
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
    
    // Initialize all features
    animateSkills();
    initParallax();
    initForm();
    initWorkHovers();
    initScrollReveal();
    initCursorTrail();
  }, 100);
});

// Add floating particles
function createFloatingParticles() {
  const particleCount = 15;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '3px';
    particle.style.height = '3px';
    particle.style.background = '#6366f1';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.4';
    particle.style.zIndex = '-1';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    particle.style.animation = `floatParticle ${Math.random() * 15 + 10}s infinite linear`;
    
    document.body.appendChild(particle);
  }
}

// Add particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.4; }
    90% { opacity: 0.4; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(particleStyle);

createFloatingParticles();