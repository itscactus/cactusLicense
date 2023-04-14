const { Schema, model } = require("mongoose");

const schema = new Schema({
    createdAt: {
        type: Date,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    iconURL: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    supportedVersions: {
        type: String,
        required: false
    },
    version: {
        type: String,
        required: true
    },
    downloadUrl: {
        type: String,
        required: false
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = model('Products', schema);