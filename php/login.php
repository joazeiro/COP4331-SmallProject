<?php

//error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = get_info();
$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$connect_db = new mysqli("localhost", $db_username, $db_pwd, $db_name);

// check if connection to the database was successful
if (!$connect_db->connect_error) {

    // check if user exists in the database
    $Email = $data["Login"];
    $Password = $data["Password"];
    $query_user = "SELECT ID FROM users WHERE Email='" . $Email . "' AND Password='" . $Password . "';";
    $query_result = $connect_db->query($query_user);

    if ($query_result->num_rows > 0) {

        $row = $query_result->fetch_assoc();
        $id = $row["ID"];

        $body_json = [
            "ID" => $id,
            "Email" => $Email,
            "Password" => $Password,
            "error" => ""
        ];

        header('Content-type: application/json');
        echo json_encode($body_json);

        $update_login_info = "UPDATE users SET DateLastLoggedIn = CURRENT_TIMESTAMP WHERE ID =" . $id;
        $connect_db->query($update_login_info);
    } else {
        // User not found
        $body_json = [
            "ID" => -1,
            "error" => "Invalid credentials"
        ];
        header('Content-type: application/json');
        echo json_encode($body_json);
    }
} else {
    // return the error description as a json so we can see it on the page
    $body_json = [
        "ID" => -1,
        "error" => "Invalid credentials"
    ];
    header('Content-type: application/json');
    echo json_encode($body_json);
}

function get_info()
{
    return json_decode(file_get_contents('php://input'), true);
}
?>
