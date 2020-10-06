const PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();

const path = require('path');
const multer = require('multer');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes');
app.use('/', routes);

// app.post('/datos', (req, res) => {
//     console.log(req.query);
//     res.end();
// });

app.listen(PORT, () => {
    console.log('Server on port', PORT);
});
