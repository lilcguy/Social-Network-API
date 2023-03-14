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
    
router.post('/', async (req, res) => {
    //find the user, make the thought, push to the user's thoughts array.
    
    const theUser = await User.findOne({username: req.body.username});
    //find returns an array even if only 1 doc is returned. so i used findOne.

    const theThought = await Thought.create(req.body);



    //console.log(theUser);
    //console.log(theThought);

    const update = await User.findOneAndUpdate(
        {_id: theUser._id},
        {$push: {thoughts: theThought._id}},
        {new: true});

    res.json(update);
 




}); 


//put
router.put('/:id', (req, res ) => {
    Thought.findByIdAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true}
        ).then((updatedData) => {
            res.json(updatedData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        })


});

//delete

module.exports = router;