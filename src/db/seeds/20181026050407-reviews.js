'use strict';

let reviews = [
  {
    rating: 5,
    body:
      'What is there not to love about Mario? You can be so many items in this game that it keeps the flow fresh and the puzzles intriguing.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 1,
    userId: 1
  },
  {
    rating: 5,
    body:
      'Undoubtedly one of the best games of the year. It will keep you entertained for hours.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 1,
    userId: 2
  },
  {
    rating: 5,
    body:
      'If I could rate this game higher, I would. It is a game that keeps on giving and well worth the money.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 1,
    userId: 3
  },
  {
    rating: 2,
    body: 'Lack of multi-player makes this game boring and redundant.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 2,
    userId: 3
  },
  {
    rating: 4,
    body:
      'An amazing game that engages you in the story and decision-making process.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 3,
    userId: 4
  },
  {
    rating: 2,
    body: 'I do not like games that feel half-finished.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 2,
    userId: 4
  },
  {
    rating: 3,
    body: 'For the price, the game is okay. I wish there was more content.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 2,
    userId: 5
  },
  {
    rating: 4,
    body:
      'Excellent game to binge and never gets old. The bugs detract from it so will not be a perfect score from me, but let me tell you, buy this game.',
    createdAt: new Date(),
    updatedAt: new Date(),
    gameId: 3,
    userId: 5
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
