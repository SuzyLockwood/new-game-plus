'use strict';
// const faker = require('faker');

// let games = [];
// for (let i = 1; i <= 5; i++) {
//   games.push({
//     title: faker.hacker.noun(),
//     image: faker.image.imageUrl(),
//     description: faker.hacker.phrase(),
//     createdAt: new Date(),
//     updatedAt: new Date(),
//     userId: i
//   });
// }

let games = [
  {
    title: 'Super Mario Odyssey',
    image: 'https://i.imgur.com/bWc2Aak.jpg',
    description:
      'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship,to rescue Princess Peach from Bowser.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1
  },
  {
    title: 'God of War (2018)',
    image: 'https://i.imgur.com/8rPLFU8.jpg',
    description:
      'God of War is the eighth installment in the franchise overall. Unlike previous installments, this game focuses on Norse mythology and follows an older and more seasoned Kratos, and his new son Atreus.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2
  },
  {
    title: 'Hollow Knight',
    image: 'https://i.imgur.com/3kiyQAA.jpg',
    description:
      'Hollow Knight is a classically styled 2D action adventure across a vast interconnected world.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3
  },
  {
    title: 'Octopath Traveler',
    image: 'https://i.imgur.com/ir1YHDy.jpg',
    description:
      'Octopath Traveler is a role-playing game that sports a graphical aesthetic known as "HD-2D", which is defined by the developers as combining 16-bit Super NES-style character sprites and textures with polygonal environments and high-definition effects.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3
  },
  {
    title: 'Detroit: Become Human',
    image: 'https://i.imgur.com/tKLvAUf.png',
    description:
      'Inspired by the short called “Kara”, Detroit is a neo-noir thriller set in the near-future city of Detroit. Androids, who look exactly like human beings, have replaced humans in most tasks.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4
  },
  {
    title: 'Sea of Thieves',
    image: 'https://i.imgur.com/lV7Msw4.jpg',
    description:
      'Sea of Thieves is a pirate-themed action-adventure cooperative multiplayer game played from a first-person perspective.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4
  },
  {
    title: 'The Legend of Zelda: Breath of the Wild',
    image: 'https://i.imgur.com/kTEOQIn.jpg',
    description:
      'Step into a world of discovery, exploration, and adventure in The Legend of Zelda: Breath of the Wild, a boundary-breaking new game in the acclaimed series.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5
  },
  {
    title: 'Far Cry 5',
    image: 'https://i.imgur.com/BmXRdtO.jpg',
    description:
      'Far Cry 5 is a massive gameplay arena that is filled with something new around every bend. The enemy AI behavior is more realistic, and the exploration is endless.',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5
  }
];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Games', games, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {});
  }
};
