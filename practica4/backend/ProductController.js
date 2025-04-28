const express = require('express');
const router = express.Router();
const Product = require('./ProductModel');

// Obtener todos
router.get('/', (req, res) => {
    Product.getAll((err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Crear
router.post('/', (req, res) => {
    Product.create(req.body, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Actualizar
router.put('/:id', (req, res) => {
    Product.update(req.params.id, req.body, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

// Eliminar
router.delete('/:id', (req, res) => {
    Product.delete(req.params.id, (err, results) => {
        if (err) res.status(500).send(err);
        else res.json(results);
    });
});

module.exports = router;
