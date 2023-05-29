<?php
    $data = json_decode(file_get_contents('php://input'), true);

    $db_username = "";
    $db_pwd = "";
    $db_name = "";

    $db_connection = new mysqli("localhost", $db_username, $db_pwd, $db_name);

    if($db_connection->connect_error){

        $message = '{"message":"' . $db_connection->connect_error . '"}'
        header('Content-type: application/json');
		echo $message;
    }

    else{
        $sql = "DELETE FROM contact WHERE (`ID` = " . $data["ID"] . " AND `user_ID` = " . $data["user_ID"] . ");";
		$result = $db_connection->query($sql);
		
		if($result === true){
			$message = '{"message":"Deleted"}';
		}

		else{
			$message = '{"message":"not Deleted"}';
		}

        header('Content-type: application/json');
		echo $message;
		
		$db_connection->close();
	}
?>
