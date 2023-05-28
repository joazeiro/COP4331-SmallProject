import { Contact } from "./contact.js";
import { readCookie, saveCookie, clearCookie } from "./cookiemanager.js";

let myContact = new Contact;

document.addEventListener("DOMContentLoaded", onDocumentLoad(), false)

function onDocumentLoad()
{

    myContact = readCookie();

}

function logOut()
{

    myContact.ClearContact();

    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

}