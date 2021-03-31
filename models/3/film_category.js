const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    film_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "film_id",
      references: {
        key: "film_id",
        model: "film_model"
      }
    },
    category_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "category_id",
      references: {
        key: "category_id",
        model: "category_model"
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
    tableName: "film_category",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "fk_film_category_category",
      unique: false,
      type: "BTREE",
      fields: ["category_id"]
    }]
  };
  const FilmCategoryModel = sequelize.define("film_category_model", attributes, options);
  return FilmCategoryModel;
};