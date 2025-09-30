/**
 * Installation and Cosmic Intervention Cards
 */

// Antagonist Installation Cards (Room Cards)
export const ROOMS = [
    // Ordinary Installations
    {
        name: "Death Ray Chamber",
        damage: 3,
        treasure: { science: 1 },
        type: 'ordinary',
        description: "Classic antagonist technology"
    },
    {
        name: "Death Ray Chamber",
        damage: 3,
        treasure: { science: 1 },
        type: 'ordinary',
        description: "Classic antagonist technology"
    },
    {
        name: "Dramatic Reveal Room",
        damage: 2,
        treasure: { dramatic: 1 },
        type: 'ordinary',
        description: "For theatrical confrontations"
    },
    {
        name: "Dramatic Reveal Room",
        damage: 2,
        treasure: { dramatic: 1 },
        type: 'ordinary',
        description: "For theatrical confrontations"
    },
    {
        name: "Corporate Boardroom",
        damage: 1,
        treasure: { corporate: 2 },
        type: 'ordinary',
        description: "Economic manipulation center"
    },
    {
        name: "Corporate Boardroom",
        damage: 1,
        treasure: { corporate: 2 },
        type: 'ordinary',
        description: "Economic manipulation center"
    },
    {
        name: "Secret Laboratory",
        damage: 2,
        treasure: { science: 2 },
        type: 'ordinary',
        description: "Experimental research facility"
    },
    {
        name: "Secret Laboratory",
        damage: 2,
        treasure: { science: 2 },
        type: 'ordinary',
        description: "Experimental research facility"
    },
    {
        name: "Butterfly Sanctuary",
        damage: 1,
        treasure: { dramatic: 1 },
        type: 'ordinary',
        description: "The Monarch's special touch"
    },
    {
        name: "Butterfly Sanctuary",
        damage: 1,
        treasure: { dramatic: 1 },
        type: 'ordinary',
        description: "The Monarch's special touch"
    },
    {
        name: "Henchmen Quarters",
        damage: 1,
        treasure: { corporate: 1 },
        type: 'ordinary',
        description: "Where numbered minions reside"
    },
    {
        name: "Henchmen Quarters",
        damage: 1,
        treasure: { corporate: 1 },
        type: 'ordinary',
        description: "Where numbered minions reside"
    },
    {
        name: "Trap Corridor",
        damage: 2,
        treasure: { government: 1 },
        type: 'ordinary',
        description: "Standard infiltration deterrent"
    },
    {
        name: "Trap Corridor",
        damage: 2,
        treasure: { government: 1 },
        type: 'ordinary',
        description: "Standard infiltration deterrent"
    },
    {
        name: "Interrogation Chamber",
        damage: 2,
        treasure: { government: 1 },
        type: 'ordinary',
        description: "For extracting information"
    },
    {
        name: "Torture Room",
        damage: 3,
        treasure: { dramatic: 1 },
        type: 'ordinary',
        description: "Dramatic but effective"
    },

    // Advanced Installations
    {
        name: "The Cocoon",
        damage: 4,
        treasure: { dramatic: 1 },
        type: 'advanced',
        description: "The Monarch's flying fortress",
        upgradeRequirement: "dramatic"
    },
    {
        name: "The Cocoon",
        damage: 4,
        treasure: { dramatic: 1 },
        type: 'advanced',
        description: "The Monarch's flying fortress",
        upgradeRequirement: "dramatic"
    },
    {
        name: "Ünderbheit's Jaw Trap",
        damage: 5,
        treasure: { science: 1 },
        type: 'advanced',
        description: "Mechanical monstrosity",
        upgradeRequirement: "science"
    },
    {
        name: "Guild Council Chamber",
        damage: 3,
        treasure: { government: 1 },
        type: 'advanced',
        description: "Where cosmic judgments are made",
        upgradeRequirement: "government",
        specialAbility: "Draw extra card"
    },
    {
        name: "Corporate Pyramid Scheme",
        damage: 2,
        treasure: { corporate: 2 },
        type: 'advanced',
        description: "Multi-level manipulation",
        upgradeRequirement: "corporate"
    }
];

// Cosmic Intervention Cards (Spell Cards)
export const SPELLS = [
    {
        name: "Galactic Override!",
        type: 'spell',
        effect: 'cancel_ability',
        description: "Cancel opponent's installation ability"
    },
    {
        name: "Galactic Override!",
        type: 'spell',
        effect: 'cancel_ability',
        description: "Cancel opponent's installation ability"
    },
    {
        name: "Henchmen Deployment!",
        type: 'spell',
        effect: 'add_damage',
        damageBonus: 2,
        description: "Add 2 damage to any installation this turn"
    },
    {
        name: "Henchmen Deployment!",
        type: 'spell',
        effect: 'add_damage',
        damageBonus: 2,
        description: "Add 2 damage to any installation this turn"
    },
    {
        name: "Cosmic Revelation!",
        type: 'spell',
        effect: 'force_move',
        description: "Force protagonist to enter specific installation"
    },
    {
        name: "Scientific Breakthrough!",
        type: 'spell',
        effect: 'draw_card',
        description: "Draw extra installation card"
    },
    {
        name: "Scientific Breakthrough!",
        type: 'spell',
        effect: 'draw_card',
        description: "Draw extra installation card"
    },
    {
        name: "Violation Recorded!",
        type: 'spell',
        effect: 'add_failure',
        description: "Give opponent a cosmic failure"
    },
    {
        name: "Guild Mandate",
        type: 'spell',
        effect: 'steal_hero',
        description: "Steal a protagonist from opponent's trial"
    }
];

// Treasure symbols for UI display
export const TREASURE_SYMBOLS = {
    science: '🔬',
    dramatic: '🎭',
    corporate: '💼',
    government: '🎖️'
};

// Treasure colors for UI
export const TREASURE_COLORS = {
    science: 0x4CAF50,      // Green
    dramatic: 0xFF9800,     // Orange
    corporate: 0x2196F3,    // Blue
    government: 0x9C27B0    // Purple
};
