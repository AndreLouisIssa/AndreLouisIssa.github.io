var plyMov;
var plyPos;
const plySpd = 1;
const plyEnable = 0;

function setup() {
	const canvasRatio = 0.975;
  createCanvas(int(windowWidth*canvasRatio), int(windowHeight*canvasRatio));
  fill(0);
	strokeWeight(2);
	plyPos = createVector(0,0,0);
	plyMov = createVector(0,0,0);
}

function draw() {
  background(0);
  drawPly();
}

function drawPly(){
  plyPos=createVector(plyPos.x+plyMov.x,plyPos.y+plyMov.y,0)
  plyMov=createVector(0,0,0);
  stroke(255,0,0);
  ellipse(int(width/2+plyPos.x),int(height/2+plyPos.y),80, 80);
}

function drawObj(){
  stroke(255);
  ellipse(50, 50, 80, 80);
}

function mousePressed(){
  drawObj()
}

function keyPressed(){
  if (focused && plyEnable){
		if (keyCode=="w"){
			plyMov=plyMov.add(createVector(plySpd,0).rotate(plyAng));
		}
		else if (keyCode=="s"){
			plyMov=plyMov.sub(createVector(plySpd,0).rotate(plyAng));
		}
		if (keyCode=="a"){
			plyMov=plyMov.add(plyMov.rotate(HALF_PI).normalize()*plySpd);
		}
		else if (keyCode=="d"){
			plyMov=plyMov.sub(plyMov.rotate(HALF_PI).normalize()*plySpd);
		}
		plyAng=atan2(plyMov.y,plyMov.x);
  }
  drawObj();
}
