/*
** Hilbert-Curve
* Cristian Rojas Cardenas, August 2022
* Algorithm based on the tutorial of Daniel Shiffman.
* See the video here: 
* https://www.youtube.com/watch?v=dSK-MW-zuAc&ab_channel=TheCodingTrain
* The algorithm curves a line in a certain pattern that could be applied 
* repeatedly over every subsegment generating a fractal, the end figure 
* under infinite bending is known as the Hilbert Curve.
* The order parameter of the curve indicates the times that the curve has 
* been bent. The basic pattern is:
* 
* 		    |_|
* 
* The second order requires some extra steps:
* 		   _   _
* 		   _| |_
*         |  _  |
*         |_| |_|
* 
* Both upper curves have to be rotated in order to keep the continuity 
* of the pattern, then, in every iteration, the subsegment is bent and 
* rotated. This process is done by separating the space in a grid that 
* keeps one point of the curve, for example for the basic pattern the 
* grid is:
* 	      __   __
* 		| 00 | 11 |
* 		| 01 | 10 |
* 
* In every iteration, this grid is increased by a factor of 2, following 
* the bending and rotating pattern. Please consult to the video for a 
* more detailed explanation.
* 
* 
*/

let size;
let len;
let path;

let settings = {     
    Order: 2,
}

function gui(){
    // Adding the GUI menu
    var gui = new dat.GUI();
    gui.width = 150;    
    gui.add(settings,'Order', 1, 10).step(1).onChange(() => init());
}

function setup(){
    gui();
    createCanvas(400, 400);
    colorMode(HSB, 360, 255, 255);
    init();
}

function init(){
    //Number of squares at one side of the grid
    N = int(pow(2, settings.Order)); 
    len = width / N; //Length of each square of the grid
    size = N ** 2; //Number of points for the path

    //Loop for each square of the grid
    path = []
    for (let i = 0; i < size; i++) {
        //Push the Hilbert Curve of each square
        path[i] = hilbert(i);
        path[i].mult(len);
        path[i].add(len / 2, len / 2);
    }
}

function draw(){
    background(0);
    strokeWeight(1);

    for (let i = 1; i < path.length; i++) {
        // Set h param by interpolating in a 360 circle
        let h = map(i, 0, path.length, 0, 360); 
        // Set the color
        stroke(h, 255, 255);
        line(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
    }
}

function hilbert(i){
    const points = [
        new p5.Vector(0, 0),
        new p5.Vector(0, 1),
        new p5.Vector(1, 1),
        new p5.Vector(1, 0)
    ];

    let index = i & 3;
    point = points[index];

    for(let j=1; j<settings.Order; j++){
        i = (i >> 2); // Removes the last 2 bits of the number
        b1 = (i & 0x1); // Takes the first bit
        b2 = ((i >> 1) & 0x1); // Takes the second bit

        // Rotate the first two squares
        if(b1+b2==0) // Rotates 00 case 90 to the left
            point = new p5.Vector(point.y, point.x)
        if(b1+b2==2) // Mirror 11 case
            point = new p5.Vector(2**j - 1-point.y, 2**j - 1-point.x)

        // Adds offsets
        if(b1 != b2) // Adds y offset for the 01 and 10 cases.
            point.y+=2**j;
        if(b2)       // Adds x offset fot the 10 the 11 cases.
            point.x+=2**j;
    }
    
    return point
}