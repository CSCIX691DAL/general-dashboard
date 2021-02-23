const {SequelizeAuto} = require('sequelize-auto');
const auto = new SequelizeAuto('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS',{
  host: 'db.cs.dal.ca',
  dialect: 'mysql',
  directory: './models', // where to write files
  port: '3306',
  caseModel: 'c', // convert snake_case column names to camelCase field names: user_id -> userId
  caseFile: 'c', // file names created for each model use camelCase.js not snake_case.js
  singularize: true, // convert plural table names to singular model names
  additional: {
    timestamps: false
    // ...options added to each model
  }});

auto.run().then(data => {
  console.log(data.tables);      // table list
  console.log(data.foreignKeys); // foreign key list
  console.log(data.text)         // text of generated files
});
