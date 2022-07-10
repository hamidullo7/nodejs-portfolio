const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    all:{
        type: Array,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Social = mongoose.model('SOcial', Schema);

function validateSocial(data){
    const schema = {
        all: Joi.array().required(),
        date: Joi.date()
    }

    return Joi.validate(data, schema);
}

exports.Social = Social;
exports.validate = validateSocial;