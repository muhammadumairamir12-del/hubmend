// ══════════════════════════════════════
// HUBMEND — MAIN APP LOGIC
// ══════════════════════════════════════

let currentVendor = null;
let filteredVendors = [...VENDORS];
let currentUser = null;

// ─── PAGE ROUTING ───
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'services') renderAllVendors();
  if (page === 'admin') initAdmin();
}

// ─── NAVBAR SCROLL ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// ─── MOBILE MENU ───
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// ─── SEARCH ───
function doSearch() {
  const service = document.getElementById('heroService').value;
  const city = document.getElementById('heroCity').value;
  if (service || city) {
    if (service) document.getElementById('searchInput').value = service;
    if (city) document.getElementById('cityFilter').value = city;
    showPage('services');
    applyFilters();
  } else {
    showPage('services');
  }
}

function quickSearch(term) {
  document.getElementById('heroService').value = term;
  document.getElementById('searchInput').value = term;
  showPage('services');
  applyFilters();
}

function filterCategory(cat) {
  document.getElementById('catFilter').value = cat;
  showPage('services');
  applyFilters();
}

// ─── RENDER VENDOR CARD ───
function renderVendorCard(vendor) {
  const typeBadge = vendor.type === 'bid' ? '<span class="badge badge-bid">Accepts Bids</span>' :
                    vendor.type === 'both' ? '<span class="badge badge-bid">Fixed + Bid</span>' : '';
  return `
    <div class="vendor-card" onclick="showVendorProfile(${vendor.id})">
      <div class="vendor-card-top">
        <div class="vendor-header">
          <div class="vendor-avatar" style="background:${vendor.color}">${vendor.initials}</div>
          <div class="vendor-info">
            <h3>${vendor.name}</h3>
            <div class="vendor-title">${vendor.title}</div>
            <div class="vendor-badges">
              ${vendor.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
              ${vendor.top ? '<span class="badge badge-top">⭐ Top Rated</span>' : ''}
              ${typeBadge}
            </div>
          </div>
        </div>
      </div>
      <div class="vendor-card-body">
        <div class="vendor-meta">
          <span>📍 ${vendor.city}</span>
          <span>🗂 ${vendor.category}</span>
          <span>${vendor.tags.slice(0,2).map(t => '#'+t).join(' ')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div class="vendor-rating">★ ${vendor.rating} <span style="color:#6B7280;font-weight:400">(${vendor.reviews} reviews)</span></div>
          <div class="vendor-price">From <strong>Rs. ${vendor.price.toLocaleString()}</strong></div>
        </div>
      </div>
      <div class="vendor-card-footer">
        <button class="btn-primary" onclick="event.stopPropagation();openBooking(${vendor.id})">Book Now</button>
        <button class="btn-outline" onclick="event.stopPropagation();showVendorProfile(${vendor.id})">Profile</button>
      </div>
    </div>
  `;
}

// ─── RENDER FEATURED VENDORS ───
function renderFeaturedVendors() {
  const el = document.getElementById('featuredVendors');
  if (!el) return;
  const featured = VENDORS.filter(v => v.top || v.rating >= 4.8).slice(0, 4);
  el.innerHTML = featured.map(renderVendorCard).join('');
}

// ─── RENDER ALL VENDORS ───
function renderAllVendors() {
  const el = document.getElementById('allVendors');
  if (!el) return;
  el.innerHTML = filteredVendors.length
    ? filteredVendors.map(renderVendorCard).join('')
    : '<div style="padding:60px;text-align:center;color:#6B7280;grid-column:1/-1"><div style="font-size:48px;margin-bottom:16px">🔍</div><h3>No experts found</h3><p>Try adjusting your filters</p></div>';
  document.getElementById('resultsCount').textContent = `Showing ${filteredVendors.length} expert${filteredVendors.length !== 1 ? 's' : ''}`;
}

// ─── FILTERS ───
function applyFilters() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const cat = document.getElementById('catFilter')?.value || '';
  const city = document.getElementById('cityFilter')?.value || '';
  const minRating = parseFloat(document.getElementById('ratingFilter')?.value || '0');
  const maxPrice = parseInt(document.getElementById('priceFilter')?.value || '50000');
  const fixedOk = document.getElementById('fixedFilter')?.checked;
  const bidOk = document.getElementById('bidFilter')?.checked;

  filteredVendors = VENDORS.filter(v => {
    if (search && !v.name.toLowerCase().includes(search) && !v.title.toLowerCase().includes(search) && !v.category.toLowerCase().includes(search)) return false;
    if (cat && v.category !== cat) return false;
    if (city && v.city !== city) return false;
    if (v.rating < minRating) return false;
    if (v.price > maxPrice) return false;
    if (!fixedOk && (v.type === 'fixed' || v.type === 'both')) return false;
    if (!bidOk && (v.type === 'bid' || v.type === 'both')) return false;
    return true;
  });
  renderAllVendors();
}

function updatePriceLabel(val) {
  document.getElementById('priceLabel').textContent = `Up to Rs. ${parseInt(val).toLocaleString()}`;
}

function resetFilters() {
  document.getElementById('searchInput').value = '';
  document.getElementById('catFilter').value = '';
  document.getElementById('cityFilter').value = '';
  document.getElementById('ratingFilter').value = '0';
  document.getElementById('priceFilter').value = '50000';
  document.getElementById('priceLabel').textContent = 'Up to Rs. 50,000';
  document.getElementById('fixedFilter').checked = true;
  document.getElementById('bidFilter').checked = true;
  filteredVendors = [...VENDORS];
  renderAllVendors();
}

function sortVendors(by) {
  if (by === 'rating') filteredVendors.sort((a,b) => b.rating - a.rating);
  else if (by === 'price_low') filteredVendors.sort((a,b) => a.price - b.price);
  else if (by === 'price_high') filteredVendors.sort((a,b) => b.price - a.price);
  else if (by === 'newest') filteredVendors.sort((a,b) => b.id - a.id);
  renderAllVendors();
}

// ─── VENDOR PROFILE ───
function showVendorProfile(id) {
  currentVendor = VENDORS.find(v => v.id === id);
  if (!currentVendor) return;
  const v = currentVendor;

  const reviews = [
    { author:'Ahmed K.', stars:'★★★★★', text:'Absolutely professional. Highly recommended!' },
    { author:'Sara M.', stars:'★★★★★', text:'Exceeded my expectations. Will book again.' },
    { author:'Omar F.', stars:'★★★★☆', text:'Great work, on time and within budget.' },
  ];

  document.getElementById('vendorProfileContent').innerHTML = `
    <div class="profile-main">
      <div class="profile-header">
        <div class="profile-avatar" style="background:${v.color}">${v.initials}</div>
        <div class="profile-info">
          <h1>${v.name}</h1>
          <div class="profile-title">${v.title}</div>
          <div class="vendor-badges" style="margin-bottom:16px">
            ${v.verified ? '<span class="badge badge-verified">✓ Verified</span>' : ''}
            ${v.top ? '<span class="badge badge-top">⭐ Top Rated</span>' : ''}
            <span class="badge" style="background:rgba(10,36,99,0.08);color:#0A2463">📍 ${v.city}</span>
            <span class="badge" style="background:rgba(10,36,99,0.08);color:#0A2463">🗂 ${v.category}</span>
          </div>
          <div class="profile-stats">
            <div class="profile-stat"><strong>★ ${v.rating}</strong><span>Rating</span></div>
            <div class="profile-stat"><strong>${v.reviews}</strong><span>Reviews</span></div>
            <div class="profile-stat"><strong>${v.bookings}</strong><span>Bookings</span></div>
          </div>
        </div>
      </div>

      <div class="profile-bio">
        <h2>About</h2>
        <p>${v.bio}</p>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px">
          ${v.tags.map(t => `<span class="badge" style="background:rgba(0,212,255,0.08);color:#0A2463">${t}</span>`).join('')}
        </div>
      </div>

      <div class="profile-reviews">
        <h2>Reviews (${v.reviews})</h2>
        ${reviews.map(r => `
          <div class="review-item">
            <div class="review-header">
              <span class="review-author">${r.author}</span>
              <span class="review-stars">${r.stars}</span>
            </div>
            <div class="review-text">${r.text}</div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="booking-sidebar">
      <div class="booking-card">
        <h2>Book ${v.name.split(' ')[0]}</h2>
        <div class="booking-price">Rs. ${v.price.toLocaleString()} <span>starting from</span></div>
        ${v.type !== 'fixed' ? `
          <div class="booking-type-tabs">
            <button class="booking-tab active" onclick="switchBookingTab('fixed',this)">Fixed Price</button>
            <button class="booking-tab" onclick="switchBookingTab('bid',this)">Place Bid</button>
          </div>
        ` : ''}
        <div class="booking-form" style="margin-top:16px">
          <input type="text" class="form-input" placeholder="Your Name" id="bName" />
          <input type="tel" class="form-input" placeholder="Phone Number" id="bPhone" />
          <input type="date" class="form-input" id="bDate" />
          <input type="time" class="form-input" id="bTime" />
          <textarea class="form-input" rows="3" placeholder="Describe your requirement..." id="bDesc"></textarea>
          <div class="bid-input" id="bidInputDiv">
            <input type="number" class="form-input" placeholder="Your bid amount (Rs.)" id="bBid" />
          </div>
          <button class="btn-primary full-width btn-large" onclick="submitBooking()">
            🔐 Book Securely
          </button>
          <p style="font-size:12px;color:#6B7280;text-align:center">Payment held in escrow until job done</p>
        </div>
      </div>
    </div>
  `;

  showPage('profile');
}

function switchBookingTab(type, btn) {
  document.querySelectorAll('.booking-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const bidDiv = document.getElementById('bidInputDiv');
  if (bidDiv) {
    bidDiv.classList.toggle('show', type === 'bid');
  }
}

// ─── BOOKING ───
function openBooking(id) {
  showVendorProfile(id);
}

function submitBooking() {
  const name = document.getElementById('bName')?.value;
  const phone = document.getElementById('bPhone')?.value;
  const date = document.getElementById('bDate')?.value;
  if (!name || !phone || !date) { showToast('⚠️ Please fill all required fields'); return; }
  showToast('✅ Booking confirmed! Payment link sent to ' + phone);
  setTimeout(() => showPage('services'), 1500);
}

// ─── VENDOR FORM ───
function submitVendorForm() {
  const required = ['vName','vPhone','vEmail','vCategory','vTitle','vCity','vPrice','vBio','vCnic','vPayment'];
  for (const id of required) {
    if (!document.getElementById(id)?.value) {
      showToast('⚠️ Please fill all required fields'); return;
    }
  }
  showToast('✅ Application submitted! We will verify within 24 hours.');
  setTimeout(() => showPage('home'), 2000);
}

// ─── MODALS ───
function showModal(type) {
  const content = document.getElementById('modalContent');
  if (type === 'login') {
    content.innerHTML = `
      <div class="modal-title">Welcome Back</div>
      <div class="modal-sub">Log in to your Hubmend account</div>
      <div class="modal-form">
        <input type="tel" class="form-input" placeholder="Phone Number" id="loginPhone" />
        <input type="password" class="form-input" placeholder="Password" id="loginPass" />
        <button class="btn-primary full-width btn-large" onclick="handleLogin()">Log In</button>
        <button class="btn-outline full-width" style="margin-top:-4px" onclick="handleOTP()">Login with OTP</button>
      </div>
      <div class="modal-footer">
        Don't have an account? <a onclick="showModal('signup')">Join Free</a> &nbsp;|&nbsp;
        <a>Forgot Password?</a>
      </div>
    `;
  } else if (type === 'signup') {
    content.innerHTML = `
      <div class="modal-title">Join Hubmend</div>
      <div class="modal-sub">Create your free account in seconds</div>
      <div class="modal-form">
        <input type="text" class="form-input" placeholder="Full Name" id="signupName" />
        <input type="tel" class="form-input" placeholder="Phone Number" id="signupPhone" />
        <input type="email" class="form-input" placeholder="Email Address" id="signupEmail" />
        <input type="password" class="form-input" placeholder="Create Password" id="signupPass" />
        <div style="font-size:13px;color:#6B7280">By joining, you agree to our <a style="color:#0A2463">Terms</a> and <a style="color:#0A2463">Privacy Policy</a></div>
        <button class="btn-primary full-width btn-large" onclick="handleSignup()">Create Account Free</button>
      </div>
      <div class="modal-footer">
        Already have an account? <a onclick="showModal('login')">Log In</a>
      </div>
    `;
  } else if (type === 'otp') {
    content.innerHTML = `
      <div class="modal-title">Enter OTP</div>
      <div class="modal-sub">We sent a 6-digit code to your phone</div>
      <div class="modal-form">
        <input type="number" class="form-input" placeholder="6-digit OTP" id="otpInput" style="font-size:24px;text-align:center;letter-spacing:8px" />
        <button class="btn-primary full-width btn-large" onclick="verifyOTP()">Verify OTP</button>
      </div>
    `;
  }
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() { document.getElementById('modalOverlay').classList.remove('open'); }
function closeBooking() { document.getElementById('bookingOverlay').classList.remove('open'); }

function handleLogin() {
  const phone = document.getElementById('loginPhone')?.value;
  if (!phone) { showToast('⚠️ Enter your phone number'); return; }
  showToast('✅ Logged in successfully!');
  currentUser = { phone };
  closeModal();
}

function handleOTP() {
  showModal('otp');
}

function verifyOTP() {
  const otp = document.getElementById('otpInput')?.value;
  if (!otp || otp.length < 6) { showToast('⚠️ Enter valid OTP'); return; }
  showToast('✅ Phone verified! Welcome to Hubmend!');
  closeModal();
}

function handleSignup() {
  const name = document.getElementById('signupName')?.value;
  const phone = document.getElementById('signupPhone')?.value;
  if (!name || !phone) { showToast('⚠️ Please fill required fields'); return; }
  showModal('otp');
}

// ─── ADMIN ───
function checkAdminAccess() {
  const pass = prompt('Admin Password:');
  if (pass === 'admin123') {
    showPage('admin');
  } else if (pass !== null) {
    showToast('❌ Wrong password');
  }
}

function showAdminTab(tab) {
  document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('admin-' + tab).classList.add('active');
  event.target.classList.add('active');
}

function initAdmin() {
  renderAdminBookings();
  renderAdminVendors();
  renderAdminPayments();
  renderAdminDisputes();
  renderAdminBids();
  renderAdminCustomers();
}

function statusBadge(s) {
  const map = { active:'status-active', pending:'status-pending', completed:'status-completed', cancelled:'status-cancelled', banned:'status-banned', 'in-escrow':'status-pending', released:'status-active', open:'status-active', closing:'status-pending' };
  return `<span class="status-badge ${map[s]||'status-pending'}">${s}</span>`;
}

function renderAdminBookings() {
  const tbody = document.getElementById('recentBookingsTable');
  const allTbody = document.getElementById('bookingsTable');
  const rows = BOOKINGS_DATA.map(b => `
    <tr>
      <td><strong>${b.id}</strong></td>
      <td>${b.customer}</td>
      <td>${b.vendor}</td>
      <td>${b.service}</td>
      <td><strong>${b.amount}</strong></td>
      <td>${statusBadge(b.status)}</td>
      <td><div class="action-btns"><button class="action-btn action-view">View</button></div></td>
    </tr>
  `).join('');
  if (tbody) tbody.innerHTML = rows;
  if (allTbody) allTbody.innerHTML = rows;
}

function renderAdminVendors() {
  const tbody = document.getElementById('vendorsTable');
  if (!tbody) return;
  tbody.innerHTML = VENDORS_TABLE_DATA.map(v => `
    <tr>
      <td><strong>${v.name}</strong></td>
      <td>${v.category}</td>
      <td>${v.city}</td>
      <td>${v.rating}</td>
      <td>${v.bookings}</td>
      <td>${statusBadge(v.status)}</td>
      <td><div class="action-btns">
        ${v.status === 'pending' ? `<button class="action-btn action-approve" onclick="showToast('✅ Vendor approved!')">Approve</button><button class="action-btn action-reject" onclick="showToast('❌ Vendor rejected.')">Reject</button>` : ''}
        <button class="action-btn action-view" onclick="showToast('Loading vendor profile...')">View</button>
        ${v.status === 'active' ? `<button class="action-btn action-reject" onclick="showToast('🚫 Vendor suspended.')">Suspend</button>` : ''}
      </div></td>
    </tr>
  `).join('');
}

function renderAdminPayments() {
  const tbody = document.getElementById('paymentsTable');
  if (!tbody) return;
  tbody.innerHTML = PAYMENTS_DATA.map(p => `
    <tr>
      <td><strong>${p.id}</strong></td>
      <td>${p.vendor}</td>
      <td><strong>${p.amount}</strong></td>
      <td style="color:#059669;font-weight:600">${p.cut}</td>
      <td>${p.method}</td>
      <td>${statusBadge(p.status)}</td>
    </tr>
  `).join('');
}

function renderAdminDisputes() {
  const el = document.getElementById('disputesList');
  if (!el) return;
  el.innerHTML = DISPUTES_DATA.map(d => `
    <div class="dispute-card">
      <h3>${d.title} — ${d.id}</h3>
      <div class="dispute-meta">
        <span>👤 Customer: ${d.customer}</span>
        <span>👷 Vendor: ${d.vendor}</span>
        <span>💰 Amount: ${d.amount}</span>
        <span>📅 ${d.date}</span>
      </div>
      <p>${d.reason}</p>
      <div class="action-btns">
        <button class="action-btn action-approve" onclick="showToast('✅ Refund issued to customer.')">Refund Customer</button>
        <button class="action-btn action-view" onclick="showToast('Payment released to vendor.')">Release to Vendor</button>
        <button class="action-btn action-reject" onclick="showToast('Dispute closed.')">Close Dispute</button>
      </div>
    </div>
  `).join('');
}

function renderAdminBids() {
  const tbody = document.getElementById('bidsTable');
  if (!tbody) return;
  tbody.innerHTML = BIDS_DATA.map(b => `
    <tr>
      <td><strong>${b.title}</strong></td>
      <td>${b.customer}</td>
      <td>${b.budget}</td>
      <td><span class="badge badge-bid">${b.bids} bids</span></td>
      <td>${statusBadge(b.status)}</td>
      <td><button class="action-btn action-view" onclick="showToast('Loading bid details...')">View Bids</button></td>
    </tr>
  `).join('');
}

function renderAdminCustomers() {
  const tbody = document.getElementById('customersTable');
  if (!tbody) return;
  tbody.innerHTML = CUSTOMERS_DATA.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td>${c.email}</td>
      <td>${c.city}</td>
      <td>${c.bookings}</td>
      <td>${c.joined}</td>
      <td>${statusBadge(c.status)}</td>
    </tr>
  `).join('');
}

// ─── TOAST ───
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ─── FOOTER ───
function renderFooter() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#" class="logo" onclick="showPage('home')">
          <span class="logo-icon" style="color:#00D4FF">⬡</span>
          <span class="logo-text">Hubmend</span>
        </a>
        <p>Pakistan's most trusted platform connecting customers with verified professionals across every service category.</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="#" onclick="filterCategory('Medical')">Medical</a>
        <a href="#" onclick="filterCategory('Legal')">Legal</a>
        <a href="#" onclick="filterCategory('Engineering')">Engineering</a>
        <a href="#" onclick="filterCategory('Home Services')">Home Services</a>
        <a href="#" onclick="filterCategory('Technology')">Technology</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About Us</a>
        <a href="#">Careers</a>
        <a href="#">Press</a>
        <a href="#">Blog</a>
        <a href="#">Contact</a>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <a href="#">Help Center</a>
        <a href="#">Safety</a>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
        <a href="#" onclick="checkAdminAccess()">Admin</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 Hubmend. All rights reserved. Made in 🇵🇰 Pakistan</span>
      <span>Payments secured by Raast · NayaPay · JazzCash</span>
    </div>
  `;
  document.querySelectorAll('.page').forEach(p => {
    if (p.id !== 'page-admin') p.appendChild(footer.cloneNode(true));
  });
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  renderFeaturedVendors();
  renderFooter();

  // Set min date for booking
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach(el => el.min = today);
});
