import { Contact } from "./contact.js";
import { readCookie, saveCookie } from "./cookiemanager.js";

let myContact = new Contact();

const loginForm = document.getElementById("loginForm");

document.addEventListener("DOMContentLoaded", onDocumentLoad(), false);

function onDocumentLoad()
{

    readCookie();

}

function sendData(){

    myContact.firstName="Bruh";

    myContact.userID=1000;

    saveCookie(myContact);

    window.location.href = "contactmanager.html";

    return;

    const loginFormData = new FormData(loginForm);

    var loginFormObject = {};

    loginFormData.forEach((value, key) => loginFormObject[key] = value);

    var loginFormDataJSON = JSON.stringify(loginFormObject);

    const myRequest = new XMLHttpRequest();

    myRequest.open("POST", `http://127.0.0.1:5500/api/login.php`);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    try{

        myRequest.onreadystatechange = () =>
        {

            if(this.readystate == 4 && this.status == 200)
            {

                let jsonObject = JSON.parse(myRequest.responseText);

                myContact.userID = jsonObject.id;

                if(myContact.userID < 1){

                    document.getElementById("loginFailedSpan").innerHTML = "Incorrect username and password combination.";

                    return;

                }

                myContact.firstName = jsonObject.firstName;

                myContact.lastName = jsonObject.lastName;

                myContact.email = loginFormObject[email];

                saveCookie(myContact);

                window.location.href = "contactmanager.html";
        
            }

        }

        myRequest.send(loginFormDataJSON);

    }
    catch(err)
    {

        document.getElementById("loginFailedSpan").innerHTML = err.message;

    }

}

loginForm.addEventListener("submit", (event) =>
{

    myContact.userID = 0;

    myContact.firstName = "";

    myContact.lastName = "";

    event.preventDefault();

    sendData();

});