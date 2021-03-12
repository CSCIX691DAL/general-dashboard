const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const reportsStruc = require('../src/models/reports');

  const seqUser = sequelize.define("reports", reportsStruc, {timestamps: false});


  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  router.get('/test', auth.authParser(), function (req, res, next) {
      res.status(500).append("Error", 'not implemented');
    }
  );

  return router;
};
