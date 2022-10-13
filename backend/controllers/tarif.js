//const { then } = require("../db/db.mongodb");
const Tarif = require(`../models/Tarif`);

//controller get one

//controller get all of a month
exports.getMonthTarifs = (req, res, next) => {
    const date = req.params.YYYY_MM.split('-');
    const month = date[1];
    const year = date[0];
    Tarif.find({year: year, month: month}).sort({ dayindex: 1 })
        .then(tarifs => {
            const tarifsJson = JSON.stringify(tarifs);
            res.status(200).json(tarifsJson)
        })
        .catch(error => res.status(404).json({ error }));
}

//controller get between two dates /api/tarifs?start=YYYY-MM-DD&end=YYYY-MM-DD
exports.getTarifs = (req, res, next) => {
    const start = req.query.start.split('-');
    let dateStart = new Date(start[0], start[1], start[2]);
    const end = req.query.end.split('-');
    let dateEnd = new Date(end[0], end[1], end[2]);
    if(dateStart > dateEnd) {
        const dateTampon = dateEnd;
        dateEnd = dateStart;
        dateStart = dateTampon;
    }
    Tarif.find({date:{$gte: dateStart, $lt: dateEnd}}).sort({date: 1})
        .then(tarifs => {
            /*console.log(`${dateStart}`+` & `+`${dateEnd}`);
            console.log(tarifs);*/
            const tarifsJson = JSON.stringify(tarifs);
            res.status(200).json(tarifsJson)
        })
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

    Tarif.deleteMany({year: year, month: month})
       /* .then(() => {
            res.json({ check: `Tarifs du mois ${month} ${year} supprimés !`});
            console.log("1");
        })*/ 
 
        .then(() => {
            tarifsMonth.forEach(element => {
                const eachDayDate = element.index +1 ;
                const date = new Date(year, month , eachDayDate);
                const tarif = new Tarif({
                    year: year,
                    month: month,
                    dayindex: eachDayDate,
                    date: date,
                    price: element.price,
                    selected: element.selected,
                })
                tarifsPost.push(tarif);
            });
            Tarif.insertMany(tarifsPost)
                .then(() => {
                    res.status(200).json({ message: `Tarifs du mois ${month}/${year} enregistrés !`});
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