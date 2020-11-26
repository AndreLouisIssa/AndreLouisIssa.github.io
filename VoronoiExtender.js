// ==UserScript==
// @name         Interactive Voronoi Generator Extender
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Extends the Voronoi Generator to more metrics with decent interactivity
// @author       Andre Issa
// @match        http://alexbeutel.com/webgl/voronoi.html
// @grant        none
// ==/UserScript==

(function() {
    document.getElementById("settings").innerHTML += `
<span class="inputLabel">Level Curve (a,s) -> (X,Y)</span>
<input type="text" style="width: 90%; margin: auto;" id="user-math-2" value="Math.pow(Math.pow(Math.cos(a),2),1/2)*Math.sign(Math.cos(a))" onfocus="typing()" onblur="doneTyping2()" onchange="reset()">
<input type="text" style="width: 90%; margin: auto;" id="user-math-3" value="Math.pow(Math.pow(Math.sin(a),2),1/2)*Math.sign(Math.sin(a))" onfocus="typing()" onblur="doneTyping3()" onchange="reset()">
<span class="inputLabel">Cone Rotation</span>
<input type="range" style="width: 90%; margin: auto;" id="cone-rotation" value="0" min="0" ,="" max="360" oninput="resetForConeRot()">
<a id="save-button" download=''>
	<button onclick="downloadCanvasImage()">Save Image</button>
</a>
`;

window.coneRot = 0;
window.genCone = function() {
    window.coneVertexPositionBuffer = window.gl.createBuffer();
    window.gl.bindBuffer(window.gl.ARRAY_BUFFER, window.coneVertexPositionBuffer);

    var degInc = 360.0/window.fragments;
    var height = window.coneRadius / Math.tan(45 * Math.PI / 180.0);

    var vertices = [];

    var curDeg = 0;
    for(var i = 0; i < window.fragments; i++) {

        vertices = vertices.concat([0,0,0]);

        for(var j = 0; j < 2; j++){
            var t = (curDeg + j*degInc) * Math.PI / 180.0
            var x1 = window.coneRadius * window.paraX(t);
            var y1 = window.coneRadius * window.paraY(t);
            var rot = window.coneRot * Math.PI / 180.0;
            var cr = Math.cos(rot);
            var sr = Math.sin(rot);
            vertices = vertices.concat([x1*cr+y1*sr,-y1*cr+x1*sr,-1.0 * height]);
        }
        curDeg += degInc;
    }
    window.gl.bufferData(window.gl.ARRAY_BUFFER, new Float32Array(vertices), window.gl.STATIC_DRAW);

    window.coneVertexPositionBuffer.itemSize = 3;
    window.coneVertexPositionBuffer.numItems = window.fragments * 3;
}
window.getUserVFunc2 = function(rand) {
    return function(a) {
        var s = a / Math.PI / 2.0
        return eval(window.$('user-math-2').value);
    }
}
window.doneTyping2 = function() {
    window.paraX = window.getUserVFunc2([Math.random(), Math.random(), Math.random(), Math.random()]);
    window.isTyping = false;
}
window.getUserVFunc3 = function(rand) {
    return function(a) {
        var s = a / Math.PI / 2.0
        return eval(window.$('user-math-3').value);
    }
}
window.doneTyping3 = function() {
    window.paraY = window.getUserVFunc3([Math.random(), Math.random(), Math.random(), Math.random()]);
    window.isTyping = false;
}
window.resetForConeRot = function(){
    window.coneRot = document.getElementById("cone-rotation").value;
    window.reset();
}

window.paraX = window.getUserVFunc2([Math.random(), Math.random(), Math.random(), Math.random()]);
window.paraY = window.getUserVFunc3([Math.random(), Math.random(), Math.random(), Math.random()]);

window.downloadCanvasImage = function() {
    window.reset();
    const a = document.createElement('a');
    a.download = 'Voronoi.png';
    a.href = window.$('main-canvas').toDataURL();
    a.click();
    a.parentNode.removeChild(a);
}

})();
