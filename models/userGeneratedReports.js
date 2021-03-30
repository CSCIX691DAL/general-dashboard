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
    user_id_fk: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "user_id_fk",
      references: {
        key: "user_id",
        model: "Users_model"
      }
    },
    report_id_fk: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "report_id_fk",
      references: {
        key: "id",
        model: "reports_model"
      }
    },
    isActive: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "isActive"
    },
    input_params_values: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "input_params_values"
    }
  };
  const options = {
    tableName: "user_generated_reports",
    comment: "",
    indexes: [{
      name: "user_generated_reports_FK_1",
      unique: false,
      type: "BTREE",
      fields: ["report_id_fk"]
    }, {
      name: "user_generated_reports_FK_2",
      unique: false,
      type: "BTREE",
      fields: ["user_id_fk"]
    }]
  };
  const UserGeneratedReportsModel = sequelize.define("user_generated_reports_model", attributes, options);
  return UserGeneratedReportsModel;
};