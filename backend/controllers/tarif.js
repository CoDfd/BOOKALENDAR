//const { then } = require("../db/db.mongodb");
const Tarif = require(`../models/Tarif`);

//controller get one

//controller get all of a month

//controller post
exports.createTarifs = (req, res, next) => {
    console.log("0");
    const date = req.params.YYYYMM.split('-');
    const month = date[1];
    const year = date[0];
    const tarifsMonth = JSON.parse(req.body);
    const tarifsPost = [];
    console.log("0.1");

    Tarif.deleteMany({year: year}, {month: month})
        .then(() => {
            res.status(200).json({ message: `Tarifs du mois ${month} ${year} supprimés !`});
            console.log("1");
        })

        .then(() => {
            console.log("2");
            tarifsMonth.forEach(element => {
                const eachDayDate = element.index +1 ;
                const tarif = new Tarif({
                    year: year,
                    month: month,
                    dayindex: eachDayDate,
                    price: element.price,
                    selected: element.selected,
                })
                tarifsPost.push(tarif);
            });
            Tarif.insertMany(tarifsPost)
                .then(() => {
                    res.status(200).json({ message: `Tarifs du mois ${month} ${year} enregistrés !`});
                    console.log("3");
                })
                .catch(error => {
                    res.status(400).json({ error });
                    console.log("ERREUR 3");
                });
            
        })

        .catch(error => {
            res.status(400).json({ error });
            console.log("ERREUR 1 ET 2");
        });



}

//controller put

//controller delete