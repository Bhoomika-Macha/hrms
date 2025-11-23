### Evallo – Human Resource Management System (HRMS) ###

A full-stack Human Resource Management System designed for small organisations to manage employees, teams, assignments, and audit logging.
Built using React + Node.js + PostgreSQL + Sequelize with full authentication & deployment.

### Features 
**1. Organisation Management**
Create organisation account

Admin user created automatically

Data isolated for each organisation

**2. Authentication**
Secure JWT login

Password hashing with bcrypt

Protected API routes

**3. Employees Module**
Add employee

Edit employee

Delete employee

View all employees

**4. Teams Module**
Create team

Update team

Delete team

View team list

**5. Many-to-Many Relationship**
Employees ↔ Teams

Assign employee to multiple teams

Remove team assignments

**6. Audit Logging**
Every operation automatically logs:

Organisation created

User login

Employee created/updated/deleted

Team created/updated/deleted

Employee assigned/unassigned to team

Stored in logs table with JSONB meta data.

### Tech Stack ###
***Frontend***
React (Create React App)
Axios
Netlify hosting

***Backend***
Node.js (Express)
PostgreSQL (Render Cloud Database)
Sequelize ORM
JWT + bcrypt
Render deployment

### Database Overview ###
**Tables**
organisations
users
employees
teams
employee_teams (join table)
logs

***Relationships***
1 organisation → many employees
1 organisation → many teams
employees ↔ teams (many-to-many)
logs linked to users

### Live Demo ###
**Frontend (Netlify)**
https://frontend-hrms.netlify.app/

**Backend API (Render)**
https://hrms-backend-7jox.onrender.com
