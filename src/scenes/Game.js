import Config from '../config';
import Sprite from '../classes/Sprite';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Game' });
    }

    preload() {
    }

    create() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        const border = new Sprite(this, Config.width / 2, 400, 'border').setScale(0.5);
        const spinBtn = new Sprite(this, Config.width / 2, 820, 'spinBtn').setScale(0.25);

        const spinSound = this.sound.add('spin');

        const boardMap = this.make.tilemap({ key: 'board' });

        const boardTileset = boardMap.addTilesetImage('board', 'board');
        const gemsTileset = boardMap.addTilesetImage('gems', 'gems');
        const boardLayer = boardMap.createLayer('Board', boardTileset);
        const gemsLayer = boardMap.createLayer('Gems', gemsTileset);

        boardLayer.setX(500);
        boardLayer.setY(78);
        boardLayer.setScale(0.5);

        gemsLayer.setX(500);
        gemsLayer.setY(78);
        gemsLayer.setScale(0.5);

        spinBtn.on('pointerdown', () => {
            spinSound.duration
            spinSound.play();
            boardMap.randomize();
        }).setOrigin(0.5);
    }
}