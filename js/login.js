import { url } from "./sharedVariables.js";

import { CookieManager } from "./cookiemanager.js";

const loginForm = document.getElementById("loginForm");

document.addEventListener("DOMContentLoaded", onDocumentLoad(), false);

function onDocumentLoad()
{

    CookieManager.read();

}

function sendData(){

    const loginFormData = new FormData(loginForm);

    var loginFormObject = {};

    loginFormData.forEach((value, key) => loginFormObject[key] = value);

    var loginFormDataJSON = JSON.stringify(loginFormObject);

    const myRequest = new XMLHttpRequest();

    myRequest.open("POST", `${url}/api/login.php`);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    try{

        myRequest.onreadystatechange = () =>
        {

            if(this.readystate == 4 && this.status == 200)
            {

                let jsonObject = JSON.parse(myRequest.responseText);

                CookieManager.userID = jsonObject.id;

                if(CookieManager.userID < 1){

                    document.getElementById("loginStatus").innerHTML = "Incorrect username and password combination.";

                    return;

                }

                CookieManager.firstName = jsonObject.firstName;

                CookieManager.lastName = jsonObject.lastName;

                CookieManager.save();

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

    CookieManager.clear();

    event.preventDefault();

    sendData();

});