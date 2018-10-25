const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const validation = require('./validation');
const helper = require('../auth/helpers');

router.get('/games', gameController.index);
router.get('/games/new', gameController.new);
router.post(
  '/games/create',
  helper.ensureAuthenticated,
  validation.validateGames,
  gameController.create
);
router.get('/games/:id', gameController.show);
router.post('/games/:id/destroy', gameController.destroy);
router.get('/games/:id/edit', gameController.edit);
router.post(
  '/games/:id/update',
  validation.validateGames,
  gameController.update
);

module.exports = router;
