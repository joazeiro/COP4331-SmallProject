import { CookieManager } from './cookiemanager.js';
import { url } from './sharedVariables.js';
document.addEventListener("DOMContentLoaded", onDocumentLoad, false);

var addContactForm = null;
var addContactModal = null;
var addContactResult = null;
var editContactModal = null;
var editContactForm = null;
var deleteContactModal = null;
var contactTable = null;
var logoutButton = null;
var openAddModalButton = null;
var addContactClose = null;
var editContactClose = null;
var deleteContactClose = null;
var deleteConfirmButton = null;
var searchButton = null;
let editId = -1;

function onDocumentLoad() {
    // CookieManager.read();
    addContactForm = document.getElementById("addContactForm");
    editContactForm = document.getElementById("editContactForm"); 
    addContactResult = document.getElementById("addContactResult");
    addContactModal = document.getElementById("addContactModal");
    editContactModal = document.getElementById("editContactModal");
    deleteContactModal = document.getElementById("deleteContactModal");
    contactTable = document.getElementById("contactTable");
    searchContact(); // populate contacts

    if(editContactForm != null){
        editContactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            editContact();
        });
    }

    if(addContactForm != null){
        addContactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            addContact();
            searchContact();
        });
    }

    logoutButton = document.getElementById("logoutButton");
    if(logoutButton != null){
        logoutButton.onclick = () => logout();
    }

    openAddModalButton = document.getElementById("openAddModalButton")
    if(openAddModalButton != null){
        openAddModalButton.onclick = () => addContactModal.style.display = "block";
    }

    addContactClose = document.getElementById("addContactClose")
    if(addContactClose != null){
        addContactClose.onclick = () => addContactModal.style.display = "none";
    }
    
    editContactClose = document.getElementById("editContactClose")
    if(editContactClose != null){
        editContactClose.onclick = () => editContactModal.style.display = "none";
    }

    deleteContactClose = document.getElementById("deleteContactClose");
    if(deleteContactClose != null){
        deleteContactClose.onclick = () => deleteContactModal.style.display = "none";
    }

    var deleteCancelButton = document.getElementById("deleteCancelButton");
    if(deleteCancelButton != null){
        deleteCancelButton.onclick = () => deleteContactModal.style.display = "none";
    }
    
    deleteConfirmButton = document.getElementById("deleteConfirmButton");
    if(deleteConfirmButton != null){
        deleteConfirmButton.onclick = () => deleteContact();
    }

    searchButton = document.getElementById("searchButton")
    if(searchButton != null){
        searchButton.onclick = () => searchContact();
    }

    //addRow({FirstName: "Rick", LastName: "Leinecker", Email: "myemail@email.com", PhoneNumber: "999-999-9999", Linkedin: "www.google.com", Id: "1", CreationDate: formattedDate()});
    
}

function logout() {
    CookieManager.clear();
    window.location.href = `${url}/html/login.html`;
}

function addContact() {
    const addContactFormData = new FormData(addContactForm);
    const addContactFormObject = {};
    const IDCookie = getCookie("ID");
    addContactFormObject["ID"] = IDCookie;
    addContactFormData.forEach((value, key) => addContactFormObject[key] = value);
    const addContactFormDataJSON = JSON.stringify(addContactFormObject);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/php/create_contact.php`, true);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        myRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);
                if (jsonObject.success) {
                    addContactResult.innerHTML = jsonObject.message;
                    searchContact();
                } else {
                    addContactResult.innerHTML = jsonObject.message;
                }
            }
        };
        myRequest.send(addContactFormDataJSON);
    } catch (error) {
        addContactResult.innerHTML = error.message;
    }
}

function searchContact() {
    const query = document.getElementById("searchText").value;
    const tmp = { ID: getCookie("ID"), search_criteria: query};
    const jsonPayload = JSON.stringify(tmp);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/php/search_contact.php`);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        while (contactTable.rows.length > 1) {
            contactTable.deleteRow(1);
        }

        myRequest.onreadystatechange = function() {
            if (myRequest.readyState == 4 && myRequest.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);
                const results = jsonObject.results.slice(0, 10); // Limit the results to 10 elements
                results.forEach(o => {
                    addRow(o);
                });
            }
        };
        myRequest.send(jsonPayload);
    } catch (error) {
        document.getElementById("searchContactResult") = error.message;
    }
}

function addRow(o) {
    const myRow = contactTable.insertRow();
    const FirstNameCell = myRow.insertCell(0);
    FirstNameCell.innerHTML = o.FirstName;
    const LastNameCell = myRow.insertCell(1);
    LastNameCell.innerHTML = o.LastName;
    const EmailCell = myRow.insertCell(2);
    EmailCell.innerHTML = o.Email;
    const PhoneCell = myRow.insertCell(3);
    PhoneCell.innerHTML = o.PhoneNumber;
    const LinkedinCell = myRow.insertCell(4);
    LinkedinCell.innerHTML = o.Linkedin;
    const IDCell = myRow.insertCell(5);
    IDCell.innerHTML = o.ID;
    const creationDateCell = myRow.insertCell(6);
    creationDateCell.innerHTML = o.CreationDate;
    const editButtonCell = myRow.insertCell(7);
    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.innerHTML = "Edit";
    editButton.className = "button";
    editButton.onclick = () => openEditModal(editButton.parentNode.parentNode.rowIndex);
    editButtonCell.appendChild(editButton);
    const deleteButtonCell = myRow.insertCell(8);
    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "button";
    deleteButton.onclick = () => openDeleteModal(deleteButton.parentElement.parentElement.rowIndex);
    deleteButtonCell.appendChild(deleteButton);
}

function openEditModal(i) {
    const row = contactTable.getElementsByTagName("tr")[i];
    const cells = row.getElementsByTagName("td");
    document.getElementById("editFirstName").value = cells[0].innerHTML;
    document.getElementById("editLastName").value = cells[1].innerHTML;
    document.getElementById("editEmail").value = cells[2].innerHTML;
    document.getElementById("editPhone").value = cells[3].innerHTML;
    document.getElementById("editLinkedin").value = cells[4].innerHTML;
    editId = cells[5].innerHTML;
    editContactModal.style.display = "block";
}

function editContact() {
    const editContactFormData = new FormData(editContactForm);
    const editContactFormObject = {};
    editContactFormData.forEach((value, key) => editContactFormObject[key] = value);
    editContactFormObject["ID"] = getCookie("ID");
    editContactFormObject["ID"] = editId;
    const editContactFormDataJSON = JSON.stringify(editContactFormObject);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/api/edit_contact.php`, true);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        myRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);
                addContactResult.innerHTML = jsonObject.message;
            }
        };
        myRequest.send(editContactFormDataJSON);
    } catch (error) {
        addContactResult.innerHTML = error.message;
    }
}

function openDeleteModal(i) {
    const row = contactTable.getElementsByTagName("tr")[i];
    const cells = row.getElementsByTagName("td");
    document.getElementById("deleteContactFirstName").innerHTML = cells[0].innerHTML;
    document.getElementById("deleteContactLastName").innerHTML = cells[1].innerHTML;
    document.getElementById("deleteContactEmail").innerHTML = cells[2].innerHTML;
    document.getElementById("deleteContactPhone").innerHTML = cells[3].innerHTML;
    document.getElementById("deleteContactLinkedin").innerHTML = cells[4].innerHTML;
    document.getElementById("deleteContactId").innerHTML = cells[5].innerHTML;
    document.getElementById("deleteContactDateCreated").innerHTML = cells[6].innerHTML;
    deleteContactModal.style.display = "block";
}

function deleteContact() {
    const deleteObject = {CreationDate: document.getElementById("deleteContactDateCreated").innerHTML};
    const deleteObjectJSON = JSON.stringify(deleteObject);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/php/delete_contact.php`, true);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        myRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);
                document.getElementById("deleteContactResult").innerHTML = jsonObject.message;
            }
        };
        myRequest.send(deleteObjectJSON);
    } catch (error) {
        deleteContactResult.innerHTML = error.message;
    }
    searchContact(); // populate contacts
};

function getCookie(cookieName) {
    const name = cookieName + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for(let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    
    return "";
  }