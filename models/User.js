const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Passwords should be at least 8 characters long
      },
    },
  },
  {
    hooks: {
      // Before saving the user, hash the password
      async beforeCreate(userData) {
        userData.password = await bcrypt.hash(userData.password, 10);
        return userData;
      },
      async beforeUpdate(userData) {
        if (userData.changed('password')) {
          userData.password = await bcrypt.hash(userData.password, 10);
        }
        return userData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;
