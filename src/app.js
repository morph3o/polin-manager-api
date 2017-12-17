import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import models from './models';

import usuariosRouter from './routers/usuario.router';

const port = 8081;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(morgan('combine'));

app.use('/usuarios', usuariosRouter);

models.sequelize.sync().then(() => {
  app.listen(port);
  app.on('listening', onListening);
  app.on('error', onError);
});

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = app.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  morgan('Listening on ' + bind);
};

export default app;
