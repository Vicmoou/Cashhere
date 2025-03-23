class ThemeManager {
    static init() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) return;

        const theme = localStorage.getItem(`theme_${currentUser.id}`) || 'light';
        
        // Apply theme immediately
        this.applyTheme(theme);

        // Listen for theme changes
        window.addEventListener('storage', (e) => {
            if (e.key === `theme_${currentUser.id}`) {
                this.applyTheme(e.newValue);
            }
        });
    }

    static applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.className = theme;
        localStorage.setItem(`theme_${JSON.parse(localStorage.getItem('currentUser')).id}`, theme);
    }
}

// Initialize theme system
window.addEventListener('load', () => ThemeManager.init());
