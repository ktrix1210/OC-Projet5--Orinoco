// récuperation des données du Panier
let searchparams = new URL(window.location).searchParams;

let orderId = searchparams.get("orderId");

//recuperation des donnees client
const contact = JSON.parse(localStorage.getItem("contact"));

//récuperation du prix total
const prixTotal = JSON.parse(localStorage.getItem("total")); 

//recupération de l'emplacement de stokage:
let message_confirmation = document.getElementById("message_confirmation");

//Message de confirmation
function orderRecipe() {
    message_confirmation.innerHTML += `
    <p>${contact.lastName} ${contact.firstName}, Orinoursons vous remercie pour votre commander ${orderId} d'un montant de ${prixTotal}€, vous retrouverez toutes ces informations sur l'adresse mail : ${contact.email}. Merci !</p>
    `
}

orderRecipe();