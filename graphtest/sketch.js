// Hardcode
function first(){
  // Set stuff here
  glob.canvasRatio = 100/3; //Ratio between settings and graph canvas in percent
  glob.settingBG = 36;
  glob.graphBG = 0;
  glob.n = 5; // grid segments/ granularity
  glob.ortho = 0;
  glob.acc = 1;
  glob.comp = [//Write conditions here, using x,y,z,r,t,p,u
    function (){
      return 1
    },
    function (){
      return 1
    }]
}

// Softcode

var x,y,z,r,t,p,u;

var glob = {}

function setup(){
    first()
    var rat_setting = parseFloat(glob.canvasRatio)+"%";
    var rat_graph = parseFloat(100-glob.canvasRatio)+"%";
    var setting = document.getElementById('setting');
    var graph = document.getElementById('graph');
    setting.style.width = rat_setting;
    setting.style.left = rat_graph;
    graph.style.width = rat_graph;
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

  setting.setup = function () {
    glob.getSetting();
    setting.createCanvas(glob.setting.width,glob.setting.height);
    tg1=setting.createGraphics(2000,600)
    tg1.textFont('Consolas');
    tg1.textSize(180);
    tg1.fill(255);
    tg1.text("Ortho:",tg1.width/16,tg1.height/4)
    setting
  };
 
  setting.draw = function () {
    setting.background(glob.settingBG);
    setting.image(tg1,setting.width/16,setting.height/4,7*setting.width/8,setting.height/12);
    setting.translate(6*setting.width/16,16*setting.height/64)
    setting.fill(250*(1+2*glob.ortho)/3)
    setting.rect(0,0,setting.width/16,setting.height/32)
  };

  setting.mouseClicked = function (){
    if(setting.mouseX>(6*setting.width/16)
    &&setting.mouseX<(7*setting.width/16)
    &&setting.mouseY>(16*setting.height/64)
    &&setting.mouseY<(18*setting.height/64)){
      glob.ortho = 1 - glob.ortho
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
        x = int(glob.acc*(i%hp-hp/2+0.5));
        y = int(glob.acc*(int(i%pow(hp,2)/hp)-hp/2+0.5));
        z = int(glob.acc*(int(i/pow(hp,2))-hp/2+0.5));
        t = atan2(y,x);
        p = atan2(z,sqrt(x*x+y*y));
        r = sqrt(z*z+y*y+x*x);
        for (var k = 0;k<glob.comp.length&&ch;k++){
          ch = glob.comp[k]();
        }
        if(ch){
          graph.push();
          graph.translate(i%hp*h,h*int(i%pow(hp,2)/hp),h*int(i/pow(hp,2)));
          graph.sphere(5);
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