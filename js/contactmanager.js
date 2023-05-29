import { Contact } from "./contact.js";
import { CookieManager } from "./cookiemanager.js";

var addContactForm = document.getElementById("addContactForm");

var addContactResult = document.getElementById("addContactResult");

var addContactModal = document.getElementById("addContactModal");

document.addEventListener("DOMContentLoaded", onDocumentLoad(), false);

document.getElementById("logoutButton").onclick = () => logout();

document.getElementById("openAddModalButton").onclick = () => addContactModal.style.display = "block";

document.getElementById("addContactClose").onclick = () => addContactModal.style.display = "none";

document.getElementById("searchButton").onclick = () => searchContact();

function onDocumentLoad()
{

    //CookieManager.read();

    //document.getElementById("username").innerHTML = `${CookieManager.firstName} ${CookieManager.lastName}`;

}

function logout()
{

    CookieManager.clear();

    window.location.href = "/login.html";

}

function addContact()
{

    const addContactFormData = new FormData(addContactForm);

    var addContactFormObject = {};

    addContactFormData.forEach((value, key) => addContactFormObject[key] = value);

    var addContactFormDataJSON = JSON.stringify(addContactFormObject);

    let url="/api/create_contact.php";

    let myRequest = new XMLHttpRequest();

    myRequest.open("POST", url, true);

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

    

}

function editContact()
{

    const addContactFormData = new FormData(addContactForm);

    var addContactFormObject = {};

    addContactFormData.forEach((value, key) => addContactFormObject[key] = value);

    var addContactFormDataJSON = JSON.stringify(addContactFormObject);

    let url="/api/edit_contact.php";

    let myRequest = new XMLHttpRequest();

    myRequest.open("POST", url, true);

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

addContactForm.addEventListener("submit", (event) =>
{

    event.preventDefault();

    addContact();

});