const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id"
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "name"
    },
    display_name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "display_name"
    },
    sql: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sql"
    },
    input_params: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "input_params"
    },
    model_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      defaultValue: "def",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "model_name"
    },
    database_connection_fk: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "database_connection_fk",
      references: {
        key: "id",
        model: "database_connections_model"
      }
    }
  };
  const options = {
    tableName: "reports",
    comment: "",
    indexes: [{
      name: "reports_FK",
      unique: false,
      type: "BTREE",
      fields: ["database_connection_fk"]
    }]
  };
  const ReportsModel = sequelize.define("reports_model", attributes, options);
  return ReportsModel;
};