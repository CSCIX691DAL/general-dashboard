const {INTEGER} = require("sequelize");
const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
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
    },
    homepage_contents: {
      type: DataTypes.STRING(160),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "homepage_contents"
    },
    Admin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: false,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Admin"
    }
  };
  const options = {
    tableName: "Users",
    comment: "",
    indexes: []
  };
  const UsersModel = sequelize.define("Users_model", attributes, options);
  return UsersModel;
};
