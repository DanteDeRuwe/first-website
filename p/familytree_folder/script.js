let data;
let ppl,rl;

// What happens when the JSO data has been loaded: -------------------------------------------------------------------
function afterDataLoad(){
    // Get rid of the spinner
    let elem = document.getElementsByClassName("mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active")[0];
    elem.parentNode.removeChild(elem);

    //Set some shortcuts
    ppl = data.people;
    rl = data.relationships;

    //Load the tree to display
    loadFirstNode('Dante_De_Ruwe');
}



function loadFirstNode(firstNode) {

    let node = firstNode;
    let gen = 0;

    let listnode = document.createElement("LI");
    listnode.id = firstNode;
    listnode.innerHTML = personBox(firstNode);
    document.getElementsByClassName('collapsibleList')[0].appendChild(listnode);
}

function getNodes(node){

    // set up the person
    listnode = document.getElementById(node);
    listnode.innerHTML = personBox(node);

    //Set up mom and dad
    let sublist = document.createElement("UL");

    let dadnode = document.createElement("LI");
    let momnode = document.createElement("LI");
    dadnode.id = rl[node].father;
    momnode.id = rl[node].mother;
    dadnode.innerHTML = personBox(rl[node].father);
    momnode.innerHTML = personBox(rl[node].mother);
    sublist.appendChild(momnode);
    sublist.appendChild(dadnode);

    listnode.appendChild(sublist);

    //make a new listnode for the next iteration
    listnode = document.createElement("LI");
    listnode.id = node;
}



// Various Functions ------------------------------------------------------------------------------------------------------------

// Make a new person-button 
function personBox(key) {
    //If we don't find the person, just return the name that was given to them
    if( !(key in data.people)){return key.toString().replace(/_/g,' ')}

    //Always make sure to add names and genders first
    AddNamesAndGendersToPeople();
    let info = ppl[key];
    let btnclass;
    switch(info["class"]){
        case 'man':
            btnclass = 'btn btn-outline-primary';
            break;
        case 'woman':
            btnclass = 'btn btn-outline-danger';
            break;
        default:
            btnclass = "btn btn-outline-dark";
            break;
    }

    let newdivcontents =
        '<button onclick="nodeOnClick('+key+')" class="' + btnclass + ' ">' +
        `<table width="100%" class="nodeText">
                <tr>
                <th>` + info["name"] + `</th>
                <th></th>
                <th></th>
                <th>`+ info["gender"] + `</th>
                </tr>
                <tr>
                <td> &deg ` + info["born"] + '</td>';

    if(typeof info["died"] !== 'undefined' ){if (info["died"].length > 0){newdivcontents += '<tr><td>&#8224 ' + info["died"] + '</td>'}}

    newdivcontents += '</tr></table></button>';
    return newdivcontents;
}

function nodeOnClick(parentelement){
    let node = parentelement.id;

    try {
        //Generate the nodes
        getNodes(node);
        //replace the button onclickevent with a toggle
        document.getElementById(node).firstChild.onclick = toggleCollapse
    }catch(err){
        let notification = document.querySelector('.mdl-js-snackbar');
        notification.MaterialSnackbar.showSnackbar(
            {message: 'No parents in database'}
        );
    }
}

function AddNamesAndGendersToPeople() {
    //gets into data.people and adds a "name": "..." tag per person
    for (let i = 0; i < Object.keys(data.people).length; i++) {
        let p = Object.keys(data.people)[i];
        data.people[p].name = p.replace(/_/g, ' ');
        if (typeof data.people[p]['class'] == 'undefined') {
            data.people[p].gender = '<i class="fa fa-question"></i>'
        } else {
            data.people[p].gender = (data.people[p]['class'] === 'woman') ? '<i class="fa fa-venus"></i>' : '<i class="fa fa-mars"></i>' //female
        }
    }
}

