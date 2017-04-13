var g = {};
g.s1 = {}
g.s2 = {}
g.s3 = {}
g.s4 = {} 
g.objs = []
g.plyAng=0 // Player rotation
g.score=0 // Game score
g.plyRot=0.125 // Player rotational speed
g.plySpd=1 // Player speed
g.plyRad=25 // Player radius
g.comP=0.75 // Compass position ratio 
g.comL=0.10 // Compass length ratio 
g.weight=2 // Stroke weight

function setup() {
	g.rot=-HALF_PI // Game rotation
	g.plyPos = createVector(0,0); // Player position
  g.plyMov = createVector(0,0);
	g.colBan = color(150) // Banner color
	g.colScr = color(0) // Screen color
	g.plrCol = color(255) // Player color
	g.w=int(windowWidth*0.95)
	g.h=int(windowHeight*0.95)
	g.viewDistance=int(g.w/6)
	g.widgetHeight=int(g.h*0.25)
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
	var off;
	var imt;
	var objs;
 
  p.setup = function () {
    p.createCanvas(g.s4.w, g.s4.h);
    p.fill(0);
		p.colorMode(HSB, 90)
	  p.strokeWeight(g.weight);
		p.rectMode(CENTER);
		p.textSize(4/100*p.height);
	  offX = p.width/2;
	  offY = p.height/2;
		off = min(offX,offY)
		objs = [
			new p.obj(0,createVector(-300,0),0,[[100,100],[100,-100],[-100,-100],[-100,100]]),
			new p.obj(1,createVector(-150,-300),0,[[100,100],[10,-100],[-59,-100],[-100,-59],[-100,100]]),
			new p.obj(2,createVector(100,200),0,[[100,100],[100,-100],[-100,-100]]),
		];
  };
 
  p.draw = function () {
		if(keyIsDown(32)){
		  g.plyMov.add(createVector(1,0).rotate(g.plyAng+g.rot).mult(g.plySpd));
	  }
    g.plyPos.add(g.plyMov);
    g.plyMov.set([0,0]);
		p.background(g.colScr);
		p.translate (offX, offY);
		p.push(); //Draw objects
		p.rotate(-g.plyAng);
		p.translate (-g.plyPos.x, -g.plyPos.y);
		for (var i=0;i<objs.length;i+=1) {
			objs[i].draw()
		}
		p.pop();
		g.image=p.loadPixels();
		p.stroke(g.plrCol);
		p.push(); //Draw player
    p.ellipse(0,0,g.plyRad*2, g.plyRad*2);
	  p.line(0,0,0,-g.plyRad);
		p.pop();
		imt=p.loadPixels();
		p.push(); //Draw compass
		p.translate(offX*g.comP,-offY*g.comP)
		p.rotate(-g.plyAng)
		p.line(-off*g.comL,0,off*g.comL,0)
		p.line(0,-off*g.comL,0,off*g.comL)
		p.text("N",-p.textWidth("N")/2,-off*g.comL)
		p.pop();
  };
	p.obj = class {
		constructor(type,pos,ang,verts) {
			this.pos = pos
			this.ang = ang
			this.verts = verts
			this.id = type
			switch (type){
				case 0:
					this.col = p.color(30,100,100);
					break;
				case 1:
					this.col = p.color(90,100,100);
					break;
				case 2:
					this.col = p.color(60,100,100);
					break;
				default:
					this.col = 0;
					this.verts=[];
			};
		}
		draw() {
			p.push();
			p.translate(this.pos.x,this.pos.y);
			p.rotate(this.ang);
			p.stroke(this.col);
			p.beginShape();
			for (var i=0;i<this.verts.length;i+=1) {
				p.vertex(this.verts[i][0],this.verts[i][1]);
			}
			p.endShape(CLOSE);
			p.pop();
		}
	}
},
"sketch04");