//récupération des donnés stocker dans le Local Storage en ternaire
let teddies = JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) :  [];

//récupération de l'emplacement de stockage(tableau)
let container = document.getElementById('container');

//récupétation du tableau des produit
let addIdBasket = [];

//boucle sur l'implémentation des éléments dans le panier
teddies.forEach((teddy, i) => {
    container.innerHTML += `
    <tr>
        <td><img src=${teddy.imageUrl} alt="" /></td>
        <td>${teddy.name}</td>
        <td>${teddy.teddyColor}</td>
        <td>${teddy.price / 100} €</td>
        <td>${teddy.quantity}</td>
        <td><a href="#" class="deleteteddy" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
        <td>${teddy.quantity * teddy.price / 100} €</td>
    </tr>
    `

    // boucle pour ajouter le produit suivant
    for (let i=0; i < teddy.quantity; i++){
        addIdBasket.push(teddy._id);
    }
});

//fonction pour supprimer des elements 1.recup valeur ID dans tableau 2.verifie si quantité sup a 1 3.si oui décrémente 4.sinon supprime l'element avec splice
function deleteTeddy(id) {
    let teddy = teddies[id];
    if (teddy.quantity > 1) {
        teddy.quantity--;
    }
    else {
        teddies.splice(id,1);
    }
    localStorage.setItem("panier", JSON.stringify(teddies));
    window.location.reload();
}

//var d'écoute et d'execution de la fonction pour supprimer un produit du panier
document.querySelectorAll(".deleteteddy").forEach(delBnt => {
    delBnt.addEventListener('click', () => deleteTeddy(delBnt.dataset.id))
})

//fonction pour supprimer tout le panier
function deletePanier() {
    if (teddies == null) {
    }
    else {
        container.remove();
        localStorage.clear();
        window.location.reload();
    }
};

//var d'écoute et d'exectution de la fonction de suppression du panier
let viderPanier = document.getElementById('viderPanier')
viderPanier.addEventListener('click', deletePanier);

//Formulaire

//fonction de récupération des données du formulaire
    let form = document.getElementById("form");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;

    // on écoute le clic
    form.addEventListener("submit", (event) => {
        // on préprare les donnée a être postées
        let customerID = {
            'firstName': document.getElementById("nom").value,
            'lastName' : document.getElementById("prenom").value,
            'address' : document.getElementById("adresse").value,
            'city' : document.getElementById("ville").value,
            'email' : document.getElementById("email").value,
    };
    // on valide que le formulaire soit correctement rempli
    if (
        (regexName.test(customerID.firstName) == true) &
        (regexName.test(customerID.lastName) == true) &
        (regexAddress.test(customerID.address) == true) &
        (regexCity.test(customerID.city) == true) &
        (regexMail.test(customerID.email) == true)

    ) {
        event.preventDefault();

        let products = addIdBasket;

        let customerRecipe = JSON.stringify({
            contact : customerID,
            products,
        });
        
    //envois des données avec fetch POST
    fetch("https://teddies-api.herokuapp.com/api/teddies/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: customerRecipe
            })
            .then(function (response){
                return response.json()
            })
            .then(function (r){
                console.log(r);
                let total = 0;
                for (let product of r.products){
                    total = total + (product.price/100);
                }
                localStorage.setItem("total", JSON.stringify(total));
                localStorage.removeItem("panier");
                localStorage.setItem("contact", JSON.stringify(r.contact));
                window.location.assign("confirmation.html?orderId=" + r.orderId);
            })
    //si probleme avec l'Api
            .catch(function (erreur){
                console.log("fetch error");
            });
        } else {
            alert(
                "Veuillez correctement renseigner l'entièreté du formulaire pour valider votre commande."
            );
        }
    });