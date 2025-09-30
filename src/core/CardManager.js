/**
 * CardManager - Manages card decks, dealing, and card operations
 */

export class CardManager {
    constructor(gameState) {
        this.gameState = gameState;
    }

    /**
     * Initialize all decks with card data
     */
    initializeDecks(bossesData, heroesData, cardsData) {
        // Initialize protagonist deck
        this.gameState.decks.protagonists = [...heroesData];
        this.gameState.shuffleDeck(this.gameState.decks.protagonists);

        // Initialize installations deck
        this.gameState.decks.installations = [...cardsData.rooms];
        this.gameState.shuffleDeck(this.gameState.decks.installations);

        // Initialize cosmic interventions (spells)
        this.gameState.decks.cosmicInterventions = [...cardsData.spells];
        this.gameState.shuffleDeck(this.gameState.decks.cosmicInterventions);
    }

    /**
     * Assign bosses to players
     */
    assignAntagonists(bossesData) {
        // For now, assign first two bosses
        // TODO: Add boss selection UI
        const bossKeys = Object.keys(bossesData);
        this.gameState.players[0].antagonist = { ...bossesData[bossKeys[0]], key: bossKeys[0] };
        this.gameState.players[1].antagonist = { ...bossesData[bossKeys[1]], key: bossKeys[1] };

        // Set initial cosmic ranking based on XP
        this.gameState.players[0].cosmicRanking = this.gameState.players[0].antagonist.xp;
        this.gameState.players[1].cosmicRanking = this.gameState.players[1].antagonist.xp;
    }

    /**
     * Deal initial hands to all players
     */
    dealInitialHands(cardsPerPlayer = 5) {
        for (let i = 0; i < this.gameState.players.length; i++) {
            for (let j = 0; j < cardsPerPlayer; j++) {
                this.gameState.drawCard(i, 'installations');
            }
        }
    }

    /**
     * Draw cards for all players (usually at turn start)
     */
    drawPhaseCards(cardsPerPlayer = 1) {
        for (let i = 0; i < this.gameState.players.length; i++) {
            for (let j = 0; j < cardsPerPlayer; j++) {
                this.gameState.drawCard(i, 'installations');
            }
        }
    }

    /**
     * Reveal heroes at the start of a turn
     */
    revealProtagonists(count = 2) {
        const revealed = [];
        for (let i = 0; i < count; i++) {
            if (this.gameState.decks.protagonists.length > 0) {
                const protagonist = this.gameState.decks.protagonists.pop();
                const protagonistWithId = { ...protagonist, id: Date.now() + Math.random() + i };
                this.gameState.protagonistsInCosmos.push(protagonistWithId);
                revealed.push(protagonistWithId);
            }
        }
        return revealed;
    }

    /**
     * Play a card from hand to installations
     */
    playCard(playerIndex, cardIndex, faceDown = true) {
        const player = this.gameState.players[playerIndex];

        if (cardIndex < 0 || cardIndex >= player.hand.length) {
            return false;
        }

        if (player.installations.length >= 5) {
            return false; // Max 5 installations + boss
        }

        const card = player.hand.splice(cardIndex, 1)[0];
        card.faceDown = faceDown;
        card.playedThisTurn = true;
        player.installations.push(card);

        return true;
    }

    /**
     * Reveal all face-down installations
     */
    revealAllInstallations() {
        this.gameState.players.forEach(player => {
            player.installations.forEach(installation => {
                if (installation.faceDown) {
                    installation.faceDown = false;
                }
            });
        });
    }

    /**
     * Move protagonist from cosmos to a player's trial area
     */
    moveProtagonistToTrial(protagonist, targetPlayerIndex) {
        this.gameState.currentCosmicTrial.push({
            cardData: protagonist,
            cardType: 'hero',
            targetPlayer: targetPlayerIndex
        });

        // Remove from cosmos
        const index = this.gameState.protagonistsInCosmos.findIndex(p => p.id === protagonist.id);
        if (index >= 0) {
            this.gameState.protagonistsInCosmos.splice(index, 1);
        }
    }

    /**
     * Calculate hero attraction based on treasure matching
     * Returns player index with highest matching treasure
     */
    calculateProtagonistAttraction(protagonist) {
        let bestPlayer = -1;
        let bestTreasure = 0;

        this.gameState.players.forEach((player, playerIndex) => {
            const treasureCount = this.gameState.getTreasureCount(playerIndex, protagonist.treasure);

            if (treasureCount > bestTreasure) {
                bestTreasure = treasureCount;
                bestPlayer = playerIndex;
            } else if (treasureCount === bestTreasure && treasureCount > 0) {
                // Tie-breaking: higher XP wins (cosmic ranking)
                if (player.cosmicRanking > this.gameState.players[bestPlayer].cosmicRanking) {
                    bestPlayer = playerIndex;
                }
            }
        });

        return { playerIndex: bestPlayer, treasureCount: bestTreasure };
    }

    /**
     * Process all protagonist attractions
     */
    processProtagonistAttraction() {
        const attractions = [];

        // Process each protagonist in cosmos
        [...this.gameState.protagonistsInCosmos].forEach(protagonist => {
            const { playerIndex, treasureCount } = this.calculateProtagonistAttraction(protagonist);

            if (playerIndex >= 0 && treasureCount > 0) {
                this.moveProtagonistToTrial(protagonist, playerIndex);
                attractions.push({
                    protagonist: protagonist.name,
                    player: playerIndex + 1,
                    treasureCount
                });
            }
        });

        return attractions;
    }

    /**
     * Clear all trial areas
     */
    clearCosmicTrials() {
        this.gameState.currentCosmicTrial = [];
    }

    /**
     * Get deck status for UI display
     */
    getDeckStatus() {
        return {
            protagonists: this.gameState.decks.protagonists.length,
            installations: this.gameState.decks.installations.length,
            cosmicInterventions: this.gameState.decks.cosmicInterventions.length
        };
    }
}
