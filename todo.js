// Variables
title = document.querySelector('h1');
nameButton = document.getElementById('change-name');
clearAllButton = document.getElementById('clear-all');
const input = document.querySelector('input');
let myDiv = document.getElementById('Result');
let toDoItems = [];

// The actual script part
nameButton.onclick = function() {
    let name = prompt("Enter your name");
    if (name === "" || name === null) {
        alert("User cancelled the operation.")
    } else {
        // TODO: does this local storage work like how i think it does?
        localStorage.setItem("name", name);
        title.innerHTML = localStorage.name + "'s to-do list";
    }
}

clearAllButton.onclick = function() {
    toDoItems.splice(0, toDoItems.length);
    myDiv.textContent = "";
    input.value = "";
}

input.addEventListener("keydown", function(x) {
    if (x.keyCode === 13 && input.value !== "") {
        let currentNumItems = toDoItems.length;
        let myItem = new toDoItem(input.value);
        toDoItems.push(myItem);
        printItems(currentNumItems);
        input.value = "";
    }
});


// Functions
function toDoItem(text) {
    this.text = text;
}

function printItems(currentNumItems) {
        let checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        let checkBoxText = document.createElement('label');
        checkBoxText.appendChild(document.createTextNode(toDoItems[currentNumItems].text));
        let deleteButton = document.createElement('button');
        deleteButton.classList.add("boxclose")
        deleteButton.onclick = function() {
            toDoItems.splice(currentNumItems, 1);
            myDiv.removeChild(checkBox);
            myDiv.removeChild(checkBoxText);
            myDiv.removeChild(deleteButton);
        };
        let newLine = document.createElement('p');
        myDiv.appendChild(checkBox);
        myDiv.appendChild(checkBoxText);
        myDiv.appendChild(deleteButton);
        myDiv.appendChild(newLine);
}
