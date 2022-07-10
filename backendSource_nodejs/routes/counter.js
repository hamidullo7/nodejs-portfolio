const express = require('express');
const router = express.Router();
const { validate, Count } = require('../models/count');
const auth = require('../middleware/auth');

router.get('/sendIp', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || null;

    let newData = new Count({ ip })
    newData = await newData.save();

    res.send(true);
}) 

router.get('/getAll', auth, async (req, res) => {
    let all = await Count.find().populate('_id', '-ip');
    res.send(all);
})

module.exports = router;