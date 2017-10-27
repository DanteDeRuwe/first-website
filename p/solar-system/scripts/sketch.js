var scl = 1;
var newscl = 1;
var canvas;
var solar_r;
var myFont;
var nepA;
var nepB;
var nepE;

function fromAUtoPx(au) {
    //A function to convert between astronomical units and pixels, based on: solar radius = 1/215th of an AU
    return au * solar_r * 215;
}


function setup() {

    //Canvas and stars
    canvas = createCanvas(document.getElementById('canvas').clientWidth, document.getElementById('canvas').clientHeight);
    canvas.parent('canvas');

    var hammertime = new Hammer(canvas.elt);
    hammertime.get('pinch').set({ enable: true });
    hammertime.on('pinch', function () {
        document.getElementById('heading').innerHTML = "I PINCHED";
    });

    bg = new StarBG(stardensity);
    bg.show();

    myFont = loadFont('/p/solar-system/fonts/Roboto-Light.ttf');

    //Sun radius determines entire scale: most zoomed out is where orbit of neptune will fit on the canvas
    nepA = data.nep.elements[0].a;
    nepE = data.nep.elements[0].e;
    nepB = nepA * Math.sqrt(1 - (nepE * nepE));

}

function draw() {
    //Scale
    // Set sun radius but give it 20px of space on either side extra. This is the beginning scale (scl = 1)
    solar_r = Math.min((height-20) / (2 * nepB * 215), (width-20) / (2 * nepA * 215));

    //Scaling: every frame, lerp between current scl and the one we should get.
    scl = lerp(scl, newscl, 0.15);

    //scale it up
    solar_r *= scl;

    //Drawing
    //Stars
    bg.show();

    //Sun
    fill('#fff941');
    ellipse(width / 2, height / 2, solar_r*2, solar_r*2);

    textFont(myFont);
    textSize(12);
    text("Sun", width / 2 + 1.5*solar_r, height / 2);


    //Orbits
    showOrbits(true, true, true, true, true, true, true, true);

}

function mouseWheel(event) {

    // get the event delta
    var d = -event.delta;
    // for a normal scroll of +-100, we want a factor  +-1.5 for zoom, so
    d = (d / 200) * 3;
    // we want the newscl to be a product when zooming in, and a division when zooming out
    newscl = scl * Math.pow(Math.abs(d), Math.sign(d));

    //don't go below the 100% level pls
    if (newscl < 1) {
        newscl = 1;
    }
    //don't go further than sun-in-your-face pls
    if (solar_r > Math.sqrt(width*width + height * height)/2 && d>0){
        newscl = scl;
    }
}

window.onresize = function () {
    noLoop();
    var sclbeforeresize = scl;
    setup();
    scl = sclbeforeresize;
    loop();
};
