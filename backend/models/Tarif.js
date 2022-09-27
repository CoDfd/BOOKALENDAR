const mongoose = require(`mongoose`);

const tarifSchema = mongoose.Schema({
    // _id sera généré automatiquement par mongoDB
    year: { type: Number, required: true },
    month: { type: Number, required: true },


    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    usersLiked: [ "String <userId>" ],
    usersDisliked: [ "String <userId>" ]
});

module.exports = mongoose.model(`Tarif`, tarifSchema); 