const {DataTypes} = require('sequelize')
module.exports={
  ID: {
    type: DataTypes.STRING(45),
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "ID"
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
