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
    msg: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "msg"
    }
  };
  const options = {
    tableName: "nfagan_test",
    comment: "",
    indexes: []
  };
  const NfaganTestModel = sequelize.define("nfagan_test_model", attributes, options);
  return NfaganTestModel;
};