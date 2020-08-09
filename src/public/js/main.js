
var data;

$.ajax({
    url: "https://h4ks8u0iblvt8qn-sensores.adb.us-ashburn-1.oraclecloudapps.com/ords/sensores/data/datos",
    async: false,
    contentType: "application/json; charset=UTF-8",
    success: function( result ){
        data = result.items;
    }
});

function search(){
    const fechaD = $("#Fdesde").val();
    const fechaH = $("#Fhasta").val();
    if (fechaD == "" || fechaH == "" || $("#variable1 :selected").val() == 0){
        Swal.fire(
            'Error!',
            'Se deben llenar todos los campos',
            'error'
        )
    }else{
        $("#table1").empty();
        var tr1 = '<thead><tr><th>ID</th><th>Variable</th><th>Datos</th><th>Fecha</th><th>Hora</th>\
                <th>Localización</th></tr></thead>';
        var cont = 0;
        for(var i=0; i < data.length; i++) {
            const fecha = data[i].fechainsercion.substring(0,10);
            if ($("#variable1 :selected").val() == data[i].tipodato && (fecha >= fechaD && fecha <= fechaH)) {
                tr1 += '<tr id="tr2"><td>' + data[i].iddato + '</td>\
                <td>' + data[i].tipodato + '</td>\
                <td>' + data[i].dato + '</td>\
                <td>' + data[i].fechainsercion.substring(0,10) + '</td>\
                <td>' + data[i].fechainsercion.substring(11,19) + '</td>\
                <td>' + data[i].localizacion + '</td></tr>';
                cont += 1;
            }
        }
        $("#table1").append(tr1);
        if (cont == 0){
            Swal.fire(
            'Error!',
            'No se han encotrado datos',
            'error'
            )
        }       
    }
}

function clean(){
    $('#variable1').prop('selectedIndex',0);
    $("#Fdesde").val("");
    $("#Fhasta").val("");
}

$('.collapse').collapse();