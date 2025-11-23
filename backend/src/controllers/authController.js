const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

exports.register = async (req, res) => {
  try {
    const { orgName, adminName, email, password } = req.body;

    if (!orgName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create organisation
    const organisation = await db.Organisation.create({ name: orgName });

    // Hash password
    const password_hash = await bcrypt.hash(password, 10);

    // Create user (admin)
    const user = await db.User.create({
      organisation_id: organisation.id,
      email,
      password_hash,
      name: adminName
    });

    // Log action
    await db.Log.create({
      organisation_id: organisation.id,
      user_id: user.id,
      action: "organisation_created",
      meta: { orgName }
    });

    return res.status(201).json({
      message: "Organisation registered successfully",
      orgId: organisation.id,
      userId: user.id
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user.id, orgId: user.organisation_id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    // Log login
    await db.Log.create({
      organisation_id: user.organisation_id,
      user_id: user.id,
      action: "login",
      meta: {}
    });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
