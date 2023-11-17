const express = require('express');
const axios = require('axios');
const Datastore = require('nedb');
const path = require('path');
require('dotenv').config();

//NOTE IMPORTANTE!!!!!
//Pour tester le middlware du projet 
//const { timingMiddleware, stats } = require('./performanceProfiler');

//Pour tester le middlware npm perfo-profiler**********************
const { timingMiddleware, stats } = require('perfo-profiler');
//*****************************************************************

const app = express();

// Créez et chargez la base de données NeDB
const db = new Datastore({ filename: './cafes.db', autoload: true });

// Utilisez le middleware de timing pour toutes les routes
app.use(timingMiddleware);

// Route de test d'une requete rapide
  app.get('/', (req, res) => {
  res.send('Bonjour le monde !');
});

    //Tapez********** 
  //- /cafes/gueliz pour le quartier Guéliz. (Requete moyenne)
  //- /cafes/marrakech pour toute la ville de Marrakech. (Requete lente)
  app.get('/cafes/:scope', getCafesInAreaWithGoogle);

// Route pour obtenir les statistiques de performance
app.get('/stats', (req, res) => {
    // TODO: Ajouter une authentification pour sécuriser cet endpoint
    res.json(stats);
  });



async function getCafesInAreaWithGoogle(req, res) {
  const scope = req.params.scope; // Récupérer le scope à partir du paramètre d'URL

  // Paramètres par défaut pour différents scopes
  const scopes = {
    gueliz: {
      lat: '31.633',
      lon: '-8.006',
      radius: '1000',
      maxCafes: 20 // Maximum pour Gueliz pour faire une req myenne
    },
    marrakech: {
      lat: '31.63',
      lon: '-8.00',
      radius: '5000',
      maxCafes: 500 // Maximum pour Gueliz pour faire une req lente
    }
  };

  // Assurer que le scope est valide
  if (!scopes[scope]) {
    return res.status(404).send('Scope non reconnu');
  }

  // Utiliser les paramètres du scope choisi
  const { lat, lon, radius, maxCafes } = scopes[scope];

  // Remplacez par votre clé d'API Google valide
  const apiKey =  process.env.GOOGLE_API_KEY; //'AIzaSyB3xboiF4XV0INC5TK7nvwjApGvLBe1BiI' vous pouvez utiliser cet API elle est valide
  console.log(apiKey);
  let googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lon}&radius=${radius}&type=cafe&key=${apiKey}`;

  let cafes = [];
  let nextPageToken = null;
  let count = 0; // Compteur pour suivre le nombre de cafés

  try {
    let cafes = [];
    let count = 0;
    let nextPageToken = null;
  
    // Videz d'abord la base de données NeDB
    db.remove({}, { multi: true }, function (err, numRemoved) {
      if (err) {
        console.error('Erreur lors de la vidange de la base de données NeDB:', err);
        return res.status(500).send('Erreur lors de la vidange de la base de données.');
      }
      console.log(`Base de données NeDB vidée. Nombre de documents supprimés: ${numRemoved}`);
      
      // Commencez ensuite la récupération des données des cafés
      (async function() {
        do {
          if (nextPageToken) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            googlePlacesUrl = `${googlePlacesUrl}&pagetoken=${nextPageToken}`;
          }
  
          const response = await axios.get(googlePlacesUrl);
          cafes = cafes.concat(response.data.results);
          count += response.data.results.length;
          nextPageToken = response.data.next_page_token;
  
          if (count >= maxCafes) {
            cafes = cafes.slice(0, maxCafes);
            break;
          }
  
        } while (nextPageToken);
  
        // Insertion des nouveaux cafés dans NeDB
        db.insert(cafes, (err, newDocs) => {
          if (err) {
            console.error('Erreur lors de l’insertion des cafés dans NeDB:', err);
            return res.status(500).send('Erreur lors de la sauvegarde des données.');
          }
          res.json(cafes);
        });
      })();
    });
  
  } catch (error) {
    console.error(`Erreur lors de l’appel à l’API Google Places:`, error.message);
    res.status(500).send('Erreur lors de la récupération des données.');
  }
}

  // Gestion des erreurs de l'application
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Quelque chose a mal tourné!');
  });
  
  // Démarrer le serveur
  const PORT = process.env.PORT || 3030;
  app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
  });