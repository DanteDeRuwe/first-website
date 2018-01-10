var stardensity = 0.0005; /*per pixel*/

function StarBG() {
    this.stardensity = stardensity;
    this.starpositions = [];

    this.show = function() {
        if (this.starpositions.length === 0) {
            var star;

            var startotal = Math.floor((width * height) * this.stardensity);
            for (i = 0; i < startotal; i++) {
                star = {x: 0, y:0};
                star.x = random(0, width);
                star.y = random(0, height);

                this.starpositions = this.starpositions.concat([star]);
            }
        }

        background('#000000');
        for(i = 0; i<this.starpositions.length; i++){
            noStroke();
            fill('#fff');
            ellipse(this.starpositions[i].x,this.starpositions[i].y, 1, 1);
        }
    };
}



