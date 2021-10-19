//récupération des donnés stocker dans le Local Storage en ternaire
let teddies = JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) :  [];

//récupération de l'emplacement de stockage(tableau)
let container = document.getElementById('container');

//récupétation de l'ID du produit
let addIdBasket = [];

//boucle sur l'implémentation des éléments dans le panier
teddies.forEach((camera, i) => {
    container.innerHTML += `
    <tr>
        <td><img src=${teddy.imageUrl} alt="" /></td>
        <td>${teddy.name}</td>
        <td>${teddy.price / 100} €</td>
        <td>${teddy.quantity}</td>
        <td><a href="#" class="deleteCamera" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
        <td >${teddy.quantity * teddy.price / 100} €</td>
    </tr>
    `

    // boucle pour ajouter le produit suivant
    for (let i=0; i < teddy.quantity; i++){
        addIdBasket.push(teddy._id);
    }
});