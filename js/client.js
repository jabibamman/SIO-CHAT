const socket = io();
var lesMessages = []; // Tableau qui va contenir l'ensemble des messages envoyés (semi-persistance)


// Sélection pseudo
socket.emit('set-pseudo', prompt("Pseudo ?"));

// Variables pour récupérer les éléments HTML
const messages = document.getElementById('messages'); // la liste messages
const users = document.getElementById('users'); // la liste users connecté

const form = document.getElementById('form');
const input = document.getElementById('input');

// Écouteur et envoi du message du formulaire
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (input.value !== '') {
        socket.emit('emission_message', input.value, id_salon);

        input.value = ''; // Supprimer l'ancienne valeur pour réécrire un message
    }

});

// Réception et affichage du message - CLIENT.js
socket.on('reception_message', (message) => {
    console.log("Dest id : " + message.dest_ID + " ID salon : " + id_salon + " emetteur id : "+message.emet_id + "socket id"  + socket.id);

    if (message.dest_ID == id_salon) {
        var li = document.createElement("LI");
        li.innerHTML = message.pseudo + " : " + message.msg;
        messages.appendChild(li);
    }

    lesMessages.push({
        pseudo: message.pseudo,
        message: message.msg,
        dest_ID: message.dest_ID
    });
    window.scrollTo(0, document.body.scrollHeight); // Permet de scroller automatiquement
});

socket.on('get-pseudo', (userConnecter) => {
    users.innerHTML = "";

    var salon_li = document.createElement("li");
    var salon_a = document.createElement("a");


    // On met un id à salon ce qui donnera <li id="salon">Salon</li>
    salon_li.setAttribute("id", id_salon);

    // <li><a> Exemple de l'appendChild utilisé</a></li>
    users.appendChild(salon_li).appendChild(salon_a);

    // BOUCLE POUR CHAQUE PERMET DE CRÉER LE LI ET D'IMPLÉMENTER AUTOMATIQUEMENT UTILISATEURS CONNECTÉS ET DÉCONNECTÉS
    userConnecter.forEach((element) => {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";

        a.setAttribute("onclick", "salon('"+element.id_users+"')");

        console.log("Salon :", id_salon);

        // Permet d'afficehr les utilisateurs co et de ne pas s'afficher sois même, j'ai mis a.innerHTML pour que les utilisateurs soient bien clicquable
        a.innerHTML = (socket.id !== element.id_users ? element.pseudo_client: null);
        //Fonctionne
        users.appendChild(li).appendChild(a);

    });

});

var id_salon = 'general'; //variable qui va définir un destinataire, par défaut le salon général

// Affichage des messages en fonction du choix de l'utilisateur :
// - Soit les messages du salon général,
// - Soit les messages d'une conversation privée avec un autre utilisateur
function salon(id) {
    id_salon = id;
    messages.innerHTML = "";

    lesMessages.forEach((contenu) => {
        console.log("Ctn message : "+contenu.dest_ID + ", salon : " + id_salon);


        if(contenu.dest_ID === id_salon){
            var li = document.createElement("LI");
            li.innerHTML = contenu.pseudo + " : " + contenu.message;
            messages.appendChild(li);
        }
    })
}

// Vérifie les messages non-lus, puis affiche un badge de notification
// incrémentée à coté de l'utilisateur en question

function check_unread() {

}


