'use strict'
var express = require('express');
var usuarioControl = require('../controller/usuarioControl.js');
var api = express.Router();


//Solicitudes para consultas 
api.post('/registrar', usuarioControl.registrarUsuario);
api.post('/login', usuarioControl.accesoUsuario);
api.put('/editarP/:id', usuarioControl.actualizarUsuario);
api.delete('/eliminar/:id', usuarioControl.borrarUsuario);
api.get('/obtener/:id', usuarioControl.obtenerUsuario);


module.exports = api;