let gameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 500,
    background: 1000,
    backgroundColor: '#e8e4cc',
    parent: 'game',
    disableWebAudio: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: new Tableau1()



};
let game = new Phaser.Game(gameConfig);
