// Checkout Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    initBreadcrumbs();
    loadOrderSummary();
    initCheckoutForm();
});

function initBreadcrumbs() {
    const container = document.getElementById('breadcrumbs');
    if (container) {
        const breadcrumbs = createBreadcrumbs([
            { text: 'Home', url: 'index.html' },
            { text: 'Cart', url: 'cart.html' },
            { text: 'Checkout', url: 'checkout.html' }
        ]);
        container.appendChild(breadcrumbs);
    }
}

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemsContainer = document.getElementById('orderItems');
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    if (itemsContainer) {
        itemsContainer.innerHTML = '';
        cart.forEach(item => {
            const product = productsData.find(p => p.id === item.id);
            if (!product) return;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="order-item-image">
                    <img src="${item.thumbnail && (item.thumbnail.startsWith('http') || item.thumbnail.startsWith('assets/')) ? item.thumbnail : `assets/images/products/${item.thumbnail || 'placeholder.jpg'}`}" 
                         alt="${item.name}"
                         onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'100\\' height=\\'100\\'/%3E%3C/svg%3E'">
                </div>
                <div class="order-item-info">
                    <div class="order-item-name">${item.name}</div>
                    <div class="order-item-details">Qty: ${item.quantity}</div>
                </div>
                <div class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            `;
            itemsContainer.appendChild(orderItem);
        });
    }
    
    updateOrderTotals();
}

function updateOrderTotals() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 500 ? 0 : 25;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    const subtotalEl = document.getElementById('orderSubtotal');
    const shippingEl = document.getElementById('orderShipping');
    const taxEl = document.getElementById('orderTax');
    const totalEl = document.getElementById('orderTotal');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
}

function toggleShippingAddress() {
    const checkbox = document.getElementById('sameAsBilling');
    const shippingDiv = document.getElementById('shippingAddress');
    if (checkbox && shippingDiv) {
        shippingDiv.style.display = checkbox.checked ? 'none' : 'block';
    }
}

function initCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            processOrder();
        });
    }
    
    // Payment method change handler
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const cardDetails = document.getElementById('cardDetails');
            if (cardDetails) {
                cardDetails.style.display = e.target.value === 'card' ? 'block' : 'none';
            }
        });
    });
}

function processOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        Toast.show('Your cart is empty', 'error');
        return;
    }
    
    // Simulate order processing
    Toast.show('Processing your order...', 'info');
    
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');
        updateCartBadge();
        
        // Redirect to success page
        window.location.href = 'order-success.html';
    }, 2000);
}

