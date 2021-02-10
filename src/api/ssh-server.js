const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const events = require("./events");
const {Sequelize} = require('sequelize')
const {SSHConnection} = require("node-ssh-forward");


const sshConnection = new SSHConnection({
    endHost: 'timberlea.cs.dal.ca',
    username: 'mattatall',
    password: require('./password')
})

let appPort = process.env.PORT || 5000;
let sshPort = 9351;
async function connect(){

    await sshConnection.forward({
        fromHost: '127.0.0.1',
        fromPort: sshPort,
        toPort: 3306,
        toHost: 'db.cs.dal.ca'
    })

    const sequelize = new Sequelize('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS', {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: sshPort,
        pool: {
            max: 10,
            min: 0,
            idle: 20000
        }
    });

    const app = express()
        .use(cors())
        .use(bodyParser.json())
        .use(events(sequelize));

    app.get("/", function (req, res, next){

        res.json({"Api": "yes"})
    })

    app.listen(appPort, () => {
        console.log(`Express server listening on port ${appPort}`);
    });

}

connect()


