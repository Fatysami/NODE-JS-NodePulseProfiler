# Performance Profiler pour Express.js

Le module Performance Profiler est un middleware Express.js conçu pour surveiller et enregistrer les performances des requêtes HTTP en mesurant le temps de réponse et en loguant des informations pertinentes.
Il est spécialement conçu pour aider les développeurs à surveiller, enregistrer et optimiser les performances des requêtes HTTP. Il est particulièrement utile lors de l'interaction avec des APIs de gestion commerciale telles que EBP Gestion commerciale SAAS, où les réponses peuvent être volumineuses, complexes et potentiellement lentes.

## Description

Ce module offre un aperçu des performances de votre application en temps réel. Il enregistre le temps total, le temps moyen, ainsi que des statistiques détaillées pour chaque route. Les données sont écrites dans un fichier de log avec rotation quotidienne et peuvent être consultées via une route spécifique.

## Fonctionnalités

- **Mesure du Temps de Réponse**: Suivi précis du temps de réponse pour chaque requête, permettant d'identifier les opérations les plus gourmandes en temps.
- **Logs Détaillés**: Consigne des métriques pertinentes dans des journaux avec rotation pour un suivi continu sans gonflement du stockage.
- **Analyse de Performance**: Catégorisation automatique des requêtes selon des seuils de performance pour un diagnostic rapide des points faibles.

### Prérequis

- Node.js (version recommandée: 14.x ou plus)
- Une application Express.js

## Installation

Clonez le dépôt et installez les dépendances nécessaires.

```   bash ``` 
git clone https://yourrepositorylink.com
cd your-project-name
npm install

## Utilisation

Pour utiliser ce module dans votre projet, importez-le et utilisez-le comme middleware dans votre application Express.js.

```javascript ``` 
const express = require('express');
const { performanceProfilerMiddleware } = require('performanceProfiler');

const app = express();

// Appliquez le middleware à toutes les routes
app.use(performanceProfilerMiddleware);

// Définissez vos routes comme d'habitude
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ...

app.listen(3000, () => {
  console.log('Serveur à l'écoute sur le port 3000');
});

## Contact
Fatima ezzahraa SAMI - fatimaezzahraa1983@gmail.com