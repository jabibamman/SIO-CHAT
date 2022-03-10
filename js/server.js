// Configuration du serveur et des modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
var path = require("path");
const PORT = 8080;
var allMsg = [];

// Port d'écoute
server.listen(PORT, () => {
    console.log('Serveur démarré sur le port : ' + PORT);
});

/*
 Générations des routes pour le serveur
*/

// Route page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Route client.js
app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + '/client.js');
});

// Route page style.css
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/style.css'));
});

// Route page boostrap.min.css
app.get('/bootstrap.min.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/bootstrap.min.css'));
});

// Route page boostrap.min.js
app.get('/bootstrap.min.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/bootstrap.min.js'));
});

// Route page Ultimate-Sidebar-Menu-BS5.js
app.get('/Ultimate-Sidebar-Menu-BS5.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/Ultimate-Sidebar-Menu-BS5.js'));
});

// Route page Ultimate-Sidebar-Menu-BS5.css
app.get('/Ultimate-Sidebar-Menu-BS5.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/Ultimate-Sidebar-Menu-BS5.css'));
});


/**
 * Fonction qui va générer une couleur aléatoire pour chaque utilisateur
 */
function generateColor() {
    randomColor = "#" + (Math.floor(Math.random() * 0xFFFFFF)).toString(16);
    return randomColor;
}

/**
 * Lancement du gestionnaire d'événements, qui va gérer notre Socket
 */
io.on('connection', (socket) => {

    // Saisie du pseudo de l'utilisateur
    socket.on('set-pseudo', async (pseudo) => {
        // Si le pseudo n'est pas défini alors on retourne nul sinon LOG DE CONNEXION
        (pseudo.trim() !== "undefined" ? console.log(pseudo.trim() + " vient de se connecter à " + new Date()) : null);

        // ON RÉCUPÈRE LE PSEUDO
        socket.nickname = "<b style=\"color:" + generateColor() + "\">" + pseudo + "</b>";
        socket.nicknameLog = pseudo;

        // Récupération de la liste des utilisateurs (Sockets) connectés
        io.fetchSockets().then((room) => {

            // On crée un premier utilisateur nommé salon, retournant l'id salon a chaque fois
            var userConnecter = [{id_users: 'general', pseudo_client: 'Salon'}];

            // On va donc ajouter à chaque connexion les utilisateurs dans le tableau
            room.forEach((item) => {
                userConnecter.push({
                    id_users: item.id, pseudo_client: item.nickname
                });
            });
            io.emit('get-pseudo', userConnecter);
        });
        io.emit('allMsg', allMsg);

        // PERMET D'AFFICHER LES PERSONNES CONNECTÉS EN LOG (mode debug)
        /* console.log("Personnes Connecté(e)s : "); sockets.forEach(element => console.log(element.nickname)); */
    });

    /*
     Socket pour l'émission/reception des messages et socket id - SERVER.js
    */
    socket.on('emission_message', (message, id) => {

        // LOG DE MESSAGES
        console.log(socket.nicknameLog.trim() + " à écrit : " + message + " à " + new Date().getHours() + ":" + new Date().getUTCMinutes() + " émetteur : " + socket.id + " destinataire : " + id);

        var laDate = new Date();

        // Mis en format JSON
        var unMessage = {
            emet_id: socket.id,
            dest_ID: id,
            pseudo: socket.nickname,
            msg: message,
            date: laDate.toLocaleDateString() + ' - ' + laDate.toLocaleTimeString(),
            recu: false
        }

        /*
         On envoie le message aux bonnes personnes, dans le salon général tout le monde le reçois,
         mais pour les messages privés seul l'émetteur et le destinataire reçoivent le message.
        */
        if (id === "general") {
            io.emit('reception_message', unMessage);

        } else {
            io.to(id).to(socket.id).emit('reception_message', unMessage);
        }

    });

    /*
     Socket pour informer la déconnexion
    */
    socket.on('disconnect', async () => {
        // LOG DE DÉCONNEXION
        let pseudoDisconnected // Variable créée pour éviter erreur de code

        socket._onclose( pseudoDisconnected = socket.nicknameLog);

        console.log(pseudoDisconnected + " viens de ce déconnecter à " + new Date ());

        // PERMET D'AFFICHER LES PERSONNES CONNECTÉS EN LOG
        /* console.log("Personnes Connecté(e)s : "); sockets.forEach(element => console.log(element.nickname));  */

        // Récupération de la liste des utilisateurs (Sockets) connectés
        io.fetchSockets().then((room) => {
            var userConnecter = [{id_users: 'general', pseudo_client: 'Salon'}];

            // À chaque déconnexion les utilisateurs dans le tableau
            room.forEach((item) => {
                userConnecter.push({
                    id_users: item.id, pseudo_client: item.nickname
                });
            });
            io.emit('get-pseudo', userConnecter);
        });
    });
});