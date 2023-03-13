//api/users endpoint
const router = require('express').Router();
const User = require('./../../models/User');

//get all
router.get('/', (req, res) => {
    User.find({}).then((users) => {
        res.json(users);
        
    })
    .catch((err) => res.status(500).json(err));
    
});

//get 1
// router.get('/user/:id', (req, res) => {
//     User.findById({ _id: req.params.})
// })

//POST
//body = username, email.
router.post('/', (req, res) => {
    User.create(req.body)
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//PUT

//DELETE


module.exports = router;