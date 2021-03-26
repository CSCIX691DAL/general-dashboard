const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const databaseConn = require('../src/app/models/databaseConnections');

  const dbSeq = databaseConn(sequelize);

  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  router.get('/', auth.authParser(), function (req, res, next) {
      dbSeq.findAll().then(data => {
        res.status(200).json(data);
      }).catch(err => {
        res.status(500).append("Error", err); })
  }
  );


  return router;
};
