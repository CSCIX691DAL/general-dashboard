const { DataTypes } = require('sequelize')
module.exports = {
    EmployeeID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "emp_no"
    },
    BirthDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "birth_date"
    },
    FirstName: {
        type: DataTypes.STRING(14),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "first_name"
    },
    LastName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "last_name"
    },
    Gender: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
        autoIncrement: false,
        comment: null,
        field: "gender"
    },
    HireDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: null,
        primaryKey: true,
        autoIncrement: false,
        comment: null,
        field: "hire_date"
    }
};
