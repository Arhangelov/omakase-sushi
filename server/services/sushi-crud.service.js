const Sushi = require('../models/Sushi');
const User = require('../models/User')

async function addSushi ( data ) {
    return new Sushi(data).save();
};

module.exports = {
    addSushi,
}