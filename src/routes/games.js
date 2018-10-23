const express = require('express');
const router = express.Router();

const gameController = require('../controllers/gameController');

router.get('/games', gameController.index);
router.get('/games/new', gameController.new);
router.post('/games/create', gameController.create);
router.get('/games/:id', gameController.show);
router.post('/games/:id/destroy', gameController.destroy);
router.get('/games/:id/edit', gameController.edit);
router.post('/games/:id/update', gameController.update);

module.exports = router;
