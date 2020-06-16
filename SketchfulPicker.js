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
- Reload until there's a box that displays "FFFFFF"
(if it displays `ffffff` it's broken)
- Join a game (you can skip the previous two steps if you are confident it will work anyway)

If having trouble getting it to load correctly, try changing the `0` at the bottom of the script to something else like `300`
*/

    //To add a custom palette page, copy the array of hex codes and replace with your own codes

let palettes = [
    [
        "#3a3a3c", "#8e8e93", "#f8f9fa", "#ffadad", "#ffd6a5", "#fdffb6", "#caffbf", "#9bf6ff", "#a0c4ff", "#bdb2ff", "#ffc6ff", "#fdad88", "#9e5425",
        "#2c2c2e", "#636366", "#e0e0e0", "#ff7070", "#f3a220", "#f9e079", "#049d6f", "#92ddea", "#6dafe0", "#ab87ff", "#ff87ab", "#e38a5e", "#5e320d",
        "#1c1c1e", "#48484a", "#c2c2c2", "#f50000", "#dc8700", "#f0c808", "#00766a", "#219bc3", "#548bbc", "#715aff", "#ff5d8f", "#d1754e", "#421e06"
    ],
/*
    [
        "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000",
        "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000", "#000000"
    ],
*/
];

setTimeout(function() {
    'use strict';

    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
        if (!/^rgb/i.test(rgb)) return "currentcolor";

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    function invert(rgb) {
        if (!/^rgb/i.test(rgb)) return "currentcolor";

        rgb = Array.prototype.join.call(arguments).match(/(-?[0-9\.]+)/g);
        for (let i = 0; i < rgb.length; i++) {
            rgb[i] = (i === 3 ? 1 : 255) - rgb[i];
        }
        return "rgb("+rgb+")";
    }

    palettes.unshift([]);
    let nodes = document.getElementsByClassName("gameToolsColor");
    for (let j = 0; j < nodes.length; j++) {
        let x = nodes[j];
        palettes[0].push(x.style.background);
        x.addEventListener("click", function() { clickedSwatch(j); }, false);
    }

    document.getElementById("gameToolsColorPreview").setAttribute('style',"position: relative; top:-32px");
    //setInterval( function() { document.getElementById("gameChat").setAttribute('style',"height: calc(100% - 210px);"); }, 1500);

    let anchor = document.getElementById("gameToolsColors");

    let nodePicker = document.createElement ('input');
    nodePicker.setAttribute ('id', 'picker');
    nodePicker.setAttribute ('class', `jscolor {onFineChange:"document.getElementById('picker').oninput()"}`);
    nodePicker.setAttribute ('value',"ffffff");
    nodePicker.oninput = function() {
        swapColor(0);
    }
    nodePicker.setAttribute ('style',"position: relative; text-align: center; left: 1%; width:30%; top:-30%; height:30%; border:0px solid currentcolor");
    anchor.appendChild(nodePicker);

    let nodeSave = document.createElement ('span');
    nodeSave.setAttribute ('id', 'cstore');
    nodeSave.setAttribute ('role', 'button');
    nodeSave.setAttribute ('class', "btn btn-warning btn-sm");
    nodeSave.innerHTML = "<div style = \"font-size: 125%; position: relative; left:0%; top:-30%\">=</div>";
    nodeSave.setAttribute ('style',"position: relative; width:15%; left:5%; top:-58.5%; height:1%");
    anchor.appendChild(nodeSave);

    let nodeNew = document.createElement ('span');
    nodeNew.setAttribute ('id', 'capage');
    nodeNew.setAttribute ('role', 'button');
    nodeNew.setAttribute ('class', "btn btn-success btn-sm");
    nodeNew.innerHTML = "<div style = \"font-size: 125%; position: relative; left:0%; top:-30%\">+</div>";
    nodeNew.setAttribute ('style',"position: relative; width:15%; left:5%; top:-58.5%; height:1%");
    anchor.appendChild(nodeNew);

    let nodePrev = document.createElement ('span');
    nodePrev.setAttribute ('id', 'cppage');
    nodePrev.setAttribute ('role', 'button');
    nodePrev.setAttribute ('class', "btn btn-danger btn-sm");
    nodePrev.innerHTML = "<div style = \"font-size: 125%; position: relative; left:0%; top:-30%\">\<</div>";
    nodePrev.setAttribute ('style',"position: relative; width:15%; left:10%; top:-58.5%; height:1%");
    anchor.appendChild(nodePrev);

    let nodeNext = document.createElement('span');
    nodeNext.setAttribute ('id', 'cnpage');
    nodeNext.setAttribute ('role', 'button');
    nodeNext.setAttribute ('class', "btn btn-primary btn-sm");
    nodeNext.innerHTML = "<div style = \"font-size: 125%; position: relative; left:0%; top:-30%\"\>></div>";
    nodeNext.setAttribute ('style',"position: relative; width:15%; left:10%; top:-58.5%; height:1%");
    anchor.appendChild(nodeNext);

    nodePicker.addEventListener("click", swapColor, false);
    nodeSave.addEventListener("click", makeColor, false);
    nodeNew.addEventListener("click", makePage, false);
    nodePrev.addEventListener("click", prevPage, false);
    nodeNext.addEventListener("click", nextPage, false);

    let i = 0;
    let j = 0;
    let pj = 0;
    nodes[pj].setAttribute("style","background:"+palettes[i][pj]+"; border-color:"+invert(palettes[i][pj]));


    function clickedSwatch(k){
        console.log("page "+i+" node "+k+":"+rgb2hex(nodes[k].style.background));
        nodes[pj].setAttribute("style","background:"+palettes[i][pj]);
        pj = k;
        nodes[pj].setAttribute("style","background:"+palettes[i][pj]+"; border-color:"+invert(palettes[i][pj]));
    }

    function swapColor(zEvent){
        let pcol = nodes[0].style.background;
        let col = rgb2hex(nodePicker.style.backgroundColor)
        nodes[0].style.background=col;
        nodes[0].dispatchEvent(new Event("pointerdown"));
        nodes[0].style.background=pcol;
    }

    function makeColor(zEvent){
        let col = rgb2hex(nodePicker.style.backgroundColor)
        palettes[i][pj] = col;
        nodes[pj].style.background=col;
    }

    function makePage(zEvent){
        palettes.push([]);
        for (let j = 0; j < nodes.length; j++) {
            palettes[palettes.length-1].push("radial-gradient(#000,#FFF)");
        }
    }

    function prevPage(zEvent){
        i = (i-1+palettes.length)%palettes.length;
        for (j = 0; j < nodes.length; j++) {
            nodes[j].style.background = palettes[i][j];
        }
        nodes[pj].setAttribute("style","background:"+palettes[i][pj]+"; border-color:"+invert(palettes[i][pj]));
    }

    function nextPage(zEvent){
        i = (i+1)%palettes.length;
        for (j = 0; j < nodes.length; j++) {
            nodes[j].style.background = palettes[i][j];
        }
        nodes[pj].setAttribute("style","background:"+palettes[i][pj]+"; border-color:"+invert(palettes[i][pj]));
    }

}, 0);
