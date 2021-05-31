const userStruc = require('./user')
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS', {
  host: 'db.cs.dal.ca',
  dialect: 'mysql',
  logging:false
})


async function test(){
  const db = sequelize.define("Users", userStruc,{
    timestamps:false
  });

  let results = await db.findAll()
  console.log(results);
}

test();
