/**
 * GameState - Central game state management with cosmic oversight
 * Tracks all game data including players, decks, phases, and cosmic evaluation metrics
 */

export class GameState {
    constructor() {
        this.currentPhase = 'COSMIC_INITIALIZATION';
        this.currentPlayer = 1;
        this.turnNumber = 1;
        this.passedPlayers = [];

        // Player data under cosmic review
        this.players = [
            {
                id: 1,
                antagonist: null,
                hand: [],
                installations: [], // Renamed from 'lair' to match CLAUDE.md
                cosmicTrials: 0,
                cosmicFailures: 0,
                cosmicRanking: 0
            },
            {
                id: 2,
                antagonist: null,
                hand: [],
                installations: [],
                cosmicTrials: 0,
                cosmicFailures: 0,
                cosmicRanking: 0
            }
        ];

        // Cosmic evaluation areas
        this.protagonistsInCosmos = []; // Renamed from 'heroesInTown'
        this.currentCosmicTrial = []; // Renamed from 'currentScheme'

        // Decks
        this.decks = {
            protagonists: [],
            installations: [],
            cosmicInterventions: [] // Spell cards
        };

        // Inquisitor state
        this.inquisitorMood = 'EVALUATING';
        this.lastInquisitorComment = '';
        this.cosmicBalance = 'STABLE';

        // Game state flags
        this.gameOver = false;
        this.winner = null;
    }

    /**
     * Shuffle a deck using Fisher-Yates algorithm
     */
    shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    /**
     * Draw a card from specified deck to player's hand
     */
    drawCard(playerIndex, deckType) {
        const deck = this.decks[deckType];
        if (deck.length === 0) return null;

        const card = deck.pop();
        const cardWithId = { ...card, id: Date.now() + Math.random() };
        this.players[playerIndex].hand.push(cardWithId);
        return cardWithId;
    }

    /**
     * Calculate total treasure of a specific type for a player
     * Includes boss treasure and all installation treasures
     */
    getTreasureCount(playerIndex, treasureType) {
        const player = this.players[playerIndex];
        let count = 0;

        // Count from antagonist (boss)
        if (player.antagonist && player.antagonist.treasure[treasureType]) {
            count += player.antagonist.treasure[treasureType];
        }

        // Count from installations (rooms)
        player.installations.forEach(installation => {
            if (installation && installation.treasure && installation.treasure[treasureType]) {
                count += installation.treasure[treasureType];
            }
        });

        return count;
    }

    /**
     * Get all treasure types and counts for a player
     */
    getAllTreasures(playerIndex) {
        const treasures = {
            science: this.getTreasureCount(playerIndex, 'science'),
            dramatic: this.getTreasureCount(playerIndex, 'dramatic'),
            corporate: this.getTreasureCount(playerIndex, 'corporate'),
            government: this.getTreasureCount(playerIndex, 'government')
        };
        return treasures;
    }

    /**
     * Check victory conditions
     * Win: 10 cosmic trials, Lose: 5 cosmic failures
     */
    checkVictory() {
        this.players.forEach((player, index) => {
            if (player.cosmicTrials >= 10) {
                this.gameOver = true;
                this.winner = index + 1;
            } else if (player.cosmicFailures >= 5) {
                this.gameOver = true;
                this.winner = (index === 0) ? 2 : 1;
            }
        });

        return this.gameOver;
    }

    /**
     * Get the current cosmic score differential
     * Used by Inquisitor to determine commentary context
     */
    getCosmicScoreDifferential() {
        const p1Score = this.players[0].cosmicTrials - this.players[0].cosmicFailures;
        const p2Score = this.players[1].cosmicTrials - this.players[1].cosmicFailures;
        return Math.abs(p1Score - p2Score);
    }

    /**
     * Switch to the next player
     */
    nextPlayer() {
        this.currentPlayer = (this.currentPlayer === 1) ? 2 : 1;
    }

    /**
     * Reset for new turn
     */
    startNewTurn() {
        this.turnNumber++;
        this.currentPlayer = 1;
        this.passedPlayers = [];
        this.currentCosmicTrial = [];
    }

    /**
     * Determine XP order for build phase (highest XP goes first)
     */
    getPlayerOrderByXP() {
        const playerOrder = [...this.players].map((p, index) => ({
            playerIndex: index,
            xp: p.antagonist ? p.antagonist.xp : 0
        }));

        playerOrder.sort((a, b) => b.xp - a.xp);
        return playerOrder.map(p => p.playerIndex);
    }

    /**
     * Export minimal state for debugging
     */
    getDebugState() {
        return {
            phase: this.currentPhase,
            turn: this.turnNumber,
            player: this.currentPlayer,
            p1Score: `${this.players[0].cosmicTrials}/${this.players[0].cosmicFailures}`,
            p2Score: `${this.players[1].cosmicTrials}/${this.players[1].cosmicFailures}`,
            protagonists: this.protagonistsInCosmos.length,
            inquisitorMood: this.inquisitorMood
        };
    }
}
