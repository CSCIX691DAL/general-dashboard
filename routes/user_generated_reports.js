const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const userReportStruc = require('../src/models/userGeneratedReports');

  const seqUserReports = sequelize.define("user_generated_reports", userReportStruc, {timestamps: false});

  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  router.post('/create', auth.authParser(), function(req, res, ) {
    const user = auth.users.findAll({where: {ID: req.token.data.email} }).then(data =>{
      console.log(data);
      seqUserReports.create({
        user_id_fk: data[0].user_id,
        report_id_fk: req.body.body.report_id_fk,
        isActive: true,
        input_params_values: req.body.body.input_params_values
      }).then(resp => {
        res.status(200);
      }).catch(err => {
        console.log(err);
        res.status(500).append("Error", err);
      })
    });
  })
  return router;
};
