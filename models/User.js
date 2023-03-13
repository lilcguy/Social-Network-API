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
        match: /^\S+@\S+\.\S+$/
    },
    friends: [
        {
            type: Schema.Types.ObjectId, 
            ref: 'User',
        },
    ], 
    thoughts: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Thought',
        },
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    id: true,
  },
);

//a virtual called `friendCount` that retrieves the length of the user's `friends` array field on query.
userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
});

//init model
const User = model('User', userSchema);

module.exports = User;