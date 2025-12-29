// Main JavaScript - Global Functionality

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme first to set correct icon
    initTheme();
    // Initialize Feather Icons after theme is set
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    initNavbar();
    initMobileMenu();
    initHomeDropdownActiveState();
    // Ensure menu icon is always set to three-line hamburger
    const menuToggle = document.getElementById('mobileMenuToggle');
    if (menuToggle) {
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.className = 'feather-menu';
            icon.setAttribute('data-feather', 'menu');
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }
    }
    initSmoothScroll();
    initAOS();
    initCart();
    initWishlist();
    initFooter();
});

// Theme Toggle
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Get saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        // Show moon in light mode, sun in dark mode
        const iconClass = theme === 'dark' ? 'feather-sun' : 'feather-moon';
        themeIcon.className = iconClass;
        themeIcon.setAttribute('data-feather', theme === 'dark' ? 'sun' : 'moon');
        // Re-initialize Feather Icons to update the SVG
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }
}

// Navbar Shrink Effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    let lastScroll = 0;
    const shrinkPoint = 100;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > shrinkPoint) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const toggle = document.getElementById('mobileMenuToggle');
    const menu = document.getElementById('navbarMenu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            enhanceMobileMenu();
            const isActive = menu.classList.contains('active');
            menu.classList.toggle('active');
            
            // Close all dropdowns when opening/closing menu
            if (!isActive) {
                // Menu is opening - close all dropdowns
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.opacity = '0';
                    }
                });
            }
            
            // Keep the menu icon always as three-line hamburger (don't change to X)
            const icon = toggle.querySelector('i');
            if (icon) {
                // Always keep it as menu icon
                icon.className = 'feather-menu';
                icon.setAttribute('data-feather', 'menu');
                // Re-initialize Feather Icons to render the icon
                if (typeof feather !== 'undefined') {
                    feather.replace();
                }
            }
            // Prevent body scroll when menu is open
            if (window.innerWidth <= 1024) {
                if (menu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Close menu when clicking outside (but not on dropdown toggles or dropdown items)
        document.addEventListener('click', (e) => {
            // Don't close menu if clicking on dropdown toggle, dropdown menu, or menu items
            const isDropdownToggle = e.target.closest('.dropdown-toggle');
            const isDropdownMenu = e.target.closest('.dropdown-menu');
            const isMenuItem = menu.contains(e.target);
            const isToggle = toggle.contains(e.target);
            
            if (!isMenuItem && !isToggle && !isDropdownToggle && !isDropdownMenu) {
                menu.classList.remove('active');
                const icon = toggle.querySelector('i');
                if (icon) {
                    // Always keep it as menu icon (three-line hamburger)
                    icon.className = 'feather-menu';
                    icon.setAttribute('data-feather', 'menu');
                    // Re-initialize Feather Icons to render the icon
                    if (typeof feather !== 'undefined') {
                        feather.replace();
                    }
                }
                // Restore body scroll when menu is closed
                if (window.innerWidth <= 1024) {
                    document.body.style.overflow = '';
                }
            }
        });
    }
    
    // Dropdown toggle for mobile and tablet using event delegation
    document.addEventListener('click', (e) => {
        const dropdownToggle = e.target.closest('.dropdown-toggle');
        if (dropdownToggle && window.innerWidth <= 1024) {
            e.preventDefault();
            e.stopPropagation();
            const dropdown = dropdownToggle.closest('.dropdown');
            if (dropdown) {
                // Close other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                // Toggle current dropdown
                const isActive = dropdown.classList.contains('active');
                dropdown.classList.toggle('active');
                
                // Force reflow to ensure CSS applies
                void dropdown.offsetHeight;
                
                // Ensure dropdown menu is visible
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    if (dropdown.classList.contains('active')) {
                        dropdownMenu.style.display = 'block';
                        dropdownMenu.style.visibility = 'visible';
                        dropdownMenu.style.opacity = '1';
                        dropdownMenu.style.zIndex = '1002';
                        
                        // Make all list items and links visible
                        const listItems = dropdownMenu.querySelectorAll('li');
                        listItems.forEach(li => {
                            li.style.display = 'block';
                            li.style.visibility = 'visible';
                            li.style.opacity = '1';
                            
                            const links = li.querySelectorAll('a');
                            links.forEach(link => {
                                link.style.display = 'block';
                                link.style.visibility = 'visible';
                                link.style.opacity = '1';
                                link.style.color = '';
                                link.style.padding = '0.75rem 1.5rem';
                            });
                        });
                    } else {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.opacity = '0';
                    }
                }
            }
        } else if (window.innerWidth <= 1024) {
            // Close dropdowns when clicking outside
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        dropdownMenu.style.display = 'none';
                        dropdownMenu.style.visibility = 'hidden';
                        dropdownMenu.style.opacity = '0';
                    }
                });
            }
        }
    });
    
    // Close all dropdowns on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            const menu = document.getElementById('navbarMenu');
            if (menu) {
                menu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });
}

function enhanceMobileMenu() {
    const menu = document.getElementById('navbarMenu');
    const brand = document.querySelector('.navbar-brand');
    if (!menu) return;
    menu.querySelectorAll('.menu-search, .menu-quick, .menu-footer, .menu-header').forEach(el => el.remove());
    // Login and Register are now inside Account dropdown, no need for special centering
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Navbar Active State Handling - Highlights menu item based on current page
function initHomeDropdownActiveState() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all dropdown toggles
    document.querySelectorAll('.navbar-menu .dropdown-toggle').forEach(toggle => {
        toggle.classList.remove('active');
    });
    
    // Remove active class from all menu links (top-level links only, not dropdown items)
    document.querySelectorAll('.navbar-menu > li > a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Check if current page is a category page
    const categoryPages = ['category-necklaces.html', 'category-earrings.html', 'category-bracelets.html', 'category-rings.html'];
    const isCategoryPage = categoryPages.includes(currentPage);
    
    // Check if current page is an account page
    const accountPages = ['login.html', 'register.html', 'user-dashboard.html', 'admin-dashboard.html'];
    const isAccountPage = accountPages.includes(currentPage);
    
    // Handle category pages - highlight Categories dropdown
    if (isCategoryPage) {
        const dropdowns = document.querySelectorAll('.navbar-menu .dropdown');
        const categoriesDropdown = dropdowns[0]; // Categories is the first dropdown
        if (categoriesDropdown) {
            const categoriesToggle = categoriesDropdown.querySelector('.dropdown-toggle');
            if (categoriesToggle) {
                categoriesToggle.classList.add('active');
            }
        }
        return;
    }
    
    // Handle account pages - highlight Account dropdown
    if (isAccountPage) {
        const dropdowns = document.querySelectorAll('.navbar-menu .dropdown');
        const accountDropdown = dropdowns[1]; // Account is the second dropdown
        if (accountDropdown) {
            const accountToggle = accountDropdown.querySelector('.dropdown-toggle');
            if (accountToggle) {
                accountToggle.classList.add('active');
            }
        }
        return;
    }
    
    // Handle regular pages - highlight the matching menu link
    const menuLink = document.querySelector(`.navbar-menu a[href="${currentPage}"]`);
    if (menuLink && !menuLink.classList.contains('dropdown-toggle')) {
        menuLink.classList.add('active');
    }
    
    // Handle index.html or empty path
    if (currentPage === 'index.html' || currentPage === '') {
        const homeLink = document.querySelector('.navbar-menu a[href="index.html"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100
        });
    }
}

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    updateCartBadge();
}

function addToCart(productId, quantity = 1) {
    const product = productsData.find(p => p.id === productId);
    if (!product) {
        Toast.show('Product not found', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    Toast.show(`${product.name} added to cart`, 'success');
    
    // Trigger cart update event
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    Toast.show('Item removed from cart', 'info');
    window.dispatchEvent(new CustomEvent('cartUpdated'));
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartBadge();
            window.dispatchEvent(new CustomEvent('cartUpdated'));
        }
    }
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const count = getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Wishlist Management
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function initWishlist() {
    updateWishlistBadge();
    // Delay to ensure DOM is ready
    setTimeout(() => {
        updateAllWishlistButtons();
    }, 100);
}

function updateAllWishlistButtons() {
    document.querySelectorAll('[data-product-id]').forEach(card => {
        const productId = parseInt(card.dataset.productId);
        const isInWishlist = wishlist.some(item => item.id === productId);
        const button = card.querySelector('.product-card-action-btn');
        if (button) {
            if (isInWishlist) {
                button.classList.add('in-wishlist');
            } else {
                button.classList.remove('in-wishlist');
            }
        }
    });
}

function addToWishlist(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) {
        Toast.show('Product not found', 'error');
        return;
    }
    
    const existingItem = wishlist.find(item => item.id === productId);
    if (existingItem) {
        // Remove from wishlist
        removeFromWishlist(productId);
        updateWishlistButtonState(productId, false);
        return;
    }
    
    // Add to wishlist
    wishlist.push({
        id: product.id,
        name: product.name,
        price: product.price,
        thumbnail: product.thumbnail
    });
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    Toast.show(`${product.name} added to wishlist`, 'success');
    updateWishlistButtonState(productId, true);
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    Toast.show('Removed from wishlist', 'info');
    updateWishlistButtonState(productId, false);
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

function updateWishlistButtonState(productId, isInWishlist) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    if (card) {
        const button = card.querySelector('.product-card-action-btn');
        if (button) {
            if (isInWishlist) {
                button.classList.add('in-wishlist');
            } else {
                button.classList.remove('in-wishlist');
            }
        }
    }
}

function isInWishlist(productId) {
    return wishlist.some(item => item.id === productId);
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlistBadge');
    if (badge) {
        const count = wishlist.length;
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Quick View Modal
function quickView(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    
    const modal = new Modal('quickViewModal', { closable: true, backdrop: true });
    const content = `
        <div class="quick-view-content">
            <div class="quick-view-image">
                <img src="${product.thumbnail.startsWith('http') || product.thumbnail.startsWith('assets/') ? product.thumbnail : `assets/images/products/${product.thumbnail}`}" alt="${product.name}">
            </div>
            <div class="quick-view-info">
                <h2>${product.name}</h2>
                <div class="product-price">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    ${product.oldPrice ? `<span class="product-price-old">$${product.oldPrice.toFixed(2)}</span>` : ''}
                </div>
                <p>${product.description}</p>
                <div class="quick-view-actions">
                    <button class="btn btn-primary" onclick="addToCart(${product.id}); document.getElementById('quickViewModal').querySelector('.modal-close').click();">
                        Add to Cart
                    </button>
                    <button class="btn btn-outline" onclick="addToWishlist(${product.id})">
                        <i class="feather-heart"></i> Wishlist
                    </button>
                </div>
                <a href="product-details.html?id=${product.id}" class="btn-link">View Full Details →</a>
            </div>
        </div>
    `;
    modal.create(content);
}

// Footer Component
function initFooter() {
    const footer = document.getElementById('footer');
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-brand">
                        <a href="index.html" style="display: inline-flex; align-items: center; gap: 0.75rem; text-decoration: none; margin-bottom: 1rem;">
                            <div class="brand-icon">
                                <img src="favicon.svg" alt="Jewellery Logo" style="width: 100%; height: 100%; object-fit: contain;">
                            </div>
                            <div class="brand-content">
                                <span class="brand-text">JEWELLERY</span>
                                <span class="brand-tagline">Timeless Elegance</span>
                            </div>
                        </a>
                    </div>
                    <p>Timeless Elegance. Modern Style. We craft exquisite jewellery pieces that celebrate life's precious moments.</p>
                    <div class="footer-social">
                        <a href="#" aria-label="Facebook"><i data-feather="facebook"></i></a>
                        <a href="#" aria-label="Instagram"><i data-feather="instagram"></i></a>
                        <a href="#" aria-label="Twitter"><i data-feather="twitter"></i></a>
                        <a href="#" aria-label="Pinterest"><i data-feather="heart"></i></a>
                    </div>
                </div>
                
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="shop.html">Shop</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Categories</h3>
                    <ul class="footer-links">
                        <li><a href="category-necklaces.html">Necklaces</a></li>
                        <li><a href="category-earrings.html">Earrings</a></li>
                        <li><a href="category-rings.html">Rings</a></li>
                        <li><a href="category-bracelets.html">Bracelets</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Customer Care</h3>
                    <ul class="footer-links">
                        <li><a href="#">Shipping Info</a></li>
                        <li><a href="#">Returns & Exchanges</a></li>
                        <li><a href="#">Size Guide</a></li>
                        <li><a href="#">Care Instructions</a></li>
                        <li><a href="#">FAQ</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Newsletter</h3>
                    <p>Subscribe to get special offers and updates</p>
                    <form class="newsletter-form" id="footerNewsletterForm">
                        <input type="email" placeholder="Your email" required>
                        <button type="submit" class="btn btn-primary btn-sm">Subscribe</button>
                    </form>
                </div>
            </div>
            
            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Jewellery Online Store. All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
            </div>
        </div>
    `;
    
    // Newsletter form handler
    const form = document.getElementById('footerNewsletterForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            Toast.show('Thank you for subscribing!', 'success');
            form.reset();
        });
    }
    
    // Initialize Feather Icons for social icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

// Newsletter Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            Toast.show('Thank you for subscribing!', 'success');
            newsletterForm.reset();
        });
    }
    
});

// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    
    // Parallax effect for hero
    gsap.to('.hero-background', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: '50%',
        scale: 1.1
    });
}

// Export functions for global use
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.getCartTotal = getCartTotal;
window.getCartCount = getCartCount;
window.addToWishlist = addToWishlist;
window.removeFromWishlist = removeFromWishlist;
window.isInWishlist = isInWishlist;
window.updateAllWishlistButtons = updateAllWishlistButtons;
window.quickView = quickView;

// Listen for wishlist updates to refresh button states
window.addEventListener('wishlistUpdated', () => {
    if (typeof updateAllWishlistButtons !== 'undefined') {
        updateAllWishlistButtons();
    }
});
