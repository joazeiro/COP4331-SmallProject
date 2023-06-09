export class CookieManager {
    static FirstName = "";
    static LastName = "";
    static userID = -1;
    static #lifespan = 1200000;

    static read() {
        const cookie = document.cookie;
        const splitCookie = cookie.split(",");

        for (let i = 0; i < splitCookie.length; i++) {
            const currentEntry = splitCookie[i].trim();
            const tokens = currentEntry.split("=");

            switch (tokens[0]) {
                case "FirstName":
                    this.FirstName = tokens[1];
                    break;
                case "LastName":
                    this.LastName = tokens[1];
                    break;
                case "userID":
                    this.userID = parseInt(tokens[1].trim());
                    break;
            }
        }

        if (this.userID < 0 && window.location.pathname !== "/html/login.html") {
            window.location.href = "../html/login.html";
        }
    }

    static save() {
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + CookieManager.#lifespan);
        document.cookie =
            `FirstName=${this.FirstName},` +
            `LastName=${this.LastName},` +
            `userID=${this.userID},` +
            `path=/,` +
            `expires=${expirationDate}`;
    }

    static clear() {
        this.FirstName = "";
        this.LastName = "";
        this.userID = -1;
        document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}