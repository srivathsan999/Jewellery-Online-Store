// Cart Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initBreadcrumbs();
    loadCart();
    window.addEventListener('cartUpdated', loadCart);
});

function initBreadcrumbs() {
    const container = document.getElementById('breadcrumbs');
    if (container) {
        const breadcrumbs = createBreadcrumbs([
            { text: 'Home', url: 'index.html' },
            { text: 'Cart', url: 'cart.html' }
        ]);
        container.appendChild(breadcrumbs);
    }
}

function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">
                    <i class="feather-shopping-cart"></i>
                </div>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added anything to your cart yet.</p>
                <a href="shop.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        updateSummary();
        return;
    }
    
    cartItems.innerHTML = '';
    
    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.id);
        if (!product) return;
        
        // Handle image URL - support both local and external URLs
        const thumbnail = item.thumbnail || product.thumbnail || 'placeholder.jpg';
        const imageUrl = thumbnail.startsWith('http') || thumbnail.startsWith('assets/') 
            ? thumbnail 
            : `assets/images/products/${thumbnail}`;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.productId = item.id;
        
        cartItem.innerHTML = `
            <button class="cart-item-remove-btn" onclick="removeCartItem(${item.id})" aria-label="Remove item">
                <i data-feather="x"></i>
            </button>
            <div class="cart-item-image">
                <img src="${imageUrl}" 
                     alt="${item.name}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 400 400\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'400\\' height=\\'400\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23999\\' font-family=\\'sans-serif\\' font-size=\\'20\\'%3E${encodeURIComponent(item.name)}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-title">
                    <a href="product-details.html?id=${item.id}">${item.name}</a>
                </h3>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity - 1})">
                        <i data-feather="minus"></i>
                    </button>
                    <input type="number" value="${item.quantity}" min="1" 
                           onchange="updateCartItemQuantity(${item.id}, parseInt(this.value))">
                    <button onclick="updateCartItemQuantity(${item.id}, ${item.quantity + 1})">
                        <i data-feather="plus"></i>
                    </button>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem; margin-top: 1rem;">
                    <span style="font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Initialize Feather Icons for quantity buttons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    updateSummary();
}

function updateCartItemQuantity(productId, quantity) {
    if (quantity < 1) {
        removeCartItem(productId);
        return;
    }
    
    const product = productsData.find(p => p.id === productId);
    if (product && quantity > product.stock) {
        Toast.show(`Only ${product.stock} available in stock`, 'warning');
        quantity = product.stock;
    }
    
    updateCartQuantity(productId, quantity);
    loadCart();
}

function removeCartItem(productId) {
    removeFromCart(productId);
    loadCart();
}

function updateSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // If cart is empty, shipping should be 0, otherwise calculate based on subtotal
    const shipping = cart.length === 0 ? 0 : (subtotal >= 500 ? 0 : 25);
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    
    // Format function to show $00.00 instead of $0.00
    const formatPrice = (amount) => {
        if (amount === 0) {
            return '$00.00';
        }
        return `$${amount.toFixed(2)}`;
    };
    
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

function applyCoupon() {
    const code = document.getElementById('couponCode')?.value;
    if (!code) {
        Toast.show('Please enter a coupon code', 'warning');
        return;
    }
    
    // Demo coupon codes
    const coupons = {
        'SAVE10': 0.1,
        'WELCOME20': 0.2,
        'LUXURY15': 0.15
    };
    
    if (coupons[code.toUpperCase()]) {
        Toast.show(`Coupon "${code}" applied! ${(coupons[code.toUpperCase()] * 100).toFixed(0)}% discount`, 'success');
        localStorage.setItem('couponCode', code.toUpperCase());
        localStorage.setItem('couponDiscount', coupons[code.toUpperCase()]);
    } else {
        Toast.show('Invalid coupon code', 'error');
    }
}

function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Toast.show('Your cart is empty', 'warning');
        return;
    }
    window.location.href = 'checkout.html';
}

