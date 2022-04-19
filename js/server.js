// Configuration du serveur et des modules
const express = require('express');
const app = express();

// Module Express-Session
const session = require('express-session');

// Module mariadb, et configuration connection au serveur
const mariadb = require('mariadb');
// connexion à la base de données
const db = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'sio_chat'
    //,port : '3307' // Rajouter le port si le port par défaut (3306) n'est pas utilisé
});

// Variable qui va contenir les infos de l'utilisateur (chargé depuis la BDD)
let infosUtilisateur;

// Configuration du serveur
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const path = require("path");
const PORT = 8080;

// Propriétés session Express + prise en charge données réseau
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json()); // Prise en charge du format JSON
app.use(express.urlencoded({extended:true})); // Prise en charge des formulaires/entêtes HTML

// Port d'écoute
server.listen(PORT, () => {
    console.log('Serveur démarré sur le port : ' + PORT);
});


/*
 Générations des routes pour le serveur
*/
// Route page d'accueil
app.get('/salon', (req, res) => {
    // On vérifie s'il y a bien une connexion
    if(req.session.loggedin){
        // Si oui, on charge la page du salon de discussion
        res.sendFile(path.join(__dirname, '..', 'index.html'));
    }else{
        // Si non, on le redirige vers la page 403
        res.sendFile(path.join(__dirname, '..', '403.html'));
        // Erreur 403 : accès non autorisé
        res.status(403);

    }
    /*
    console.log(req.sessionID); // ID de la session
    console.log(req.session); // Contenu de la session
    */
});

// Route page de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'login.html'));
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

// Route page Animated-CSS-Waves-Background-SVG.css
app.get('/Animated-CSS-Waves-Background-SVG.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/Animated-CSS-Waves-Background-SVG.css'));
});

// Route page Login-Box-En.css
app.get('/Login-Box-En.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/Login-Box-En.css'));
});


// Route page boostrap.min.js
app.get('/bootstrap.min.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/bootstrap.min.js'));
});

// Route page login.css
app.get('/login.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/login.css'));
});

// Route page Ultimate-Sidebar-Menu-BS5.js
app.get('/Ultimate-Sidebar-Menu-BS5.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/Ultimate-Sidebar-Menu-BS5.js'));
});

// Route page Ultimate-Sidebar-Menu-BS5.css
app.get('/Ultimate-Sidebar-Menu-BS5.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/Ultimate-Sidebar-Menu-BS5.css'));
});

// Route vers 403.html
app.get('/403', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '403.html'));
});

// Route vers 403.css
app.get('/403.css', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'css/403.css'));
});

// Route vers 403.js
app.get('/403.js', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'js/403.js'));
});

// Route vers HPfrKl.png
app.get('/HPfrKl.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'img/HPfrKl.png'));
});

// Route vers solvejgdesign_fond4k5.png
app.get('/solvejgdesign_fond4k5.png', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'img/solvejgdesign_fond4k5.png'));
});

// Gestionnaire de connexion au salon
app.post('/login', async(req,res)=>{
    // Connexion à la BDD
    const conn = await db.getConnection();
    // Requête SQL
    const sql = "SELECT * FROM utilisateurs WHERE pseudo = ? AND mdp = ?";
    // On prépare la requête
    const rows = await conn.query(sql, [req.body.login, req.body.password]);
    // On ferme la connexion
    await conn.end();

    // On vérifie si on a trouvé un utilisateur + [DEBUG] console.log(rows);
    if(rows.length > 0) {
        // Si oui, on enregistre les infos de l'utilisateur dans la variable infosUtilisateur
        infosUtilisateur = {
            mail: rows[0].mail,
            pseudo: rows[0].pseudo,
        };
        // On enregistre les infos de l'utilisateur dans la session
        req.session.loggedin = true;

        // Rediriger le client vers index.html
        res.redirect('/salon');
    }else{
        // Si non, on renvoie un message d'erreur
        res.send("Erreur, mauvais identifiants !");
    }

    // [DEBUG] On récupère les données du formulaire
    //console.log("Login : " + req.body.login + "\n Password : " + req.body.password);

});



/**
 * Fonction qui va générer une couleur aléatoire pour chaque utilisateur
 */
function generateColor() {
    return "#" + (Math.floor(Math.random() * 0xFFFFFF)).toString(16);
}

/**
 * Lancement du gestionnaire d'événements, qui va gérer notre Socket
 */
io.on('connection', (socket) => {
    // Si le pseudo n'est pas défini alors on retourne nul sinon LOG DE CONNEXION
    socket.pseudo = "<b style=\"color:" + generateColor() + "\">" + infosUtilisateur.pseudo + "</b>";
    const pseudoLog = infosUtilisateur.pseudo;

    // LOG : On envoie un message de bienvenue à l'utilisateur
    console.log(`${pseudoLog} vient de se connecter à ${new Date()}`);

    // Récupération de la liste des utilisateurs (Sockets) connectés
    io.fetchSockets().then((room) => {

        // On crée un premier utilisateur nommé salon, retournant l'id salon a chaque fois
        let userConnecter = [{id_users: 'general', pseudo_client: 'Salon'}];

        // On va donc ajouter à chaque connexion les utilisateurs dans le tableau
        room.forEach((item) => {
            userConnecter.push({
                id_users: item.id, pseudo_client: item.pseudo
            });
            // console.log(userConnecter) // DEBUG : Affiche la liste des utilisateurs connectés
        });
        io.emit('get-pseudo', userConnecter);
    });


    /*
     Socket pour l'émission/reception des messages et socket id - SERVER.js
    */
    socket.on('emission_message', (message, id) => {

        // LOG DE MESSAGES
        console.log(pseudoLog + " à écrit : " + message + " à " + new Date().getHours() + ":" + new Date().getUTCMinutes() + " émetteur : " + socket.id + " destinataire : " + id);

        const laDate = new Date();

        // Mis en format JSON
        let unMessage = {
            emet_id: socket.id,
            dest_ID: id,
            pseudo: socket.pseudo,
            msg: message,
            date: laDate.toLocaleDateString() + ' - ' + laDate.toLocaleTimeString(),
            recu: false
        };

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

        // On récupère le pseudo de l'utilisateur qui se déconnecte
        socket._onclose( pseudoDisconnected = pseudoLog);

        // Affichage de la personne qui se déconnecte
        console.log(pseudoDisconnected + " viens de ce déconnecter à " + new Date ());

        // PERMET D'AFFICHER LES PERSONNES CONNECTÉS EN LOG
        /* console.log("Personnes Connecté(e)s : "); sockets.forEach(element => console.log(element.nickname));  */

        // Récupération de la liste des utilisateurs (Sockets) connectés
        io.fetchSockets().then((room) => {
            // On crée un premier utilisateur nommé salon, retournant l'id 'general' a chaque fois
            let userConnecter = [{id_users: 'general', pseudo_client: 'Salon'}];

            // À chaque déconnexion les utilisateurs dans le tableau
            room.forEach((item) => {
                userConnecter.push({
                    id_users: item.id, pseudo_client: socket.pseudo
                });
            });
            io.emit('get-pseudo', userConnecter);
        });
    });
});