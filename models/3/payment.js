const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    payment_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "payment_id"
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
    rental_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rental_id",
      references: {
        key: "rental_id",
        model: "rental_model"
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "amount"
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "payment_date"
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
    tableName: "payment",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_staff_id",
      unique: false,
      type: "BTREE",
      fields: ["staff_id"]
    }, {
      name: "idx_fk_customer_id",
      unique: false,
      type: "BTREE",
      fields: ["customer_id"]
    }, {
      name: "fk_payment_rental",
      unique: false,
      type: "BTREE",
      fields: ["rental_id"]
    }]
  };
  const PaymentModel = sequelize.define("payment_model", attributes, options);
  return PaymentModel;
};