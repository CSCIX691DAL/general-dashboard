const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
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
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "homepage_contents"
    },
    Admin: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "Admin"
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "creation_date"
    }
  };
  const options = {
    tableName: "Users",
    comment: "",
    timestamps: false,
    indexes: []
  };
  const UsersModel = sequelize.define("Users_model", attributes, options);
  return UsersModel;
};