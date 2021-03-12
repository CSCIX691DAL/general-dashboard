const express = require('express');
const AuthBackend = require('../backend/BackendAuth');

module.exports = sequelize => {
  const router = express.Router();
  const auth = new AuthBackend(sequelize);

  router.post('/register', function (req, res, next) {
    if(req.body && req.body.hasOwnProperty('username') && typeof req.body.username === 'string' && req.body.username.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
      && req.body.hasOwnProperty('password') && typeof req.body.password === 'string') {
      auth.register(req.body.username, req.body.password, req.body.adminAccount).then(token => {
        res.status(201).send(token); // OK (created) and add token string to body
      }).catch(e => {
        res.header('X-Status-Reason', 'Duplicate User').sendStatus(403); // Forbidden (duplicate user)
      });
    } else {
      res.header('X-Status-Reason', 'Invalid email or password').sendStatus(400); // Bad Request
    }
  });

  // Executes the getAdmin function to retrieve the value in Admin column of a given User
  router.get('/getAdmin', function (req, res, next) {
    auth.getAdmin(req.query.adminUsername).then(data => {
      res.status(201).send(data);
    })
  });

  // authenticate credentials and get a token
  router.post('/authenticate', function (req, res, next) {
    if(req.body && req.body.hasOwnProperty('username') && typeof req.body.username === 'string' && req.body.username.match('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}')
      && req.body.hasOwnProperty('password') && typeof req.body.password === 'string') {
      auth.authenticate(req.body.username, req.body.password).then(token => {
        res.status(201).send(token); // OK (created) and add token string to body
      }).catch(e => {
        res.header('X-Status-Reason', 'Invalid credentials').sendStatus(403); // Forbidden (invalid credentials)
      });
    } else {
      res.header('X-Status-Reason', 'Invalid email or password').sendStatus(400); // Bad Request
    }
  });

  // validate an existing token and get it's contents
  router.get('/validate', auth.authParser(), function (req, res, next) {
    res.status(200).json(req.token);
  });

  return router;
};
