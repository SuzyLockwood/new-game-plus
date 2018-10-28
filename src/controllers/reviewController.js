const reviewQueries = require('../db/queries.reviews.js');
const Authorizer = require('../policies/application');

module.exports = {
  index(req, res, next) {
    reviewQueries.getAllGameReviews(req.params.id, (err, game) => {
      if (err || game == null) {
        res.redirect(404, '/');
      } else {
        res.render('reviews/index', { game });
      }
    });
  },
  new(req, res, next) {
    reviewQueries.getNewReviewForm(req.params.id, (err, game) => {
      if (err || game == null) {
        res.redirect(404, '/games');
      } else {
        res.render('reviews/new', { game });
      }
    });
  },
  create(req, res, next) {
    let newReview = {
      rating: req.body.rating,
      body: req.body.body,
      gameId: req.params.id,
      userId: req.user.id
    };
    reviewQueries.addReview(newReview, (err, review) => {
      if (err) {
        res.redirect(500, '/reviews/new');
      } else {
        req.flash('success', 'Thank you for your review!');
        res.redirect(303, `/games/${newReview.gameId}`);
      }
    });
  },

  destroy(req, res, next) {
    reviewQueries.deleteReview(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(
          500,
          `/games/${req.params.gameId}/reviews/${req.params.id}`
        );
      } else {
        req.flash('success', 'Review has been successfully deleted.');
        res.redirect(303, `/games/${req.params.gameId}`);
      }
    });
  },

  edit(req, res, next) {
    reviewQueries.getReview(req.params.id, (err, review) => {
      if (err || review == null) {
        res.redirect(404, '/');
        console.log(err);
      } else {
        res.render('reviews/edit', { review });
      }
    });
  },

  update(req, res, next) {
    reviewQueries.updateReview(req.params.id, req.body, (err, review) => {
      if (err || review == null) {
        res.redirect(
          404,
          `/games/${req.params.gameId}/reviews/${req.params.id}/edit`
        );
      } else {
        res.redirect(303, `/games/${req.params.gameId}`);
      }
    });
  }
};
