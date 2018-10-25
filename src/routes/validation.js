const User = require('../db/models').User;
const Game = require('../db/models').Game;

module.exports = {
  validateUsers(req, res, next) {
    if (req.method === 'POST') {
      req
        .checkBody('username', 'must be at least 4 characters in length')
        .isLength({ min: 4 });
      req.checkBody('email', 'must be valid').isEmail();
      req
        .checkBody('password', 'must be at least 6 characters in length')
        .isLength({ min: 6 });
      req
        .checkBody('passwordConfirmation', 'must match password provided')
        .optional()
        .matches(req.body.password);
    }

    const errors = req.validationErrors();

    if (errors) {
      req.flash('error', errors);
      return res.redirect(req.headers.referer);
    } else {
      return next();
    }
  },

  validateGames(req, res, next) {
    if (req.method === 'POST') {
      req
        .checkBody('title', 'must be at least 2 characters in length')
        .isLength({ min: 2 });
      req
        .checkBody('description', 'must be at least 10 characters in length')
        .isLength({ min: 10 });
    }
    const errors = req.validationErrors();
    if (errors) {
      req.flash('error', errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  },

  validateReviews(req, res, next) {
    if (req.method === 'POST') {
      req
        .checkParams('gameId', 'must be valid')
        .notEmpty()
        .isInt();
      req
        .checkBody('body', 'must be at least 5 characters in length')
        .isLength({ min: 5 });
    }
    const errors = req.validationErrors();
    if (errors) {
      req.flash('error', errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  },

  checkReviewExistence(req, res, next) {
    Game.findById(req.params.id)
      .populate('reviews')
      .exec(function(err, foundGame) {
        if (err || !foundGame) {
          req.flash('error', 'Game not found.');
          res.redirect('back');
        } else {
          //check if req.user.id exists in foundGame.reviews
          let foundUserReview = foundGame.reviews.some(function(review) {
            return review.userId.equals(req.user.id);
          });
          if (foundUserReview) {
            req.flash('error', 'You already wrote a review for this game.');
            return res.redirect('back');
          }
          //if the review was not found, go to the next middleware
          next();
        }
      });
  }
};
