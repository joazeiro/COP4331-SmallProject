<?php

    $data = json_decode(file_get_contents('php://input'), true);

    $db_username = "db";
    $db_pwd = "KZXyk.N@JHc3gPu";
    $db_name = "ContactDatabase";

    $db_connection = new mysqli("localhost", $db_username, $db_pwd, $db_name);

    if($db_connection->connect_error){

        $message = '{"message":"' . $db_connection->connect_error . '"}'
        header('Content-type: application/json');
		echo $message;
    }

    else{

        $sql = sprintf("INSERT INTO contact (FirstName, LastName, Email, PhoneNumber, StreetAddress, City, State, ZIP_Code, user_ID) VALUES ('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', %d);",
         htmlspecialchars($data["FirstName"]), htmlspecialchars($data["LastName"]),htmlspecialchars($data["Email"]),
         htmlspecialchars($data["PhoneNumber"]), htmlspecialchars($data["StreetAddress"]),
         htmlspecialchars($data["City"]), htmlspecialchars($data["State"]), htmlspecialchars($data["ZIP_Code"]), htmlspecialchars($data["user_ID"]));
        
         if($db_connection->query($sql) === TRUE){
            returnMessage();
            $message = '{"message":"Contact added successfully"}'
            header('Content-type: application/json');
            echo $message;
        } 
        
        else{

            $message = '{"message":"Failed insert into contact table"}'
            header('Content-type: application/json');
            echo $message;
        }

        $db_connection->close();
	}
	
?>
