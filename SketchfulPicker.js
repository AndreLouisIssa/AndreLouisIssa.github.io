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

    let palettes = [
        [
            "#3a3a3c", "#8e8e93", "#f8f9fa", "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fdad88", "#9e5425",
            "#2c2c2e", "#636366", "#e0e0e0", "#ff7070", "#f3a220", "#f9e079", "#049d6f", "#92ddea", "#6dafe0", "#ab87ff", "#ff87ab", "#e38a5e", "#5e320d",
            "#1c1c1e", "#48484a", "#c2c2c2", "#f50000", "#dc8700", "#f0c808", "#00766a", "#219bc3", "#548bbc", "#715aff", "#ff5d8f", "#d1754e", "#421e06"
        ]
    ];

    palettes.unshift([]);
    palettes.push([]);
    var pj;
    for (pj = 0; pj < COLMAX; pj++) {
        palettes[0].push(document.getElementsByClassName("gameToolsColor")[pj].style.background);
        palettes[palettes.length-1].push("linear-gradient(#000,#FFF)");
    }

    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    document.getElementById("gameToolsColorPreview").setAttribute ('style',"position: relative; top:-25px");

    var zNode = document.createElement ('input');
    zNode.setAttribute ('id', 'picker');
    zNode.setAttribute ('class', "jscolor {mode:\"HVS\"}");
    zNode.setAttribute ('value',"ffffff")
    zNode.setAttribute ('style',"position: relative; text-align: center; width:50%; top:-29.5%; height:30%; border:1px solid black");
    document.getElementById("gameToolsColors").appendChild(zNode);

    zNode = document.createElement ('span');
    zNode.setAttribute ('id', 'cstore');
    zNode.setAttribute ('role', 'button');
    zNode.setAttribute ('class', "btn btn-success");
    zNode.innerHTML = "<div style = \"font-size: 85%; position: relative; left:-30%; top:-30%\">Save</div>";
    zNode.setAttribute ('style',"position: relative; width:17.5%; left:5%; top:-58.5%; height:12.5%");
    document.getElementById("gameToolsColors").appendChild(zNode);

    zNode = document.createElement ('span');
    zNode.setAttribute ('id', 'cpage');
    zNode.setAttribute ('role', 'button');
    zNode.setAttribute ('class', "btn btn-success");
    zNode.innerHTML = "<div style = \"font-size: 85%; position: relative; left:-30%; top:-30%\">Next</div>";
    zNode.setAttribute ('style',"position: relative; width:17.5%; left:10%; top:-58.5%; height:12.5%");
    document.getElementById("gameToolsColors").appendChild(zNode);

    var gp = document.getElementById('picker')
    document.getElementById('cstore').addEventListener("click", makeColour, false);
    document.getElementById('cpage').addEventListener("click", nextPage, false);

    var i = 0;
    var j = 0;
    function makeColour(zEvent){
        if (gp.style.backgroundColor) {
            var col = rgb2hex(gp.style.backgroundColor)
            palettes[palettes.length-1][j] = col;
            if (i == palettes.length-1) {
                document.getElementsByClassName("gameToolsColor")[j].style.background = col;
            }
            j=(j+1)%(palettes[palettes.length-1].length);
        }
    }

    function nextPage(zEvent){
        i = (i+1)%palettes.length;
        for (pj = 0; pj < COLMAX; pj++) {
            document.getElementsByClassName("gameToolsColor")[pj].style.background = palettes[i][pj];
        }
    }
}, 0);
