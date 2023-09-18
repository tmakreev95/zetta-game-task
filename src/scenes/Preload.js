export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload' });
    }

    preload() {
        this.load.path = '../../assets/';

        this.load.image('background', 'images/background/background.jpg');
        this.load.image('board', 'images/board/board.png');
        this.load.image('spinBtn', 'images/buttons/spin-btn.png');
        this.load.image('border', 'images/border/border.png');

        this.load.atlas('bgButtons', 'images/buttons/button.png', 'images/buttons/button.json');

        this.load.tilemapTiledJSON('board', 'images/board/board.json');

        this.load.spritesheet("gems", "images/gems/gems.png", {
            frameWidth: 150,
            frameHeight: 150
        });

        this.load.audio('spin', 'sound/spin.mp3');
    }

    create() {
        this.scene.start('Boot');
    }
}