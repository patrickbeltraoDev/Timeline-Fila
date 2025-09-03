<?php   
    require "../topo.php";
?>


<link rel="stylesheet" 
    href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" 
    integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" 
    crossorigin="anonymous"
>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">


<div class="container">

    <form action="#" class="d-flex p-2" id="formFilter">

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
            <option value="RET">Retirada</option>
        </select>

        <input type="date" class="form-control mr-2" id="iptDtBegin" aria-describedby="basic-addon3">

        <input type="date" class="form-control mr-2" id="iptDtEnd" aria-describedby="basic-addon3">

        <button type="button" class="btn btn-danger form-control mr-2" title="Limpar Filtros" id="btnClearFilter"><i class="bi bi-x-circle"></i></button>

        <button type="submit" class="btn btn-primary form-control mr-2" title="Buscar" id="btnRequest"><i class="bi bi-search"></i></button>

    </form>

    <div class="container-fluid" id="chartContainer">
        
    </div>

</div>







<script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" 
    integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous">
</script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" 
    integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous">
</script>
<script src="public/js/timeline-fila.js"></script>


