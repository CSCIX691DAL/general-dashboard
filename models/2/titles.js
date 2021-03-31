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
      field: "emp_no",
      references: {
        key: "emp_no",
        model: "employees_model"
      }
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    from_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "from_date"
    },
    to_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "to_date"
    }
  };
  const options = {
    tableName: "titles",
    comment: "",
    timestamps: false,
    indexes: []
  };
  const TitlesModel = sequelize.define("titles_model", attributes, options);
  return TitlesModel;
};