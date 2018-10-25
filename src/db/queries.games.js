const Game = require('./models').Game;
const Review = require('./models').Review;
const User = require('./models').User;
const Authorizer = require('../policies/application');

module.exports = {
  getAllGames(callback) {
    return Game.all()
      .then(games => {
        callback(null, games);
      })
      .catch(err => {
        callback(err);
      });
  },
  addGame(newGame, callback) {
    return Game.create(newGame)
      .then(game => {
        callback(null, game);
      })
      .catch(err => {
        callback(err);
      });
  },
  getGame(id, callback) {
    return Game.findById(id, {
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [{ model: User }]
        }
      ]
    })
      .then(game => {
        callback(null, game);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteGame(req, callback) {
    return Game.findById(req.params.id)
      .then(game => {
        const authorized = new Authorizer(req.user, game).destroy();

        if (authorized) {
          game.destroy().then(res => {
            callback(null, game);
          });
        } else {
          req.flash('notice', 'You are not authorized to do that.');
          callback(401);
        }
      })
      .catch(err => {
        callback(err);
      });
  },
  updateGame(req, updatedGame, callback) {
    return Game.findById(req.params.id).then(game => {
      if (!game) {
        return callback('Game not found');
      }
      const authorized = new Authorizer(req.user, game).update();
      if (authorized) {
        game
          .update(updatedGame, {
            fields: Object.keys(updatedGame)
          })
          .then(() => {
            callback(null, game);
          })
          .catch(err => {
            callback(err);
          });
      } else {
        req.flash('notice', 'You are not authorized to do that.');
        callback('Forbidden');
      }
    });
  }
};
