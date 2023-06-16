'use strict'

const bcrypt = require('bcrypt');
var usuarioModelo = require('../modelo/usuarios');
var usuario = new usuarioModelo();
var fs = require('fs');
var path = require('path');
const { rejects } = require('assert');

function registrarUsuario(req, res){
    var params = req.body;
    console.log(params);

    var nuevoUsuario = new usuario();
    nuevoUsuario.nombre = params.nombre;
    nuevoUsuario.apellido = params.apellido;
    nuevoUsuario.email = params.email;
    nuevoUsuario.phone = params.phone;

    return new Promise((resolve, reject) => {
        if (params.password) {
            bcrypt.hash(params.password, 10, function(err, hash){  
                nuevoUsuario.password = hash;
                if (nuevoUsuario.nombre != null && nuevoUsuario.apellido != null && nuevoUsuario.email != null){
                    nuevoUsuario.save()
                        .then(usuarioAlmacenado => {
                            if (!usuarioAlmacenado){
                                reject({ status: 400, message: 'No se ha registrado el usuario'})
                            } else {
                                resolve({ status: 200, data: {
                                    id: usuarioAlmacenado._id,
                                    nombre: usuarioAlmacenado.nombre,
                                    apellido: usuarioAlmacenado.apellido,
                                    email: usuarioAlmacenado.email,
                                    password: usuarioAlmacenado.password,
                                    phone: usuarioAlmacenado.phone
                                }})
                                console.log(usuarioAlmacenado);
                            }
                        })
                        .catch(err => {
                            reject({ status: 500, message: 'Error al guardar el usuario'})
                        });
                } else {
                    reject({ status: 400, message: 'Debe ingresar todos los campos'})
                }
            })
        } else {
            reject({ status: 400, message: 'Debe ingresar el password'})
        }
    })
    .then(result =>{
        res.status(result.status).json(result.data);
    })
    .catch(error => {
        res.status(error.status).json(error.message)
    })
}

module.exports = {
    registrarUsuario,
};
