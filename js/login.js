function sendData(){

    const myRequest = new XMLHttpRequest();

    const loginFormData = new FormData(loginForm);

    var loginFormObject = {};

    loginFormData.forEach((value, key) => loginFormObject[key] = value);

    var loginFormDataJSON = JSON.stringify(loginFormObject);

    myRequest.addEventListener("load", (event) =>
    {

        window.location.href = "schedule.html";

    });

    myRequest.addEventListener("error", (event) =>
    {

        document.getElementById("loginFailedSpan").innerHTML = "Login failed.";

    });

    myRequest.open("POST", "/api/login.php");

    myRequest.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    myRequest.send(loginFormDataJSON);

}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) =>
{

    event.preventDefault();

    sendData();

});