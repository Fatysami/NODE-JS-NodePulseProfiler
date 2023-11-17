# Application de test d'intégration du middleware Performance Profiling

## Aperçu

Cette application intègre le middleware Performance Profiler pour surveiller et optimiser les requêtes HTTP, particulièrement lors de l'interaction avec des APIs complexes telles que EBP Gestion commerciale.

- `Lien Git du middleware ` https://github.com/Fatysami/NOD-JS-PERF-PROFILER.git
- `Lien npm ` https://www.npmjs.com/package/perfo-profiler
- `Installation ` npm i perfo-profiler

- `app.js` est le fichier d'entrée de notre application, qui configure le serveur, définit les routes, gère les erreurs et initie le serveur pour écouter sur un port spécifié. Voici une vue d'ensemble de ses composants et de leur fonctionnement

- `app.js` est configuré pour démontrer et tester la manière dont le middleware de profilage de performance peut être intégré dans une application existante, en particulier pour les applications interagissant avec des API tierces comme Google Places API.

## Fonctionnalités

- **Performance Profiling**: Mesure et journalise les performances de chaque requête API.
- **Optimisation des Requêtes**: Aide à identifier et à réduire les délais de réponse des requêtes.

## Description de app.js

-**Le fichier app.js** est le cœur de mon application Node.js utilisant Express.js. Il orchestre plusieurs aspects essentiels de mon application
-**Initialisation de l'application** : app.js commence par créer une instance d'Express qui est le fondement sur lequel je bâtisse mon application. Cette instance est configurée pour gérer les requêtes HTTP, les réponses, et les middlewares.
-**Middleware de Profilage de Performance** : Au cœur de app.js, j'ai intégré mon middleware personnalisé performanceProfiler. Ce middleware est appliqué globalement à toutes les routes de l'application et est conçu pour surveiller les temps de réponse des requêtes, fournissant ainsi des statistiques vitales qui nous aident à comprendre et à optimiser les performances de l'application.
-**Gestion des routes** : app.js définit des routes spécifiques qui déterminent comment l'application répond aux différentes requêtes HTTP. Pour tester l'efficacité de mon middleware de profilage, j'ai inclus des routes d'exemple qui simulent des réponses rapides, moyennes et lentes.
-**Démarrage du Serveur** : En fin de fichier, app.js configure mon application pour écouter sur un port spécifique, démarrant ainsi le serveur et permettant à l'application de recevoir des requêtes entrantes.

## Guide d'utilisation et de configuration de app.js

```   Configuration initiale ``` 
--**Dépendances nécessaires** : Avant de démarrer l'application, assurez-vous que toutes les dépendances nécessaires sont installées. Exécutez npm install pour installer toutes les dépendances listées dans votre fichier package.json.
 
- `express`: Cadre d'application web pour Node.js, utilisé pour construire notre serveur API.
- `axios`: Une bibliothèque de promesses basée sur HTTP client pour effectuer des requêtes HTTP.
- `nedb`: Un système de base de données embarqué léger basé sur JavaScript.
- `path`: Un module de base de Node.js pour manipuler les chemins de fichiers.
- `dotenv`: Un module pour charger des variables d'environnement à partir d'un fichier .env.

--**Variables d'environnement** : Configurez la variables d'environnement, notamment pour les clés API et autres configurations sensibles, pour sécuriser vos informations d'identification et permettre des changements faciles entre les environnements de développement et de production, je vous met ma clé active pour vous tests.

--**Connexion à la base de données** : mon application utilise NeDB, qui est une base de données embarquée écrite en JavaScript. NeDB est conçue pour être légère et facile à utiliser, ce qui la rend idéale pour de petits projets ou des applications nécessitant une solution de stockage simple sans les tracas de la configuration d'une base de données plus robuste comme MongoDB ou MySQL.

```   Utilisation de app.js ``` 
-**Démarrage de l'application**-
Exécution : Pour démarrer l'application, exécutez node app.js ou npm start si vous avez configuré un script de démarrage dans package.json.
Surveillance du port : app.js configure votre application pour écouter les requêtes sur un port spécifié. Assurez-vous que le port est ouvert et disponible sur votre serveur.

-**Intégration du Middleware de Profilage**-
J'ai développé un middleware, timingMiddleware, pour mesurer et enregistrer les performances des requêtes HTTP de notre API. Ce middleware enregistre le temps de réponse et fournit des statistiques à travers l'endpoint /stats.
Le middleware performanceProfiler est ajouté avec app.use() avant la définition de toutes les autres routes pour capturer toutes les statistiques de performance.
Gestion des routes

-**Définition des routes**

- `Route d'accueil (/)`
Une requête GET simple et rapide qui renvoie un message de salutation. Cette route est utilisée comme un test de base pour s'assurer que l'API fonctionne.

- `Route de recherche de cafés (/cafes/:scope)`
-Une requête GET dynamique qui utilise Google Places API pour récupérer des informations sur les cafés basées sur le "scope" spécifié dans l'URL.
-Le "scope" peut être soit gueliz pour une requête moyenne, soit marrakech pour une requête plus lente, simulant différentes charges et performances.
-Cette route illustre comment notre middleware de profilage de performance peut être utilisé pour surveiller les appels API externes.
-Route de statistiques de performance (/stats)
-Une requête GET qui renvoie les statistiques accumulées par le timingMiddleware, permettant aux développeurs de surveiller les performances de l'application.

-**Fonction getCafesInAreaWithGoogle**

-Une fonction asynchrone qui utilise axios pour appeler l'API Google Places et récupérer des données sur les cafés dans un certain périmètre déterminé par les paramètres scope.
-Les résultats sont ensuite insérés dans notre base de données NeDB pour une récupération rapide et un traitement ultérieur.

-**Gestion des erreurs**

-Un middleware d'erreur standard est utilisé pour intercepter et enregistrer les erreurs du serveur, en envoyant une réponse générique au client pour éviter de divulguer des détails d'implémentation sensibles.

-**Démarrage du serveur**

Le serveur est configuré pour écouter sur le port défini par la variable d'environnement PORT ou par défaut sur le port 3030.
Une confirmation est enregistrée dans la console lorsque le serveur démarre avec succès et écoute les requêtes entrantes.

## Remerciements à Mon Professeur
En guise de note de fin, je tiens à exprimer ma sincère gratitude à mon professeur pour l'orientation, le soutien et l'expertise partagée tout au long de ce projet. Vos enseignements ont été cruciaux dans l'application des concepts théoriques à des scénarios pratiques, et cela a été manifeste dans la réussite de ce middleware de profilage des performances. Merci pour votre patience et votre engagement dédié à notre apprentissage et à notre réussite.

Cordialement,
Fatima ezzahraa SAMI, Développeur confirmé WINDEV/WINDEV MOBILE/WEBDEV



