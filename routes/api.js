const express = require('express');
const router = express.Router();
const userStruc = require('../src/models/user');
const empStruc = require('../src/models/employees');
const {Sequelize} = require('sequelize');


const {SSHConnection} = require("node-ssh-forward");

const sshConnection = new SSHConnection({
    endHost: process.env.DB_SSH_HOST || 'timberlea.cs.dal.ca',
    username: process.env.DB_SSH_USER,
    password: process.env.DB_SSH_PASSWORD,
})

sshConnection.forward({
  fromHost: '127.0.0.1',
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

const seq = sequelize.define("Users", userStruc,
  {
    timestamps: false
  });

const seqEmployee = sequelize.define("employees", empStruc,
  {
    timestamps: false
  });
// >>>>>> ROUTES <<<<<<<

// >>>>>> CREATE A USER <<<<<<
router.post('/user', function (req, res, next) {
    seq.create({
      ID: req.body.ID,
      Password: req.body.Password
    }).then(data => {
      res.status(201).json({ status: 'ok' });
    }).catch(err => {
      console.log(err)
      res.status(500).json({ status: 'error', error: err });
    })
  }
);

//  >>>>>>>>>>> GET ALL USERS <<<<<<<<<<
router.get('/users', function (req, res, next) {
    seq.findAll().then(data => {
      res.status(200).json(data);
    }).catch(err => {
      console.log(err)
      res.status(500).append("Error", err);
    });
  }
);

//  >>>>>>>>>>> GET USER <<<<<<<<<<
router.get('/users/:user', function (req, res, next) {
    seq.findAll({
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

//  >>>>>>>>>>> DELETE USER <<<<<<<<<<
router.delete('/users/:user', function (req, res, next) {
    seq.destroy({
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

//  >>>>>>>>>>> GET COUNTS OF ALL EMPLYEES GENDER <<<<<<<<<<
router.get('/employees/countByGender', function (req, res, next) {
    seqEmployee.findAll({
      attributes: [
        'gender',
        [sequelize.fn('COUNT', sequelize.col('gender')), 'SumOfGender']
      ],
      group: 'gender'
    }).then(data => {
      res.status(200).json(data);
    }).catch(err => {
      console.log(err)
      res.status(500).append("Error", err);
    });
  }
);

// >>>>>>>>>>> GET ALL EMPLYEES <<<<<<<<<<
router.get('/employees/getAllEmployees', function (req, res, next) {
    seqEmployee.findAll({ limit: 50 }).then(data => {
      res.status(200).json(data);
    }).catch(err => {
      console.log(err)
      res.status(500).append("Error", err);
    });
  }
);

});

module.exports = router;
