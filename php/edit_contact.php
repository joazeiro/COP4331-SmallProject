<?php
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
    $sql = sprintf(
        "UPDATE contact SET FirstName = '%s', LastName = '%s', Email = '%s', PhoneNumber = '%s', Linkedin = '%s', StreetAddress = '%s', City = '%s', State = '%s', ZIP_Code = '%s' WHERE ID = %d AND user_ID = %d;",
        htmlspecialchars($data["FirstName"]),
        htmlspecialchars($data["LastName"]),
        htmlspecialchars($data["Email"]),
        htmlspecialchars($data["PhoneNumber"]),
        htmlspecialchars($data["Linkedin"]),
        htmlspecialchars($data["StreetAddress"]),
        htmlspecialchars($data["City"]),
        htmlspecialchars($data["State"]),
        htmlspecialchars($data["ZIP_Code"]),
        $data["ID"],
        $data["user_ID"]
    );

    if ($db_connection->query($sql) === true) {
        $message = '{"message":"Updated"}';
        header('Content-type: application/json');
        echo $message;
    } else {
        $message = '{"message":"Not Updated"}';
        header('Content-type: application/json');
        echo $message;
    }

    $db_connection->close();
}
?>
