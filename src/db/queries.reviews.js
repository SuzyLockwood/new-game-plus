const Review = require('./models').Review;
const Game = require('./models').Game;
const User = require('./models').User;

module.exports = {
  getAllReviews(callback) {
    return Review.all({ include: [{ all: true, nested: true }] })
      .then(reviews => {
        callback(null, reviews);
      })
      .catch(err => {
        callback(err);
      });
  },
  getNewReviewForm(id, callback) {
    return Game.findById(id, {
      include: [{ all: true, nested: true }]
    })
      .then(game => {
        callback(null, game);
      })
      .catch(err => {
        callback(err);
      });
  },
  getAllGameReviews(id, callback) {
    return Game.findById(id, {
      include: [{ all: true, nested: true }]
    })
      .then(game => {
        callback(null, game);
      })
      .catch(err => {
        callback(err);
      });
  },
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
      include: [{ all: true, nested: true }]
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
    return Review.findById(id, {
      include: [{ all: true, nested: true }]
    }).then(review => {
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
