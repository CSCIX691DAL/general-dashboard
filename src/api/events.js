const express = require('express');
const userStruc = require('./user');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS', {
  host: 'db.cs.dal.ca',
  dialect: 'mysql',
  logging:false
})

function createRouter(db) {
  const router = express.Router();
  const owner = '';
  const seq = sequelize.define("Users", userStruc,
    {
    timestamps:false
  });

  // >>>>>> ROUTES <<<<<<<

  // >>>>>> CREATE A USER <<<<<<
  router.post('/user', function (req, res, next) {
    seq.create({
      ID: req.body.ID,
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Password: req.body.Password
    }).then(data => {
        res.status(201).json({status:'ok'});
    }).catch(err=> {
        console.log(err)
        res.status(500).json({status: 'error', error: err});
      })
    }
  );

  //  >>>>>>>>>>> GET ALL USERS <<<<<<<<<<
  router.get('/users', function (req, res, next) {
      seq.findAll().then(data =>{
        res.status(200).json(data);
      }).catch(err =>{
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  //  >>>>>>>>>>> GET USER <<<<<<<<<<
  router.get('/users/:user', function (req, res, next) {
      seq.findAll({
        where:{
          ID: req.params.user
        }
      }).then(data =>{
        res.status(200).json(data);
      }).catch(err =>{
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  //  >>>>>>>>>>> DELETE USER <<<<<<<<<<
  router.delete('/users/:user', function (req, res, next) {
      seq.destroy({
        where:{
          ID: req.params.user
        }
      }).then(data =>{
        res.status(200).json(data);
      }).catch(err =>{
        console.log(err)
        res.status(500).append("Error", err);
      });
    }
  );

  return router;
}

module.exports = createRouter;