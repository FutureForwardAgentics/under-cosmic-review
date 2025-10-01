/**
 * Room - Installation card component
 * Displays room damage, treasure generation, and type
 */

import { Card } from './Card.js';
import { CARD_WIDTH, CARD_HEIGHT } from '../main.js';

const TREASURE_SYMBOLS = {
    science: '🔬',
    dramatic: '🎭',
    corporate: '💼',
    government: '🎖️'
};

export class Room extends Card {
    constructor(cardData) {
        super(cardData, 'room');
    }

    /**
     * Render room-specific face-up card
     */
    renderFaceUp() {
        const color = this.getCardColor();

        // Cosmic star field
        this.drawStarField();

        // Installation blueprint-style background
        this.drawInstallationBackground(color);

        // Decorative frame
        this.drawCosmicFrame();

        // Gold border for advanced rooms, playable rooms, or cosmic purple otherwise
        let borderColor = 0x9966FF;
        let borderWidth = 2;

        if (this.cardData.type === 'advanced') {
            borderColor = 0xFFD700;
            borderWidth = 3;
        } else if (this.isPlayable) {
            borderColor = 0xFFD700;
            borderWidth = 3;
        }

        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: borderColor, width: borderWidth });

        // Corner ornaments with installation theme
        this.drawInstallationOrnaments();

        // Clear previous text
        this.textContainer.removeChildren();

        // Title banner background
        this.drawTitleBanner();

        // Room name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown Room',
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

        // Damage stat box
        this.drawStatBox(8, 30, 35, 20, 0x000000, 0.4);

        // Damage value
        const damageText = new PIXI.Text({
            text: `⚔️ ${this.cardData.damage}`,
            style: {
                fontSize: 12,
                fill: 0xFF5555,
                fontWeight: 'bold',
                dropShadow: {
                    alpha: 0.6,
                    blur: 1,
                    color: 0x000000,
                    distance: 1
                }
            }
        });
        damageText.x = 10;
        damageText.y = 32;
        this.textContainer.addChild(damageText);

        // Treasure area background
        this.drawTreasureArea();

        // Treasure symbols
        if (this.cardData.treasure) {
            let treasureX = 12;
            let treasureY = 56;

            Object.entries(this.cardData.treasure).forEach(([type, count]) => {
                const symbol = TREASURE_SYMBOLS[type] || '?';

                for (let i = 0; i < count; i++) {
                    const treasureText = new PIXI.Text({
                        text: symbol,
                        style: {
                            fontSize: 16,
                            fill: 0xFFFFFF,
                            dropShadow: {
                                alpha: 0.5,
                                blur: 1,
                                color: 0x000000,
                                distance: 1
                            }
                        }
                    });
                    treasureText.x = treasureX;
                    treasureText.y = treasureY;
                    this.textContainer.addChild(treasureText);

                    treasureX += 22;
                    if (treasureX > CARD_WIDTH - 20) {
                        treasureX = 12;
                        treasureY += 20;
                    }
                }
            });
        }

        // Type indicator (advanced)
        if (this.cardData.type === 'advanced') {
            this.drawAdvancedBadge();
        }
    }

    /**
     * Draw installation blueprint-style background
     */
    drawInstallationBackground(baseColor) {
        // Main background
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(baseColor);

        // Blueprint grid pattern
        const gridSpacing = 10;
        const gridColor = 0xFFFFFF;
        const gridAlpha = 0.08;

        for (let x = gridSpacing; x < CARD_WIDTH; x += gridSpacing) {
            this.bg.moveTo(x, 0)
                .lineTo(x, CARD_HEIGHT)
                .stroke({ color: gridColor, width: 1, alpha: gridAlpha });
        }

        for (let y = gridSpacing; y < CARD_HEIGHT; y += gridSpacing) {
            this.bg.moveTo(0, y)
                .lineTo(CARD_WIDTH, y)
                .stroke({ color: gridColor, width: 1, alpha: gridAlpha });
        }

        // Darker gradient at bottom
        this.bg.rect(0, CARD_HEIGHT * 0.65, CARD_WIDTH, CARD_HEIGHT * 0.35)
            .fill({ color: 0x000000, alpha: 0.25 });
    }

    /**
     * Draw installation-themed corner ornaments
     */
    drawInstallationOrnaments() {
        const ornamentSize = 5;
        const offset = 3;
        const ornamentColor = 0xFFD700;
        const alpha = 0.5;

        // Mechanical corner brackets
        // Top-left
        this.bg.rect(offset, offset, ornamentSize, 2)
            .fill({ color: ornamentColor, alpha });
        this.bg.rect(offset, offset, 2, ornamentSize)
            .fill({ color: ornamentColor, alpha });

        // Top-right
        this.bg.rect(CARD_WIDTH - offset - ornamentSize, offset, ornamentSize, 2)
            .fill({ color: ornamentColor, alpha });
        this.bg.rect(CARD_WIDTH - offset - 2, offset, 2, ornamentSize)
            .fill({ color: ornamentColor, alpha });

        // Bottom-left
        this.bg.rect(offset, CARD_HEIGHT - offset - 2, ornamentSize, 2)
            .fill({ color: ornamentColor, alpha });
        this.bg.rect(offset, CARD_HEIGHT - offset - ornamentSize, 2, ornamentSize)
            .fill({ color: ornamentColor, alpha });

        // Bottom-right
        this.bg.rect(CARD_WIDTH - offset - ornamentSize, CARD_HEIGHT - offset - 2, ornamentSize, 2)
            .fill({ color: ornamentColor, alpha });
        this.bg.rect(CARD_WIDTH - offset - 2, CARD_HEIGHT - offset - ornamentSize, 2, ornamentSize)
            .fill({ color: ornamentColor, alpha });
    }

    /**
     * Draw title banner
     */
    drawTitleBanner() {
        this.bg.rect(6, 4, CARD_WIDTH - 12, 18)
            .fill({ color: 0x000000, alpha: 0.3 });
    }

    /**
     * Draw stat box
     */
    drawStatBox(x, y, width, height, color, alpha) {
        this.bg.rect(x, y, width, height)
            .fill({ color, alpha });
        this.bg.rect(x, y, width, height)
            .stroke({ color: 0xFFFFFF, width: 1, alpha: 0.3 });
    }

    /**
     * Draw treasure display area
     */
    drawTreasureArea() {
        this.bg.rect(8, 52, CARD_WIDTH - 16, 26)
            .fill({ color: 0x000000, alpha: 0.25 });
        this.bg.rect(8, 52, CARD_WIDTH - 16, 26)
            .stroke({ color: 0xFFFFFF, width: 1, alpha: 0.3 });
    }

    /**
     * Draw advanced badge
     */
    drawAdvancedBadge() {
        const badgeX = CARD_WIDTH - 32;
        const badgeY = CARD_HEIGHT - 16;

        // Badge background
        this.bg.rect(badgeX, badgeY, 26, 12)
            .fill(0xFFD700);
        this.bg.rect(badgeX, badgeY, 26, 12)
            .stroke({ color: 0xFFFFFF, width: 1 });

        const typeText = new PIXI.Text({
            text: 'ADV',
            style: {
                fontSize: 8,
                fill: 0x000000,
                fontWeight: 'bold'
            }
        });
        typeText.x = badgeX + 3;
        typeText.y = badgeY + 2;
        this.textContainer.addChild(typeText);
    }

    /**
     * Get card color based on treasure type
     */
    getCardColor() {
        const colors = {
            science: 0x4CAF50,
            dramatic: 0xFF9800,
            corporate: 0x2196F3,
            government: 0x9C27B0
        };

        if (this.cardData.treasure) {
            const treasureTypes = Object.keys(this.cardData.treasure);
            if (treasureTypes.length > 0) {
                return colors[treasureTypes[0]] || 0x333333;
            }
        }

        return 0x333333;
    }
}
