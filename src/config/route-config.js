module.exports = {
  init(app) {
    const staticRoutes = require('../routes/static');
    const userRoutes = require('../routes/users');
    const gameRoutes = require('../routes/games');
    const reviewRoutes = require('../routes/reviews');

    app.use(staticRoutes);
    app.use(userRoutes);
    app.use(gameRoutes);
    app.use(reviewRoutes);
  }
};
