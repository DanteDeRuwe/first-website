

function Orbit(a,e) {

    this.a = a;
    this.e = e;

    // map values between 0 and when for a max  a+ae  = width/2
    //this.a = map(this.a, 0 , 30.1 , 0 , (1+this.e) * 30.1 * 215 * solar_r);
    //calculate b
    this.b = this.a * Math.sqrt(1- (this.e * this.e));



    this.show = function () {
        noFill();
        stroke('#fff');
        this.x = fromAUtoPx(this.a) * this.e + width/2;
        this.y = height/2;
        ellipse(this.x,this.y , fromAUtoPx(this.a) , fromAUtoPx(this.b));
    }
}

function showOrbits(mer, ven, ter, mar, jup, sat, ura, nep) {
    //Orbits

//Mercury
    merO = new Orbit(data.mer.elements[0].a, data.mer.elements[0].e);
    if(mer){merO.show();}

//Venus
    venO = new Orbit(data.ven.elements[0].a, data.ven.elements[0].e);
    if(ven){venO.show();}

//Earth
    terO = new Orbit(data.ter.elements[0].a, data.ter.elements[0].e);
    if(ter){terO.show();}

//Mars
    marO = new Orbit(data.mar.elements[0].a, data.mar.elements[0].e);
    if(mar){marO.show();}

//Jupiter
    jupO = new Orbit(data.jup.elements[0].a, data.jup.elements[0].e);
    if(jup){jupO.show();}

//Saturn
    satO = new Orbit(data.sat.elements[0].a, data.sat.elements[0].e);
    if(sat){satO.show();}

//Uranus
    uraO = new Orbit(data.ura.elements[0].a, data.ura.elements[0].e);
    if(ura){uraO.show();}

//Neptune
    nepO = new Orbit(data.nep.elements[0].a, data.nep.elements[0].e);
    if(nep){nepO.show();}
}
