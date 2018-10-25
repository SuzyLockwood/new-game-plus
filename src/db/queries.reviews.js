const Review = require('./models').Review;
const Game = require('./models').Game;
const User = require('./models').User;

module.exports = {
  addReview(newReview, callback) {
    return Review.create(newReview)
      .then(review => {
        callback(null, review);
      })
      .catch(err => {
        callback(err);
      });
  },
  getReview(id, callback) {
    return Review.findById(id, {
      include: [{ model: Game }, { model: User }]
    })
      .then(review => {
        callback(null, review);
      })
      .catch(err => {
        callback(err);
      });
  },
  deleteReview(id, callback) {
    return Review.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },

  updateReview(id, updatedReview, callback) {
    return Review.findById(id).then(review => {
      if (!review) {
        return callback('Review not found');
      }

      review
        .update(updatedReview, {
          fields: Object.keys(updatedReview)
        })
        .then(() => {
          callback(null, review);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
