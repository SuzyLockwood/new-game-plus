const sequelize = require('../../src/db/models/index').sequelize;
const User = require('../../src/db/models').User;
const Game = require('../../src/db/models').Game;
const Review = require('../../src/db/models').Review;

describe('Review', () => {
  beforeEach(done => {
    this.game;
    this.review;
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

            Review.create({
              rating: 1,
              body: 'I have seen better games.',
              gameId: this.game.id
            }).then(review => {
              this.review = review;
              done();
            });
          })
          .catch(err => {
            console.log(err);
            done();
          });
      });
    });
  });

  describe('#create()', () => {
    it('should create a review object with a rating, body, and assigned review', done => {
      Review.create({
        rating: 5,
        body: 'The best game in the world.',
        reviewId: this.review.id
      })
        .then(review => {
          expect(review.rating).toBe(5);
          expect(review.body).toBe('The best game in the world.');
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it('should not create a review with missing rating, body, or assigned game', done => {
      Review.create({
        rating: 2
      })
        .then(review => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain('Review.body cannot be null');
          expect(err.message).toContain('Review.gameId cannot be null');
          done();
        });
    });
  });
  describe('#setGame()', () => {
    it('should associate a game and a review together', done => {
      Game.create({
        title: 'Mario',
        image: 'https://i.imgur.com/bWc2Aak.jpg',
        description:
          'Super Mario Odyssey is a platform game in which players control Mario as he travels across many different worlds on the Odyssey, a hat-shaped ship, to rescue Princess Peach from Bowser.',
        userId: user.id
      }).then(newGame => {
        expect(this.review.gameId).toBe(this.game.id);
        this.review.setGame(newGame).then(review => {
          expect(review.gameId).toBe(newGame.id);
          done();
        });
      });
    });
  });
  describe('#getGame()', () => {
    it('should return the associated game', done => {
      this.post.getGame().then(associatedGame => {
        expect(associatedGame.title).toBe('Mario');
        done();
      });
    });
  });
});
