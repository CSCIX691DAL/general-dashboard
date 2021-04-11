const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const userGenReportsStruc = require("../src/models/userGeneratedReports");
  const reportsStruc = require('../src/models/reports');

  const seqUserGenReports = userGenReportsStruc(sequelize);
  const seqReports = reportsStruc(sequelize);

  const auth = new BackendAuth(sequelize);

  seqReports.hasMany(seqUserGenReports,{foreignKey: 'report_id_fk'});
  seqUserGenReports.belongsTo(seqReports, {foreignKey: 'report_id_fk'})

  router.get('/generatedReports', auth.authParser(), function (req, res, next) {
    auth.users.findAll({where: { ID: req.token.data.email }}).then(data => {
    const userID = data[0].user_id;
    seqUserGenReports.findAll({ where:{ user_id_fk: userID },
      attributes:['id', 'user_id_fk', 'isActive', 'input_params_values', 'chart_type']})
      .then(resp => {
        console.log(resp);
        res.status(200).json(resp);
      }).catch(err => { console.log(err) });
    })
    }
  );

  router.post('/create', auth.authParser(), async function(req, res, ) {

    // grab userId
    const rawUser = await auth.users.findAll(
      {where:
          {ID: req.token.data.email}
      }).catch(err => {
        res.status(500).append("ERROR", err).send();
    })
    const userId = rawUser[0].user_id;

    // This slows down the report process noticeably
    // upsert
    seqUserGenReports.findOne({where: {user_id_fk: userId, report_id_fk: req.body.body.report_id_fk}}).then(obj => {
      // update
      if(obj){
        seqUserGenReports.update({
            input_params_values: req.body.body.input_params_values,
            chart_type: req.body.body.chart_type
          }, {
            where: {
              user_id_fk: userId,
              report_id_fk: req.body.body.report_id_fk
            }
          }).then(resp => {
          res.status(200).json(resp)
        }).catch(err => {
          res.status(500).append("Error", err).send();
        })
      }
      // create
      else{
        seqUserGenReports.create({
          user_id_fk: userId,
          report_id_fk: req.body.body.report_id_fk,
          isActive: true,
          input_params_values: req.body.body.input_params_values,
          chart_type: req.body.body.chart_type
        }).then(resp => {
          res.status(200).json(resp);
        }).catch(err => {
          console.log(err);
          res.status(500).append("Error", err).send();
        })
      }
    })

  });

  router.get('/getReportsByUserId', auth.authParser(), async function (req, res, next) {
    const rawUser = await auth.users.findAll({where: {ID: req.token.data.email}});
    const userId = rawUser[0].user_id;
    console.log('user id' + userId);

    //get user generated report using left join
    seqUserGenReports.findAll({
      where: {
        user_id_fk: userId
      },
      include: [{
        model: seqReports
      }],
      raw: true
    }).then(data => {
      console.log(JSON.stringify(data));
      res.status(200).json(data);
    }).catch(err => {
      res.status(500).append("Error", err)
    })

  });

  router.put('/:id/update', auth.authParser(), async function (req, res, next) {
    const id = req.params.id;
    const isActive = req.body.body.isActive;

    seqUserGenReports.update(
      {isActive: isActive}, {
      where: {id: id}
    }).then(resp => {
      res.status(200).json(resp)
    }).catch(err => {
      res.status(500).append("Error", err)
    })

  });

  router.delete('/:reportID', auth.authParser(), async function (req, res, next) {
    const rawUser = await auth.users.findAll({where: {ID: req.token.data.email}});
    const userId = rawUser[0].user_id;
    
    seqUserGenReports.destroy({
      where: {
        report_id_fk: req.params.reportID, 
        user_id_fk: userId
      }
    }).then(data => {
      res.status(200).json(data);
    }).catch(err => {
      console.log(err)
      res.status(500).append("Error", err);
    });
  }); 

  return router;
}
