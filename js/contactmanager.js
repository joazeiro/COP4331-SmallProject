import { url } from "./sharedVariables.js";

import { CookieManager } from "./cookiemanager.js";

var addContactForm = document.getElementById("addContactForm");

var addContactResult = document.getElementById("addContactResult");

var addContactModal = document.getElementById("addContactModal");

var editContactModal = document.getElementById("editContactModal");

var editId = -1;

var deleteContactModal = document.getElementById("deleteContactModal");

var contactTable = document.getElementById("contactTable");

document.addEventListener("DOMContentLoaded", onDocumentLoad(), false);

document.getElementById("logoutButton").onclick = () => logout();

document.getElementById("openAddModalButton").onclick = () => addContactModal.style.display = "block";

document.getElementById("addContactClose").onclick = () => addContactModal.style.display = "none";

document.getElementById("editContactClose").onclick = () => editContactModal.style.display = "none";

document.getElementById("deleteContactClose").onclick = () => deleteContactModal.style.display = "none";

document.getElementById("deleteCancelButton").onclick = () => deleteContactModal.style.display = "none";

document.getElementById("deleteConfirmButton").onclick = () => deleteContact();

document.getElementById("searchButton").onclick = () => searchContact();

function onDocumentLoad()
{

    CookieManager.read();

    document.getElementById("username").innerHTML = `${CookieManager.firstName} ${CookieManager.lastName}`;

}

function logout()
{

    CookieManager.clear();

    window.location.href = `${url}/login.html`;

}

function addContact()
{

    const addContactFormData = new FormData(addContactForm);

    var addContactFormObject = {};

    addContactFormData.forEach((value, key) => addContactFormObject[key] = value);

    addContactFormObject["user_ID"] = CookieManager.userID;

    var addContactFormDataJSON = JSON.stringify(addContactFormObject);

    let myRequest = new XMLHttpRequest();

    myRequest.open("POST", `${url}/api/create_contact.php`, true);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {

        myRequest.onreadystatechange = () => 
        {

            if(this.readystate == 4 && this.status == 200)
            {

                let jsonObject = JSON.parse(myRequest.responseText);

                addContactResult.innerHTML = jsonObject.message;

            }

        }

        myRequest.send(addContactFormDataJSON);

    }
    catch(error)
    {

        addContactResult.innerHTML = error.message;

    }

}

function searchContact()
{

    var query = document.getElementById("searchText").value;

    let tmp = {user_ID:CookieManager.userID, search_criteria:query}
    
    let jsonPayload = JSON.stringify(tmp);

    let myRequest = new XMLHttpRequest();

    myRequest.open("POST", `${url}/api/search_contact.php`);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {

        for(var i = 1; i < contactTable.getElementsByTagName("tr").length; i++)
                {

                    contactTable.deleteRow(i);

                }

        myRequest.onreadystatechange = () =>
        {

            if(myRequest.readyState == 4 && myRequest.status == 200){

                let jsonObject = JSON.parse(myRequest.responseText);

                foreach(o in jsonObject.results)
                {

                   addRow(o);

                }

            }

        }

        myRequest.send(jsonPayload);

    }
    catch(error)
    {

        document.getElementById("searchContactResult") = error.message;

    }

}

function addRow(o)
{

    var myRow = contactTable.insertRow();

    var firstNameCell = myRow.insertCell(0);

    firstNameCell.innerHTML = o.firstName;

    var lastNameCell = myRow.insertCell(1);

    lastNameCell.innerHTML = o.lastName;

    var emailCell = myRow.insertCell(2);

    emailCell.innerHTML = o.email;

    var phoneCell = myRow.insertCell(3);

    phoneCell.innerHTML = o.phone;

    var linkedinCell = myRow.insertCell(4);

    linkedinCell.innerHTML = o.linkedin;

    var idCell = myRow.insertCell(5);

    idCell.innerHTML = o.ID;

    var dateCreatedCell = myRow.insertCell(6);

    dateCreatedCell.innerHTML = o.dateCreated;

    var editButtonCell = myRow.insertCell(7);

    var editButton = document.createElement("button");

    editButton.type = "button";

    editButton.innerHTML = "Edit";

    editButton.className = "button";

    editButton.onclick = () => openEditModal(editButton.parentNode.parentNode.rowIndex);

    editButtonCell.appendChild(editButton);

    var deleteButtonCell = myRow.insertCell(8);

    var deleteButton = document.createElement("button");

    deleteButton.type = "button";

    deleteButton.innerHTML = "Delete";

    deleteButton.className = "button";

    deleteButton.onclick = () => openDeleteModal(deleteButton.parentElement.parentElement.rowIndex);

    deleteButtonCell.appendChild(deleteButton);
    
}

function openEditModal(i)
{

    var row = contactTable.getElementsByTagName("tr")[i];

    var cells = row.getElementsByTagName("td");

    document.getElementById("editFirstName").value = cells[0].innerHTML;

    document.getElementById("editLastName").value = cells[1].innerHTML;

    document.getElementById("editEmail").value = cells[2].innerHTML;

    document.getElementById("editPhone").value = cells[3].innerHTML;

    document.getElementById("editLinkedin").value = cells[4].innerHTML;

    editId = cells[5].innerHTML;

    editContactModal.style.display = "block";

}

function editContact()
{

    const editContactFormData = new FormData(editContactForm);

    var editContactFormObject = {};

    editContactFormData.forEach((value, key) => editContactFormObject[key] = value);

    editContactFormObject["user_ID"] = CookieManager.userID;

    editContactFormObject["ID"] = editId;

    var editContactFormDataJSON = JSON.stringify(editContactFormObject);

    let myRequest = new XMLHttpRequest();

    myRequest.open("POST", `${url}/api/edit_contact.php`, true);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {

        myRequest.onreadystatechange = () => 
        {

            if(this.readystate == 4 && this.status == 200)
            {

                let jsonObject = JSON.parse(myRequest.responseText);

                addContactResult.innerHTML = jsonObject.message;

            }

        }

        myRequest.send(editContactFormDataJSON);

    }
    catch(error)
    {

        addContactResult.innerHTML = error.message;

    }

}

function openDeleteModal(i)
{

    var row = contactTable.getElementsByTagName("tr")[i];

    var cells = row.getElementsByTagName("td");

    document.getElementById("deleteContactFirstName").innerHTML = cells[0].innerHTML;

    document.getElementById("deleteContactLastName").innerHTML = cells[1].innerHTML;

    document.getElementById("deleteContactEmail").innerHTML = cells[2].innerHTML;

    document.getElementById("deleteContactPhone").innerHTML = cells[3].innerHTML;

    document.getElementById("deleteContactLinkedin").innerHTML = cells[4].innerHTML;

    document.getElementById("deleteContactId").innerHTML = cells[5].innerHTML;

    document.getElementById("deleteContactDateCreated").innerHTML = cells[6].innerHTML;

    deleteContactModal.style.display = "block";

}

function deleteContact()
{
    
    var deleteObject = {id: document.getElementById("deleteContactId").innerHTML, user_ID: CookieManager.userID};

    var deleteObjectJSON = JSON.stringify(deleteObject);

    let url="";

    let myRequest = new XMLHttpRequest();

    myRequest.open("POST", `${url}/api/delete_contact.php`, true);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try
    {

        myRequest.onreadystatechange = () => 
        {

            if(this.readystate == 4 && this.status == 200)
            {

                let jsonObject = JSON.parse(myRequest.responseText);

                document.getElementById("deleteContactResult").innerHTML = jsonObject.message;

            }

        }

        myRequest.send(deleteObjectJSON);

    }
    catch(error)
    {

        deleteContactResult.innerHTML = error.message;

    }

}

editContactForm.addEventListener("submit", (event) =>
{

    event.preventDefault();

    editContact();

});

addContactForm.addEventListener("submit", (event) =>
{

    event.preventDefault();

    addContact();

});