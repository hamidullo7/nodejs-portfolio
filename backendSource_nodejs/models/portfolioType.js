const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PortfolioType = mongoose.model('PoRTfolioTypes', Schema);

function validatePortfolioType(data){
    const schema = {
        name: Joi.string().min(2).max(500).required(),
        date: Joi.date()
    };
    return Joi.validate(data, schema);
}

exports.PortfolioType = PortfolioType;
exports.validatePortfolioType = validatePortfolioType;