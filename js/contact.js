export class Contact
{

    firstName;

    lastName;

    email;

    phone;

    linkedin;

    dateCreated;

    id;

    constructor(firstName="", lastName="", email="", phone="", linkedin="", dateCreated="", id="")
    {

        this.firstName = firstName;

        this.lastName = lastName;
        
        this.email = email;

        this.phone = phone;

        this.linkedin = linkedin;

        this.dateCreated = dateCreated;

        this.id = id;

    }

};