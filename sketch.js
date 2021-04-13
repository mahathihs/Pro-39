//variables here
var rabbit_Img,rabbit,bgImg,background,carrot,carrotImg,stone,stoneImg;
var ground,background_2;
var play=1;
var end=0;
var gameState=play;
var gameState=end;
var FoodGroup,ObstaclesGroup;
var score=0;

function preload(){
  //loadImages here
  rabbit_Img=loadAnimation("R-1.png","R-2.png","R_3.png","R-4.png");
  bgImg=loadImage("forestBg.png");
  carrotImg=loadImage("carrot.png");
  stoneImg = loadImage("stone.png");
}

function setup(){
 createCanvas(600,450);
  
  background=createSprite(350,200);
  background.addImage(bgImg);
  background.velocityX=-3;
  
  // sprite for rabbit
  rabbit=createSprite(150,350,10,10);
  rabbit.addAnimation("Img",rabbit_Img);
  
  ground = createSprite(300,400,600,10);
  ground.shapeColor=(rgb(165,89,44));
  
  FoodGroup=new Group();
  ObstaclesGroup = new Group();
  
}

function draw(){
  rabbit.collide(ground);
  rabbit.velocityY = rabbit.velocityY +0.8;
  
   drawSprites();
  
  if(FoodGroup.isTouching(rabbit)){
    FoodGroup.destroyEach();
    score=score+2;
  }
     while (background.x <190){
      background.x = background.width/2;
    }
  
  if(keyDown("space")&& rabbit.y >= 250) {
        rabbit.velocityY = -12;
     
    }
  
  if(ObstaclesGroup.isTouching(rabbit)){
    gameState = "end";
  }
  
  if(gameState === "end"){
    ObstaclesGroup.destroyEach();
    ObstaclesGroup.setVelocityXEach(0);
    FoodGroup.destroyEach();
    FoodGroup.setVelocityXEach(0);
    rabbit.velocityX = 0;
    background.velocityX = 0;
    
    strokeWeight(4);
    stroke("turquoise");
    fill("pink");
    textSize(34);
    text("GAME OVER!!!",200,200);
  }

  fruits();
  obstacles();

  stroke("white");
  strokeWeight(5);
  fill("black");
  textSize(20);
  textStyle(BOLD);
  text("CARROTS ATE:" +score,30,50);
}

function fruits(){
  if(frameCount%80===0){
    carrot=createSprite(500,100,20,20);
    carrot.y=Math.round(random(120,180));
    carrot.addImage(carrotImg);
    carrot.velocityX=-5;
    carrot.lifetime=90;
    carrot.scale = 0.2;
    FoodGroup.add(carrot);
  }
}

function obstacles(){
  if(frameCount%180===0){
  stone=createSprite(550,370,20,20);
  stone.addImage(stoneImg);
  stone.scale=0.4;
  stone.velocityX = -5;
  stone.lifetime=80;
  ObstaclesGroup.add(stone);
  }
}