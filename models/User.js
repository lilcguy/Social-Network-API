const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String, 
        unique: true, 
        required: true, 
        trim: true
    },
    email: {
        type: String, 
        unique: true, 
        required: true,  
        match: /^\S+@\S+\.\S+$/ //regex
    },
    friends: [
        {
            type: mongoose.Types.ObjectId, 
            ref: 'User',
        },
    ], 
    thoughts: [
        { 
            type: mongoose.Types.ObjectId, 
            ref: 'Thought',
        },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
  },
);

//a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});



//init model
const User = mongoose.model('User', userSchema);

module.exports = User;