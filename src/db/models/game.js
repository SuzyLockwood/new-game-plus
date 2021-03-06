'use strict';
module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define(
    'Game',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Game.associate = function(models) {
    // associations can be defined here
    Game.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Game.hasMany(models.Review, {
      foreignKey: 'gameId',
      as: 'reviews'
    });
  };
  return Game;
};
