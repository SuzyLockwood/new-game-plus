const gameQueries = require('../db/queries.games.js');

module.exports = {
  index(req, res, next) {
    gameQueries.getAllGames((err, games) => {
      if (err) {
        res.redirect(500, 'static/index');
      } else {
        res.render('games/index', { games });
      }
    });
  },
  new(req, res, next) {
    res.render('games/new');
  },
  create(req, res, next) {
    let newGame = {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      userId: req.user.id
    };
    gameQueries.addGame(newGame, (err, game) => {
      if (err) {
        res.redirect(500, '/games/new');
      } else {
        res.redirect(303, `/games/${game.id}`);
      }
    });
  },
  show(req, res, next) {
    gameQueries.getGame(req.params.id, (err, game) => {
      if (err || game == null) {
        res.redirect(404, '/');
      } else {
        res.render('games/show', { game });
      }
    });
  },
  destroy(req, res, next) {
    gameQueries.deleteGame(req.params.id, (err, game) => {
      if (err) {
        res.redirect(500, `/games/${game.id}`);
      } else {
        res.redirect(303, '/games');
      }
    });
  },
  edit(req, res, next) {
    gameQueries.getGame(req.params.id, (err, game) => {
      if (err || game == null) {
        res.redirect(404, '/');
      } else {
        res.render('games/edit', { game });
      }
    });
  },
  update(req, res, next) {
    gameQueries.updateGame(req.params.id, req.body, (err, game) => {
      if (err || game == null) {
        res.redirect(404, `/games/${req.params.id}/edit`);
      } else {
        res.redirect(`/games/${game.id}`);
      }
    });
  }
};
