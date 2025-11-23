const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

const {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
  assignEmployee,
  unassignEmployee
} = require('../controllers/teamController');

router.use(auth);

router.get('/', getTeams);
router.get('/:id', getTeam);
router.post('/', createTeam);
router.put('/:id', updateTeam);
router.delete('/:id', deleteTeam);

// Assignment routes
router.post('/:teamId/assign', assignEmployee);
router.post('/:teamId/unassign', unassignEmployee);

module.exports = router;
