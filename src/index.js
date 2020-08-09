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
app.use(express.urlencoded({extended: true}));
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

// app.post('/subir', async (req, res) => {
//     const data = new Data(req.body);
//     await data.save();
//     res.send(data);
// });

// app.post('/subir', upload.single('file'), (req, res) => {
//     console.log('Storage location');
//     return res.send(req.file);
// });

app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
