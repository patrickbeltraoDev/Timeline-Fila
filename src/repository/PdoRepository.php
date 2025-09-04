<?php   

require_once __DIR__ . '/../service/DataFilter.php';

class PdoRepository
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function consultDB(DataFilter $filter)
    {
        try {
            $sql = "SELECT * FROM modulo_bucket_vtal.tbl_vtal_bucket_atividades_bas_fila_uf WHERE 1=1";

            $filters = $filter->getFilters();
            foreach ($filters as $condition) {
                $sql .= " $condition";
            }

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return [];
        }
    }
}