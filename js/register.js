function sendData() {
    const registrationForm = document.getElementById("registrationForm");
    const registrationFormData = new FormData(registrationForm);
    const registrationFormObject = {};
    registrationFormData.forEach((value, key) => (registrationFormObject[key] = value));
    const registrationFormDataJSON = JSON.stringify(registrationFormObject);
    const myRequest = new XMLHttpRequest();
    myRequest.open("POST", `${url}/api/register.php`);
    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try {
        myRequest.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const jsonObject = JSON.parse(myRequest.responseText);

                if (jsonObject.info == "Success") {
                    document.getElementById("registrationResult").innerHTML = "Registered successfully.";
                } else {
                    document.getElementById("registrationResult").innerHTML = `"${registrationFormData.get("login")}" is already registered.`;
                }
            } else {
                document.getElementById("registrationResult").innerHTML = "Failed to register.";
            }
        };

        myRequest.send(registrationFormDataJSON);
    } catch (error) {
        document.getElementById("registrationResult").innerHTML = error.message;
    }
}

const registrationForm = document.getElementById("registrationForm");

registrationForm.addEventListener("submit", event => {
    event.preventDefault();
    sendData();
});
