const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const events = require("./events");
const {Sequelize} = require('sequelize')


let appPort = process.env.PORT || 5000;

const sequelize = new Sequelize('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS', {
    host: 'db.cs.dal.ca',
    dialect: 'mysql',
    port: 3306,
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
    res.json("<h1>Api</h1>")
})

app.listen(appPort, () => {
    console.log(`Express server listening on port ${appPort}`);
});








