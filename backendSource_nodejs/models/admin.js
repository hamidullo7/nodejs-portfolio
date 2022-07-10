const mongoose = require('mongoose');
const Joi = require('joi');


const Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});


const User = mongoose.model('USer', Schema);

function validateUser(data) {
    schema = {
        username: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(200).required(),
        isAdmin: Joi.boolean(),
        date: Joi.date()
    }
    return Joi.validate(data, schema);
}

exports.User = User;
exports.validate = validateUser;