//import des paquets
const express = require(`express`); 
const path = require('path');
const mongoose = require(`mongoose`);

//importroutes
const tarifsRoutes = require(`./routes/tarif`);
/*const authRoutes = require(`./routes/authentification`);
const articleRoutes = require(`./routes/article`);
const commentRoutes = require(`./routes/comment`);
const userRoutes = require(`./routes/user`);*/


//connection bdd
const mongodbconnection = require('./db/db.mongodb');


//Création de l'app par la méthode express
const app = express();

//gestion des images
//require path dans les paquets
app.use('/images', express.static(path.join(__dirname, 'images')));

//tout ça sert à quoi?
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//routes
app.use('/api/tarifs', tarifsRoutes)
/*app.use(`/api/auth`, authRoutes);
app.use('/api/users', userRoutes);
app.use(`/api/articles`, articleRoutes);
app.use(`/api/comments`, commentRoutes);*/



module.exports = app;