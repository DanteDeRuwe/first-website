
// GENERAL PIN CONSTRUCTOR
// -------------------------

function Pin(x, y, r) {

    // Matter options object
    let options = {
        restitution: 1,
        friction: 0,
        isStatic: true
    };

    // Make a matter body, store it with label
    this.body = Bodies.circle(x, y, r, options);
    this.body.label = "pin";

    // store the values
    this.x = this.body.position.x;
    this.y = this.body.position.y;
    this.r = r;


    // Add it to the matter world
    World.add(world, this.body);
}


// PROTOTYPES
// ----------

// Draw the ball
Pin.prototype.show = function () {
    noStroke();
    fill('#34495e');
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.r * 2);
    pop();
};
