// Home Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
    loadTrendingProducts();
    loadNewArrivals();
    loadTestimonials();
});

// Load Featured Categories
function loadCategories() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid) return;
    
    // Category-specific styling
    const categoryStyles = {
        necklaces: {
            gradient: 'linear-gradient(135deg, #D4AF37 0%, #C9A020 100%)',
            icon: 'feather-link'
        },
        earrings: {
            gradient: 'linear-gradient(135deg, #E5A5A0 0%, #D4AF37 100%)',
            icon: 'feather-circle'
        },
        rings: {
            gradient: 'linear-gradient(135deg, #D4AF37 0%, #B8941F 100%)',
            icon: 'feather-circle'
        },
        bracelets: {
            gradient: 'linear-gradient(135deg, #E5A5A0 0%, #D4AF37 100%)',
            icon: 'feather-circle'
        },
    };
    
    categoriesData.forEach(category => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-aos', 'fade-up');
        card.onclick = () => window.location.href = `category-${category.id}.html`;
        
        card.innerHTML = `
            <img src="${category.image}" alt="${category.name}" class="category-card-image">
            <div class="category-card-overlay">
                <h3 class="category-card-title">${category.name}</h3>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Load Trending Products
function loadTrendingProducts() {
    const carousel = document.getElementById('trendingCarousel');
    if (!carousel) return;
    
    // Filter out Rose Gold Cuff Bracelet (id: 24) and Art Deco Ring (id: 23) from trending products
    const trending = productsData.filter(p => p.trending && p.id !== 24 && p.id !== 23).slice(0, 6);
    const container = document.createElement('div');
    container.className = 'carousel-container';
    
    trending.forEach(product => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.appendChild(createProductCard(product));
        container.appendChild(item);
    });
    
    carousel.appendChild(container);
}

// Load New Arrivals
function loadNewArrivals() {
    const grid = document.getElementById('newArrivalsGrid');
    if (!grid) return;
    
    // Simulate new arrivals (last 3 products), excluding Rose Gold Cuff Bracelet (id: 24) and Art Deco Ring (id: 23)
    const newArrivals = productsData.filter(p => p.id !== 24 && p.id !== 23).slice(-3);
    
    newArrivals.forEach(product => {
        const card = createProductCard(product);
        card.setAttribute('data-aos', 'fade-up');
        grid.appendChild(card);
    });
}

// Load Testimonials
function loadTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    if (!slider) return;
    
    const container = document.createElement('div');
    container.className = 'carousel-container';
    
    testimonialsData.forEach((testimonial, index) => {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', index * 100);
        
        const stars = '★'.repeat(testimonial.rating);
        
        item.innerHTML = `
            <div class="testimonial-card">
                <div class="testimonial-rating">${stars}</div>
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">${testimonial.name}</div>
                <div class="testimonial-role">${testimonial.role}</div>
            </div>
        `;
        
        container.appendChild(item);
    });
    
    slider.appendChild(container);
}

