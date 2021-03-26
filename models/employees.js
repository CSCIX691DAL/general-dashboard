const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    emp_no: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "emp_no"
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "birth_date"
    },
    first_name: {
      type: DataTypes.STRING(14),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name"
    },
    last_name: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name"
    },
    gender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "gender"
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "hire_date"
    }
  };
  const options = {
    tableName: "employees",
    comment: "",
    indexes: []
  };
  const EmployeesModel = sequelize.define("employees_model", attributes, options);
  return EmployeesModel;
};