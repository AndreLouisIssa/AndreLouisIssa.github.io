var plyMov;
var plyPos;
var plyAng = 0;
const plySpd = 1;
const plyRot = 0.125;
const plyEnable = 1; 
const plyRad = 25
const canvasRatio = 0.8;
var offX;
var offY;

function setup() {
  createCanvas(int(windowWidth*canvasRatio), int(windowHeight*canvasRatio));
  fill(0);
	strokeWeight(2);
	plyPos = createVector(0,0);
	plyMov = createVector(0,0);
	offX = width/2;
	offY = height/2;
}

function draw() {
	push();
	translate (offX, offY);
  background(0);
  drawPly();
	drawObj();
	pop();
}

function drawPly(){
	if(keyIsDown(32)){
		plyMov.add(p5.Vector.fromAngle(plyAng).mult(plySpd));
	}
  plyPos.add(plyMov);
	plyPos.set([constrain(plyPos.x,plyRad-offX,offX-plyRad),constrain(plyPos.y,plyRad-offY,offY-plyRad)]);
  plyMov.set([0,0]);
  stroke(255,0,0);
	push()
	translate(plyPos.x,plyPos.y)
  ellipse(0,0,plyRad*2, plyRad*2);
	const k = p5.Vector.fromAngle(plyAng).mult(plyRad);
	line(0,0,k.x,k.y);
	pop()
}

function drawObj(){
  stroke(255);
  ellipse(50, 50, 80, 80);
}

function mouseDragged(){
	if (plyEnable){
		plyAng+=(mouseX-pmouseX)*plyRot*TWO_PI/width;
	}
}

function windowResized() {
  resizeCanvas(int(windowWidth*canvasRatio), int(windowHeight*canvasRatio));
}