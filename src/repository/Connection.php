<?php

class Connection
{
    private $host = "34.69.169.180";
    private $db_name = "pci";
    private $username = "pcidatabase";
    private $password = 'z"tF&uUrq?*v0t%A';
    private $conn = null;

    public function getConnection()
    {
        if ($this->conn === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->db_name};charset=utf8mb4";
                $this->conn = new PDO($dsn, $this->username, $this->password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]);
            } catch (PDOException $exception) {
                throw new RuntimeException("Erro de conexão: " . $exception->getMessage());
            }
        }

        return $this->conn;
    }
}

