// Product Details Page JavaScript

let currentProduct = null;
let currentImageIndex = 0;
let quantity = 1;

document.addEventListener('DOMContentLoaded', () => {
    loadProduct();
    initAccordions();
});

function loadProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        showError('Product not found');
        return;
    }
    
    currentProduct = productsData.find(p => p.id === productId);
    
    if (!currentProduct) {
        showError('Product not found');
        return;
    }
    
    renderProduct();
    loadRelatedProducts();
    loadReviews();
    initBreadcrumbs();
}

function initBreadcrumbs() {
    const container = document.getElementById('breadcrumbs');
    if (!container || !currentProduct) return;
    
    const breadcrumbs = createBreadcrumbs([
        { text: 'Home', url: 'index.html' },
        { text: 'Shop', url: 'shop.html' },
        { text: currentProduct.category.charAt(0).toUpperCase() + currentProduct.category.slice(1), url: `category-${currentProduct.category}.html` },
        { text: currentProduct.name, url: '#' }
    ]);
    container.appendChild(breadcrumbs);
}

function renderProduct() {
    const layout = document.getElementById('productDetailsLayout');
    if (!layout || !currentProduct) return;
    
    const isWishlisted = isInWishlist(currentProduct.id);
    
    layout.innerHTML = `
        <div class="product-gallery" data-aos="fade-right">
            <div class="main-image" id="mainImage" onclick="openImageZoom()">
                <img src="${currentProduct.images[0].startsWith('http') || currentProduct.images[0].startsWith('assets/') ? currentProduct.images[0] : `assets/images/products/${currentProduct.images[0]}`}" 
                     alt="${currentProduct.name}" 
                     id="mainImageSrc"
                     onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 400 400\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'400\\' height=\\'400\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23999\\' font-family=\\'sans-serif\\' font-size=\\'20\\'%3E${currentProduct.name}%3C/text%3E%3C/svg%3E'">
            </div>
            <div class="thumbnail-gallery">
                ${currentProduct.images.map((img, index) => {
                    const imgUrl = img.startsWith('http') || img.startsWith('assets/') ? img : `assets/images/products/${img}`;
                    return `
                    <div class="thumbnail-item ${index === 0 ? 'active' : ''}" 
                         onclick="changeMainImage(${index})">
                        <img src="${imgUrl}" 
                             alt="${currentProduct.name} ${index + 1}"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 200 200\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'200\\' height=\\'200\\'/%3E%3C/svg%3E'">
                    </div>
                `;
                }).join('')}
            </div>
        </div>
        
        <div class="product-info" data-aos="fade-left">
            <div class="product-badges">
                ${currentProduct.discount > 0 ? `<span class="product-badge">${currentProduct.discount}% Off Today</span>` : ''}
                ${currentProduct.stock < 10 && currentProduct.stock > 0 ? `<span class="product-badge warning">Limited Stock</span>` : ''}
            </div>
            
            <div class="product-category">${currentProduct.category}</div>
            <h1 class="product-title">${currentProduct.name}</h1>
            
            <div class="product-price-section">
                <span class="product-price">$${currentProduct.price.toFixed(2)}</span>
                ${currentProduct.oldPrice ? `<span class="product-price-old">$${currentProduct.oldPrice.toFixed(2)}</span>` : ''}
                ${currentProduct.discount > 0 ? `<span class="product-price-discount">Save ${currentProduct.discount}%</span>` : ''}
            </div>
            
            <p class="product-description">${currentProduct.description}</p>
            
            <div class="product-specs">
                <table class="specs-table">
                    <tr>
                        <td>Material</td>
                        <td>${currentProduct.material}</td>
                    </tr>
                    <tr>
                        <td>Purity</td>
                        <td>${currentProduct.purity}</td>
                    </tr>
                    <tr>
                        <td>Weight</td>
                        <td>${currentProduct.weight}</td>
                    </tr>
                    <tr>
                        <td>Collection</td>
                        <td>${currentProduct.collection.charAt(0).toUpperCase() + currentProduct.collection.slice(1)}</td>
                    </tr>
                    <tr>
                        <td>Availability</td>
                        <td>${currentProduct.inStock ? `In Stock (${currentProduct.stock} available)` : 'Out of Stock'}</td>
                    </tr>
                </table>
            </div>
            
            <div class="product-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn" onclick="decreaseQuantity()">
                        <i class="feather-minus"></i>
                    </button>
                    <input type="number" class="quantity-input" id="quantityInput" value="1" min="1" max="${currentProduct.stock}" onchange="updateQuantity(this.value)">
                    <button class="quantity-btn" onclick="increaseQuantity()">
                        <i class="feather-plus"></i>
                    </button>
                </div>
                
                <div class="product-action-buttons">
                    <button class="btn btn-primary btn-lg" onclick="addToCartFromDetails()" ${!currentProduct.inStock ? 'disabled' : ''}>
                        <i class="feather-shopping-cart"></i> Add to Cart
                    </button>
                    <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                            onclick="toggleWishlist()" 
                            aria-label="Wishlist">
                        <i class="feather-heart"></i>
                    </button>
                </div>
            </div>
            
            <div class="shipping-info">
                <div class="shipping-item">
                    <i class="feather-truck"></i>
                    <span>Free shipping on orders over $500</span>
                </div>
                <div class="shipping-item">
                    <i class="feather-shield"></i>
                    <span>Lifetime warranty included</span>
                </div>
                <div class="shipping-item">
                    <i class="feather-refresh-cw"></i>
                    <span>30-day return policy</span>
                </div>
            </div>
            
            <div class="accordions">
                <div class="accordion active">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <h4>Shipping & Returns</h4>
                        <i class="feather-chevron-down accordion-icon"></i>
                    </div>
                    <div class="accordion-content">
                        <p>We offer free shipping on all orders over $500. Standard shipping takes 5-7 business days. Express shipping (2-3 business days) is available for an additional fee. All items come with a 30-day return policy. Items must be in original condition with tags attached.</p>
                    </div>
                </div>
                
                <div class="accordion">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <h4>Care Instructions</h4>
                        <i class="feather-chevron-down accordion-icon"></i>
                    </div>
                    <div class="accordion-content">
                        <p>To maintain the beauty of your jewellery, clean regularly with a soft cloth. Avoid contact with harsh chemicals, perfumes, and lotions. Store in a soft pouch or jewellery box when not in use. For professional cleaning, visit our store or an authorized jeweller.</p>
                    </div>
                </div>
                
                <div class="accordion">
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        <h4>Warranty Information</h4>
                        <i class="feather-chevron-down accordion-icon"></i>
                    </div>
                    <div class="accordion-content">
                        <p>All our jewellery comes with a lifetime warranty covering manufacturing defects. This warranty does not cover damage from accidents, normal wear and tear, or loss. For warranty claims, please contact our customer service with your purchase receipt.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function changeMainImage(index) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImageSrc');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (mainImage && currentProduct) {
        const imgPath = currentProduct.images[index];
        mainImage.src = imgPath.startsWith('http') || imgPath.startsWith('assets/') ? imgPath : `assets/images/products/${imgPath}`;
    }
    
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

function openImageZoom() {
    if (!currentProduct) return;
    
    const modal = new Modal('imageZoomModal', { closable: true, backdrop: true });
    const imgPath = currentProduct.images[currentImageIndex];
    const imgUrl = imgPath.startsWith('http') || imgPath.startsWith('assets/') ? imgPath : `assets/images/products/${imgPath}`;
    modal.create(`
        <div class="image-zoom-content">
            <img src="${imgUrl}" 
                 alt="${currentProduct.name}" 
                 style="max-width: 90vw; max-height: 90vh; object-fit: contain;">
        </div>
    `);
}

function increaseQuantity() {
    if (currentProduct && quantity < currentProduct.stock) {
        quantity++;
        updateQuantityInput();
    }
}

function decreaseQuantity() {
    if (quantity > 1) {
        quantity--;
        updateQuantityInput();
    }
}

function updateQuantity(value) {
    const numValue = parseInt(value);
    if (numValue >= 1 && numValue <= (currentProduct?.stock || 999)) {
        quantity = numValue;
        updateQuantityInput();
    }
}

function updateQuantityInput() {
    const input = document.getElementById('quantityInput');
    if (input) {
        input.value = quantity;
    }
}

function addToCartFromDetails() {
    if (!currentProduct) return;
    
    for (let i = 0; i < quantity; i++) {
        addToCart(currentProduct.id, 1);
    }
    
    Toast.show(`${quantity} x ${currentProduct.name} added to cart`, 'success');
}

function toggleWishlist() {
    if (!currentProduct) return;
    
    const btn = document.querySelector('.wishlist-btn');
    if (isInWishlist(currentProduct.id)) {
        removeFromWishlist(currentProduct.id);
        if (btn) btn.classList.remove('active');
    } else {
        addToWishlist(currentProduct.id);
        if (btn) btn.classList.add('active');
    }
}

function loadRelatedProducts() {
    const container = document.getElementById('relatedProducts');
    if (!container || !currentProduct) return;
    
    const related = productsData
        .filter(p => p.id !== currentProduct.id && (p.category === currentProduct.category || p.collection === currentProduct.collection))
        .slice(0, 4);
    
    const carousel = document.createElement('div');
    carousel.className = 'carousel-container';
    
    related.forEach(product => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.appendChild(createProductCard(product));
        carousel.appendChild(item);
    });
    
    container.appendChild(carousel);
}

function loadReviews() {
    const container = document.getElementById('reviewsContainer');
    if (!container) return;
    
    // Sample reviews
    const reviews = [
        {
            author: 'Sarah Johnson',
            rating: 5,
            date: '2024-03-10',
            text: 'Absolutely stunning piece! The quality is exceptional and it arrived beautifully packaged. Exceeded all my expectations.'
        },
        {
            author: 'Emily Chen',
            rating: 5,
            date: '2024-03-05',
            text: 'I\'ve received so many compliments on this. The craftsmanship is evident in every detail. Highly recommend!'
        },
        {
            author: 'Michael Thompson',
            rating: 4,
            date: '2024-02-28',
            text: 'Beautiful piece, exactly as described. Fast shipping and excellent customer service. Very satisfied with my purchase.'
        }
    ];
    
    container.innerHTML = `
        <div class="reviews-header">
            <h2 class="section-title">Customer Reviews</h2>
            <button class="btn btn-primary" onclick="openReviewModal()">Write a Review</button>
        </div>
        <div class="reviews-list">
            ${reviews.map(review => `
                <div class="review-card" data-aos="fade-up">
                    <div class="review-header">
                        <div>
                            <div class="review-author">${review.author}</div>
                            <div class="review-date">${new Date(review.date).toLocaleDateString()}</div>
                        </div>
                        <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                    </div>
                    <p class="review-text">${review.text}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function toggleAccordion(header) {
    const accordion = header.closest('.accordion');
    const isActive = accordion.classList.contains('active');
    
    document.querySelectorAll('.accordion').forEach(acc => {
        acc.classList.remove('active');
    });
    
    if (!isActive) {
        accordion.classList.add('active');
    }
}

function initAccordions() {
    // Accordions are initialized in renderProduct
}

function openReviewModal() {
    const modal = new Modal('reviewModal', { closable: true, backdrop: true });
    modal.create(`
        <div class="review-form-content">
            <h2>Write a Review</h2>
            <form id="reviewForm">
                <div class="form-group">
                    <label>Rating</label>
                    <div class="rating-input" id="ratingInput">
                        ${[1,2,3,4,5].map(i => `<span class="star" data-rating="${i}" onclick="setRating(${i})">☆</span>`).join('')}
                    </div>
                </div>
                <div class="form-group">
                    <label>Your Review</label>
                    <textarea rows="5" required></textarea>
                </div>
                <div class="form-group">
                    <label>Your Name</label>
                    <input type="text" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit Review</button>
            </form>
        </div>
    `);
    
    document.getElementById('reviewForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        Toast.show('Thank you for your review!', 'success');
        modal.close();
    });
}

function setRating(rating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.textContent = '★';
            star.style.color = 'var(--primary-color)';
        } else {
            star.textContent = '☆';
            star.style.color = 'var(--text-light)';
        }
    });
}

function showError(message) {
    const layout = document.getElementById('productDetailsLayout');
    if (layout) {
        layout.innerHTML = `
            <div class="error-state" style="text-align: center; padding: 4rem 2rem;">
                <i class="feather-alert-circle" style="font-size: 4rem; color: var(--error); margin-bottom: 1rem;"></i>
                <h2>${message}</h2>
                <p>Please try again or return to <a href="shop.html">shop</a>.</p>
            </div>
        `;
    }
}

