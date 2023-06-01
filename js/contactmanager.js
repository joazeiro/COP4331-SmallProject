import { url } from "./sharedVariables.js";
import { CookieManager } from "./cookiemanager.js";

const addContactForm = document.getElementById("addContactForm");
const addContactResult = document.getElementById("addContactResult");
const addContactModal = document.getElementById("addContactModal");
const editContactModal = document.getElementById("editContactModal");
let editId = -1;
const deleteContactModal = document.getElementById("deleteContactModal");
const contactTable = document.getElementById("contactTable");

document.addEventListener("DOMContentLoaded", onDocumentLoad, false);

document.getElementById("logoutButton").onclick = () => logout();
document.getElementById("openAddModalButton").onclick = () => addContactModal.style.display = "block";
document.getElementById("addContactClose").onclick = () => addContactModal.style.display = "none";
document.getElementById("editContactClose").onclick = () => editContactModal.style.display = "none";
document.getElementById("deleteContactClose").onclick = () => deleteContactModal.style.display = "none";
document.getElementById("deleteCancelButton").onclick = () => deleteContactModal.style.display = "none";
document.getElementById("deleteConfirmButton").onclick = () => deleteContact();
document.getElementById("searchButton").onclick = () => searchContact();

function onDocumentLoad() {
    // CookieManager.read();
    // document.getElementById("username").innerHTML = `${CookieManager.firstName} ${CookieManager.lastName}`;
    addRow({ firstName: "Rick", lastName: "Leinecker", email: "myemail@email.com", phone: "999-999-9999", linkedin: "www.google.com", Id: "1", dateCreated: "5/31/23" });
}

function logout() {
    CookieManager.clear();
    window.location.href = `${url}/login.html`;
}

function addContact() {
    const addContactFormData = new FormData(addContactForm);
    const addContactFormObject = {};
    addContactFormData.forEach((value, key) => addContactFormObject[key] = value);
    addContactFormObject["user_ID"] = CookieManager.userID;
    const addContactFormDataJSON = JSON.stringify(addContactFormObject);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/api/create_contact.php`, true);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        myRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);
                addContactResult.innerHTML = jsonObject.message;
            }
        };
        myRequest.send(addContactFormDataJSON);
    } catch (error) {
        addContactResult.innerHTML = error.message;
    }
}

function searchContact() {
    const query = document.getElementById("searchText").value;
    const tmp = { user_ID: CookieManager.userID, search_criteria: query };
    const jsonPayload = JSON.stringify(tmp);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/api/search_contact.php`);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        for (let i = 1; i < contactTable.getElementsByTagName("tr").length; i++) {
            contactTable.deleteRow(i);
        }

        myRequest.onreadystatechange = function() {
            if (myRequest.readyState == 4 && myRequest.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);
                jsonObject.results.forEach(o => {
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
    const firstNameCell = myRow.insertCell(0);
    firstNameCell.innerHTML = o.firstName;
    const lastNameCell = myRow.insertCell(1);
    lastNameCell.innerHTML = o.lastName;
    const emailCell = myRow.insertCell(2);
    emailCell.innerHTML = o.email;
    const phoneCell = myRow.insertCell(3);
    phoneCell.innerHTML = o.phone;
    const linkedinCell = myRow.insertCell(4);
    linkedinCell.innerHTML = o.linkedin;
    const idCell = myRow.insertCell(5);
    idCell.innerHTML = o.Id;
    const dateCreatedCell = myRow.insertCell(6);
    dateCreatedCell.innerHTML = o.dateCreated;
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
    const cells = row.getElementsByTagName("td"];
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
    editContactFormObject["user_ID"] = CookieManager.userID;
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
    const cells = row.getElementsByTagName("td"];
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
    const deleteObject = { id: document.getElementById("deleteContactId").innerHTML, user_ID: CookieManager.userID };
    const deleteObjectJSON = JSON.stringify(deleteObject);
    let url = "";
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/api/delete_contact.php`, true);
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
}

editContactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    editContact();
});

addContactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    addContact();
});