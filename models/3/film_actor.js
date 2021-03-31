const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    actor_id: {
      type: DataTypes.INTEGER(5).UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: false,
      comment: null,
      field: "actor_id",
      references: {
        key: "actor_id",
        model: "actor_model"
      }
    },
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
    tableName: "film_actor",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_fk_film_id",
      unique: false,
      type: "BTREE",
      fields: ["film_id"]
    }]
  };
  const FilmActorModel = sequelize.define("film_actor_model", attributes, options);
  return FilmActorModel;
};