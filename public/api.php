<?php

require __DIR__ . '/../src/service/DataFilter.php';

$input = json_decode(file_get_contents('php://input'), true);

$dataFilter = new DataFilter($input['uf'], $input['regional'], $input['dtBegin'], $input['dtEnd']);


header('Content-Type: application/json');
echo json_encode($dataFilter->getFilters());
