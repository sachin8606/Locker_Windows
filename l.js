var len = 0;
var table = document.getElementById("table");
const fs = require('fs');
const { dialog } = require('electron').remote;
var cre = require('./env');
var fileData = [];

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            updateRecord(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

document.getElementById("loginBtn").addEventListener('click', checkLogin);

function checkLogin() {
    var lname = document.getElementById("askName").value;
    var lpass = document.getElementById("askPass").value;
    if (lname == '' || lpass == '') {
        dialog.showErrorBox('Empty', "Enter Login Details First");
    }
    else if (lname !== cre.name || lpass !== cre.pass) {
        dialog.showErrorBox("Incorrect Information", "Incorrect Credentials");
    }
    else if (lname == cre.name && lpass == cre.pass) {
        document.getElementById("askAboutLogin").style.display = "none";
        document.getElementById("mainContainData").style.display = "block";
    }
}

function copyToCB(pass) {
    try {
        navigator.clipboard.writeText(pass);
        showAlert('Password copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

function updateRecord(response) {
    fileData = JSON.parse(response)
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = `<span class="tableHeadings">S.No.</span>`;
    cell2.innerHTML = `<span class="tableHeadings">For</span>`;
    cell3.innerHTML = `<span class="tableHeadings">Password</span>`;
    cell4.innerHTML = `<span class="tableHeadings">Added on</span>`;
    cell5.innerHTML = `<span class="tableHeadings">Delete</span>`;
    for (let i = 0; i < fileData.length; i++) {
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        let pw = `'${fileData[i].password}'`;
        cell1.innerHTML = i + 1;
        cell2.innerHTML = fileData[i].name;
        cell3.innerHTML =`<img src="./copy_wh.png" alt="copy" style="margin-left:10px;cursor:pointer" width=20 height=20 onclick="copyToCB(${pw})"/>`;
        cell5.innerHTML = `<button class="deleteBtn" onClick="deleteRecord(${i})">Delete</button>`;
        cell4.innerHTML = fileData[i].date;
        len++;
    }
    //    delefunc();
}

function showAlert(message) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = 'alert';
    alert.textContent = message;

    // Append alert to the body
    document.body.appendChild(alert);

    // Show the alert with animation
    requestAnimationFrame(() => {
        alert.classList.add('show');
    });

    // Remove the alert after 3 seconds
    setTimeout(() => {
        alert.classList.remove('show');
        alert.addEventListener('transitionend', () => {
            document.body.removeChild(alert);
        });
    }, 3000);
}



//usage:
readTextFile("./file.json");

async function addrow() {
    var nameInput = document.getElementById("name");
    var passInput = document.getElementById("password");
    var name = nameInput.value;
    var password = passInput.value;
    if (name == '' || password == '') {
        dialog.showErrorBox('Empty Fields', "Enter Credentials First");
    }
    else {
        var on = new Date();
        on = on.toLocaleDateString();
        data = {
            "name": name,
            "password": password,
            "date": on
        }
        fileData.push(data);
        await fs.writeFile('./file.json', JSON.stringify(fileData), (err) => {
            if (err)
                throw err;
            readTextFile("./file.json");
            table.innerHTML = '';
            nameInput.value = '';
            passInput.value = '';
        })
    }
}

document.getElementById("addrow").addEventListener('click', addrow);


// Delete Row

function deleteRecord(index) {
    fileData.map((item, i) => {
        if (index === i) {
            fileData.splice(i, 1);
            fs.writeFile("./file.json", JSON.stringify(fileData), (err) => {
                if (err)
                    throw err;
                readTextFile("./file.json");
                table.innerHTML = '';
            })
        }
    })

}
