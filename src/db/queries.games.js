const Game = require('./models').Game;
const Review = require('./models').Review;
const User = require('./models').User;

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
  deleteGame(id, callback) {
    return Game.destroy({
      where: { id }
    })
      .then(game => {
        callback(null, game);
      })
      .catch(err => {
        callback(err);
      });
  },
  updateGame(id, updatedGame, callback) {
    return Game.findById(id).then(game => {
      if (!game) {
        return callback('Game not found');
      }
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
    });
  }
};
