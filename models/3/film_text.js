const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    film_id: {
      type: DataTypes.INTEGER(6),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "film_id"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "title"
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "description"
    }
  };
  const options = {
    tableName: "film_text",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_title_description",
      unique: false,
      type: "FULLTEXT",
      fields: ["title", "description"]
    }]
  };
  const FilmTextModel = sequelize.define("film_text_model", attributes, options);
  return FilmTextModel;
};