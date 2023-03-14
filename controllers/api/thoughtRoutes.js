// /api/thoughts endpoint
const router = require('express').Router();
const Thought = require('./../../models/Thought');
const User = require('./../../models/User');

//get all
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({})
        .populate('reactions') //populate reactions
        res.json(thoughts);
    } catch (error) {
        console.log(error);
    }

});

//get 1 by id

router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById({_id: req.params.id})
        .populate('reactions'); //populate reactions
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
        });


});

//delete
router.delete('/:id', (req, res) => {
    Thought.findByIdAndDelete({_id: req.params.id})
    .then((deletedThought) => {
        res.json(`Deleted thought with id: ${deletedThought._id}`);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//reaction routes --v
    //reaction: reactionBody, username
//post reaction and push to thought's reaction array
        //populate reaction arrays in thought GETs.**
router.post('/:thoughtId/reactions', (req, res) => {

    Thought.findByIdAndUpdate(
        {_id: req.params.thoughtId},
        {$push: {reactions: req.body}},
        {new: true}
        ).then((updatedData) => {
            res.json(updatedData);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
            
        });

    
});

router.delete('/:thoughtId/reactions', (req, res) => {

});


//reaction routes --^
module.exports = router;