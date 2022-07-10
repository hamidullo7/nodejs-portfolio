const express = require('express');
const router = express.Router();
const { validatePortfolioType, PortfolioType } = require('../models/portfolioType');
const { validate, Portfolio } = require('../models/portfolio');
const auth = require('../middleware/auth');

router.get('/getAll', async (req, res) => {
    const pflData = await PortfolioType.find();
    res.send(pflData);
});

router.post('/add', auth, async (req, res) => {
    const { error } = validatePortfolioType(req.body);
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = new PortfolioType({
        name: req.body.name
    });
    const saved = await newData.save();
    res.send(saved);
});

router.post('/update/:id', auth, async (req, res) => {
    const { error } = validatePortfolioType(req.body)
    if (error) {
        return res.status(400).send('Error when validate!');
    }
    const newData = await PortfolioType.findByIdAndUpdate(req.params.id, {
        name: req.body.name
    });
    res.send(newData);
});

router.post('/delete/:id', auth, async (req, res) => {
    await deleteAllThisNames(req.params.id);
    const newData = await PortfolioType.findByIdAndRemove(req.params.id);
    res.send(newData);
});

async function deleteAllThisNames(id){
    let portfolios = await Portfolio.find();
    for(let i = 0; i < portfolios.length; i++){
        if(id == portfolios[i].type){
            await Portfolio.findByIdAndRemove(portfolios[i]._id);
        }
    }
    return 0;
}




module.exports = router;