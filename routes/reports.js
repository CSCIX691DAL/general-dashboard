const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const reportsStruc = require('../src/models/reports');

  const seqReports = sequelize.define("reports", reportsStruc, {timestamps: false});

  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  router.get('/', auth.authParser(), function (req, res, next) {
      seqReports.findAll().then(data => {
        res.status(200).json(data);
      }).catch(err => {
        res.status(500).append("Error", err);
      })
    }
  );
  router.post('/reports', auth.authParser(), function (req, res, next) {
      seqReports.findAll().then(data => {
        res.status(200).json(data);
      }).catch(err => {
        res.status(500).append("Error", err);
      })
    }
  );
  return router;
};
