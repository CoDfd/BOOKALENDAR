//import de mongoose
const mongoose = require(`mongoose`);


//connection bdd
const mongodbconnection = mongoose.connect(`mongodb+srv://bookalendar:bookalendar@bookalendar.uomvbbu.mongodb.net/?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


 //Export
 module.exports = mongodbconnection;