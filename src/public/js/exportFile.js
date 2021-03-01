var data1 = [], datos1 = {};

// Añadir los datos de la tabla en el arreglo data1
function information() {
    data1 = [];
    $('#table1 tr').each(function () {
        var arr1 = []; // Array temporal
        for (let i = 0; i < this.cells.length; i++) {
            if (i >= 2 && Number.isInteger(parseInt(this.cells[i].innerHTML)))
                arr1.push(parseInt(this.cells[i].innerHTML));
            else
                arr1.push(this.cells[i].innerHTML);
        }
        data1.push(arr1);
    });
    return;
}

// Añadiendo codificación al archivo
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

function datos() {

    information(); // Llenando el array data1 con los datos correspondientes

    // Añadiendo separación entre los datos netos y el promedio de los datos
    var data2 = [];
    data2.push(Object.assign([], data1[0]));
    data2[data2.length - 1].splice(1, 1);

    // Generando el promedio de los datos por día

    count = Array.apply(null, new Array(data1[0].length - 2)).map(Number.prototype.valueOf, 0); // Creando array para dividir cada valor total de contaminante en el número de datos obtenidos
    vals1 = Array.apply(null, new Array(data1[0].length - 1)).map(Number.prototype.valueOf, 0); // Creando array para los valores de cada contaminante en su respectiva fecha
    vals1[0] = data1[1][0]; // Añadiendo el atributo fecha del primer dato (fila) de la tabla
    const length1 = data1.length;

    for (var j = 1; j < length1; j++) {
        // Recorrer la fila j 
        for (var k = 2; k < data1[0].length; k++) {
            // Verificando que no se tomen en cuenta los valores iguales a 0
            if (parseInt(data1[j][k]) != 0) {
                count[k - 2] += 1;
                vals1[k - 1] += parseInt(data1[j][k]);
            }
        }

        if (j == (length1 - 1) || !vals1.includes(data1[j + 1][0])) { // Si el arreglo vals1 no incluye la fecha de la fila j
            // Dividiendo sobre el total
            for (let w = 1; w < vals1.length; w++) {
                vals1[w] /= count[w - 1];
            }
            data2.push(vals1);
            // Verificando que no sea la ultima fila de datos
            if (j != (length1 - 1)) {
                count = Array.apply(null, new Array(data1[0].length - 2)).map(Number.prototype.valueOf, 0);
                vals1 = Array.apply(null, new Array(data1[0].length - 1)).map(Number.prototype.valueOf, 0);
                vals1[0] = data1[j + 1][0];
            }
        }
    }
    return data2;
}

// Generar los demás atributos del archivo Excel
$("#genExcel").click(function () {

    // Crear un nuevo archivo de Excel
    var wb = XLSX.utils.book_new();

    data2 = datos();

    // Agregar una hoja al archivo Excel con los datos netos
    wb.SheetNames.push("Datos Netos");
    var ws_data = data1; data1 = [];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Datos Netos"] = ws;

    // Agregar una hoja al archivo Excel con el promedio de datos por día
    wb.SheetNames.push("Promedio Por Día");
    ws_data = data2; data2 = [];
    ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Promedio Por Día"] = ws;

    // Escribiendo el archivo Excel mediante los datos recolectados
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'dataSensores.xlsx');
});

var labelsY = {
    'PM1.0': 'PPM',
    'PM2.5': 'PPM',
    'PM10': 'PPM',
    'CO (MQ7)': 'PPM',
    'CO (MQ6)': 'PPM',
    'CO2': 'mg/m^3',
    'O3': 'PPB',
    'SO2': 'mg/m^3',
    'Temperatura': '°C',
    'Humedad': 'g/m^3',
    'Presion': 'Pa'
}

// Generar un objeto con los datos de cada contaminante y sus respectivas fechas
function graph() {

    if ($(".itemsV:checked").length == 0 || $(".itemsV:checked").length > 2) {
        Swal.fire(
            'Error!',
            'Debe escoger al menos una variable (máximo 2)',
            'error'
        )
        return false;
    } else if ($("#typeChart").val() == "0"){
        Swal.fire(
            'Error!',
            'No ha seleccionado el tipo de gráfica',
            'error'
        )
        return false;
    } else {
        $("#canvasDiv").empty();
        $("#canvasDiv").append('<canvas id="popChart"></canvas>');
        var popCanvas = document.getElementById("popChart").getContext("2d");
        switch ($("#typeChart").val()) {
            case "1": 
                barChart(datos1, $(".itemsV:checked"), popCanvas);
                break;
            case "2": 
                lineChart(datos1, $(".itemsV:checked"), popCanvas);
                break;
        }
    }
}

// Descargar la gráfica como imagen en formato .png
function downloadImage() {
    $("#popChart").get(0).toBlob(function (blob) {
        saveAs(blob, 'gráfica1.png');
    })
}

function seeMenu() {

    $("#selectVal").css("display", "");
    $(".sep").css("display", "block");
    datos1 = {};

    var p = 0,
    data2 = datos();

    // Establecer las llaves (keys) del objeto
    for (var k = 0; k < data2[0].length; k++) {
        datos1[data2[0][k]] = [];
    }

    // Llenar cada arreglo de cada llave con los datos de promedio por día
    Object.keys(datos1).forEach(function (key) {
        for (var i = 1; i < data2.length; i++) {
            datos1[key].push(data2[i][p]);
        }
        p += 1;
    });

}

function showCanva() {
    $("#popChart").css("display", "");
    $("#downImg").css("display", "");
}

function optionsChart(datos, contam, properties) {

    var datasets = [],
    yAxes = [],
    direction = ['left', 'right'];

    for (var i=0; i < contam.length; i++) {
        datasets.push(
            {
                label: contam[i].defaultValue,
                data: datos[contam[i].defaultValue],
                fill: properties[0]
            }
        )
        datasets[i][properties[1]] = 'rgba(' + Math.floor(Math.random() * 256)+', ' + 
                Math.floor(Math.random() * 256) + ', ' + Math.floor(Math.random() * 256) + ', 0.8)'

        if (contam.length == 2) {
            datasets[i]['yAxisID'] = 'y-axis-' + (i+1) + '';
            yAxes.push({
                type: 'linear',
                display: true,
                labelString: labelsY[contam[i].defaultValue],
                id: 'y-axis-' + (i+1) + '',
                position: direction[i]
            });
        } else {
            yAxes.push({
                scaleLabel: {
                    display: true,
                    labelString: labelsY[contam[0].defaultValue]
                }
            });
        }
    }

    if (contam.length == 2) {
        yAxes[1]['gridLines'] = {
            drawOnChartArea: false,
        };
    }

    return [datasets, yAxes];

}

// Generar una gráfica de barras de las variables que correspondan
function barChart(datos, contam, popCanvas) {

    var [datasets, yAxes] = optionsChart(datos, contam, [true, 'backgroundColor']);

    showCanva();

    var barChart = new Chart(popCanvas, {
        type: 'bar',
        data: {
            labels: datos['Fecha (Año-Mes-Día)'],
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                yAxes: yAxes,
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo (días)'
                    }
                }]
            }
        }
    });
}

// Generar una gráfica de línea de las variables que correspondan
function lineChart(datos, contam, popCanvas) {

    var [datasets, yAxes] = optionsChart(datos, contam, [false, 'borderColor']);

    showCanva();

    var lineChart = new Chart(popCanvas, {
        type: 'line',
        data: {
            labels: datos['Fecha (Año-Mes-Día)'],
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                yAxes: yAxes,
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'Tiempo (días)'
                    }
                }]
            }
        }
    });
}