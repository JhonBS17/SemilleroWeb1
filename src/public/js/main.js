
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

function search() {
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
        var tr1 = '<thead><tr><th>Fecha</th><th>Hora</th>';
        for (var j = 0; j < lengthCheck; j++) {
            tr1 += '<th>' + $('.ops1:checked')[j].id + '</th>';
        }
        tr1 += '</thead>';
        var cont = 0;
        for (var i = 0; i < data.length; i++) {
            const fecha = data[i].fechainsercion;
            if (fecha >= fechaD && fecha <= fechaH) {
                tr1 += '<tr id="tr2"><td>' + data[i].fechainsercion.substring(0, 10) + '</td><td>' + 
                data[i].fechainsercion.substring(11, 19) + '</td>';
                for (var k = 0; k < lengthCheck; k++) { 
                    tr1 += '<td>' + data[i][($('.ops1:checked')[k].id).toLowerCase()] + '</td>';
                }
                tr1 += '</tr>';
                cont +=1;
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

// $('#descargar').click(function () {

//     var data1 = [];

//     $('#table1 tr').each(function() {
//         var arr1 = [];
//         for (let i = 0; i < this.cells.length; i++) {
//             arr1.push(this.cells[i].innerHTML);    
//         }
//         data1.push(arr1);
//     });

//     $.ajax({
//         url: '/download',
//         type: 'POST',
//         data: {
//             datos: data1
//         }
//     });
// });

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

function cancelarC(){
    $('[type="checkbox"]').prop('checked', false);
}
