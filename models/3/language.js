const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    language_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "language_id"
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    last_update: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_update"
    }
  };
  const options = {
    tableName: "language",
    comment: "",
    timestamps: false,
    indexes: []
  };
  const LanguageModel = sequelize.define("language_model", attributes, options);
  return LanguageModel;
};