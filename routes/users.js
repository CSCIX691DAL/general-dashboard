const BackendAuth = require("../backend/BackendAuth");
const express = require('express');

module.exports = sequelize => {
  const router = express.Router();
  const userStruc = require('../src/models/user');

  const seqUser = sequelize.define("User", userStruc, {timestamps: false});


  // these routes require authentication
  const auth = new BackendAuth(sequelize);

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

  return router;
};
