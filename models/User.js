const { Schema, model } = require("mongoose");

const schema = new Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    discriminator: {
        type: String,
        required: true
    },
    permission: {
        type: Number,
        default: 0
    }
});

module.exports = model('User', schema);