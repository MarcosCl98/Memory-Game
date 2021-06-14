class Item extends Phaser.GameObjects.Sprite{

  constructor (scene, x, y, texture, id, memory)
      {

        super(scene, x, y, texture);
        this.scene = scene;
        this.initialx = this.x;
        this.initialy = this.y;
        this.isVisible = true;
        this.id = id;
        this.memory = memory;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setInteractive().on('pointerdown', this.onClick.bind(this));
        this.clicked = false;
      
      }
  

      onClick(piece, pointer, localX, localY, event){
        this.scene.initialText.setVisible(false);
        if(this.memory){
          this.setVisible(false);
          this.scene.showSmileEmoji();
          this.scene.updateNumCorrects();
        }else{
          this.scene.showSadEmoji();
          this.scene.incrementNumErrors();
        }
      }

      restart(){
        this.x=this.initialx;
        this.y=this.initialy;
      }

      getIsVisible(){
        return this.isVisible;
      }
      setIsVisible(param){
          this.isVisible = false;
      }

      setPosx(newX){
        this.x = newX;
      }

      setPosy(newY){
        this.y = newY;
      }

      getId(){
        return this.id;
      }

      setMemory(param){
        this.memory = param;
      }
}