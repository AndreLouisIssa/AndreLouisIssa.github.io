// Hardcode
function first(){
  // Set stuff here
  glob.grav = 9.8; // Default gravity setting
  glob.meter = 10; // pixels in a meter
  glob.timeScale = 1.5; // seconds in simulation to real life
  glob.canvasRatio = 20; //Ratio between bar and sim canvas in percent
  glob.barBG = 36;
  glob.simBG = 0;
  glob.font ='Courier'
  glob.textSize =250
}

// Softcode

var glob = {}
glob.bar = {}
glob.sim = {}
glob.timer = 0

function _Text(string,col){
  this.string = string
  this.graph = createGraphics(textWidth(string),274*glob.textSize/200)
  this.graph.textFont(glob.font)
  this.graph.textSize(glob.textSize)
  this.graph.fill(col)
  this.graph.stroke(col)
  this.get = function (){
    this.graph.clear()
    this.graph.text(this.string,0,0,textWidth(' ')*(this.string.length+1),274*glob.textSize/200)
    return this.graph
  }
}

function _Slider(nam,posx,posy,mi,ma,step,anch,w,h,val){
  this.nam = nam
  this.posx = posx
  this.posy = posy
  this.min = mi
  this.max = ma
  this.anch = anch
  this.w = w
  this.h = h
  this.step = step
  this.r = (ma-mi)/w
  this.val = val
  this.place = (val - mi)/this.r
  this.update = new Function( 'glob.'+this.nam+'= this.val')
  this.check = function (){
    if(mouseX>this.posx&&mouseX<this.posx+this.w&&mouseY>this.posy&&mouseY<this.posy+this.h&&mouseIsPressed){
      this.place = int((mouseX-this.posx)/this.step+0.5)*this.step
      this.val = this.place*this.r+this.min
    }
  }
  this.draw = function (){
      this.check()
      push()
      translate(this.posx,this.posy)
      line(0,this.h/2,this.w,this.h/2)
      line(0,0,0,this.h)
      line(this.w,0,this.w,this.h)
      rect(this.place-this.anch,0,this.anch*2,this.h)
      pop()
      this.update()
  }

}
function _Ball(px,py,vx,vy,rest,rad,col){
  this.nx = 0
  this.ny = 0
  this.px = px
  this.py = py
  this.vx = vx
  this.vy = vy
  this.rest = rest
  this.rad = rad
  this.col = color(col,255,255)
  this.time = 0
  this.update = function(){
    this.time += glob.timer
    this.nx = this.px + this.vx*this.time
    this.ny = this.py + this.vy*this.time + glob.grav/2*this.time*this.time/glob.meter
/*    if(this.nx>=glob.sim.width/glob.meter-this.rad*glob.meter&&this.vx>0){
      this.px=glob.sim.width/glob.meter-this.rad*glob.meter
      this.py=this.ny
      this.vx=glob.sim.width/glob.meter-this.rad*glob.meter-this.nx
      this.vx*=this.rest
      this.vy+=glob.meter*glob.grav/2*this.time1*this.time1
      this.time1=0
    }
    if(this.nx<=this.rad*glob.meter&&this.vx<0){
      this.px=this.rad*glob.meter
      this.py=this.ny
      this.vx=this.rad*glob.meter-this.nx
      this.vx*=this.rest
      this.vy+=glob.meter*glob.grav/2*this.time1*this.time1
      this.time1=0
    }
    if(this.ny>=glob.sim.height/glob.meter-this.rad*glob.meter&&this.vy>0){
      this.px=this.nx
      this.py=glob.sim.height/glob.meter-this.rad*glob.meter
      this.vy=glob.sim.height/glob.meter-this.rad*glob.meter-this.ny
      this.vy*=this.rest
      this.time1=0
    }
    if(this.ny<=this.rad&&this.vy>0){
      this.px=this.nx
      this.py=this.rad
      this.vy=this.rad-ny
      this.vy*=this.rest
      this.time1=0
    }*/
  }
  this.draw = function(){
    push()
    fill(this.col)
    noStroke()
    translate(glob.sim.width/2,glob.sim.height/2)
    ellipse(this.nx,this.ny,this.rad*glob.meter,this.rad*glob.meter)
    pop()
  }
}

function _Path(beg,fin,vel,col){
  this.beg = beg
  this.fin = fin
  this.vel = vel
  this.col = col

}

function setup(){
  first()
  createCanvas(windowWidth,windowHeight)
  textFont(glob.font)
  textSize(glob.textSize)
  colorMode(HSB)
  align()
  // BAR
  glob.gravText = new _Text('Gravity:',255)
  glob.meterText = new _Text('Scale:',255)
  glob.timeText = new _Text('Speed:',255)
  
  // SIM
  glob.balls = []
}

function align(){
  var rat_bar = glob.canvasRatio;
  var rat_sim = 100-glob.canvasRatio;
  glob.bar.width = width
  glob.bar.height = rat_bar*height/100
  glob.sim.width = width
  glob.sim.height = rat_sim*height/100
  glob.gravSlider = new _Slider('grav',7*glob.bar.width/10,2*glob.bar.height/8,0.5,19.5,38*35/glob.bar.width,glob.bar.width/280,glob.bar.width/4,glob.bar.height/5,glob.grav)
  glob.gravtemp = new _Text('19.5',255)
  glob.meterSlider = new _Slider('meter',6*glob.bar.width/8-glob.bar.width/3,2*glob.bar.height/8,0.5,19.5,38*35/glob.bar.width,glob.bar.width/280,glob.bar.width/4,glob.bar.height/5,glob.meter)
  glob.metertemp = new _Text('10.0',255)
  glob.timeSlider = new _Slider('timeScale',7*glob.bar.width/10,2*glob.bar.height/8+glob.bar.height/5+2*glob.bar.height/8,0,3,3*35/glob.bar.width,glob.bar.width/280,glob.bar.width/4,glob.bar.height/5,glob.timeScale)
  glob.timetemp = new _Text('10.0',255)
}

function draw(){
  // SIM
  push()
  stroke(255)
  background(glob.simBG)
  if(glob.press){
    ellipse(glob.Spx,glob.Spy,glob.meter)
    line(glob.Spx,glob.Spy,mouseX,mouseY)
    var tempVector = createVector(mouseX-glob.Spx,mouseY-glob.Spy).setMag(-glob.meter)
    tempVector.rotate(QUARTER_PI)
    line(mouseX,mouseY,mouseX+tempVector.x,mouseY+tempVector.y)
    var tempVector2 = tempVector.rotate(-HALF_PI)
    line(mouseX,mouseY,mouseX+tempVector.x,mouseY+tempVector.y)
  }
  else{
    for (var i=0;i<glob.balls.length;i++){
      glob.balls[i].update()
    }
  }
  for (var i=0;i<glob.balls.length;i++){
      glob.balls[i].draw()
    }
  pop()
  // BAR
  push()
  fill(glob.barBG)
  rect(0,0,glob.bar.width,glob.bar.height)
  fill(200)
  stroke(0)
  glob.gravSlider.draw()
  image(glob.gravText.get(),28*glob.bar.width/40,glob.bar.height/12,2*glob.bar.width/10,glob.bar.height/5)
  glob.gravtemp.string = str(int(10*glob.grav)/10)
  image(glob.gravtemp.get(),28*glob.bar.width/40+2*glob.bar.width/10,glob.bar.height/12,2*glob.bar.width/40,glob.bar.height/5)
  glob.meterSlider.draw()
  image(glob.meterText.get(),30*glob.bar.width/40-glob.bar.width/3,glob.bar.height/12,2*glob.bar.width/10,glob.bar.height/5)
  glob.metertemp.string = str(int(10*glob.meter)/10)
  image(glob.metertemp.get(),30*glob.bar.width/40-glob.bar.width/3+2*glob.bar.width/10,glob.bar.height/12,2*glob.bar.width/40,glob.bar.height/5)
  glob.timeSlider.draw()
  glob.timeScale=exp(glob.timeScale-1.5)
  image(glob.timeText.get(),28*glob.bar.width/40,glob.bar.height/12+glob.bar.height/5+2*glob.bar.height/8,2*glob.bar.width/10,glob.bar.height/5)
  glob.timetemp.string = str(int(10*glob.timeScale)/10)
  image(glob.timetemp.get(),28*glob.bar.width/40+2*glob.bar.width/10,glob.bar.height/12+glob.bar.height/5+2*glob.bar.height/8,2*glob.bar.width/40,glob.bar.height/5)
  pop()
  glob.timer = millis()*glob.timeScale/1000 - glob.timer
}

windowResized = function () {
  resizeCanvas(windowWidth, windowHeight)
  align()
}

mousePressed = function (){
  if(mouseY>glob.bar.height&&!glob.press){
    glob.press=1
    glob.Spx=mouseX
    glob.Spy=mouseY
  }
}

mouseReleased = function(){
  if(glob.press){
    glob.press = 0
    if(createVector(glob.Spx-mouseX,glob.Spy-mouseY).mag()>=glob.meter){
      glob.balls.push(new _Ball(glob.Spx-glob.sim.width/2,glob.Spy-glob.sim.height/2,(mouseX-glob.Spx)/glob.meter,(mouseY-glob.Spy)/glob.meter,1,random(1,5),random(0,255)))
    }
    glob.Spx,glob.Spy = 0,0
  }
}