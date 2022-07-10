const express = require('express');
const cors = require('cors');
const aboutRoute = require('../routes/about');
const skillsRoute = require('../routes/skills');
const portfolioRoute = require('../routes/portfolio');
const portfolioTypeRoute = require('../routes/portfolioTypes');
const contactRoute = require('../routes/contact');
const socialRoute = require('../routes/social');
const userRoute = require('../routes/login');
const filesRoute = require('../routes/files');
const counterRoute = require('../routes/counter');
const mailRoute = require('../routes/mail');
const path = require('path');

module.exports = function (app) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.static('build'));
    app.use('/counter', counterRoute);
    app.use('/files', filesRoute);
    app.use('/about', aboutRoute);
    app.use('/skills', skillsRoute);
    app.use('/portfolio', portfolioRoute);
    app.use('/portfolio/type/', portfolioTypeRoute);
    app.use('/contact', contactRoute);
    app.use('/social', socialRoute);
    app.use('/user', userRoute);
    app.use('/mail', mailRoute);
    // app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));// this is for error pages
}
