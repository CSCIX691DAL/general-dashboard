const express = require('express');
const {Sequelize} = require('sequelize');
const {SSHConnection} = require("node-ssh-forward");
const router = express.Router();

const sshConnection = new SSHConnection({
  endHost: process.env.DB_SSH_HOST || 'timberlea.cs.dal.ca',
  username: process.env.DB_SSH_USER,
  password: process.env.DB_SSH_PASSWORD,
})

sshConnection.forward({
  fromPort: 3306,
  toPort: 3306,
  toHost: 'db.cs.dal.ca'
}).then(_ => {
  const sequelize = new Sequelize(
    process.env.DB_DATABASE || 'x691_G_dashboard',
    process.env.DB_USER || 'x691_G_student',
    process.env.DB_PASSWORD || 'yED3IX83k3BDYrCS',
    {
      host: '127.0.0.1',
      dialect: 'mysql',
      port: 3306,
      pool: {
        max: 10,
        min: 0,
        idle: 20000
      }
    }
  );

  router.use('/auth', require('./auth')(sequelize));
  router.use('/employees', require('./employees')(sequelize));

});

module.exports = router;
