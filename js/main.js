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

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initializeTheme);

// Toggle theme
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

// Dock item interactions
document.addEventListener('DOMContentLoaded', function() {
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
});