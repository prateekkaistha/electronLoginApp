const electron = require('electron');
const {ipcRenderer} =electron;
const ul = document.querySelector('ul');
var no = 0;
var listTobeSent = [];
var countOfFinal = 0;
var listAll = [];
var statusOfButtons = [];
var declared = [];
var stautsOfSEND = 0;
var all = 0;
var maxNoOfPilots = 5;
for(var i=0;i<maxNoOfPilots;i++)
{ 
 statusOfButtons[i] = 0;
 declared[i] = 0;
}
ipcRenderer.on('user:add',function(e,user){
        
    listAll[all++] = user;
    createNewButton(user);
    
 
    
});

document.getElementById("sendname").addEventListener("click", sendname);

document.getElementById("0").onclick = function() {clickfunction(0)};
document.getElementById("1").onclick = function() {clickfunction(1)};
document.getElementById("2").onclick = function() {clickfunction(2)};
document.getElementById("3").onclick = function() {clickfunction(3)};
document.getElementById("4").onclick = function() {clickfunction(4)};

function createNewButton(user){
/*
    var btn = document.createElement("BUTTON");
    btn.innerHTML = user[0];
    btn.id= "button-"+(no++);

    document.body.appendChild(btn);
    //document.getElementById("button-0").addEventListener("click", clickfunction(1));
*/
 if(no<=maxNoOfPilots)
 {
    declared[no]=1;
    document.getElementById(no++).innerHTML = user[0];
 }
 else
 {
    alert('You are not allowed by the devloper to register more then 4 pilots!!!!');
 }
}

function sendname(){
    if(countOfFinal==0)
    {
        alert("NO PILOTS FOR PERMIT !!!!!");
    }
    else 
    {
    stautsOfSEND = 1;
    document.getElementById("sendname").innerHTML= "NAMES SENT";
    document.getElementById("sendname").style = "background-color:green;color:white";
    ipcRenderer.send('listTobeSent:final',listTobeSent,countOfFinal);
    }   
}

function clickfunction(e)
{
 if(declared[e]==1)
    {
        console.log("Buttons was clicked : "+e);
        statusOfButtons[e]=!statusOfButtons[e];
    if(statusOfButtons[e]==1)
    {   document.getElementById(e).style = "background-color:yellow;color:black";
        listTobeSent[countOfFinal++]=listAll[e];
        const li = document.createElement('li');
        const nameText = document.createTextNode(listAll[e]);
        console.log(nameText);
        li.appendChild(nameText);
        ul.appendChild(li);
    }
    else
    {
        
    }
}
        
}

ul.addEventListener('dblclick',removename);

function removename(e){
    e.target.remove();
//console.log(e.target);
}
