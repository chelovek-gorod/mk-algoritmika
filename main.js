'use strict';

let storage = window.localStorage; //storage.clear();

const deskUserDiv = document.getElementById('deskUser');
const deskDataPopUpDiv = document.getElementById('deskDataPopUp');
const newNameInput = document.getElementById('newNameInput');

let desks = [];
let deskUsers = [];

class Desk {
    constructor(SVG, name) {
    this.SVG = SVG;
    this.name = name;
  }
}

let selectedDeskId = null;

function roomReady() {
    let roomSvg = document.getElementById("room").getSVGDocument();
    let desksSvgArr = roomSvg.getElementsByClassName("desk");
    
    const desksSvgArrSize = desksSvgArr.length;
    
    if (storage.getItem('deskUsersArr')) deskUsers = JSON.parse(storage.getItem('deskUsersArr'));
    if (deskUsers.length != desksSvgArr.length) {
        deskUsers = [];
        deskUsers.length = desksSvgArr.length;
    }
    
    console.log(deskUsers);
    
    for (let desk = 0; desk < desksSvgArrSize; desk++) {
        let id = desksSvgArr[desk].id;
        desksSvgArr[desk].addEventListener('click', function () { deskOnClick(id); });
        desks[id] = new Desk( desksSvgArr[desk], (deskUsers[id]) ? deskUsers[id] : '' );
        desksSvgArr[desk].setAttribute('fill', deskUsers[id] ? 'green' : 'white');
    }
    
    console.log(desks);
}

function deskOnClick(id) {
    if (selectedDeskId === id) {
        selectedDeskId = null;
        desks[id].SVG.setAttribute('fill', desks[id].name ? 'green' : 'white');
    } else {
        if (selectedDeskId) desks[selectedDeskId].SVG.setAttribute('fill', desks[selectedDeskId].name ? 'green' : 'white');
        selectedDeskId = id;
        desks[id].SVG.setAttribute('fill', 'yellow');
    }
    
    if (selectedDeskId === null) deskUserDiv.innerHTML = '<span>Парта не выбрана</span>';
    else if (desks[selectedDeskId].name === '') deskUserDiv.innerHTML = '<span>Парта пуста</span>';
    else deskUserDiv.innerHTML = desks[selectedDeskId].name;
}

function editDeskOnclick() {
    if (selectedDeskId) {
        deskDataPopUpDiv.style.display = 'flex';
        newNameInput.value = desks[selectedDeskId].name;
    }
}

function setName() {
    desks[selectedDeskId].name = deskUsers[selectedDeskId] = deskUserDiv.innerHTML = newNameInput.value.trim();
    storage.setItem('deskUsersArr', JSON.stringify(deskUsers));
    hidePopUp();
}

function hidePopUp() {
    deskDataPopUpDiv.style.display = 'none';
    console.log(desks);
}
