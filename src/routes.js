const express = require('express'),
    router = express.Router(),
    request = require('request');

// Direccionar a la ruta principal (index)
router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;