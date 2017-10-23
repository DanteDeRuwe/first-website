var scl;
var startingscl;
var solar_r;

function fromAUtoPx(au){
    return au * solar_r * 215;
}

function setup() {

    //Canvas and stars
        canvas = createCanvas(document.getElementById('canvas').clientWidth, document.getElementById('canvas').clientHeight);
        canvas.parent('canvas');
        bg = new StarBG(stardensity);
        bg.show();

    //Sun
        scl = 1/ (document.getElementById('canvas').clientWidth  * 5 );
        startingscl = scl;

}

function draw() {
    bg.show();

    solar_r = document.getElementById('canvas').clientWidth * scl ;
    fill('#fff941');
    textFont('Segoe UI');
    text("Sun", width/2, (height/2)-(solar_r*2));

    //Orbits
    ellipse(width/2, height /2, solar_r, solar_r);
    showOrbits(true,true,true,true,true,true,true,true);

}

function mouseWheel(event) {
    // if we are zoomed in, zooming in and out is permitted
    if(scl > startingscl) {
        scl += 1 / (100 * (-event.delta));
    //if we reached the edge, only zooming in is permitted
    } else if( scl + 1 / (100 * (-event.delta)) >= startingscl) {
        scl += 1 / (100 * (-event.delta));
    // if we try to zoom out past that, scl stays on value
    }
}

window.onresize = function() {
    noLoop();
    var sclbeforeresize = scl;
    setup();
    scl = sclbeforeresize;
    loop();
};

