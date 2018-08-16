// Start the loading of the file

filebutton = document.getElementById('selectFiles');

filebutton.onchange = function() {
    // Check if the file is there
    let files = filebutton.files;
    if (files.length <= 0) {return false;}

    // Read the file and put it in the data variable
    let fr = new FileReader();
    fr.onload = function(e) {data = JSON.parse(e.target.result); setTimeout(function() {afterDataLoad();} , 100)};
    fr.readAsText(files.item(0));

    // --- While waiting for 'onload' ---
    // Remove the upload button
    let elem = filebutton.parentElement.parentElement;
    elem.parentNode.removeChild(elem);

    // Display a lovely spinner
    let spinner = document.createElement('div');
    spinner.className = "mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active";
    document.getElementById('treeholder').appendChild(spinner);
    componentHandler.upgradeElement(spinner); //For MDL
};



// Make the tree draggable ----------------------------------------------
let _startX = 0;
let _startY = 0;
let _offsetX = 0;
let _offsetY = 0;
let _dragElement;

document.getElementById('treeholder').onmousedown = OnMouseDown;
document.getElementById('tree').onmousedown = OnMouseDown;
document.getElementById('treeholder').onmouseup = OnMouseUp;
document.getElementById('tree').onmouseup = OnMouseUp;

function OnMouseDown(event){
    _startX = event.clientX;
    _startY = event.clientY;
    _offsetX = document.getElementById('tree').offsetLeft;
    _offsetY = document.getElementById('tree').offsetTop;
    _dragElement = document.getElementById('tree');
    document.getElementById('treeholder').style.cursor = '-webkit-grab';
    document.onmousemove = OnMouseMove;
}

function OnMouseMove(event) {
    if ([event.movementX, event.movementY] !== [0, 0]) { //not both zero!
        document.getElementById('treeholder').style.cursor = '-webkit-grab';
        _dragElement.style.left = (_offsetX + event.clientX - _startX) + 'px';
        _dragElement.style.top = (_offsetY + event.clientY - _startY) + 'px';
    }
}


function OnMouseUp(event){
    document.getElementById('treeholder').style.cursor = 'auto';
    document.onmousemove = null;
    _dragElement=null;
}



// Make the tree collapsible -------------------------------------------------
function toggleCollapse(event) {
    let disp, tohide;

    //Check where the button is, and get all underlaying buttons in tohide
    for(e of event.path){
        if (e.tagName === "BUTTON"){
            tohide = e.parentElement.children[1];
            disp = tohide.style.display;
        }
    }

    //flip the switch
    if (disp === 'none' && tohide) {
        tohide.style.display = '';
    } else if (disp === '' && tohide) {
        tohide.style.display = 'none';
    }

}
            
// New person inputs ----------------------------------------------------------------------
function createTextInputs(params){
    for (let param of params) {
        let parentdiv = document.getElementById("textInputs");
        //create a new div
        let newdiv = document.createElement('div');
        //set its class
        newdiv.setAttribute("class", "mdl-textfield mdl-js-textfield mdl-textfield--floating-label");
        // set the elements
        newdiv.innerHTML = '' +
            '<input class="mdl-textfield__input" type="text" id="' + param.toLowerCase() +'">' +
            '<label class="mdl-textfield__label" for="' + param.toLowerCase() + '">' + param + '</label></div>';
        // Add it
        componentHandler.upgradeElement(newdiv);
        parentdiv.appendChild(newdiv);
    }
}

function createRadioInputs(paramswithoptions){ //paramswithoptions: [ [sex, [male,female]] , [alive, [yes,no]] ]
    for(pwo of paramswithoptions){
        let param = pwo[0];
        let options = pwo[1];

        let radioinputs = document.createElement('div');
        radioinputs.className = param;
        let table = '<table><tr>';

        let label;
        for (opt of options) {
            label = '<label class = "mdl-radio mdl-js-radio" for = "' + opt.toLowerCase() + '">'+
                '<input type = "radio" id = "' + opt.toLowerCase() + '" name = "' + param.toLowerCase() + '" class = "mdl-radio__button">'+
                '<span class = "mdl-radio__label">' + opt + '</span>'+
                '</label>';

            table += '<td>' + label+ '</td>'
        }

        table += '</tr></table>';

        //Add it
        radioinputs.innerHTML = table;
        let parentdiv = document.getElementById("textInputs");
        parentdiv.appendChild(radioinputs);

    }
}


function createDropdownInputs(params, target){ //target specifies rl[person].target, so 'mother' or 'father'

    //generate dropdown options once
    let options = '<option value=""></option>';
    for (let person of Object.keys(ppl)) {
        if (rl[person]) {
            if (!rl[person][target]) {
                options += '<option value="' + person + '">' + ppl[person].name + '</option>'
            }
        }else{
            options += '<option value="' + person + '">' + ppl[person].name + '</option>'
        }
    }
    console.log(target + '.........' + options);

    for (let param of params) {
        let parentdiv = document.getElementById("dropdownInputs");
        //create a new div
        let newdiv = document.createElement('div');
        //set its class
        newdiv.setAttribute("class", "mdl-textfield mdl-js-textfield mdl-textfield--floating-label");
        // set the elements
        newdiv.innerHTML = '<select class="mdl-textfield__input" id="' + param.replace(' ', '_').toLowerCase()  + '" name="'+param+'">' + options +
            '</select><label class="mdl-textfield__label" for="' + param + '">' + param + '</label>';

        // Add it
        componentHandler.upgradeElement(newdiv);
        parentdiv.appendChild(newdiv);
    }
}


function radiobuttonid(radionodelist){
    for (r of radionodelist){
        if(r.checked){return r.id;}
    }
}

function saveDataToJSON() {
    //delete name and gender tags in people, user shouldn't see these
    for (p of Object.keys(ppl)){
        delete ppl[p].gender;
        delete ppl[p].name;
    }

    let textToSave = JSON.stringify(data, null, 2),
        filename = 'FamilyTree_' + Date.now() +'.json',
        blob = new Blob([textToSave], {type: "text/json;charset=utf-8"});

    saveAs(blob, filename);
}



