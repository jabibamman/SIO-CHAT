
// Configuration du serveur, et des modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
var path = require("path");
let PORT = 8080;

// Port d'écoute
server.listen(PORT, () => {
    console.log('Serveur démarré sur le port : ' + PORT);
});

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


function generateColor() {
    randomColor ="#" + (Math.floor(Math.random()*0xFFFFFF)).toString(16);
    return randomColor;
}

// Lancement du gestionnaire d'événements, qui va gérer notre Socket
io.on('connection', (socket) => {
    // Saisie du pseudo de l'utilisateur
    socket.on('set-pseudo', async (pseudo) => {
        // LOG DE CONNEXION
        //if (pseudo.trim() !== "undefined") { console.log(pseudo.trim() + " vient de se connecter à " + new Date()); }
        (pseudo.trim() !== "undefined" ? console.log(pseudo.trim() + " vient de se connecter à " + new Date()) : null);

        // ON RÉCUPÈRE LE PSEUDO
        socket.nickname = "<b style=\"color:"+generateColor()+"\">" + pseudo + "</b>";
        socket.nicknameLog = pseudo;

        // Récupération de la liste des utilisateurs (Sockets) connectés
        io.fetchSockets().then((room)=>{

            // on crée un premier utilisateur nommé salon, retournant l'id salon a chaque fois
            var userConnecter=[];
            room.forEach((item) => {
                userConnecter.push({
                    id_users : item.id,
                    pseudo_client : item.nickname
                });
            });
            io.emit('get-pseudo', userConnecter);
        });


        // PERMET D'AFFICHER LES PERSONNES CONNECTÉS EN LOG
        /* console.log("Personnes Connecté(e)s : "); sockets.forEach(element => console.log(element.nickname)); */
    });

    // Socket pour l'émission/reception des messages et socket id - SERVER.js
    socket.on('emission_message', (message, dest_ID) => {

        // LOG DE MESSAGES
        console.log(socket.nicknameLog.trim() + " à écrit : " + message + " à " + new Date().getHours() + ":" + new Date().getUTCMinutes() + " " + socket.id);
        socket.message = message;

        var laDate = new Date();

        var message = {
            emet_id : socket.id,
            dest_ID : dest_ID,
            pseudo : socket.nickname,
            msg : message,
            date : laDate.toLocaleDateString()+' - ' + laDate.toLocaleTimeString(),
            recu : false
        }
        // Mis en format JSON
        if(dest_ID == "salon") {
            io.emit('reception_message',
                {
                    message: message
                });
        }else {
            io.to(message.dest_ID).to(message.emet_id).emit('reception_message',
                {
                    message: message
                });
        }
    });


    // Socket pour informer la déconnection
    socket.on('disconnect', async () => {
        // LOG DE DÉCONNEXION
        socket._onclose(console.log(socket.nicknameLog + " viens de ce déconnecter à " + new Date()));

        // PERMET D'AFFICHER LES PERSONNES CONNECTÉS EN LOG
        /* console.log("Personnes Connecté(e)s : "); sockets.forEach(element => console.log(element.nickname));  */

        // Récupération de la liste des utilisateurs (Sockets) connectés
        io.fetchSockets().then((room)=>{
            var userConnecter=[];
            room.forEach((item) => {
                userConnecter.push({
                    id_users : item.id,
                    pseudo_client : item.nickname
                });
            });
            io.emit('get-pseudo', userConnecter);
        });
    });
});