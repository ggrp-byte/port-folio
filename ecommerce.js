// Sample products data
const products = [
  {
    id: 1,
    name: "Smartwatch Pro",
    category: "electronics",
    price: 299,
    oldPrice: 399,
    rating: 4.5,
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400",
    badge: "SALE",
    description: "Zaawansowany smartwatch z monitorowaniem zdrowia"
  },
  {
    id: 2,
    name: "Kurtka Zimowa",
    category: "fashion",
    price: 199,
    oldPrice: null,
    rating: 4.8,
    image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400",
    badge: null,
    description: "Ciepła i stylowa kurtka na zimę"
  },
  {
    id: 3,
    name: "Lampa LED",
    category: "home",
    price: 89,
    oldPrice: 120,
    rating: 4.2,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=400",
    badge: "NEW",
    description: "Nowoczesna lampa LED z regulacją jasności"
  },
  {
    id: 4,
    name: "Buty Sportowe",
    category: "sports",
    price: 159,
    oldPrice: null,
    rating: 4.6,
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400",
    badge: null,
    description: "Wygodne buty do biegania i treningu"
  },
  {
    id: 5,
    name: "Słuchawki Bluetooth",
    category: "electronics",
    price: 79,
    oldPrice: 99,
    rating: 4.3,
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400",
    badge: "SALE",
    description: "Bezprzewodowe słuchawki z redukcją szumów"
  },
  {
    id: 6,
    name: "Sukienka Letnia",
    category: "fashion",
    price: 129,
    oldPrice: null,
    rating: 4.7,
    image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400",
    badge: null,
    description: "Lekka i przewiewna sukienka na lato"
  }
];

// Cart state
let cart = [];
let currentCategory = 'all';
let currentSort = 'name';
let maxPrice = 1000;

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartSidebar = document.getElementById('cartSidebar');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');
const overlay = document.getElementById('overlay');
const productModal = document.getElementById('productModal');

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initializeEventListeners();
  updateCartUI();
});

// Event listeners
function initializeEventListeners() {
  // Category filters
  document.querySelectorAll('.nav-category').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-category').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      currentCategory = e.target.dataset.category;
      renderProducts();
    });
  });

  // Sort filter
  document.getElementById('sortBy').addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Price filter
  const priceRange = document.getElementById('priceRange');
  const priceValue = document.getElementById('priceValue');
  
  priceRange.addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value);
    priceValue.textContent = maxPrice + ' zł';
    renderProducts();
  });

  // View toggle
  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const view = e.target.dataset.view;
      productsGrid.className = view === 'list' ? 'products-grid list-view' : 'products-grid';
    });
  });

  // Cart toggle
  document.querySelector('.cart-btn').addEventListener('click', toggleCart);
  document.querySelector('.close-cart').addEventListener('click', toggleCart);

  // Search
  document.querySelector('.search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    renderProducts(searchTerm);
  });

  // Close modal
  document.querySelector('.close-modal').addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  // Load more
  document.querySelector('.load-more-btn').addEventListener('click', loadMoreProducts);
}

// Render products
function renderProducts(searchTerm = '') {
  let filteredProducts = products.filter(product => {
    const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm);
    
    return matchesCategory && matchesPrice && matchesSearch;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (currentSort) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
  
  // Add event listeners to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.add-to-cart') && !e.target.closest('.action-icon')) {
        const productId = parseInt(card.dataset.productId);
        showProductModal(productId);
      }
    });
  });

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const productId = parseInt(e.target.closest('.product-card').dataset.productId);
      addToCart(productId);
    });
  });
}

// Create product card HTML
function createProductCard(product) {
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
        <div class="product-actions">
          <button class="action-icon">❤️</button>
          <button class="action-icon">👁️</button>
        </div>
      </div>
      <div class="product-content">
        <div class="product-category">${getCategoryName(product.category)}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-rating">
          <span class="stars">${stars}</span>
          <span class="rating-text">(${product.rating})</span>
        </div>
        <div class="product-price">
          <span class="price">${product.price} zł</span>
          ${product.oldPrice ? `<span class="old-price">${product.oldPrice} zł</span>` : ''}
        </div>
        <button class="add-to-cart">Dodaj do Koszyka</button>
      </div>
    </div>
  `;
}

// Get category display name
function getCategoryName(category) {
  const names = {
    electronics: 'Elektronika',
    fashion: 'Moda',
    home: 'Dom',
    sports: 'Sport'
  };
  return names[category] || category;
}

// Add to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCartUI();
  showCartNotification();
}

// Update cart UI
function updateCartUI() {
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <span class="empty-icon">🛒</span>
        <p>Twój koszyk jest pusty</p>
      </div>
    `;
  } else {
    cartItems.innerHTML = cart.map(item => createCartItem(item)).join('');
    
    // Add event listeners to quantity controls
    document.querySelectorAll('.quantity-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.closest('.cart-item').dataset.productId);
        const action = e.target.dataset.action;
        updateQuantity(productId, action);
      });
    });
  }
  
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  cartTotal.textContent = total + ' zł';
}

// Create cart item HTML
function createCartItem(item) {
  return `
    <div class="cart-item" data-product-id="${item.id}">
      <div class="cart-item-image">
        <img src="${item.image}" alt="${item.name}">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${item.price} zł</div>
        <div class="quantity-controls">
          <button class="quantity-btn" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" data-action="increase">+</button>
        </div>
      </div>
    </div>
  `;
}

// Update quantity
function updateQuantity(productId, action) {
  const item = cart.find(item => item.id === productId);
  
  if (action === 'increase') {
    item.quantity += 1;
  } else if (action === 'decrease') {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
    }
  }
  
  updateCartUI();
}

// Toggle cart sidebar
function toggleCart() {
  cartSidebar.classList.toggle('open');
  overlay.classList.toggle('open');
}

// Show product modal
function showProductModal(productId) {
  const product = products.find(p => p.id === productId);
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  
  productModal.querySelector('.modal-body').innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
      <div>
        <img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 0.75rem;">
      </div>
      <div>
        <div style="font-size: 0.8rem; color: #6b7280; text-transform: uppercase; margin-bottom: 0.5rem;">
          ${getCategoryName(product.category)}
        </div>
        <h2 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${product.name}</h2>
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
          <span style="color: #f59e0b;">${stars}</span>
          <span style="color: #6b7280;">(${product.rating})</span>
        </div>
        <p style="color: #6b7280; margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
          <span style="font-size: 2rem; font-weight: 700; color: #3b82f6;">${product.price} zł</span>
          ${product.oldPrice ? `<span style="color: #6b7280; text-decoration: line-through;">${product.oldPrice} zł</span>` : ''}
        </div>
        <button onclick="addToCart(${product.id}); closeModal();" style="width: 100%; padding: 1rem; background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); color: white; border: none; border-radius: 0.75rem; font-weight: 600; cursor: pointer;">
          Dodaj do Koszyka
        </button>
      </div>
    </div>
  `;
  
  productModal.classList.add('open');
  overlay.classList.add('open');
}

// Close modal
function closeModal() {
  productModal.classList.remove('open');
  overlay.classList.remove('open');
}

// Show cart notification
function showCartNotification() {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.75rem;
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = 'Produkt dodany do koszyka!';
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Load more products (simulation)
function loadMoreProducts() {
  const btn = document.querySelector('.load-more-btn');
  btn.textContent = 'Ładowanie...';
  btn.disabled = true;
  
  setTimeout(() => {
    btn.textContent = 'Załaduj Więcej';
    btn.disabled = false;
    // In a real app, you would load more products here
  }, 1500);
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);