
// The Wall by Dante De Ruwe
// A JavaScript project based on the popular TV trivia quiz "The Wall".


// I am not affiliated, associated, authorized, endorsed by, or in any way officially
// connected with NBC or any of the other broadcasters of this television show;
// nor with Glassman Media, SpringHill Entertainment orCORE Media Group.
// The use in this website and/or in related promotional print or video material of trademarked names and images is strictly for
// educational purposes, and no commercial claim to their use, or suggestion of sponsorship or endorsement is made by Dante De Ruwe.


// ---------------------
// VARIABLE DECLARATIONS
// ---------------------


// matter.js module aliases
let Engine = Matter.Engine,
    World = Matter.World,
    Events = Matter.Events,
    Bodies = Matter.Bodies;

// Matter objects
let canvas, spacer, engine, world;

// Arrays for objects
let balls = [],
    pins = [],
    bounds = [];

// Some parameters
let pin_r, ball_r;
let xmargin, ymargin, floory, topy, leftx, rightx;

let ballcolor = 'white';
const rows = 14, cols = 15;


// An array to store all x coordinates of the buckets to display
let bucketx = [];

// An object that shows which ball-id is in which bucket
let bucketnumbers = {};


// ----------------------------------------------------------------------------------------------------



// ------------
// p5 FUNCTIONS
// ------------


function preload(){
    //call setup once more to TRY TO fix a bug that would display a white bar between the 2 divs
    setup();
}

function setup() {
    canvas = createCanvas(document.getElementById('canvas').clientWidth, document.getElementById('canvas').clientHeight);
    canvas.parent('canvas');

    // Matter stuff
    engine = Engine.create();
    world = engine.world;
    world.gravity.y = 0.05;

    // Make sure we start fresh for the displaying elements
    balls = [];
    pins = [];
    bounds = [];
    bucketx = [];

    //We define a unit of spacing (cf. 'block size'): 1/50th of the canvas width or the height (whatever is smallest)
    spacer = Math.min(Math.floor(width/50), Math.floor(height/55));

    //define some radii
    pin_r = 0.15*spacer;
    ball_r = 0.80 * (spacer - pin_r);

    // define some boundary conditions
    xmargin = Math.floor(width/2 - 15*spacer);
    ymargin = 12*spacer;
    floory = ymargin + 36*spacer;
    topy = ymargin + 8*spacer;
    leftx = xmargin;
    rightx = xmargin + 30* spacer;

    // Draw the bg
    background('#080d11');

    // Create the wall array
    makeWall(spacer);

    // Create the boundaries
    createBounds();

}

function draw() {

    // Draw the bg
    background('#080d11');

    // Draw the wall pins
    for (let p of pins) {p.show();}

    // Draw some decoration
    stroke('#2980b9');
    strokeWeight(6);
    showParabola();
    line(leftx, topy, leftx, floory);
    line(rightx, topy, rightx, floory);
    line(leftx, floory, rightx, floory);
    drawBuckets();
    fill('#2980b9');
    stroke('#2980b9');
    for(let i =1; i <= 7; i++){ //the 7 spotnumbers
        strokeWeight(1);
        text(i, bucketx[i+2]+0.8*spacer, ymargin-1.5*spacer);
    }


    //DEBUG: draw the bounds
    //for(let b of bounds){b.show();}

    // draw the balls
    showBalls();

    //Run the engine
    Engine.update(engine, 1000 / 30);

    //start game logic
    gameLoop();

}

window.onresize = function () {
    setup();
};

function mousePressed() {
    // If the mouse is pressed in one of the correct spots, make a new ball!
    if(mouseX > pins[179].x && mouseX < pins[186].x && mouseY < ymargin && mouseY >ymargin-6*spacer){
        newBall(mouseX, ballcolor);
    }
}



// ----------------------------------------------------------------------------------------------------


// ----------------
// NON p5 FUNCTIONS
// ----------------


function newBall(x, ballcolor) {
    let b = new Ball(x, ymargin-2*spacer,  ball_r, ballcolor);
    balls.push(b);
}

function newBallOnSpot(spot, ballcolor) {
    //spot goes from 1 to 7
    let x = bucketx[spot+2]+spacer;
    newBall(x, ballcolor);
};

function showBalls(){
    for (let i = 0; i < balls.length; i++) {

        //show them ballz #nohomo
        balls[i].show();

        //check if in a bucket and if so, add the bucketnumber to the 'bucketnumbers' object
        if (balls[i].whichBucket() !== -1){
            let id = balls[i].body.id;
            bucketnumbers[id] = [balls[i].color, balls[i].whichBucket()];
        }

        //check if offscreen
        if (balls[i].isOffScreen()) {
            World.remove(world, balls[i].body);
            balls.splice(i, 1);
            i--; //avoid skipping
        }
    }
}

function removeAllBalls(){
    for (let i = 0; i < balls.length; i++) {World.remove(world, balls[i].body);}
    balls = [];
    bucketnumbers = {};
}

function makeWall(spacer){

    for(let j = 0; j < rows; j++){
        for(let i = 0; i < cols; i++){


            //Even rows under row 10
            if(j < 10 && j % 2 === 0){
                let x = xmargin + spacer + 2*i*spacer;
                let y = ymargin + (26 - 2*j) * spacer;

                let p = new Pin(x,y, pin_r);
                pins.push(p);
            }

            //Uneven rows under row 10 (extra x-offset)
            else if(j < 10 && j % 2 !== 0) {
                let x = xmargin + 2*spacer + 2*i*spacer;
                let y = ymargin + (26 - 2*j) * spacer;

                //don't draw the last pin tho
                if(i !== cols-1){
                    let p = new Pin(x,y,pin_r);
                    pins.push(p);
                }
            }

            else{
                let y;
                let x;
                let xoff;
                let stop;

                switch(j){
                    case 10:
                        xoff = 3;
                        stop = 13;
                        break;

                    case 11:
                        xoff = 4;
                        stop = 12;
                        break;

                    case 12:
                        xoff = 7;
                        stop = 9;
                        break;

                    case 13:
                        xoff = 8;
                        stop = 8;
                        break;
                }

                //get the positions right
                y = ymargin + (26 - 2*j) * spacer;
                x = xmargin + xoff*spacer + 2*i*spacer;

                //add the correct amount of pins
                if(i<stop){
                    let p = new Pin(x,y,pin_r);
                    pins.push(p);
                    //DEBUG get pin number of pin 0 and 7
                    //if(j === 13 && i === 0){console.log(pins.length-1)};  -----> 179
                    //if(j === 13 && i === 7){console.log(pins.length-1)}; -----> 186

                }
            }
        }
    }
}

function showParabola(){

    let a = xmargin / spacer;
    let b = ymargin / spacer;

    for(let i = a-11; i<a+30+11; i++){

        //Parabola through (a,b+8) (a+30,b+8) (a+15,b-6)
        let x1 = i;
        let y1 = (14*a*a)/225 - (28/225)*(a + 15)*x1 + (28*a)/15 + b + (14*x1*x1)/225 + 8;
        let x2 = (i+1);
        let y2 = (14*a*a)/225 - (28/225)*(a + 15)*x2 + (28*a)/15 + b + (14*x2*x2)/225 + 8;

        x1 *= spacer;
        x2 *= spacer;
        y1 *= spacer;
        y2 *= spacer;

        curve(x1,y1,x1,y1,x2,y2,x2,y2);
    }
}

function drawBuckets(){
    for (let i = 0; i < bucketx.length; i++) {
        let x = bucketx[i];
        strokeWeight(2);
        line(x, ymargin+28*spacer, x, floory);
        if (wallscores){
            strokeWeight(0);
            fill(255);
            if(String(wallscores[i]).length === 1){x+=0.7*spacer}else if(String(wallscores[i]).length === 2){x+= 0.3*spacer};
            text(wallscores[i], x-2*spacer, floory + spacer * ( 2+ (3/2)*(i % 2)));
        }
    }
    if (wallscores){
        let i = bucketx.length;
        let x = bucketx[i-1];
        if(String(wallscores[i]).length === 1){x+=0.7*spacer;}else if(String(wallscores[i]).length === 2){x+= 0.3*spacer};
        strokeWeight(0);
        fill(255);
        text(wallscores[i], x, floory + spacer * ( 2+ 2*(i % 2)));
    }
}

function createBounds(){

    let thickness = 100;

    let floor = new Boundary(leftx, floory-3, Math.abs(leftx- rightx), thickness);
    let left = new Boundary(leftx-thickness+spacer/2, topy, thickness, Math.abs(topy-  floory));
    let right = new Boundary(rightx-spacer/2, topy, thickness, Math.abs(topy-  floory));

    for(let elt of [floor,  left,  right]){
        bounds.push(elt);
    }

    /*
    //left upper
    let b = new Boundary(leftx, 0, 5*spacer, topy);
    b.body.angle = .6;
    b.body.position.x += 0.7*spacer;
    b.body.position.y += spacer;
    bounds.push(b);

    // right upper
    let b2 = new Boundary(rightx, 0, 2*spacer, topy);
    //b2.body.angle = -.6;
    //b2.body.position.x -= spacer * 5.5;
    //b2.body.position.y += spacer* 1.5;
    bounds.push(b2);
       */

    //Buckets

    for(let i = 1; i<= 14; i++){

        let w = 0.1*spacer;
        let h = 8*spacer;

        let x = xmargin + 2*i*spacer - (w/2);
        bucketx.push(x);
        let y = ymargin+28*spacer;

        let b = new Boundary(x, y, w, h);
        bounds.push(b)
    }
}
