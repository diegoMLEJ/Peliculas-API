'use strict'

const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var usuario_ruta = require('./routes/usuarioRuta.js');
var pelicula_ruta = require('./routes/peliculasRuta.js');

const app = express();
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', usuario_ruta);

app.use('/api', pelicula_ruta);

module.exports = app;
