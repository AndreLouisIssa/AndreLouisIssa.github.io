var plyMov;
var plyPos;
var plyAng = 0;
const plySpd = 1;
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
	offX = width/2
	offY = height/2
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
	if(keyIsPressed){
		if (keyCode==100){
			plyMov.add(p5.Vector.fromAngle(plyAng).mult(plySpd))
		}
		if (keyCode==97){
			plyMov.sub(p5.Vector.fromAngle(plyAng).mult(plySpd));
		}
		if (keyCode==115){
			plyMov.add(p5.Vector.fromAngle(plyAng+HALF_PI).mult(plySpd));
		}
		if (keyCode==119){
			plyMov.sub(p5.Vector.fromAngle(plyAng+HALF_PI).mult(plySpd));
		}
	}
  plyPos.add(plyMov);
	plyPos.set([constrain(plyPos.x,plyRad-offX,offX-plyRad),constrain(plyPos.y,plyRad-offY,offY-plyRad)]);
  plyMov.set([0,0,0]);
  stroke(255,0,0);
  ellipse(plyPos.x,plyPos.y,plyRad*2, plyRad*2);
}

function drawObj(){
  stroke(255);
  ellipse(50, 50, 80, 80);
}

function mouseDragged(){
	plyAng+=mouseX-pmouseX
}

function windowResized() {
  resizeCanvas(int(windowWidth*canvasRatio), int(windowHeight*canvasRatio));
}