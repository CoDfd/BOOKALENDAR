//const { then } = require("../db/db.mongodb");
const Tarif = require(`../models/Tarif`);

//controller get one

//controller get all of a month
exports.getMonthTarifs = (req, res, next) => {
    console.log(req.params);
    const date = req.params.YYYY_MM.split('-');
    const month = date[1];
    const year = date[0];
    Tarif.find({year: year, month: month}).sort({ dayindex: 1 })
        .then(tarifs => res.status(200).json(tarifs))
        .catch(error => res.status(404).json({ error }));
}

//controller post
exports.createTarifs = (req, res, next) => {
    console.log(req.params);
    const date = req.params.YYYY_MM.split('-');
    const month = date[1];
    const year = date[0];
    /*const getfrompost = JSON.parse(req.body);
    const tarifsMonth = getfrompost.month*/
    const tarifsMonth = req.body;
    const tarifsPost = [];

    Tarif.deleteMany({year: year}, {month: month})
       /* .then(() => {
            res.json({ check: `Tarifs du mois ${month} ${year} supprimés !`});
            console.log("1");
        })*/ 
 
        .then(() => {
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
                })
                .catch(error => {
                    res.status(400).json({ error });
                    console.log("ERREUR ROUTE POST MONTH");
                });
            
        })

        .catch(error => {
            res.status(400).json({ error });
            console.log("ERREUR 1 ET 2");
        });



}

//controller put

//controller delete