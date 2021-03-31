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
      autoIncrement: true,
      comment: null,
      field: "actor_id"
    },
    first_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "first_name"
    },
    last_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "last_name"
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
    tableName: "actor",
    comment: "",
    timestamps: false,
    indexes: [{
      name: "idx_actor_last_name",
      unique: false,
      type: "BTREE",
      fields: ["last_name"]
    }]
  };
  const ActorModel = sequelize.define("actor_model", attributes, options);
  return ActorModel;
};