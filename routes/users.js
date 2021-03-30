const BackendAuth = require("../backend/BackendAuth");
const express = require('express');
const {Sequelize} = require("sequelize");

module.exports = sequelize => {
  const router = express.Router();
  const reportsStruc = require('../src/models/reports');
  const databaseConn = require('../src/models/databaseConnections');
  const seqUserGeneratedReportStuc = require('../src/models/userGeneratedReports');

  const dbSeq = databaseConn(sequelize);
  const seqUserGeneratedReport = seqUserGeneratedReportStuc(sequelize);
  const seqReports = sequelize.define("reports", reportsStruc, {timestamps: false});

  seqReports.hasMany(seqUserGeneratedReport,{foreignKey: 'report_id_fk'});
  seqUserGeneratedReport.belongsTo(seqReports, {foreignKey: 'report_id_fk'})

  dbSeq.hasMany(seqReports,{foreignKey: 'database_connection_fk'});
  seqReports.belongsTo(dbSeq, {foreignKey: 'database_connection_fk'});

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
      seqUser.findAll({ attributes: ['ID', 'Admin', 'creation_date']
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

  router.get('/execute', auth.authParser(), function (req, res, next) {
    const reportId = req.query.reportId;
    const dbConnId = req.query.dbConnId;

    //get user generated report using inner join
    seqUserGeneratedReport.findAll({
      include: [{
        model: seqReports,
        where: {
          id: reportId,
          database_connection_fk: dbConnId
        }
      }],
      // @Todo: use user_generated_report_id to replace report.id and remove this limit
      limit: 1,
      raw: true
    }).then(data => {
      console.log(data);
      const result = data[0];
      let input_params = JSON.parse(result['input_params_values']);
      sql = result['report.sql'];

      //process sql: replace report sql with input params
      for (let element of input_params['params']) {
        for (let key in element) {
          sql = sql.replace('@', element[key]);
        }
      }

      console.log('processed SQL: ' + sql);
    }).catch(err => {
      console.log(err)
      res.status(500).append("Error", err);
    });

    //get dbConnection information
    dbSeq.findAll({
      where: {
        id: dbConnId
      },
      raw: true
    }).then(data => {
      console.log(data);
      dbConnInfo = data[0];
      // console.log('dbConnInfo: ' + dbConnInfo['host_name'] + '\t' + dbConnInfo['schema']
      //   + '\t' + dbConnInfo['username'] + '\t' + dbConnInfo['password'] + '\t' + dbConnInfo['port']);
      // console.log('pass sql: '+sql);
    }).catch(err => {
      console.log(err)
      res.status(500).append("Error", err);
    });
    next();
  }, function (req, res, next) {

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

    const empStructure = require('../src/models/employees');
    const seqEmployeeForReport = sequelizeForReport.define("employees", empStructure, { timestamps: false });
    //test connection
    sequelizeForReport.authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      }).catch(err => {
      console.error('Unable to connect to the database:', err);
    }).then(() => {
      //run sql in this db and generate report
      sequelizeForReport.authenticate()
        .then(() => {
          console.log('Connection has been established successfully.');
        }).catch(err => {
        console.error('Unable to connect to the database:', err);
      }).then(() => {
        console.log('run sql query:' + sql);
        sequelizeForReport.query(sql, {
          model: seqEmployeeForReport,
          mapToModel: true, // pass true here if you have any mapped fields
          raw:true
        }).then(data => {
          console.log(data);
          res.status(200).json(data);
          sequelizeForReport.close().then(()=>{
            console.log('sequelizeForReport connection closed');
          });
        }).catch(err => {
          console.log(err);
        });
      });
    });
  });

  return router;
};
