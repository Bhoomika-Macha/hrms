const db = require('../models');

// Get all teams
exports.getTeams = async (req, res) => {
  try {
    const teams = await db.Team.findAll({
      where: { organisation_id: req.user.orgId }
    });
    return res.json(teams);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get single team
exports.getTeam = async (req, res) => {
  try {
    const team = await db.Team.findOne({
      where: { id: req.params.id, organisation_id: req.user.orgId }
    });
    if (!team) return res.status(404).json({ message: "Team not found" });
    return res.json(team);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Create team
exports.createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const team = await db.Team.create({
      name,
      description,
      organisation_id: req.user.orgId
    });

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "team_created",
      meta: { teamId: team.id }
    });

    return res.status(201).json(team);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Update team
exports.updateTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    const team = await db.Team.findOne({
      where: { id: req.params.id, organisation_id: req.user.orgId }
    });

    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.update({ name, description });

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "team_updated",
      meta: { teamId: team.id }
    });

    return res.json(team);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete team
exports.deleteTeam = async (req, res) => {
  try {
    const team = await db.Team.findOne({
      where: { id: req.params.id, organisation_id: req.user.orgId }
    });

    if (!team) return res.status(404).json({ message: "Team not found" });

    await team.destroy();

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "team_deleted",
      meta: { teamId: req.params.id }
    });

    return res.json({ message: "Team deleted" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Assign employee → team
exports.assignEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const { teamId } = req.params;

    // Validate team
    const team = await db.Team.findOne({
      where: { id: teamId, organisation_id: req.user.orgId }
    });
    if (!team) return res.status(404).json({ message: "Team not found" });

    // Validate employee
    const employee = await db.Employee.findOne({
      where: { id: employeeId, organisation_id: req.user.orgId }
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    // Assign relation
    await db.EmployeeTeam.create({
      employee_id: employeeId,
      team_id: teamId
    });

    // Log
    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_assigned_to_team",
      meta: { employeeId, teamId }
    });

    return res.json({ message: "Employee assigned to team" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

// Unassign employee
exports.unassignEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const { teamId } = req.params;

    await db.EmployeeTeam.destroy({
      where: { employee_id: employeeId, team_id: teamId }
    });

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_unassigned_from_team",
      meta: { employeeId, teamId }
    });

    return res.json({ message: "Employee unassigned from team" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};
