var g = {}

function iterate() {
	g.pnt.add(g.attr).div(2)
}

function setup() {
	g.cr = 1
	g.reps = 250
	g.rad = 10
	g.scal = 360
	g.prob = 0.90
	g.pnt = createVector(0,0)
	g.attrs = [[
			createVector(0,2/sqrt(3)),
			createVector(1,-1/sqrt(3)),
			createVector(-1,-1/sqrt(3)),
		],
		[
			createVector(0,-2/sqrt(3)),
			createVector(1,1/sqrt(3)),
			createVector(-1,1/sqrt(3)),
		]
	]
	createCanvas(windowWidth*g.cr,windowHeight*g.cr)
	g.g = createGraphics(width,height)
	t = min(width,height)/(925*g.cr)
	g.scal = g.scal*t
	g.rad = g.rad*t
	g.x = width/2
	g.y = height/2
	background(0)
	g.g.noStroke()
	colorMode(HSB,360)
	g.g.colorMode(HSB,360)
	angleMode(DEGREES)
	textSize(20*t)
	textFont('Consolas')
	g.set=g.attrs[0]
	g.addr=0
	g.saddr=0
	g.edit=1
}

function draw() {
	background(0)
	translate(g.x,g.y)
	if (g.edit) {
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
					if (g.scal*tempos.dist(attr)<g.rad) {
						if (attrs.length>1){ 
								brk.push([i,k])
								brek = 0
						}
				}
				}
				if(brek){
					fill(360*i/len,360,360)
					ellipse(attr.x*g.scal,-attr.y*g.scal,g.rad,g.rad)
				}
			}
		}
		for (var i = 0; i<brk.length;i++){
		g.attrs[brk[i][0]].splice(brk[i][1],1)
		}
		if(!(mouseX>-g.x/4+g.x+g.rad && mouseX<-g.x/4+g.x+g.x/2-g.rad && mouseY>g.y/2+g.y+g.rad)){
			fill(10)
			rect(-g.x/4-g.rad,g.y/2-g.rad,g.x/2+g.rad,g.y/2+g.rad)
			fill(360)
			text(
				'Controls \n'+
				'Space: Toggle Render/Edit \n'+
				'ALT (Hold) + LMB: Add \n'+
				'LMB (Hold): Delete \n'+
				'Up: New Layer \n'+
				'Down: Delete Top Layer \n'+
				'Right: Next Layer \n'+
				'Left: Previous Layer \n'
			,-g.x/4,g.y/2,g.x/2,g.y/2)
		}	
	}
	else {
		if(mouseIsPressed){
			g.pnt.x+=(mouseX-g.x)/g.scal*2
			g.pnt.y-=(mouseY-g.y)/g.scal*2
		}
		for (var i = 0;i<g.reps;i++){
			if (random(1)>g.prob){
				//g.saddr=(g.saddr+1)%g.attrs.length
				g.set = random(g.attrs)
			}
			//g.set = g.attrs[g.saddr]
			g.attr = random(g.set)
			h = g.pnt.heading()
			if (h<0){
				h+=360
			}
			g.g.fill(h,360,360)
			iterate()
			g.g.ellipse(g.pnt.x*g.scal+g.x,-g.pnt.y*g.scal+g.y,0.25,0.25)
		}
		image(g.g,-g.x,-g.y,width,height)
	}
}

function windowResized() {
	resizeCanvas(windowWidth*g.cr,windowHeight*g.cr)
	g.x = width/2
	g.y = height/2
	g.g.clear()
}

function keyPressed() {
	if (keyCode==13 && !g.edit){
		saveCanvas('compiterator.png')
	}
	if (keyCode==18){
		g.del=1
	}
	if (keyCode==32){
		g.edit = !g.edit
		g.saddr=0
		windowResized()
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
				if (g.addr>=g.attrs.length){
					g.addr=g.attrs.length-1
				}
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
