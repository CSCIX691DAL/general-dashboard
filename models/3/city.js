const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    city_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "city_id"
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "city"
    },
    country_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "country_id",
      references: {
        key: "country_id",
        model: "country_model"
      }
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
    tableName: "city",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_country_id",
      unique: false,
      type: "BTREE",
      fields: ["country_id"]
    }]
  };
  const CityModel = sequelize.define("city_model", attributes, options);
  return CityModel;
};