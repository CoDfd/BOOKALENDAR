const mongoose = require(`mongoose`);

const tarifSchema = mongoose.Schema({
    // _id sera généré automatiquement par mongoDB
    year: { type: Number, required: true }, // i'dlike it unique
    month: { type: Number, required: true },
    dayindex: { type: Number, required: true},
    price: { type: Number, required: true, default: 0 }, //set to 0 if not
    selected: { type: Boolean, required: true, default: false}

});

module.exports = mongoose.model(`Tarif`, tarifSchema); 