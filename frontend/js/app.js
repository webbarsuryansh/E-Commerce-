const API = 'http://localhost:5000/api';

// ===== AUTH UTILS =====
const getToken = () => localStorage.getItem('token');
const getUser  = () => JSON.parse(localStorage.getItem('user') || 'null');
const isLoggedIn = () => !!getToken();
const isAdmin  = () => getUser()?.isAdmin;

const authHeaders = () => ({
  'Content-Type': 'application/json',
  ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {})
});

// ===== API HELPER =====
async function api(method, path, body = null) {
  const res = await fetch(API + path, {
    method, headers: authHeaders(),
    body: body ? JSON.stringify(body) : null
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

// ===== TOAST =====
function showToast(message, type = 'success') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const container = document.getElementById('toast-container') ||
    Object.assign(document.body.appendChild(document.createElement('div')),
      { id: 'toast-container', className: 'toast-container' });
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

// ===== NAVBAR =====
function renderNavbar() {
  const user = getUser();
  document.getElementById('nav-user-area').innerHTML = user
    ? `<li><a href="/pages/orders.html">My Orders</a></li>
       ${user.isAdmin ? '<li><a href="/pages/admin.html">Admin</a></li>' : ''}
       <li><span style="color:var(--primary)">${user.name}</span></li>
       <li><button class="btn btn-secondary btn-sm" onclick="logout()">Logout</button></li>`
    : `<li><a href="/pages/login.html">Login</a></li>
       <li><a href="/pages/register.html" class="btn btn-primary btn-sm">Sign Up</a></li>`;
}

function logout() {
  localStorage.clear();
  showToast('Logged out successfully', 'info');
  setTimeout(() => window.location = '/', 1000);
}

// ===== STARS =====
function renderStars(rating) {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

// ===== PRODUCT CARD =====
function createProductCard(p) {
  const div = document.createElement('div');
  div.className = 'product-card';
  div.innerHTML = `
    <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"
         onerror="this.src='https://via.placeholder.com/400x300/0f3460/6c63ff?text=No+Image'">
    <div class="product-info">
      <div class="product-category">${p.category}</div>
      <div class="product-name">${p.name}</div>
      <div class="product-rating">
        <span style="color:#ffd700">${renderStars(p.rating)}</span>
        <span style="color:var(--text-muted)">(${p.numReviews})</span>
      </div>
      <div class="product-price">$${p.price.toFixed(2)}</div>
      <div class="product-actions">
        <a href="/pages/product.html?id=${p._id}" class="btn btn-secondary btn-sm">View</a>
        <button class="btn btn-primary btn-sm" onclick="event.stopPropagation();addToCart('${p._id}','${p.name}')">
          🛒 Add
        </button>
      </div>
    </div>`;
  return div;
}

// ===== CART COUNT =====
async function updateCartCount() {
  if (!isLoggedIn()) return;
  try {
    const cart = await api('GET', '/cart');
    const count = cart.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;
    const badge = document.getElementById('cart-count');
    if (badge) badge.textContent = count;
  } catch {}
}

// ===== ADD TO CART =====
async function addToCart(productId, name) {
  if (!isLoggedIn()) {
    showToast('Please login to add items to cart', 'warning');
    return setTimeout(() => window.location = '/pages/login.html', 1200);
  }
  try {
    await api('POST', '/cart/add', { productId, quantity: 1 });
    showToast(`${name} added to cart! 🛒`);
    updateCartCount();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar();
  updateCartCount();
});