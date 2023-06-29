'use strict'

const bcrypt = require('bcrypt');
var UsuarioModelo = require('../models/usuarios');
var usuario = new UsuarioModelo();
var fs = require('fs');
var path = require('path');
const { rejects } = require('assert');

function registrarUsuario(req, res) {
    var params = req.body;
    console.log(params);

    var nuevoUsuario = new UsuarioModelo();
    nuevoUsuario.nombre = params.nombre;
    nuevoUsuario.apellido = params.apellido;
    nuevoUsuario.email = params.email;
    nuevoUsuario.phone = params.phone;

    return new Promise((resolve, reject) => {
        if (params.password) {
            bcrypt.hash(params.password, 10, function (err, hash) {
                nuevoUsuario.password = hash;
                if (nuevoUsuario.nombre != null && nuevoUsuario.apellido != null && nuevoUsuario.email != null) {
                    nuevoUsuario.save()
                        .then(usuarioAlmacenado => {
                            if (!usuarioAlmacenado) {
                                reject({ status: 400, message: 'No se ha registrado el usuario' })
                            } else {
                                resolve({
                                    status: 200, data: {
                                        id: usuarioAlmacenado._id,
                                        nombre: usuarioAlmacenado.nombre,
                                        apellido: usuarioAlmacenado.apellido,
                                        email: usuarioAlmacenado.email,
                                        password: usuarioAlmacenado.password,
                                        phone: usuarioAlmacenado.phone
                                    }
                                })
                                console.log(usuarioAlmacenado);
                            }
                        })
                        .catch(err => {
                            reject({ status: 500, message: 'Error al guardar el usuario' })
                        });
                } else {
                    reject({ status: 400, message: 'Debe ingresar todos los campos' })
                }
            })
        } else {
            reject({ status: 400, message: 'Debe ingresar el password' })
        }
    })
        .then(result => {
            res.status(result.status).json(result.data);
        })
        .catch(error => {
            res.status(error.status).json(error.message)
        })
}

function accesoUsuario(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;
    var user;
    UsuarioModelo.findOne({ email: email })
        .then(foundUser => {
            if (!foundUser) {
                throw { status: 404, message: 'El usuario no existe' };
            }
            user = foundUser;
            return bcrypt.compare(password, user.password);
        })
        .then(check => {
            if (check) {
                if (params.gethash) {
                    res.status(200).send({ message: 'El usuario' });
                } else {
                    res.status(200).send({ user: user });
                }
            } else {
                throw { status: 404, message: 'El usuario no se ha identificado' };
            }
        })
        .catch(error => {
            console.error(error);
            res.status(error.status || 500).send(error.message || 'Error en el servidor');
        });
}

function obtenerUsuario(req, res) {
    const userId = req.params.id;
    UsuarioModelo.findById(userId)
        .then(usuario => {
            if (!usuario) {
                res.status(404).send({ message: 'No se ha encontrado el usuario' });
            } else {
                res.status(200).send({ usuario: usuario });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: 'Error en el servidor' });
        });
}

function actualizarUsuario(req, res) {
    var userId = req.params.id;
    var update = req.body; UsuarioModelo.findByIdAndUpdate(userId, update)
        .then(userUpdate => {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido encontrar el usuario' });
            } else {
                res.status(200).send({ user: userUpdate });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send({ message: 'Error al actualizar el usuario en el servidor' });
        });
}

function borrarUsuario(req, res) {
    var userId = req.params.id;

    UsuarioModelo.findOneAndRemove({ _id: userId })
        .then(function (usuarioRemovido) {
            if (!usuarioRemovido) {
                res.status(404).send({ mensaje: 'Usuario no encontrado' });
            } else {
                res.status(200).send({
                    usuario: usuarioRemovido,
                    mensaje: 'Usuario removido'
                });
            }
        })
        .catch(function (error) {
            res.status(500).send({ mensaje: 'Error en el servidor' });
        });
}

module.exports = {
    registrarUsuario,
    accesoUsuario,
    actualizarUsuario,
    borrarUsuario,
    obtenerUsuario,
};
