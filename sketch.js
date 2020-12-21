const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var particles;
var plinkos = [];
var divisions = [];

var divisionHeight = 300;
var score = -100;
var turn = 0;
gameState = "start";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

    for (var k = 0; k <=width; k = k + 80) {
      divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
    }

    for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) {
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) {
       plinkos.push(new Plinko(j,375));
    }
  mousePressed();
}

function draw() {
  background(color(mouseX, mouseY, mouseY/mouseX));  
  
  Engine.update(engine);
  
  for (var i = 0; i < plinkos.length; i++) {
     plinkos[i].display();
   }

  for (var k = 0; k < divisions.length; k++) {
     divisions[k].display();
   }

  if (particles !== null) {
    particles.display();

  var pos = particles.body.position;

    if(pos.y > 760) {
      if(pos.x < 75 || pos.x > 725) {
        score = score+100;
        particles = null;
        if (turn>=6) gameState = "end";
      }
      if(pos.x > 75 && pos.x < 150 || pos.x > 650 && pos.x < 725) {
        score = score+200;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
      if(pos.x > 150 && pos.x < 225 || pos.x > 575 && pos.x < 650) {
        score = score+300;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
      if(pos.x > 225 && pos.x < 300 || pos.x > 500 && pos.x < 575) {
        score = score+400;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
      if(pos.x > 300 && pos.x < 450) {
        score = score+500;
        particles = null;
        if (turn>=6) gameState = "end";
      } 
    }
  }

  if(turn === 7) {
    gameState = "end";
    turn = 0;
  }

  if(gameState === "end") {
    textFont("Georgia");
    textSize(100);
    if(mouseY > 300) {
    fill(0);
    } else {
      fill(255)
    }
    push();
    strokeWeight(25);
    stroke(color(mouseY, mouseY, 50));
    text("GAME OVER",100,475);
    pop();
  }

  fill(0);
  textFont("goergia");
  textSize(30);
  if(score > -1) {
    text("Score: "+score,20,30);
  }
  text("100     200     300    400     500    500     400     300     200    100",15,525);
}

function mousePressed() {
    if (gameState !== "end") {
      turn++;
      particles = new Particle(mouseX, 10, 10, 10);
    }
}

function keyPressed() {
  if(keyCode === 32) {
      if(gameState === "end") {
        gameState = "start";
        score = 0;
      }
    }
}