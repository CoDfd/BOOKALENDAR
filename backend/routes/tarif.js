const express = require(`express`);
const router = express.Router();

const tarifCtrl = require(`../controllers/tarif`);

//route Post pour un mois entier
router.post('/:YYYY_MM', tarifCtrl.createTarifs);

//route get all pour un mois entier
router.get('/:YYYY_MM', tarifCtrl.getMonthTarifs);

/*//route Post
router.post('/', auth, multer, sauceCtrl.createSauce);
//route PUT pour un modifier objet spécifique
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
//route DELETE pour un supprimer objet spécifique
router.delete('/:id', auth, sauceCtrl.deleteSauce);
//selectionner les usage requettes get
router.get('/', auth, sauceCtrl.getAllSauces);
//route get pour un objet spécifique
router.get('/:id', auth, sauceCtrl.getOneSauce);
//route like
router.post('/:id/like', auth, sauceCtrl.likeSauce);*/

module.exports = router;