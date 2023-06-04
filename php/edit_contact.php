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

    $sql = "UPDATE contact SET 
                FirstName = '$firstName', 
                LastName = '$lastName', 
                Email = '$email', 
                PhoneNumber = '$phoneNumber', 
                Linkedin = '$linkedin' 
            WHERE ID = $id";

    if ($db_connection->query($sql) === true) {
        $response = array('message' => 'Updated');
    } else {
        $response = array('message' => 'Not Updated');
    }

    $db_connection->close();
}

header('Content-type: application/json');
echo json_encode($response);
?>
