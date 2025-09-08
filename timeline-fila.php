<?php   
    require "../topo.php";
?>


<link rel="stylesheet" 
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" 
    integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" 
    crossorigin="anonymous"
>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">

<link rel="stylesheet" href="public/css/graphs.css">
<link rel="stylesheet" href="public/css/table.css">
<link rel="stylesheet" href="public/css/container.css">

<div class="container-fluid">

    <form action="#" class="container d-flex p-2" id="formFilter">

        <select name="slt_regional" id="slt_regional" class="form-control mr-2" title="Selecione uma Regional">
            <option selected disabled value="">Regional</option>
            <option value="RCO">RCO</option>
            <option value="RMG">RMG</option>
            <option value="RSUL">RSUL</option>
            <option value="RSP">RSP</option>
        </select>

        <select name="slt_uf" id="slt_uf" class="form-control mr-2" title="Selecione uma UF">
            <option selected disabled value="">UF</option>
        </select>

        <select name="slt_macro_atividade" id="slt_macro_atividade" class="form-control mr-2" title="Selecione uma Atividade">
            <option selected disabled value="">Atividade</option>
            <option value="INST">Instalação</option>
            <option value="REP">Reparo</option>
            <option value="INST','REP">INST + REP</option>
        </select>

        <input type="date" class="form-control mr-2" id="iptDtBegin" aria-describedby="basic-addon3">

        <input type="date" class="form-control mr-2" id="iptDtEnd" aria-describedby="basic-addon3">

        <button type="button" class="btn btn-danger form-control mr-2" title="Limpar Filtros" id="btnClearFilter"><i class="bi bi-x-circle"></i></button>

        <button type="submit" class="btn btn-primary form-control mr-2" title="Buscar" id="btnRequest"><i class="bi bi-search"></i></button>

    </form>

    <div class="rw-img">
        <img src="public/image/btnGenerateGraphs.png" alt="Blue line and bar graph icon with intersecting red and blue lines and arrows representing a button to view data in graph format, set against a plain background" title="Visualizar Gráficos">
        <img src="public/image/btnGenerateTable.png" alt="Blue table icon with three rows and four columns representing a button to view data in table format, set against a plain background" title="Visualizar Tabela">
        <img src="public/image/barra-de-menu.png" alt="Three horizontal blue bars stacked vertically representing a menu or grid view button, set against a plain background" title="Visualizar em Grade">
    </div>

    <div id="chartContainer"></div>

    <div class="footer">
        <p><?php echo date('Y'); ?></p>
    </div>

</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" 
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous">
</script>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>

<script src="public/js/timeline-fila.js"></script>
<script src="public/js/renderGraphs.js"></script>
<script src="public/js/renderTable.js"></script>

