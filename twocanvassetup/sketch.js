// Hardcode
function first(){
  // Set stuff here
  glob.canvasRatio = 25; //Ratio between settings and graph canvas in percent
  glob.settingBG = 36;
  glob.graphBG = 0;
}

// Softcode

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

function draw(){
}

glob.getSetting = function (){
  glob.setting=document.getElementById('setting');
  glob.setting.positionInfo=glob.setting.getBoundingClientRect()
  glob.setting.width = glob.setting.positionInfo.width
  glob.setting.height = glob.setting.positionInfo.height
}

glob.getGraph = function (){
  glob.graph=document.getElementById('graph');
  glob.graph.positionInfo=glob.graph.getBoundingClientRect()
  glob.graph.width = glob.graph.positionInfo.width
  glob.graph.height = glob.graph.positionInfo.height
}

new p5(function (setting) {
  "use strict";
 
  setting.setup = function () {
    glob.getSetting();
    setting.createCanvas(glob.setting.width,glob.setting.height);
  };
 
  setting.draw = function () {
    setting.background(glob.settingBG)
  };

  setting.windowResized = function () {
    glob.getSetting();
    setting.resizeCanvas(glob.setting.width, glob.setting.height);
  };
},
"setting");

new p5(function (graph) {
  "use strict";
 
  graph.setup = function () {
    glob.getGraph();
    graph.createCanvas(glob.graph.width, glob.graph.height);
  };
 
  graph.draw = function () {
    graph.background(glob.graphBG);
  };

  graph.windowResized = function () {
    glob.getGraph();
    graph.resizeCanvas(glob.graph.width, glob.graph.height);
  };
},
"graph");