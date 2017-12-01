/*

useful functions from sketch.js and ball.js
-------------------------------------------

newBallOnSpot( SPOT , COLOR )
puts a ball on a spot in [1,7] with a color = 'red' / 'green' / 'white'

BALL_OBJECT.whichBucket()
returns -1 when ball not in bucket, else returns a bucketnumber in [0,14]

to do this better, use the bucketnumbers object: {id: [color, bucketnr]}

BALL_OBJECT.changeColor(COLOR)
obvious... color = 'red' / 'green' / 'white'

removeAllBalls()
obvious...


*/



// ---------------------
// VARIABLE DECLARATIONS
// ---------------------

// Obvious variables
let wallscores;
let players = [];
let round = 0;

//There is in the beginning 1 input present, the next input is by default 2
let inputcounter = 2;




// ------------
// PLAYER SETUP
// ------------

//I use a constructor in stead of an object because I want to... Don't judge me.
function Player(name) {
    this.name = name;
    this.score = 0;
    this.turn = false;
    this.id = -1;
}

function makeNewPlayer(name) {
    let p = new Player(name);
    //store the id the player will get in the array
    p.id = players.length;
    players.push(p);

}





// --------------------------------
// GAMELOOP + ROUND INITIALISATIONS
// --------------------------------


// Init functions get called once by the button event
// The gameLoop() keeps getting called by the actual draw()-loop


function gameLoop(){

    // Update the spotbuttons
    if (round !== 0){updateSpotButtons();}

    //display the scores
    displayScores();
    displayBallscores();
}



//ROUND 1 -------------------------------------------------------------------------------------
function roundOneInit(){
    if(players.length !== 0) {
        players[0].turn = true;
        for(let i = 1; i<players.length; i++){players[i].turn = false;}
    }
    //wallscores = [1, 50, 100, 2000, 10, 1000, 1, 2500, 1, 1000, 10, 2000, 100, 500, 1];
    wallscores = [1, 5, 10, 20, 10, 30, 1, 15, 5, 10, 10, 20, 50, 5, 1];
    round = 1;

    // set the beginning color to the position of the slider
    colorSlide();
    //Load the spotbuttons
    loadSpotButtons();
}

//ROUND 2 -------------------------------------------------------------------------------------

function roundTwoInit(){
    if(players.length !== 0) {
        players[0].turn = true;
        for(let i = 1; i<players.length; i++){players[i].turn = false;}
    }
    //wallscores = [1, 500, 100, 1000, 10, 2500, 1, 5000, 1, 10000, 10, 12500, 100, 25000, 1];
    wallscores = [1, 20, 10, 50, 10, 25, 1, 50, 5, 100, 10, 200, 50, 150, 1];
    round = 2;

    // set the beginning color to the position of the slider
    colorSlide();
    //Load the spotbuttons
    loadSpotButtons();
}

//ROUND 3 -------------------------------------------------------------------------------------
function roundThreeInit(){
    if(players.length !== 0) {
        players[0].turn = true;
        for(let i = 1; i<players.length; i++){players[i].turn = false;}
    }
    //wallscores = [1, 5000, 100, 10000, 10, 20000, 1, 30000, 1, 40000, 10, 50000, 100, 100000, 1];
    wallscores = [1, 20, 10, 30, 10, 40, 1, 50, 5, 100, 10, 200, 50, 300, 1];
    round = 3;
    // set the beginning color to the position of the slider
    colorSlide();
    //Load the spotbuttons
    loadSpotButtons();
}

//---------------------------------------------------------------------------------------------




// ----------
//  FUNCTIONS
// ----------

function nextPlayer(){
    for (let i = 0; i < players.length; i++){
        if(players[i].turn){
            players[i].turn = false;
            players[(i+1)%(players.length)].turn = true;
            break; // otherwise we'll change the next one as well
        }
    }
    //if we go to the next player, all balls should be removed
    removeAllBalls();
}

function storeScore(){
    for(let p of players){
        if(p.turn){
            for(let id in bucketnumbers){
                switch(bucketnumbers[id][0]){
                    case 'green':
                        p.score += wallscores[bucketnumbers[id][1]];
                        break;
                    case 'red':
                        p.score -= wallscores[bucketnumbers[id][1]];
                        break;
                    default:
                        break;
                }
            }
        }
        if(p.score <=0){p.score = 0} // don't go below 0
    }
}

function displayScores(){
    t = document.getElementById('scoreboard');
    t.innerHTML = '';
    for (let p of players){
        if(p.turn){
            t.innerHTML += '<tr><td style="width:5px">▸</td><th>' + p.name + '</th><td>' + p.score + '</td></tr>';
        }else{
            t.innerHTML += '<tr><td style="width:5px"></td><th>' + p.name + '</th><td>' + p.score + '</td></tr>';
        }
    }
}

function displayBallscores(){

    if(wallscores && Object.keys(bucketnumbers).length !==0){
        let t = "   |    ";
        for(let id in bucketnumbers) {
            t += wallscores[bucketnumbers[id][1]] + "   |   ";
        }
        document.getElementById('infodisplay').innerHTML = t;
    }else{
        document.getElementById('infodisplay').innerHTML = "";
    }
}

function loadSpotButtons(){
    //Only if the buttons were not already generated
    if (!document.getElementById('spotbuttons').innerHTML){
        for (let i = 1; i <= 7; i++) {
            //create a new div
            let btn = document.createElement('button');
            //set its class and id
            btn.setAttribute("class", "mdl-button mdl-js-button mdl-button--icon mdl-button--colored");
            btn.setAttribute("id", "spotbutton"+i);
            btn.setAttribute("onclick",   "noLoop();newBallOnSpot(" + i + ",'" + ballcolor + "');redraw();"    );

            // set the text
            btn.innerHTML = '<i class="material-icons">filter_' + i + '</i>';
            document.getElementById('spotbuttons').appendChild(btn);
        }
    }
}

function updateSpotButtons() {
    for (let i = 1; i <= 7; i++) {
        let btn = document.getElementById("spotbutton" + i);
        btn.setAttribute("onclick",   "noLoop();newBallOnSpot(" + i + ",'" + ballcolor + "');loop();noLoop();"    );
    }
}

function addInput(){
    //create a new div
    let newdiv = document.createElement('div');
    //set its class
    newdiv.setAttribute("class", "mdl-textfield mdl-js-textfield mdl-textfield--floating-label");
    // set the elements
    newdiv.innerHTML = `
                <input class="mdl-textfield__input" type="text" id=` + '"input' + inputcounter + '">' + `
                <label class="mdl-textfield__label" for=` + '"input' + inputcounter + '">Naam...</label>' + `
            </div>
    `;

    // Add it to the MDL components
    componentHandler.upgradeElement(newdiv);
    // Append it to the dynamic inputs
    document.getElementById('dynamicInputs').appendChild(newdiv);
    // increase the counter
    inputcounter++;
}

function formSubmitted() {
    //get the form data
    let form = document.getElementById("form");
    let set = new Set();
    let arr = [];

    //create a set and an array of form elements to check for duplicates
    for (let i = 0; i < form.length ;i++) {
        if(form.elements[i].value !== ""){
        // Add the players from the form
        set.add(form.elements[i].value);
        arr.push(form.elements[i].value);
        }
    }

    if(set.size === arr.length){
        for (let i = 0; i < form.length ;i++) {
            if(form.elements[i].value !== ""){
                // Add the players from the form
                makeNewPlayer(form.elements[i].value);
            }
        }
        //hide the overlaying div
        document.getElementById('inputbox').classList.add('hidden');
        document.getElementById('overlay').classList.add('hidden');
    }else{
        //create a warning
        let p = document.createElement("P");
        let t = document.createTextNode('The input should not contain duplicate names');
        p.appendChild(t);
        document.getElementById('inputbox').appendChild(p);
    }
}

function colorSlide() {
    let c;
    switch(document.getElementById('s1').value){
        case "0":
            c = 'green';
            break;
        case "1":
            c= 'white';
            break;
        case "2":
            c= 'red';
            break;
    }
    //change existing balls
    for (let b of balls){b.changeColor(c)};
    //set color for future new balls
    ballcolor = c;
}

window.addEventListener("beforeunload", function (e) {
    let confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';

    (e || window.event).returnValue = confirmationMessage; //Gecko + IE
    return confirmationMessage; //Gecko + Webkit, Safari, Chrome etc.
});
