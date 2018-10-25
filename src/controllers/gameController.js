const gameQueries = require('../db/queries.games.js');
const Authorizer = require('../policies/application');

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
    gameQueries.deleteGame(req, (err, game) => {
      if (err) {
        res.redirect(err, `/games/${req.params.id}`);
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
        const authorized = new Authorizer(req.user, game).edit();
        if (authorized) {
          res.render('games/edit', { game });
        } else {
          req.flash('You are not authorized to do that.');
          res.redirect(`/games/${req.params.id}`);
        }
      }
    });
  },
  update(req, res, next) {
    gameQueries.updateGame(req, req.body, (err, game) => {
      if (err || game == null) {
        res.redirect(401, `/games/${req.params.id}/edit`);
      } else {
        res.redirect(`/games/${req.params.id}`);
      }
    });
  }
};
