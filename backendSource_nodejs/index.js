const express = require('express');
const app = express();

require('./startup/db')();
require('./startup/routes')(app);

const port = process.env.PORT || 4000;
const server = app.listen(port, () => console.log(`${port} is runing!`));

module.exports = server;