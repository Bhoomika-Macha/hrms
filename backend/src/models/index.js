const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Import models
db.Organisation = require('./organisation')(sequelize, DataTypes);
db.User = require('./user')(sequelize, DataTypes);
db.Employee = require('./employee')(sequelize, DataTypes);
db.Team = require('./team')(sequelize, DataTypes);
db.EmployeeTeam = require('./employeeTeam')(sequelize, DataTypes);
db.Log = require('./log')(sequelize, DataTypes);

// Associations

// Organisation → Users
db.Organisation.hasMany(db.User, { foreignKey: "organisation_id" });
db.User.belongsTo(db.Organisation, { foreignKey: "organisation_id" });

// Organisation → Employees
db.Organisation.hasMany(db.Employee, { foreignKey: "organisation_id" });
db.Employee.belongsTo(db.Organisation, { foreignKey: "organisation_id" });

// Organisation → Teams
db.Organisation.hasMany(db.Team, { foreignKey: "organisation_id" });
db.Team.belongsTo(db.Organisation, { foreignKey: "organisation_id" });

// Employee ↔ Team (Many-to-Many)
db.Employee.belongsToMany(db.Team, {
  through: db.EmployeeTeam,
  foreignKey: "employee_id"
});
db.Team.belongsToMany(db.Employee, {
  through: db.EmployeeTeam,
  foreignKey: "team_id"
});

// Logs
db.User.hasMany(db.Log, { foreignKey: "user_id" });
db.Log.belongsTo(db.User, { foreignKey: "user_id" });

module.exports = db;
