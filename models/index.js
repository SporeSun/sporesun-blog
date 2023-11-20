const Sequelize = require('sequelize');
const config = require('../config/connection.js');
 // Adjust this path based on your config file location
// config.dialect = 'mysql'
// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config
// );
// Import models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const DashboardSettings = require('./DashboardSettings');

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

User.hasOne(DashboardSettings, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

DashboardSettings.belongsTo(User, {
  foreignKey: 'userId',
});
// Export models and sequelize instance
module.exports = {
  //sequelize,
  Sequelize,
  User,
  Post,
  Comment,
  DashboardSettings,
};
