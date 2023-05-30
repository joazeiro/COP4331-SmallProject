import { url } from "./sharedVariables.js";

function sendData(){

    const registrationFormData = new FormData(registrationForm);

    var registrationFormObject = {};

    registrationFormData.forEach((value, key) => registrationFormObject[key] = value);

    var registrationFormDataJSON = JSON.stringify(registrationFormObject);

    const myRequest = new XMLHttpRequest();

    myRequest.open("POST", `${url}/api/sign_up.php`);

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    try{

        myRequest.onreadystatechange = () =>
        {

            if(this.readyState == 4 && this.status == 200)
            {

                let jsonObject = myRequest.responseText;

                if(jsonObject.info == "Success")
                {

                    document.getElementById("registrationResult") = "Registered successfully.";

                }

                else
                {

                    document.getElementById("registrationResult").innerHTML = `\"${registrationFormData["login"]}\" is already registered.`;

                }

            }

            else
            {

                document.getElementById("registrationResult").innerHTML = "Failed to register.";

            }

        }

        alert(registrationFormDataJSON);

        myRequest.send(registrationFormDataJSON);

    }
    catch(error)
    {

        document.getElementById("registrationResult").innerHTML = error.message;

    }

}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", (event) =>
{

    event.preventDefault();

    sendData();

});