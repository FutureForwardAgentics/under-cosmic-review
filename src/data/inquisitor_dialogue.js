/**
 * Grand Galactic Inquisitor Dialogue Database
 * All cosmic commentary lines organized by phase and context
 */

export const INQUISITOR_DIALOGUE = {
    // Game initialization
    COSMIC_INITIALIZATION: {
        NEUTRAL: [
            "Cosmic evaluation protocols... initializing. Guild antagonists, prepare for assessment.",
            "The cosmic balance requires evaluation. Present your antagonist credentials.",
            "Galactic oversight commencing. Your schemes shall be... measured.",
            "Let the cosmic review begin. All protagonists and antagonists will be judged."
        ]
    },

    // Protagonist emergence phase
    PROTAGONIST_EMERGENCE: {
        NEUTRAL: [
            "Protagonists emerge seeking glory. Standard cosmic testing procedures engaged.",
            "Test subjects materializing. Antagonist effectiveness trials... beginning.",
            "The universe provides challengers. Your installations await evaluation.",
            "New cosmic trials approach. Your antagonist prowess will be tested."
        ],
        EARLY_GAME: [
            "The cosmic dance begins. Protagonists and antagonists align.",
            "First trials emerging. Let us observe your tactical acumen.",
            "Heroes step forth. Show me your Guild credentials."
        ]
    },

    // Installation construction phase
    INSTALLATION_CONSTRUCTION: {
        NEUTRAL: [
            "Present your antagonist installations for cosmic review. Concealment protocols... acceptable.",
            "Construction phase under galactic observation. Your schemes will be... assessed.",
            "Installation secrecy maintained. The cosmic eye sees all... eventually.",
            "Build your defenses, antagonists. The universe watches with interest."
        ],
        DOMINANT_ANTAGONIST: [
            "One player demonstrates superior cosmic planning. Impressive... for now.",
            "A clear leader emerges in installation quality. Balance shall be restored.",
            "Galactic dominance noted. But cosmic evaluation is far from complete."
        ],
        COSMIC_TENSION: [
            "Tensions rise as cosmic judgment approaches. Your installations must prove worthy.",
            "Time grows short. Installations must demonstrate maximum efficiency.",
            "The final evaluations near. Choose your constructions wisely."
        ]
    },

    // Cosmic attraction phase
    COSMIC_ATTRACTION: {
        NEUTRAL: [
            "Observing protagonist selection patterns. Cosmic magnetism principles... engaging.",
            "The universe aligns. Protagonists drawn to their designated trials.",
            "Cosmic forces guide the unwary. Your installations' allure... measured.",
            "Attraction protocols complete. Let the trials commence."
        ],
        BALANCED_EVALUATION: [
            "Cosmic balance maintained. Both antagonists attract equal attention.",
            "The universe remains neutral. Both sides show equal promise."
        ],
        DOMINANT_ANTAGONIST: [
            "One antagonist proves exceptionally... attractive to cosmic tests. Curious.",
            "Significant protagonist concentration detected. This shall prove interesting."
        ]
    },

    // Trial execution phase
    TRIAL_EXECUTION: {
        NEUTRAL: [
            "Executing cosmic trials. Measuring antagonist effectiveness against protagonist resolve.",
            "The moment of truth arrives. Your schemes face ultimate evaluation.",
            "Cosmic judgment flows. Success and failure dance in the balance.",
            "Trials proceed. The universe observes all outcomes."
        ],
        BALANCED_EVALUATION: [
            "Both antagonists perform adequately. Cosmic balance maintained.",
            "Equal prowess demonstrated. The universe remains undecided."
        ],
        DOMINANT_ANTAGONIST: [
            "One player achieves superior cosmic trial results. Dominance acknowledged.",
            "Exceptional performance noted. But can it be sustained?"
        ],
        COSMIC_TENSION: [
            "Critical trials execute. Cosmic standing hangs in the balance.",
            "The decisive moment. All antagonist reputations are at stake."
        ]
    },

    // Cosmic evaluation phase
    COSMIC_EVALUATION: {
        NEUTRAL: [
            "Tallying cosmic performance metrics. The universe keeps score.",
            "Evaluation cycle complete. Antagonist rankings... updated.",
            "Another cycle measured. The cosmic ledger reflects all.",
            "Results recorded. Cosmic standing adjusted accordingly."
        ],
        EARLY_GAME: [
            "Initial evaluation complete. Much cosmic testing remains.",
            "First scores recorded. The true evaluation has only begun."
        ],
        BALANCED_EVALUATION: [
            "Cosmic equilibrium maintained. Both antagonists show equal merit.",
            "The universe remains balanced. Neither side gains advantage."
        ],
        DOMINANT_ANTAGONIST: [
            "One antagonist pulls ahead. Cosmic superiority... emerging.",
            "Significant score differential noted. Balance must be restored.",
            "Leadership established. But cosmic evaluation is never complete."
        ],
        COSMIC_TENSION: [
            "The end approaches. Cosmic judgment nearly complete.",
            "Final evaluations imminent. Who shall prove worthy?",
            "Victory draws near for one. The universe watches closely."
        ]
    },

    // Final verdicts (when game ends)
    FINAL_VERDICT: {
        1: [
            "Cosmic review complete. Player One demonstrates superior antagonist-protagonist relationship management. Status: Approved for continued operations.",
            "Assessment concluded. Player One achieves optimal cosmic balance. Authorization granted for expanded schemes.",
            "Final judgment rendered. Player One displays exemplary Guild protocols. Cosmic approval: GRANTED.",
            "Evaluation finished. Player One proves cosmic superiority. May your schemes continue to maintain balance."
        ],
        2: [
            "Cosmic review complete. Player Two demonstrates superior antagonist-protagonist relationship management. Status: Approved for continued operations.",
            "Assessment concluded. Player Two achieves optimal cosmic balance. Authorization granted for expanded schemes.",
            "Final judgment rendered. Player Two displays exemplary Guild protocols. Cosmic approval: GRANTED.",
            "Evaluation finished. Player Two proves cosmic superiority. May your schemes continue to maintain balance."
        ]
    },

    // Special events
    EPIC_HERO_DEFEATED: [
        "Impressive. Epic protagonist neutralized. Cosmic credentials... validated.",
        "Significant cosmic victory. Epic trial overcome. Most satisfactory.",
        "An epic falls. Your antagonist prowess is... noteworthy."
    ],

    EPIC_HERO_SURVIVED: [
        "Concerning. Epic protagonist persists. Cosmic standing... diminished.",
        "Epic trial failed. This reflects poorly on your antagonist credentials.",
        "The epic endures. Your installations prove... inadequate."
    ],

    PERFECT_TURN: [
        "Flawless execution. All protagonists neutralized. Cosmic excellence achieved.",
        "Remarkable. Complete trial success. The universe takes notice."
    ],

    TOTAL_FAILURE: [
        "Total protagonist survival. Your cosmic standing suffers greatly.",
        "Complete installation failure. Most... disappointing."
    ]
};

/**
 * Get context based on game state
 */
export function getInquisitorContext(gameState) {
    const scoreDiff = gameState.getCosmicScoreDifferential();
    const turnNumber = gameState.turnNumber;

    if (turnNumber >= 8) {
        return 'COSMIC_TENSION';
    } else if (scoreDiff >= 3) {
        return 'DOMINANT_ANTAGONIST';
    } else if (turnNumber <= 2) {
        return 'EARLY_GAME';
    } else {
        return 'BALANCED_EVALUATION';
    }
}
