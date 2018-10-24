'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define(
    'Review',
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: true,
          max: 5,
          min: 1
        }
      },
      body: {
        type: DataTypes.STRING,
        allowNull: false
      },
      gameId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Review.associate = function(models) {
    // associations can be defined here
    Review.belongsTo(models.Game, {
      foreignKey: 'gameId',
      onDelete: 'CASCADE'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Review;
};
