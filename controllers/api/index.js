//will eventually separate routes into separate files and 
//declare their routes here

const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);



module.exports = router;

