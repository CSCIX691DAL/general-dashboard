const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    inventory_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "inventory_id"
    },
    film_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "film_id",
      references: {
        key: "film_id",
        model: "film_model"
      }
    },
    store_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "store_id",
      references: {
        key: "store_id",
        model: "store_model"
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
    tableName: "inventory",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_film_id",
      unique: false,
      type: "BTREE",
      fields: ["film_id"]
    }, {
      name: "idx_store_id_film_id",
      unique: false,
      type: "BTREE",
      fields: ["store_id", "film_id"]
    }]
  };
  const InventoryModel = sequelize.define("inventory_model", attributes, options);
  return InventoryModel;
};