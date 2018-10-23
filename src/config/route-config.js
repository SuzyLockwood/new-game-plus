module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const userRoutes = require('../routes/users');
    const gameRoutes = require('../routes/games');

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(gameRoutes);
  }
};
