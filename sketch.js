/*
** Mandelbrot Set
* Cristian Rojas Cardenas, April 2022
* Algorithm based on the tutorial of Daniel Shiffman.
* See the video here: 
* https://www.youtube.com/watch?v=dSK-MW-zuAc&ab_channel=TheCodingTrain

* 
*/




let settings = {     
}

function gui(){
    // Adding the GUI menu
    var gui = new dat.GUI();
    gui.width = 150;
}


function setup(){
    gui();
    createCanvas(720, 400);
    init();
}



function init(){
    background(0);
}

function draw(){}