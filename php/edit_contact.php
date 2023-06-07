<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents('php://input'), true);

$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$db_connection = new mysqli("localhost", $db_username, $db_pwd, $db_name);

if ($db_connection->connect_error) {
    $response = array('message' => $db_connection->connect_error);
} else {
    $id = $data["ID"];
    $firstName = $db_connection->real_escape_string($data["FirstName"]);
    $lastName = $db_connection->real_escape_string($data["LastName"]);
    $email = $db_connection->real_escape_string($data["Email"]);
    $phoneNumber = $db_connection->real_escape_string($data["PhoneNumber"]);
    $linkedin = $db_connection->real_escape_string($data["Linkedin"]);

    $originalFirstName = $db_connection->real_escape_string($data["originalFirstName"]);
    $originalLastName = $db_connection->real_escape_string($data["originalLastName"]);
    $originalEmail = $db_connection->real_escape_string($data["originalEmail"]);
    $originalPhoneNumber = $db_connection->real_escape_string($data["originalPhoneNumber"]);
    $originalLinkedin = $db_connection->real_escape_string($data["originalLinkedin"]);

    $getCreationDate = "SELECT CreationDate FROM contact WHERE 
        (`FirstName` LIKE '%" . $originalFirstName . "%' 
        AND `LastName` LIKE '%" . $originalLastName . "%' 
        AND `PhoneNumber` LIKE '%" . $originalPhoneNumber . "%' 
        AND `Email` LIKE '%" . $originalEmail . "%' 
        AND `Linkedin` LIKE '%" . $originalLinkedin . "%') 
        AND (`ID` = '" . $id . "' OR `ID` IS NULL) 
        LIMIT 10;";

    $result = $db_connection->query($getCreationDate);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        $creationDate = $row['CreationDate'];

        echo $creationDate;
        
        $sql = "UPDATE contact SET 
            FirstName = '$firstName', 
            LastName = '$lastName', 
            Email = '$email', 
            PhoneNumber = '$phoneNumber', 
            Linkedin = '$linkedin' 
        WHERE CreationDate = '$creationDate'";

    if ($db_connection->query($sql) === true) {
        $response = array('message' => 'Updated');
    } else {
        $response = array('message' => 'Not Updated');
    }
    } else {
        $response = array('message' => 'Record Not Found');
    }

    $db_connection->close();
}

header('Content-type: application/json');
echo json_encode($response);
?>
