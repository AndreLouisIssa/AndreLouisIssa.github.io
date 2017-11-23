var g = {}

function mod(a,b){
	return a-b*int(a/b)
}

function iterate() {
	g.ta=g.a
	g.ta=g.b
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
	g.a= g.n+g.p[0][0]*sin(TWO_PI*g.a)/TWO_PI
	//g.a= g.a/sin(TWO_PI*g.a-g.p[0][0])
	//g.a= g.a/sin(TWO_PI*g.a*g.p[0][0])
	//g.a= g.a-sin(g.a*g.p[0][0])
	//g.a= g.a-random()*g.p[0][0]
	//g.a = g.p[0][0]-exp(g.a)
	//g.a = g.a-mod(g.p[0][0],g.a)
	//g.a= g.a+g.p[0][0]*sin(g.a)
	//g.a = mod(g.a + g.b,TWO_PI)
	//g.b = mod(g.a - g.ta,TWO_PI)
	//g.b= g.p[0][0]*sin(g.a)
	//g.a= g.a + g.b
	g.b= mod(g.p[0][0]*sin(g.a),TWO_PI)
	//g.a= mod(g.a + g.b,TWO_PI)
	//g.a = (g.a + g.ta)/2
	g.n+=1
	g.wa = g.a/g.n
	g.wb = g.b/g.n
}

function setup() {
	g.p=[[-10,-10,10,0.001]]
	g.q=[[-10,-10,10,0.001]]
	g.n=0
	g.wa=0
	g.wb=0
	g.a=1
	g.b=0
	g.c=0
	g.d=1
	g.cr = 1
	g.reps1 = 30
	g.reps2 = 250
	g.prep = 3
	g.radi = 10
	g.scali = 360
	g.scalix = 50
	g.scaliy = 70
	g.pnt = createVector(0,0)
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
	g.edit=0
	g.col=1
	g.excl=0
	g.excn=0
	g.loop=0
	g.ab=1
}

function draw() {
	background(0)
	translate(g.x,g.y)
		for (var k = 0;k<g.reps1;k++){
			if(g.p[0][0]>=g.p[0][2]){
				if(g.loop){g.p[0][0]=g.p[0][1]}
				else{
					break
				}
			}
			g.a = random()*(g.c+(g.c==0))
			for (var i = 0;i<g.prep;i++){iterate()}
			g.n=1
			for (var i = 0;i<g.reps2;i++){
				g.pnt.x=g.p[0][0]
				if(g.ab){
					g.pnt.y=g.b
				}
				else{g.pnt.y=g.a}
				g.pnt.y=g.a+g.b
				if(g.col){
					h = 360*(g.wa+g.ab)-360*g.ta/(g.n-1)
					if (h<0){
						h+=360
					}
					if (h>360){
						h-=360
					}
					g.g.fill(h,360,360)
				}
				else{
					g.g.fill(360)
				}
				iterate()
				g.g.ellipse(g.pnt.x*g.scalx+g.x,-g.pnt.y*g.scaly+g.y,0.25,0.25)
			}
			g.p[0][0]+=g.p[0][3]
		}
		image(g.g,-g.x,-g.y,width,height)
	
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
	
		if (keyCode==13){
			saveCanvas('tongue.png')
		}
		if (keyCode==16){
			g.col=!g.col
			//g.g.clear()

		}
	
}

function mouseClicked(){
	if (keyCode==18 && keyIsPressed && g.edit){
		g.attrs[g.addr].push(createVector(mouseX-g.x,g.y-mouseY).div(g.scal))
	}
}
