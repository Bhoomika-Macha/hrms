const db = require('../models');

exports.getLogs = async (req, res) => {
  try {
    const logs = await db.Log.findAll({
      where: { organisation_id: req.user.orgId },
      order: [['timestamp', 'DESC']]
    });

    return res.json(logs);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
