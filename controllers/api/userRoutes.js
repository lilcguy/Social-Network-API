//api/users endpoint
const router = require('express').Router();
const User = require('./../../models/User');

//get all

router.get('/', (req, res) => {
    User.find({})
    .populate('friends')
    .then((users) => {
        res.json(users);
        
    })
    .catch((err) => res.status(500).json(err));
    
});

/* i wrote this async/await function just to test for fun. it works.
router.get('/', async (req, res) => {
    try {
    const users = await User.find({});
    res.json(users);
    }
    catch (error) {
        console.log(error);
    }

});
*/

//get 1
router.get('/:id', (req, res) => {
    User.findById({ _id: req.params.id})
    .populate('friends')
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//POST
//body = username, email. rejects if email is not email.
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
router.put('/:id', (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.id}, //filter
        req.body,  //update
        {new: true}, //setting to return updated document
        )
    .then((updatedUser) => {
        res.json(updatedUser);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});

//DELETE
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete({_id: req.params.id})
    .then((deletedUser) => {
        res.json("Deleted user at id: " + deletedUser._id + " with username: " + deletedUser.username);
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
});


//friends list routes --V
    //adding (pushing) friendId to userId's friend list

    //user.friends 
    //addToSet?
router.post('/:userId/friends/:friendId', (req, res) => {

    // const user = await User.findById({ _id: req.params.userId});
    // const friend = await User.findById({ _id: req.params.friendId});
    // user.friends.addToSet(friend);
    // res.json(`${friend.username} has been added to ${user.username}'s friend list!`);
    // console.log(user.friends);

    User.findOneAndUpdate(
        {_id: req.params.userId},
        {addToSet: {friends: {_id: req.params.friendId}}},
        {new:true}
    ).then((updatedUsers) => {
        res.json(updatedUsers + " Request resolved.")
    }).catch((err) => {
        console.log(err);
        res.status(500).json(err);
    }); 
    
 
});



//router.delete

module.exports = router;