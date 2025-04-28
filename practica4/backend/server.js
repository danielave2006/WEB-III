const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const productRoutes = require('./ProductController');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para la raíz, devuelve un mensaje de bienvenida o algo simple
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API de productos!');
});

// Ruta de productos
app.use('/api/productos', productRoutes);

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});
