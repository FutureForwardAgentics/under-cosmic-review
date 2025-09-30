/**
 * Card - Base card component with cosmic theming
 * All card types extend from this base class
 */

import { CARD_WIDTH, CARD_HEIGHT } from '../main.js';

export class Card extends PIXI.Container {
    constructor(cardData, cardType = 'room') {
        super();

        this.cardData = cardData;
        this.cardType = cardType;
        this.isRevealed = false;
        this.isPlayable = false;
        this.isFaceDown = false;
        this.isUnderReview = false;
        this.cosmicApproval = false;

        // Visual elements
        this.bg = null;
        this.border = null;
        this.textContainer = null;
        this.cosmicGlow = null;

        this.createVisuals();
        this.setupInteraction();
    }

    /**
     * Create the card's visual elements
     */
    createVisuals() {
        // Create graphics container for background
        this.bg = new PIXI.Graphics();
        this.addChild(this.bg);

        // Create border
        this.border = new PIXI.Graphics();
        this.addChild(this.border);

        // Text container
        this.textContainer = new PIXI.Container();
        this.addChild(this.textContainer);

        // Render initial state
        this.updateVisuals();
    }

    /**
     * Update card visuals based on current state
     */
    updateVisuals() {
        this.bg.clear();
        this.border.clear();

        if (this.isFaceDown || !this.isRevealed) {
            this.renderFaceDown();
        } else {
            this.renderFaceUp();
        }

        // Add cosmic glow if under review
        if (this.isUnderReview) {
            this.addCosmicGlow();
        }
    }

    /**
     * Render face-down card
     */
    renderFaceDown() {
        // Dark card back
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(0x424242);

        // Border
        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: 0xFFFFFF, width: 2 });

        // Clear text
        this.textContainer.removeChildren();

        // Add "GUILD" text
        const backText = new PIXI.Text({
            text: 'GUILD',
            style: {
                fontSize: 14,
                fill: 0x9966FF,
                fontWeight: 'bold',
                align: 'center'
            }
        });
        backText.x = CARD_WIDTH / 2 - backText.width / 2;
        backText.y = CARD_HEIGHT / 2 - backText.height / 2;
        this.textContainer.addChild(backText);
    }

    /**
     * Render face-up card (to be overridden by subclasses)
     */
    renderFaceUp() {
        const color = this.getCardColor();

        // Card background
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(color);

        // Border (gold if playable, white otherwise)
        const borderColor = this.isPlayable ? 0xFFD700 : 0xFFFFFF;
        const borderWidth = this.isPlayable ? 3 : 2;

        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: borderColor, width: borderWidth });

        // Clear previous text
        this.textContainer.removeChildren();

        // Add card name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown',
            style: {
                fontSize: 10,
                fill: 0xFFFFFF,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: CARD_WIDTH - 10,
                fontWeight: 'bold'
            }
        });
        nameText.x = 5;
        nameText.y = 5;
        this.textContainer.addChild(nameText);
    }

    /**
     * Get card color based on type and treasure
     */
    getCardColor() {
        const colors = {
            science: 0x4CAF50,
            dramatic: 0xFF9800,
            corporate: 0x2196F3,
            government: 0x9C27B0
        };

        if (this.cardType === 'hero') {
            return 0xF44336; // Red for heroes
        }

        // Get first treasure type
        if (this.cardData.treasure) {
            const treasureTypes = Object.keys(this.cardData.treasure);
            if (treasureTypes.length > 0) {
                return colors[treasureTypes[0]] || 0x333333;
            }
        }

        return 0x333333; // Default dark gray
    }

    /**
     * Add cosmic glow effect
     */
    addCosmicGlow() {
        if (this.cosmicGlow) {
            this.removeChild(this.cosmicGlow);
        }

        this.cosmicGlow = new PIXI.Graphics();
        this.cosmicGlow.rect(-5, -5, CARD_WIDTH + 10, CARD_HEIGHT + 10)
            .stroke({ color: 0x9966FF, width: 3, alpha: 0.6 });

        this.addChildAt(this.cosmicGlow, 0); // Add behind everything
    }

    /**
     * Setup interaction handlers
     */
    setupInteraction() {
        this.eventMode = 'static';
        this.cursor = 'pointer';

        this.on('pointerover', this.onPointerOver.bind(this));
        this.on('pointerout', this.onPointerOut.bind(this));
        this.on('pointerdown', this.onPointerDown.bind(this));
    }

    /**
     * Handle pointer over
     */
    onPointerOver() {
        if (this.isPlayable) {
            this.alpha = 0.85;
            this.scale.set(1.05);
        }
    }

    /**
     * Handle pointer out
     */
    onPointerOut() {
        this.alpha = 1.0;
        this.scale.set(1.0);
    }

    /**
     * Handle pointer down (click)
     */
    onPointerDown() {
        if (this.isPlayable && this.onPlay) {
            this.onPlay(this);
        }
    }

    /**
     * Reveal the card
     */
    reveal() {
        this.isRevealed = true;
        this.updateVisuals();
    }

    /**
     * Set face down state
     */
    setFaceDown(faceDown) {
        this.isFaceDown = faceDown;
        this.updateVisuals();
    }

    /**
     * Set playable state
     */
    setPlayable(playable, onPlayCallback = null) {
        this.isPlayable = playable;
        this.onPlay = onPlayCallback;
        this.updateVisuals();
    }

    /**
     * Set cosmic review state
     */
    setCosmicReview(reviewing) {
        this.isUnderReview = reviewing;
        this.updateVisuals();
    }

    /**
     * Animate card play
     */
    async animatePlay(targetX, targetY) {
        return new Promise((resolve) => {
            const startX = this.x;
            const startY = this.y;
            const duration = 0.5;
            let elapsed = 0;

            const animate = (delta) => {
                elapsed += delta / 60;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);

                this.x = startX + (targetX - startX) * eased;
                this.y = startY + (targetY - startY) * eased;

                if (progress >= 1) {
                    resolve();
                }
            };

            // TODO: Hook into animation system
            // For now, just move instantly
            this.x = targetX;
            this.y = targetY;
            resolve();
        });
    }

    /**
     * Cleanup
     */
    destroy(options) {
        if (this.cosmicGlow) {
            this.cosmicGlow.destroy();
        }
        super.destroy(options);
    }
}
