'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.belongsTo(models.users, {
        as: 'post_user',
        foreignKey: 'user_id'
      })
    }
  }
  posts.init({
    content: DataTypes.JSON,
    user_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'posts',
  });
  return posts;
};