
// GENERAL BALL CONSTRUCTOR
// -------------------------

function Ball(x, y, r, color) {

    // Color
    this.hue = (color === 'green')?('#27ae60'):((color === 'red')?('#c0392b'):('#fff')); //other way of writing if/else on one line...
    this.color = color;

    // Matter options object
    let options = {
        restitution: 0.5,
        friction: 0,
        density: 1
    };

    // Give it a little bit of a random offset
    x += random(-spacer/6, spacer/6);

    // Make a matter body, store it with label
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "ball";

    // store the radius and the color
    this.r = r;


    // Add it to the matter world
    World.add(world, this.body);
}



// PROTOTYPES
// ----------

// Check if the ball is offscreen
Ball.prototype.isOffScreen = function () {
    let x = this.body.position.x;
    let y = this.body.position.y;
    return (x < -50 || x > width + 50 || y > height);
};

// Draw the ball
Ball.prototype.show = function () {
    fill(this.hue);
    noStroke();
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
};

// check where the ball landed when it is in 
Ball.prototype.whichBucket = function () {

    if(this.body.position.y > ymargin+28*spacer){
        let bucketnumber = [];

        // make a list of upper and lower bounds
        for(let i = 0; i<15; i++){
            let obj = {
                lower: xmargin + i*2*spacer,
                upper: xmargin + (i+1)*2*spacer,
                number: i
            };
            bucketnumber.push(obj);
        }

        // if the ball is in a bucket, check the list to search the bucketnumber

            let x = this.body.position.x;
            for (let i=0; i < bucketnumber.length; i++){
                if (x > bucketnumber[i].lower && x < bucketnumber[i].upper) {
                    return bucketnumber[i].number;
                }
            }
    } else {return -1;} //return -1 because 'false' and '0' could be confused
};

//change the color of the ball
Ball.prototype.changeColor = function (color) {
    this.hue = (color === 'green')?('#27ae60'):((color === 'red')?('#c0392b'):('#fff'));
    this.color = color;
};