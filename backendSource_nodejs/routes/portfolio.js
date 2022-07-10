const express = require('express');
const router = express.Router();
const { validate, Portfolio } = require('../models/portfolio');
const auth = require('../middleware/auth');

router.get('/getAll', async (req, res) => {
    const pflData = await Portfolio.find().populate('type', 'name -_id');
    res.send(pflData);
});

router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = new Portfolio({
        type: req.body.type,
        title: req.body.title,
        subtitle: req.body.subtitle,
        url: req.body.url,
        imgUrl: req.body.imgUrl
    });
    const saved = await newData.save();
    res.send(saved);
});

router.post('/update/:id', auth,  async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = await Portfolio.findByIdAndUpdate(req.params.id, {
        type: req.body.type,
        title: req.body.title,
        subtitle: req.body.subtitle,
        url: req.body.url,
        imgUrl: req.body.imgUrl
    });
    res.send(newData);
});

router.post('/delete/:id', auth, async (req, res) => {
    const newData = await Portfolio.findByIdAndRemove(req.params.id);
    res.send(newData);
});

module.exports = router;
