'use strict'

const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');
var usuario_ruta = require('./rutas/usuarioRuta.js');

const app = express();

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', usuario_ruta);

module.exports = app;
