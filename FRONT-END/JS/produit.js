const teddy = {
    "colors": [
      "Beige",
      "Tan",
      "Chocolate"
    ],
    "_id": "5beaacd41c9d440000a57d97",
    "name": "Garfunkel",
    "price": 5500,
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "imageUrl": "teddy_5.jpg"
  }

  //fonction de création de la carte du produit selectionné
  function addProductCard(teddy) {
      //récupération de l'emplacement de stokage
      let productCard = document.getElementsByClassName('teddyId')[0];
      productCard.innerHTML = `
        <img src= ${teddy.imageUrl}  alt="TeddiesPictures" class="teddy_img">
        <p> ${teddy.price}</p>
        <div class="product_description">
          <h3> ${teddy.name}</h3>
          <h3> ${teddy._id}</h3>
          <p ${teddy.description}</p>
        </div>
        <footer class="product_choice">
          <form class="formTeddys">
              <h4>couleur</h4>
              <select name="couleur" class="colorTeddy">
              </select>
          </form>
          <form class="formTeddys">
              <h4>quantitée</h4>
              <select name="nombre" class="qantityTeddy">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </select>
          </form>
        </footer>
        <a href="../pages/panier.html"><button type="submit" class= "panier" id="panier" value="submit">ajouter au panier</button></a>
      `
    // choix des options
      for (color of teddy.colors) {
        let colorChoice = document.getElementsByClassName('colorTeddy')[0];
        let teddyColor = document.createElement("option")
        teddyColor.innerText = color;
        colorChoice.appendChild(teddyColor);
}
    // écouter l'évenement clic sur le bouton
    document.getElementById('panier').addEventListener('click', function () {
      addProductBasket(teddy)
    });
  }
    //fonction d'ajout au panier
    const addProductBasket = teddy=> {teddy.quantity = parseInt(document.getElementsByClassName('colorTeddy')[0].value);
    
    //recuperer le panier//rappel let variable = condition ?(ternaire) "valeur si vrais" / "valeur si faux"
    let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

    //récursive pour parcourir le panier
    let teddyExistInIndex = false;
    for (let i= 0; i < panier.length; i++) {
      let product = panier[i];
      //condition si le produit existe
      if (product._id == teddy._id) {
        teddyExistInIndex = i;
      }
    }

    //verification que l'ourson est dans le panier
    if(false !== teddyExistInIndex) {
      panier[teddyExistInIndex].quantity = parseInt(panier[teddyExistInIndex].quantity) + teddy.quantity;
    }
    else {
      panier.push(teddy);
    };
    addLocalStorage(panier)
  };

  //stockage avec Fetch
  //fetch("http:localhost:3000/api/teddies/" + id)
    //.then(response => response.json())
    //.then (function (product) {
      //let teddy = new teddy(product)
      //display(teddy);
    //})
  
    addProductCard(teddy);
    addProductBasket(teddy);
