/**
 * Hero - Protagonist card component
 * Displays hero health, treasure type, and special abilities
 */

import { Card } from './Card.js';
import { CARD_WIDTH, CARD_HEIGHT } from '../main.js';

const TREASURE_SYMBOLS = {
    science: '🔬',
    dramatic: '🎭',
    corporate: '💼',
    government: '🎖️'
};

export class Hero extends Card {
    constructor(cardData) {
        super(cardData, 'hero');
    }

    /**
     * Render hero-specific face-up card
     */
    renderFaceUp() {
        // Cosmic star field
        this.drawStarField();

        // Heroic background
        this.drawHeroicBackground();

        // Decorative frame
        this.drawCosmicFrame();

        // Gold border for epic heroes, cosmic purple otherwise
        const borderColor = this.cardData.isEpic ? 0xFFD700 : 0xFF5555;
        const borderWidth = this.cardData.isEpic ? 3 : 2;

        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: borderColor, width: borderWidth });

        // Heroic corner ornaments
        this.drawHeroicOrnaments();

        // Clear previous text
        this.textContainer.removeChildren();

        // Title banner
        this.drawHeroTitleBanner();

        // Hero name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown Hero',
            style: {
                fontSize: 9,
                fill: 0xFFFFFF,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: CARD_WIDTH - 16,
                fontWeight: 'bold',
                dropShadow: {
                    alpha: 0.8,
                    angle: Math.PI / 4,
                    blur: 2,
                    color: 0x000000,
                    distance: 2
                }
            }
        });
        nameText.x = 8;
        nameText.y = 6;
        this.textContainer.addChild(nameText);

        // Health stat box
        this.drawHealthBox();

        // Health value
        const healthText = new PIXI.Text({
            text: `❤️ ${this.cardData.health}`,
            style: {
                fontSize: 14,
                fill: 0xFFFFFF,
                fontWeight: 'bold',
                dropShadow: {
                    alpha: 0.6,
                    blur: 1,
                    color: 0x000000,
                    distance: 1
                }
            }
        });
        healthText.x = 10;
        healthText.y = 32;
        this.textContainer.addChild(healthText);

        // Treasure affinity area
        this.drawTreasureAffinityArea();

        // Treasure symbol
        const treasureSymbol = TREASURE_SYMBOLS[this.cardData.treasure] || '?';
        const treasureText = new PIXI.Text({
            text: treasureSymbol,
            style: {
                fontSize: 24,
                fill: 0xFFFFFF,
                dropShadow: {
                    alpha: 0.5,
                    blur: 2,
                    color: 0x000000,
                    distance: 2
                }
            }
        });
        treasureText.x = CARD_WIDTH / 2 - 12;
        treasureText.y = 56;
        this.textContainer.addChild(treasureText);

        // Epic badge
        if (this.cardData.isEpic) {
            this.drawEpicBadge();
        }

        // Bumbling indicator
        if (this.cardData.bumbling) {
            this.drawBumblingIndicator();
        }
    }

    /**
     * Draw heroic background with energy effect
     */
    drawHeroicBackground() {
        // Red heroic base
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(0xD32F2F);

        // Radial glow effect from center
        const centerX = CARD_WIDTH / 2;
        const centerY = CARD_HEIGHT / 2;

        // Inner glow
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill({ color: 0xFF6B6B, alpha: 0.3 });

        // Diagonal energy lines
        for (let i = 0; i < 5; i++) {
            const offset = i * 25;
            this.bg.moveTo(0, offset)
                .lineTo(CARD_WIDTH, offset - 20)
                .stroke({ color: 0xFFFFFF, width: 1, alpha: 0.1 });
        }

        // Darker gradient at bottom
        this.bg.rect(0, CARD_HEIGHT * 0.7, CARD_WIDTH, CARD_HEIGHT * 0.3)
            .fill({ color: 0x000000, alpha: 0.3 });
    }

    /**
     * Draw heroic corner ornaments
     */
    drawHeroicOrnaments() {
        const ornamentSize = 6;
        const offset = 3;
        const ornamentColor = this.cardData.isEpic ? 0xFFD700 : 0xFFFFFF;
        const alpha = 0.7;

        // Shield-like corner brackets
        // Top-left
        this.bg.moveTo(offset, offset + ornamentSize)
            .lineTo(offset, offset)
            .lineTo(offset + ornamentSize, offset)
            .stroke({ color: ornamentColor, width: 2, alpha });

        // Top-right
        this.bg.moveTo(CARD_WIDTH - offset - ornamentSize, offset)
            .lineTo(CARD_WIDTH - offset, offset)
            .lineTo(CARD_WIDTH - offset, offset + ornamentSize)
            .stroke({ color: ornamentColor, width: 2, alpha });

        // Bottom-left
        this.bg.moveTo(offset, CARD_HEIGHT - offset - ornamentSize)
            .lineTo(offset, CARD_HEIGHT - offset)
            .lineTo(offset + ornamentSize, CARD_HEIGHT - offset)
            .stroke({ color: ornamentColor, width: 2, alpha });

        // Bottom-right
        this.bg.moveTo(CARD_WIDTH - offset - ornamentSize, CARD_HEIGHT - offset)
            .lineTo(CARD_WIDTH - offset, CARD_HEIGHT - offset)
            .lineTo(CARD_WIDTH - offset, CARD_HEIGHT - offset - ornamentSize)
            .stroke({ color: ornamentColor, width: 2, alpha });
    }

    /**
     * Draw hero title banner
     */
    drawHeroTitleBanner() {
        this.bg.rect(6, 4, CARD_WIDTH - 12, 18)
            .fill({ color: 0x000000, alpha: 0.4 });
        this.bg.rect(6, 4, CARD_WIDTH - 12, 18)
            .stroke({ color: 0xFFFFFF, width: 1, alpha: 0.3 });
    }

    /**
     * Draw health stat box
     */
    drawHealthBox() {
        this.bg.rect(8, 30, 50, 22)
            .fill({ color: 0x000000, alpha: 0.4 });
        this.bg.rect(8, 30, 50, 22)
            .stroke({ color: 0xFF5555, width: 2, alpha: 0.6 });
    }

    /**
     * Draw treasure affinity area
     */
    drawTreasureAffinityArea() {
        const areaSize = 40;
        const x = CARD_WIDTH / 2 - areaSize / 2;
        const y = 54;

        this.bg.circle(CARD_WIDTH / 2, y + areaSize / 2, areaSize / 2)
            .fill({ color: 0x000000, alpha: 0.3 });
        this.bg.circle(CARD_WIDTH / 2, y + areaSize / 2, areaSize / 2)
            .stroke({ color: 0xFFFFFF, width: 2, alpha: 0.4 });
    }

    /**
     * Draw epic badge
     */
    drawEpicBadge() {
        const badgeX = 6;
        const badgeY = CARD_HEIGHT - 16;

        // Badge background with shine
        this.bg.rect(badgeX, badgeY, 32, 12)
            .fill(0xFFD700);
        this.bg.rect(badgeX, badgeY, 32, 12)
            .stroke({ color: 0xFFFFFF, width: 1 });

        // Shine effect
        this.bg.rect(badgeX, badgeY, 32, 4)
            .fill({ color: 0xFFFFFF, alpha: 0.3 });

        const epicText = new PIXI.Text({
            text: '⭐ EPIC',
            style: {
                fontSize: 7,
                fill: 0x000000,
                fontWeight: 'bold'
            }
        });
        epicText.x = badgeX + 2;
        epicText.y = badgeY + 2;
        this.textContainer.addChild(epicText);
    }

    /**
     * Draw bumbling indicator
     */
    drawBumblingIndicator() {
        const indicatorX = CARD_WIDTH - 20;
        const indicatorY = CARD_HEIGHT - 20;

        // Background circle
        this.bg.circle(indicatorX + 6, indicatorY + 6, 8)
            .fill({ color: 0x000000, alpha: 0.3 });

        const bumblingText = new PIXI.Text({
            text: '💫',
            style: {
                fontSize: 12
            }
        });
        bumblingText.x = indicatorX;
        bumblingText.y = indicatorY;
        this.textContainer.addChild(bumblingText);
    }

    /**
     * Get card color - always red for heroes
     */
    getCardColor() {
        return 0xF44336;
    }
}
