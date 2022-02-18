const socket = io();

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

/* Ici je souhaite mettre en place la semi persistance mais le soucis étant que je n'y arrive pas (revoir mon code client du socket)
* - Le tableau de tout les messages est bien reçu par le client lors de la connection, le soucis est l'affichage
*/

// TEST
// socket.on('allMsg', (allMsg) => {
//     console.log(allMsg);
//     var li = document.createElement("LI");
//
//
//     allMsg.forEach((element) => {
//         li.innerHTML = "";
//         // console.log(element.msg.pseudo);
//         li.innerHTML = element.pseudo + " : " + element.msg;
//
//         messages.appendChild(li);
//     })
// });

// Réception et affichage du message - CLIENT.js
socket.on('reception_message', (message) => {
    messages.innerHTML = "";


    lesMessages.push(message);


    lesMessages.forEach((element) => {
        var li = document.createElement("LI");
        li.innerHTML = element.message.pseudo + " : " + element.message.msg;
        messages.appendChild(li);


    })




    console.log(lesMessages);

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
        //a.setAttribute('onclick', e);

        console.log("Salon :", id_salon);

        // Permet d'afficehr les utilisateurs co et de ne pas s'afficher sois même, j'ai mis a.innerHTML pour que les utilisateurs soient bien clicquable
        a.innerHTML = (socket.id !== element.id_users ? element.pseudo_client: null);

        //Fonctionne
        users.appendChild(li).appendChild(a);

    });



});

var id_salon = 'general'; //variable qui va définir un destinataire, par défaut le salon général
var lesMessages = []; // Tableau qui va contenir l'ensemble des messages envoyés (semi-persistance)

// Affichage des messages en fonction du choix de l'utilisateur :
// - Soit les messages du salon général,
// - Soit les messages d'une conversation privée avec un autre utilisateur
function salon(id) {
    id_salon = id;
    messages.innerHTML = "";

    lesMessages.forEach((contenu) => {
        //console.log(lesMessages.message.dest_ID); // Probleme avec le dest ID
        if(contenu.dest_ID == id_salon){
            var li = document.createElement("LI");
            li.innerHTML = contenu.pseudo + " : " + contenu.msg;
        }
    })
}

// Vérifie les messages non-lus, puis affiche un badge de notification
// incrémentée à coté de l'utilisateur en question

function check_unread() {

}



