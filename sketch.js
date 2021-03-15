var PLAY=0;
var END=1;
var gameState=PLAY;
var spaceship,spaceship_image,gameOver,gameOverImage;
var stars,starImage,starsGroup;
var score=0;
var highScore=0;
var enemysDefeated=0;
var coins,coinsGroup,coinsImage;
var coinsCollected=0;
var planetsDestroyed=0;
var ufo,ufoImage,ufoGroup;
var meteor,meteorImage,meteorGroup;
var bullet,bulletImage,bulletGroup;
var planetGroup,Venus,venusGroup,planetSprite,planet1,planet2,planet3,planet4,planetBurst;
var restart,restartImage;
var coinSound,bulletSound,blastSound;

function preload(){
  
  spaceship_image=loadImage("ship.png")
  starImage=loadImage("whiteStar.png")
  coinsImage=loadImage("coin.png")
  ufoImage=loadImage("ufo.png");
  gameOverImage=loadImage("gameover.png");
  meteorImage=loadImage("meteor2.jpg");
  bulletImage=loadImage("bullet2.png");
  planet1=loadImage("mercury.png");
  planet2=loadImage("uranus.png");
  planet3=loadImage("saturn.png");
  planet4=loadImage("venus.png");
  restartImage=loadImage("restart.png");
  bulletSound=loadSound("Gun+1.mp3");
  coinSound=loadSound("coin.mp3");
  blastSound=loadSound("blast.mp3");
  planetBurst=loadAnimation("firePlanet.png");
  
}
function setup(){
  createCanvas(windowWidth,windowHeight)
  spaceship=createSprite(100,375,0,0)
  spaceship.addImage(spaceship_image);
  spaceship.scale=0.1;
  spaceship.velocityX=4;
  
  spaceship.setCollider("rectangle",0,0,800,300);
  coinsGroup= new Group();
  ufoGroup= new Group();
  starsGroup= new Group();
  meteorGroup= new Group();
  bulletGroup= new Group();
  planetGroup= new Group();
  venusGroup= new Group();
  gameOver=createSprite(200,height/3,0,0);
  gameOver.addImage(gameOverImage);
  gameOver.scale=1.5;
  gameOver.visible=true;
  restart=createSprite(200,height/2,0,0);
  restart.addImage(restartImage);
  restart.scale=0.2;
  restart.visible=true;
  gameOver.velocityX=4;
  restart.velocityX=4;
}

function draw(){
  background("black")
      edges = createEdgeSprites();
 if(gameState==PLAY){
   if(keyWentDown("up")){
     spaceship.velocityY=-5;
   }
 if(keyWentDown("down")){
   spaceship.velocityY=5;
 }
      camera.position.x= spaceship.x;
  score=score+ Math.round(frameRate()/59);
  if(spaceship.isTouching(coinsGroup)){
    coinsCollected++;
    coinSound.play();
    coinsGroup.destroyEach();
  }
 if(keyDown("space")){
   Createbullet();
   bulletSound.play();
 }
   if(bulletGroup.isTouching(ufoGroup)|| bulletGroup.isTouching(meteorGroup)){
     if(bulletGroup.isTouching(meteorGroup)){
       meteorGroup.destroyEach();
     }
     if(bulletGroup.isTouching(ufoGroup)){
       ufoGroup.destroyEach();
     }
     blastSound.play();
     enemysDefeated++;
   }
   if(bulletGroup.isTouching(planetGroup)|| bulletGroup.isTouching(venusGroup)){
     if(bulletGroup.isTouching(planetGroup)){
      planetGroup.destroyEach();
     }
     if(bulletGroup.isTouching(venusGroup)){
       venusGroup.destroyEach();
     }
     blastSound.play();
     planetsDestroyed++;
   }
   gameOver.visible=false;
   restart.visible=false;
   coins();
  stars();
  ufofunction();
   asteroid();
   CreatePlanet();
   CreateVenus();
   
   if(spaceship.isTouching(ufoGroup)|| spaceship.isTouching(meteorGroup)||spaceship.isTouching(planetGroup)||spaceship.isTouching(venusGroup)){
     gameState=END;
   }
 } 
    else if(gameState==END){
      gameOver.velocityX=0;
      restart.velocityX=0;
     if(score>highScore && gameState===END){
       highScore=score;
     }
      
      ufoGroup.destroyEach();
      coinsGroup.destroyEach();
      meteorGroup.destroyEach();
      bulletGroup.destroyEach();
      planetGroup.destroyEach();
      venusGroup.destroyEach();
      starsGroup.setVelocityXEach(0);
      starsGroup.setLifetimeEach(-3);
      spaceship.visible=false;
      gameOver.visible=true;
       restart.visible=true;
      if(mousePressedOver(restart) && gameState===END){
         reset();
         gameOver.velocityX=4;
         restart.velocityX=4;
      }
    }
  spaceship.collide(edges[3]);
  spaceship.collide(edges[2]);
  drawSprites();
  textSize(20)
  text("Score: "+score,camera.position.x,50);
  text("Coins Collected: "+coinsCollected,camera.position.x-200,50);
  text("Enemys Killed: "+ enemysDefeated,camera.position.x-500,50);
  text("Planets Destroyed: "+ planetsDestroyed,camera.position.x+100,50);
 text("High Score: "+ highScore,camera.position.x+400,50);
}



 function coins(){
  if(frameCount%200==0){
  var coins=createSprite(1000+camera.position.x,random(20,370),150,10)
  coins.addImage(coinsImage);
    coins.scale=0.02;
  coins.shapeColor="yellow";
    coins.depth+=33
    coins.velocityX=-7;
    coinsGroup.add(coins)
  }
}

function stars(){
  if(frameCount%0.5==0){
  var  stars=createSprite(camera.position.x+700,random(20,750),1,1);
    stars.addImage(starImage);
    stars.scale=0.001;
    stars.shapeColor="white";
    stars.velocityX=-3;
    stars.depth-=2222;
    stars.lifetime=300;
    starsGroup.add(stars);
  }
}

function ufofunction(){
  if(frameCount%30==0){
    var ufo=createSprite(camera.position.x+700,random(20,750),20,20)
    ufo.addImage(ufoImage);
    ufo.scale=0.2
    ufo.velocityX=-30;
    ufoGroup.add(ufo);
    ufo.lifetime=200;
  }
}

function asteroid(){
 if(frameCount%40==0){
  
  var meteor=createSprite(camera.position.x+700,random(20,750),20,20)
  meteor.addImage(meteorImage);
  meteor.scale=0.15;
  meteor.velocityX=-30;
  meteorGroup.add(meteor);
 meteor.setCollider("circle",0,0,200)
  meteor.lifetime=100;

}
  
}

function Createbullet(){
 
  var bullet=createSprite(spaceship.x,spaceship.y,20,20)
  bullet.y=spaceship.y;
  bullet.addImage(bulletImage);
  bullet.scale=0.2
  bullet.velocityX=6;
  bulletGroup.add(bullet);
  bullet.lifetime=200;
  
}

function CreatePlanet(){
    if(frameCount%200==0){
  var  planetSprite=createSprite(camera.position.x+1500,random(20,500),20,20)
  planetSprite.velocityX=-2;
  planetSprite.scale=0.5;
      planetSprite.lifetime=500;
  planetGroup.add(planetSprite);
      planetSprite.setCollider("circle",0,0,150);
      var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: planetSprite.addImage(planet1);
              break;
      case 2: planetSprite.addImage(planet2);
              break;
      case 3: planetSprite.addImage(planet3);
              break;
              default: break;
  }
}
}

function CreateVenus(){
  if(frameCount%305==0){
    var Venus=createSprite(1500+camera.position.x,random(20,500),20,20)
    Venus.addImage(planet4);
    Venus.scale=0.25;
    Venus.lifetime=999;
    Venus.velocityX=-7;
    Venus.setCollider("circle",0,0,400);
    venusGroup.add(Venus);
  }
}
function reset(){
  gameState=PLAY;
  score=0;
  planetsDestroyed=0;
  enemysDefeated=0;
  coinsCollected=0;
  spaceship.visible=true;
  starsGroup.destroyEach();
  spaceship.velocityY=0;
  spaceship.y=375;
}
