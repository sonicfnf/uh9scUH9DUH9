var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;


function preload(){
  trex_running = loadAnimation("f.png");
  trex_collided = loadAnimation("f.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  dieSound=loadSound("die.mp3")
  checkPoint=loadSound("checkpoint.mp3")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.2;
  
  ground = createSprite(width,height-10,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(width-2,height-10,width,10);
  invisibleGround.visible = false;
  
  //crear grupos de obstáculos y nubes
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();
trex.setCollider("circle",0,0,90)
  trex.debug=true

  console.log("Hola" + 5);
  trex.setCollider("rectangle",0,0,400,trex.height)
  score = 0;
}

function draw() {
  background(180);
  //mostrar la puntuación
  text("Puntuación: "+ score, 500,50);
  
  
  
  if(gameState === PLAY){
    //mover el suelo
    ground.velocityX = -5;
    //puntuación
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //hacer que el Trex salte al presionar la barra espaciadora
    if(touches.length>0|| keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -13;
        //agregar sonido
        
    }
    
    //agregar gravedad
    trex.velocityY = trex.velocityY + 0.8
  
    //aparecer nubes
    spawnClouds();
  
    //aparecer obstáculos en el suelo
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
      trex.changeAnimation("collided",trex_collided)
      gameState = END;
      dieSound.play()
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     obstaclesGroup.setLifetimeEach(0)
     cloudsGroup.setLifetimeEach(-19)
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
   }
  ground.velocityX=0
  
 
  //evitar que el Trex caiga
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,height-70,10,40);
   obstacle.velocityX = -6;
   
    //generar obstáculos al azar
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
   
    //asignar escala y ciclo de vida al obstáculo          
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //agregar cada obstáculo al grupo
    obstaclesGroup.add(obstacle);
 }
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //asignar ciclo de vida a la variable
    cloud.lifetime = 134;
    
    //ajustar la profundidad
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 10;
    
    //agregar nube al grupo
   cloudsGroup.add(cloud);
    }
}

