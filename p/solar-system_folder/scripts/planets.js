

function Orbit(a,e) {

    this.a = a;
    this.e = e;

    //calculate b
    this.b = this.a * Math.sqrt(1- (this.e * this.e));

    this.show = function () {
        noFill();
        stroke('#fff');
        this.x = fromAUtoPx(this.a) * this.e + width/2;
        this.y = height/2;
        ellipse(this.x,this.y , 2* fromAUtoPx(this.a) , 2* fromAUtoPx(this.b));
    }
}

function showOrbits(mer, ven, ter, mar, jup, sat, ura, nep) {
    //Orbits

//Mercury
    var merO = new Orbit(data.mer.elements[0].a, data.mer.elements[0].e);
    if(mer){merO.show();}

//Venus
    var venO = new Orbit(data.ven.elements[0].a, data.ven.elements[0].e);
    if(ven){venO.show();}

//Earth
    var terO = new Orbit(data.ter.elements[0].a, data.ter.elements[0].e);
    if(ter){terO.show();}

//Mars
    var marO = new Orbit(data.mar.elements[0].a, data.mar.elements[0].e);
    if(mar){marO.show();}

//Jupiter
    var jupO = new Orbit(data.jup.elements[0].a, data.jup.elements[0].e);
    if(jup){jupO.show();}

//Saturn
    var satO = new Orbit(data.sat.elements[0].a, data.sat.elements[0].e);
    if(sat){satO.show();}

//Uranus
    var uraO = new Orbit(data.ura.elements[0].a, data.ura.elements[0].e);
    if(ura){uraO.show();}

//Neptune
    var nepO = new Orbit(data.nep.elements[0].a, data.nep.elements[0].e);
    if(nep){nepO.show();}
}
