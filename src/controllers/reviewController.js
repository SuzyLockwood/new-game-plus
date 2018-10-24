const reviewQueries = require('../db/queries.reviews.js');

module.exports = {
  new(req, res, next) {
    res.render('reviews/new', { gameId: req.params.gameId });
    console.log(req.params.gameId);
    console.log(req.params);
    console.log(req.game.id);
  },
  create(req, res, next) {
    let newReview = {
      rating: req.body.rating,
      body: req.body.body,
      gameId: req.params.gameId,
      userId: req.user.id
    };
    reviewQueries.createReview(newReview, (err, review) => {
      if (err) {
        res.redirect(500, '/games');
      } else {
        res.redirect(req.headers.referer);
      }
    });
  },
  show(req, res, next) {
    reviewQueries.getReview(req.params.id, (err, review) => {
      if (err || review == null) {
        res.redirect(404, '/');
      } else {
        res.render('reviews/show', { review });
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
        res.redirect(303, `/games/${req.params.gameId}`);
      }
    });
  },
  edit(req, res, next) {
    reviewQueries.getReview(req.params.id, (err, review) => {
      if (err || review == null) {
        res.redirect(404, '/');
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
        res.redirect(`/games/${req.params.gameId}/reviews/${req.params.id}`);
      }
    });
  }
};
