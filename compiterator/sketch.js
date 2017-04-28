var g = {}

function iterate() {
	g.pnt.add(g.attr).div(2)
}

function setup() {
	g.cr = 0.95
	g.rad = 2
	g.scal = 180
	g.pnt = createVector(0,0)
	g.attrs = [[
		createVector(0,2),
		createVector(sqrt(3),0),
		createVector(-sqrt(3),0),
	]]
	createCanvas(windowWidth*g.cr,windowHeight*g.cr)
	g.x = width/2
	g.y = height/2
	background(0)
	noStroke()
	colorMode(HSB,360)
	angleMode(DEGREES)
	g.addr=0
}

function draw() {
	translate(g.x,g.y)
	if (g.edit) {
		background(0)
		len = g.attrs.length
		brk = []
		brek = 1
		for (var i=0;i<len;i++) {
			attrs = g.attrs[i]
			len2 = attrs.length
			for (var k=0;k<len2;k++) {
				attr = attrs[k]
				brek = 1
				if(mouseIsPressed){
					tempos = createVector(mouseX-g.x,-mouseY+g.y).div(g.scal)
					if (g.scal*tempos.dist(attr)<g.rad*5) {
						if (attrs.length>1){ 
								brk.push([i,k])
								brek = 0
						}
				}
				}
				if(brek){
					fill(360*i/len,360,360)
					ellipse(attr.x*g.scal,-attr.y*g.scal,g.rad*5,g.rad*5)
				}
			}
		}
		for (var i = 0; i<brk.length;i++){
		g.attrs[brk[i][0]].splice(brk[i][1],1)
		}
	}
	else {
		g.set = random(g.attrs)
		g.attr = random(g.set)
		h = g.pnt.heading()
		if (h<0){
			h+=360
		}
		fill(h,360,360)
		iterate()
		ellipse(g.pnt.x*g.scal,-g.pnt.y*g.scal,g.rad,g.rad)
	}
}

function windowResized() {
	resizeCanvas(windowWidth*g.cr,windowHeight*g.cr)
	g.x = width/2
	g.y = height/2
	background(0)
}

function keyPressed() {
	console.log(keyCode)
	if (keyCode==13){
		saveCanvas('compiterator.png')
	}
	if (keyCode==18){
		g.del=1
	}
	if (keyCode==32){
		g.edit = !g.edit
		background(0)
	}
	if (g.edit){
		switch (keyCode){
			case 37:
			if (g.addr){
				g.addr--
			}
			break
			case 38:
			g.attrs.push([])
			break
			case 39:
			if (g.addr<g.attrs.length-1){
				g.addr++
			}
			break
			case 40:
			if (g.attrs.length>1){
				g.attrs.pop()
			}
			break
			default:
			
		}
	}
}

function mouseClicked(){
	if (keyCode==18 && keyIsPressed && g.edit){
		g.attrs[g.addr].push(createVector(mouseX-g.x,g.y-mouseY).div(g.scal))
	}
}