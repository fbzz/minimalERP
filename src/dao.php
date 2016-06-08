<?php

class dao
{

    public function getConnection()
    {
        $DBServer = 'localhost'; // e.g 'localhost' or '192.168.1.100'
        $DBUser   = 'root';
        $DBPass   = '';
        $DBName   = 'moviecatalog';
        $conn     = new mysqli($DBServer, $DBUser, $DBPass, $DBName);
        if (!$conn->set_charset("utf8")) {
            //  printf("Error loading character set utf8: %s\n", $conn->error);
            exit();
        } else {
            //printf("Current character set: %s\n", $conn->character_set_name());
        }

// check connection
        if ($conn->connect_error) {
            trigger_error('Database connection failed: ' . $conn->connect_error, E_USER_ERROR);
        }
        return $conn;
    }

    public function checkUser($login, $password)
    {
        $conn  = $this->getConnection();
        $query = "SELECT * FROM login WHERE logon =  '$login' AND password = '$password'";
// Perform Query
        $rs = $conn->query($query);

        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        } else {
            $rs->data_seek(0);
            while ($row = $rs->fetch_assoc()) {
                return json_encode($row);
            }
        }
//$row = mysql_fetch_row($result);
        //return $row[0]; // 42

    }

    public function getMovies()
    {
        $conn  = $this->getConnection();
        $query = "SELECT * from movies";
        $rs    = $conn->query($query);

        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        } else {
            $rs->data_seek(0);
            $array_allMovies = array();
            while ($row = $rs->fetch_array(MYSQL_ASSOC)) {
                $array_movies                = array();
                $array_movies["id"]          = $row["id"];
                $array_movies["movie_name"]  = $row["movie_name"];
                $array_movies["movie_about"] = $row["movie_about"];
                $array_movies["movie_year"]  = $row["movie_year"];
                $array_movies["movie_type"]  = $row["movie_type"];
                array_push($array_allMovies, $array_movies);
            }
            return (json_encode($array_allMovies));
        }
    }

    public function getAllNewCol() {
$conn  = $this->getConnection();
        $query = "SHOW COLUMNS FROM movies";
        $rs    = $conn->query($query);

        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        } else {
            $rs->data_seek(0);
            $cols = array();
            while ($row = $rs->fetch_array(MYSQL_ASSOC)) {
                array_push($cols, $row);
            }
            return (json_encode($cols));
        }

    }


//$id_movie = ($row["id"]);
    //$title_movie = ($row["movie_name"]);
    //$about_movie = ($row["movie_about"]);
    //$year_movie = ($row["movie_year"]);
    //$type_movie = ($row["movie_type"]);

    public function executeCustomQuery($customQuery)
    {
        $customQuery = strtolower($customQuery);
if (strpos($customQuery,'delete') !== false) {
    return 'true';
}
if (strpos($customQuery,'truncate') !== false) {
    return 'true';
}
if (strpos($customQuery,'update') !== false) {
    return 'true';
}


        $conn = $this->getConnection();
        $rs   = $conn->query($customQuery);
        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        } else {
            $rs->data_seek(0);
            $array_allMovies = array();
            while ($row = $rs->fetch_array(MYSQL_ASSOC)) {
                $array_movies                = array();
                $array_movies["id"]          = $row["id"];
                $array_movies["movie_name"]  = $row["movie_name"];
                $array_movies["movie_about"] = $row["movie_about"];
                $array_movies["movie_year"]  = $row["movie_year"];
                $array_movies["movie_type"]  = $row["movie_type"];
                array_push($array_allMovies, $array_movies);
            }
            return (json_encode($array_allMovies));
        }
    }

       public function executeCustomQueryAdmin($customQuery)
    {

        $conn = $this->getConnection();
        $rs   = $conn->query($customQuery);
        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        } else {
            $rs->data_seek(0);
            $array_allMovies = array();
            while ($row = $rs->fetch_array(MYSQL_ASSOC)) {
                $array_movies                = array();
                $array_movies["id"]          = $row["id"];
                $array_movies["movie_name"]  = $row["movie_name"];
                $array_movies["movie_about"] = $row["movie_about"];
                $array_movies["movie_year"]  = $row["movie_year"];
                $array_movies["movie_type"]  = $row["movie_type"];
                array_push($array_allMovies, $array_movies);
            }
            return (json_encode($array_allMovies));
        }
    }

    public function insertQuery($logon, $query){
        $query = "INSERT INTO querys (logon, query_body) VALUES ('".$logon."','".$query."');";
        $conn = $this->getConnection();
        $rs   = $conn->query($query);
        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        }
    }

    public function getQuerys($logon)
    {
      //  echo $logon;
        $query = "select query_body from querys where logon= '".$logon."'";
        $conn = $this->getConnection();
        $rs   = $conn->query($query);
        if ($rs === false) {
            trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
        } else {
            $rs->data_seek(0);
            $array_allQuerys = array();
            while ($row = $rs->fetch_array(MYSQL_ASSOC)) {
                $array_querys                = array();
                $array_querys = $row['query_body'];
                array_push($array_allQuerys, $array_querys);
            }
            return (json_encode($array_allQuerys));
        }
    }

}
