'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      // Define associations here
      Project.belongsToMany(models.User, { through: 'UserProject' });
      Project.hasMany(models.Task, { onDelete: 'CASCADE' });
    }
  }

  Project.init(
    {
      projectName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descriptions: {
        type: DataTypes.TEXT,
      },
      // Uncomment if you plan to use assignedMembers and status
      assignedMembers: {
        type: DataTypes.JSON,
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Project',
      // Uncomment if you want to enable timestamps
      // timestamps: true, 
    }
  );

  return Project;
};
