export class CookieManager
{

    static firstName = "";

    static lastName = "";

    static userID = -1;

    static #lifespan = 1200000;

    static #loginURL = "/login.html";

    static read()
    {

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
    
                    this.firstName = tokens[1];
    
                }
    
                case "lastName":
                {
    
                    this.lastName = tokens[1];
    
                }
    
                case "userID":
                {
    
                    this.userID = parseInt(tokens[1].trim());
    
                }
    
            }
    
        }
    
        if(this.userID < 0 && window.location.pathname != this.#loginURL)
        {

            window.location.href = CookieManager.#loginURL;

        }

    }

    static save()
    {
        
        let expirationDate = new Date();

        expirationDate.setTime(expirationDate.getTime() + CookieManager.#lifespan);

        document.cookie = 
        `firstName=${myCookie.firstName},` + 
        `lastName=${myCookie.lastName},` +
        `userID=${myCookie.userID},` +
        `path=/,` +
        `expires=${expirationDate}`;

    }

    static clear()
    {

        this.firstName = "";

        this.lastName = "";

        this.userID = -1;

        document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";

    }

}