var PLAY = 1;
var END = 0;
var gameState = PLAY;
var path, boy, cash, diamonds, jwellery, sword;
var pathImg, boyImg, cashImg, diamondsImg, jwelleryImg, swordImg;
var treasureCollection = 0;
var cashG, diamondsG, jwelleryG, swordGroup;
var index = 0;
var x = 0;

function preload() {
pathImg = loadImage("Road.png");
boyImg = loadAnimation("runner1.png","runner2.png");
cashImg = loadImage("cash.png");
diamondsImg = loadImage("diamonds.png");
jwelleryImg = loadImage("jwell.png");
swordImg = loadImage("sword.png");
endImg = loadAnimation("gameOver.png");
}

function setup() {

createCanvas(displayWidth - 5, displayHeight-5);
// Moving background
path = createSprite(550, 300);
path.addImage(pathImg);

//creating boy running
boy = createSprite(50, 430, 20, 20);
boy.addAnimation("SahilRunning", boyImg);
boy.scale = 0.05;

gameOver = createSprite(550, 250);
gameOver.addAnimation("gameover", endImg);
gameOver.scale = 0.5;

cashG = new Group();
diamondsG = new Group();
jwelleryG = new Group();
swordGroup = new Group();
}

function draw() {
background(0);
boy.x = World.mouseX;

if (gameState === PLAY) {
gameOver.visible = false;
path.velocityY = 4;
//code to reset the background
if (path.y > 400) {
path.y = height / 3;     
}
}

edges = createEdgeSprites();
boy.collide(edges);



createCash();
createDiamonds();
createJwellery();
createSword();

if (cashG.isTouching(boy)) {
cashG.destroyEach();
treasureCollection = treasureCollection + 50;
} else if (diamondsG.isTouching(boy)) {
diamondsG.destroyEach();
treasureCollection = treasureCollection + 150;

} else if (jwelleryG.isTouching(boy)) {
jwelleryG.destroyEach();
treasureCollection = treasureCollection + 100;

} else {
if (swordGroup.isTouching(boy)) {
swordGroup.destroyEach();
gameState = END;
boy.addAnimation("SahilRunning",endImg);
}  
}

if (gameState === END) {
gameOver.visible = true;
path.velocityY = 0;
cashG.setLifetimeEach(-1);
diamondsG.setLifetimeEach(-1);
jwelleryG.setLifetimeEach(-1);
swordGroup.setLifetimeEach(-1);
boy.velocityY = 0;
cashG.destroyEach();
cashG.setVelocityYEach(0);
diamondsG.destroyEach();
diamondsG.setVelocityYEach(0);
jwelleryG.destroyEach();
jwelleryG.setVelocityYEach(0);
swordGroup.destroyEach();
swordGroup.setVelocityYEach(0);  
}

drawSprites();
textSize(20);
fill(255);
text("Treasure: " + treasureCollection, 400, 30);

}

function createCash() {
if (World.frameCount % 40 == 0) {
var cash = createSprite(Math.round(random(camera.position.x), 60, 10, 10));
cash.addImage(cashImg);
cash.scale = 0.12;
cash.velocityY = 5;
cash.lifetime = 150;
cashG.add(cash);
}
}

function createDiamonds() {
if (World.frameCount % 50 == 0) {
var diamonds = createSprite(Math.round(random(camera.position.x), 60, 10, 10));
diamonds.addImage(diamondsImg);
diamonds.scale = 0.03;
diamonds.velocityY = 5;
diamonds.lifetime = 150;
diamondsG.add(diamonds);
}
}

function createJwellery() {
if (World.frameCount % 60 == 0) {
var jwellery = createSprite(Math.round(random(camera.position.x), 60, 10, 10));
jwellery.addImage(jwelleryImg);
jwellery.scale = 0.13;
jwellery.velocityY = 5;
jwellery.lifetime = 150;
jwelleryG.add(jwellery);
}
}

function createSword() {
if (World.frameCount % 55 == 0) {
var sword = createSprite(Math.round(random(camera.position.x), 60, 10, 10));
sword.addImage(swordImg);
sword.scale = 0.1;
sword.velocityY = 5;
sword.lifetime = 150;
swordGroup.add(sword);
}
}
index = index + 1 ;

x = x + 550;

boy[index-1].x = x;

if (index === boy.index){
  camera.position.x = displayWidth/2;
}