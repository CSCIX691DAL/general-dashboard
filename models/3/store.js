const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    store_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "store_id"
    },
    manager_staff_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "manager_staff_id",
      unique: "idx_unique_manager",
      references: {
        key: "staff_id",
        model: "staff_model"
      }
    },
    address_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "address_id",
      references: {
        key: "address_id",
        model: "address_model"
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
    tableName: "store",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_address_id",
      unique: false,
      type: "BTREE",
      fields: ["address_id"]
    }]
  };
  const StoreModel = sequelize.define("store_model", attributes, options);
  return StoreModel;
};