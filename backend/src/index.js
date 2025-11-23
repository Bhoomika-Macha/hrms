const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = require('./models');

// Database connection and sync
db.sequelize.authenticate()
  .then(() => {
    console.log("Database connected");
    return db.sequelize.sync();  
  })
  .then(() => {
    console.log("All tables synced successfully");
  })
  .catch((err) => {
    console.error("Database error:", err);
  });

// Test route
app.get('/', (req, res) => {
  res.send({ message: "HRMS Backend Running..." });
});

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

const teamRoutes = require('./routes/teams');
app.use('/api/teams', teamRoutes);

const logRoutes = require('./routes/logs');
app.use('/api/logs', logRoutes);


// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
