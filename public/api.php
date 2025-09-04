<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../src/service/DataFilter.php';
require_once __DIR__ . '/../src/service/RelatorioService.php';
require_once __DIR__ . '/../src/repository/PdoRepository.php';
require_once __DIR__ . '/../src/repository/Connection.php';

$input = json_decode(file_get_contents('php://input'), true);

try {
    $connection = new Connection();
    $pdoRepository = new PdoRepository($connection->getConnection());
    $service = new RelatorioService($pdoRepository);
    
    $dataFilter = new DataFilter(
        $input['uf'], 
        $input['regional'],
        $input['dtBegin'], 
        $input['dtEnd'], 
        $input['macro_atividade']
    );

    $result = $service->getResultadosAgrupados($dataFilter);

    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => $e->getMessage()]);
}