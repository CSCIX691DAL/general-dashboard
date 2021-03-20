const BackendAuth = require("../backend/BackendAuth");
const express = require('express');
const Automate = require("sequelize-automate");
const fs = require('fs');

const modelsPath = "models"

const dbOptions = {
  logging:false,
  database: 'x691_G_dashboard',
  username: 'x691_G_student',
  password: 'yED3IX83k3BDYrCS',
  dialect: 'mysql',
  host: 'db.cs.dal.ca',
  port: 3306,
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

// Automate options
const options = {
  type: 'js', // Which code style want to generate, supported: js/ts/egg/midway. Default is `js`.
  camelCase: false, // Model name camel case. Default is false.
  fileNameCamelCase: true, // Model file name camel case. Default is false.
  dir: modelsPath, // What directory to place the models. Default is `models`.
  emptyDir: false, // Remove all files in `dir` and `typesDir` directories before generate models.
  tables: null, // Use these tables, Example: ['user'], default is null.
  skipTables: null, // Skip these tables. Example: ['user'], default is null.
  tsNoCheck: false, // Whether add @ts-nocheck to model files, default is false.
}


module.exports = sequelize => {
  const router = express.Router();

  const automate = new Automate(dbOptions, options);

  // these routes require authentication
  const auth = new BackendAuth(sequelize);
  router.post('/generate', auth.authParser(), function (req, res, next) {
      automate.run( {timestamps: false}).then(data =>
        res.status(200).json(data))
        .catch(err => res.status(500).append("Error", err))
    }
  );

  router.get('/models', auth.authParser(), function (req, res, next) {
    try{
      const modules = fs.readdirSync(modelsPath);

      res.status(200).json(modules);
    }catch(err){
      res.status(500).append("Error", err);
    }
    }
  );

  router.get('/models/:model', auth.authParser(), function (req, res, next) {
    try{
      const inputModel = req.params.model;
      const model = require("../models/" + inputModel);
      const seq = model(sequelize)
      res.status(200).json(seq.rawAttributes);
    }catch(err){
      res.status(500).append("Error", err);
    }


    }
  );

  return router;
};
