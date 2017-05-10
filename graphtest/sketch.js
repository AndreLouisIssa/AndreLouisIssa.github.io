// Hardcode
function first(){
  // Set stuff here
  glob.canvasRatio = 100/3; //Ratio between settings and graph canvas in percent
  glob.settingBG = 36;
  glob.graphBG = 0;
  glob.n = 10; // grid segments/ granularity
  glob.ortho = 0;
  glob.acc = 1;
  glob.maxX = 10
  glob.maxY = 10
  glob.maxZ = 10
  glob.comp = [//Write conditions here, using x,y,z,r,t,p,u,v,w
    function (){
      return 1
    },
    function (){
      return 1
    }]
}

// Softcode


function fact(op) {
 // Lanczos Approximation of the Gamma Function
 // As described in Numerical Recipes in C (2nd ed. Cambridge University Press, 1992)
 var z = op + 1;
 var p = [1.000000000190015, 76.18009172947146, -86.50532032941677, 24.01409824083091, -1.231739572450155, 1.208650973866179E-3, -5.395239384953E-6];

 var d1 = Math.sqrt(2 * Math.PI) / z;
 var d2 = p[0];

 for (var i = 1; i <= 6; ++i)
  d2 += p[i] / (z + i);

 var d3 = Math.pow((z + 5.5), (z + 0.5));
 var d4 = Math.exp(-(z + 5.5));

 d = d1 * d2 * d3 * d4;

 return d;
}

var x,y,z,r,t,p,u,v,w,e;

var glob = {}


function setup(){
    first()
    e = exp(0)
    var rat_setting = parseFloat(glob.canvasRatio)+"%";
    var rat_graph = parseFloat(100-glob.canvasRatio)+"%";
    var setting = document.getElementById('setting');
    var graph = document.getElementById('graph');
    setting.style.width = rat_setting;
    setting.style.left = rat_graph;
    graph.style.width = rat_graph;
    glob.text = ''
    glob.wtext = 0
}

glob.getSetting = function (){
  glob.setting=document.getElementById('setting');
  glob.setting.positionInfo=glob.setting.getBoundingClientRect();
  glob.setting.width = glob.setting.positionInfo.width;
  glob.setting.height = glob.setting.positionInfo.height;
}

glob.getGraph = function (){
  glob.graph=document.getElementById('graph');
  glob.graph.positionInfo=glob.graph.getBoundingClientRect();
  glob.graph.width = glob.graph.positionInfo.width;
  glob.graph.height = glob.graph.positionInfo.height;
}

new p5(function (setting) {
  "use strict";
 
  function _Input (_keyCode,_nonShift,_shift) {
    this.keyCode = _keyCode
    this.nonShift = _nonShift
    this.shift = _shift
  }

  _Input.prototype.pool = function (sh){
      return [this.nonShift,this.shift][sh]
    }

  function _Button () {

  }
  
  function _Slider () {

  }

  var tg1
  var tg2
  var bt1
  var bt2
  var bt3
  var inp = [
    new _Input(82,'r','r'),
    new _Input(88,'x','x'),
    new _Input(89,'y','y'),
    new _Input(86,'v','v'),
    new _Input(87,'w','w'),
    new _Input(85,'u','u'),
    new _Input(90,'z','z'),
    new _Input(84,'t','t'),
    new _Input(80,'p','p'),
    new _Input(69,'e','e'),
    new _Input(32,' ','\t'),
    new _Input(191,'/','/'),
    new _Input(188,',','<'),
    new _Input(190,'>','>'),
    new _Input(49,'1','!'),
    new _Input(50,'2','abs('),
    new _Input(51,'3','int('),
    new _Input(52,'4','fact('),
    new _Input(53,'5','%'),
    new _Input(54,'6','pow('),
    new _Input(55,'7','&'),
    new _Input(56,'8','*'),
    new _Input(57,'9','('),
    new _Input(48,'0',')'),
    new _Input(189,'-','-'),
    new _Input(187,'=','+'),
    new _Input(220,'|','|')
  ]
  function addEx(){
    glob.text=glob.text.toLowerCase();
    glob.comp.push(new Function( 'return (' + glob.text + ')' ));
    glob.text = ''
    glob.stxt = []
  }

  setting.setup = function () {
    glob.getSetting();
    setting.createCanvas(glob.setting.width,glob.setting.height);
    tg1=setting.createGraphics(2000,600)
    tg1.textFont('Consolas');
    tg1.textSize(180);
    tg1.fill(255);
    tg1.text("Ortho:",tg1.width/16,tg1.height/4)
    tg2=setting.createGraphics(2000,300)
    tg2.textFont('Consolas');
    tg2.textSize(180);
    tg2.fill(0);
    glob.stxt = [];
  };
 
  setting.draw = function () {
    setting.background(glob.settingBG);
    setting.push();
    setting.image(tg1,setting.width/16,setting.height/4,7*setting.width/8,setting.height/12);
    setting.fill(250*(1+2*glob.ortho)/3)
    setting.rect(6*setting.width/16,16*setting.height/64,setting.width/16,setting.height/32)
    setting.pop();
    setting.push();
    setting.translate(setting.width/16,setting.height/32)
    setting.push();
        bt1 = setting.mouseX>(setting.width/16)
        &&setting.mouseX<(setting.width/16+3*setting.width/4)
        &&setting.mouseY>(setting.height/32)
        &&setting.mouseY<(setting.height/32+setting.height/32)
    setting.fill(200+55*bt1);
    setting.pop();
    tg2.background(200+55*bt1);
    tg2.text(glob.text.slice((glob.text.length-19)*(glob.text.length>19),glob.text.length),tg2.width/32,10*tg2.height/16);
    setting.image(tg2,0,0,3*setting.width/4,setting.height/32)
        bt2 = setting.mouseX>(setting.width/16+3*setting.width/4+setting.width/64)
        &&setting.mouseX<(setting.width/16+3*setting.width/4+setting.width/64+setting.width/16)
        &&setting.mouseY>(setting.height/32)
        &&setting.mouseY<(setting.height/32+setting.height/32)
    setting.fill(0,200+55*bt2,0);
    setting.rect(3*setting.width/4+setting.width/64,0,setting.width/16,setting.height/32);
        bt3 = setting.mouseX>(setting.width/16+3*setting.width/4+6*setting.width/64)
        &&setting.mouseX<(setting.width/16+3*setting.width/4+6*setting.width/64+setting.width/16)
        &&setting.mouseY>(setting.height/32)
        &&setting.mouseY<(setting.height/32+setting.height/32)
    setting.fill(200+55*bt3,0,0);
    setting.rect(3*setting.width/4+6*setting.width/64,0,setting.width/16,setting.height/32);
    setting.pop();
  };

  setting.mouseClicked = function (){
    if(setting.mouseX>(6*setting.width/16)
    &&setting.mouseX<(7*setting.width/16)
    &&setting.mouseY>(16*setting.height/64)
    &&setting.mouseY<(18*setting.height/64)){
      glob.ortho = 1 - glob.ortho
    }
    if(bt1){
      glob.wtext = 1
      glob.ncap=0
    }
    else{
      glob.wtext = 0
    }
    if(bt2){
      addEx()
    }
    if(bt3){
      if(glob.comp.length){
        glob.comp.pop()
      }
    }
  }

  setting.keyPressed = function(){
    if(glob.wtext){
      console.log(setting.keyCode)
      glob.ntxt=''
      for (var i=0;i<inp.length;i++){
        var ip = inp[i]
        if (ip.keyCode==setting.keyCode){
          glob.ntxt=ip.pool(glob.ncap)
          glob.ncap=0
        }
      }
      if(setting.keyCode==16){
        glob.ncap = 1
      }
      if(setting.keyCode==8){
        if(glob.stxt.length>1){
            glob.stxt = glob.stxt.slice(0,-1)
          }
          else{
            glob.stxt = []
          }
      }
      if(setting.keyCode==13){
        addEx()
        }
      if(glob.ntxt!=''){
        glob.stxt.push(glob.ntxt)}
      glob.text = glob.stxt.join('')
    }
  }

  setting.windowResized = function () {
    glob.getSetting();
    setting.resizeCanvas(glob.setting.width, glob.setting.height);
  };
},
"setting");

new p5(function (graph) {
  "use strict";

  var rotX=0;
  var rotY=0;

  graph.setup = function () {
    glob.getGraph();
    graph.createCanvas(glob.graph.width, glob.graph.height,WEBGL);
	  graph.ambientLight(255)
  };
 
  graph.draw = function () {
    graph.background(glob.graphBG);
    var ch = 1;
    var hp = 1+2*glob.n;
    var tp = pow(hp,3);
    var h = min(graph.width,graph.height)/hp;
    var hs = h*(hp/2-0.5)
    if(glob.ortho){
      graph.ortho(-graph.width/2, graph.width/2, graph.height/2, -graph.height/2, 0, 1500)
    }
    else{
      var camZ = (h*hp) / tan(30 / 180 * PI)
      graph.perspective(60 / 180 * PI,1,camZ/10,camZ*10)
    }
    graph.rotateX(rotX);
    graph.rotateY((1-2*glob.ortho)*rotY);
    if(mouseIsPressed){
      if(graph.mouseX<=graph.width
      && graph.mouseX>=0
      && graph.mouseY>=0
      && graph.mouseY<=graph.height
      ){
        rotY+=PI*(graph.mouseX-graph.pmouseX)/graph.width;
        rotX+=PI*(graph.mouseY-graph.pmouseY)/graph.height;
    }}
    graph.scale(2/3)
    graph.translate(-hs,-hs,-hs)
    for (var i = 0; i < tp; i++){
        x = glob.maxX*2*(i%hp-hp/2+0.5)/hp;
        y = glob.maxY*2*(int(i%pow(hp,2)/hp)-hp/2+0.5)/hp;
        z = glob.maxZ*2*(int(i/pow(hp,2))-hp/2+0.5)/hp;
        t = 180/PI*atan2(y,x);
        p = 180/PI*atan2(z,sqrt(x*x+y*y));
        r = z*z+y*y+x*x;
        u = x/r
        v = y/r
        w = z/r
        r = sqrt(r)
        for (var k = 0;k<glob.comp.length&&ch;k++){
          ch = glob.comp[k]();
        }
        if(ch){
          graph.push();
          graph.translate(i%hp*h,h*int(i%pow(hp,2)/hp),h*int(i/pow(hp,2)));
          graph.box(h/12);
          graph.pop();
        }
        ch = 1
     };
  };

  graph.windowResized = function () {
    glob.getGraph();
    graph.resizeCanvas(glob.graph.width, glob.graph.height);
  };
},
"graph");