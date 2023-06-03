/* $db_username: 'db' / $db_pwd: 'KZXyk.N@JHc3gPu' / $db_name: 'ContactDatabase' */

/* create database ContactDatabase; */

USE ContactDatabase;

CREATE TABLE IF NOT EXISTS `users`
(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(50) NOT NULL DEFAULT '',
    `Password` VARCHAR(50) NOT NULL DEFAULT '',
    `DateLastLoggedIn` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `contact`
(
    `ID` INT NOT NULL AUTO_INCREMENT,
    `FirstName` VARCHAR(50) NOT NULL DEFAULT '',
    `LastName` VARCHAR(50) NOT NULL DEFAULT '',
    `Email` VARCHAR(50) NOT NULL DEFAULT '',
    `PhoneNumber` VARCHAR(50) NOT NULL DEFAULT '',
    `Linkedin` VARCHAR(100) NOT NULL DEFAULT '',
    `UserID` INT,
    PRIMARY KEY (`ID`),
    FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`)
) ENGINE = InnoDB;

INSERT INTO `users` (`Email`, `Password`)
VALUES
    ('first1.last1@example.com', 'password1'),
    ('first2.last2@example.com', 'password2'),
    ('first3.last3@example.com', 'password3'),
    ('first4.last4@example.com', 'password4'),
    ('first5.last5@example.com', 'password5'),
    ('first6.last6@example.com', 'password6'),
    ('first7.last7@example.com', 'password7'),
    ('first8.last8@example.com', 'password8'),
    ('first9.last9@example.com', 'password9'),
    ('first10.last10@example.com', 'password10'),
    ('first11.last11@example.com', 'password11'),
    ('first12.last12@example.com', 'password12'),
    ('first13.last13@example.com', 'password13'),
    ('first14.last14@example.com', 'password14'),
    ('first15.last15@example.com', 'password15');

INSERT INTO `contact` (`FirstName`, `LastName`, `PhoneNumber`, `Email`, `Linkedin`, `UserID`)
VALUES
    ('First1', 'Last1', '000000001', 'first1.last1@example.com', 'https://www.linkedin.com/in/first1last1', 1),
    ('First2', 'Last2', '000000002', 'first2.last2@example.com', 'https://www.linkedin.com/in/first2last2', 2),
    ('First3', 'Last3', '000000003', 'first3.last3@example.com', 'https://www.linkedin.com/in/first3last3', 3),
    ('First4', 'Last4', '000000004', 'first4.last4@example.com', 'https://www.linkedin.com/in/first4last4', 4),
    ('First5', 'Last5', '000000005', 'first5.last5@example.com', 'https://www.linkedin.com/in/first5last5', 5),
    ('First6', 'Last6', '000000006', 'first6.last6@example.com', 'https://www.linkedin.com/in/first6last6', 6),
    ('First7', 'Last7', '000000007', 'first7.last7@example.com', 'https://www.linkedin.com/in/first7last7', 7),
    ('First8', 'Last8', '000000008', 'first8.last8@example.com', 'https://www.linkedin.com/in/first8last8', 8),
    ('First9', 'Last9', '000000009', 'first9.last9@example.com', 'https://www.linkedin.com/in/first9last9', 9),
    ('First10', 'Last10', '000000010', 'first10.last10@example.com', 'https://www.linkedin.com/in/first10last10', 10),
    ('First11', 'Last11', '0000000011', 'first11.last11@example.com', 'https://www.linkedin.com/in/first11last11', 11),
    ('First12', 'Last12', '0000000012', 'first12.last12@example.com', 'https://www.linkedin.com/in/first12last12', 12),
    ('First13', 'Last13', '0000000013', 'first13.last13@example.com', 'https://www.linkedin.com/in/first13last13', 13),
    ('First14', 'Last14', '0000000014', 'first14.last14@example.com', 'https://www.linkedin.com/in/first14last14', 14),
    ('First15', 'Last15', '0000000015', 'first15.last15@example.com', 'https://www.linkedin.com/in/first15last15', 15);
