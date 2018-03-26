<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    private $db_name = "id4968815_api_db";
    private $username = "id4968815_root";
    private $password = "Je1W(J(*)V3$@4iCph87";
    public $conn;
 
    // get the database connection
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}
?>