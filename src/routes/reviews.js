const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/reviewController');
const validation = require('./validation');
const helper = require('../auth/helpers');

router.get('/games/:id/reviews', reviewController.index);
router.get(
  '/games/:id/reviews/new',
  helper.ensureAuthenticated,
  validation.checkReviewExistence,
  reviewController.new
);
router.post(
  '/games/:id/reviews/create',
  helper.ensureAuthenticated,
  validation.checkReviewExistence,
  validation.validateReviews,
  reviewController.create
);
router.post('/games/:gameId/reviews/:id/destroy', reviewController.destroy);
router.get('/games/:gameId/reviews/:id/edit', reviewController.edit);
router.post(
  '/games/:gameId/reviews/:id/update',
  validation.validateReviews,
  reviewController.update
);

module.exports = router;
