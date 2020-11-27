let l = 600, w = 600;
let z = 0.0;

let rotation = 0;
let xPos = w*0.5, yPos = l*0.75;

let drawLine = 0;
let jPressed = false, lPressed = false, wPressed = false, aPressed = false, sPressed = false, dPressed = false, kPressed = false, showAst = false;
let rotationSpeed = 5;


var projectiles = [];
var asteroids = [];

let closestAst = null;

let val;


function setup(){
  createCanvas(l, w);
}

function draw(){
  // start
  background(0);

  fill(255);
  text(Math.round(frameRate()), 50, 50);

  collisionDetection();

  push();

  //stroke(255);
  translate(xPos, yPos);

  // gun angular speed and boundaries
  if(rotation <= -60)
    jPressed = 0;
  if(jPressed)
    rotation -= rotationSpeed;

  if(rotation >= 60)
    lPressed = 0;
  if(lPressed)
    rotation += rotationSpeed;

  // draw rect
  //rotate(radians(rotation));
//  line(0, 0, 0, -20);

  //translate(xPos, yPos);
  rotate(radians(rotation));
  drawAgent();

  pop();

  //
  if(wPressed)
    yPos -= 3;

  if(aPressed)
    xPos -= 3;

  if(sPressed)
    yPos += 3;

  if(dPressed)
    xPos += 3;

  if(kPressed){
    let lengthPro = projectiles.length;

    for(let i = 0; i < lengthPro; i++){
      projectiles[i].render();
    }

    if (projectiles.length > 30) projectiles.splice(0, 1);
  }

  if(showAst){
    let lengthAst = asteroids.length;

    for(let i = 0; i < asteroids.length; i++){
      asteroids[i].show();
      //asteroids[i].createHitBox();

    }
  }


//  collisionDetection();

  fill(255);
  text(val, 250, 500);

}

function drawAgent(){
  beginShape();
  vertex(0,0);
  vertex(-10, 7);
  vertex(0, -23);
  vertex(10, 7);
  endShape(CLOSE);
}

function mousePressed(){
  drawLine = 1;

}

function mouseReleased(){
  drawLine = 0;
}

function keyTyped(){
  if(key === 'j')
    jPressed = 1;

  if(key === 'l')
    lPressed = 1;

  if(key === 'w')
    wPressed = 1;

  if(key === 'a')
    aPressed = 1;

  if(key === 's')
    sPressed = 1;

  if(key === 'd')
    dPressed = 1;

  if(key === 'k'){
    projectiles.push(new Projectile(xPos, yPos, rotation));
    kPressed = 1;

  }

  if(key === 'p'){
    asteroids.push(new Asteroid(random(0, w), random(0, l*0.65), random(0, 100), asteroids.length));
    showAst = 1;
  }
}

function keyReleased(){
  if(key === 'j')
    jPressed = 0;

  if(key === 'l')
    lPressed = 0;


  if(key === 'w')
    wPressed = 0;

  if(key === 'a')
    aPressed = 0;

  if(key === 's')
    sPressed = 0;

  if(key === 'd')
    dPressed = 0;

//  if(key === 'k')
  //  kPressed = 0;

//  if(key === 'p')
//    pPressed = 0;


/*

****************

  switch (key){
    case 'j':
      jPressed = 0;
      break;
    case 'l':
      lPressed

  }
*/

}

function getClosestAsteroid(x_, y_){
  let index;

  // if(closestAst)
  //   closestAst.closest = false;

  for(let i = 0; i < asteroids.length; i++){
    if(i === 0){
      closestAst = asteroids[i];
      index = i;
    }
    else{
      if(dist(asteroids[i].x, asteroids[i].y, x_, y_) < dist(closestAst.x,closestAst.y, x_, y_)){
        closestAst = asteroids[i];
        index = i;
      }
    }
  }

  // closestAst.closest = true;
  return [closestAst, index];
}

function collisionDetection(){
  for(let i = 0; i < projectiles.length; i++){
    if(asteroids.length > 0){
      if(projectiles.length > 0){
        let closest = getClosestAsteroid(projectiles[i].pos.x, projectiles[i].pos.y)[0];
        if(collideCirclePoly(projectiles[i].pos.x, projectiles[i].pos.y, 5, asteroids[getClosestAsteroid(projectiles[i].pos.x, projectiles[i].pos.y)[1]].getRadiusValue(), true)){
          asteroids.splice(getClosestAsteroid(projectiles[i].pos.x, projectiles[i].pos.y)[1], 1);
          projectiles.splice(i, 1);
        }
      }
    }
  }
}
