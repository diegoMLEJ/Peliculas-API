'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaUsuarios = Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    phone: String,
});

module.exports = mongoose.model('Usuarios', EsquemaUsuarios);