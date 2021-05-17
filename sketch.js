var monkey , monkey_running, monkeyCollide;
var ground, invisiGround, groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var time = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("obstacle.png");
  
  monkeyCollide = loadImage("sprite_1.png");
  
  //movingJungle = loadImage("jungle1.png");
    
}



function setup() {
  createCanvas(600, 300);
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);
  
    
  ground = createSprite(300,340,600,10);
    
  invisiGround = createSprite(300,285,600,20);
  invisiGround.shapeColour = ("green");
    
}


function draw() {
  
 background("skyblue");
  fill("black");
  text("SURVIVAL TIME: "+time, 250, 70);
  text("SCORE: "+score,270,20);
  
  monkey.collide(invisiGround);
  
  if (gameState === PLAY){
    obstacles();
    food();
    time = time + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score/100);
  
    if(keyDown("space") && monkey.y >= 235) {
      monkey.velocityY = -15; 
    }
    
     monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      score = score+1;  
      bananaGroup.destroyEach();
    
    }
    
    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }  
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.changeAnimation("collide", monkeyCollide);
    monkey.scale = 0.12;
   
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    fill("red");
    stroke("black");
    textSize(30);
    text("GAMEOVER", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'ENTER' to play again", 220, 200);
  }
  
   if (keyDown("ENTER")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  
  
  drawSprites();
}
function food() {
  if(frameCount%150 === 0) {
    banana = createSprite(620,120, 50, 50 )
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score/100);           
    banana.lifetime = 220;
    bananaGroup.add(banana);
  }
}

function obstacles(){
  if (frameCount%200 === 0){
    obstacle = createSprite(620,253,50,50);
    obstacle.addImage("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 180);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
    
  }
  
  
}




 




