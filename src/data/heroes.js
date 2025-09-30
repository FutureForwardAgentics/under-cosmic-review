/**
 * Cosmic Test Protagonists - Hero card definitions
 */

export const HEROES = [
    // Standard Protagonists
    {
        name: "Brock Samson",
        health: 6,
        treasure: 'government',
        isEpic: false,
        description: "Unstoppable bodyguard"
    },
    {
        name: "Dean Venture",
        health: 3,
        treasure: 'science',
        isEpic: false,
        description: "Nervous science enthusiast",
        bumbling: true // 25% chance to trigger abilities incorrectly
    },
    {
        name: "Hank Venture",
        health: 4,
        treasure: 'dramatic',
        isEpic: false,
        description: "Wannabe action hero",
        bumbling: true
    },
    {
        name: "Colonel Gentleman",
        health: 5,
        treasure: 'government',
        isEpic: false,
        description: "Retired adventurer"
    },
    {
        name: "The Alchemist",
        health: 4,
        treasure: 'science',
        isEpic: false,
        description: "Reformed villain"
    },
    {
        name: "Shore Leave",
        health: 5,
        treasure: 'government',
        isEpic: false,
        description: "OSI operative"
    },
    {
        name: "Pete White",
        health: 3,
        treasure: 'science',
        isEpic: false,
        description: "Computer expert"
    },
    {
        name: "Billy Quizboy",
        health: 3,
        treasure: 'science',
        isEpic: false,
        description: "Boy genius"
    },
    {
        name: "Hunter Gathers",
        health: 6,
        treasure: 'government',
        isEpic: false,
        description: "OSI Commander"
    },
    {
        name: "Triana Orpheus",
        health: 4,
        treasure: 'dramatic',
        isEpic: false,
        description: "Goth sorceress-in-training"
    },

    // Epic Protagonists (worth 2 trials/failures)
    {
        name: "Dr. Venture",
        health: 8,
        treasure: 'science',
        isEpic: true,
        description: "Paranoid super-scientist",
        specialAbility: "May panic and flee before full assessment"
    },
    {
        name: "The Monarch (Protagonist)",
        health: 10,
        treasure: 'dramatic',
        isEpic: true,
        description: "Rival antagonist",
        specialAbility: "+1 damage vs Team Venture"
    },
    {
        name: "Phantom Limb (Protagonist)",
        health: 9,
        treasure: 'government',
        isEpic: true,
        description: "Former Guild Council member"
    }
];
