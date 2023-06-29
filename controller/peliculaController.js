const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Pelicula = require('../models/Pelicula');

exports.insertarPelicula = async (req, res) => {
  try {
    let peliculaData = req.body;
    let pelicula = new Pelicula(peliculaData);

    // Descargar imagen desde un enlace de Internet
    if (peliculaData.imagen.startsWith('http')) {
      const response = await axios.get(peliculaData.imagen, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');

      // Generar un nombre único para la imagen
      const imageName = `${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;

      // Guardar la imagen en el sistema de archivos
      const imagePath = path.join(__dirname, '../public/images', imageName);
      fs.writeFileSync(imagePath, imageBuffer);

      pelicula.imagen = imageName;
    }

    await pelicula.save();
    res.send(pelicula);
  } catch (error) {
    console.error(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerPeliculas = async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    res.json(peliculas);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.actualizarPelicula = async (req, res) => {
  try {
    const { nombre, categoria, director, fechaEstreno, clasificacion, imagen } = req.body;
    let pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      res.status(404).json({ msg: 'No existe la pelicula' });
    }

    pelicula.nombre = nombre;
    pelicula.categoria = categoria;
    pelicula.director = director;
    pelicula.fechaEstreno = fechaEstreno;
    pelicula.clasificacion = clasificacion;
    pelicula.imagen = imagen;


    pelicula = await Pelicula.findOneAndUpdate({ _id: req.params.id }, pelicula, { new: true });
    res.json(pelicula);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.obtenerPelicula = async (req, res) => {
  try {
    let pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      res.status(404).json({ msg: 'No existe la pelicula' });
    }

    res.json(pelicula);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};

exports.eliminarPelicula = async (req, res) => {
  try {
    let pelicula = await Pelicula.findById(req.params.id);

    if (!pelicula) {
      res.status(404).json({ msg: 'No existe la pelicula' });
    }

    await Pelicula.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: 'Pelicula eliminada con exito' });
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error');
  }
};
