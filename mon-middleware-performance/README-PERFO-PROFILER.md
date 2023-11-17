# Performance Profiler  (en Français)

Le module Performance Profiler est un middleware conçu pour surveiller et enregistrer les performances des requêtes HTTP en mesurant le temps de réponse et en loguant des informations pertinentes.
Il est spécialement conçu pour aider les développeurs à surveiller, enregistrer et optimiser les performances des requêtes HTTP. Il est particulièrement utile lors de l'interaction avec des APIs de gestion commerciale telles que EBP Gestion commerciale SAAS, où les réponses peuvent être volumineuses, complexes et potentiellement lentes.

`Lien Git du middlware ` https://github.com/Fatysami/NOD-JS-PERF-PROFILER.git

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
git clone https://github.com/Fatysami/NodePulseProfiler.git
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




## ******************************************************************************************************************************
## ******************************************************************************************************************************

# Performance Profiler  (in English)

The Performance Profiler module is a middleware designed to monitor and record HTTP request performance by measuring response times and logging relevant information. It is specifically crafted to assist developers in monitoring, recording, and optimizing HTTP request performances. It is especially useful when interacting with third-party APIs like Google Places API, where responses can be voluminous, complex, and potentially slow.

## Description

This module provides a real-time overview of your application's performance. It records the total time, average time, as well as detailed statistics for each route. The data is written into a log file with daily rotation and can be accessed through a specific route.

## Features

**Response Time Measurement**: Accurate tracking of response time for each request, allowing for the identification of the most time-consuming operations.
**Detailed Logging**: Records relevant metrics in rotating logs for continuous monitoring without bloating storage.
**Performance Analysis**: Automatically categorizes requests according to performance thresholds for quick diagnosis of weak points.

### Prerequisites

- Node.js (recommended version: 14.x or higher)
- An Express.js application

## Installation

Clone the repository of a Test project for the middleware and install the necessary dependencies.

```   bash ``` 
- git clone https://github.com/Fatysami/NodePulseProfiler.git
- cd your-project-name
- npm install perfo-profiler

## Usage

To use this module in your project, import it and use it as middleware in your Express.js application.

```javascript ``` 
const express = require('express');
const { performanceProfilerMiddleware } = require('perfo-profiler');

const app = express();

// Apply the middleware to all routes
app.use(performanceProfilerMiddleware);

// Define your routes as usual
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ...

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

## Contact
Fatima ezzahraa SAMI - fatimaezzahraa1983@gmail.com






