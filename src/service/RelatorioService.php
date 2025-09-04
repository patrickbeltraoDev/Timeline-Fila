<?php

require_once __DIR__ . '/DataFilter.php';
require_once __DIR__ . '/../repository/PdoRepository.php';

class RelatorioService {

    private $repo;

    public function __construct($repo) {
        $this->repo = $repo;
    }

    public function getResultadosAgrupados($filter) {
        $rawData = $this->repo->hydrateRepoByAtv($filter);
        return $this->groupByUf($rawData);
    }

    private function groupByUf(array $data) {
        $result = [];
        foreach ($data as $row) {
            $uf = $row['uf'];
            if (!isset($result[$uf])) {
                $result[$uf] = [];
            }
            $result[$uf][] = $row;
        }
        return $result;
    }
}