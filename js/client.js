// Création du socket
const socket = io();

// Sélection du pseudo
socket.emit('set-pseudo', prompt("Pseudo ?"));

// Variables pour récupérer les éléments HTML
const messages = document.getElementById('messages'); // la liste messages
const users = document.getElementById('users'); // la liste users connecté

const form = document.getElementById('form');
const input = document.getElementById('input');

/*
 Écouteur et envoi du message du formulaire
*/
form.addEventListener('submit', (e) => {
    // Cette utilisation de preventDefault() sert à éviter de recharger la page a chaque envoie de message
    e.preventDefault();

    // Ça veut dire qu'un client ne peut pas envoyer de message vide…
    if (input.value !== '') {
        socket.emit('emission_message', input.value, id_salon);

        input.value = ''; // Supprimer l'ancienne valeur pour réécrire un message
    }

});

/*
 Réception et affichage du message - CLIENT.js
*/
socket.on('reception_message', (message) => {
    // On crée le tableau qui recense tout les messages
    lesMessages.push({
        pseudo: message.pseudo,
        message: message.msg,
        dest_ID: message.dest_ID,
        emet_id: message.emet_id,
        recu: message.recu
    });

    salon(id_salon); // On gère l'affichage pour que les bonnes personnes reçoivent les messages qui leurs sont destinés
    check_unread(); // Affichage des badges de notifications

    window.scrollTo(0, document.body.scrollHeight); // Permet de scroller automatiquement
});

socket.on('get-pseudo', (userConnecter) => {
    users.innerHTML = "";

    var salon_li = document.createElement("li");
    var salon_a = document.createElement("a");


    // On met un id à salon ce qui donnera <li id="salon">Salon</li>
    salon_li.setAttribute("id", id_salon);

    // <li><a>Exemple de l'appendChild utilisé</a></li>
    users.appendChild(salon_li).appendChild(salon_a);

    // BOUCLE POUR CHAQUE PERMET DE CRÉER LE LI ET D'IMPLÉMENTER AUTOMATIQUEMENT UTILISATEURS CONNECTÉS ET DÉCONNECTÉS
    userConnecter.forEach((element) => {
        var li = document.createElement("li");
        var a = document.createElement("a");

        var notif = document.createElement("span");



        a.href = "#";

        a.setAttribute("onclick", "salon('" + element.id_users + "')");

        notif.setAttribute("id", element.id_users);
        notif.setAttribute("class", "badge badge-light")



        // console.log("Salon :", id_salon); // DEBUG MODE

        // Permet d'afficher les utilisateurs connecté et de ne pas s'afficher sois même, j'ai mis a.innerHTML pour que les utilisateurs soient bien clicquable
        a.innerHTML = (socket.id !== element.id_users ? element.pseudo_client : null);

        // Même principe qu'à la ligne 60"
        users.appendChild(li).appendChild(a).appendChild(notif);

    });

});

var id_salon = 'general'; // Variable qui va définir un destinataire, par défaut le salon général
var lesMessages = []; // Tableau qui va contenir l'ensemble des messages envoyés (semi-persistance)

/**
 * Affichage des messages en fonction du choix de l'utilisateur :
 * @param {string} id - L'id du salon choisis.
 * - Soit les messages du salon général,
 * - Soit les messages d'une conversation privée avec un autre utilisateur
 */
function salon(id) {
    id_salon = id;
    messages.innerHTML = "";

    lesMessages.forEach((contenu) => {
        //console.log("destinataire : " + contenu.dest_ID + ", salon : " + id_salon); // DEBUG MODE
        // On coupe la condition en deux, la première partie est pour le salon général et la deuxième pour les messages privés
        if (contenu.dest_ID === id_salon || contenu.emet_id === id_salon && contenu.dest_ID !== "general") {
            var li = document.createElement("LI");
            li.innerHTML = contenu.pseudo + " : " + contenu.message;
            messages.appendChild(li);
            contenu.recu = true;
        }
    })

    if (id_salon !== 'general') {
        document.getElementById(id_salon).innerHTML="";
    }
}

/**
 * Vérifie les messages non-lus, puis affiche un badge de notification
 * incrémentée à coté de l'utilisateur en question
 */
function check_unread() {
    // Tableau pour le compteur de messages de chaque utilisateur (via son ID)
    var compteurs = [];
    for(const contenu of lesMessages) {
        if(contenu.dest_ID !== 'general' && contenu.recu === false) {
            // Si l'entrée n'existe pas, on la crée
            if(compteurs[contenu.dest_ID] === undefined) {
                compteurs[contenu.dest_ID] = 0;
            }
            // Incrémentation du compteur, et écriture dans le badge
            compteurs[contenu.dest_ID]++;
            document.getElementById(contenu.emet_id).innerHTML=compteurs[contenu.dest_ID]
        }
    }
}

/**
 * Déconnecte l'utilisateurs lorsqu'il appuie sur se déconnecter
 * Si il appuie sur ok, son socket sera déconnecté
 */
function disconnect () {
    var result = confirm("Vous voulez déconnecter ?");

    if (result) {
        alert("Vous êtes déconnecté, reconnectez vous en rechargeant la page");
        socket.disconnect();
    } else {
        alert("Vous êtes toujours connecté");
    }

}


