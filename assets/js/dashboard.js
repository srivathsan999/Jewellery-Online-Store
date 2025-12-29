// Dashboard JavaScript - User and Admin Dashboard Functionality

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initUserDashboard();
    initAdminDashboard();
    initTabSwitching();
    initForms();
    loadDashboardData();
});

// Chart instances storage
let chartInstances = {
    revenue: null,
    orders: null,
    category: null
};

// User Dashboard Functions
function initUserDashboard() {
    const menuItems = document.querySelectorAll('.account-menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.getAttribute('data-tab');
            switchTab(tab);
            
            // Update active state
            menuItems.forEach(mi => mi.classList.remove('active'));
            item.classList.add('active');
            
            // Close sidebar on mobile after selecting menu item
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('accountSidebar');
                const overlay = document.querySelector('.account-sidebar-overlay');
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('accountMenuToggle');
    const sidebar = document.getElementById('accountSidebar');
    const sidebarClose = document.getElementById('accountSidebarClose');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.account-sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'account-sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) {
                overlay.classList.toggle('active');
            }
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            // Re-initialize Feather Icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            // Re-initialize Feather Icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    }
    
    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close sidebar on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && sidebar) {
                sidebar.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        }, 250);
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
            
            // Close sidebar on mobile after selecting menu item
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById('adminSidebar');
                const overlay = document.querySelector('.admin-sidebar-overlay');
                if (sidebar) {
                    sidebar.classList.remove('active');
                }
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
        });
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('adminMenuToggle');
    const sidebar = document.getElementById('adminSidebar');
    const sidebarClose = document.getElementById('adminSidebarClose');
    
    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.admin-sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'admin-sidebar-overlay';
        document.body.appendChild(overlay);
    }
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            if (overlay) {
                overlay.classList.toggle('active');
            }
            if (sidebar.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            // Re-initialize Feather Icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    }
    
    if (sidebarClose && sidebar) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
            // Re-initialize Feather Icons
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        });
    }
    
    if (overlay && sidebar) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close sidebar on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && sidebar) {
                sidebar.classList.remove('active');
                if (overlay) {
                    overlay.classList.remove('active');
                }
                document.body.style.overflow = '';
            }
            // Destroy and recreate charts on resize for proper responsiveness
            if (window.innerWidth <= 768) {
                destroyCharts();
                setTimeout(() => {
                    if (document.getElementById('analytics').classList.contains('active')) {
                        initAnalyticsCharts();
                    }
                }, 300);
            } else {
                destroyCharts();
                setTimeout(() => {
                    if (document.getElementById('analytics').classList.contains('active')) {
                        initAnalyticsCharts();
                    }
                }, 300);
            }
        }, 250);
    });
}

// Tab Switching
function initTabSwitching() {
    // User dashboard tabs
    const userTabs = document.querySelectorAll('.dashboard-tab');
    function switchTab(tabName) {
        userTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
        }
    }
    window.switchTab = switchTab;
    
    // Admin dashboard tabs
    function switchAdminTab(tabName) {
        const adminTabs = document.querySelectorAll('.admin-tab');
        adminTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        const targetTab = document.getElementById(tabName);
        if (targetTab) {
            targetTab.classList.add('active');
            
            // Initialize charts when switching to analytics tab
            if (tabName === 'analytics') {
                setTimeout(() => {
                    initAnalyticsCharts();
                }, 100);
            }
        }
    }
    window.switchAdminTab = switchAdminTab;
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
    // Don't initialize charts here - wait for analytics tab to be active
}

// Destroy all charts
function destroyCharts() {
    if (chartInstances.revenue) {
        chartInstances.revenue.destroy();
        chartInstances.revenue = null;
    }
    if (chartInstances.orders) {
        chartInstances.orders.destroy();
        chartInstances.orders = null;
    }
    if (chartInstances.category) {
        chartInstances.category.destroy();
        chartInstances.category = null;
    }
}

// Initialize Analytics Charts
function initAnalyticsCharts() {
    // Destroy existing charts first
    destroyCharts();
    
    // Check if Chart.js is available
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded');
        return;
    }
    
    // Get responsive font sizes based on screen width
    const getResponsiveFontSize = (baseSize) => {
        if (window.innerWidth <= 768) {
            return baseSize * 0.7; // Mobile: 70% of base
        } else if (window.innerWidth <= 1024) {
            return baseSize * 0.85; // Tablet: 85% of base
        }
        return baseSize; // Desktop: full size
    };
    
    // Get chart height based on screen width
    const getChartHeight = (baseHeight) => {
        if (window.innerWidth <= 768) {
            return baseHeight * 0.6; // Mobile: 60% of base
        } else if (window.innerWidth <= 1024) {
            return baseHeight * 0.75; // Tablet: 75% of base
        }
        return baseHeight; // Desktop: full height
    };
    
    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            intersect: false,
            mode: 'index'
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        size: getResponsiveFontSize(12),
                        family: 'Inter, sans-serif'
                    },
                    padding: window.innerWidth <= 768 ? 8 : 12,
                    usePointStyle: true,
                    boxWidth: window.innerWidth <= 768 ? 8 : 10
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                padding: window.innerWidth <= 768 ? 8 : 12,
                titleFont: {
                    size: getResponsiveFontSize(13),
                    weight: 'bold'
                },
                bodyFont: {
                    size: getResponsiveFontSize(12)
                },
                cornerRadius: 8,
                displayColors: true
            }
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: getResponsiveFontSize(11)
                    },
                    maxRotation: window.innerWidth <= 768 ? 45 : 0,
                    minRotation: window.innerWidth <= 768 ? 45 : 0
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            },
            y: {
                ticks: {
                    font: {
                        size: getResponsiveFontSize(11)
                    },
                    callback: function(value) {
                        return '$' + value.toLocaleString();
                    }
                },
                grid: {
                    display: true,
                    color: 'rgba(0, 0, 0, 0.05)'
                }
            }
        }
    };
    
    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChartCanvas');
    if (revenueCtx) {
        const revenueWrapper = revenueCtx.closest('.chart-wrapper');
        if (revenueWrapper) {
            revenueWrapper.style.height = getChartHeight(400) + 'px';
        }
        
        chartInstances.revenue = new Chart(revenueCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Revenue',
                    data: [12000, 19000, 15000, 17000, 22000, 25000, 23000],
                    borderColor: 'rgb(102, 126, 234)',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: window.innerWidth <= 768 ? 4 : 6,
                    pointHoverRadius: window.innerWidth <= 768 ? 6 : 8,
                    pointBackgroundColor: 'rgb(102, 126, 234)',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }]
            },
            options: {
                ...commonOptions,
                scales: {
                    ...commonOptions.scales,
                    y: {
                        ...commonOptions.scales.y,
                        ticks: {
                            ...commonOptions.scales.y.ticks,
                            callback: function(value) {
                                if (window.innerWidth <= 768) {
                                    return value >= 1000 ? '$' + (value / 1000).toFixed(1) + 'k' : '$' + value;
                                }
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Orders Chart
    const ordersCtx = document.getElementById('ordersChartCanvas');
    if (ordersCtx) {
        const ordersWrapper = ordersCtx.closest('.chart-wrapper');
        if (ordersWrapper) {
            ordersWrapper.style.height = getChartHeight(300) + 'px';
        }
        
        chartInstances.orders = new Chart(ordersCtx, {
            type: 'bar',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Orders',
                    data: [50, 70, 60, 65, 80, 90, 85],
                    backgroundColor: 'rgba(240, 147, 251, 0.8)',
                    borderColor: 'rgb(240, 147, 251)',
                    borderWidth: 2,
                    borderRadius: window.innerWidth <= 768 ? 4 : 6,
                    borderSkipped: false
                }]
            },
            options: commonOptions
        });
    }
    
    // Category Chart (Doughnut)
    const categoryCtx = document.getElementById('categoryChartCanvas');
    if (categoryCtx) {
        const categoryWrapper = categoryCtx.closest('.chart-wrapper');
        if (categoryWrapper) {
            categoryWrapper.style.height = getChartHeight(300) + 'px';
        }
        
        chartInstances.category = new Chart(categoryCtx, {
            type: 'doughnut',
            data: {
                labels: ['Necklaces', 'Earrings', 'Rings', 'Bracelets'],
                datasets: [{
                    data: [35, 25, 25, 15],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.8)',
                        'rgba(240, 147, 251, 0.8)',
                        'rgba(67, 233, 123, 0.8)',
                        'rgba(250, 112, 154, 0.8)'
                    ],
                    borderColor: [
                        'rgb(102, 126, 234)',
                        'rgb(240, 147, 251)',
                        'rgb(67, 233, 123)',
                        'rgb(250, 112, 154)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: window.innerWidth <= 768 ? 'bottom' : 'right',
                        labels: {
                            font: {
                                size: getResponsiveFontSize(12),
                                family: 'Inter, sans-serif'
                            },
                            padding: window.innerWidth <= 768 ? 8 : 12,
                            usePointStyle: true,
                            boxWidth: window.innerWidth <= 768 ? 8 : 10
                        }
                    },
                    tooltip: {
                        enabled: true,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: window.innerWidth <= 768 ? 8 : 12,
                        titleFont: {
                            size: getResponsiveFontSize(13),
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: getResponsiveFontSize(12)
                        },
                        cornerRadius: 8,
                        callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
}

// Make initAnalyticsCharts available globally
window.initAnalyticsCharts = initAnalyticsCharts;