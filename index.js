const createApp = require('./app');

const port = process.env.PORT || 3000
const httpServer = createApp();

// LISTEN
httpServer.listen(3000, () => {
  console.log(`Estoy escuchando por el puerto ${port}`);
});
