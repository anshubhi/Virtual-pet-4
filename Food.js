class Food{
    constructor(){
        this.foodStock = 0;
        this.image = loadImage("images/Milk.png");
        this.lastFed;
    }


    updateFoodStock(foodStock){
        this.foodStock= foodStock;
    }

    deductFood(){
        var button = createButton("Feed The Dog");
        button.position(400,125);

        if(button.mousePressed(function(){


            foodS = foodS-1;
            gameState = 1;
            database.ref('/').update({'gameState':gameState})
        })){


        }


        }

    getFoodStock(){
        var adFood = createButton("Add The Food");
        button.position(500,125);

        if(adFood.mousePressed(function(){

foodS = foodS+1;
gameState = 2;
database.ref('/').update({'gameState':gameState})

        })){

        }
    }

    bedroom(){
background(bedI,550,500)
    }

    washroom(){
background(washI,550,500)
    }

    garden(){
background(gardenI,550,500)
    }


display(){

var x = 80;
var y = 100;

imageMode(CENTER);
image(this.image,720,220,70,70);

if(this.foodStock!==0){
    for(var i= 0;i<this.foodStock;i++){
        if(i%10==0){
            image(this.image,x,y,50,50);
            x = x+30;
        }
    }
}

}

}