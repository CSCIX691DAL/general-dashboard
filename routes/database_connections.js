const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const databaseConn = require('../src/models/databaseConnections');

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

  router.post('/databases', auth.authParser(), function (req, res, next) {
    dbSeq.create({
      host_name: req.body.body.host_name,
      port: req.body.body.port,
      username: req.body.body.username,
      password: req.body.body.password,
      schema: req.body.body.schema
    }).then(resp => {
      res.status(200);
    }).catch(err => {
      console.log(err);
      res.status(500).append("Error", err);
    })
    }
  );
  return router;
};
