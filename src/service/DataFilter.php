<?php

class DataFilter
{
    private string $uf;
    private string $regional;
    private string $dtBegin;
    private string $dtEnd;
    private string $macro_atividade;

    public function __construct(string $uf, string $regional, string $dtBegin, string $dtEnd, string $macro_atividade)
    {
        $this->uf = $uf;
        $this->regional = $regional;
        $this->dtBegin = $dtBegin;
        $this->dtEnd = $dtEnd;
        $this->macro_atividade = $macro_atividade;
    }

    public function getUF(): string
    {
        return $this->uf;
    }

    // public function getFilters(): array
    // {
    //     $conditions = [];

    //     if (!empty($this->uf)) {
    //         $conditions[] = "AND uf IN ('$this->uf')";
    //     }
    //     if (!empty($this->regional)) {
    //         $conditions[] = "AND regional IN ('$this->regional')";
    //     }
    //     if (!empty($this->dtBegin) && !empty($this->dtEnd)) {
    //         $conditions[] = "AND DIA BETWEEN '{$this->dtBegin}' AND '{$this->dtEnd}'";
    //     }
    //     if (!empty($this->macro_atividade)) {
    //         $conditions[] = "AND macro_atividade IN ('$this->macro_atividade')";
    //     }

    //     return $conditions;
    // }
}