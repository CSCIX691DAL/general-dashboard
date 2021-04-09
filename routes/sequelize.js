const BackendAuth = require("../backend/BackendAuth");
const express = require('express');
const Automate = require("sequelize-automate");
const fs = require('fs');

const modelsPath = "./models"

const databaseConn = require('../src/models/databaseConnections');


module.exports = sequelize => {
  const router = express.Router();
  const dbSeq = databaseConn(sequelize);


  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  router.post('/:databaseID/generate', auth.authParser(), async function (req, res, next) {
    const dbID = req.params.databaseID;

    const dbRaw = await dbSeq.findAll({
      where: {
        id: dbID
      }}).catch(err => {
        res.status(500).append("Error", err);
    });
    const dbInfo = dbRaw[0];
      // Automate options
      const options = {
        type: 'js', // Which code style want to generate, supported: js/ts/egg/midway. Default is `js`.
        camelCase: false, // Model name camel case. Default is false.
        dir: modelsPath + '/' + dbID, // What directory to place the models. Default is `models`.
        emptyDir: false, // Remove all files in `dir` and `typesDir` directories before generate models.
        tables: null, // Use these tables, Example: ['user'], default is null.
        skipTables: null, // Skip these tables. Example: ['user'], default is null.
        tsNoCheck: false, // Whether add @ts-nocheck to model files, default is false.
      }

    const dbOptions = {
      logging:false,
      database: dbInfo['schema'],
      username: dbInfo['username'],
      password: dbInfo['password'],
      dialect: 'mysql',
      host: dbInfo['host_name'],
      port: dbInfo['port'],
      define: {
        underscored: false,
        freezeTableName: false,
        charset: 'utf8mb4',
        timezone: '+00:00',
        dialectOptions: {
          collate: 'utf8_general_ci',
        },
      },
    };

    const automate = new Automate(dbOptions, options);

    automate.run( {timestamps: false}).then(data =>
        res.status(200).json(data))
        .catch(err => res.status(500).append("Error", err))
    }
  );

  router.get('/:databaseID/models', auth.authParser(), function (req, res, next) {
    try{
      const dbID = req.params.databaseID;
      const modules = fs.readdirSync(modelsPath + '/' + dbID);

      res.status(200).json(modules);
    }catch(err){
      res.status(500).append("Error", err);
    }
    }
  );

  router.get('/:databaseID/models/:model', auth.authParser(), function (req, res, next) {
    try{
      const dbID = req.databaseID;
      const inputModel = req.params.model;
      const path = '../models' + '/' + dbID + '/' + inputModel;
      console.log(path);
      const model = require(path);
      const seq = model(sequelize)
      res.status(200).json(seq.rawAttributes);
    }catch(err){
      res.status(500).append("Error", err);
    }
    }
  );

  return router;
};
