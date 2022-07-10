const express = require('express');
const router = express.Router();
const { validate, Skill } = require('../models/skill');
const auth = require('../middleware/auth');

router.get('/getAll', async (req, res) => {
    const skillData = await Skill.find();
    res.send(skillData);
});

router.post('/add', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send('Error when validate!');
    }

    const newData = new Skill({
        name: req.body.name,
        precent: req.body.precent
    });
    const saved = await newData.save();
    res.send(saved);
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = await Skill.findOneAndUpdate(req.params.id, {
        name: req.body.name,
        precent: req.body.precent
    });
    res.send(newData);
});

router.post('/delete/:id', auth, async (req, res) => {
    const newData = await Skill.findByIdAndRemove(req.params.id);
    res.send(newData);
});

module.exports = router;
