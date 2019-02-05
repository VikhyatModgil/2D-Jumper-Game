let yoff = 0; 
var engine;
var box1;
var floor;
var score = 0;
var arrayBulletX = [];
var arrayBulletY = [];
var playerX;
var playerY;

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

function setup() {
    background(0,0,0);
    createCanvas( windowWidth,windowHeight);
    engine = Engine.create();
    box1 = Bodies.rectangle(100, 100, 80, 80);
    floor = Bodies.rectangle(0, (height-30), width*300, 10, { isStatic: true });
    Engine.run(engine); 
    World.add(engine.world, [box1,floor]);
    engine.world.gravity.y = 1;
    }
var backgroundScene = function(){
    noStroke();
    background(240,128,128);
    // We are going to draw a polygon out of the wave points
    beginShape();
    fill(255,160,122);
    let xoff = 0; // Option #1: 2D Noise
    // Iterate over horizontal pixels
    for (let x = 0; x <= window.width; x += 10) {
        let y = map(noise(xoff, yoff), 0, 1, 200, 700);
        // Set the vertex
        vertex(x, y);
        // Increment x dimension for noise
        xoff += 0.06;
    }
    // increment y dimension for noise
    yoff += 0.001;
    vertex(width, height);
    vertex(0, height);
    endShape(CLOSE);
    fill(0,0,0)
};

    function player(){
    playerX = box1.position.x;
    playerY = Math.floor(box1.position.y);
    fill(160,214,196);
    rect(box1.position.x,box1.position.y,80,80);
    fill(255,255,255);
    rect(floor.position.x,floor.position.y+30,width,100);
    if(box1.position.x > width-30){
        Matter.Body.applyForce( box1, {x: box1.position.x, y: box1.position.y}, {x: -.3, y: 0});
    }
    if (keyIsDown(39)) {
            Matter.Body.applyForce( box1, {x: box1.position.x, y: box1.position.y}, {x: .01, y: 0});
      }
    if (keyIsDown(37)) {
            Matter.Body.applyForce( box1, {x: box1.position.x, y: box1.position.y}, {x: -.01, y: 0});
      }
      if(box1.position.x < 0){
        Matter.Body.applyForce( box1, {x: box1.position.x, y: box1.position.y}, {x: .3, y: 0});
    }
    if (keyIsDown(38)) {
            Matter.Body.applyForce( box1, {x: box1.position.x, y: box1.position.y}, {x: 0, y: -.01});
        }
    if(box1.position.y <= 0){
        Matter.Body.applyForce( box1, {x: box1.position.x, y: box1.position.y}, {x: 0, y: .5});
    }
    }
    arrayBulletY[0] = [playerY];
    arrayBulletX = [500];
    console.log(arrayBulletX);

    function bullet(x, y, rocketId){
        arrayBulletX[0] = (arrayBulletX - 5);
        arrayBulletY[1] = (20);
        //bullet head
        fill(255,0,0);
        ellipse(arrayBulletX[0],arrayBulletY[0],30,20);
        //bullet body
        fill(0,0,0);
        rect(arrayBulletX[0],arrayBulletY[0]-10,50,20);
        if(arrayBulletX[0] < 10){
            arrayBulletX[0] = width;
            arrayBulletY[0] = Math.floor(playerY);
        }
        if(playerX > arrayBulletX[0]+50 && playerX-50 > arrayBulletX[0] && playerY < arrayBulletY[0]+100 && playerY > arrayBulletY[0]-0){
            for(var i = 0; i < 200; ++i){
                fill(255,0,0);
                ellipse(playerX+50,playerY+50,i,i);
                fill(255,200,0);
                ellipse(playerX+50,playerY+50,i-50,i-50);
                score = 0;
            }
            
        }
    }
    function obstacles(score){
        var numRocket = Math.ceil(score/1000)+1;
        bullet(2,2,(numRocket-1));
    }
  function draw() {
    backgroundScene();
    player();
    obstacles(score);
    textSize(width/10);
    text(score, width/2, 90);
    score++;
  }