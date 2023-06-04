<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents('php://input'), true);

$db_username = "db";
$db_pwd = "KZXyk.N@JHc3gPu";
$db_name = "ContactDatabase";

$db_connection = new mysqli("localhost", $db_username, $db_pwd, $db_name);

if ($db_connection->connect_error) {
    $my_error = '{"results":[],"error":"' . $db_connection->connect_error . '"}';
    header('Content-type: application/json');
    echo $my_error;
} else {
    $search_criteria = $data["search_criteria"];

    $sql = "SELECT * FROM contact WHERE (`FirstName` LIKE '%" . $search_criteria . "%' OR `LastName` LIKE '%" . $search_criteria . "%' OR `PhoneNumber` LIKE '%" . $search_criteria . "%' OR `Email` LIKE '%" . $search_criteria . "%' OR `Linkedin` LIKE '%" . $search_criteria . "%');";
    $result = $db_connection->query($sql);

    if ($result->num_rows > 0) {
        grab_rows($result);
    } else {
        $my_error = '{"results":[],"error":"No Errors"}';
        header('Content-type: application/json');
        echo $my_error;
    }

    $db_connection->close();
}

function grab_rows($result)
{
    $value = '{"results":[';
    while ($row = $result->fetch_assoc()) {
        $value .= sprintf('{"ID":%d,"FirstName":"%s","LastName":"%s","PhoneNumber":"%s","Email":"%s","Linkedin":"%s"},',
            $row["ID"], $row["FirstName"], $row["LastName"], $row["PhoneNumber"], $row["Email"], $row["Linkedin"]);
    }
    $value = rtrim($value, ',') . '], "error":""}';
    header('Content-type: application/json');
    echo $value;
}
?>
