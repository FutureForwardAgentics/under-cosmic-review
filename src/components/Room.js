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

        // Card background
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(color);

        // Gold border for advanced rooms, playable rooms, or white otherwise
        let borderColor = 0xFFFFFF;
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

        // Clear previous text
        this.textContainer.removeChildren();

        // Room name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown Room',
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

        // Damage value
        const damageText = new PIXI.Text({
            text: `⚔️ ${this.cardData.damage}`,
            style: {
                fontSize: 14,
                fill: 0xFFFFFF,
                fontWeight: 'bold'
            }
        });
        damageText.x = 5;
        damageText.y = 35;
        this.textContainer.addChild(damageText);

        // Treasure symbols
        if (this.cardData.treasure) {
            let treasureX = 5;
            let treasureY = 55;

            Object.entries(this.cardData.treasure).forEach(([type, count]) => {
                const symbol = TREASURE_SYMBOLS[type] || '?';

                for (let i = 0; i < count; i++) {
                    const treasureText = new PIXI.Text({
                        text: symbol,
                        style: {
                            fontSize: 16,
                            fill: 0xFFFFFF
                        }
                    });
                    treasureText.x = treasureX;
                    treasureText.y = treasureY;
                    this.textContainer.addChild(treasureText);

                    treasureX += 20;
                    if (treasureX > CARD_WIDTH - 20) {
                        treasureX = 5;
                        treasureY += 20;
                    }
                }
            });
        }

        // Type indicator (advanced)
        if (this.cardData.type === 'advanced') {
            const typeText = new PIXI.Text({
                text: 'ADV',
                style: {
                    fontSize: 8,
                    fill: 0xFFD700,
                    fontWeight: 'bold'
                }
            });
            typeText.x = CARD_WIDTH - 28;
            typeText.y = CARD_HEIGHT - 15;
            this.textContainer.addChild(typeText);
        }
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
