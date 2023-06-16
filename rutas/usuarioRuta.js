'use strict'
var express = require('express');
var usuarioControl = require('../control/usuarioControl.js');
var api = express.Router();

var multipart = require('connect-multiparty');

//Solicitudes para consultas 
api.post('/registrar', usuarioControl.registrarUsuario);


module.exports = api;