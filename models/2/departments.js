const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    dept_no: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "dept_no"
    },
    dept_name: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "dept_name",
      unique: "dept_name"
    }
  };
  const options = {
    tableName: "departments",
    comment: "",
    timestamps: false,
    indexes: []
  };
  const DepartmentsModel = sequelize.define("departments_model", attributes, options);
  return DepartmentsModel;
};