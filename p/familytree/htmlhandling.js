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
    let elem = filebutton.parentElement;
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
    let vis, tohide;

    //Check where the button is, and get all underlaying buttons in tohide
    for(e of event.path){
        if (e.tagName === "BUTTON"){
            tohide = e.parentElement.children[1];
            vis = tohide.style.visibility;
        }
    }

    //flip the switch
    if (vis === 'hidden' && tohide) {
        tohide.style.visibility = '';
    } else if (vis === '' && tohide) {
        tohide.style.visibility = 'hidden';
    }

}
            
