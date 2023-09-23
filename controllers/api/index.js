const router = require('express').Router();
const authRoutes = require('./authRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', authRoutes);
router.use('/posts', postRoutes);

module.exports = router;