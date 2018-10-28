const User = require('../db/models').User;
const Game = require('../db/models').Game;
const Review = require('../db/models').Review;

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

  // checkReviewExistence checks if a user already reviewed the game, only one review per user is allowed
  checkReviewExistence(req, res, next) {
    //check if game exists
    Game.findById(req.params.id).then(game => {
      if (!game) {
        req.flash('error', 'Game not found.');
        res.redirect('back');
      } else {
        let currentUserId = req.user.id;
        let currentGameId = req.params.id;
        //check if review exists for game and user
        Review.find({
          where: { userId: currentUserId, gameId: currentGameId }
        }).then(review => {
          if (review) {
            req.flash('error', 'You already wrote a review for this game.');
            res.redirect('back');
          } else {
            return next();
          }
        });
      }
    });
  }
};
