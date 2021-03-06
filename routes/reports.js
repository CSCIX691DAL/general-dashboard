const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const reportsStruc = require('../src/models/reports');

  const seqReports = reportsStruc(sequelize);

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

  router.get('/:id', auth.authParser(), function (req, res, next) {
    const id = req.params.id;
    seqReports.findAll({
      where:
        {
          id: id
        }
    }).then(data => {
        res.status(200).json(data);
      }).catch(err => {
        res.status(500).append("Error", err);
      })
    }
  );

  router.get('/database/:databaseID', auth.authParser(), function (req, res, next) {
      seqReports.findAll({
        where: {
          database_connection_fk: req.params.databaseID
        }
      }).then(data => {
        res.status(200).json(data);
      }).catch(err => {
        res.status(500).append("Error", err);
      })
    }
  );

  router.post('/create', auth.authParser(), function(req, res, ) {
    seqReports.create({
      name: req.body.body.name,
      display_name: req.body.body.display_name,
      sql: req.body.body.sql,
      input_params: req.body.body.input_params,
      model_name: req.body.body.model_name,
      database_connection_fk: req.body.body.database_connection_fk
    }).then(resp => {
      res.status(200).json(resp);
    }).catch(err => {
      console.log(err);
      res.status(500).append("Error", err);
    })
  })
  return router;
};
