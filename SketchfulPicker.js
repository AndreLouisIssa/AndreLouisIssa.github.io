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
		'#3a3a3c', '#8e8e93', '#f8f9fa', '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff', '#ffc6ff', '#fdad88', '#9e5425',
		'#2c2c2e', '#636366', '#e0e0e0', '#ff7070', '#f3a220', '#f9e079', '#049d6f', '#92ddea', '#6dafe0', '#ab87ff', '#ff87ab', '#e38a5e', '#5e320d',
		'#1c1c1e', '#48484a', '#c2c2c2', '#f54d4d', '#dc8700', '#f0c808', '#00766a', '#219bc3', '#548bbc', '#715aff', '#ff5d8f', '#d1754e', '#421e06',
	],
	[
		'#081c15', '#1b4332', '#2d6a4f', '#40916c', '#52b788', '#74c69d', '#95d5b2', '#b7e4c7', '#d8f3dc', '#000000', '#faf9f9', '#ffd6ba', '#fec89a',
		'#774936', '#8a5a44', '#9d6b53', '#b07d62', '#c38e70', '#cd9777', '#d69f7e', '#deab90', '#e6b8a2', '#edc4b3', '#ffb5a7', '#fcd5ce', '#f8edeb',
		'#cb997e', '#eddcd2', '#fff1e6', '#f0efeb', '#ddbea9', '#a5a58d', '#b7b7a4', '#6d6875', '#b5838d', '#e5989b', '#ffb4a2', '#ffcdb2', '#f9dcc4',
	],
	[
		'#10002b', '#240046', '#3c096c', '#5a189a', '#7b2cbf', '#9d4edd', '#c77dff', '#e0aaff', '#efcefa', '#d4b2d8', '#a88fac', '#826c7f', '#5d4e60',
		'#7c6f93', '#886f93', '#a967ad', '#ad6789', '#db81ad', '#ff6c91', '#ff736c', '#ff9e46', '#faa275', '#ff8c61', '#ce6a85', '#985277', '#5c374c',
		'#721b65', '#b80d57', '#f8615a', '#ffd868', '#bb596b', '#f96d80', '#ff9a76', '#ffc4a3', '#00e0ff', '#74f9ff', '#a6fff2', '#e8ffe8', '#ffffff',
	],
	[
		'#007f5f', '#2b9348', '#55a630', '#80b918', '#aacc00', '#bfd200', '#d4d700', '#dddf00', '#eeef20', '#ffff3f', '#03045e', '#0077b6', '#00b4d8',
		'#ff4800', '#ff5400', '#ff6000', '#ff6d00', '#ff7900', '#ff8500', '#ff9100', '#ff9e00', '#ffaa00', '#ffb600', '#90e0ef', '#caf0f8', '#000000',
		'#143642', '#263c41', '#38413f', '#4a473e', '#5c4d3c', '#6f523b', '#815839', '#935e38', '#a56336', '#b76935', '#000000', '#ffffff', '#ffffff',
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

    //Code courtesy of Bell
    const gameTools = document.querySelector('#gameTools');
    const chatBox = document.querySelector('#gameChat');

    function addObservers() {
        const heightObserver = new MutationObserver(adjustChatSize);
        const config = {
            attributes: true,
        };
        heightObserver.observe(gameTools, config);
        heightObserver.observe(chatBox, config);
    }

    function adjustChatSize() {
        chatBox.style.height = isDrawing() ? 'calc(100% - 210px)' : 'calc(100% - 180px)';
    }

    function isDrawing() {
        return document.querySelector('#gameTools').style.display !== 'none';
    }

    addObservers()
    //

    palettes.unshift([]);
    let nodes = document.getElementsByClassName("gameToolsColor");
    for (let j = 0; j < nodes.length; j++) {
        let x = nodes[j];
        palettes[0].push(x.style.background);
        x.addEventListener("click", function() { clickedSwatch(j); }, false);
    }

    let anchor = document.getElementById("gameToolsColors");
    document.getElementById("gameToolsColorPreview").setAttribute('style',"position: relative; top:-32px");

    let nodePicker = document.createElement ('input');
    nodePicker.setAttribute ('id', 'picker');
    nodePicker.setAttribute ('data-jscolor', '{hash:false, previewElement:null}');
    nodePicker.setAttribute ('value',"ffffff");
    nodePicker.oninput = function() {
        // Code courtesy of EastDesire
        this.style.backgroundColor = this.jscolor.toHEXString();
        this.style.color = this.jscolor.isLight() ? 'black' : 'white';
        //
        scol = this.style.backgroundColor
        swapColor();
    }
    nodePicker.setAttribute ('style',"position: relative; text-align: center; left: 1%; width:30%; border:0px solid currentcolor");
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
    let pj = 26;
    let scol = palettes[i][pj];
    nodes[pj].setAttribute("style","background:"+palettes[i][pj]+"; border-color:"+invert(palettes[i][pj]));


    function clickedSwatch(k){
        let col = rgb2hex(nodes[k].style.background);
        console.log("page "+i+" node "+k+":"+col);
        nodes[pj].setAttribute("style","background:"+palettes[i][pj]);
        pj = k;
        nodes[pj].setAttribute("style","background:"+palettes[i][pj]+"; border-color:"+invert(palettes[i][pj]));
        if (col=="currentcolor"){
            swapColor();
        }
        else {
            scol = col;
        }
    }

    function swapColor(){
        let pcol = nodes[0].style.background;
        nodes[0].style.background=scol;
        nodes[0].dispatchEvent(new Event("pointerdown"));
        nodes[0].style.background=pcol;
    }

    function makeColor(zEvent){
        let col = nodePicker.jscolor.toHEXString();
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

    jscolor.install();
}, 0);
