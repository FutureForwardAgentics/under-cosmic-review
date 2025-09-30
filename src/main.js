/**
 * Main Application Entry Point
 * Initializes the game with cosmic oversight
 */

import { GameState } from './core/GameState.js';
import { CardManager } from './core/CardManager.js';
import { PhaseManager } from './core/GamePhases.js';
import { InquisitorAI } from './core/InquisitorAI.js';
import { Card } from './components/Card.js';
import { Boss } from './components/Boss.js';
import { Hero } from './components/Hero.js';
import { Room } from './components/Room.js';
import { InquisitorPanel } from './components/InquisitorPanel.js';
import { BOSSES } from './data/bosses.js';
import { HEROES } from './data/heroes.js';
import { ROOMS, SPELLS } from './data/cards.js';

// Game Constants
export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 800;
export const CARD_WIDTH = 80;
export const CARD_HEIGHT = 110;

// Global game instances
let app;
let gameState;
let cardManager;
let phaseManager;
let inquisitorAI;
let inquisitorPanel;
let gameScene;

/**
 * Initialize Pixi.js Application
 */
function initPixiApp() {
    app = new PIXI.Application();

    app.init({
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: 0x1a1a2e,
        antialias: true
    }).then(() => {
        document.body.appendChild(app.canvas);

        // Create main game scene
        gameScene = new PIXI.Container();
        app.stage.addChild(gameScene);

        // Initialize game systems
        initGameSystems();
    });
}

/**
 * Initialize game state and managers
 */
function initGameSystems() {
    // Create core game objects
    gameState = new GameState();
    cardManager = new CardManager(gameState);

    // Initialize Inquisitor system
    inquisitorAI = new InquisitorAI(gameState);
    inquisitorPanel = new InquisitorPanel();

    // Create phase manager with Inquisitor
    phaseManager = new PhaseManager(gameState, cardManager, inquisitorAI);

    // Initialize decks
    const cardsData = { rooms: ROOMS, spells: SPELLS };
    cardManager.initializeDecks(BOSSES, HEROES, cardsData);

    // Assign bosses to players
    cardManager.assignAntagonists(BOSSES);

    // Deal initial hands
    cardManager.dealInitialHands(5);

    // Set up phase callbacks
    phaseManager.onPhaseChange = handlePhaseChange;
    phaseManager.onCommentary = handleInquisitorCommentary;

    // Initialize UI
    initGameUI();

    // Start game
    startGame();
}

/**
 * Initialize game UI elements
 */
function initGameUI() {
    // Create UI containers
    const player1Area = new PIXI.Container();
    const player2Area = new PIXI.Container();
    const heroArea = new PIXI.Container();
    const schemeArea = new PIXI.Container();

    gameScene.addChild(player1Area);
    gameScene.addChild(player2Area);
    gameScene.addChild(heroArea);
    gameScene.addChild(schemeArea);

    // Position areas
    player1Area.y = GAME_HEIGHT - 200;
    player2Area.y = 50;
    heroArea.x = 50;
    heroArea.y = GAME_HEIGHT / 2 - 100;
    schemeArea.x = GAME_WIDTH / 2 - 100;
    schemeArea.y = GAME_HEIGHT / 2 - 55;

    // Store references
    window.gameUI = {
        player1Area,
        player2Area,
        heroArea,
        schemeArea
    };

    // Draw initial state
    renderGame();
    updateUIElements();
}

/**
 * Render the entire game state
 */
function renderGame() {
    // Clear existing visuals
    window.gameUI.player1Area.removeChildren();
    window.gameUI.player2Area.removeChildren();
    window.gameUI.heroArea.removeChildren();
    window.gameUI.schemeArea.removeChildren();

    // Render players
    renderPlayer(0, window.gameUI.player1Area);
    renderPlayer(1, window.gameUI.player2Area);

    // Render heroes in cosmos
    renderHeroes();

    // Render cosmic trials
    renderTrials();
}

/**
 * Render a single player's area
 */
function renderPlayer(playerIndex, container) {
    const player = gameState.players[playerIndex];

    // Create hand container
    const handContainer = new PIXI.Container();
    handContainer.y = playerIndex === 0 ? 80 : 0;
    container.addChild(handContainer);

    // Create lair container
    const lairContainer = new PIXI.Container();
    lairContainer.y = playerIndex === 0 ? 0 : 80;
    container.addChild(lairContainer);

    // Render hand
    player.hand.forEach((card, index) => {
        const cardSprite = createCardSprite(card, 'room', false);
        cardSprite.x = index * (CARD_WIDTH + 10);

        // Make interactive if current player's turn
        if (playerIndex === gameState.currentPlayer - 1 &&
            gameState.currentPhase === 'INSTALLATION_CONSTRUCTION') {
            cardSprite.eventMode = 'static';
            cardSprite.cursor = 'pointer';
            cardSprite.on('pointerdown', () => playCard(playerIndex, index));
        }

        handContainer.addChild(cardSprite);
    });

    // Render boss
    if (player.antagonist) {
        const bossCard = createCardSprite(player.antagonist, 'boss', false);
        bossCard.x = playerIndex === 0 ? 0 : (4 * (CARD_WIDTH + 10));
        lairContainer.addChild(bossCard);
    }

    // Render installations
    player.installations.forEach((installation, index) => {
        const installCard = createCardSprite(installation, 'room', installation.faceDown);
        installCard.x = playerIndex === 0 ?
            (index + 1) * (CARD_WIDTH + 10) :
            (3 - index) * (CARD_WIDTH + 10);
        lairContainer.addChild(installCard);
    });
}

/**
 * Render heroes in cosmos
 */
function renderHeroes() {
    gameState.protagonistsInCosmos.forEach((hero, index) => {
        const heroCard = createCardSprite(hero, 'hero', false);
        heroCard.x = index * (CARD_WIDTH + 10);
        window.gameUI.heroArea.addChild(heroCard);
    });
}

/**
 * Render cosmic trials
 */
function renderTrials() {
    gameState.currentCosmicTrial.forEach((trial, index) => {
        const trialCard = createCardSprite(trial.cardData, trial.cardType, false);
        trialCard.x = index * (CARD_WIDTH + 10);
        window.gameUI.schemeArea.addChild(trialCard);
    });
}

/**
 * Create a card component using proper Card classes
 */
function createCardSprite(cardData, cardType, faceDown) {
    let card;

    // Create appropriate card type
    switch (cardType) {
        case 'boss':
            card = new Boss(cardData);
            break;
        case 'hero':
            card = new Hero(cardData);
            break;
        case 'room':
            card = new Room(cardData);
            break;
        default:
            card = new Room(cardData); // Default to room
    }

    // Set face-down state if needed
    if (faceDown) {
        card.setFaceDown(true);
    } else {
        card.reveal();
    }

    return card;
}

/**
 * Handle card play action
 */
function playCard(playerIndex, cardIndex) {
    const success = phaseManager.playerBuildAction(playerIndex, cardIndex);
    if (success) {
        renderGame();
        updateUIElements();
    }
}

/**
 * Handle phase changes
 */
function handlePhaseChange(newPhase) {
    console.log(`Phase changed to: ${newPhase}`);
    renderGame();
    updateUIElements();
}

/**
 * Handle Inquisitor commentary
 */
function handleInquisitorCommentary(commentary) {
    console.log(`Inquisitor: ${commentary}`);

    // Display in UI panel
    if (inquisitorPanel) {
        inquisitorPanel.displayCommentary(commentary, 4000);
    }

    // Update cosmic mood in game state
    if (inquisitorAI) {
        gameState.inquisitorMood = inquisitorAI.getCosmicMood();
        gameState.lastInquisitorComment = commentary;
        gameState.cosmicBalance = inquisitorAI.getCosmicBalance();
    }
}

/**
 * Update DOM UI elements
 */
function updateUIElements() {
    document.getElementById('phaseIndicator').textContent = phaseManager.getPhaseName();
    document.getElementById('turnNumber').textContent = gameState.turnNumber;
    document.getElementById('currentPlayer').textContent = gameState.currentPlayer;
    document.getElementById('p1Trials').textContent = gameState.players[0].cosmicTrials;
    document.getElementById('p1Failures').textContent = gameState.players[0].cosmicFailures;
    document.getElementById('p2Trials').textContent = gameState.players[1].cosmicTrials;
    document.getElementById('p2Failures').textContent = gameState.players[1].cosmicFailures;

    // Debug info
    document.getElementById('debugInfo').textContent = JSON.stringify(gameState.getDebugState(), null, 2);
}

/**
 * Start the game
 */
function startGame() {
    console.log('Game starting...');
    updateUIElements();
    phaseManager.nextPhase(); // Move from COSMIC_INITIALIZATION
}

/**
 * Global UI button handlers
 */
window.nextPhase = function() {
    phaseManager.forceNextPhase();
    renderGame();
    updateUIElements();
};

window.passAction = function() {
    phaseManager.playerPass();
    renderGame();
    updateUIElements();
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPixiApp();
});
