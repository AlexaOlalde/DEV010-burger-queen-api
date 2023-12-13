const express = require('express');
// const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const connect = require('./connect');
const pkg = require('./package.json');
// const connect = require('./connect');

const { port, secret } = config;
const app = express();
// Establece la configuración de la aplicación
app.set('config', config);
app.set('pkg', pkg);
// Middleware para analizar solicitudes
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Middleware de autenticación
app.use(authMiddleware(secret));

    // Registra las rutas de la app
    routes(app, (err) => {
      if (err) {
        throw err;
      }
      // Middleware de manejo de errores
      app.use(errorHandler);
      // Inicia el servidor Express
      app.listen(port, () => {
        console.info(`App listening on port ${port}`);
      });
    });
  })

  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
