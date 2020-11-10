const express = require('express');
const taskRoutes = require('./taskRoutes');

const router = express.Router();

// router.use('/User');
router.use('/task', taskRoutes);
// router.use('/Comment');

module.exports = router;
