<?php

class RelatorioService {

    private PdoRepository $repo;

    public function __construct(PdoRepository $repo) {
        $this->repo = $repo;
    }

    public function getResultadosAgrupados(DataFilter $filter): array {
        $rawData = $this->repo->consultDB($filter);
        return $this->groupByUf($rawData);
    }

    private function groupByUf(array $data): array {
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