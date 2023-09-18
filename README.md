# Installation
1. Run: npm install
2. Run: npm run start
# Zetta Game Task

## Create a Slot Gem Match Game using Phaser

### Overview
The goal is to create a slot gem matching style game using the Phaser game engine and provided assets. The game board will feature an 8x8 grid of gems, which will spin and land on random alignments.

### Requirements
- Import provided assets:
  - board.png - game board background
  - background.jpg - general background
  - gems.png - spritesheet containing all gem images
  - spin-btn.png - button to spin the gems
  - spin.mp3 - sound effect for spinning
- Create an 8x8 game board using the gems spritesheet
- Dynamically rescale the game for desktop and mobile screens
- Align components using the position-idea.png for reference

### Game play
- Spin button should trigger spinning gems animation
- Gems should randomize positions after spinning
  - Bonus: Have spin generate new random gems
  - Bonus: Create “Welcome” screen which contains background image and button to start the game
  - **Bonus**: Match gems if there are 4 or more from the same type in current board

### Acceptance Criteria
- All assets imported without errors
- Game board background and scaling works on mobile and desktop
- Gems align properly in 8x8 board grid
- Spin button triggers spinning animation
- After spinning gems have new random positions
- Gem sprites properly clipped and aligned
- No visual artifacts during animation
- Spin sound effect plays

### Technical Considerations
- Use a tilemap for aligning gem positions
- Resize renderer on orientation change
- Tween animation timeline for spinning
- Randomize tilemap indexes after spinning
- Add audio files and implement playback
