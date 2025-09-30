# CLAUDE.md - Under Cosmic Review

## Project Overview
A web-based adaptation of Boss Monster using The Venture Bros universe, built with HTML5/JavaScript and Pixi.js. Players are Guild of Calamitous Intent antagonists undergoing cosmic evaluation by the Grand Galactic Inquisitor, who serves as game master, providing commentary and judgment throughout all phases of their scheme competitions.

## Technical Stack
- **Engine**: Pixi.js v8.x for 2D graphics and animations
- **Platform**: Web browser (HTML5/CSS3/JavaScript ES6+)
- **Audio**: Web Audio API for Inquisitor voice lines and cosmic sound effects
- **Architecture**: Component-based game objects with state management and dialogue system
- **Build**: Single HTML file with embedded assets for portability

## Game Theme & Narrative

### Core Concept
Transform Boss Monster's dungeon-building into a cosmic evaluation overseen by the Grand Galactic Inquisitor. Players are Guild antagonists whose lair designs and scheme execution are under constant review by the ultimate cosmic authority who maintains protagonist/antagonist balance in the universe.

### The Grand Galactic Inquisitor as Game Master
The Inquisitor provides active commentary, judgment, and cosmic perspective throughout all game phases:
- Narrates phase transitions with cosmic authority
- Comments on player strategies and scheme effectiveness  
- Provides final cosmic verdict on antagonist performance
- Maintains the bureaucratic, evaluative tone from the show

### Thematic Translation
- **Bosses** → Guild Antagonists under cosmic review
- **Heroes** → Protagonists sent as cosmic tests
- **Dungeons** → Antagonist installations for evaluation
- **Souls** → Successful cosmic trials (proven antagonist effectiveness)
- **Wounds** → Failed evaluations (cosmic disappointment)
- **Game Master** → Grand Galactic Inquisitor overseeing all assessments

## Game Mechanics

### Victory Conditions
- **Win**: First to 10 successful cosmic trials (proven antagonist supremacy)
- **Lose**: Accumulate 5 failed evaluations (cosmic disapproval)
- **Scoring**: Trials minus Failures (ties broken by Inquisitor's cosmic judgment)

### Card Types

#### Boss Cards (Guild Antagonists)
- **The Monarch**: Butterfly-themed schemes, Level Up: "Cocoon Protocol Approved"
- **Dr. Girlfriend**: Seduction/manipulation focus, Level Up: "Guild Leadership Validated"
- **Phantom Limb**: Invisible limb powers, Level Up: "Revenge Protocol Sanctioned"
- **The Sovereign**: Shape-shifting authority, Level Up: "Guild Supremacy Confirmed"
- **Baron Ünderbheit**: Mechanical efficiency, Level Up: "Ünderland Operations Authorized"
- **Dr. Venture**: Reluctant antagonist, Level Up: "Scientific Protocols Acknowledged"

#### Treasure Types (Cosmic Evaluation Categories)
- **🔬 Science!** - Technical antagonist installations and experiments
- **🎭 Dramatic** - Theatrical schemes and elaborate psychological operations
- **💼 Corporate** - Economic manipulation and institutional control
- **🎖️ Government** - Political infiltration and authority subversion

#### Room Cards (Antagonist Installations)
**Ordinary Installations:**
- Death Ray Chamber (🔬3 damage, 1 Science treasure)
- Dramatic Reveal Room (🎭2 damage, 1 Dramatic treasure)
- Corporate Boardroom (💼1 damage, 2 Corporate treasure)
- Secret Laboratory (🔬2 damage, 2 Science treasure)
- Butterfly Sanctuary (🎭1 damage, 1 Dramatic treasure)
- Henchmen Quarters (💼1 damage, 1 Corporate treasure)

**Advanced Installations:**
- The Cocoon (🎭4 damage, upgradeable on Dramatic installations)
- Ünderbheit's Jaw Trap (🔬5 damage, upgradeable on Science installations)
- Guild Council Chamber (🎖️3 damage, upgradeable on Government installations)

#### Hero Cards (Cosmic Test Protagonists)
**Standard Protagonists:**
- Brock Samson (⚔️ 6 health, attracted to Government schemes)
- Dean Venture (🔬 3 health, attracted to Science schemes)
- Hank Venture (🎭 4 health, attracted to Dramatic schemes)
- Colonel Gentleman (🎖️ 5 health, attracted to Government schemes)

**Epic Protagonists:**
- Dr. Venture (🔬 8 health, 2 cosmic failures if survives)
- The Monarch (🎭 10 health, rival antagonist mechanics)

#### Spell Cards (Cosmic Interventions)
- **"Galactic Override!"** - Cancel opponent's installation ability
- **"Henchmen Deployment!"** - Add 2 damage to any installation this turn
- **"Cosmic Revelation!"** - Force protagonist to enter specific installation
- **"Scientific Breakthrough!"** - Draw extra installation card
- **"Violation Recorded!"** - Give opponent a cosmic failure

### Special Mechanics

#### Cosmic Evaluation System
The Grand Galactic Inquisitor provides commentary and judgment:
- Phase transition narration with cosmic authority
- Dynamic commentary based on game state and player actions
- Evaluation of antagonist effectiveness vs protagonist resistance
- Final cosmic verdict determining ultimate antagonist ranking

#### Protagonist/Antagonist Relationships
Certain protagonists have established relationships with specific antagonists:
- The Monarch vs Team Venture: +1 damage in all installations (recognized cosmic pairing)
- Phantom Limb vs Guild Council: Immunity to government schemes (cosmic exemption)

#### Bumbling Protagonist Effects
Some protagonists have comedic cosmic flaws:
- Dean/Hank Venture: 25% chance to trigger installation abilities incorrectly
- Dr. Venture: May panic and flee before taking full cosmic assessment

#### Guild Cosmic Ranking
XP values represent cosmic standing and determine evaluation order

## Visual Design & UI

### Art Style
- **Aesthetic**: Vector art mimicking the show's clean animation style with cosmic elements
- **Color Palette**: Deep space purples and cosmic blues with Guild accent colors
- **Characters**: Recognizable character designs with subtle cosmic evaluation overlays
- **Backgrounds**: Stylized installations with cosmic monitoring effects

### UI Layout with Inquisitor Commentary
```
┌─────────────────────────────────────────┐
│ Grand Galactic Inquisitor Commentary    │
│ [Cosmic Evaluation Panel]               │
├─────────────────────────────────────────┤
│ Player 2 Hand (under cosmic review)     │
├─────────────────────────────────────────┤
│ Player 2 Installations: [Room][Room][Boss] │
├─────────────────────────────────────────┤
│   Protagonists     │   Current Trial   │
│   [Hero] [Hero]    │   Cards & Effects │
├─────────────────────────────────────────┤
│ Player 1 Installations: [Boss][Room][Room] │
├─────────────────────────────────────────┤
│ Player 1 Hand (cosmic assessment active) │
└─────────────────────────────────────────┘
```

### Animation Requirements
- Cosmic phase transition effects with Inquisitor commentary
- Installation evaluation animations with cosmic judgment
- Protagonist movement through installations with cosmic monitoring
- Particle effects for successful trials and cosmic failures
- Dynamic Inquisitor commentary panel with cosmic authority presence

## Technical Implementation

### File Structure
```
under-cosmic-review/
├── index.html              # Single-file deployment
├── src/
│   ├── main.js             # Game initialization
│   ├── core/
│   │   ├── GameState.js    # Central game state management
│   │   ├── GamePhases.js   # Cosmic evaluation phase management
│   │   ├── CardManager.js  # Installation and protagonist management
│   │   └── InquisitorAI.js # Grand Galactic Inquisitor commentary system
│   ├── components/
│   │   ├── Card.js         # Base card component
│   │   ├── Hero.js         # Protagonist-specific logic
│   │   ├── Room.js         # Installation component
│   │   ├── Boss.js         # Antagonist character component
│   │   ├── UI.js           # User interface management
│   │   └── InquisitorPanel.js # Cosmic commentary interface
│   ├── systems/
│   │   ├── InputManager.js # Click/touch handling
│   │   ├── AnimationSystem.js # Tween management
│   │   ├── AudioManager.js # Sound effects and Inquisitor voice
│   │   └── DialogueSystem.js # Cosmic commentary delivery
│   └── data/
│       ├── cards.js        # All card definitions
│       ├── bosses.js       # Antagonist character data
│       ├── heroes.js       # Protagonist definitions
│       └── inquisitor_dialogue.js # All cosmic commentary lines
└── assets/
    ├── sprites/            # Character and cosmic UI art
    ├── audio/              # Cosmic sound effects and voice lines
    └── fonts/              # Cosmic typography
```

### Core Classes

#### GameState with Cosmic Oversight
```javascript
class GameState {
    constructor() {
        this.currentPhase = 'COSMIC_INITIALIZATION';
        this.currentPlayer = 1;
        this.turnNumber = 1;
        
        // Player data under cosmic review
        this.players = [
            {
                antagonist: null,
                hand: [],
                installations: [],
                cosmicTrials: 0,
                cosmicFailures: 0,
                cosmicRanking: 0
            },
            // Player 2 data
        ];
        
        // Cosmic evaluation areas
        this.protagonistsInCosmos = [];
        this.currentCosmicTrial = [];
        this.decks = {
            protagonists: [],
            installations: [],
            cosmicInterventions: []
        };
        
        // Inquisitor state
        this.inquisitorMood = 'EVALUATING';
        this.lastInquisitorComment = '';
        this.cosmicBalance = 'STABLE';
    }
}
```

#### Grand Galactic Inquisitor System
```javascript
class InquisitorAI {
    constructor(gameState) {
        this.gameState = gameState;
        this.commentaryLines = INQUISITOR_DIALOGUE;
        this.lastCommentTime = 0;
        this.evaluationContext = 'NEUTRAL';
    }
    
    providePhaseCommentary(phase) {
        const comments = this.commentaryLines[phase];
        const context = this.evaluateCosmicSituation();
        return this.selectContextualComment(comments, context);
    }
    
    evaluateCosmicSituation() {
        const p1Score = this.gameState.players[0].cosmicTrials;
        const p2Score = this.gameState.players[1].cosmicTrials;
        const scoreDiff = Math.abs(p1Score - p2Score);
        
        if (scoreDiff >= 3) return 'DOMINANT_ANTAGONIST';
        if (this.gameState.turnNumber >= 8) return 'COSMIC_TENSION';
        return 'BALANCED_EVALUATION';
    }
    
    provideFinalVerdict(winner) {
        return this.commentaryLines.FINAL_VERDICT[winner];
    }
}
```

#### Enhanced Card System with Cosmic Elements
```javascript
class Card extends PIXI.Container {
    constructor(cardData, cardType) {
        super();
        this.cardData = cardData;
        this.cardType = cardType;
        this.isUnderReview = false;
        this.cosmicApproval = false;
        this.isPlayable = false;
        
        this.createCosmicVisuals();
        this.setupCosmicInteraction();
    }
    
    setCosmicReview(reviewing) {
        this.isUnderReview = reviewing;
        this.addCosmicGlow();
    }
    
    addCosmicGlow() {
        // Cosmic evaluation visual effect
        if (this.isUnderReview) {
            this.filters = [new PIXI.filters.GlowFilter({distance: 10, color: 0x9966FF})];
        }
    }
}
```

### Game Phases Implementation with Cosmic Commentary

#### Phase Management with Inquisitor
```javascript
class PhaseManager {
    constructor(gameState, inquisitorAI) {
        this.gameState = gameState;
        this.inquisitor = inquisitorAI;
        this.phaseHandlers = {
            'COSMIC_INITIALIZATION': this.handleCosmicInit.bind(this),
            'PROTAGONIST_EMERGENCE': this.handleProtagonistPhase.bind(this),
            'INSTALLATION_CONSTRUCTION': this.handleBuild.bind(this),
            'COSMIC_ATTRACTION': this.handleBait.bind(this),
            'TRIAL_EXECUTION': this.handleScheme.bind(this),
            'COSMIC_EVALUATION': this.handleEnd.bind(this)
        };
    }
    
    nextPhase() {
        const commentary = this.inquisitor.providePhaseCommentary(this.gameState.currentPhase);
        this.displayInquisitorCommentary(commentary);
        
        const handler = this.phaseHandlers[this.gameState.currentPhase];
        if (handler) handler();
    }
    
    displayInquisitorCommentary(text) {
        // Show Inquisitor commentary in UI panel
        const panel = document.getElementById('inquisitorPanel');
        panel.textContent = text;
        panel.classList.add('cosmic-speaking');
        
        setTimeout(() => {
            panel.classList.remove('cosmic-speaking');
        }, 3000);
    }
}
```

### Inquisitor Dialogue System

#### Commentary Database
```javascript
const INQUISITOR_DIALOGUE = {
    COSMIC_INITIALIZATION: [
        "Cosmic evaluation protocols... initializing. Guild antagonists, prepare for assessment.",
        "The cosmic balance requires evaluation. Present your antagonist credentials.",
        "Galactic oversight commencing. Your schemes shall be... measured."
    ],
    
    PROTAGONIST_EMERGENCE: [
        "Protagonists emerge seeking glory. Standard cosmic testing procedures engaged.",
        "Test subjects materializing. Antagonist effectiveness trials... beginning.",
        "The universe provides challengers. Your installations await evaluation."
    ],
    
    INSTALLATION_CONSTRUCTION: [
        "Present your antagonist installations for cosmic review. Concealment protocols... acceptable.",
        "Construction phase under galactic observation. Your schemes will be... assessed.",
        "Installation secrecy maintained. The cosmic eye sees all... eventually."
    ],
    
    COSMIC_ATTRACTION: [
        "Observing protagonist selection patterns. Cosmic magnetism principles... engaging.",
        "The universe aligns. Protagonists drawn to their designated trials.",
        "Cosmic forces guide the unwary. Your installations' allure... measured."
    ],
    
    TRIAL_EXECUTION: [
        "Executing cosmic trials. Measuring antagonist effectiveness against protagonist resolve.",
        "The moment of truth arrives. Your schemes face ultimate evaluation.",
        "Cosmic judgment flows. Success and failure dance in the balance."
    ],
    
    COSMIC_EVALUATION: [
        "Tallying cosmic performance metrics. The universe keeps score.",
        "Evaluation cycle complete. Antagonist rankings... updated.",
        "Another cycle measured. The cosmic ledger reflects all."
    ],
    
    FINAL_VERDICT: {
        1: "Cosmic review complete. Player One demonstrates superior antagonist-protagonist relationship management. Status: Approved for continued operations.",
        2: "Assessment concluded. Player Two achieves optimal cosmic balance. Authorization granted for expanded schemes."
    }
};
```

## Development Phases

### Phase 1: Cosmic Framework (Week 1-2)
- [ ] Pixi.js application setup with cosmic theme
- [ ] Inquisitor commentary system integration
- [ ] Basic cosmic evaluation UI with commentary panel
- [ ] Installation system with cosmic review mechanics

### Phase 2: Cosmic Logic (Week 2-3)
- [ ] Cosmic phase system with Inquisitor narration
- [ ] Protagonist movement and cosmic trial resolution
- [ ] Cosmic success/failure calculation
- [ ] Galactic victory condition checking

### Phase 3: Cosmic Content & Polish (Week 3-4)
- [ ] All antagonist characters with cosmic abilities
- [ ] Complete installation and cosmic intervention sets
- [ ] Cosmic visual effects and Inquisitor animations
- [ ] Audio integration with Inquisitor voice lines
- [ ] Cosmic balancing and evaluation testing

### Phase 4: Cosmic Enhancement (Week 4+)
- [ ] AI opponent with cosmic personality traits
- [ ] Advanced cosmic animations and particle effects
- [ ] Cosmic achievement system ("Galactic Approval", "Universal Balance")
- [ ] Mobile responsiveness with cosmic UI optimization

## Cosmic Technical Requirements

### Performance Targets
- 60 FPS cosmic evaluation rendering
- Smooth Inquisitor commentary transitions
- < 3 second cosmic asset loading
- Memory usage under 100MB (cosmic efficiency approved)

### Browser Compatibility
- Chrome/Edge 90+ (cosmic standards compliant)
- Firefox 88+ (galactic approval granted)
- Safari 14+ (universal compatibility confirmed)
- Mobile Safari and Chrome mobile (portable cosmic review)

### Asset Specifications
- **Sprites**: PNG with cosmic transparency, max 512x512px
- **Audio**: MP3/OGG dual format for Inquisitor voice, < 2MB per cosmic file
- **Fonts**: WOFF2 format for cosmic typography optimization

## Development Notes

### Cosmic Authenticity Guidelines
- Maintain the Grand Galactic Inquisitor's bureaucratic, evaluative tone
- Include proper cosmic authority references and galactic oversight
- Use show-accurate cosmic terminology and universal balance concepts
- Incorporate signature Inquisitor speaking patterns and cosmic judgment

### Cosmic Gameplay Balance
- Ensure no single strategy achieves cosmic dominance
- Maintain tension between antagonist ambition and cosmic oversight
- Balance installation abilities to encourage diverse cosmic approaches
- Test extensively with cosmic evaluation metrics

### Future Cosmic Expansion Hooks
- Modular cosmic evaluation system for cross-universe integration
- Scalable Inquisitor commentary for new cosmic scenarios
- Universal event system for special cosmic interventions
- Cosmic achievement framework for galactic progression tracking

### Cosmic Integration Architecture
```javascript
class CosmicOverlord {
    constructor() {
        this.universalBalance = new Map();
        this.cosmicEvaluations = [];
        this.galacticOversight = true;
    }
    
    evaluateAntagonistPerformance(player, action) {
        const cosmicRating = this.calculateCosmicEfficiency(action);
        this.updateUniversalBalance(player, cosmicRating);
        return this.generateInquisitorResponse(cosmicRating);
    }
}
```

This document serves as the complete technical specification for implementing "Under Cosmic Review" with the Grand Galactic Inquisitor as active game master, using Pixi.js and modern web technologies under proper cosmic oversight.