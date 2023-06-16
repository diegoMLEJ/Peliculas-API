'use strict'
var express = require('express');
var usuarioControl = require('../control/usuarioControl.js');
var api = express.Router();


//Solicitudes para consultas 
api.post('/registrar', usuarioControl.registrarUsuario);
api.post('/login', usuarioControl.accesoUsuario);
api.put('/actualizar/:id', usuarioControl.actualizarUsuario);
api.delete('/eliminar/:id', usuarioControl.borrarUsuario);


module.exports = api;