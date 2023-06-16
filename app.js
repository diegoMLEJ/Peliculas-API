'use strict'

const express = require('express');
var bodyParser = require('body-parser');
var usuario_ruta = require('./rutas/usuarioRuta.js');

const app = express();

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.use('/api', usuario_ruta);

module.exports = app;
