<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class DataFilter
{
    private $uf;
    private $regional;
    private $dtBegin;
    private $dtEnd;
    private $macro_atividade;

    public function __construct($uf, $regional, $dtBegin, $dtEnd, $macro_atividade)
    {
        $this->uf = $uf;
        $this->regional = $regional;
        $this->dtBegin = $dtBegin;
        $this->dtEnd = $dtEnd;
        $this->macro_atividade = $macro_atividade;
    }
    public function getFilters()
    {
        $conditions = [];

        if (!empty($this->uf) && $this->uf !== null && $this->uf !== '') {
            $conditions[] = "AND uf IN ('$this->uf')";
        } else {
            switch ($this->regional) {
                case "RCO":
                    $conditions[] = " AND uf IN ('AC', 'DF', 'GO', 'MS', 'MT', 'RO', 'TO')";
                    break;
                case "RMG":
                    $conditions[] = " AND uf IN ('ES', 'MG')";
                    break;
                case "RSP":
                    $conditions[] = " AND uf IN ('SP')";
                    break;
                case "RSUL":
                    $conditions[] = " AND uf IN ('RS')";
                    break;
            }
        }
        if (!empty($this->dtBegin) && !empty($this->dtEnd)) {
            $conditions[] = " AND DIA BETWEEN '{$this->dtBegin}' AND '{$this->dtEnd}'";
        }
        if (!empty($this->macro_atividade)) {
            $conditions[] = " AND macro_atividade IN ('$this->macro_atividade')";
        }

        return $conditions;
    }
}