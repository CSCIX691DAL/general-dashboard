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
      autoIncrement: true,
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
    },
    release_year: {
      type: year(4),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "release_year"
    },
    language_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "language_id",
      references: {
        key: "language_id",
        model: "language_model"
      }
    },
    original_language_id: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "original_language_id",
      references: {
        key: "language_id",
        model: "language_model"
      }
    },
    rental_duration: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: "3",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rental_duration"
    },
    rental_rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "4.99",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rental_rate"
    },
    length: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "length"
    },
    replacement_cost: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: "19.99",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "replacement_cost"
    },
    rating: {
      type: DataTypes.ENUM('G', 'PG', 'PG-13', 'R', 'NC-17'),
      allowNull: true,
      defaultValue: "G",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "rating"
    },
    special_features: {
      type: set('trailers', 'commentaries', 'deleted scenes', 'behind the scenes'),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "special_features"
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
    tableName: "film",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_title",
      unique: false,
      type: "BTREE",
      fields: ["title"]
    }, {
      name: "idx_fk_language_id",
      unique: false,
      type: "BTREE",
      fields: ["language_id"]
    }, {
      name: "idx_fk_original_language_id",
      unique: false,
      type: "BTREE",
      fields: ["original_language_id"]
    }]
  };
  const FilmModel = sequelize.define("film_model", attributes, options);
  return FilmModel;
};