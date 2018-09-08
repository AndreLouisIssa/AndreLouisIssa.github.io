the instructions for the beta are a bit different

use the number keys to change the mouse modes

1 -> parameter, 2 -> colour, 3 -> point iteration, 4-> cluster iteration, 5-> probability settings

Don't mess with 5 very much or you might break the image fidelity and turn into a sad noise.

E has a third mode, move points close to the origin/center to see any noticable shapes,
 use limited numbers of points and few layers, optimum is 1 layer, 3 points, about 1/5th page distance from the origin

PROBABILITY NOTES:

random points are introduced into the cycles based on the probability mode, 
by default it is very close to never happening but it does interfere with the quality of the image for modes that aren't the third.
This generation of new points is however necessary for the third image mode to generate any notable image at all.

So, if you want to remove the random point generation, go to mouse mode 5, and click at the center of the screen vertically, as far right horizontally as you can.
To enable a very slight random point generation, do as above but move it slightly left until some random points start popping in.
