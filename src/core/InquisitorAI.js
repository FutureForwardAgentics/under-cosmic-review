/**
 * InquisitorAI - Grand Galactic Inquisitor commentary system
 * Provides contextual cosmic commentary based on game state
 */

import { INQUISITOR_DIALOGUE, getInquisitorContext } from '../data/inquisitor_dialogue.js';

export class InquisitorAI {
    constructor(gameState) {
        this.gameState = gameState;
        this.commentaryLines = INQUISITOR_DIALOGUE;
        this.lastCommentTime = 0;
        this.evaluationContext = 'NEUTRAL';
        this.recentComments = []; // Track recent comments to avoid repetition
        this.maxRecentComments = 5;
    }

    /**
     * Provide commentary for phase transitions
     */
    providePhaseCommentary(phase) {
        // Get current context
        const context = this.evaluateCosmicSituation();

        // Get appropriate dialogue pool
        const phaseDialogue = this.commentaryLines[phase];
        if (!phaseDialogue) {
            return "Cosmic evaluation continues...";
        }

        // Try to get context-specific dialogue first
        let dialoguePool = phaseDialogue[context] || phaseDialogue.NEUTRAL || [];

        // If no dialogue for this context, fall back to NEUTRAL
        if (dialoguePool.length === 0) {
            dialoguePool = phaseDialogue.NEUTRAL || [];
        }

        // If still no dialogue, return default
        if (dialoguePool.length === 0) {
            return "The cosmic evaluation proceeds.";
        }

        // Select a non-recent comment
        const comment = this.selectNonRecentComment(dialoguePool);

        // Update recent comments
        this.addToRecentComments(comment);
        this.lastCommentTime = Date.now();

        return comment;
    }

    /**
     * Evaluate the current cosmic situation to determine context
     */
    evaluateCosmicSituation() {
        const context = getInquisitorContext(this.gameState);
        this.evaluationContext = context;
        return context;
    }

    /**
     * Provide final verdict when game ends
     */
    provideFinalVerdict(winner) {
        const verdicts = this.commentaryLines.FINAL_VERDICT[winner];
        if (!verdicts || verdicts.length === 0) {
            return `Cosmic review complete. Player ${winner} achieves victory. Status: Approved.`;
        }

        // Select random verdict
        const verdict = verdicts[Math.floor(Math.random() * verdicts.length)];
        return verdict;
    }

    /**
     * Provide special event commentary
     */
    provideSpecialEventCommentary(eventType) {
        const eventDialogue = this.commentaryLines[eventType];
        if (!eventDialogue || eventDialogue.length === 0) {
            return null;
        }

        return this.selectNonRecentComment(eventDialogue);
    }

    /**
     * Select a comment that hasn't been used recently
     */
    selectNonRecentComment(dialoguePool) {
        // Filter out recently used comments
        const availableComments = dialoguePool.filter(
            comment => !this.recentComments.includes(comment)
        );

        // If all comments have been used, reset recent comments
        const poolToUse = availableComments.length > 0 ? availableComments : dialoguePool;

        // Select random comment
        const randomIndex = Math.floor(Math.random() * poolToUse.length);
        return poolToUse[randomIndex];
    }

    /**
     * Add comment to recent comments tracking
     */
    addToRecentComments(comment) {
        this.recentComments.push(comment);

        // Keep only the most recent comments
        if (this.recentComments.length > this.maxRecentComments) {
            this.recentComments.shift();
        }
    }

    /**
     * Get current cosmic mood for UI display
     */
    getCosmicMood() {
        const context = this.evaluationContext;

        const moodMap = {
            'NEUTRAL': 'EVALUATING',
            'BALANCED_EVALUATION': 'OBSERVING',
            'DOMINANT_ANTAGONIST': 'IMPRESSED',
            'COSMIC_TENSION': 'ANTICIPATING',
            'EARLY_GAME': 'MONITORING'
        };

        return moodMap[context] || 'EVALUATING';
    }

    /**
     * Check if special event should trigger commentary
     */
    checkSpecialEvents(gameState, phaseResults) {
        // Epic hero defeated
        if (phaseResults?.epicHeroDefeated) {
            return this.provideSpecialEventCommentary('EPIC_HERO_DEFEATED');
        }

        // Epic hero survived
        if (phaseResults?.epicHeroSurvived) {
            return this.provideSpecialEventCommentary('EPIC_HERO_SURVIVED');
        }

        // Perfect turn (all heroes defeated)
        if (phaseResults?.perfectTurn) {
            return this.provideSpecialEventCommentary('PERFECT_TURN');
        }

        // Total failure (all heroes survived)
        if (phaseResults?.totalFailure) {
            return this.provideSpecialEventCommentary('TOTAL_FAILURE');
        }

        return null;
    }

    /**
     * Get cosmic balance assessment
     */
    getCosmicBalance() {
        const scoreDiff = this.gameState.getCosmicScoreDifferential();

        if (scoreDiff === 0) {
            return 'PERFECT_BALANCE';
        } else if (scoreDiff <= 1) {
            return 'STABLE';
        } else if (scoreDiff <= 3) {
            return 'SHIFTING';
        } else {
            return 'IMBALANCED';
        }
    }

    /**
     * Update game state reference (if needed)
     */
    updateGameState(newGameState) {
        this.gameState = newGameState;
    }
}
