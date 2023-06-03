<?php

// login (very basic), check if username and password match with database one

// db connection stuff (not sure yet what username and password it will be)

$data = get_info();
$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$connect_db = new mysqli("localhost", $db_username, $db_pwd, $db_name);

// check if connection to the database was successful
if (!$connect_db->connect_error) {
    // check if user exists in the database
    $email = $data["email"];
    $password = $data["password"];
    $query_user = "SELECT ID, FirstName, LastName FROM users WHERE Email='" . htmlspecialchars($data["email"]) . "' AND Password='" . htmlspecialchars($data["password"]) . "';";
    $query_result = $connect_db->query($query_user);

    if ($query_result && $query_result->num_rows > 0) {
        $row = $query_result->fetch_assoc();
        $first_name = $row["FirstName"];
        $last_name = $row["LastName"];
        $id = $row["ID"];

        $body_json = [
            "id" => $id,
            "firstName" => $first_name,
            "lastName" => $last_name,
            "error" => ""
        ];

        header('Content-type: application/json');
        echo json_encode($body_json);

        $update_login_info = "UPDATE users SET DateLastLoggedIn = CURRENT_TIMESTAMP WHERE ID =" . $id;
        $connect_db->query($update_login_info);
    } else {
        // User not found
        $body_json = [
            "error" => "Invalid credentials"
        ];
        header('Content-type: application/json');
        echo json_encode($body_json);
    }
} else {
    // return the error description as a json so we can see it on the page
    $body_json = [
        "error" => $connect_db->connect_error
    ];
    header('Content-type: application/json');
    echo json_encode($body_json);
}

function get_info()
{
    return json_decode(file_get_contents('php://input'), true);
}
?>
