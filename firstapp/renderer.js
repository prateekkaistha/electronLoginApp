const electron = require('electron');
const { ipcRenderer } = electron;

const form = document.querySelector('form');
form.addEventListener('submit',submitForm)

function submitForm(e){
    e.preventDefault();
 const name = document.querySelector('#name').value;
 const pass = document.querySelector('#pass').value;
 const user = [name,pass]
 console.log(user);
 ipcRenderer.send('user:add',user);
}
