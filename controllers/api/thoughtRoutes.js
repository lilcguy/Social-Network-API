// /api/thoughts endpoint
const router = require('express').Router();
const Thought = require('./../../models/Thought');
const User = require('./../../models/User');

//get all
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (error) {
        console.log(error);
    }

});

//get 1 by id

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById({_id: req.params.id});
        res.json(thought);
    } catch (error) {
        console.log(error);
    }
});

//post (push to user's thoughts array field)
//thoughtText, username, userId
    //does it need userId? there is no field for it in the model.
router.post('/', (req, res ) => {
    Thought.create(req.body)
    .then((thought) => {
        res.json(thought);
    }).catch((err) => {
        console.log(err);
    });

    
});

//put

//delete

module.exports = router;