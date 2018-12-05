## BETA CONTROL CHANGES

use the number keys to change the mouse modes

1 -> parameter, 2 -> colour, 3 -> point iteration, 4-> cluster iteration, 5-> probability settings

Don't mess with 5 very much or you might break the image fidelity and turn into a sad noise.

E has a third mode, move points close to the origin/center to see any noticable shapes,
 use limited numbers of points and few layers, optimum is 1 layer, 3 points, about 1/5th page distance from the origin

Press shift to toggle changing the functionality of N and M to toggling exclusion fix (by default on),
to generate images possible in the legacy version that weren't accurate to the idea behind the exclusion modes initially.

PROBABILITY NOTES:

random points are introduced into the cycles based on the probability mode, 
This generation of new points is necessary for the third image mode to generate any notable image at all
so you will need to interact with the 5th mouse mode if you intend to use the third iteration mode.

## Controls

* `space`: Toggle RENDER/EDIT modes     
--EDIT--   
* `L alt` **`HOLD`** + `L mouse`: Add node 
* `L mouse` **`HOLD`**: Delete node  
* `up arrow`: New layer
* `down arrow`: Delete top layer   
* `right arrow`: Next layer 
* `left arrow`: Previous layer   
--RENDER--   
* `Z`: Toggle render (freeze)
* `R`: Clear render
* `W`: Cycle mouse input
* `E`: Cycle iteration mode
* `B`: Cycle colour mode (clears window also) 
* `N`: Cycle node exclusion
* `M`: Cycle layer exclusion
* `H`: Jumble node order
* `K`: Jumble layer order
* `<`: Decrease colour cycle depth
* `>`: Increase colour cycle depth
* `enter`: Save Image (Right click the canvas and save manually if this doesn't work)

## Instructions
In edit mode (default state):    
   place nodes in different layers to inform the kind of image that will be generated in render mode.   
   Use the up and down arrow keys to increase or decrease the total number of layers.   
   Use the right and left arrow keys to select the current layer that the new node will be part of.   
   Alt + Left Click to place a node at the cursor, an already existing node at the cursor will be overridden.   
   Hold left click to remove any nodes at the cursor, it will not remove a node if it is the last of its layer.
   Layers that don't have any nodes are considered to have a node at the center of the screen.
Press spacebar to move to render mode.   

In render mode:   
You can save the image in render mode using the enter key.   
_NOTE: If your window resizes due to the downloads bar popping up it will clear the render mode but the image can still be saved._   
To clear the screen press R or go to edit mode and then back to render.   
Pressing Z toggles the rendering so that no changes occur, useful for pausing to inspect and for swapping modes for creative combinations.      
Pressing E will cycle the different algorithms for the chaos game, it will not clear the screen.   
* In the first mode, sets the complex parameter for the linear interpolation algorithm.
* In the second mode, sets the complex parameter for the constant distance algorithm.    
 
Pressing W will cycle the different mouse input settings.     
The mouse behaves differently according to the mouse input setting:   
* In the first mode clicking sets the complex parameter, drag the mouse around slowly to see accumulative effects.
* In the second mode clicking sets the location of the origin for colouring, drag the mouse around slowly to see accumulative effects.
* In the third mode clicking sets the location of the iterated point, can be used to see the attractor properties.
* In the fourth mode clicking will draw the plot towards the cursor, this is also useful to demonstrate the attractor.
                           
Pressing N and M cycle the exclusion algorithm for the nodes and layers, this does not clear the screen. Both default to 0.   
At the value of 1, no longer can the previously chosen item be chosen again.    
Beyond 1 it excludes the "nth" next item from being chosen.     
Use H and K to jumble the node and layer order to explore all the permutations of the exclusion effects.    

You can cycle through different modes of the colours shown by pressing B. This will clear the screen.   
The depth to which the colour algorithm refers to can be increased or decreased by using `>` and `<`.    
This will increase the time it takes the render to fill but it can allow for a clearer exploration of the self-similarities and symmetries in the fractal structures produced.

## Background Information
The chaos game involves choosing points in a probabilistic algorithm and iterating the movement by some other algorithm to the chosen point of a tracked point.   
This often produces mathematical attractors, shapes which are approached regardless of the starting value of the iteration given enough iterations.   
This program completes 500 iterations a frame.   
   At 50% probability each iteration there is a chance that a new layer is chosen at random, this could include the layer previously selected.
   Each iteration in the chosen layer a single node is chosen at random, it also can include the node that was previously selected.  
What layers and nodes can be selected in relevance to the previously selected layers and nodes can be changed.   
There are two algorithms for the iteration:
1. The iterated point moves on a linear interpolation to the chosen node with a complex parameter.     
The parameter, based on the screen position, is mapped from the whole plane into the unit disk.
1. The iterated point moves by a rotation of a constant complex vector towards the chosen node.
The image is coloured based on previous iterations to highlight the fractal elements of the image such as the self-similarities and symmetries.     
The parameter, based on the screen position, is mapped in the reals by an exponential and in the imaginary by a branched logarithm.
