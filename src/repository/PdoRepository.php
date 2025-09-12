<?php   

require_once __DIR__ . '/../service/DataFilter.php';

class PdoRepository
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function hydrateRepoByAtv($filter)
    {
        try {
            $sql = "SELECT DAY(DIA) AS dia, macro_atividade, uf, caixa_total, TRUNCATE(fila, 1) AS fila 
                    FROM modulo_bucket_vtal.tbl_vtal_bucket_atividades_bas_fila_uf WHERE 1=1";

            $filters = $filter->getFilters();
            foreach ($filters as $condition) {
                $sql .= " $condition";
            }

            $sql .= " ORDER BY uf, dia";

            $stmt = $this->pdo->prepare($sql);
            $stmt->execute();
            return $stmt->fetchAll();
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            return [];
        }
    }
}