const express = require("express");
const path = require("path");

const routerViews = require('./routes');
const config = require('./config/config');

const app = express();

// Usamos el motor de las vistas y el directorio en donde están alojadas
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 

app.use(express.static('public'));

// Muestra 
app.get('/', (req, res) => {
    res.send('Hola mi server en express');
});

// LLamamos a las rutas, dependiendo del endpoint de la url
routerViews(app);

// En consola nos muestra el puerto y el entorno de trabajo.
app.listen(3000, () => {
    console.log(`Listening on port ${config.port} in "${config.enviroment}" enviroment`);
})