const Sushi = require('../models/Sushi');

const getType = async (typeOfSushi) => {
    return  Sushi.find({ type: typeOfSushi.toLowerCase() });
};

module.exports = {
    getType,
}


