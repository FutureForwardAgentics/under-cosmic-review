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

        // Card background - darker shade for boss cards
        const bossColor = this.adjustColorBrightness(color, 0.7);
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(bossColor);

        // Purple cosmic border for bosses
        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: 0x9966FF, width: 3 });

        // Clear previous text
        this.textContainer.removeChildren();

        // Boss name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown Boss',
            style: {
                fontSize: 9,
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

        // XP value
        const xpText = new PIXI.Text({
            text: `XP: ${this.cardData.xp}`,
            style: {
                fontSize: 10,
                fill: 0xFFD700,
                fontWeight: 'bold'
            }
        });
        xpText.x = 5;
        xpText.y = 35;
        this.textContainer.addChild(xpText);

        // Treasure symbols
        if (this.cardData.treasure) {
            let treasureY = 55;

            Object.entries(this.cardData.treasure).forEach(([type, count]) => {
                const symbol = TREASURE_SYMBOLS[type] || '?';

                for (let i = 0; i < count; i++) {
                    const treasureText = new PIXI.Text({
                        text: symbol,
                        style: {
                            fontSize: 18,
                            fill: 0xFFFFFF
                        }
                    });
                    treasureText.x = CARD_WIDTH / 2 - 10;
                    treasureText.y = treasureY;
                    this.textContainer.addChild(treasureText);

                    treasureY += 20;
                }
            });
        }

        // Boss indicator
        const bossLabel = new PIXI.Text({
            text: '👑 BOSS',
            style: {
                fontSize: 8,
                fill: 0x9966FF,
                fontWeight: 'bold'
            }
        });
        bossLabel.x = 5;
        bossLabel.y = CARD_HEIGHT - 15;
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
