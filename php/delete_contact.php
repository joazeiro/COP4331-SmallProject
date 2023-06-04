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
    $CreationDate = $data["CreationDate"];
    $sql = "DELETE FROM contact WHERE CreationDate = '$CreationDate';";
    $result = $db_connection->query($sql);

    if ($result === true) {
        $response = array('message' => 'Deleted');
    } else {
        $response = array('message' => 'Not Deleted');
    }

    $db_connection->close();
}

header('Content-type: application/json');
echo json_encode($response);
?>

