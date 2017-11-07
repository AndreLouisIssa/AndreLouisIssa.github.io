var g = {}

function mod(a,b){
	return a-b*int(a/b)
}

function iterate() {
	a=g.a
	//g.a= mod(g.p[0][0],g.a)
	//g.a= g.p[0][0]*g.a*(1-g.a)
	//g.a= g.p[0][0]*g.a-(1-g.a)
	//g.a= g.a+g.p[0][0]*sin(TWO_PI*g.a)/TWO_PI
	//g.a= g.p[0][0]+g.a+sin(TWO_PI*g.a)/TWO_PI
	//g.a= g.p[0][0]+g.a+g.a*sin(TWO_PI*g.a)/TWO_PI
	//g.a= pow(g.a,2)+g.p[0][0]*sin(TWO_PI*g.a)/TWO_PI
	//g.a= g.a+g.p[0][0]*tan(TWO_PI*g.a)/TWO_PI
	//g.a= mod(g.p[0][0],g.a)
	//g.a= g.a - g.a*(g.p[0][0]-g.a)
	//g.a= g.a + g.p[0][0]*(g.n-g.a)
	//g.a= g.n+g.p[0][0]*sin(TWO_PI*g.a)/TWO_PI
	//g.a= g.a/sin(TWO_PI*g.a-g.p[0][0])
	//g.a= g.a/sin(TWO_PI*g.a*g.p[0][0])
	//g.a= g.a-sin(g.a*g.p[0][0])|
	//g.a= g.a-random()*g.p[0][0]
	//g.a = g.p[0][0]-exp(g.a)
	//g.a = g.a-mod(g.p[0][0],g.a)
	//g.a= g.a+g.p[0][0]*sin(g.a)
	//g.a = mod(g.a + g.b,TWO_PI)
	//g.b = mod(g.a - a,TWO_PI)
	//g.b= g.p[0][0]*sin(g.a)
	//g.a= g.a + g.b
	//g.b= mod(g.p[0][0]*sin(g.a),TWO_PI)
	//g.a= mod(g.a + g.b,TWO_PI)
	//g.a= g.a + g.q[0][0] - g.p[0][0]*sin(g.a)
	//g.a= g.a + g.p[0][0]+0.5 - (PI+g.q[0][0])*sin(g.a*TWO_PI)/TWO_PI
	//g.a= g.a + g.q[0][0]+0.5 - (PI+g.p[0][0])*sin(g.a*TWO_PI)/TWO_PI
	//g.a= g.p[0][0]*g.a-g.a*g.q[0][0]*(1-g.a)
	g.a= g.a + g.p[0][0]+0.5 - (3+g.q[0][0])*sin(g.a*TWO_PI)/TWO_PI
	g.n+=1
	g.wa = g.a/g.n
	g.wb = g.b/g.n
}

function setup() {
	g.p=[[-0.5,0,0.5,0.0005]]
	g.q=[[-3,-3,3,0.002]]
	g.n=0
	g.wa=0
	g.wb=0
	g.a=1
	g.b=0
	g.c=0
	g.d=1
	g.cr = 1
	g.reps1 = 1
	g.reps2 = 200
	g.radi = 10
	g.scali = 360
	g.scalix = 1000
	g.scaliy = 150
	g.prob = 0.5
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
	t = min(width,height)/(1080*g.cr)
	g.scal = g.scali*t
	g.scalx = g.scalix*t
	g.scaly = g.scaliy*t
	g.rad = g.radi*t
	g.x = width/2
	g.y = height/2
	background(0)
	g.g.noStroke()
	colorMode(HSB,360)
	g.g.colorMode(HSB,360)
	angleMode(RADIANS)
	textSize(20*t)
	textFont('Consolas')
	g.set=g.attrs[0]
	g.addr=0
	g.edit=0
	g.col=1
	g.excl=0
	g.excn=0
	g.loop=0
	g.ab=0
}

function draw() {
	background(0)
	translate(g.x,g.y)
	if (g.edit*0) {
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
		if(!(mouseX>-g.x && mouseX<-g.x+g.x+g.x/2-g.rad && mouseY<g.y/2)){
			fill(10)
			rect(-g.x,-g.y,g.x/2+g.rad,g.y/2+g.rad*5)
			fill(360)
			text(
				'Controls \n'+
				'Space: Toggle Render/Edit \n'+
				'ALT (Hold) + LMB: Add Node \n'+
				'LMB (Hold): Delete Node \n'+
				'Up: New Layer \n'+
				'Down: Delete Top Layer \n'+
				'Right: Next Layer \n'+
				'Left: Previous Layer \n'+
				'Shift: Toggle Colouring \n'+
				'N: Toggle Node Reselection \n'+
				'M: Toggle Layer Reselection \n'+
				'Enter: Save Image'
			,-g.x+2*g.rad,g.rad-g.y,g.x/2,g.y/2+g.rad*4)
		}	
	}
	else {
		for (var k = 0;k<g.reps1;k++){
			if(g.p[0][0]>=g.p[0][2]){
				if(g.loop){g.p[0][0]=g.p[0][1]}
				else{
					break
				}
			}
			g.n=1
			g.a = random()*(g.c+(g.c==0))
			g.b = random()*(g.d+(g.d==0))
			for (g.q[0][0] = g.q[0][1];g.q[0][0]<g.q[0][2];g.q[0][0]+=g.q[0][3]){
				if(mouseIsPressed){
					g.pnt.x+=(mouseX-g.x)/g.scal*2
					g.pnt.y-=(mouseY-g.y)/g.scal*2
				} 
				g.pnt.x=g.p[0][0]
				g.pnt.y=g.q[0][0]
				for (var j = 0;j<g.reps2;j++){iterate()}
				if(g.col){
					h = mod(360*(g.wa*(!g.ab)+g.ab*g.wb),360)//g.pnt.heading()
					if (h<0){
						h+=360
					}
					g.g.fill(h,360,360)
				}
				else{
					g.g.fill(360)
				}
				g.g.rect(g.pnt.x*g.scalx+g.x,-g.pnt.y*g.scaly+g.y,g.p[0][3]*g.scalx,g.q[0][3]*g.scaly)
			}
			g.p[0][0]+=g.p[0][3]
		}
		image(g.g,-g.x,-g.y,width,height)
	}
}

function windowResized() {
	resizeCanvas(windowWidth*g.cr,windowHeight*g.cr)
	t = min(width,height)/(1080*g.cr)
	g.g = createGraphics(width,height)
	g.scal = g.scali*t
	g.rad = g.radi*t
	g.x = width/2
	g.y = height/2
	textSize(20*t)
	g.g.colorMode(HSB,360)
	g.g.noStroke()
}

function clearIt(){
		g.g.clear()
		g.p[0][0]=g.p[0][1]
}

function keyPressed() {
	print(keyCode)

	if (keyCode==32){
		g.edit = !g.edit
		clearIt()
		
	}
	if (g.edit*0){
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
	else{
		if (keyCode==13){
			saveCanvas('tongue.png')
		}
		if (keyCode==16){
			g.col=!g.col
			//g.g.clear()

		}
	}
}

function mouseClicked(){
	if (keyCode==18 && keyIsPressed && g.edit){
		g.attrs[g.addr].push(createVector(mouseX-g.x,g.y-mouseY).div(g.scal))
	}
}
