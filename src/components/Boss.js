/**
 * Boss - Antagonist character card component
 * Displays boss name, XP, and treasure generation
 */

import { Card } from './Card.js';
import { CARD_WIDTH, CARD_HEIGHT } from '../main.js';

const TREASURE_SYMBOLS = {
    science: '🔬',
    dramatic: '🎭',
    corporate: '💼',
    government: '🎖️'
};

export class Boss extends Card {
    constructor(cardData) {
        super(cardData, 'boss');
        this.isRevealed = true; // Bosses are always visible
    }

    /**
     * Render boss-specific face-up card
     */
    renderFaceUp() {
        const color = this.getCardColor();

        // Cosmic star field - denser for boss cards
        this.drawBossStarField();

        // Regal antagonist background
        this.drawAntagonistBackground(color);

        // Cosmic authority frame
        this.drawCosmicAuthorityFrame();

        // Purple cosmic border for bosses
        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: 0x9966FF, width: 3 });

        // Guild ornaments with cosmic authority
        this.drawGuildOrnaments();

        // Clear previous text
        this.textContainer.removeChildren();

        // Regal title banner
        this.drawRegalBanner();

        // Boss name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown Boss',
            style: {
                fontSize: 9,
                fill: 0xFFFFFF,
                align: 'center',
                wordWrap: true,
                wordWrapWidth: CARD_WIDTH - 16,
                fontWeight: 'bold',
                dropShadow: {
                    alpha: 0.9,
                    angle: Math.PI / 4,
                    blur: 3,
                    color: 0x9966FF,
                    distance: 2
                }
            }
        });
        nameText.x = 8;
        nameText.y = 6;
        this.textContainer.addChild(nameText);

        // XP stat display
        this.drawXPDisplay();

        // XP value
        const xpText = new PIXI.Text({
            text: `XP: ${this.cardData.xp}`,
            style: {
                fontSize: 11,
                fill: 0xFFD700,
                fontWeight: 'bold',
                dropShadow: {
                    alpha: 0.6,
                    blur: 1,
                    color: 0x000000,
                    distance: 1
                }
            }
        });
        xpText.x = 10;
        xpText.y = 32;
        this.textContainer.addChild(xpText);

        // Treasure shrine area
        this.drawTreasureShrine();

        // Treasure symbols
        if (this.cardData.treasure) {
            let treasureY = 58;

            Object.entries(this.cardData.treasure).forEach(([type, count]) => {
                const symbol = TREASURE_SYMBOLS[type] || '?';

                for (let i = 0; i < count; i++) {
                    const treasureText = new PIXI.Text({
                        text: symbol,
                        style: {
                            fontSize: 20,
                            fill: 0xFFFFFF,
                            dropShadow: {
                                alpha: 0.7,
                                blur: 2,
                                color: 0x9966FF,
                                distance: 2
                            }
                        }
                    });
                    treasureText.x = CARD_WIDTH / 2 - 10;
                    treasureText.y = treasureY;
                    this.textContainer.addChild(treasureText);

                    treasureY += 22;
                }
            });
        }

        // Guild Boss badge
        this.drawGuildBossBadge();
    }

    /**
     * Draw denser cosmic star field for bosses
     */
    drawBossStarField() {
        const stars = 25; // More stars for bosses
        for (let i = 0; i < stars; i++) {
            const x = Math.random() * CARD_WIDTH;
            const y = Math.random() * CARD_HEIGHT;
            const size = Math.random() * 2 + 0.5;
            const alpha = Math.random() * 0.6 + 0.3;

            this.bg.circle(x, y, size)
                .fill({ color: 0x9966FF, alpha });
        }
    }

    /**
     * Draw antagonist background with cosmic power
     */
    drawAntagonistBackground(baseColor) {
        // Darker, richer base color
        const bossColor = this.adjustColorBrightness(baseColor, 0.6);
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(bossColor);

        // Cosmic power emanation from center
        this.bg.circle(CARD_WIDTH / 2, CARD_HEIGHT / 2, 30)
            .fill({ color: 0x9966FF, alpha: 0.15 });

        // Spiral cosmic energy pattern
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const startX = CARD_WIDTH / 2;
            const startY = CARD_HEIGHT / 2;
            const endX = startX + Math.cos(angle) * 60;
            const endY = startY + Math.sin(angle) * 60;

            this.bg.moveTo(startX, startY)
                .lineTo(endX, endY)
                .stroke({ color: 0x9966FF, width: 1, alpha: 0.1 });
        }

        // Darker vignette
        this.bg.rect(0, CARD_HEIGHT * 0.75, CARD_WIDTH, CARD_HEIGHT * 0.25)
            .fill({ color: 0x000000, alpha: 0.4 });
    }

    /**
     * Draw cosmic authority frame
     */
    drawCosmicAuthorityFrame() {
        // Double inner frame for authority
        const inset1 = 5;
        const inset2 = 7;

        this.bg.rect(inset1, inset1, CARD_WIDTH - inset1 * 2, CARD_HEIGHT - inset1 * 2)
            .stroke({ color: 0x9966FF, width: 1, alpha: 0.5 });

        this.bg.rect(inset2, inset2, CARD_WIDTH - inset2 * 2, CARD_HEIGHT - inset2 * 2)
            .stroke({ color: 0xFFD700, width: 1, alpha: 0.3 });
    }

    /**
     * Draw Guild ornaments with cosmic authority
     */
    drawGuildOrnaments() {
        const ornamentSize = 8;
        const offset = 2;
        const primaryColor = 0x9966FF;
        const accentColor = 0xFFD700;
        const alpha = 0.8;

        // Complex corner designs
        // Top-left
        this.bg.moveTo(offset, offset + ornamentSize)
            .lineTo(offset, offset)
            .lineTo(offset + ornamentSize, offset)
            .stroke({ color: primaryColor, width: 3, alpha });

        this.bg.circle(offset + ornamentSize / 2, offset + ornamentSize / 2, 2)
            .fill({ color: accentColor, alpha });

        // Top-right
        this.bg.moveTo(CARD_WIDTH - offset - ornamentSize, offset)
            .lineTo(CARD_WIDTH - offset, offset)
            .lineTo(CARD_WIDTH - offset, offset + ornamentSize)
            .stroke({ color: primaryColor, width: 3, alpha });

        this.bg.circle(CARD_WIDTH - offset - ornamentSize / 2, offset + ornamentSize / 2, 2)
            .fill({ color: accentColor, alpha });

        // Bottom-left
        this.bg.moveTo(offset, CARD_HEIGHT - offset - ornamentSize)
            .lineTo(offset, CARD_HEIGHT - offset)
            .lineTo(offset + ornamentSize, CARD_HEIGHT - offset)
            .stroke({ color: primaryColor, width: 3, alpha });

        this.bg.circle(offset + ornamentSize / 2, CARD_HEIGHT - offset - ornamentSize / 2, 2)
            .fill({ color: accentColor, alpha });

        // Bottom-right
        this.bg.moveTo(CARD_WIDTH - offset - ornamentSize, CARD_HEIGHT - offset)
            .lineTo(CARD_WIDTH - offset, CARD_HEIGHT - offset)
            .lineTo(CARD_WIDTH - offset, CARD_HEIGHT - offset - ornamentSize)
            .stroke({ color: primaryColor, width: 3, alpha });

        this.bg.circle(CARD_WIDTH - offset - ornamentSize / 2, CARD_HEIGHT - offset - ornamentSize / 2, 2)
            .fill({ color: accentColor, alpha });
    }

    /**
     * Draw regal title banner
     */
    drawRegalBanner() {
        this.bg.rect(5, 3, CARD_WIDTH - 10, 20)
            .fill({ color: 0x000000, alpha: 0.5 });

        this.bg.rect(5, 3, CARD_WIDTH - 10, 20)
            .stroke({ color: 0x9966FF, width: 2, alpha: 0.6 });

        // Banner accent line
        this.bg.rect(5, 3, CARD_WIDTH - 10, 3)
            .fill({ color: 0x9966FF, alpha: 0.4 });
    }

    /**
     * Draw XP display box
     */
    drawXPDisplay() {
        this.bg.rect(8, 29, 45, 18)
            .fill({ color: 0x000000, alpha: 0.5 });

        this.bg.rect(8, 29, 45, 18)
            .stroke({ color: 0xFFD700, width: 2, alpha: 0.7 });
    }

    /**
     * Draw treasure shrine area
     */
    drawTreasureShrine() {
        const shrineWidth = 36;
        const shrineX = CARD_WIDTH / 2 - shrineWidth / 2;

        this.bg.rect(shrineX, 54, shrineWidth, CARD_HEIGHT - 58)
            .fill({ color: 0x000000, alpha: 0.4 });

        this.bg.rect(shrineX, 54, shrineWidth, CARD_HEIGHT - 58)
            .stroke({ color: 0x9966FF, width: 2, alpha: 0.5 });

        // Shrine top decoration
        this.bg.moveTo(shrineX, 54)
            .lineTo(CARD_WIDTH / 2, 50)
            .lineTo(shrineX + shrineWidth, 54)
            .stroke({ color: 0xFFD700, width: 2, alpha: 0.6 });
    }

    /**
     * Draw Guild Boss badge
     */
    drawGuildBossBadge() {
        const badgeX = 5;
        const badgeY = CARD_HEIGHT - 16;

        // Badge background with Guild colors
        this.bg.rect(badgeX, badgeY, 42, 13)
            .fill(0x9966FF);

        this.bg.rect(badgeX, badgeY, 42, 13)
            .stroke({ color: 0xFFD700, width: 2 });

        // Shine effect
        this.bg.rect(badgeX, badgeY, 42, 4)
            .fill({ color: 0xFFFFFF, alpha: 0.3 });

        const bossLabel = new PIXI.Text({
            text: '👑 BOSS',
            style: {
                fontSize: 8,
                fill: 0xFFFFFF,
                fontWeight: 'bold'
            }
        });
        bossLabel.x = badgeX + 3;
        bossLabel.y = badgeY + 2;
        this.textContainer.addChild(bossLabel);
    }

    /**
     * Adjust color brightness
     */
    adjustColorBrightness(color, factor) {
        const r = (color >> 16) & 0xFF;
        const g = (color >> 8) & 0xFF;
        const b = color & 0xFF;

        const newR = Math.floor(r * factor);
        const newG = Math.floor(g * factor);
        const newB = Math.floor(b * factor);

        return (newR << 16) | (newG << 8) | newB;
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

    /**
     * Bosses cannot be set face down
     */
    setFaceDown(faceDown) {
        // Bosses are always face up
        this.isFaceDown = false;
    }
}
