const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const userGenReportsStruc = require("../src/models/userGeneratedReports");

  const seqUserGenReports = userGenReportsStruc(sequelize);

  const auth = new BackendAuth(sequelize);

  router.get('/generatedReports', auth.authParser(), function (req, res, next) {
    auth.users.findAll({where: { ID: req.token.data.email }}).then(data => {
    const userID = data[0].user_id;
    seqUserGenReports.findAll({ where:{ user_id_fk: userID },
      attributes:['id', 'user_id_fk', 'isActive', 'input_params_values']})
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
          input_params_values: req.body.body.input_params_values
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

  return router;
}
