const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKey = fs.readFileSync('jwt.key');
const publicKey = fs.readFileSync('jwt.key.pub');
const signOptions = { algorithm: 'RS256', expiresIn: '3h' }; // tokens expire 3 hours after creation
const verifyOptions = { algorithms: ['RS256'] };

const userType = require('../src/models/user');

// Handle user database interactions and auth token generation / validation.
class BackendAuth {
  constructor(sequelize) {
    this.users = userType(sequelize);
  }

  // register a user.
  register(email, password, adminAccount) {
    const auth = this;
    return new Promise(function(resolve, reject){
      // create the user in the database, then create and return an auth token
      return auth.users
        .create({ID: email, Password: password, Admin: adminAccount})
        .then(_ => {
          return jwt.sign(
            { data: {email: email, admin: adminAccount} },
            privateKey,
            signOptions,
            function(err, token) {
              if(err) {
                return reject({status: 'error', error: 'could not create auth token'});
              } else {
                return resolve(token);
              }
            }
          );
        }).catch(err => { return reject(err); })
    });
  }

  // sign in to a user, checking the password and producing a token if valid.
  authenticate(email, password) {
    const auth = this;
    return new Promise(function(resolve, reject){
      // find the user in the database, verify it's password, then create and return an auth token
      return auth.users
      .findAll({where: {ID: email} })
        .then(resp => {
          if(resp[0].ID === email && resp[0].Password === password) {
            return jwt.sign(
              { data: {email: email, admin: resp[0].Admin} },
              privateKey,
              signOptions,
              function(err, token) {
                if(err) {
                  return reject({status: 'error', error: 'could not create auth token'});
                } else {
                  return resolve(token);
                }
              }
            );
          } else {
            return reject('invalid password');
          }
        }).catch(err => { return reject(err); })
    });
  }

  // validate an existing token, producing the data that was signed.
  validate(token) {
    return new Promise(function(resolve, reject) {
      return jwt.verify(token, publicKey, verifyOptions, (e, d) => {
        if(e) {
          return reject(e);
        } else {
          return resolve(d);
        }
      });
    });
  }

  // return a function to parse jwt token in the http header and set req.token to the json data, or fail if unauthorized
  authParser(validate) {
    if(!validate) validate = (data, cb) => cb(true);
    const auth = this;
    return function (req, res, next) {
      const authorization = req.get('Authorization');
      if (typeof authorization === 'string') {
        const m = authorization.match('^Bearer (.*)$');
        if (m.length === 2) {
          auth.validate(m[1]).then(data => {
            let validated = false;
            let isValid = validate(data, isValid => {
              validated = true;
              if (isValid) {
                req.token = data;
                next();
              } else {
                res.header('X-Status-Reason', 'Wrong Credentials').header('WWW-Authenticate', 'Bearer').sendStatus(401); // Unauthorized, come back with a token
              }
            });
            if(!validated) {
              if (isValid) {
                req.token = data;
                next();
              } else {
                res.header('X-Status-Reason', 'Wrong Credentials').header('WWW-Authenticate', 'Bearer').sendStatus(401); // Unauthorized, come back with a token
              }
            }
          }).catch(_ => {
            res.header('X-Status-Reason', 'Invalid authentication token').header('WWW-Authenticate', 'Bearer').sendStatus(401); // Unauthorized, come back with a token
          });
          return;
        }
      }
      res.header('X-Status-Reason', 'Missing authentication token').header('WWW-Authenticate', 'Bearer').sendStatus(401); // Unauthorized, come back with a token
    }
  }

}

module.exports = BackendAuth;
