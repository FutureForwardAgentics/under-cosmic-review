/**
 * PhaseManager - Manages game phases with Inquisitor commentary
 * Orchestrates the flow through all 6 cosmic evaluation phases
 */

export class PhaseManager {
    constructor(gameState, cardManager, inquisitorAI = null) {
        this.gameState = gameState;
        this.cardManager = cardManager;
        this.inquisitor = inquisitorAI;

        this.phaseHandlers = {
            'COSMIC_INITIALIZATION': this.handleCosmicInit.bind(this),
            'PROTAGONIST_EMERGENCE': this.handleProtagonistPhase.bind(this),
            'INSTALLATION_CONSTRUCTION': this.handleBuild.bind(this),
            'COSMIC_ATTRACTION': this.handleBait.bind(this),
            'TRIAL_EXECUTION': this.handleScheme.bind(this),
            'COSMIC_EVALUATION': this.handleEnd.bind(this)
        };

        // Callbacks for UI updates
        this.onPhaseChange = null;
        this.onCommentary = null;
    }

    /**
     * Advance to the next phase
     */
    nextPhase() {
        const handler = this.phaseHandlers[this.gameState.currentPhase];

        if (handler) {
            // Get Inquisitor commentary before phase transition
            if (this.inquisitor && this.onCommentary) {
                const commentary = this.inquisitor.providePhaseCommentary(this.gameState.currentPhase);
                this.onCommentary(commentary);
            }

            // Execute phase handler
            handler();

            // Notify UI of phase change
            if (this.onPhaseChange) {
                this.onPhaseChange(this.gameState.currentPhase);
            }
        }
    }

    /**
     * COSMIC_INITIALIZATION - Game setup phase
     */
    handleCosmicInit() {
        // Transition to protagonist emergence
        this.gameState.currentPhase = 'PROTAGONIST_EMERGENCE';
        this.gameState.currentPlayer = 1;
    }

    /**
     * PROTAGONIST_EMERGENCE - Deal heroes at turn start
     */
    handleProtagonistPhase() {
        // Reveal protagonists (1 per player)
        const protagonistsPerTurn = 2;
        this.cardManager.revealProtagonists(protagonistsPerTurn);

        // Each player draws a card
        this.cardManager.drawPhaseCards(1);

        // Transition to build phase
        this.gameState.currentPhase = 'INSTALLATION_CONSTRUCTION';
        this.gameState.currentPlayer = 1;
        this.gameState.passedPlayers = [];
    }

    /**
     * INSTALLATION_CONSTRUCTION - Players build their lairs
     * This phase requires player input, so it doesn't auto-advance
     */
    handleBuild() {
        // This is a player action phase
        // The phase will advance when all players pass or play cards
        // UI should handle player actions and call advanceBuildPhase when ready
    }

    /**
     * Called by UI when a player plays a card during build phase
     */
    playerBuildAction(playerIndex, cardIndex) {
        if (this.gameState.currentPhase !== 'INSTALLATION_CONSTRUCTION') {
            return false;
        }

        if (playerIndex !== this.gameState.currentPlayer - 1) {
            return false;
        }

        // Play the card
        const success = this.cardManager.playCard(playerIndex, cardIndex, true);

        if (success) {
            // Switch to next player or end phase
            this.advanceBuildPhase();
        }

        return success;
    }

    /**
     * Called when a player passes during build phase
     */
    playerPass() {
        if (this.gameState.currentPhase !== 'INSTALLATION_CONSTRUCTION') {
            return;
        }

        const currentPlayerIndex = this.gameState.currentPlayer - 1;

        if (!this.gameState.passedPlayers.includes(currentPlayerIndex)) {
            this.gameState.passedPlayers.push(currentPlayerIndex);
        }

        this.advanceBuildPhase();
    }

    /**
     * Advance the build phase to next player or next phase
     */
    advanceBuildPhase() {
        // Check if all players have passed
        if (this.gameState.passedPlayers.length >= this.gameState.players.length) {
            // All passed, reveal rooms and move to bait phase
            this.cardManager.revealAllInstallations();
            this.gameState.currentPhase = 'COSMIC_ATTRACTION';

            if (this.onPhaseChange) {
                this.onPhaseChange(this.gameState.currentPhase);
            }
            return;
        }

        // Switch to next player
        this.gameState.nextPlayer();

        if (this.onPhaseChange) {
            this.onPhaseChange(this.gameState.currentPhase);
        }
    }

    /**
     * COSMIC_ATTRACTION - Heroes move to dungeons
     */
    handleBait() {
        // Calculate and process all protagonist attractions
        const attractions = this.cardManager.processProtagonistAttraction();

        // Log attractions for debugging
        console.log('Protagonist Attractions:', attractions);

        // Transition to scheme phase
        this.gameState.currentPhase = 'TRIAL_EXECUTION';
    }

    /**
     * TRIAL_EXECUTION - Resolve combat
     */
    handleScheme() {
        // Process each cosmic trial
        this.gameState.currentCosmicTrial.forEach(trial => {
            if (trial.cardType === 'hero') {
                this.processProtagonistTrial(trial.cardData, trial.targetPlayer);
            }
        });

        // Clear trial area
        this.cardManager.clearCosmicTrials();

        // Check victory conditions
        this.gameState.checkVictory();

        if (this.gameState.gameOver) {
            // Game over - show final verdict
            if (this.inquisitor && this.onCommentary) {
                const verdict = this.inquisitor.provideFinalVerdict(this.gameState.winner);
                this.onCommentary(verdict);
            }
        } else {
            // Continue to evaluation phase
            this.gameState.currentPhase = 'COSMIC_EVALUATION';
        }
    }

    /**
     * Process a single protagonist through a player's installations
     */
    processProtagonistTrial(protagonist, playerIndex) {
        const player = this.gameState.players[playerIndex];
        let currentHealth = protagonist.health;
        let damageDealt = 0;

        // Protagonist goes through each installation
        player.installations.forEach(installation => {
            if (installation && currentHealth > 0) {
                const damage = installation.damage || 0;
                currentHealth -= damage;
                damageDealt += damage;
            }
        });

        // Determine outcome
        if (currentHealth <= 0) {
            // Protagonist defeated - cosmic trial successful
            const trialsGained = protagonist.isEpic ? 2 : 1;
            player.cosmicTrials += trialsGained;

            console.log(`Player ${playerIndex + 1} defeated ${protagonist.name}, gained ${trialsGained} trials`);
        } else {
            // Protagonist survived - cosmic failure
            const failuresGained = protagonist.isEpic ? 2 : 1;
            player.cosmicFailures += failuresGained;

            console.log(`Player ${playerIndex + 1} failed against ${protagonist.name}, gained ${failuresGained} failures`);
        }

        return {
            protagonist: protagonist.name,
            playerIndex,
            damageDealt,
            defeated: currentHealth <= 0,
            remainingHealth: Math.max(0, currentHealth)
        };
    }

    /**
     * COSMIC_EVALUATION - End of turn scoring and cleanup
     */
    handleEnd() {
        // Increment turn counter
        this.gameState.startNewTurn();

        // Check if game should continue
        if (this.gameState.gameOver) {
            return;
        }

        // Loop back to protagonist emergence for next turn
        this.gameState.currentPhase = 'PROTAGONIST_EMERGENCE';
    }

    /**
     * Get current phase display name
     */
    getPhaseName() {
        const phaseNames = {
            'COSMIC_INITIALIZATION': 'Cosmic Initialization',
            'PROTAGONIST_EMERGENCE': 'Protagonist Emergence',
            'INSTALLATION_CONSTRUCTION': 'Installation Construction',
            'COSMIC_ATTRACTION': 'Cosmic Attraction',
            'TRIAL_EXECUTION': 'Trial Execution',
            'COSMIC_EVALUATION': 'Cosmic Evaluation'
        };

        return phaseNames[this.gameState.currentPhase] || this.gameState.currentPhase;
    }

    /**
     * Force phase advance (for debugging or UI buttons)
     */
    forceNextPhase() {
        const phases = [
            'COSMIC_INITIALIZATION',
            'PROTAGONIST_EMERGENCE',
            'INSTALLATION_CONSTRUCTION',
            'COSMIC_ATTRACTION',
            'TRIAL_EXECUTION',
            'COSMIC_EVALUATION'
        ];

        const currentIndex = phases.indexOf(this.gameState.currentPhase);
        if (currentIndex >= 0) {
            if (currentIndex === phases.length - 1) {
                // Wrap to protagonist emergence for next turn
                this.handleEnd();
            } else {
                this.nextPhase();
            }
        }
    }
}
