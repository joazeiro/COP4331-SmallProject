export class Contact
{

    firstName;

    lastName;

    phoneNumber;

    email;

    userID;

    constructor(firstName="", lastName="", phoneNumber="", email="", userID=-1)
    {

        this.firstName = firstName;

        this.lastName = lastName;

        this.phoneNumber = phoneNumber;

        this.email = email;

        this.userID = userID;

    }

    ClearContact()
    {

        this.firstName = "";

        this.lastName = "";

        this.phoneNumber = "";

        this.email = "";

        this.userID = -1;

    }

};