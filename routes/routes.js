const express = require('express');

const router = express.Router();

router.use('/User');
router.use('/Task');
router.use('/Comment');

module.exports = router;
