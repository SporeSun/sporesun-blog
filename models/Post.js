const { Model, DataTypes } = require('sequelize');

class Post extends Model {}

Post.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: true, // Enable createdAt and updatedAt
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
