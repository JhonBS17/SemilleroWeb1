// Importando los modulos requeridos
const PORT = process.env.PORT || 3000,
    express = require('express'),
    app = express(),
    path = require('path'),
    multer = require('multer'),
    morgan = require('morgan');

// Agregando la configuración necesaria para el proyecto
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const routes = require('./routes');
app.use('/', routes);

// Creando y ejecutando el servidor
app.listen(PORT, () => {
    console.log('Server on port', PORT);
});