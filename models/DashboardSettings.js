const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class DashboardSettings extends Model {}

DashboardSettings.init(
  {
    // Primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Foreign key linking to the User model
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Example setting: layout preference
    layoutPreference: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // More settings can be added as needed
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'dashboardSettings',
  }
);

module.exports = DashboardSettings;
