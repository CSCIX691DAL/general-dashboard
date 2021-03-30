const {Sequelize, DataTypes} = require('sequelize');
const Automate = require('sequelize-automate');

const sequelize = new Sequelize('x691_G_dashboard', 'x691_G_student', 'yED3IX83k3BDYrCS', {
  host: 'db.cs.dal.ca',
  dialect: 'mysql',
  logging:false
});

const dbOptions = {
  logging:false,
  database: 'x691_G_dashboard',
  username: 'x691_G_student',
  password: 'yED3IX83k3BDYrCS',
  dialect: 'mysql',
  host: 'db.cs.dal.ca',
  port: 3306,
  define: {
    underscored: false,
    freezeTableName: false,
    charset: 'utf8mb4',
    timezone: '+00:00',
    dialectOptions: {
      collate: 'utf8_general_ci',
    },
    timestamps: false,
  },
};

// Automate options
const options = {
  type: 'js', // Which code style want to generate, supported: js/ts/egg/midway. Default is `js`.
  camelCase: false, // Model name camel case. Default is false.
  fileNameCamelCase: true, // Model file name camel case. Default is false.
  dir: 'models', // What directory to place the models. Default is `models`.
  typesDir: 'models', // What directory to place the models' definitions (for typescript), default is the same with dir.
  emptyDir: false, // Remove all files in `dir` and `typesDir` directories before generate models.
  tables: null, // Use these tables, Example: ['user'], default is null.
  skipTables: null, // Skip these tables. Example: ['user'], default is null.
  tsNoCheck: false, // Whether add @ts-nocheck to model files, default is false.
}


const automate = new Automate(dbOptions, options);

(async function main() {
  // // get table definitions
  // const definitions = await automate.getDefinitions();
  // console.log(definitions);

  // or generate codes
  const code = await automate.run();
  // console.log(code);
const x = await automate.getDefinitions();

  const model = require('../app/models/users')

  const db = sequelize.define("Users", require('./user'),{
      timestamps:false
    });

  const test = await db.findAll();
  console.log(test)
})()

  /*async function main() {
  // // get table definitions
  // const definitions = await automate.getDefinitions();
  // console.log(definitions);

  // or generate codes


  const model = require('../app/models/user')


  const db = sequelize.define("User",model()

  ,{
    timestamps:false
  });

  const test = await db.findAll();

  console.log(test);
    const User = sequelize.define('User', {
      // Model attributes are defined here
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
      }
    }, {
      timestamps:false
      // Other model options go here
    });
// Find all users
    const users = await User.findAll();
    console.log(users.every(user => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));


}
main();*/


















//
//
// const data = await db.findAll({raw:true});
//
// // console.log("All users:", JSON.stringify(data, null, 2));
// console.log(data)
// const b = JSON.stringify(data)
// console.log(b);
