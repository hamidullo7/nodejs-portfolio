const express = require('express');
const router = express.Router();
const { validate, Contact } = require('../models/contact');
const auth = require('../middleware/auth');

router.get('/getAll', async (req, res) => {
    const contactData = await Contact.find();
    res.send(contactData);
});

router.post('/add', auth,  async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send('Error when validate!');
    }

    if (await Contact.find().length === 0) {
        return res.status(400).send('You can\'t add aboutData when there is other data!');
    }

    const newData = new Contact({
        locate: req.body.locate,
        phone: req.body.phone,
        email: req.body.email
    });
    const saved = await newData.save();
    res.send(saved);
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = await Contact.findOneAndUpdate(req.params.id, {
        locate: req.body.locate,
        phone: req.body.phone,
        email: req.body.email
    });
    res.send(newData);
});

router.post('/delete/:id', auth, async (req, res) => {
    const delData = await Contact.findOneAndDelete(req.params.id);
    res.send(delData);
});

module.exports = router;
