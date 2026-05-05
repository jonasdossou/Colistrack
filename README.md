# OJU Tracking

Application web simple pour le suivi de colis, entièrement statique et autonome.

## 📦 Fonctionnalités

- **Recherche de colis** : Entrez un numéro de suivi pour voir le statut, l'expéditeur, le destinataire et l'historique.
- **Dashboard complet** : Gérez les colis depuis une page dédiée.
- **Mise à jour du statut** : Basculez de "Déposé" ou "En attente" à "En transit", puis à "Arrivé" et enfin à "Livré".
- **Couleur du statut** : Statut vert pour "Livré", bleu pour "Arrivé", orange pour "En transit", jaune/doré pour "Déposé" et ocre pour "En attente".
- **Ajout de colis** : Depuis le dashboard, ajoutez de nouveaux colis avec numéro de suivi, lieux de départ/arrivée et statut initial.
- **Données locales** : Utilise des données de démonstration stockées dans le navigateur (pas de serveur backend requis).

## 🚀 Installation et exécution

### Prérequis
- Node.js installé sur votre machine.

### Étapes
1. Clonez ce dépôt :
   ```bash
   git clone git@github.com:jonasdossou/OjuTracking.git 
   cd oju-tracking
   ```

2. Installez les dépendances :
   ```bash
   npm install
   ```

3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```

4. Ouvrez votre navigateur à `http://localhost:3000`.

## 🌐 Déploiement

Ce projet est entièrement statique, donc facile à déployer :

- **Netlify** (recommandé) : Connectez votre repo GitHub à Netlify. Pas de build nécessaire, publiez le répertoire racine.
- **GitHub Pages** : Activez GitHub Pages dans les paramètres du repo.
- **Autre** : Tout hébergeur de fichiers statiques fonctionne.

## 🛠 Technologies utilisées

- **HTML5** : Structure de la page.
- **CSS3** : Styles et mise en page.
- **JavaScript (ES6)** : Logique côté client, gestion des données et interactions.

## 📁 Structure du projet

```
oju-tracking/
├── index.html          # Page principale (recherche de colis)
├── dashboard.html      # Page du dashboard
├── style.css           # Styles CSS
├── app.js              # Logique JavaScript
├── package.json        # Configuration npm
└── README.md           # Ce fichier
```

## 🎯 Utilisation

- Sur la page d'accueil (`index.html`), entrez un numéro de suivi comme `OJU123456` et cliquez "Rechercher".
- Cliquez sur "Enregistrer un nouveau colis" pour accéder au dashbord et     à la liste de tous les colis.
- Dans le dashboard, utilisez le formulaire pour ajouter de nouveaux colis.
- Depuis le dashboard, cliquez sur :
  - **Départ** pour passer le colis en `En transit`.
  - **Arrivée** pour passer le colis en `Arrivé`.
  - **Livré** pour passer le colis en `Livré`.
- Le statut reste en `En attente` tant que le bouton **Arrivée** n'a pas été appuyé après le départ.

## 📝 Données de démonstration

Le projet inclut 3 colis de test :
- `OJU123456` : En transit Paris → Lyon
- `OJU654321` : Livré Marseille → Nice
- `OJU987654` : En attente Toulouse → Bordeaux

## 🤝 Contribution

N'hésitez pas à ouvrir des issues ou des pull requests pour améliorer l'application !

## 📄 Licence

Ce projet est sous licence MIT. Utilisez-le librement.