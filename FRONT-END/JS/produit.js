  //recupération des donnés de la carte cliqué
  let searchParams = (new URL(document.location)).searchParams;

  //récupération par ID
  const id = searchParams.get("id")

  //fonction de création de la carte du produit selectionné
  function addProductCard(teddy) {
      //récupération de l'emplacement de stokage
      let productCard = document.getElementsByClassName('teddyId')[0];
      productCard.innerHTML = `
        <img src= ${teddy.imageUrl}  alt="TeddiesPictures" class="teddy_img">
        <p> ${teddy.price / 100} €</p>
        <div class="product_description">
          <h3> ${teddy.name}</h3>
          <h3> ${teddy._id}</h3>
          <p> ${teddy.description}</p>
        </div>
        <footer class="product_choice">
          <form class="formTeddys">
              <h4>couleur</h4>
              <select name="couleur" class="colorTeddy">
                <option hidden disabled selected>choisissez une couleur</option>
              </select>
          </form>
          <form class="formTeddys">
              <h4>quantitée</h4>
              <select name="nombre" class="qantityTeddy">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
              </select>
          </form>
        </footer>
        <button type="submit" class= "panier" id="panier" value="submit">ajouter au panier</button>
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
    const addProductBasket = teddy=> {
      teddy.quantity = parseInt(document.getElementsByClassName('qantityTeddy')[0].value);
      teddy.teddyColor = document.getElementsByClassName('colorTeddy')[0].value;
      if (teddy.teddyColor == "choisissez une couleur") return;
      //recuperer le panier//rappel let variable = condition ?(ternaire) "valeur si vrais" / "valeur si faux"
      let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

      //récursive pour parcourir le panier
      let teddyExistInIndex = false;
      for (let i= 0; i < panier.length; i++) {
        let product = panier[i];
        //condition si le produit existe
        if (product._id == teddy._id && product.teddyColor == teddy.teddyColor ) {
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
    
    //transformation des données en chaine de caractére et sauvegarde dans le localStorage
      localStorage.setItem('panier', JSON.stringify(panier));
      window.location.href = "./panier.html"
  };

  //stockage avec Fetch

  fetch("http://localhost:3000/api/teddies/" + id)
    .then(response => response.json())
    .then(function (product) {
      addProductCard(product);
    })
    .catch(function(err) {
      console.log("fetch erreur" , err)
    });
