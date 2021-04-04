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

  router.post('/create', auth.authParser(), function(req, res, ) {

    auth.users.findAll({where: {ID: req.token.data.email} }).then(data => {
      console.log("predelete");

      seqUserGenReports.destroy({where: {
          user_id_fk: data[0].user_id,
          report_id_fk: req.body.body.report_id_fk,
        }
      }).then(
        seqUserGenReports.create({
          user_id_fk: data[0].user_id,
          report_id_fk: req.body.body.report_id_fk,
          isActive: true,
          input_params_values: req.body.body.input_params_values,
          chart_type: req.body.body.chart_type
        }).then(resp => {
          res.status(200).json(resp);
        }).catch(err => {
          console.log(err);
          res.status(500).append("Error", err);
        })
      ).catch(err => {
        console.log(err);
        console.log('hey');
      })


    });
  })

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

  return router;
}
