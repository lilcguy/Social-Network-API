
//api/users endpoint

const router = require('express').Router();
const User = require('./../../models/User');

//get all
router.get('/', async (req, res) => {
    const users = await User.find({});
    return users.json();
});

//get 1

//POST

//PUT

//DELETE


module.exports = router;