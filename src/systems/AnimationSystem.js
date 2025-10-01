/**
 * AnimationSystem - Manages card animations using Pixi ticker
 * Provides smooth transitions for card movements and effects
 */

export class AnimationSystem {
    constructor(app) {
        this.app = app;
        this.activeAnimations = new Map();
        this.nextAnimationId = 0;

        // Bind ticker callback
        this.tick = this.tick.bind(this);
        this.app.ticker.add(this.tick);
    }

    /**
     * Animate a card to a target position
     * @param {PIXI.Container} card - The card to animate
     * @param {number} targetX - Target X position
     * @param {number} targetY - Target Y position
     * @param {number} duration - Duration in seconds (default 0.5)
     * @param {string} easing - Easing function name (default 'easeOutCubic')
     * @returns {Promise} - Resolves when animation completes
     */
    animatePosition(card, targetX, targetY, duration = 0.5, easing = 'easeOutCubic') {
        return new Promise((resolve) => {
            const animationId = this.nextAnimationId++;

            const animation = {
                id: animationId,
                card,
                startX: card.x,
                startY: card.y,
                targetX,
                targetY,
                duration,
                elapsed: 0,
                easingFunc: this.getEasingFunction(easing),
                onComplete: resolve
            };

            this.activeAnimations.set(animationId, animation);
        });
    }

    /**
     * Animate card scale (for hover effects, etc.)
     * @param {PIXI.Container} card - The card to animate
     * @param {number} targetScale - Target scale value
     * @param {number} duration - Duration in seconds
     * @returns {Promise} - Resolves when animation completes
     */
    animateScale(card, targetScale, duration = 0.2) {
        return new Promise((resolve) => {
            const animationId = this.nextAnimationId++;

            const animation = {
                id: animationId,
                card,
                startScale: card.scale.x,
                targetScale,
                duration,
                elapsed: 0,
                easingFunc: this.getEasingFunction('easeOutQuad'),
                onComplete: resolve,
                type: 'scale'
            };

            this.activeAnimations.set(animationId, animation);
        });
    }

    /**
     * Animate card alpha (fade in/out)
     * @param {PIXI.Container} card - The card to animate
     * @param {number} targetAlpha - Target alpha value
     * @param {number} duration - Duration in seconds
     * @returns {Promise} - Resolves when animation completes
     */
    animateAlpha(card, targetAlpha, duration = 0.3) {
        return new Promise((resolve) => {
            const animationId = this.nextAnimationId++;

            const animation = {
                id: animationId,
                card,
                startAlpha: card.alpha,
                targetAlpha,
                duration,
                elapsed: 0,
                easingFunc: this.getEasingFunction('linear'),
                onComplete: resolve,
                type: 'alpha'
            };

            this.activeAnimations.set(animationId, animation);
        });
    }

    /**
     * Update all active animations
     */
    tick(ticker) {
        const deltaTime = ticker.deltaMS / 1000; // Convert to seconds

        const completedAnimations = [];

        for (const [id, animation] of this.activeAnimations) {
            animation.elapsed += deltaTime;
            const progress = Math.min(animation.elapsed / animation.duration, 1);
            const eased = animation.easingFunc(progress);

            // Apply animation based on type
            if (animation.type === 'scale') {
                const scale = animation.startScale + (animation.targetScale - animation.startScale) * eased;
                animation.card.scale.set(scale);
            } else if (animation.type === 'alpha') {
                animation.card.alpha = animation.startAlpha + (animation.targetAlpha - animation.startAlpha) * eased;
            } else {
                // Position animation (default)
                animation.card.x = animation.startX + (animation.targetX - animation.startX) * eased;
                animation.card.y = animation.startY + (animation.targetY - animation.startY) * eased;
            }

            // Check if animation is complete
            if (progress >= 1) {
                completedAnimations.push(id);
                if (animation.onComplete) {
                    animation.onComplete();
                }
            }
        }

        // Remove completed animations
        for (const id of completedAnimations) {
            this.activeAnimations.delete(id);
        }
    }

    /**
     * Cancel a specific animation
     */
    cancelAnimation(animationId) {
        this.activeAnimations.delete(animationId);
    }

    /**
     * Cancel all animations for a specific card
     */
    cancelCardAnimations(card) {
        for (const [id, animation] of this.activeAnimations) {
            if (animation.card === card) {
                this.activeAnimations.delete(id);
            }
        }
    }

    /**
     * Get easing function by name
     */
    getEasingFunction(name) {
        const easingFunctions = {
            linear: (t) => t,
            easeInQuad: (t) => t * t,
            easeOutQuad: (t) => t * (2 - t),
            easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: (t) => t * t * t,
            easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
            easeInOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 + (t - 1) * (2 * (t - 1)) * (2 * (t - 1)),
            easeInQuart: (t) => t * t * t * t,
            easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
            easeInOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (t - 1) * (t - 1) * (t - 1) * (t - 1)
        };

        return easingFunctions[name] || easingFunctions.linear;
    }

    /**
     * Cleanup
     */
    destroy() {
        this.app.ticker.remove(this.tick);
        this.activeAnimations.clear();
    }
}
