const mongoose = require('mongoose');

const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
            type: mongoose.Types.ObjectId,
            default: mongoose.Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280

        },
        username: {
            type: String,
            required: true

        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: function(date) {
                return date.toLocaleDateString();
            }

        },

},
);

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: function(date) {
                return date.toLocaleDateString();
            },
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            {
                reactionSchema
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});


/* 
a virtual is a property that is computed from other fields and does 
not exist in the database, while a getter is a method that 
transforms the value of a field when it is read from the database.
*/

//init model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;