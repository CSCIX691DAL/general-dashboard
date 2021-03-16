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
  },
  homepage_contents: {
    type: DataTypes.STRING(160),
    allowNull: true,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: false,
    comment: null,
    field: "homepage_contents"
  },
  Admin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "Admin"
  }
};
