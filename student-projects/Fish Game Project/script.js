console.log("hello")
let x = 675;
let hit = false;
let y = 307;
let score = 0;
let guppy;
let shark;
let char;
let bg;

function preload() {
  guppy = loadImage('https://cdn.glitch.com/85b25279-a475-42fa-8a51-575bc65d8344%2F698397638.png?1530206441848');
 shark = loadImage('https://cdn.glitch.com/85b25279-a475-42fa-8a51-575bc65d8344%2F1057f319dccd9cf.png?1530207592415');
  char = loadImage('https://cdn.glitch.com/64a447a0-ce1e-4088-b599-d3d0ee5158d9%2Ftoonvectors-8289-140.png?1530199081684');

}


let myFish

function setup() {
    bg = loadImage("https://cdn.glitch.com/85b25279-a475-42fa-8a51-575bc65d8344%2FPreview_Image_Underwater_V2.jpg?1530282043856");
  image(guppy, 0, 0);
  image(shark, 0, 0);
  createCanvas(1400, 800);
  myFish = new Fish()
  myFish2 = new Fish()
  myFish3 = new Fish()
  myFish4 = new Fish()
  myFish5 = new Fish()
  myShark = new Shark()
  myShark2 = new Shark()
  myShark3 = new Shark()
}

function draw(){
  background(bg);
  if(myFish.checkForHit() || myFish2.checkForHit()  || myFish3.checkForHit() || myFish4.checkForHit()   || myFish5.checkForHit()){
    myShark.increaseSpeed()
    myShark2.increaseSpeed()
    myShark3.increaseSpeed()
  }
  myFish.moveFish()
  myFish.showFish()
  
  myFish2.moveFish()
  myFish2.showFish()
  
  myFish3.moveFish()
  myFish3.showFish()
  
  myFish4.moveFish()
  myFish4.showFish()
  
  myFish5.moveFish()
  myFish5.showFish()
  
  myShark.checkForHit()
  myShark.moveShark()
  myShark.showShark()
  myShark2.checkForHit()
  myShark2.moveShark()
  myShark2.showShark()
  
  if(score > 30) {
    myShark3.checkForHit()
    myShark3.moveShark()
    myShark3.showShark()
  }
  
  
  textSize(50)
  text(`score: ${score}`, 25, 50);
  
//   fill(0, 255, 0)

  keyboardMove()
  
//  randomMovement()
  
  fill(255, 0, 0);
    
  image(char,x, y, 50, 50);

  
  // checkForHit()
  
//   rect(rectX, rectY, 55, 55);
//   rect(rectX, rectY, 55, 55);
}



function keyboardMove(){
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }

  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }

  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
}




function Fish(){
  this.x = random(100, 1250)
  this.y = random(100, 525)
  this.width = 55
  this.height = 55
  this.xSpeed = 3
  this.ySpeed = 3
  this.color = color(random(200,255),0,0)
  
  this.checkForHit = function(){
    hit = collideRectCircle(this.x, this.y, 55, 55,x, y ,50);
    if(hit == true){
      this.x = random(56, 1300)
      this.y = random(55, 550)
      score += 1
      this.xSpeed += 1.15
      this.ySpeed += 1.15


      return true
    } 
  }
    
  
  
  this.moveFish = function(){
      this.y = this.y + this.ySpeed;
      this.x = this.x + this.xSpeed
      if(this.x > 1350){
     this.xSpeed *= -1
        console.log("hit edge")
      }

    if(this.y > 750){
     this.ySpeed *= -1
      console.log("hit edge top/bottom")
      } 

      if(this.x < 0){
     this.xSpeed *= -1
        console.log("hit edge")
      }

    if(this.y < 0){
     this.ySpeed *= -1
      console.log("hit edge top/bottom")
      } 
  }
  
  this.showFish = function(){
    fill(this.color)
    image(guppy, this.x, this.y, this.width, this.height)
  }
  
}
function Shark(){
  this.x = random(100, 1250)
  this.y = random(100, 525)
  this.width = 55
  this.height = 55
  this.xSpeed = 3
  this.ySpeed = 3
  
  this.color = color(random(200,255),0,0)
  
  this.checkForHit = function(){
  hit = collideRectCircle(this.x, this.y, 55, 55,x, y ,50);
  if(hit == true){
    this.x = random(56, 1300)
    this.y = random(55, 550)
    score = 0
    location.reload()
  } 
  }
    
  
  
  this.moveShark = function(){
      this.y = this.y + this.ySpeed;
      this.x = this.x + this.xSpeed
      if(this.x > 1350){
     this.xSpeed *= -1
        console.log("hit edge")
      }

    if(this.y > 750){
     this.ySpeed *= -1
      console.log("hit edge top/bottom")
      } 

      if(this.x < 0){
     this.xSpeed *= -1
        console.log("hit edge")
      }

    if(this.y < 0){
     this.ySpeed *= -1
      console.log("hit edge top/bottom")
      } 
  }
  
  this.showShark = function(){
    fill(this.color)
    image(shark, this.x, this.y, this.width, this.height)
  }
  
  this.increaseSpeed = function(){
  this.xSpeed  += 2
  this.ySpeed += 2
  
  }
  
}