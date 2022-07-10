const mongoose = require('mongoose');
const Joi = require('joi');

const Schema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'PoRTfolioTypes'
    },
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Portfolio = mongoose.model('PoRTfolio', Schema);

function validatePortfolio(data){
    const schema = {
        type: Joi.string().min(5).max(500).required(),
        title: Joi.string().min(5).max(500).required(),
        subtitle: Joi.string().min(5).max(500).required(),
        url: Joi.string().min(5).max(500).required(),
        imgUrl: Joi.string().min(5).max(500).required(),
        date: Joi.date()
    };
    return Joi.validate(data, schema);
}

exports.Portfolio = Portfolio;
exports.validate = validatePortfolio;