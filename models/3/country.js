const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    country_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "country_id"
    },
    country: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "country"
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
    tableName: "country",
    comment: "",
    timestamps: false,
    indexes: []
  };
  const CountryModel = sequelize.define("country_model", attributes, options);
  return CountryModel;
};