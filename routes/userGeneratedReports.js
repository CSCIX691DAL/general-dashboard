const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const userGenReportsStruc = require("../src/models/userGeneratedReports");

  const seqUserGenReports = sequelize.define("user_generated_reports", userGenReportsStruc, {timestamps: false});

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

  return router;
}
