/* $db_username: 'db' / $db_pwd: 'KZXyk.N@JHc3gPu' / $db_name: 'ContactDatabase' */

/* create database ContactDatabase; */

use ContactDatabase;

CREATE TABLE `ContactDatabase`.`users`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `DateCreated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `DateLastLoggedIn` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Login` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Password` VARCHAR(50) NOT NULL DEFAULT '' ,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE `ContactDatabase`.`contact`
(
    `ID` INT NOT NULL AUTO_INCREMENT ,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `LastName` VARCHAR(50) NOT NULL DEFAULT '' ,
    `PhoneNumber` VARCHAR(50) NOT NULL DEFAULT '' ,
    `Email` VARCHAR(50) NOT NULL DEFAULT '' ,
    `StreetAddress` VARCHAR(100) NOT NULL DEFAULT '' ,
    `City` VARCHAR(50) NOT NULL DEFAULT '' ,
    `State` VARCHAR(50) NOT NULL DEFAULT '' ,
    `ZIP_Code` VARCHAR(50) NOT NULL DEFAULT '' ,
    `user_ID` INT NOT NULL DEFAULT '0' ,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`user_ID`) REFERENCES `ContactDatabase`.`users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

insert into users (FirstName,LastName,Login,Password) VALUES ('Christopher','Dugazon','ChrisD','admin');
insert into users (FirstName,LastName,Login,Password) VALUES ('Eduarda','Joazeiro','EduardaJ','admin');
insert into users (FirstName,LastName,Login,Password) VALUES ('Berkay','Arslan','BerkayA','admin');
insert into users (FirstName,LastName,Login,Password) VALUES ('Kandi','Brand','KandiB','admin');

insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Anna','Beach','8174689844','annabeach@aol.com','123 Naur Way','Alberta','Alabama','13577',1);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Charles','Downs','3905832828','charlesdowns@deep.com','3498 North Court','Bourne','Colorado','32049',2);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Earl','Fagin','1401330557','earlfagin@eep.com','4320 Smart Boulevard','Crooke','Delaware','34238',3);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Gina','Hall','3032965761','ginahall@gmail.com','3208 Young Drive','Diode','Florida','85933',4);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Ian','Jones','3429007682','ianjones@icloud.com','9321 East Park','Evermore','Georgia','57333',1);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Kelly','Leedy','8391904618','kellyleedy@kneed.com','3259 Faraday Way','Fuendo','Hawaii','95933',2);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Mary','Nore','3690240962','marynore@mazed.com','9498 West Park','Guesue','Idaho','59324',3);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Opal','Parrish','3727036438','opalparrish@orca.com','8532 Fern Avenue','Horseshoe','Kansas','53922',4);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Quisha','Rice','7053754609','quisharice@queen.com','3475 South Street','Ink','Louisiana','69434',1);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Sara','Tariff','7008229607','saratariff@south.com','3948 Lookout Court','Joyce','Maine','53929',2);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Uganda','Veron','4489864718','ugandaveron@url.com','8474 Meet Boulevard','Kandi','North Dakota','58343',3);
insert into contact (FirstName,LastName,PhoneNumber,Email,StreetAddress,City,State,ZIP_Code,user_ID) VALUES 
    ('Will','Xerox','2690420963','willxerox@windows.com','9793 Manhattan Road','Lewser','Ohio','59343',4);