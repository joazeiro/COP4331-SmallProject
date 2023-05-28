const urlBase = 'http://parkercmcleod.com';
const extension = 'php';

let userId = 0;

function LogIn(){

    let username = document.getElementById("loginUsername").value;

    let password = document.getElementById("loginPassword").value;

    let temp = {db_username:username, db_password:password}

    let jsonPayload = JSON.stringify(tmp);

    let url = urlBase + '/login.' + extension;

    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

    try{

        xhr.onreadystatechange(() => 
        {

            if(this.readyState == 4 && this.status == 200){

                let response = JSON.parse(xhr.responseText);

                userId = response.id;


                if(userId < 1){

                    document.getElementById("loginResult").innerHTML = "Incorrect credentials";

                    return;

                }
                
            }

        });

        xhr.send(jsonPayload);

    }
    
    catch(error)
    {

        document.getElementById("loginResult").innerHTML = error.message;

    }

}