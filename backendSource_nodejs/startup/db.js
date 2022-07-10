const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  mongoose.connect(config.get('dbUrl'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log("DB connection error!", err));
}

