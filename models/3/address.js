const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    address_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "address_id"
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "address"
    },
    address2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "address2"
    },
    district: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "district"
    },
    city_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "city_id",
      references: {
        key: "city_id",
        model: "city_model"
      }
    },
    postal_code: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "postal_code"
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "phone"
    },
    location: {
      type: DataTypes.GEOMETRY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "location"
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
    tableName: "address",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_city_id",
      unique: false,
      type: "BTREE",
      fields: ["city_id"]
    }, {
      name: "idx_location",
      unique: false,
      type: "SPATIAL",
      fields: ["location"]
    }]
  };
  const AddressModel = sequelize.define("address_model", attributes, options);
  return AddressModel;
};