const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const userReportStruc = require('../src/models/user_report');

  const seqUserReports = sequelize.define("user_reports", userReportStruc, {timestamps: false});

  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  router.post('/execute', auth.authParser(), function(req, res, ) {
    seqUserReports.create({
      user_id_fk: req.token.data.email,
      report_id_fk: req.body.report_id_fk,
      isActive: true,
      input_params_values: req.body.input_params_values
    }).then(resp => {
      res.status(200);
    }).catch(err => {
      console.log(err);
      res.status(500).append("Error", err);
    })
  })
  return router;
};
