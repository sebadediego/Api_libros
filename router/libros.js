const express = require("express");
const Joi = require("joi");

const routerProductos = express.Router();
const data = require("./data");

const libroSchema = Joi.object({
  id: Joi.number().integer().required(),
  titulo: Joi.string().required(),
  autor: Joi.string().required(),
});

routerProductos.get("/", (req, res, next) => {
  try {
    res.json(data);
  } catch (error) {
    next(error);
  }
});

routerProductos.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const libro = data.find((libro) => libro.id === id);
    if (libro) {
      res.json(libro);
    } else {
      res.json({
        status: 404,
        error: `Libro con id: ${id} no encontrado`,
      });
    }
  } catch (error) {
    next(error);
  }
});

routerProductos.post("/", (req, res, next) => {
  try {
    const { err, value } = libroSchema.validate(req.body);

    if (err) {
      const validationError = new Error("Datos del libro no válidos");
      validationError.status = 400;
      validationError.details = err.details.map((detail) => detail.message);

      throw validationError;
    }

    const newLibro = {
      id: data.length + 1,
      titulo: value.titulo,
      autor: value.autor,
    };

    data.push(newLibro);

    res.status(201).json(value);

  } catch (error) {
    next(error);
  }
});

routerProductos.put("/:id", (req, res, next) => {
  try {
    
    const idBuscado = parseInt(req.params.id);
    const { err, value } = libroSchema.validate(req.body);
    
    if(err){
      const validationError = new Error("Datos del libro no válidos");
      validationError.status = 400;
      validationError.details = err.details.map((detail) => detail.message);

      throw validationError;
    }

    
    
    const libroEncontrado = data.find((libro) => libro.id === idBuscado);
    
    if(!libroEncontrado){
      const validationError = new Error(`Libro con id: ${idBuscado} no encontrado`);
      validationError.status = 404;
      throw validationError;
    }

    libroEncontrado.titulo = value.titulo;
    libroEncontrado.autor = value.autor;

    res.status(200).json(value);


  } catch (error) {
    next(error);
  }
});

routerProductos.delete("/:id", (req, res, next) => {
    try {
        const idBuscado = parseInt(req.params.id);
    
        const posicionLibro = data.findIndex((libro)=> libro.id === idBuscado);
    
        if(posicionLibro === -1){
        const validationError = new Error(`Libro con id: ${idBuscado} no encontrado`);
        validationError.status = 404;
        throw validationError;
        }


        const libroEliminado = data.splice(posicionLibro, 1);
        res.status(200).json(libroEliminado[0]);
    
    
    } catch (error) {
        next(error);
    }
    });

module.exports = routerProductos;
