// const excel = require('exceljs');

// function generateExcel(data) {

//     const workbook = new excel.Workbook(),
//         worksheet = workbook.addWorksheet('Datos');

//     const arr1 = [];

//     //Ingresar los nombres de cada columna
//     for (let index = 0; index < data[0].length; index++) {
//         arr1.push({ header: data[0][index], key: data[0][index] });
//     }

//     worksheet.columns = arr1;

//     //Ajustar tamaño de cada columna dependiendo del elemento cabecera
//     worksheet.columns.forEach(column => {
//         column.width = column.header.length < 12 ? 12 : column.header.length;
//     });

//     //Asignar negrilla a la primera fila (cabecera)
//     worksheet.getRow(1).font = {bold: true};

//     //Ingresar los datos obtenidos de la tabla
//     for (let index = 1; index < data.length; index++) {
//         worksheet.addRow(data[index]);
//     }

//     return workbook;

// };

module.exports = { generateExcel };