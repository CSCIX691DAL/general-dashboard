const {DataTypes} = require('sequelize')
module.exports={
  ID: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "ID"
  },
  FirstName: {
    type: DataTypes.STRING(16),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "FirstName"
  },
  LastName: {
    type: DataTypes.STRING(16),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "LastName"
  },
  Password: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Password"
  }
};
