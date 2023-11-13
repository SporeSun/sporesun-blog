const Sequelize = require('sequelize');
const config = require('../config/connection.js'); // Adjust this path based on your config file location
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    dialect:'mysql'
  }
);
// Import models
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Post = require('./Post')(sequelize, Sequelize.DataTypes);
const Comment = require('./Comment')(sequelize, Sequelize.DataTypes);

// Associations
User.hasMany(Post, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
  foreignKey: 'postId',
  onDelete: 'CASCADE',
});

// Export models and sequelize instance
module.exports = {
  sequelize,
  Sequelize,
  User,
  Post,
  Comment,
};
