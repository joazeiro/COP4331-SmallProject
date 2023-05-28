<?php
    // remeber that when the user signs up we need to check if there are no other users
    // with that same email in our database

    $data = get_info();
    $db_name = ''; // not created yet
    $db_username = '';
    $db_pwd = '';

    $connect_db = new mysqli("localhost", $db_username, $db_pwd, $db_name);

    // if this connect is not successful for some reason we have to catch that
    if(!($connect_db->connect_error)){

        $my_query = "INSERT INTO users (FirstName, LastName, Login, Password) VALUES ('" . htmlspecialchars($data["firstName"]) . "', '" . htmlspecialchars($data["lastName"]) . "', '" . htmlspecialchars($data["login"]) . "', '" . htmlspecialchars($data["password"]) . "');";
		$query_result = $connect_db->query($my_query);

        if($query_result === TRUE){
			
            $sucess = '{"info":"Success"}';
            header('Content-type: application/json');
		    echo $sucess;
		}
		else{
			$error = 'Registration failed: ' . $query_result;
            $error_pretty = '{"error":"' . $err . '"}';
            header('Content-type: application/json');
		    echo $error_pretty;
		}

		$connect_db->close();
    }



    function get_info(){

        return json_decode(file_get_contents('php://input'), true);

    }


?>