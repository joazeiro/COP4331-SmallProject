<?php

$data = get_info();
$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$connect_db = new mysqli("localhost", $db_username, $db_pwd, $db_name);

// if this connect is not successful for some reason we have to catch that
if (!$connect_db->connect_error) {

    $email = htmlspecialchars($data["email"]);
    $password = htmlspecialchars($data["password"]);

    // Check if user with the same email already exists
    $check_query = "SELECT * FROM users WHERE Email = '$email'";
    $check_result = $connect_db->query($check_query);

    if ($check_result->num_rows > 0) {
        $error = '{"error":"User with the same email already exists"}';
        header('Content-type: application/json');
        echo $error;
    } else {
        $firstName = htmlspecialchars($data["firstName"]);
        $lastName = htmlspecialchars($data["lastName"]);
        $login = htmlspecialchars($data["login"]);
        $password = htmlspecialchars($data["password"]);

        $my_query = "INSERT INTO users (FirstName, LastName, Login, Password) VALUES ('$firstName', '$lastName', '$login', '$hashedPassword');";
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
}

function get_info()
{
    return json_decode(file_get_contents('php://input'), true);
}

?>
