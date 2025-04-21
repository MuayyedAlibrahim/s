// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu toggle button
    const header = document.querySelector('header .container');
    const nav = document.querySelector('.main-nav');
    
    // Create the mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const mobileMenuToggle = document.createElement('div');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        
        // Insert the toggle button before the nav element
        if (nav) {
            nav.parentNode.insertBefore(mobileMenuToggle, nav);
        }
        
        // Toggle menu visibility when the button is clicked
        mobileMenuToggle.addEventListener('click', function() {
            const navMenu = document.querySelector('.main-nav ul');
            if (navMenu) {
                navMenu.classList.toggle('show');
                
                // Change icon based on menu state
                const icon = this.querySelector('i');
                if (navMenu.classList.contains('show')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const navMenu = document.querySelector('.main-nav ul');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('show') && 
            !navMenu.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
            navMenu.classList.remove('show');
            const icon = mobileMenuToggle.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Close menu when clicking on a menu item
    const menuItems = document.querySelectorAll('.main-nav ul li a');
    menuItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const navMenu = document.querySelector('.main-nav ul');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navMenu && window.innerWidth <= 767) {
                navMenu.classList.remove('show');
                const icon = mobileMenuToggle.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });
});