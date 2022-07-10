const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
    title: {
        type: String,
        requred: true
    },
    imgSrc: {
        type: String,
        requred: true
    },
    body: {
        type: String,
        requred: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const About = mongoose.model('abOut', schema);

function validate(data) {
    const schemaValid = {
        title: Joi.string().min(5).max(1000).required(),
        imgSrc: Joi.string().min(5).max(1000).required(),
        body: Joi.string().min(5).max(1000).required(),
        date: Joi.date()
    }
    return Joi.validate(data, schemaValid);
}

exports.About = About;
exports.validate = validate;