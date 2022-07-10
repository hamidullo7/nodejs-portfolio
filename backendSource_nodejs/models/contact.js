const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    locate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Contact = mongoose.model('ConTact', Schema);

function validateContact(data) {
    const schema = {
        locate: Joi.string().min(5).max(500).required(),
        phone: Joi.string().min(5).max(500).required(),
        email: Joi.string().min(5).max(500).required(),
        date: Joi.date()
    }
    return Joi.validate(data, schema);
}

exports.Contact = Contact;
exports.validate = validateContact;