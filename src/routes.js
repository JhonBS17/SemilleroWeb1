const express = require('express'),
    router = express.Router(),
    request = require('request');

// Direccionar a la ruta principal (index)
router.get('/', (req, res) => {
    res.render('index');
});

// Obtener la data desde Oracle Cloud
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

module.exports = router;