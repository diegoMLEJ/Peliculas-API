const mongoose = require('mongoose');

const PeliculasSchema =  mongoose.Schema({
    nombre: {
        type: 'String',
        required: true
    },
    categoria: {
        type: 'String',
        required: true
    },
    director: {
        type: 'String',
        required: true
    },
    fechaEstreno: {
        type: 'Date',
        required: true
    },
    clasificacion: {
        type: 'String',
        required: true
    },
    imagen: {
      type: String,
      required: true
    }

})

module.exports = mongoose.model('Peliculas', PeliculasSchema);