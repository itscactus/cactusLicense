const { Schema, model } = require("mongoose");

const schema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    ownerId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    licenseIP: {
        type: String,
        required: true
    },
    licenseKey: {
        type: String,
        required: true
    }
});

module.exports = model('Licenses', schema);