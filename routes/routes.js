const express = require('express');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();
router.use('/user', userRoutes);
router.use('/task', taskRoutes);
// router.use('/Comment');

module.exports = router;
