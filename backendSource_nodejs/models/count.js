const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    ip: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Count = mongoose.model('couNtes', Schema);

function validateCount(data){
    const schema = {
        ip: Joi.string().min(4).max(100).required(),
        date: Joi.date()
    };
    return Joi.validate(data, schema);
}

exports.validate = validateCount;
exports.Count = Count;