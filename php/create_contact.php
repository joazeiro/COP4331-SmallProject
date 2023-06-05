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
    $email = htmlspecialchars($data["Email"]);
    $phone = htmlspecialchars($data["PhoneNumber"]);
    $linkedin = htmlspecialchars($data["Linkedin"]);
    $ID = $data["ID"];

    // Check if contact with the same email exists
    $checkEmailQuery = "SELECT * FROM contact WHERE Email = '$email' AND (`ID` = '" . $ID . "' OR `ID` IS NULL)";
    $emailResult = $db_connection->query($checkEmailQuery);
    if ($emailResult->num_rows > 0) {
        $message = '{"message":"A contact with the same email already exists"}';
        header('Content-type: application/json');
        echo $message;
        $db_connection->close();
        exit;
    }

    // Check if contact with the same phone number exists
    $checkPhoneQuery = "SELECT * FROM contact WHERE PhoneNumber = '$phone' AND (`ID` = '" . $ID . "' OR `ID` IS NULL)";
    $phoneResult = $db_connection->query($checkPhoneQuery);
    if ($phoneResult->num_rows > 0) {
        $message = '{"message":"A contact with the same phone number already exists"}';
        header('Content-type: application/json');
        echo $message;
        $db_connection->close();
        exit;
    }

    // Check if contact with the same LinkedIn profile exists
    $checkLinkedinQuery = "SELECT * FROM contact WHERE Linkedin = '$linkedin' AND (`ID` = '" . $ID . "' OR `ID` IS NULL)";
    $linkedinResult = $db_connection->query($checkLinkedinQuery);
    if ($linkedinResult->num_rows > 0) {
        $message = '{"message":"A contact with the same LinkedIn profile already exists"}';
        header('Content-type: application/json');
        echo $message;
        $db_connection->close();
        exit;
    }

    $sql = sprintf(
        "INSERT INTO contact (ID, FirstName, LastName, PhoneNumber, Email, Linkedin) 
         VALUES ('%d', '%s', '%s', '%s', '%s', '%s');",
        $data["ID"],
        htmlspecialchars($data["FirstName"]),
        htmlspecialchars($data["LastName"]),
        $phone,
        $email,
        $linkedin
    );
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
