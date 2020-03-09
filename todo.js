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
    printItems();
    input.value = "";
}

input.addEventListener("keydown", function(x) {
    if (x.keyCode === 13 && input.value !== "") {
        let myItem = new toDoItem(input.value, "active");
        toDoItems.push(myItem);
        printItems();
        input.value = "";
    }
});


// Functions
function toDoItem(text, status) {
    this.text = text;
    this.status = status;
}

function printItems() {
    document.getElementById("Result").innerHTML = "";
    for (let i = 0; i < toDoItems.length; i++) {
        let checkBox = document.createElement('input');
        checkBox.type = "checkbox";
        let checkBoxText = document.createElement('label');
        checkBoxText.appendChild(document.createTextNode(toDoItems[i].text));
        let deleteButton = document.createElement('button');
        deleteButton.id = "delete-button";
        deleteButton.classList.add("boxclose")
        deleteButton.onclick = function() {
            toDoItems.splice(i, 1);
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
}
