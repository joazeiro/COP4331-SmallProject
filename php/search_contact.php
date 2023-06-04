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
    $ID = $data["ID"];

    $sql = "SELECT * FROM contact WHERE 
    (`FirstName` LIKE '%" . $search_criteria . "%' 
    OR `LastName` LIKE '%" . $search_criteria . "%' 
    OR `PhoneNumber` LIKE '%" . $search_criteria . "%' 
    OR `Email` LIKE '%" . $search_criteria . "%' 
    OR `Linkedin` LIKE '%" . $search_criteria . "%' 
    OR `ID` = '" . $search_criteria . "' 
    OR `CreationDate` LIKE '%" . $search_criteria . "%') 
    AND `ID` = '" . $ID . "' 
    LIMIT 10;";

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
    $field_names = $result->fetch_fields();
    $field_values = array();

    while ($row = $result->fetch_assoc()) {
        $field_values[] = $row;
    }

    $results = array();
    foreach ($field_values as $row) {
        $result_data = array();
        foreach ($field_names as $field) {
            $result_data[$field->name] = $row[$field->name];
        }
        $results[] = $result_data;
    }

    $response = array(
        'results' => $results,
        'error' => ""
    );

    header('Content-type: application/json');
    echo json_encode($response);
}
?>
