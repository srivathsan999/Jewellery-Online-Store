// Dashboard JavaScript - User and Admin Dashboard Functionality

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initUserDashboard();
    initAdminDashboard();
    initTabSwitching();
    initForms();
    loadDashboardData();
});

// User Dashboard Functions
function initUserDashboard() {
    const menuItems = document.querySelectorAll('.account-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;
            switchTab(tab);
            
            // Update active state
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Admin Dashboard Functions
function initAdminDashboard() {
    const menuItems = document.querySelectorAll('.admin-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.getAttribute('href').substring(1);
            switchAdminTab(tab);
            
            // Update active state
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
        });
    });
}

// Tab Switching
function initTabSwitching() {
    // User dashboard tabs
    const userTabs = document.querySelectorAll('.dashboard-tab');
    userTabs.forEach(tab => {
        if (tab.classList.contains('active')) {
            tab.style.display = 'block';
        }
    });
    
    // Admin dashboard tabs
    const adminTabs = document.querySelectorAll('.admin-tab');
    adminTabs.forEach(tab => {
        if (tab.classList.contains('active')) {
            tab.style.display = 'block';
        }
    });
}

function switchTab(tabName) {
    const tabs = document.querySelectorAll('.dashboard-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.display = 'block';
    }
}

function switchAdminTab(tabName) {
    const tabs = document.querySelectorAll('.admin-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
        tab.style.display = 'none';
    });
    
    const activeTab = document.getElementById(tabName);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.style.display = 'block';
    }
}

// Load Dashboard Data
function loadDashboardData() {
    loadUserOrders();
    loadUserWishlist();
    loadAdminOrders();
    loadAdminProducts();
    loadAdminCustomers();
    loadCategories();
    loadReviews();
}

// User Orders
function loadUserOrders() {
    const ordersList = document.getElementById('ordersList');
    const recentOrders = document.getElementById('recentOrders');
    
    if (!ordersList && !recentOrders) return;
    
    const orders = [
        {
            id: 'ORD-2024-001',
            date: '2024-01-15',
            products: [
                { name: 'Diamond Bangle', price: 2799.99, image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=100&h=100&fit=crop' }
            ],
            total: 2799.99,
            status: 'delivered'
        },
        {
            id: 'ORD-2024-002',
            date: '2024-01-20',
            products: [
                { name: 'Gold Necklace', price: 1599.99, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&h=100&fit=crop' }
            ],
            total: 1599.99,
            status: 'processing'
        },
        {
            id: 'ORD-2024-003',
            date: '2024-01-25',
            products: [
                { name: 'Pearl Earrings', price: 899.99, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&h=100&fit=crop' }
            ],
            total: 899.99,
            status: 'pending'
        }
    ];
    
    if (recentOrders) {
        recentOrders.innerHTML = orders.slice(0, 3).map(order => createOrderCard(order)).join('');
    }
    
    if (ordersList) {
        ordersList.innerHTML = orders.map(order => createOrderCard(order)).join('');
    }
}

function createOrderCard(order) {
    const statusClass = order.status;
    const statusText = order.status.charAt(0).toUpperCase() + order.status.slice(1);
    
    return `
        <div class="order-item" data-status="${order.status}">
            <div class="order-header">
                <div>
                    <div class="order-id">${order.id}</div>
                    <div class="order-date">${new Date(order.date).toLocaleDateString()}</div>
                </div>
                <span class="status-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="order-products">
                ${order.products.map(product => `
                    <div class="order-product-item">
                        <img src="${product.image}" alt="${product.name}" class="order-product-image">
                        <div class="order-product-info">
                            <p class="order-product-name">${product.name}</p>
                            <p class="order-product-price">$${product.price.toFixed(2)}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-footer">
                <div class="order-total">$${order.total.toFixed(2)}</div>
                <div class="order-actions">
                    <button class="btn btn-outline btn-sm" onclick="viewOrder('${order.id}')">View</button>
                    ${order.status === 'pending' ? `<button class="btn btn-primary btn-sm" onclick="trackOrder('${order.id}')">Track</button>` : ''}
                </div>
            </div>
        </div>
    `;
}

// User Wishlist
function loadUserWishlist() {
    const wishlistGrid = document.getElementById('wishlistGrid');
    if (!wishlistGrid) return;
    
    // Get wishlist from localStorage or use sample data
    const wishlistItems = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (wishlistItems.length === 0) {
        wishlistGrid.innerHTML = '<p style="text-align: center; padding: var(--spacing-lg); color: var(--text-secondary);">Your wishlist is empty</p>';
        return;
    }
    
    // Load products from data.js if available
    if (typeof products !== 'undefined') {
        const wishlistProducts = products.filter(p => wishlistItems.includes(p.id));
        wishlistGrid.innerHTML = wishlistProducts.map(product => createWishlistCard(product)).join('');
    }
}

function createWishlistCard(product) {
    return `
        <div class="product-card">
            <div class="product-card-image-wrapper">
                <img src="${product.thumbnail}" alt="${product.name}" class="product-card-image">
            </div>
            <div class="product-card-content">
                <div class="product-card-category">${product.category}</div>
                <h3 class="product-card-title">
                    <a href="product-details.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-card-price">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1rem;" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Admin Orders
function loadAdminOrders() {
    const ordersTable = document.getElementById('ordersTable');
    const recentOrdersTable = document.getElementById('recentOrdersTable');
    
    if (!ordersTable && !recentOrdersTable) return;
    
    const orders = [
        { id: 'ORD-2024-001', customer: 'John Doe', products: 'Diamond Bangle', total: 2799.99, status: 'delivered', date: '2024-01-15' },
        { id: 'ORD-2024-002', customer: 'Jane Smith', products: 'Gold Necklace', total: 1599.99, status: 'processing', date: '2024-01-20' },
        { id: 'ORD-2024-003', customer: 'Mike Johnson', products: 'Pearl Earrings', total: 899.99, status: 'pending', date: '2024-01-25' },
        { id: 'ORD-2024-004', customer: 'Sarah Williams', products: 'Diamond Ring', total: 3499.99, status: 'delivered', date: '2024-01-18' },
        { id: 'ORD-2024-005', customer: 'David Brown', products: 'Platinum Bracelet', total: 2199.99, status: 'processing', date: '2024-01-22' }
    ];
    
    const tableRows = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.products}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="status-badge ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editOrder('${order.id}')">Edit</button>
                    <button class="action-btn delete" onclick="deleteOrder('${order.id}')">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    if (recentOrdersTable) {
        recentOrdersTable.innerHTML = tableRows;
    }
    
    if (ordersTable) {
        ordersTable.innerHTML = tableRows;
    }
}

// Admin Products
function loadAdminProducts() {
    const productsTable = document.getElementById('productsTable');
    if (!productsTable) return;
    
    if (typeof products !== 'undefined') {
        const tableRows = products.slice(0, 10).map(product => `
            <tr>
                <td>${product.id}</td>
                <td><img src="${product.thumbnail}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: var(--radius-sm);"></td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td><span class="status-badge ${product.stock > 0 ? 'delivered' : 'pending'}">${product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn edit" onclick="editProduct(${product.id})">Edit</button>
                        <button class="action-btn delete" onclick="deleteProduct(${product.id})">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
        
        productsTable.innerHTML = tableRows;
    }
}

// Admin Customers
function loadAdminCustomers() {
    const customersTable = document.getElementById('customersTable');
    if (!customersTable) return;
    
    const customers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1 555-0101', orders: 12, total: 4299.99, status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+1 555-0102', orders: 8, total: 2899.99, status: 'active' },
        { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '+1 555-0103', orders: 5, total: 1599.99, status: 'active' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', phone: '+1 555-0104', orders: 15, total: 5499.99, status: 'active' },
        { id: 5, name: 'David Brown', email: 'david@example.com', phone: '+1 555-0105', orders: 3, total: 899.99, status: 'inactive' }
    ];
    
    const tableRows = customers.map(customer => `
        <tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.orders}</td>
            <td>$${customer.total.toFixed(2)}</td>
            <td><span class="status-badge ${customer.status}">${customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editCustomer(${customer.id})">Edit</button>
                    <button class="action-btn delete" onclick="deleteCustomer(${customer.id})">Delete</button>
                </div>
            </td>
        </tr>
    `).join('');
    
    customersTable.innerHTML = tableRows;
}

// Load Categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGridAdmin');
    if (!categoriesGrid) return;
    
    const categories = [
        { id: 1, name: 'Necklaces', count: 24, description: 'Elegant necklaces for every occasion' },
        { id: 2, name: 'Earrings', count: 18, description: 'Beautiful earrings to complement your style' },
        { id: 3, name: 'Rings', count: 22, description: 'Stunning rings for special moments' },
        { id: 4, name: 'Bracelets', count: 15, description: 'Charming bracelets to adorn your wrist' }
    ];
    
    categoriesGrid.innerHTML = categories.map(category => `
        <div class="category-card-admin">
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <p style="color: var(--primary-color); font-weight: 600; margin-top: var(--spacing-xs);">${category.count} Products</p>
            <div class="category-card-actions">
                <button class="action-btn edit" onclick="editCategory(${category.id})">Edit</button>
                <button class="action-btn delete" onclick="deleteCategory(${category.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Load Reviews
function loadReviews() {
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    const reviews = [
        { id: 1, user: 'John Doe', product: 'Diamond Bangle', rating: 5, comment: 'Absolutely stunning! The quality is exceptional.', date: '2024-01-15' },
        { id: 2, user: 'Jane Smith', product: 'Gold Necklace', rating: 4, comment: 'Beautiful piece, very satisfied with my purchase.', date: '2024-01-18' },
        { id: 3, user: 'Mike Johnson', product: 'Pearl Earrings', rating: 5, comment: 'Perfect gift for my wife. She loves it!', date: '2024-01-20' }
    ];
    
    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-user">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(review.user)}&background=d4af37&color=fff" alt="${review.user}">
                    <div>
                        <div style="font-weight: 600;">${review.user}</div>
                        <div style="font-size: 0.875rem; color: var(--text-secondary);">${review.product}</div>
                    </div>
                </div>
                <div>
                    <div class="review-stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                    <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                </div>
            </div>
            <p style="margin-top: var(--spacing-sm); color: var(--text-primary);">${review.comment}</p>
            <div style="margin-top: var(--spacing-sm); display: flex; gap: var(--spacing-xs);">
                <button class="action-btn edit" onclick="approveReview(${review.id})">Approve</button>
                <button class="action-btn delete" onclick="deleteReview(${review.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

// Order Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterOrders(filter);
        });
    });
});

function filterOrders(filter) {
    const orderItems = document.querySelectorAll('.order-item');
    orderItems.forEach(item => {
        if (filter === 'all' || item.dataset.status === filter) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Form Handling
function initForms() {
    // Profile Form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof Toast !== 'undefined') {
                Toast.show('Profile updated successfully!', 'success');
            }
        });
    }
    
    // Password Form
    const passwordForm = document.getElementById('passwordForm');
    if (passwordForm) {
        passwordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof Toast !== 'undefined') {
                Toast.show('Password updated successfully!', 'success');
            }
        });
    }
    
    // Avatar Upload
    const avatarInput = document.getElementById('avatarInput');
    if (avatarInput) {
        avatarInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const avatarPreview = document.getElementById('avatarPreview');
                    if (avatarPreview) {
                        avatarPreview.src = e.target.result;
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    // Add Address Button
    const addAddressBtn = document.getElementById('addAddressBtn');
    if (addAddressBtn) {
        addAddressBtn.addEventListener('click', () => {
            showAddAddressModal();
        });
    }
}

// Address Management
function loadAddresses() {
    const addressList = document.getElementById('addressList');
    if (!addressList) return;
    
    const addresses = [
        {
            id: 1,
            title: 'Home',
            name: 'John Doe',
            street: '123 Main Street',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            phone: '+1 555-123-4567',
            default: true
        },
        {
            id: 2,
            title: 'Work',
            name: 'John Doe',
            street: '456 Business Ave',
            city: 'New York',
            state: 'NY',
            zip: '10002',
            phone: '+1 555-123-4568',
            default: false
        }
    ];
    
    addressList.innerHTML = addresses.map(address => `
        <div class="address-card ${address.default ? 'default' : ''}">
            <div class="address-card-header">
                <h3 class="address-card-title">${address.title}</h3>
                ${address.default ? '<span class="default-badge">Default</span>' : ''}
            </div>
            <p>${address.name}<br>${address.street}<br>${address.city}, ${address.state} ${address.zip}<br>${address.phone}</p>
            <div class="address-card-actions">
                <button class="btn btn-outline btn-sm" onclick="editAddress(${address.id})">Edit</button>
                ${!address.default ? `<button class="btn btn-outline btn-sm" onclick="setDefaultAddress(${address.id})">Set as Default</button>` : ''}
                <button class="btn btn-outline btn-sm" style="color: var(--error);" onclick="deleteAddress(${address.id})">Delete</button>
            </div>
        </div>
    `).join('');
}

function showAddAddressModal() {
    if (typeof Modal !== 'undefined') {
        const modal = new Modal('addAddressModal', { closable: true, backdrop: true });
        modal.create(`
            <h2>Add New Address</h2>
            <form id="newAddressForm">
                <div class="form-group">
                    <label>Address Title</label>
                    <input type="text" name="title" placeholder="Home, Work, etc." required>
                </div>
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" required>
                </div>
                <div class="form-group">
                    <label>Street Address</label>
                    <input type="text" name="street" required>
                </div>
                <div class="form-group">
                    <label>City</label>
                    <input type="text" name="city" required>
                </div>
                <div class="form-group">
                    <label>State</label>
                    <input type="text" name="state" required>
                </div>
                <div class="form-group">
                    <label>ZIP Code</label>
                    <input type="text" name="zip" required>
                </div>
                <div class="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" required>
                </div>
                <div class="form-group">
                    <label>
                        <input type="checkbox" name="default"> Set as default address
                    </label>
                </div>
                <button type="submit" class="btn btn-primary">Add Address</button>
            </form>
        `);
        
        document.getElementById('newAddressForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (typeof Toast !== 'undefined') {
                Toast.show('Address added successfully!', 'success');
            }
            modal.close();
            loadAddresses();
        });
    }
}

// Action Functions
function viewOrder(orderId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Viewing order ${orderId}`, 'info');
    }
}

function trackOrder(orderId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Tracking order ${orderId}`, 'info');
    }
}

function editOrder(orderId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Editing order ${orderId}`, 'info');
    }
}

function deleteOrder(orderId) {
    if (confirm('Are you sure you want to delete this order?')) {
        if (typeof Toast !== 'undefined') {
            Toast.show('Order deleted successfully', 'success');
        }
    }
}

function editProduct(productId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Editing product ${productId}`, 'info');
    }
}

function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        if (typeof Toast !== 'undefined') {
            Toast.show('Product deleted successfully', 'success');
        }
    }
}

function editCustomer(customerId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Editing customer ${customerId}`, 'info');
    }
}

function deleteCustomer(customerId) {
    if (confirm('Are you sure you want to delete this customer?')) {
        if (typeof Toast !== 'undefined') {
            Toast.show('Customer deleted successfully', 'success');
        }
    }
}

function editCategory(categoryId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Editing category ${categoryId}`, 'info');
    }
}

function deleteCategory(categoryId) {
    if (confirm('Are you sure you want to delete this category?')) {
        if (typeof Toast !== 'undefined') {
            Toast.show('Category deleted successfully', 'success');
        }
    }
}

function approveReview(reviewId) {
    if (typeof Toast !== 'undefined') {
        Toast.show('Review approved', 'success');
    }
}

function deleteReview(reviewId) {
    if (confirm('Are you sure you want to delete this review?')) {
        if (typeof Toast !== 'undefined') {
            Toast.show('Review deleted successfully', 'success');
        }
    }
}

function editAddress(addressId) {
    if (typeof Toast !== 'undefined') {
        Toast.show(`Editing address ${addressId}`, 'info');
    }
}

function setDefaultAddress(addressId) {
    if (typeof Toast !== 'undefined') {
        Toast.show('Default address updated', 'success');
    }
    loadAddresses();
}

function deleteAddress(addressId) {
    if (confirm('Are you sure you want to delete this address?')) {
        if (typeof Toast !== 'undefined') {
            Toast.show('Address deleted successfully', 'success');
        }
        loadAddresses();
    }
}

// Load addresses on page load
document.addEventListener('DOMContentLoaded', () => {
    loadAddresses();
});

