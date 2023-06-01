<?php

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

    $sql = make_query($db_connection, $data);
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

function make_query($db_connection, $data)
{
    $search_criteria = htmlspecialchars($data["search_criteria"]);
    $sql = "SELECT * FROM contact WHERE `user_ID`=" . $data["user_ID"] . " AND (`FirstName` LIKE '%" . $search_criteria . "%' OR `LastName` LIKE '%" . $search_criteria . "%' OR `PhoneNumber` LIKE '%" . $search_criteria . "%' OR `Email` LIKE '%" . $search_criteria . "%' OR `StreetAddress` LIKE '%" . $search_criteria . "%' OR `City` LIKE '%" . $search_criteria . "%' OR `State` LIKE '%" . $search_criteria . "%' OR `ZIP_Code` LIKE '%" . $search_criteria . "%');";
    return $sql;
}

function grab_rows($result)
{
    $value = '{"results":[';
    while ($row = $result->fetch_assoc()) {
        $value = $value . sprintf('{"ID":%d,"FirstName":"%s","LastName":"%s","PhoneNumber":"%s", "Email":"%s", "StreetAddress":"%s", "City":"%s", "State":"%s", "ZIP_Code":"%s"},',
            $row["ID"], $row["FirstName"], $row["LastName"], $row["PhoneNumber"], $row["Email"], $row["StreetAddress"], $row["City"], $row["State"], $row["ZIP_Code"]);
    }
    $value = rtrim($value, ',') . '], "error":""}';
    header('Content-type: application/json');
    echo $value;
}
