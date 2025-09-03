<?php

class Connection
{
    private $host = "34.69.169.180";
    private $db_name = "pci";
    private $username = "pcidatabase";
    private $password = 'z"tF&uUrq?*v0t%A';
    public $conn;

    public function getConnection()
    {
        $this->conn = null;

        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $exception) {
            echo "Erro de conexão: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
