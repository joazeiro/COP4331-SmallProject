<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = get_info();
$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$connect_db = new mysqli("localhost", $db_username, $db_pwd, $db_name);

// Check if the connection was successful
if ($connect_db->connect_error) {
    $error = '{"error":"Failed to connect to the database"}';
    header('Content-type: application/json');
    echo $error;
    exit();
}

$email = isset($data["login"]) ? htmlspecialchars($data["login"]) : null;
$password = isset($data["password"]) ? htmlspecialchars($data["password"]) : null;

if ($email == null || $password == null) {
    $error = '{"error":"Email and Password are required fields"}';
    header('Content-type: application/json');
    echo $error;
    exit();
}

// Check if a user with the same email already exists
$check_query = "SELECT * FROM users WHERE Email = '$email'";
$check_result = $connect_db->query($check_query);

if ($check_result->num_rows > 0) {
    $error = '{"error":"User with the same email already exists"}';
    header('Content-type: application/json');
    echo $error;
} else {
    $firstName = isset($data["firstName"]) ? htmlspecialchars($data["firstName"]) : null;
    $lastName = isset($data["lastName"]) ? htmlspecialchars($data["lastName"]) : null;

    var_dump($email);
    var_dump($password);
    var_dump($firstName);
    var_dump($lastName);

    $my_query = "INSERT INTO contact (Email, Password, FirstName, LastName) VALUES ('$email', '$password', '$firstName', '$lastName')";
    $query_result = $connect_db->query($my_query);

    if ($query_result === TRUE) {
        $success = '{"info":"Success"}';
        header('Content-type: application/json');
        echo $success;
    } else {
        $error = 'Registration failed: ' . $connect_db->error;
        $error_pretty = '{"error":"' . $error . '"}';
        header('Content-type: application/json');
        echo $error_pretty;
    }
}

$connect_db->close();

function get_info()
{
    return json_decode(file_get_contents('php://input'), true);
}

?>