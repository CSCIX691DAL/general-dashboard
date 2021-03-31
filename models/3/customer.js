const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    customer_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "customer_id"
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
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name"
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name"
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "email"
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
    active: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "active"
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "create_date"
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
    tableName: "customer",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_store_id",
      unique: false,
      type: "BTREE",
      fields: ["store_id"]
    }, {
      name: "idx_fk_address_id",
      unique: false,
      type: "BTREE",
      fields: ["address_id"]
    }, {
      name: "idx_last_name",
      unique: false,
      type: "BTREE",
      fields: ["last_name"]
    }]
  };
  const CustomerModel = sequelize.define("customer_model", attributes, options);
  return CustomerModel;
};