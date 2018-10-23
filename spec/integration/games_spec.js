const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/games/';
const sequelize = require('../../src/db/models/index').sequelize;
const Game = require('../../src/db/models').Game;
const User = require('../../src/db/models').User;

describe('routes : games', () => {
  beforeEach(done => {
    this.game;
    this.user;

    sequelize.sync({ force: true }).then(res => {
      User.create({
        username: 'myTestUser',
        email: 'starman@tesla.com',
        password: 'Trekkie4lyfe',
        userId: this.user.id
      }).then(user => {
        this.user = user;
        Game.create({
          title: 'Mario',
          image: 'https://i.imgur.com/bWc2Aak.jpg',
          description:
            'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship, to rescue Princess Peach from Bowser.',
          userId: user.id
        })
          .then(game => {
            this.game = game;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /games', () => {
    it('should return a status code 200 and trending games', done => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(err).toBeNull();
        expect(body).toContain('New and Trending');
        expect(body).toContain('Mario');
        done();
      });
    });
  });
  describe('GET /games/new', () => {
    it('should render a new game form', done => {
      request.get(`${base}new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Game');
        done();
      });
    });
  });

  describe('POST /games/create', () => {
    const options = {
      url: `${base}create`,
      form: {
        title: 'Mario',
        image: 'https://i.imgur.com/bWc2Aak.jpg',
        description:
          'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship, to rescue Princess Peach from Bowser.',
        userId: this.user.id
      }
    };

    it('should create a new game and redirect', done => {
      request.post(options, (err, res, body) => {
        Game.findOne({ where: { title: 'Mario' } })
          .then(game => {
            expect(res.statusCode).toBe(303);
            expect(game.title).toBe('Mario');
            expect(game.description).toBe(
              'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship, to rescue Princess Peach from Bowser.'
            );
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /games/:id', () => {
    it('should render a view with the selected game', done => {
      request.get(`${base}${this.game.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Mario');
        done();
      });
    });
  });
  describe('POST /games/:id/destroy', () => {
    it('should delete the game with the associated ID', done => {
      Game.all().then(games => {
        const gameCountBeforeDelete = games.length;

        expect(gameCountBeforeDelete).toBe(1);

        request.post(`${base}${this.game.id}/destroy`, (err, res, body) => {
          Game.all().then(games => {
            expect(err).toBeNull();
            expect(games.length).toBe(gameCountBeforeDelete - 1);
            done();
          });
        });
      });
    });
  });
  describe('GET /games/:id/edit', () => {
    it('should render a view with an edit game form', done => {
      request.get(`${base}${this.game.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Mario');
        expect(body).toContain('platform');
        done();
      });
    });
  });
  describe('POST /games/:id/update', () => {
    it('should update the game with the given values', done => {
      const options = {
        url: `${base}${this.game.id}/update`,
        form: {
          title: 'Super Mario Odyssey',
          image: 'https://i.imgur.com/bWc2Aak.jpg',
          description:
            'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship, to rescue Princess Peach from Bowser.',
          userId: this.user.id
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();
        Game.findOne({
          where: { id: this.game.id }
        }).then(game => {
          expect(game.title).toBe('Super Mario Odyssey');
          done();
        });
      });
    });
  });
});
