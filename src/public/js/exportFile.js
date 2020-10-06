var data1 = [];
var wb = XLSX.utils.book_new();

function information(){
    $('#table1 tr').each(function() {
        var arr1 = [];
        for (let i = 0; i < this.cells.length; i++) {
            arr1.push(this.cells[i].innerHTML);    
        }
        data1.push(arr1);
    });
    return;
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

$("#genExcel").click(function() {

    information();
    // const v1 = data1[0]; 

    data1.push([], Object.assign([],data1[0]));
    data1[data1.length-1].splice(1, 1);

    // promedio

    var vals1 = [], cont = 1;
    vals1.push(data1[1][0]);
    const length1 = data1.length;

    for (var j = 1; j < length1-2; j++) {
        if (!vals1.includes(data1[j][0])) {
            data1.push(vals1);
            vals1 = [];
            vals1.push(data1[j][0]);
            cont = 1;    
        }
        for (var k = 2; k < data1[0].length; k++){
            if (vals1.length != data1[0].length-1){
                vals1.push(0);
            }
            vals1[k-1] += parseInt(data1[j][k]);
            vals1[k-1] /= cont;
        }
        cont += 1;
    }

    data1.push(vals1);

    wb.SheetNames.push("Datos");
    var ws_data = data1;
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Datos"] = ws;

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), 'test.xlsx');
});
