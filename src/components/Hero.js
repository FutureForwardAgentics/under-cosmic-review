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
        // Red background for heroes
        this.bg.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .fill(0xF44336);

        // Gold border for epic heroes
        const borderColor = this.cardData.isEpic ? 0xFFD700 : 0xFFFFFF;
        const borderWidth = this.cardData.isEpic ? 3 : 2;

        this.border.rect(0, 0, CARD_WIDTH, CARD_HEIGHT)
            .stroke({ color: borderColor, width: borderWidth });

        // Clear previous text
        this.textContainer.removeChildren();

        // Hero name
        const nameText = new PIXI.Text({
            text: this.cardData.name || 'Unknown Hero',
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

        // Health value
        const healthText = new PIXI.Text({
            text: `❤️ ${this.cardData.health}`,
            style: {
                fontSize: 14,
                fill: 0xFFFFFF,
                fontWeight: 'bold'
            }
        });
        healthText.x = 5;
        healthText.y = 35;
        this.textContainer.addChild(healthText);

        // Treasure symbol
        const treasureSymbol = TREASURE_SYMBOLS[this.cardData.treasure] || '?';
        const treasureText = new PIXI.Text({
            text: treasureSymbol,
            style: {
                fontSize: 20,
                fill: 0xFFFFFF
            }
        });
        treasureText.x = CARD_WIDTH - 30;
        treasureText.y = 35;
        this.textContainer.addChild(treasureText);

        // Epic indicator
        if (this.cardData.isEpic) {
            const epicText = new PIXI.Text({
                text: '⭐ EPIC',
                style: {
                    fontSize: 8,
                    fill: 0xFFD700,
                    fontWeight: 'bold'
                }
            });
            epicText.x = 5;
            epicText.y = CARD_HEIGHT - 15;
            this.textContainer.addChild(epicText);
        }

        // Bumbling indicator
        if (this.cardData.bumbling) {
            const bumblingText = new PIXI.Text({
                text: '💫',
                style: {
                    fontSize: 12
                }
            });
            bumblingText.x = CARD_WIDTH - 20;
            bumblingText.y = CARD_HEIGHT - 20;
            this.textContainer.addChild(bumblingText);
        }
    }

    /**
     * Get card color - always red for heroes
     */
    getCardColor() {
        return 0xF44336;
    }
}
