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
    loadFirstNode('Dante_De_Ruwe'); //TO DO: GET THIS HARDCODED VALUE OUT OF THE WAY

    //Load the rest
    let personbox = document.getElementsByClassName('personbox');
    for (let i = 0; i < personbox.length; i++) {
        let node = personbox[i].parentElement.id;
        try {
            let test = rl[node].father;
            getNodes(node);
        } catch (err) {
            try {
                let test = rl[node].mother;
                getNodes(node);
            } catch (err) {
            }
        }
    }

    //Load the user experience for adding people
    document.getElementById('addpersonform').style.visibility = '';
    document.getElementById('addpersonformsubmit').style.visibility = '';
    createTextInputs(['Name']);
    createRadioInputs([ ['Sex', ['Male', 'Female']], ]);
    createTextInputs(['Born', 'Died']);
    createDropdownInputs(['Father of', 'Mother of']);
    componentHandler.upgradeDom();
}


function loadFirstNode(firstNode) {
    let listnode = document.createElement("LI");
    listnode.id = firstNode;
    listnode.innerHTML = personBox(firstNode);
    document.getElementsByClassName('collapsibleList')[0].appendChild(listnode);
    getNodes(firstNode);
}

function getNodes(node){
    // set up the person
    listnode = document.getElementById(node);
    listnode.innerHTML = personBox(node);

    //Set up mom and dad
    let sublist;
    if(!document.getElementById(node + '_sublist')){
        sublist = document.createElement("UL");
        sublist.id = node + '_sublist';
    }else{
        sublist = document.getElementById(node + '_sublist');
        sublist.innerHTML = '';
    }

    if(rl[node].father) {
        let dadnode = document.createElement("LI");
        dadnode.id = rl[node].father;
        dadnode.innerHTML = personBox(rl[node].father);
        sublist.appendChild(dadnode);
    }if(rl[node].mother) {
        let momnode = document.createElement("LI");
        momnode.id = rl[node].mother;
        momnode.innerHTML = personBox(rl[node].mother);
        sublist.appendChild(momnode);
    }
    listnode.appendChild(sublist);

    //make a new listnode for the next iteration
    listnode = document.createElement("LI");
    listnode.id = node;

    //replace the button onclickevent with a toggle now that nodes are generated
    document.getElementById(node).firstChild.onclick = toggleCollapse
}



// Handle the addperson form to add a person to the data
function addPersonFormSubmit(){
    let form = document.getElementById("addpersonform");

    let node = form.elements.name.value.replace(' ', '_');
    let sex = radiobuttonid(form.elements.sex);
    let born = form.elements.born.value;
    let died = form.elements.died.value;

    if(!(node in ppl)){
    ppl[node] = {
        "sex":sex,
        "born": born,
        "died": died,
    };}

    let father_of = form.elements.father_of.value;
    let mother_of = form.elements.mother_of.value;

    if(father_of.length !== 0){
        if (!(father_of in rl)){
            rl[father_of] = {};
        }
        //THIS OVERWRITES if father already existed, (but data stays stored)!!!!!!
        rl[father_of].father = node;
        getNodes(father_of);
        }

    if(mother_of.length !== 0){
        if (!(mother_of in rl)){
            rl[mother_of] = {};
        }
        //THIS OVERWRITES if mother already existed (but data stays stored)!!!!!!
        rl[mother_of].mother = node;
        getNodes(mother_of);
    }

    //Clear the form
    for(let e of form.elements){try{ e.parentNode.MaterialTextfield.change();}catch(err){}}
    componentHandler.upgradeDom();

    //Make sure to reset dropdowns!
    document.getElementById('dropdownInputs').innerHTML = "";
    createDropdownInputs(['Father of', 'Mother of']);

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
    switch(info["sex"]){
        case 'male':
            btnclass = 'btn btn-outline-primary';
            break;
        case 'female':
            btnclass = 'btn btn-outline-danger';
            break;
        default:
            btnclass = "btn btn-outline-dark";
            break;
    };

    btnclass += " personbox";

    let newdivcontents = '' +
        '<button onclick="nodeOnClick('+key+')" class="' + btnclass + ' ">' +
        `<table class="nodeText">
                <tr>
                <th>` + info["name"] + `</th>
                <th></th>
                <th></th>
                <th style="text-align:right;">`+ info["gender"] + `</th>
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
        if (typeof data.people[p]['sex'] == 'undefined') {
            data.people[p].gender = '<i class="fa fa-question"></i>'
        } else {
            data.people[p].gender = (data.people[p]['sex'] === 'female') ? '<i class="fa fa-venus"></i>' : '<i class="fa fa-mars"></i>' //female
        }
    }
}





