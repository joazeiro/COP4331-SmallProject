export class CookieManager {
    static ID = -1;
    static Email = "";
    static Password = "";
    static #lifespan = 1200000;

    static read() {
        const cookie = document.cookie;
        const splitCookie = cookie.split(";");

        for (let i = 0; i < splitCookie.length; i++) {
            const currentEntry = splitCookie[i].trim();
            const tokens = currentEntry.split("=");

            switch (tokens[0]) {
                case "ID":
                    this.ID = parseInt(tokens[1].trim());
                    break;
                case "Email":
                    this.Email = tokens[1];
                    break;
                case "Password":
                    this.Password = tokens[1];
                    break;
            }
        }

        if (this.ID < 0 && window.location.pathname !== "/html/login.html") {
            window.location.href = "../html/login.html";
        }
    }

    static save() {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + CookieManager.#lifespan);
    
        document.cookie = `ID=${this.ID}; path=/; expires=${expirationDate.toUTCString()}`;
        document.cookie = `Email=${this.Email}; path=/; expires=${expirationDate.toUTCString()}`;
        document.cookie = `Password=${this.Password}; path=/; expires=${expirationDate.toUTCString()}`;
    }

    static clear() {
        this.ID = -1;
        this.Email = "";
        this.Password = "";
        document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}