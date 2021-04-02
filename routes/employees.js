const BackendAuth = require("../backend/BackendAuth");
const {Sequelize} = require("sequelize");
module.exports = sequelize => {
  const express = require('express');
  const router = express.Router();
  const empStruc = require('../src/models/employees');

  const seqEmployee = sequelize.define("employees", empStruc, { timestamps: false });
  const { QueryTypes } = require('sequelize');
  // these routes require authentication
  const auth = new BackendAuth(sequelize);
  const sequelizse = new Sequelize(
    process.env.DB_DATABASE || 'x691_G_dashboard',
    process.env.DB_USER || 'x691_G_student',
    process.env.DB_PASSWORD || 'yED3IX83k3BDYrCS',
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 10,
        min: 0,
        idle: 20000
      }
    }
  );

  router.get('/countByGender', auth.authParser(), function (req, res, next) {
      seqEmployee.findAll({
        attributes: [
          'gender',
          [sequelize.fn('COUNT', sequelize.col('gender')), 'SumOfGender']
        ],
        group: 'gender'
      }).then(data => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  router.get('/getAllEmployees', auth.authParser(), function (req, res, next) {

    seqEmployee.findAll({ limit: 50 }).then(data => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  return router;
};
