const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    precent: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Skill = mongoose.model('Skills', Schema);

function skillValidate(data) {
    const schema = {
        name: Joi.string().min(2).max(50).required(),
        precent: Joi.string().min(1).max(3).required(),
        date: Joi.date()
    };
    return Joi.validate(data, schema);
}

exports.Skill = Skill;
exports.validate = skillValidate;
