window.addEventListener("load", () => 
{

    function sendData(){

        const myRequest = new XMLHttpRequest();

        const loginFormData = new FormData(loginForm);

        myRequest.addEventListener("load", (event) =>
        {

            alert(event.target.responseText);

        });

        myRequest.open("POST", "/api/login.php");

        myRequest.send();

    }

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", (event) =>
    {

        event.preventDefault();

        sendData();

    });

});