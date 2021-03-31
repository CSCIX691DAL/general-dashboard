const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    ID: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "ID",
      unique: "ID_UNIQUE"
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
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "user_id",
      unique: "user_id_UNIQUE"
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