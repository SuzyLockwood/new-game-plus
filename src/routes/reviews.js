const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const validation = require('./validation');
const helper = require('../auth/helpers');

router.get('/games/:gameId/reviews/new', reviewController.new);
router.post(
  '/games/:gameId/reviews/create',
  helper.ensureAuthenticated,
  validation.validateReviews,
  reviewController.create
);
router.get('/games/:gameId/reviews/:id', reviewController.show);
router.post('/games/:gameId/reviews/:id/destroy', reviewController.destroy);
router.get('/games/:gameId/reviews/:id/edit', reviewController.edit);
router.post(
  '/games/:gameId/reviews/:id/update',
  validation.validateReviews,
  reviewController.update
);

module.exports = router;
