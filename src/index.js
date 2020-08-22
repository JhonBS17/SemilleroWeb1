const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');
const morgan = require('morgan');
const request = require('request');

// let storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './subidas');
//     },
//     filename:(req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// const upload = multer({storage});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

// app.get('/data', (req, res) => {
//     request.get({ 
//         url: 'https://h4ks8u0iblvt8qn-sensores.adb.us-ashburn-1.oraclecloudapps.com/ords/sensores/data/datos',
//         json: true
//       },
//       (error, response, body) => {
//         var data = body.items;
//         res.json({data});
//     });
// });

app.post('/datos', (req, res) => {
    // // var MQ2Value = req.query.mq2;
    // // var voltaje = (MQ2Value*5)/1023;
    // // var Rs = 1000*((5-voltaje)/voltaje); //RL=1k
    // // var alcohol = 0.4091*Math.pow(Rs/5463, -1.497);

    // const RL_VALUE = 5;      // Resistencia RL del modulo en Kilo ohms
    // const R0 = 10;          // Resistencia R0 del sensor en Kilo ohms

    // // Datos para lectura multiple
    // const READ_SAMPLE_INTERVAL = 100;    // Tiempo entre muestras
    // const READ_SAMPLE_TIMES = 5;       // Numero muestras

    // // Ajustar estos valores para vuestro sensor según el Datasheet
    // // (opcionalmente, según la calibración que hayáis realizado)
    // const X0 = 200;
    // const Y0 = 1.7;
    // const X1 = 10000;
    // const Y1 = 0.28;

    // // Puntos de la curva de concentración {X, Y}
    // const punto0 = [Math.log10(X0), Math.log10(Y0)];
    // const punto1 = [Math.log10(X1), Math.log10(Y1)];

    // // Calcular pendiente y coordenada abscisas
    // const scope = (punto1[1] - punto0[1]) / (punto1[0] - punto0[0]);
    // const coord = punto0[1] - punto0[0] * scope;

    // var rs_med = readMQ(req.query.mq2);      // Obtener la Rs promedio
    // var concentration = getConcentration(rs_med / R0);   // Obtener la concentración

    console.log(req.query);

    res.end();

});

// Obtener la resistencia promedio en N muestras
function readMQ(mq_pin) {
    const rs = 0;
    for (var i = 0; i < READ_SAMPLE_TIMES; i++) {
        rs += getMQResistance(analogRead(mq_pin));
        delay(READ_SAMPLE_INTERVAL);
    }
    return rs / READ_SAMPLE_TIMES;
}

// Obtener resistencia a partir de la lectura analogica
function getMQResistance(raw_adc){
    return ((RL_VALUE / 1000.0 * (1023 - raw_adc) / raw_adc));
}

// Obtener concentracion 10^(coord + scope * log (rs/r0)
function getConcentration(rs_ro_ratio){
    return Math.pow(10, coord + scope * Math.log(rs_ro_ratio));
}

app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
