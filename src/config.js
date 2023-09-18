import Boot from './scenes/Boot';
import Game from './scenes/Game';
import Preload from './scenes/Preload';

export default {
    type: Phaser.WEBGL,
    width: 1600,
    height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    fps: {
        min: 30,
        target: 60
    },
    parent: "zetta-slot-game",
    backgroundColor: '#2d2d2d',
    pixelArt: false,
    scale: {
        parent: "zetta-slot-game",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 800,
            height: 600
        },
        max: {
            width: 1600,
            height: 900
        },
        zoom: 1,
    },
    autoRound: false,
    scene: [Preload, Boot, Game]
};

