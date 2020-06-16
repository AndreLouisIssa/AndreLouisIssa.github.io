// ==UserScript==
// @name         Sketchful Colour Picker
// @namespace    http://tampermonkey.net/
// @match        *://sketchful.io
// @require      https://raw.githubusercontent.com/EastDesire/jscolor/master/jscolor.js
// ==/UserScript==

/*
How to use:
- Use chrome or firefox
- Install Tampermonkey
- Install the script
- Load sketchful.io
- Go into free draw
- Reload until there's a box at the top that displays `FFFFFF
(if it displays `ffffff` it's broken)
- Join a game (you can skip the previous two steps if you are confident it will work anyway)

If having trouble getting it to load correctly, try changing the `0` at the bottom of the script to something else like `300`
*/

setTimeout(function() {
    'use strict';

    const COLMAX = 39;
    const PCOLDEFAULT = "radial-gradient(#000,#FFF)";

    let palettes = [
        [
            "#3a3a3c", "#8e8e93", "#f8f9fa", "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fdad88", "#9e5425",
            "#2c2c2e", "#636366", "#e0e0e0", "#ff7070", "#f3a220", "#f9e079", "#049d6f", "#92ddea", "#6dafe0", "#ab87ff", "#ff87ab", "#e38a5e", "#5e320d",
            "#1c1c1e", "#48484a", "#c2c2c2", "#f50000", "#dc8700", "#f0c808", "#00766a", "#219bc3", "#548bbc", "#715aff", "#ff5d8f", "#d1754e", "#421e06"
        ]
    ];

    palettes.unshift([]);
    palettes.push([]);
    var j;
    for (j = 0; j < COLMAX; j++) {
        palettes[0].push(document.getElementsByClassName("gameToolsColor")[j].style.background);
        palettes[palettes.length-1].push(PCOLDEFAULT);
    }

    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function invert(rgb) {
        rgb = Array.prototype.join.call(arguments).match(/(-?[0-9\.]+)/g);
        for (var i = 0; i < rgb.length; i++) {
            rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
        }
        return "rgb("+rgb+")";
    }

    document.getElementById("gameToolsColorPreview").setAttribute ('style',"position: relative; top:-25px");

    var zNode = document.createElement ('input');
    zNode.setAttribute ('id', 'picker');
    zNode.setAttribute ('class', "jscolor {mode:\"HVS\"}");
    zNode.setAttribute ('value',"ffffff")
    zNode.setAttribute ('style',"position: relative; text-align: center; width:30%; top:-29.5%; height:30%; border:1px solid black");
    document.getElementById("gameToolsColors").appendChild(zNode);

    zNode = document.createElement ('span');
    zNode.setAttribute ('id', 'cstore');
    zNode.setAttribute ('role', 'button');
    zNode.setAttribute ('class', "btn btn-success btn-sm");
    zNode.innerHTML = "<div style = \"font-size: 125%; position: relative; left:0%; top:-30%\">+</div>";
    zNode.setAttribute ('style',"position: relative; width:15%; left:5%; top:-58.5%; height:10%");
    document.getElementById("gameToolsColors").appendChild(zNode);

    zNode = document.createElement ('span');
    zNode.setAttribute ('id', 'cppage');
    zNode.setAttribute ('role', 'button');
    zNode.setAttribute ('class', "btn btn-danger btn-sm");
    zNode.innerHTML = "<div style = \"font-size: 125%; position: relative; left:-30%; top:-30%\">\<</div>";
    zNode.setAttribute ('style',"position: relative; width:10%; left:10%; top:-58.5%; height:10%");
    document.getElementById("gameToolsColors").appendChild(zNode);

    zNode = document.createElement ('span');
    zNode.setAttribute ('id', 'cnpage');
    zNode.setAttribute ('role', 'button');
    zNode.setAttribute ('class', "btn btn-primary btn-sm");
    zNode.innerHTML = "<div style = \"font-size: 125%; position: relative; left:-30%; top:-30%\"\>></div>";
    zNode.setAttribute ('style',"position: relative; width:10%; left:10%; top:-58.5%; height:105%");
    document.getElementById("gameToolsColors").appendChild(zNode);

    var gp = document.getElementById('picker')
    document.getElementById('cstore').addEventListener("click", makeColour, false);
    document.getElementById('cppage').addEventListener("click", prevPage, false);
    document.getElementById('cnpage').addEventListener("click", nextPage, false);

    var i = 0;
    j = 0;

    var pj = 0;
    function makeColour(zEvent){
        if (gp.style.backgroundColor) {
            var col = rgb2hex(gp.style.backgroundColor)
            palettes[palettes.length-1][pj] = col;
            if (i == palettes.length-1) {
                document.getElementsByClassName("gameToolsColor")[pj].setAttribute("style","background:"+col);
            }
            pj=(pj+1)%(palettes[palettes.length-1].length);
            if (i == palettes.length-1) {
                var pcol = document.getElementsByClassName("gameToolsColor")[pj].style.background;
                document.getElementsByClassName("gameToolsColor")[pj].setAttribute("style","background:"+pcol+"; border-color:"+invert(pcol));
            }
        }
    }

    function prevPage(zEvent){
        i = (i-1+palettes.length)%palettes.length;
        for (j = 0; j < COLMAX; j++) {
            document.getElementsByClassName("gameToolsColor")[j].style.background = palettes[i][j];
        }
        var pcol = document.getElementsByClassName("gameToolsColor")[pj].style.background;
        if (i == palettes.length-1) {
            document.getElementsByClassName("gameToolsColor")[pj].setAttribute("style","background:"+pcol+"; border-color:"+invert(pcol));
        }
        else {
            document.getElementsByClassName("gameToolsColor")[pj].setAttribute("style","background:"+pcol);
        }
    }

    function nextPage(zEvent){
        i = (i+1)%palettes.length;
        for (j = 0; j < COLMAX; j++) {
            document.getElementsByClassName("gameToolsColor")[j].style.background = palettes[i][j];
        }
        var pcol = document.getElementsByClassName("gameToolsColor")[pj].style.background;
        if (i == palettes.length-1) {
            document.getElementsByClassName("gameToolsColor")[pj].setAttribute("style","background:"+pcol+"; border-color:"+invert(pcol));
        }
        else {
            document.getElementsByClassName("gameToolsColor")[pj].setAttribute("style","background:"+pcol);
        }
    }

}, 0);
