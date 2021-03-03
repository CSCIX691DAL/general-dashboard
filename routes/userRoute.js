const BackendAuth = require("../backend/BackendAuth");
const authToken = require("../api/auth/validate");

module.exports = sequelize => {
  const express = require('express');
  const router = express.Router();
  const userStruc = require('../src/models/user');

  const seqUser = sequelize.define("user", userStruc, {timestamps: false});


  // these routes require authentication
  const auth = new BackendAuth(sequelize);

  const userToken = new authToken(sequelize);
  const username = userToken.get(this.user);
  const User = conn.getUser(username);

  router.get('/homepageContentJson', auth.authParser(), function (req, res, next) {
    User.get(this.homepage_contents).res.status(200).json(data).catch(err => {
      console.log(err);
      res.status(500).append("Error", err);
      });
    }
  );

  return router;
};
