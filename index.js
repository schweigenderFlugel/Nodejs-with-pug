const express = require("express");
const path = require("path");

const routerApi = require('./routes');
const config = require('./config/config');

const app = express();

app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.send('Hola mi server en express');
  });

routerApi(app);

app.listen(3000, () => {
    console.log(`Listening on port ${config.port} in "${config.enviroment}" enviroment`);
})