const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    category_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "category_id"
    },
    name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
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
    tableName: "category",
    comment: "",
    timestamps: false,
    indexes: []
  };
  const CategoryModel = sequelize.define("category_model", attributes, options);
  return CategoryModel;
};