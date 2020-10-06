const express = require('express'),
    router = express.Router(),
    request = require('request'),
    { generateExcel } = require('./config/fileExcel');
const excel = require('exceljs');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/data', (req, res) => {
    request.get({
        url: "https://h4ks8u0iblvt8qn-sensores.adb.us-ashburn-1.oraclecloudapps.com/ords/sensores/data/datos",
        json: true
    },
        (error, response, body) => {
            var data = body.items;
            res.jsonp(data);
        });
});

// router.post('/download', async (req, res) => {
//     res.setHeader('Content-Type', 'text/xlsx');
//     res.setHeader('Content-Disposition', 'attachment; filename=test.xlsx');
//     await generateExcel(req.body.datos).xlsx.write(res);
// });

module.exports = router;