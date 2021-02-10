const express = require('express');
const userStruc = require('./user');
const empStruc = require('./employees');


function createRouter(sequelize) {
  const router = express.Router();
  const owner = '';
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

  return router;
}

module.exports = createRouter;
