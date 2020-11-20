var data;

$.ajax({
    url: "/data",
    method: "GET",
    async: false,
    contentType: "application/json; charset=UTF-8",
    success: function (result) {
        data = result;
    }
});

function compare(a, b) {
    if (a.fechainsercion < b.fechainsercion) {
        return -1;
    }
    if (a.fechainsercion > b.fechainsercion) {
        return 1;
    }
    return 0;
}

data.sort(compare);

var variables = {
    'PM1_0': 'PM1.0',
    'PM2_5': 'PM2.5',
    'PM10': 'PM10',
    'MQ7': 'CO (MQ7)',
    'MQ6': 'CO (MQ6)',
    'MQ135': 'CO2',
    'MQ131': 'O3',
    'MQ136': 'SO2',
    'Temperatura': 'Temperatura',
    'Humedad': 'Humedad',
    'Presion': 'Presion'
}

function search() {
    console.log(data);
    const fechaD = $("#Fdesde").val();
    const fechaH = $("#Fhasta").val();
    const lengthCheck = $('.ops1:checked').length;
    if (fechaD == "" || fechaH == "" || lengthCheck == 0) {
        Swal.fire(
            'Error!',
            'Se deben llenar todos los campos',
            'error'
        )
    } else {
        $("#table1").empty();
        var tr1 = '<thead><tr><th>Fecha (Año-Mes-Día)</th><th>Hora</th>';
        for (var j = 0; j < lengthCheck; j++) {
            tr1 += '<th>' + variables[($('.ops1:checked')[j].id)] + '</th>';
        }
        tr1 += '</thead>';
        var cont = 0;
        for (var i = 0; i < data.length; i++) {
            const fecha = data[i].fechainsercion;
            if (fecha >= fechaD && fecha <= fechaH) {
                tr1 += '<tr id="tr2"><td>' + data[i].fechainsercion.substring(0, 10) + '</td><td>' +
                    data[i].fechainsercion.split("T")[1].split("Z")[0] + '</td>';
                for (var k = 0; k < lengthCheck; k++) {
                    tr1 += '<td>' + data[i][($('.ops1:checked')[k].id).toLowerCase()] + '</td>';
                }
                tr1 += '</tr>';
                cont += 1;
            }
        }
        if (cont == 0) {
            Swal.fire(
                'Error!',
                'No se han encotrado datos',
                'error'
            )
            return false;
        }
        $("#table1").append(tr1);
        $("#butt").css("display", "block");
    }
}

function clean() {
    cancelarC();
    $("#Fdesde").val("");
    $("#Fhasta").val("");
}

$('#checkall').change(function () {
    $('.cb-element').prop('checked', this.checked);
});

$('.cb-element').change(function () {
    if ($('.cb-element:checked').length == $('.cb-element').length) {
        $('#checkall').prop('checked', true);
    }
    else {
        $('#checkall').prop('checked', false);
    }
});

function cancelarC() {
    $('[type="checkbox"]').prop('checked', false);
}
