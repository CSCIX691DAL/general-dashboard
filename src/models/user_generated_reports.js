const {
  DataTypes
} = require('sequelize');

module.exports = {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    defaultValue: null,
    primaryKey: true,
    autoIncrement: true,
    comment: null,
    field: "id"
  },
  user_id_fk: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    foreignKey: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "user_id_fk"
  },
  report_id_fk: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    foreignKey: true,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "report_id_fk"
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "isActive"
  },
  input_params_values: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: null,
    primaryKey: false,
    autoIncrement: false,
    comment: null,
    field: "input_params_values"
  }
};
