/**
 * InquisitorPanel - UI component for displaying Inquisitor commentary
 * Manages the cosmic commentary panel with animations
 */

export class InquisitorPanel {
    constructor() {
        this.panel = document.getElementById('inquisitorPanel');
        this.textElement = document.getElementById('inquisitorText');
        this.currentText = '';
        this.isAnimating = false;
    }

    /**
     * Display commentary with cosmic animation
     */
    displayCommentary(text, duration = 3000) {
        if (!this.panel || !this.textElement) {
            console.warn('Inquisitor panel elements not found');
            return;
        }

        this.currentText = text;
        this.textElement.textContent = text;

        // Add cosmic speaking animation
        this.panel.classList.add('cosmic-speaking');

        // Remove animation after duration
        setTimeout(() => {
            this.panel.classList.remove('cosmic-speaking');
        }, duration);
    }

    /**
     * Display commentary with typing effect
     */
    async displayCommentaryTyping(text, typingSpeed = 30) {
        if (!this.panel || !this.textElement) {
            return;
        }

        if (this.isAnimating) {
            // If already animating, just set text immediately
            this.textElement.textContent = text;
            return;
        }

        this.isAnimating = true;
        this.currentText = text;
        this.textElement.textContent = '';

        // Add cosmic speaking animation
        this.panel.classList.add('cosmic-speaking');

        // Type out the text
        for (let i = 0; i < text.length; i++) {
            this.textElement.textContent += text[i];
            await this.sleep(typingSpeed);
        }

        this.isAnimating = false;

        // Keep animation for a bit longer
        await this.sleep(2000);
        this.panel.classList.remove('cosmic-speaking');
    }

    /**
     * Show final verdict with special styling
     */
    displayFinalVerdict(text) {
        if (!this.panel || !this.textElement) {
            return;
        }

        this.textElement.textContent = text;

        // Add special final verdict styling
        this.panel.classList.add('cosmic-speaking');
        this.panel.style.border = '4px solid #FFD700';
        this.panel.style.boxShadow = '0 0 50px rgba(255, 215, 0, 1)';

        // Keep the verdict visible
        setTimeout(() => {
            this.panel.classList.remove('cosmic-speaking');
        }, 5000);
    }

    /**
     * Update panel position (for responsive design)
     */
    setPosition(x, y) {
        if (this.panel) {
            this.panel.style.left = `${x}px`;
            this.panel.style.top = `${y}px`;
        }
    }

    /**
     * Hide the panel
     */
    hide() {
        if (this.panel) {
            this.panel.style.display = 'none';
        }
    }

    /**
     * Show the panel
     */
    show() {
        if (this.panel) {
            this.panel.style.display = 'block';
        }
    }

    /**
     * Set panel opacity
     */
    setOpacity(opacity) {
        if (this.panel) {
            this.panel.style.opacity = opacity;
        }
    }

    /**
     * Get current commentary text
     */
    getCurrentText() {
        return this.currentText;
    }

    /**
     * Clear commentary
     */
    clear() {
        if (this.textElement) {
            this.textElement.textContent = '';
            this.currentText = '';
        }
    }

    /**
     * Sleep utility for async operations
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
