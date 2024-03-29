<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jabibamman/SIO-CHAT">
    <img src="img/logo.png" alt="Logo" width="180" height="180">
  </a>

<h3 align="center">SIO CHAT</h3>

  <p align="center">
    Ce projet à été réalisé dans le cadre de ma 2ème année du BTS. C'est un chat de discussion en temps réel.
    <br />
    <a href="https://github.com/jabibamman/SIO-CHAT"><strong>Explorer la documentation »</strong></a>
    <br />
    <br />
    <a href="https://github.com/jabibamman/SIO-CHAT">Démonstration</a>
    ·
    <a href="https://github.com/jabibamman/SIO-CHAT/issues">Signaler un Bug</a>
    ·
    <a href="https://github.com/jabibamman/SIO-CHAT/issues">Demander des fonctionalitées </a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table des matières</summary>
  <ol>
    <li>
      <a href="#À-Propos-du-projet">À Propos du projet</a>
      <ul>
        <li><a href="#Réalisé-avec">Réalisé avec</a></li>
      </ul>
    </li>
    <li>
      <a href="#Installation">Installation</a>
      <ul>
        <li><a href="#Prérequis">Prérequis</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#Exemple-d\'utilisation">Utilsations</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#Contributeurs">Contributeurs</a></li>
    <li><a href="#Licence">Licence</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## À Propos du projet

[![Product Name Screen Shot][product-screenshot1]](https://abib-james.fr)
<p>Cette application est une application de messagerie permettant une discussion en temps réel entre plusieurs personnes.
Lors de la mise en place de ce projet je me suis inspiré d'une autre application de messagerie nommée Discord.</p>

[![Product Name Screen Shot][product-screenshot2]](https://abib-james.fr)
<p>Comme nous le voyons ici j'ai pu mettre en place des utilisateurs persistants. C'est à dire qu'ils restent enregitré dans la base de donnée durant de la déconnexion et même lors d'une reconnexion d'un utilisateur (via login/mot de passe).</p>

[![Product Name Screen Shot][product-screenshot3]](https://abib-james.fr)

<p>Page d'erreur 403 quand le client cherche à utiliser le chat de discussion sans être connecté</p>

<p align="right">(<a href="#top">retourner en haut</a>)</p>



### Réalisé avec

* [Node.js](https://nodejs.dev/)
* [Express.js](https://expressjs.com/)
* [Bootstrap](https://getbootstrap.com)


<p align="right">(<a href="#top">retourner en haut</a>)</p>



<!-- GETTING STARTED -->
## Début de l'installation

Pour obtenir une copie opérationnelle, suivez ces étapes d'exemple simples.

### Prérequis

Installer la dernière version de npm si ce n'est pas déjà fait :
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clonez le repo Git
   ```sh
   git clone https://github.com/jabibamman/SIO-CHAT.git
   ```
3. Installez les packages NPM
   ```sh
   npm install
   ```
4. Entrez votre config dans `js/config/conf.json`

```json

"db": {
  "host": "localhost",
  "port": 3306,
  "user": "root",
  "password": "",
  "database": "sio_chat"
},
"server": {
"port": "3000"
}

```

Optionnal

4. Pour activer/désactiver l'enregistrement des images envoyés par les utilisateurs, il faut modifier la valeur
   de `saveImage` dans `js/config/conf.json`

```json
{
  "saveImage": {
    "value": true,

    "path": "../img/user/"
  }
```

<p align="right">(<a href="#top">retourner en haut</a>)</p>



<!-- USAGE EXAMPLES -->

## Exemple d'utilisation

Pour plus d'exemples, veuillez vous référer à la [Documentation](https://github.com/jabibamman/SIO-CHAT/wiki).

<p align="right">(<a href="#top">retourner en haut</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [✅] Affichages des utilisateurs connectés
- [✅] Application responsive (Bootstrap)
- [✅] Messages privés entre utilisateurs
    - [✅] Notifications lors d'un message privé
- [✅] Mise en place d'une base de donnée
    - [✅] Connexion au chat via un login/mot de passe
    - [❌] Persistance des messages
- [✅] L'utilisateur à la possibilité d'envoyer des photos

Voir les [problèmes ouverts](https://github.com/github_username/repo_name/issues) pour une liste complète des fonctionnalités proposées (et des problèmes connus).

<p align="right">(<a href="#top">retourner en haut</a>)</p>



<!-- CONTRIBUTING -->
## Contributeurs

Les contributions sont ce qui fait de la communauté open source un endroit incroyable pour apprendre, inspirer et créer. Toutes les contributions que vous faites sont **grandement appréciées**.

Si vous avez une suggestion qui améliorerait cela, veuillez aller sur la repo et créer une "pull request". Vous pouvez aussi simplement ouvrir un ticket avec le tag "amélioration".
N'oubliez pas de mettre une étoile au projet ! 

Merci encore!

1. Forkez le projet
2. Créer votre Branche d'amélioration (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Faites un Push à la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez un Pull Request

<p align="right">(<a href="#top">retourner en haut</a>)</p>



<!-- LICENSE -->
## Licence

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">retourner en haut</a>)</p>



<!-- CONTACT -->
## Contact

James - [Linkedin](https://fr.linkedin.com/in/jamesabib) - james.abibamman@gmail.com - [Portfolio](https://abib-james.fr)

Project Link: [https://github.com/jabibamman/SIO-CHAT](https://github.com/jabibamman/SIO-CHAT)

<p align="right">(<a href="#top">retourner en haut</a>)</p>





<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/jabibamman/SIO-CHAT.svg?style=for-the-badge
[contributors-url]: https://github.com/jabibamman/SIO-CHAT/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/jabibamman/SIO-CHAT.svg?style=for-the-badge
[forks-url]: https://github.com/jabibamman/SIO-CHAT/network/members
[stars-shield]: https://img.shields.io/github/stars/jabibamman/SIO-CHAT.svg?style=for-the-badge
[stars-url]: https://github.com/jabibamman/SIO-CHAT/stargazers
[issues-shield]: https://img.shields.io/github/issues/jabibamman/SIO-CHAT.svg?style=for-the-badge
[issues-url]: https://github.com/jabibamman/SIO-CHAT/issues
[license-shield]: https://img.shields.io/github/license/jabibamman/SIO-CHAT.svg?style=for-the-badge
[license-url]: https://github.com/jabibamman/SIO-CHAT/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/jamesabib
[product-screenshot1]: img/screenshot.png
[product-screenshot2]: img/login.png
[product-screenshot3]: img/403.png
