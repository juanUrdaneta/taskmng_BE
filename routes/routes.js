const express = require('express');
const taskRoutes = require('./taskRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');

const router = express.Router();
router.use('/user', userRoutes);
router.use('/task', taskRoutes);
router.use('/comment', commentRoutes);

module.exports = router;
