// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll('.stat-value');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    let current = 0;
    const increment = target / 100;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };
    
    // Start animation after a delay
    setTimeout(updateCounter, Math.random() * 1000);
  });
}

// Mini charts animation
function animateMiniCharts() {
  const charts = document.querySelectorAll('.mini-chart');
  
  charts.forEach(chart => {
    const values = chart.getAttribute('data-values').split(',').map(Number);
    const maxValue = Math.max(...values);
    
    // Create bars
    values.forEach((value, index) => {
      const bar = document.createElement('div');
      bar.style.position = 'absolute';
      bar.style.bottom = '0';
      bar.style.left = `${(index / (values.length - 1)) * 100}%`;
      bar.style.width = '8px';
      bar.style.height = `${(value / maxValue) * 100}%`;
      bar.style.background = 'rgba(255, 255, 255, 0.6)';
      bar.style.borderRadius = '2px';
      bar.style.transform = 'translateX(-50%)';
      bar.style.transition = `height 0.5s ease ${index * 0.1}s`;
      
      chart.appendChild(bar);
      
      // Animate height
      setTimeout(() => {
        bar.style.height = `${(value / maxValue) * 100}%`;
      }, 100);
    });
  });
}

// Device progress bars animation
function animateDeviceBars() {
  const progressBars = document.querySelectorAll('.device-progress');
  
  progressBars.forEach((bar, index) => {
    const width = bar.style.width;
    bar.style.width = '0%';
    
    setTimeout(() => {
      bar.style.width = width;
    }, 500 + (index * 200));
  });
}

// Tab switching
function initTabSwitching() {
  const tabs = document.querySelectorAll('.nav-tab');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });
}

// Chart controls
function initChartControls() {
  const chartBtns = document.querySelectorAll('.chart-btn');
  
  chartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      chartBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
}

// Refresh button animation
function initRefreshButton() {
  const refreshBtn = document.querySelector('.refresh-btn');
  
  refreshBtn.addEventListener('click', () => {
    // Refresh activity feed
    const activityItems = document.querySelectorAll('.activity-item');
    activityItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100);
    });
  });
}

// Real-time updates simulation
function simulateRealTimeUpdates() {
  setInterval(() => {
    // Update notification dot
    const notificationDot = document.querySelector('.notification-dot');
    notificationDot.style.animation = 'none';
    setTimeout(() => {
      notificationDot.style.animation = 'pulse 2s infinite';
    }, 100);
    
    // Randomly update some stats
    const statValues = document.querySelectorAll('.stat-value');
    const randomStat = statValues[Math.floor(Math.random() * statValues.length)];
    const currentValue = parseInt(randomStat.textContent.replace(/,/g, ''));
    const change = Math.floor(Math.random() * 100) - 50;
    const newValue = Math.max(0, currentValue + change);
    
    randomStat.style.transform = 'scale(1.1)';
    randomStat.style.color = change > 0 ? '#00ff88' : '#ff0080';
    
    setTimeout(() => {
      randomStat.textContent = newValue.toLocaleString();
      randomStat.style.transform = 'scale(1)';
      randomStat.style.color = '#ffffff';
    }, 300);
    
  }, 5000);
}

// Hover effects for cards
function initHoverEffects() {
  const cards = document.querySelectorAll('.stat-card, .chart-container');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
  // Add loading animation
  document.body.style.opacity = '0';
  document.body.style.transform = 'translateY(20px)';
  
  setTimeout(() => {
    document.body.style.transition = 'all 0.5s ease';
    document.body.style.opacity = '1';
    document.body.style.transform = 'translateY(0)';
    
    // Initialize all features
    animateCounters();
    animateMiniCharts();
    animateDeviceBars();
    initTabSwitching();
    initChartControls();
    initRefreshButton();
    simulateRealTimeUpdates();
    initHoverEffects();
  }, 100);
});

// Add some interactive particles
function createParticles() {
  const particleCount = 20;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.width = '2px';
    particle.style.height = '2px';
    particle.style.background = '#00ff88';
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.opacity = '0.6';
    particle.style.zIndex = '-1';
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    particle.style.animation = `float ${Math.random() * 10 + 10}s infinite linear`;
    
    document.body.appendChild(particle);
  }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
    10% { opacity: 0.6; }
    90% { opacity: 0.6; }
    100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(style);

createParticles();