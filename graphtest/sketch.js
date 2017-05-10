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
 
  var tg1
  var tg2
  var bt1
  var bt2
  var bt3

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
    }
    else{
      glob.wtext = 0
    }
    if(bt2){
      if(glob.text==glob.text.replace('.','')){
        glob.text=glob.text.toLowerCase();
        glob.comp.push(new Function( 'return (' + glob.text + ')' ));
        glob.text = ''
      }
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
      switch(setting.keyCode){
        case 16:
        glob.ncap = 1
        break
        case 82:
        glob.text+='r'
        break
        case 88:
        glob.text+='x'
        break
        case 89:
        glob.text+='y'
        break
        case 86:
        glob.text+='v'
        break
        case 87:
        glob.text+='w'
        break
        case 85:
        glob.text+='u'
        break
        case 90:
        glob.text+='z'
        break
        case 187:
        glob.text+='+'
        break
        case 188:
        glob.text+='<'
        break
        case 189:
        glob.text+='-'
        break
        case 190:
        glob.text+='>'
        break
        case 13:
        glob.text+='='
        break
        case 69:
        glob.text+='e'
        break
        case 32:
        glob.text+=' '
        break
        case 80:
        glob.text+='p'
        break
        case 84:
        glob.text+='t'
        break
        case 191:
        glob.text+='/'
        break
		case 220:
		glob.text+='|'
		break
        case 8:
        glob.text = glob.text.slice(0, -1)
        break
        default:
        if(setting.keyCode>=48&&setting.keyCode<=57){
          if(glob.ncap){
            glob.ncap = 0
            switch (setting.keyCode){
              case 56:
              glob.text+='*'
              break
              case 57:
              glob.text+='('
              break
              case 48:
              glob.text+=')'
              break
			  case 51:
			  glob.text+='int('
			  break
			  case 188:
			  glob.text+=','
			  break
			  case 53:
			  glob.text+='%'
			  break
              case 54:
			  glob.text+='pow('
              break
			  case 49:
			  glob.text+='!'
			  break
			  case 50:
			  glob.text+='abs('
			  break
              case 52:
			  glob.text+='fact('
              break
              default:
            }
          }
          else{
            glob.text+=char(setting.keyCode)
          }
        }
      }
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