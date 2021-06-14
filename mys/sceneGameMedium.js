class SceneGameMedium extends Phaser.Scene {

    constructor ()
    {
        super('SceneGameMedium');
        this.x = window.innerWidth/2;
        this.y = window.innerHeight/2;
        this.numCorrects = 0;

        this.objectsPositions = [new Position(0,150),new Position(150,150),new Position(0,0),new Position(-150,150),new Position(150,0),new Position(-150,0),new Position(150,-150),new Position(0,-150),new Position(-150,-150)];
        this.boardObjects = [
            {sprite:'burguer',id:1, memory:false},
            {sprite:'camera', id:2, memory:false},
            {sprite:'cat', id:3, memory:false},
            {sprite:'cheese', id:4, memory:false},
            {sprite:'controller', id:5, memory:false},
            {sprite:'cycle', id:6, memory:false},
            {sprite:'owl', id:7, memory:false},
            {sprite:'telephone', id:8, memory:false},
            {sprite:'television', id:9, memory:false}
        ]; 

        this.numErrors = 0;
    }

    preload ()
    {
        this.load.image('background', 'mys/assets/background.jpeg');
        this.load.image('buttonStart', 'mys/assets/buttonStart.png');
        //Objects
        this.load.spritesheet('burguer', 'mys/assets/burguer.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('camera', 'mys/assets/camera.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('cat', 'mys/assets/cat.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('cheese', 'mys/assets/cheese.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('controller', 'mys/assets/controller.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('cycle', 'mys/assets/cycle.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('owl', 'mys/assets/owl.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('telephone', 'mys/assets/telephone.png',
        { frameWidth: 150, frameHeight: 100 }  );

        this.load.spritesheet('television', 'mys/assets/television.png',
        { frameWidth: 150, frameHeight: 100 }  );

        //Emojis
        this.load.image('sad', 'mys/assets/sad.png');
        this.load.image('smile', 'mys/assets/smile.png');

        this.load.audio("victory","mys/assets/songVictory.mp3")
    }  

     

    create ()
    {
        initTracking ('sceneGameMedium')
        this.add.image(this.x, this.y,'background');

        this.victory = this.sound.add("victory", { loop: false });

        this.emojiSad = this.add.image(this.x, this.y-250,'sad');
        this.emojiSmile = this.add.image(this.x, this.y-250,'smile');
        this.emojiSad.setVisible(false);
        this.emojiSmile.setVisible(false);

        this.buttonStart = this.add.image(this.x, this.y-80,'buttonStart'); 
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.buttonStart.setVisible(false));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.showImages());
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.initialText.setVisible(false));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => this.memorizeText.setVisible(true));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => setTimeout(() => { this.memorizeText.setVisible(false)
        }, 5000));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => setTimeout(() => { this.hideImages()
        }, 5000));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => setTimeout(() => { this.initialText.setVisible(true);
        }, 6500));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => setTimeout(() => { this.initialText.setText("Select the images shown!");
        }, 6500));
        this.buttonStart.setInteractive({ useHandCursor: true }).on('pointerdown', () => setTimeout(() => { this.showAllImages()
        }, 6500));
        
        
        var cam  = this.cameras.add(0, 0, this.x*2, this.y*2);    
        cam.setBackgroundColor('0x000000');

        this.checkPreviousGame(this.objectsPositions.length);

        this.objects = [];
        this.auxObjects = [];
        this.memoryObjects = [];
        this.createGame();

        this.createText();
  }

    update()
    {  
        
    }

    //Getters
    getRandomPosition(max,min) {
        return Math.round(Math.random() * (max - min) + min);
    }
 
    checkPreviousGame(length){
        if(length == 0){   
            this.numErrors = 0;
            this.numCorrects = 0;
            this.objectsPositions = [new Position(0,150),new Position(150,150),new Position(0,0),new Position(-150,150),new Position(150,0),new Position(-150,0),new Position(150,-150),new Position(0,-150),new Position(-150,-150)];
            this.boardObjects = [
                {sprite:'burguer',id:1, memory:false},
                {sprite:'camera', id:2, memory:false},
                {sprite:'cat', id:3, memory:false},
                {sprite:'cheese', id:4, memory:false},
                {sprite:'controller', id:5, memory:false},
                {sprite:'cycle', id:6, memory:false},
                {sprite:'owl', id:7, memory:false},
                {sprite:'telephone', id:8, memory:false},
                {sprite:'television', id:9, memory:false}
            ];  
            }
    }

    //Creates
    createGame(){
        this.boardObjects.forEach(element => { 
            var posicion = this.getRandomPosition(this.objectsPositions.length-1,0)
            var xObject = this.objectsPositions[posicion];
            var item = new Item ( this, xObject.getX()+this.x, xObject.getY()+this.y, element["sprite"],element["id"], element["memory"]);
            this.objectsPositions.splice(posicion, 1)
            item.setVisible(false);
            this.objects.push( item );     
        });

        this.objects.forEach(element => { 
            this.auxObjects.push(element);   
        });

    }

    createText(){

        this.initialText = this.add.text(this.x-170, this.y-270);
        this.initialText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.initialText.setText("Press the button to start!");
        this.initialText.visible=true;

        this.memorizeText = this.add.text(this.x-160, this.y-270);
        this.memorizeText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.memorizeText.setText("Memorize the images...");
        this.memorizeText.visible=false;

        this.winnerText = this.add.text(this.x-120, this.y-120);
        this.winnerText.setStyle({ fontFamily: 'myFont', fontSize:30, fill: '#ffff00'});
        this.winnerText.setText("Congratulations!");
        this.winnerText.visible=false;

        this.clickButton = new TextButton(this, this.x-220, this.y-50, 'Click here to return to the menu !',
             { fontFamily: 'myFont', fontSize:30, fill: '#ffff00'}, () => this.scene.start('SceneMenu'));
        this.add.existing(this.clickButton);
        this.clickButton.visible=false;
    }

    createImages(){
        var counter = 3;
        while(counter >0){
            var pos = this.getRandomPosition(this.auxObjects.length-1,0)
            this.memoryObjects.push(this.auxObjects[pos]);
            this.auxObjects.splice(pos,1);
            counter--;
        }

        this.changePositions();
    }

    showImages(){
        this.createImages();
        this.memoryObjects.forEach(element => { 
            element.setVisible(true);
        });
    }

    hideImages(){
        for(let i = 0; i< this.memoryObjects.length;i++){
            this.memoryObjects[i].setVisible(false);
        }
    }

    hideAllImages(){
        this.objects.forEach(element => { 
            element.setVisible(false);
        });
    }

    showAllImages(){
        for(let i = 0; i< this.objects.length;i++){
            this.objects[i].restart();
            this.objects[i].setVisible(true);
        }
        this.objects.forEach(element => { 
            this.memoryObjects.forEach(element2 => { 
                if(element.getId() == element2.getId()){
                    element.setMemory(true);
                }
            });
        });
    }

    changePositions(){ 
        var counter = 3;
        this.memoryObjects.forEach(element => { 
            if(counter == 3){
                element.setPosx(this.x);
                element.setPosy(this.y);
                counter--;
            }else if(counter == 2){
                element.setPosx(this.x-150);
                element.setPosy(this.y);
                counter--;
            }else{
                element.setPosx(this.x+150);
                element.setPosy(this.y);
            }
        });
    }
    updateNumCorrects(){
        this.numCorrects++;
        if(this.numCorrects == 3){
            this.hideAllImages();
            this.winnerText.visible=true;
            this.initialText.visible=false;
            this.clickButton.visible=true;
            this.victory.play({
                volume: .3,
                loop: false
              });
              finishTracking(window.location.href, 'Memory Game Medium', 9,this.numErrors)
        }
    }

    showSmileEmoji(){
        this.emojiSmile.setVisible(true);
        setTimeout(() => {
            this.emojiSmile.setVisible(false);
        }, 1500);
    }

    showSadEmoji(){
        this.emojiSad.setVisible(true);
        setTimeout(() => {
            this.emojiSad.setVisible(false);
        }, 1500);
    }
    
}