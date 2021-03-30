const BackendAuth = require("../backend/BackendAuth");
const express = require('express');
const {Model} = require("sequelize");
const {Sequelize} = require("sequelize");

module.exports = sequelize => {
  const router = express.Router();
  const userGeneratedReportStruc = require('../src/models/userGeneratedReports');
  const reportsStruc = require('../src/models/reports');
  const databaseConnStruc = require('../src/models/databaseConnections');

  const seqUserGeneratedReport = userGeneratedReportStruc(sequelize);
  const seqReports = reportsStruc(sequelize);
  const seqDbConn = databaseConnStruc(sequelize);

  seqReports.hasMany(seqUserGeneratedReport,{foreignKey: 'report_id_fk'});
  seqUserGeneratedReport.belongsTo(seqReports, {foreignKey: 'report_id_fk'})

  seqDbConn.hasMany(seqReports,{foreignKey: 'database_connection_fk'});
  seqReports.belongsTo(seqDbConn, {foreignKey: 'database_connection_fk'});

  // these routes require authentication
  const auth = new BackendAuth(sequelize);
  let dbConnInfo, sql;

  router.get('/homepage', auth.authParser(), function (req, res, next) {
    auth.users
      .findAll({where: {ID: req.token.data.email} })
      .then(resp => {
        console.log(resp);
        res.status(200).json(resp[0].homepage_contents);
      }).catch(err => { console.log(err);
      res.status(500).append("Error", err); })
    }
  );

  router.put('/homepage', auth.authParser(), function (req, res, next) {
    auth.users.update(
      // not sure why the body's contents are wrapped inside an additional body
      {homepage_contents: req.body.body.homepageContents },
      {where: {ID: req.token.data.email}}).then(resp => {
      res.status(200);
    }).catch(err => { console.log(err);
      res.status(500).append("Error", err); })
    }
  );

  router.get('/getAllUsers', auth.authParser(), function (req, res, next) {
      auth.users.findAll({ attributes: ['ID', 'Admin', 'creation_date']
      }).then(data => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  //  >>>>>>>>>>> DELETE USER <<<<<<<<<<
  router.delete('/:user', auth.authParser(), function (req, res, next) {
    auth.users.destroy({
        where: {
          ID: req.params.user
        }
      }).then(data => {
        res.status(200).json(data);
      }).catch(err => {
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  router.get('/execute', auth.authParser(), async function (req, res, next) {
    console.log("PENIS")
    const reportId = req.query.reportId;
    const rawUser = await auth.users.findAll({where: { ID: req.token.data.email }});
    const userId = rawUser[0].user_id;
    const dbConnId = req.query.dbConnId;


    //get user generated report using inner join
    const rawData = await seqUserGeneratedReport.findAll({
      where: {
        user_id_fk: userId,
        report_id_fk: reportId
      },
      include: [{
        model: seqReports,
        where: {
          id: reportId,
          database_connection_fk: dbConnId
        }
      }],
      raw: true
    }).catch(err => {
      res.status(500).append("Error", err)
    })

    //process sql: replace report sql with input params
    const result = rawData[0];
    let input_params = JSON.parse(result['input_params_values']);
    let sql = result['reports_model.sql'];

    for (let element of input_params['params']) {
      for (let key in element) {
        sql = sql.replace('@', element[key]);
      }
    }
    console.log('processed SQL: ' + sql);

    //get dbConnection information
    const rawDbConnInfo = await seqDbConn.findAll({
      where: {
        id: dbConnId
      },
      raw: true
    });

    const dbConnInfo = rawDbConnInfo[0];

    //create new sequelize connection
    const sequelizeForReport = new Sequelize(
      dbConnInfo['schema'],
      dbConnInfo['username'],
      dbConnInfo['password'],
      {
        host: dbConnInfo['host_name'],
        dialect: 'mysql',
        port: dbConnInfo['port']
      }
    );
    const modelStruc = result['reports_model.model_name']
    const model = require('../src/models/' + modelStruc);

    //test connection
    await sequelizeForReport.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      }).catch(err => {
        console.error('Unable to connect to the database:', err);
      });

    sequelizeForReport.query(sql, {
      model: model,
      mapToModel: true, // pass true here if you have any mapped fields
      raw: true
    }).then(data => {
      res.status(200).json(data);
      sequelizeForReport.close().then(() => {
        console.log('sequelizeForReport connection closed');
      });
    })
  });

  return router;
};
