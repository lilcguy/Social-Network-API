const mongoose = require('mongoose');

const User = new mongoose.schema({
    username: {type: String, unique: true, required: true, trim: true},
    email: {type: String, unique: true, required: true,  match: /^\S+@\S+\.\S+$/},
    friends: {},
});