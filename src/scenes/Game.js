import Config from '../config';
import Sprite from '../classes/Sprite';

export default class GameScene extends Phaser.Scene {
    disableBtn = false;

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

        const gemsTiles = [...gemsLayer.getTilesWithin()];
        const tileMatrix = [];

        while (gemsTiles.length) {
            tileMatrix.push(gemsTiles.splice(0, 8));
        }

        const horizontallyMatchedTiles = this.hasHorizontalMatches(tileMatrix);

        if (!!horizontallyMatchedTiles) {
            for (const tile of horizontallyMatchedTiles) {
                this.tweens.add({
                    targets: tile,
                    rotation: 6.2831853072,
                    duration: 500,
                    ease: 'Power2',
                    yoyo: true
                });
            }
        }

        const verticallyMatchedTiles = this.hasVerticalMatches(tileMatrix);

        if (!!verticallyMatchedTiles) {
            for (const tile of verticallyMatchedTiles) {
                this.tweens.add({
                    targets: tile,
                    rotation: 6.2831853072,
                    duration: 500,
                    ease: 'Power2',
                    yoyo: true
                });
            }
        }

        const animationTimeline = this.add.timeline([
            {
                at: 0,
                run: () => {
                    spinSound.play();

                    this.disableBtn = true;

                    boardMap.forEachTile(tile => {
                        this.tweens.add({
                            targets: tile,
                            rotation: 6.2831853072,
                            duration: 500,
                            ease: 'Power2',
                            yoyo: true
                        });
                    });
                }
            },
            {
                at: 1000,
                run: () => {
                    boardMap.randomize();
                    this.disableBtn = false;
                }
            }
        ]);

        spinBtn.on('pointerdown', () => {
            if (!this.disableBtn) {
                animationTimeline.play();
            }
        }).setOrigin(0.5);
    }

    hasHorizontalMatches(matrix) {
        const matchedTiles = [];

        for (let row of matrix) {
            let count = 1;
            let currentElement = row[0];

            for (let i = 1; i < row.length; i++) {
                if (row[i].properties.color === currentElement.properties.color) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let j = i - count; j < i; j++) {
                            matchedTiles.push(row[j]);
                        }
                    }

                    count = 1;
                    currentElement = row[i];
                }
            }

            if (count >= 3) {
                for (let j = row.length - count; j < row.length; j++) {
                    matchedTiles.push(row[j]);
                }
            }
        }

        return matchedTiles || false;
    }

    hasVerticalMatches(matrix) {
        const matches = [];

        for (let col = 0; col < matrix[0].length; col++) {
            let count = 1;
            let currentElement = matrix[0][col];

            for (let row = 1; row < matrix.length; row++) {
                if (matrix[row][col].properties.color === currentElement.properties.color) {
                    count++;
                } else {
                    if (count >= 3) {
                        for (let i = row - count; i < row; i++) {
                            matches.push(matrix[i][col]);
                        }
                    }

                    count = 1;
                    currentElement = matrix[row][col];
                }
            }

            if (count >= 3) {
                for (let i = matrix.length - count; i < matrix.length; i++) {
                    matches.push(matrix[i][col]);
                }
            }
        }

        return matches || false;
    }
}