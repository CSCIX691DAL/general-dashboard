const BackendAuth = require("../backend/BackendAuth");
module.exports = sequelize => {
  const express = require('express');
  const router = express.Router();
  const empStruc = require('../src/models/employees');

  const seqEmployee = sequelize.define("employees", empStruc, { timestamps: false });
  const { QueryTypes } = require('sequelize');
  // these routes require authentication
  const auth = new BackendAuth(sequelize);

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

  router.get('/execute', auth.authParser(), function (req, res, next) {
    const sql = req.query.sql;
    //use raw queries pass from query for type 1 and 2 report
    sequelize.query(sql, {
      model: seqEmployee,
      mapToModel: true // pass true here if you have any mapped fields
    })
      .then(data => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  return router;
};
