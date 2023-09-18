import Config from '../config';
import Sprite from '../classes/Sprite';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot' });
    }

    preload() {

    }

    create() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        const welcomeText = this.add.text(screenCenterX, screenCenterY, 'Welcome')
            .setOrigin(0.5)
            .setScale(5, 5);

        this.btn = new Sprite(this, Config.width / 2, Config.height - 150, 'bgButtons', 'btn_play.png').setScale(0.9);

        this.btn.on('pointerdown', () => {
            this.scene.start('Game');
        }).setOrigin(0.5);
    }
}