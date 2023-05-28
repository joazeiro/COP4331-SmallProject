import { Contact } from "./contact.js";
import { readCookie, saveCookie } from "./cookiemanager.js";

let myContact = new Contact;

document.addEventListener("DOMContentLoaded", onDocumentLoad(), false)

function onDocumentLoad()
{

    readCookie();

    myContact.firstName = "OGEYRAT";

    alert(myContact);

}