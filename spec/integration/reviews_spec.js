const request = require('request');
const server = require('../../src/server');
const base = 'http://localhost:3000/games';

const sequelize = require('../../src/db/models/index').sequelize;
const Review = require('../../src/db/models').Review;
const Game = require('../../src/db/models').Game;

describe('routes : reviews', () => {
  beforeEach(done => {
    this.game;
    this.review;

    sequelize.sync({ force: true }).then(res => {
      Game.create({
        title: 'Mario',
        image: 'https://i.imgur.com/bWc2Aak.jpg',
        description:
          'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship, to rescue Princess Peach from Bowser.',
        userId: user.id
      }).then(game => {
        this.game = game;

        Review.create({
          rating: 2,
          body: 'It was okay.',
          gameId: this.game.id
        })
          .then(review => {
            this.review = review;
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /games/:gameId/reviews/new', () => {
    it('should render a new review form', done => {
      request.get(`${base}/${game.id}/reviews/new`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('New Review');
        done();
      });
    });
  });
  describe('POST /games/:gameId/reviews/create', () => {
    it('should create a new review and redirect', done => {
      const options = {
        url: `${base}/${this.game.id}/reviews/create`,
        form: {
          rating: 3,
          body:
            'Without a doubt my favorite game but give a 3 because so expensive.'
        }
      };
      request.review(options, (err, res, body) => {
        Review.findOne({
          where: {
            body:
              'Without a doubt my favorite game but give a 3 because so expensive.'
          }
        })
          .then(review => {
            expect(review).not.toBeNull();
            expect(review.rating).toBe(3);
            expect(review.body).toBe(
              'Without a doubt my favorite game but give a 3 because so expensive.'
            );
            expect(review.gameId).not.toBeNull();
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });
  describe('GET /games/:gameId/reviews/:id', () => {
    it('should render a view with the selected review', done => {
      request.get(
        `${base}/${this.game.id}/reviews/${this.review.id}`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('It was okay.');
          done();
        }
      );
    });
  });
  describe('POST /games/:gameId/reviews/:id/destroy', () => {
    it('should delete the review with the associated ID', done => {
      expect(review.id).toBe(1);

      request.review(
        `${base}/${this.game.id}/reviews/${this.review.id}/destroy`,
        (err, res, body) => {
          Review.findById(1).then(review => {
            expect(err).toBeNull();
            expect(review).toBeNull();
            done();
          });
        }
      );
    });
  });
  describe('GET /games/:gameId/reviews/:id/edit', () => {
    it('should render a view with an edit review form', done => {
      request.get(
        `${base}/${this.game.id}/reviews/${this.review.id}/edit`,
        (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain('Edit Review');
          expect(body).toContain("'It was okay.'");
          done();
        }
      );
    });
  });
  describe('POST /games/:gameId/reviews/:id/update', () => {
    it('should return a status code 302', done => {
      request.review(
        {
          url: `${base}/${game.id}/reviews/${review.id}/update`,
          form: {
            title: 'Mansion Game',
            body: 'Mario is not in this game.'
          }
        },
        (err, res, body) => {
          expect(res.statusCode).toBe(302);
          done();
        }
      );
    });

    it('should update the review with the given values', done => {
      const options = {
        url: `${base}/${this.game.id}/reviews/${this.review.id}/update`,
        form: {
          body: 'Luigi is the best.'
        }
      };
      request.post(options, (err, res, body) => {
        expect(err).toBeNull();

        Review.findOne({
          where: { id: this.review.id }
        }).then(review => {
          expect(review.body).toBe('Luigi is the best.');
          done();
        });
      });
    });
  });
});
