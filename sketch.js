//Create variables here
var dog , database ,happyDog ;
var foodS , foodStock,dogI,happyDogI;
var feedDog, addFood;
var fedTime , lastFed ,  feed,adFood; 
var FoodObj ;
var bedI,gardenI,washI;
var changingGameState, readingGameState;
var lazyDog;
var milkBottle, livingI;

function preload()
{
	//load images here
dogI = loadImage("images/dogImg.png");
happyDogI = loadImage("images/dogImg1.png");
gardenI = loadImage("virtual pet images/Garden.png")
bedI = loadImage("virtual pet images/Bed Room.png")
washI = loadImage("virtual pet images/Wash Room.png");
lazyDog = loadImage("virtual pet images/Lazy.png")
milkBottle = loadImage("Milk.png");
livingI = loadImage("Living Room.png");
}

function setup() {
	createCanvas(1000, 1000);
database = firebase.database();

FoodObj = new Food();

foodStock = database.ref("Food")
foodStock.on("value",readStock);

readState = database.ref('gameState')
readState.on("value",function(data){
  gameState = data.val();
})


  dog = createSprite(250,250,30,30);
  dog.addImage(dogI)
  dog.scale = 0.1;

  feed = createButton(" Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

  adFood = createButton("Add The Food");
  adFood.position(800,95);
  adFood.mousePressed(addFood);
  
}


function draw() {  
background(46,139,87)
FoodObj.display();

if(foodS == 0){
  dog.addImage(happyDogI);
  milkBottle.visible = false;
}else{
  dog.addImage(lazyDog);
  milkBottle.visible = true;
}




if(gameState == 1){
dog.addImage(happyDogI)
dog.scale = 0.175;
dog.y = 250;
}

if(gameState == 2){
dog.addImage(lazyDog);
milkBottle.visible = false;
dog.scale = 0.175;
dog.y = 250;
}


var Bath = createButton("I want to take bath");
Bath.position(580,125);
if(Bath.mousePressed(function(){
  gameState = 3;
  database.ref('/').update({'gameState':gameState})
}))
if(gameState == 3){
  dog.addImage(washI);
  dog.scale = 1;
  milkBottle.visible = false;

}

var Sleep = createButton("I am very sleepy");
Sleep.position(710,125);
if(Sleep.mousePressed(function(){
  gameState = 4;
  database.ref('/').update({'gameState':gameState})
}))
if(gameState == 4){
  dog.addImage(bedI);
  dog.scale = 1;
  milkBottle.visible = false;

}

var Play = createButton("Let's Play!");
Play.position(500,160);
if(Play.mousePressed(function(){
  gameState = 5;
  database.ref('/').update({'gameState':gameState})
}))
if(gameState == 5){
  dog.addImage(livingI);
  dog.scale = 1;
  milkBottle.visible = false;

}

var PlayInGarden = createButton("Let's Play in Park");
PlayInGarden.position(585,160);
if(PlayInGarden.mousePressed(function(){
  gameState = 6;
  database.ref('/').update({'gameState':gameState})
}))
if(gameState == 6){
  dog.y = 175;
  dog.addImage(gardenI);
  dog.scale = 1;
  milkBottle.visible = false;

}


fedTime = database.ref('FeedTime')
fedTime.on("value",function (data){
lastFed = data.val();
})

fill(255,255,254)
textSize(15);

if(lastFed >= 12){
text("Last Feed: "+lastFed %12 + "PM",350,30);
}


else if(lastFed === 0){
text("Last Feed: 12 AM",350,30)
}
else{

  text("Last Feed: " + lastFed+"AM",350,30);
}

if(gameState !== "Hungry"){
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show();
  addFood.show();
  dog.addImage(lazyDog)
}



currentTime = hour();
if(currentTime ==( lastFed+1)){
  foodObj.garden();
  update("Playing");
}

else if(currentTime ==(lastFed+2)){
  foodObj.bedroom();
 update("Sleeping")
}

else if(currentTime >( lastFed+3)&&currentTime<=( lastFed+4)){
  foodObj.washroom();
 update("Washing")
}

else{
  foodObj.display();
  update("Hungry")
}

  drawSprites();
  
}

function readStock(data){
foodS = data.val();
FoodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDogI);

  FoodObj.updateFoodStock(FoodObj.getFoodStock()-1);
  database.ref('/').update({
    Food : FoodObj.getFoodStock(),
    FeedTime : hour()
  })
}


function addFoods(){

  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function writeStock(x){

database.ref('/').update({
  Food:x
})
}

function update(state){
database.ref('/').update({
  gameState:state
})
}



