const rfs = require('rotating-file-stream');
const path = require('path');

// Configuration du stream de rotation des logs pour gérer la création de nouveaux fichiers de log périodiquement.
const accessLogStream = rfs.createStream('performance.log', {
  interval: '1d', // Effectuer la rotation des logs tous les jours.
  path: path.join(__dirname, '..', 'logs') // Le dossier où les fichiers de log seront stockés.
}).on('error', (err) => {
  console.error('Erreur avec le fichier de log de rotation :', err); // Gestion des erreurs du stream de logs.
});

// Objet pour conserver les statistiques de performance de l'application.
const stats = {
  totalRequests: 0,
  totalTime: 0,
  averageTime: 0,
  paths: {} // Statistiques détaillées par chemin d'accès.
};

// Middleware pour enregistrer le temps de réponse des requêtes.
function timingMiddleware(req, res, next) {
  const startTime = new Date(); // Capture de la date/heure de début.
  const startHrTime = process.hrtime(); // Démarrer le chronomètre haute résolution.
  const seuilRapide = 100; // Seuil pour une réponse rapide en ms.
  const seuilLent = 1000; // Seuil pour une réponse lente en ms.

  // Écouteur d'événement appelé lorsque la réponse HTTP est terminée.
  res.on('finish', () => {
    try {
      const diff = process.hrtime(startHrTime); // Calculer la différence de temps.
      const time = diff[0] * 1e3 + diff[1] * 1e-6; // Convertir en millisecondes.
      const endTime = new Date(); // Capture de la date/heure de fin.

      // Mise à jour des statistiques globales et par chemin.
      stats.totalRequests += 1;
      stats.totalTime += time;
      stats.averageTime = stats.totalTime / stats.totalRequests;

      const pathStat = stats.paths[req.path] || { count: 0, totalTime: 0, averageTime: 0 };
      pathStat.count += 1;
      pathStat.totalTime += time;
      pathStat.averageTime = pathStat.totalTime / pathStat.count;
      stats.paths[req.path] = pathStat;

      // Détermination du niveau de performance de la requête.
    let niveauPerformance = 'rapide';
    let logMessage = `La requête ${req.method} ${req.url} a pris ${time.toFixed(2)}ms`;

    // Si la requête est lente, ajouter des détails dans le log.
    if (time > seuilLent) {
      niveauPerformance = 'lent';
      logMessage += ` et est classée comme ${niveauPerformance}. [${startTime.toISOString()} - ${endTime.toISOString()}]`;
      // Utiliser setImmediate pour la console.warn
      setImmediate(() => {
        console.warn(`Attention: ${logMessage}`);
      });
    } else if (time > seuilRapide && time <= seuilLent) {
      niveauPerformance = 'moyen';
      logMessage += ` et est classée comme ${niveauPerformance}`;
    }

    // Utiliser setImmediate pour l'écriture dans le fichier de log.
    setImmediate(() => {
      accessLogStream.write(`${logMessage}\n`);
    });

    // Affichage dans la console si ce n'est pas une requête lente.
    if (niveauPerformance !== 'lent') {
      setImmediate(() => {
        console.log(logMessage);
      });
    }
  } catch (error) {
    // Gestion des erreurs lors de l'enregistrement des statistiques.
    console.error('Erreur lors de l’enregistrement du log :', error);
  }
});

  next(); // Passer au middleware suivant.
}

module.exports = {
    timingMiddleware,
    stats
  }; // Exporter le middleware pour une utilisation dans l'application principale.
