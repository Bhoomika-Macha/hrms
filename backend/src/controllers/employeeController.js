const db = require('../models');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await db.Employee.findAll({
      where: { organisation_id: req.user.orgId }
    });
    return res.json(employees);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getEmployee = async (req, res) => {
  try {
    const employee = await db.Employee.findOne({
      where: { id: req.params.id, organisation_id: req.user.orgId }
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;

    const employee = await db.Employee.create({
      first_name,
      last_name,
      email,
      phone,
      organisation_id: req.user.orgId
    });

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_created",
      meta: { employeeId: employee.id }
    });

    return res.status(201).json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;

    const employee = await db.Employee.findOne({
      where: { id: req.params.id, organisation_id: req.user.orgId }
    });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.update({ first_name, last_name, email, phone });

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_updated",
      meta: { employeeId: employee.id }
    });

    return res.json(employee);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await db.Employee.findOne({
      where: { id: req.params.id, organisation_id: req.user.orgId }
    });

    if (!employee) return res.status(404).json({ message: "Employee not found" });

    await employee.destroy();

    await db.Log.create({
      organisation_id: req.user.orgId,
      user_id: req.user.userId,
      action: "employee_deleted",
      meta: { employeeId: employee.id }
    });

    return res.json({ message: "Employee deleted" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
