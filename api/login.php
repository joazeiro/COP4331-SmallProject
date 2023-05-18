<?php

    // login (very basic), check if username and password match with database one

        // db connection stuff (not sure yet what username and password it will be)
        $db_name = ''; // not created yet
        $db_username = '';
        $db_pwd = '';

        $connect_db = new mysqli("localhost", $db_username, $db_pwd, $db_name);

        // if this connect is not successful for some reason we have to catch that
        if(!($connect_db->connect_error)){
                // check if user exists in the database
                $query_user = "SELECT ID, FirstName, LastName FROM users where Login='" . htmlspecialchars($data["login"]) . "' and Password='" . htmlspecialchars($data["password"]) . "';";
                $query_result = $connect_db->query($query_user);
        }

        else{
            // return the error description as a json so we can see it on the page
            
            $body_json = {
                "error":"' . $connect_db->connect_error . '"
            }
            header('Content-type: application/json');
            echo $body_json;
        }





?>