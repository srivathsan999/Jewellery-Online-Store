// Home2 Page - Conversion-Focused Functionality

document.addEventListener('DOMContentLoaded', () => {
    loadBestsellers();
    loadTestimonials();
    initSmoothScroll();
});

// Load Bestselling Products
function loadBestsellers() {
    const bestsellersGrid = document.getElementById('bestsellersGrid');
    if (!bestsellersGrid || typeof productsData === 'undefined') return;
    
    // Get featured/trending products (bestsellers)
    const bestsellers = productsData
        .filter(product => product.featured || product.trending)
        .slice(0, 8); // Show top 8 bestsellers
    
    if (bestsellers.length === 0) {
        // Fallback to first 8 products if no featured/trending
        bestsellers.push(...productsData.slice(0, 8));
    }
    
    bestsellersGrid.innerHTML = bestsellers.map(product => createProductCard(product)).join('');
}

// Create Product Card
function createProductCard(product) {
    const discountBadge = product.discount > 0 
        ? `<span class="product-badge">-${product.discount}%</span>` 
        : '';
    
    const oldPrice = product.oldPrice 
        ? `<span class="product-old-price">$${product.oldPrice.toFixed(2)}</span>` 
        : '';
    
    return `
        <div class="product-card" data-aos="fade-up">
            <div class="product-card-image-wrapper">
                ${discountBadge}
                <img src="${product.thumbnail}" alt="${product.name}" class="product-card-image" loading="lazy">
                <div class="product-card-overlay">
                    <button class="icon-btn" onclick="addToWishlist(${product.id})" aria-label="Add to wishlist">
                        <i class="feather-heart" data-feather="heart"></i>
                    </button>
                    <a href="product-details.html?id=${product.id}" class="icon-btn" aria-label="View product">
                        <i class="feather-eye" data-feather="eye"></i>
                    </a>
                </div>
            </div>
            <div class="product-card-content">
                <div class="product-card-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-card-title">
                    <a href="product-details.html?id=${product.id}">${product.name}</a>
                </h3>
                <div class="product-card-price">
                    ${oldPrice}
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                </div>
                <button class="btn btn-primary btn-sm" onclick="addToCart(${product.id})" style="width: 100%; margin-top: 1rem;">
                    Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Load Testimonials
function loadTestimonials() {
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    if (!testimonialsSlider || typeof testimonialsData === 'undefined') return;
    
    testimonialsSlider.innerHTML = testimonialsData.map(testimonial => createTestimonialCard(testimonial)).join('');
    
    // Re-initialize feather icons for new content
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Create Testimonial Card
function createTestimonialCard(testimonial) {
    const stars = '★'.repeat(testimonial.rating) + '☆'.repeat(5 - testimonial.rating);
    
    return `
        <div class="testimonial-card" data-aos="fade-up">
            <div class="testimonial-rating" style="color: #ffc107; font-size: 1.25rem; margin-bottom: 1rem;">
                ${stars}
            </div>
            <p class="testimonial-text">"${testimonial.text}"</p>
            <div class="testimonial-author">
                <div class="testimonial-avatar">
                    <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=d4af37&color=fff&size=60" alt="${testimonial.name}">
                </div>
                <div class="testimonial-info">
                    <h4 class="testimonial-name">${testimonial.name}</h4>
                    <p class="testimonial-role">${testimonial.role}</p>
                </div>
            </div>
        </div>
    `;
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add to Cart Function (should be in main.js, but included for compatibility)
if (typeof addToCart === 'undefined') {
    window.addToCart = function(productId) {
        if (typeof Cart !== 'undefined') {
            Cart.addItem(productId);
        } else {
            // Fallback
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const product = productsData.find(p => p.id === productId);
            if (product) {
                cart.push({ id: productId, quantity: 1 });
                localStorage.setItem('cart', JSON.stringify(cart));
                if (typeof Toast !== 'undefined') {
                    Toast.show('Product added to cart!', 'success');
                }
                updateCartBadge();
            }
        }
    };
}

// Add to Wishlist Function (should be in main.js, but included for compatibility)
if (typeof addToWishlist === 'undefined') {
    window.addToWishlist = function(productId) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        if (!wishlist.includes(productId)) {
            wishlist.push(productId);
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
            if (typeof Toast !== 'undefined') {
                Toast.show('Product added to wishlist!', 'success');
            }
            updateWishlistBadge();
        } else {
            if (typeof Toast !== 'undefined') {
                Toast.show('Product already in wishlist!', 'info');
            }
        }
    };
}

// Update Cart Badge
function updateCartBadge() {
    const cartBadge = document.getElementById('cartBadge');
    if (cartBadge) {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        cartBadge.textContent = cart.length;
        cartBadge.style.display = cart.length > 0 ? 'flex' : 'none';
    }
}

// Update Wishlist Badge
function updateWishlistBadge() {
    const wishlistBadge = document.getElementById('wishlistBadge');
    if (wishlistBadge) {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        wishlistBadge.textContent = wishlist.length;
        wishlistBadge.style.display = wishlist.length > 0 ? 'flex' : 'none';
    }
}

// Initialize badges on load
document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
    updateWishlistBadge();
});

