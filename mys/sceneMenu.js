class SceneMenu extends Phaser.Scene {

    constructor ()
    {
        super('SceneMenu');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpeg');
        this.load.image('buttonEasy', 'mys/assets/buttonEasy.png');
        this.load.image('buttonMedium', 'mys/assets/buttonMedium.png');
        this.load.image('buttonHard', 'mys/assets/buttonHard.png');
        this.load.image('demcare', 'mys/assets/demcarelogo.png');
    }

    create ()
    {
        this.add.image(this.x, this.y,'background');
        var logo = this.add.image(this.x, this.y+180,'demcare');
        logo.setScale(0.7,0.7);
        
        this.clickButton = new TextTitle(this, this.x-240, this.y-210, 'Select the difficult to start the game!',
             { fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.add.existing(this.clickButton);
        
        this.buttonEasy = this.add.image(this.x, this.y-100,'buttonEasy'), () => this.scene.start('SceneGameEasy');
        this.buttonEasy.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('SceneGameEasy'));

        this.buttonMedium = this.add.image(this.x, this.y-20,'buttonMedium'), () => this.scene.start('SceneGameMedium');
        this.buttonMedium.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('SceneGameMedium'));

        this.buttonHard = this.add.image(this.x, this.y+60,'buttonHard'), () => this.scene.start('SceneGameHard');
        this.buttonHard.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.scene.start('SceneGameHard'));

        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0xfffffff');

        this.lights.enable();

        this.lights.addLight(300, 300, 300, 0xff0000, 1);
        this.lights.addLight(400, 300, 300, 0x00ff00, 1);
        this.lights.addLight(600, 500, 300, 0x0000ff, 1);
         
    }

    
}