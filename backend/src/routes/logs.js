const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getLogs } = require('../controllers/logController');

router.use(auth);

router.get('/', getLogs);

module.exports = router;
