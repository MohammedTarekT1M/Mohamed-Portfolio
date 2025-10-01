// Splash Screen Functionality
function initializeSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Show main content after splash screen
    setTimeout(() => {
        splashScreen.classList.add('fade-out');
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Initialize main content animations
            setTimeout(() => {
                mainContent.style.opacity = '1';
            }, 100);
        }, 800);
    }, 3200); // Total splash screen duration: 3.5 seconds
}

// Dark Mode toggle with localStorage
const toggle = document.querySelector("#darkModeToggle");

// Check for saved theme preference or respect OS preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark');
        toggle.checked = true;
    } else {
        document.body.classList.remove('dark');
        toggle.checked = false;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start splash screen
    initializeSplashScreen();
    
    // Initialize theme
    initializeTheme();
    
    // Initialize dock interactions
    initializeDock();
    
    // Toggle theme functionality
    toggle.addEventListener("change", () => {
        if (toggle.checked) {
            document.body.classList.add("dark");
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove("dark");
            localStorage.setItem('theme', 'light');
        }
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            if (e.matches) {
                document.body.classList.add('dark');
                toggle.checked = true;
            } else {
                document.body.classList.remove('dark');
                toggle.checked = false;
            }
        }
    });
});

// Dock item interactions
function initializeDock() {
    const dockItems = document.querySelectorAll('.dock-item');
    
    dockItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'IMG') {
                return; // Let the link work normally
            }
            
            // Add a subtle animation on click
            this.style.transform = 'translateY(-5px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            const appName = this.querySelector('.label').textContent;
            console.log(`Opening ${appName}...`);
        });
    });
}

// Prevent flash of unstyled content
document.body.style.visibility = 'hidden';
window.addEventListener('load', function() {
    document.body.style.visibility = 'visible';
});