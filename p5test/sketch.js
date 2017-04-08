var g = {};
g.s1 = {}
g.s2 = {}
g.s3 = {}
g.s4 = {} 
g.plyAng=0

function setup() {
	g.w=int(windowWidth*0.95)
	g.h=int(windowHeight*0.95)
	g.viewDistance=int(g.w/6)
	g.widgetHeight=int(g.h*0.25)
	g.plyRot=0.125
	g.plySpd=1
	g.plyRad=25
  g.plyPos = createVector(0,0);
  g.plyMov = createVector(0,0);
	g.colBan = color(150)
	g.colScr = color(0)
	g.plrCol = color(255)
	prep()
}

function prep(){
	g.s1.w=g.w-2*g.viewDistance
	g.s1.h=g.widgetHeight
	g.s2.w=2*g.viewDistance
	g.s2.h=g.s1.h
	g.s3.w=g.s1.w
	g.s3.h=g.h-g.widgetHeight
	g.s4.w=g.s2.w
	g.s4.h=g.s3.h
}

function windowResized() {
	location.reload(1)
}

function mouseDragged() {
	g.plyAng+=(mouseX-pmouseX)*g.plyRot*TWO_PI/g.s1.w;
}

function keyPressed() {
	
}

//Top Left
new p5(function (p) {
  "use strict";
  var offX;
  var offY;
 
  p.setup = function () {
    p.createCanvas(g.s1.w, g.s1.h);
    p.fill(0);
	  p.strokeWeight(2);
	  offX = p.width/2;
	  offY = p.height/2;
  };
 
  p.draw = function () {
		p.background(g.colBan);
  };
},
"sketch01");

//Top Right
new p5(function (p) {
  "use strict";
  var offX;
  var offY;
 
  p.setup = function () {
    p.createCanvas(g.s2.w, g.s2.h);
    p.fill(0);
	  p.strokeWeight(2);
	  offX = p.width/2;
	  offY = p.height/2;
  };
 
  p.draw = function () {
		p.background(g.colBan);
  };
},
"sketch02");

//Bottom Left
new p5(function (p) {
  "use strict";
  var offX;
  var offY;
 
  p.setup = function () {
    p.createCanvas(g.s3.w, g.s3.h);
    p.fill(0);
	  p.strokeWeight(2);
	  offX = p.width/2;
	  offY = p.height/2;
  };
 
  p.draw = function () {
		p.background(g.colScr);
  };
},
"sketch03");

//Bottom Right
new p5(function (p) {
  "use strict";
  var offX;
  var offY;
 
  p.setup = function () {
    p.createCanvas(g.s4.w, g.s4.h);
    p.fill(0);
	  p.strokeWeight(2);
	  offX = p.width/2;
	  offY = p.height/2;
  };
 
  p.draw = function () {
    p.push();
	  p.translate (offX, offY);
    p.background(g.colScr);
		if(keyIsDown(32)){
		  g.plyMov.add(createVector(1,0).rotate(g.plyAng).mult(g.plySpd));
	  }
    g.plyPos.add(g.plyMov);
	  g.plyPos.set([constrain(g.plyPos.x,g.plyRad-offX,offX-g.plyRad),constrain(g.plyPos.y,g.plyRad-offY,offY-g.plyRad)]);
    g.plyMov.set([0,0]);
    p.stroke(g.plrCol);
	  p.push()
	  p.translate(g.plyPos.x,g.plyPos.y)
    p.ellipse(0,0,g.plyRad*2, g.plyRad*2);
	  const k = p.createVector(1,0).rotate(g.plyAng).mult(g.plyRad);
	  p.line(0,0,k.x,k.y);
	  p.pop()
  };
},
"sketch04");