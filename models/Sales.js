const { Schema, model } = require("mongoose");

const schema = new Schema({
    date: {
        type: Date,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    licenseId: {
        type: String,
        required: true
    }
});

module.exports = model('Sales', schema);