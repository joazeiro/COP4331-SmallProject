import { Contact } from "./contact.js";

export function readCookie()
{

    let myContact = new Contact();

    let cookie = document.cookie;

    let splitCookie = cookie.split(",");

    for(var i = 0; i < splitCookie.length; i++)
    {

        let currentEntry = splitCookie[i].trim();

        let tokens = currentEntry.split("=");

        switch(tokens[0])
        {

            case "firstName":
            {

                myContact.firstName = tokens[1];

            }

            case "lastName":
            {

                myContact.lastName = tokens[1];

            }

            case "userID":
            {

                myContact.userID = parseInt(tokens[1].trim());

            }

            case "email":
            {

                myContact.email = tokens[1];

            }

            case "phoneNumber":
            {

                myContact.phoneNumber = tokens[1];

            }

        }

    }

    if(myContact.userID < 0)
    {

        window.location.href = "login.html"

        return new Contact();

    }

    else
    {

        return myContact;

    }

}

export function saveCookie(myContact)
{

    //20 Minute Lifespan

    let lifespan = 1200000;

    let expirationDate = new Date();

    expirationDate.setTime(expirationDate.getTime() + lifespan);

    document.cookie = 
    `firstName=${myContact.firstName},` + 
    `lastName=${myContact.lastName},` +
    `userID=${myContact.userID},` +
    `path=/,` +
    `expires=${expirationDate}`;

}

export function clearCookie()
{

    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

}