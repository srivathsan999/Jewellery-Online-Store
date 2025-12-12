// Reusable Components Library

// Toast Notification System
class Toast {
    static show(message, type = 'info', duration = 3000) {
        const container = document.getElementById('toastContainer') || this.createContainer();
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = this.getIcon(type);
        toast.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Auto remove
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
        
        return toast;
    }
    
    static createContainer() {
        const container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
        return container;
    }
    
    static getIcon(type) {
        const icons = {
            success: 'feather-check-circle',
            error: 'feather-x-circle',
            warning: 'feather-alert-circle',
            info: 'feather-info'
        };
        return icons[type] || icons.info;
    }
}

// Add slideOutRight animation
if (!document.getElementById('toastAnimations')) {
    const style = document.createElement('style');
    style.id = 'toastAnimations';
    style.textContent = `
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Modal Component
class Modal {
    constructor(id, options = {}) {
        this.id = id;
        this.options = {
            closable: options.closable !== false,
            backdrop: options.backdrop !== false,
            ...options
        };
        this.element = null;
    }
    
    create(content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.id = this.id;
        modal.innerHTML = `
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                ${this.options.closable ? '<button class="modal-close" aria-label="Close">&times;</button>' : ''}
                <div class="modal-body">${content}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.element = modal;
        
        // Event listeners
        if (this.options.closable) {
            const closeBtn = modal.querySelector('.modal-close');
            const backdrop = modal.querySelector('.modal-backdrop');
            
            closeBtn.addEventListener('click', () => this.close());
            if (this.options.backdrop) {
                backdrop.addEventListener('click', () => this.close());
            }
        }
        
        // Show modal
        setTimeout(() => modal.classList.add('active'), 10);
        
        return modal;
    }
    
    close() {
        if (this.element) {
            this.element.classList.remove('active');
            setTimeout(() => this.element.remove(), 300);
        }
    }
}

// Add modal styles if not present
if (!document.getElementById('modalStyles')) {
    const style = document.createElement('style');
    style.id = 'modalStyles';
    style.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .modal.active {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: var(--white);
            border-radius: var(--radius-lg);
            max-width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-xl);
        }
        
        [data-theme="dark"] .modal-content {
            background: var(--dark-bg);
        }
        
        .modal.active .modal-content {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 40px;
            height: 40px;
            background: var(--bg-light);
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
            transition: var(--transition);
        }
        
        .modal-close:hover {
            background: var(--primary-color);
            color: var(--white);
        }
        
        .modal-body {
            padding: 2rem;
        }
    `;
    document.head.appendChild(style);
}

// Newsletter Popup
class NewsletterPopup {
    static show() {
        // Check if already shown in this session
        if (sessionStorage.getItem('newsletterShown')) return;
        
        // Show after 3 seconds
        setTimeout(() => {
            const modal = new Modal('newsletterModal', { closable: true, backdrop: true });
            modal.create(`
                <div class="newsletter-popup-content">
                    <h2>Stay in the Loop</h2>
                    <p>Subscribe to receive exclusive offers and new collection updates</p>
                    <form class="newsletter-form" id="popupNewsletterForm">
                        <input type="email" placeholder="Enter your email" required>
                        <button type="submit" class="btn btn-primary">Subscribe</button>
                    </form>
                    <button class="btn-link" onclick="sessionStorage.setItem('newsletterShown', 'true'); document.getElementById('newsletterModal').querySelector('.modal-close').click();">Maybe Later</button>
                </div>
            `);
            
            // Handle form submission
            document.getElementById('popupNewsletterForm')?.addEventListener('submit', (e) => {
                e.preventDefault();
                sessionStorage.setItem('newsletterShown', 'true');
                Toast.show('Thank you for subscribing!', 'success');
                modal.close();
            });
        }, 3000);
    }
}

// Breadcrumbs Component
function createBreadcrumbs(items) {
    const breadcrumbs = document.createElement('nav');
    breadcrumbs.className = 'breadcrumbs';
    breadcrumbs.setAttribute('aria-label', 'Breadcrumb');
    
    const list = document.createElement('ol');
    items.forEach((item, index) => {
        const li = document.createElement('li');
        if (index === items.length - 1) {
            li.className = 'active';
            li.textContent = item.text;
        } else {
            const a = document.createElement('a');
            a.href = item.url;
            a.textContent = item.text;
            li.appendChild(a);
        }
        list.appendChild(li);
    });
    
    breadcrumbs.appendChild(list);
    return breadcrumbs;
}

// Pagination Component
function createPagination(currentPage, totalPages, baseUrl) {
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
    
    // Previous button
    const prevBtn = document.createElement('a');
    prevBtn.href = currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#';
    prevBtn.className = `pagination-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '<i class="feather-chevron-left"></i>';
    prevBtn.setAttribute('aria-label', 'Previous page');
    pagination.appendChild(prevBtn);
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            const pageLink = document.createElement('a');
            pageLink.href = `${baseUrl}?page=${i}`;
            pageLink.className = `pagination-number ${i === currentPage ? 'active' : ''}`;
            pageLink.textContent = i;
            pagination.appendChild(pageLink);
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            const ellipsis = document.createElement('span');
            ellipsis.className = 'pagination-ellipsis';
            ellipsis.textContent = '...';
            pagination.appendChild(ellipsis);
        }
    }
    
    // Next button
    const nextBtn = document.createElement('a');
    nextBtn.href = currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#';
    nextBtn.className = `pagination-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = '<i class="feather-chevron-right"></i>';
    nextBtn.setAttribute('aria-label', 'Next page');
    pagination.appendChild(nextBtn);
    
    return pagination;
}

// Add pagination styles
if (!document.getElementById('paginationStyles')) {
    const style = document.createElement('style');
    style.id = 'paginationStyles';
    style.textContent = `
        .pagination {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            margin: 2rem 0;
        }
        
        .pagination-btn,
        .pagination-number {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius-md);
            background: var(--white);
            color: var(--text-primary);
            border: 1px solid var(--border-color);
            transition: var(--transition);
            text-decoration: none;
        }
        
        [data-theme="dark"] .pagination-btn,
        [data-theme="dark"] .pagination-number {
            background: var(--dark-bg);
            border-color: var(--border-color);
        }
        
        .pagination-btn:hover:not(.disabled),
        .pagination-number:hover:not(.active) {
            background: var(--primary-color);
            color: var(--white);
            border-color: var(--primary-color);
        }
        
        .pagination-number.active {
            background: var(--accent-gradient);
            color: var(--white);
            border-color: transparent;
        }
        
        .pagination-btn.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .pagination-ellipsis {
            padding: 0 0.5rem;
            color: var(--text-light);
        }
        
        .breadcrumbs {
            padding: 1rem 0;
        }
        
        .breadcrumbs ol {
            display: flex;
            list-style: none;
            gap: 0.5rem;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .breadcrumbs li {
            display: flex;
            align-items: center;
        }
        
        .breadcrumbs li:not(:last-child)::after {
            content: '/';
            margin-left: 0.5rem;
            color: var(--text-light);
        }
        
        .breadcrumbs a {
            color: var(--text-secondary);
            transition: var(--transition);
        }
        
        .breadcrumbs a:hover {
            color: var(--primary-color);
        }
        
        .breadcrumbs li.active {
            color: var(--text-primary);
            font-weight: 500;
        }
    `;
    document.head.appendChild(style);
}

// Product Card Component
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;
    
    const discountBadge = product.discount > 0 
        ? `<span class="product-badge">${product.discount}% Off</span>` 
        : '';
    
    const stockBadge = product.stock < 10 && product.stock > 0
        ? `<span class="product-badge" style="background: var(--warning);">Limited Stock</span>`
        : '';
    
    const oldPrice = product.oldPrice 
        ? `<span class="product-price-old">$${product.oldPrice.toFixed(2)}</span>` 
        : '';
    
    const imageUrl = product.thumbnail.startsWith('http') || product.thumbnail.startsWith('assets/') ? product.thumbnail : `assets/images/products/${product.thumbnail}`;
    const inWishlist = typeof window.isInWishlist !== 'undefined' && window.isInWishlist && window.isInWishlist(product.id);
    const wishlistClass = inWishlist ? ' in-wishlist' : '';
    card.innerHTML = `
        <div class="product-card-image-wrapper">
            <img src="${imageUrl}" 
                 alt="${product.name}" 
                 class="product-card-image"
                 loading="lazy"
                 onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 400 400\\'%3E%3Crect fill=\\'%23f0f0f0\\' width=\\'400\\' height=\\'400\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dy=\\'.3em\\' fill=\\'%23999\\' font-family=\\'sans-serif\\' font-size=\\'20\\'%3E${product.name}%3C/text%3E%3C/svg%3E'">
            <div class="product-card-badges">
                ${discountBadge}
                ${stockBadge}
            </div>
            <div class="product-card-actions">
                <button class="product-card-action-btn${wishlistClass}" onclick="addToWishlist(${product.id})" aria-label="Add to wishlist">
                    <i class="feather-heart"></i>
                </button>
            </div>
        </div>
        <div class="product-card-content">
            <div class="product-card-category">${product.category}</div>
            <h3 class="product-card-title">
                <a href="product-details.html?id=${product.id}">${product.name}</a>
            </h3>
            <div class="product-card-price">
                <span class="product-price">$${product.price.toFixed(2)}</span>
                ${oldPrice}
            </div>
            <button class="btn btn-primary btn-sm" style="width: 100%; margin-top: 1rem;" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Loading Spinner Component
function createSpinner(size = 40) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.width = `${size}px`;
    spinner.style.height = `${size}px`;
    return spinner;
}

// Skeleton Loader Component
function createSkeletonLoader(type = 'product') {
    const skeleton = document.createElement('div');
    skeleton.className = 'skeleton';
    
    if (type === 'product') {
        skeleton.style.height = '400px';
        skeleton.style.borderRadius = 'var(--radius-lg)';
    } else if (type === 'text') {
        skeleton.style.height = '1rem';
        skeleton.style.marginBottom = '0.5rem';
    }
    
    return skeleton;
}

// Export components
window.Toast = Toast;
window.Modal = Modal;
window.NewsletterPopup = NewsletterPopup;
window.createBreadcrumbs = createBreadcrumbs;
window.createPagination = createPagination;
window.createProductCard = createProductCard;
window.createSpinner = createSpinner;
window.createSkeletonLoader = createSkeletonLoader;

