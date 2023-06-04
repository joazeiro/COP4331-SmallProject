<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents('php://input'), true);

$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$db_connection = new mysqli("localhost", $db_username, $db_pwd, $db_name);

if ($db_connection->connect_error) {
    $message = '{"message":"' . $db_connection->connect_error . '"}';
    header('Content-type: application/json');
    echo $message;
} else {
    var_dump($data);
    $sql = sprintf(
        "INSERT INTO contact (FirstName, LastName, PhoneNumber, Email, Linkedin, User_ID) 
         VALUES ('%s', '%s', '%s', '%s', '%s', %d);",
        htmlspecialchars($data["FirstName"]),
        htmlspecialchars($data["LastName"]),
        htmlspecialchars($data["PhoneNumber"]),
        htmlspecialchars($data["Email"]),
        htmlspecialchars($data["Linkedin"]),
        $data["User_ID"]
    );
    var_dump($sql);
    if ($db_connection->query($sql) === TRUE) {
        $message = '{"message":"Contact added successfully"}';
        header('Content-type: application/json');
        echo $message;
    } else {
        $message = '{"message":"Failed to insert into contact table"}';
        header('Content-type: application/json');
        echo $message;
    }

    $db_connection->close();
}
?>
