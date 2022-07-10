const express = require('express');
const router = express.Router();
const { validate, About } = require('../models/about');
const auth = require('../middleware/auth');


router.get('/getAll', async (req, res) => {
    const aboutData = await About.find();
    res.send(aboutData);
});

router.post('/add', auth,  async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    if (await About.find().length === 0) {
        return res.status(400).send('You can\'t add aboutData when there is other data!');
    }
    const newData = new About({
        title: req.body.title,
        imgSrc: req.body.imgSrc,
        body: req.body.body,
    });
    const saved = await newData.save();
    res.send(saved);
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = await About.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        imgSrc: req.body.imgSrc,
        body: req.body.body,
    });
    res.send(newData);
});




module.exports = router;