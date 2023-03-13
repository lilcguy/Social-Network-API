//will eventually separate routes into separate files and 
//declare their routes here

const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);


module.exports = router;