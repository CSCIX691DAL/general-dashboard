const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    rental_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "rental_id"
    },
    rental_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rental_date"
    },
    inventory_id: {
      type: DataTypes.INTEGER(8).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "inventory_id",
      references: {
        key: "inventory_id",
        model: "inventory_model"
      }
    },
    customer_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "customer_id",
      references: {
        key: "customer_id",
        model: "customer_model"
      }
    },
    return_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "return_date"
    },
    staff_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "staff_id",
      references: {
        key: "staff_id",
        model: "staff_model"
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
    tableName: "rental",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "rental_date",
      unique: true,
      type: "BTREE",
      fields: ["rental_date", "inventory_id", "customer_id"]
    }, {
      name: "idx_fk_inventory_id",
      unique: false,
      type: "BTREE",
      fields: ["inventory_id"]
    }, {
      name: "idx_fk_customer_id",
      unique: false,
      type: "BTREE",
      fields: ["customer_id"]
    }, {
      name: "idx_fk_staff_id",
      unique: false,
      type: "BTREE",
      fields: ["staff_id"]
    }]
  };
  const RentalModel = sequelize.define("rental_model", attributes, options);
  return RentalModel;
};