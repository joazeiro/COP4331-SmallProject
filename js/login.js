import { CookieManager } from './cookiemanager.js';
import { url } from './sharedVariables.js';

// const {CookieManager} = require("./cookiemanager.js");
// const {url} = require('./sharedvariables.js'); 

var LoginForm = null;

document.addEventListener("DOMContentLoaded", onDocumentLoad, false);

function onDocumentLoad() {
    //CookieManager.read();

    LoginForm = document.getElementById("LoginForm");

    if(LoginForm != null){
        LoginForm.addEventListener("submit", (event) => {
            CookieManager.clear();
            event.preventDefault();
            sendData();
        });
    }

}

function sendData() {
    const LoginFormData = new FormData(LoginForm);
    const LoginFormObject = {};
    LoginFormData.forEach((value, key) => LoginFormObject[key] = value);
    const LoginFormDataJSON = JSON.stringify(LoginFormObject);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/php/login.php`);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        myRequest.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                console.log(myRequest.responseText)
                const jsonObject = JSON.parse(myRequest.responseText);
                CookieManager.userID = jsonObject.ID;

                if (CookieManager.userID < 1) {
                    document.getElementById("LoginStatus").innerHTML = "Incorrect username and password combination.";
                    return;
                }

                CookieManager.FirstName = jsonObject.FirstName;
                CookieManager.LastName = jsonObject.LastName;
                CookieManager.save();
                window.location.href = "../html/contactmanager.html";
            }
        };

        myRequest.send(LoginFormDataJSON); // {"Login":"parkercmcleod@gmail.com","Password":"ffdafasdf"}
    } catch (err) {
        document.getElementById("LoginStatus").innerHTML = err.message;
    }
}


