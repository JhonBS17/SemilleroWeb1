var data1 = [];

// Añadir los datos de la tabla en el arreglo data1
function information() {
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

// Generar los demás atributos del archivo Excel
$("#genExcel").click(function () {

    // Crear un nuevo archivo de Excel
    var wb = XLSX.utils.book_new();

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
            console.log('j: ' + j + ' -> ' + vals1);
            data2.push(vals1);
            // Verificando que no sea la ultima fila de datos
            if (j != (length1 - 1)) {
                count = Array.apply(null, new Array(data1[0].length - 2)).map(Number.prototype.valueOf, 0);
                vals1 = Array.apply(null, new Array(data1[0].length - 1)).map(Number.prototype.valueOf, 0);
                vals1[0] = data1[j + 1][0];
            }
        }
    }

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
