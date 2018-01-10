
// GENERAL BOUNDARY CONSTRUCTOR
// -------------------------

function Boundary(x, y, w, h) {    // X AND Y FROM TOP LEFT!!!

    // Matter options object
    let options = {
        isStatic: true
    };


    // for matter, rectangles are drawn from the center
    x = x + w / 2;
    y = y + h / 2;

    // Make a matter body, store it with label
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.body.label = "boundary";

    // Store the width and the height
    this.w = w;
    this.h = h;

    // Add it to the matter world
    World.add(world, this.body);
}


// PROTOTYPES
// ----------

// Draw the boundary
Boundary.prototype.show = function () {
    fill(255,50);
    strokeWeight(1);
    stroke(255);
    let pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    rotate(this.body.angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
};

