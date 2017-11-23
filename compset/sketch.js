var g = {}
g.focus = new Complex(-1/2,0)
g.offset = new Complex(0,0)
g.constant = new Complex(0,0)
g.fatou = new Complex(0,0)
g.cofatou = new Complex(1,1)
g.transpose = new Complex(1,1)

function iterate(z,c) {
	return z.tran(g.transpose).intpow(2).add(c)
}

function Complex (a,b){
	this.real=a
	this.imag=b
}
Complex.prototype.mod = function(){
	return sqrt(this.real*this.real+this.imag*this.imag)
}
Complex.prototype.modSq = function(){
	return this.real*this.real+this.imag*this.imag
}
Complex.prototype.arg = function(){
	return atan2(this.real,this.imag)
}
Complex.prototype.conj = function(){
	return new Complex(this.real,-this.imag)
}
Complex.prototype.sqr = function(){
	return new Complex(this.real*this.real-this.imag*this.imag,2*this.real*this.imag)
}
Complex.prototype.conj = function(){
	return new Complex(this.real,-this.imag)
}
Complex.prototype.tran = function(c){
	return new Complex(this.real*c.real,this.imag*c.imag)
}
Complex.prototype.add = function(c){
	return new Complex(this.real+c.real,this.imag+c.imag)
}
Complex.prototype.sub = function(c){
	return new Complex(this.real-c.real,this.imag-c.imag)
}
Complex.prototype.mult = function(c){
	return new Complex(this.real*c.real-this.imag*c.imag,this.real*c.imag+this.imag*c.real)
}
Complex.prototype.div = function(c){
	z = this.mult(c.conj)
	r = 1/(c.real*c.real+c.imag*c.imag)
	return new Complex(r*z.real,r*z.imag)
}
Complex.prototype.intpow = function(n){
	if(n==0){
		return new Complex(0,0)
	}
	var z = new Complex(this.real,this.imag)
	if(n>0){
		for(var i=1;i<int(n);i++){
			z = z.mult(this)
		}
	}
	else{
		for(var i=1;i<int(-n);i++){
			z = z.div(this)
	}
	}
	return z
}
Complex.prototype.pow = function(n){
	r = pow(this.mod,n)
	t = this.arg*n
	a = r*cos(t)
	b = r*sin(t)
	return new Complex(a,b)
}
Complex.prototype.log = function(){
	if(this.modSq()==0){return 0}
	return new Complex(log(this.modSq())/2,this.arg())
}
Complex.prototype.raise = function(c){
	t = this.arg()
	r = this.mod()
	d = c.imag
	c = c.real
	R = pow(r,c)*exp(-d*t)
	T = d*log(r)+c*t
	return new Complex(R*cos(T),R*sin(T))
}

function setup() {
	g.canvasRatio = 1
	g.graphX= 1000*1
	g.graphY= 1000*1
	createCanvas(windowWidth*g.canvasRatio,windowHeight*g.canvasRatio)
	g.graph = createGraphics(g.graphX,g.graphY)
	g.graph.noStroke()
	g.graph.colorMode(RGB,1)
	g.graph.rectMode(CENTER)
	colorMode(RGB,1)
	angleMode(RADIANS)
	g.mapX=4
	g.mapY=4
	g.escape=16
	g.colpow=1
	g.colshift=0
	g.col1=color(0.056,0.03,0.120)
	g.col2=color(0.635,1,1)
	g.maxIters=350
	g.frameDivisions=25 
	// when not evenly divisible space shifts, this needs to be fixed
	g.difFY=int(g.graphY/g.frameDivisions)
	g.modFY=g.frameDivisions*g.difFY
	g.difFX=int(g.graphX/g.frameDivisions)
	g.modFX=g.frameDivisions*g.difFX
	g.aspect = min(width,height)
	g.mapsect = max(g.mapX,g.mapY)
	render()
}

function render(){
	background(0)
	g.graph.background(0)
	g.fY=0
	g.fX=0
}

function draw() {
	if(g.fY<g.difFY){
			for(var i=g.fY;i<g.fY+g.modFY;i+=g.difFY){
				for(var j=g.fX;j<g.fX+g.modFX;j+=g.difFX){
					x = (j/g.graphX-1/2)*g.mapX+g.focus.real
					y = (i/g.graphY-1/2)*g.mapY+g.focus.imag
					var w = new Complex(x,y)
					var z = g.offset.add(w.tran(g.fatou))
					var c = g.constant.add(w.tran(g.cofatou))
					var iters = 0
					for(iters;iters<g.maxIters;iters++){
						z=iterate(z,c)
						if(z.mod()>g.escape){break}
					}
					var v
					if(iters>=g.maxIters){
						v = z.mod()/g.escape
					}
					else{
						v = iters/g.maxIters
					}
					v = pow(v%1,g.colpow)+g.colshift
					//v-= log((log(z.modSq())/2)/log(2))/log(2)
					g.graph.fill(lerpColor(g.col1,g.col2,v%1))
					g.graph.rect(j,i,1,1)
					image(g.graph,(width-g.aspect*g.mapX/g.mapsect)/2,(height-g.aspect*g.mapY/g.mapsect)/2,g.aspect*g.mapX/g.mapsect,g.aspect*g.mapY/g.mapsect)
			}
		}
		g.fX++
		if(g.fX>=g.difFX){
			g.fY++
			g.fX=0
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth*g.canvasRatio,windowHeight*g.canvasRatio)
	g.graph = createGraphics(g.graphX,g.graphY)
	g.graph.colorMode(HSB,360)
	g.graph.noStroke()
	g.graph.rectMode(CENTER)
	render()
}

function keyPressed() {
	print(keyCode)
	if (keyCode==13){
		save(g.graph,'compset.png')
	}
}

function mouseClicked(){
}
