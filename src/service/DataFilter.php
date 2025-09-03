<?php

class DataFilter
{
    private $uf;
    private $regional;
    private $dtBegin;
    private $dtEnd;

    public function __construct($uf, $regional, $dtBegin, $dtEnd)
    {
        $this->uf = $uf;
        $this->regional = $regional;
        $this->dtBegin = $dtBegin;
        $this->dtEnd = $dtEnd;
    }

    public function getFilters()
    {
        $conditions = [];

        if (!empty($this->uf)) {
            $conditions[] = "uf IN ('" . implode("', '", $this->uf) . "')";
        }
        if (!empty($this->regional)) {
            $conditions[] = "regional IN ('" . implode("', '", $this->regional) . "')";
        }
        if (!empty($this->dtBegin)) {
            $conditions[] = "dtBegin IN ('" . implode("', '", $this->dtBegin) . "')";
        }
        if (!empty($this->dtEnd)) {
            $conditions[] = "dtEnd IN ('" . implode("', '", $this->dtEnd) . "')";
        }

        return $conditions;
    }
}