'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM("To Do", "In Progress", "Done"),
      defaultValue: 'To Do', 
    },
    projectId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  });

  // Defining associations in the static associate method
  Task.associate = (models) => {
    Task.belongsTo(models.Project);
  };

  return Task;
};
