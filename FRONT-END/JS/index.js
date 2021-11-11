//fonction de création de carte a partir du tableau
function addCardTeddy(teddies) {
    console.log(teddies);
    for (let teddy of teddies) {
      
        //recuperation de l'emplacement de stokage
        const cardTeddys = document.getElementsByClassName('teddys')[0];
        //creation de l'element teddy
        console.log(cardTeddys);
        let cardTeddy = document.createElement("div")
        // insertion de l'innerHTML
        cardTeddy.innerHTML = `
        <a class="card" href="pages/produit.html?id=${teddy._id}">
          <img src= ${teddy.imageUrl} alt="TeddiesPictures" class="teddys_img">
          <footer class="teddy_footer">
            <div class="teddy_content">
              <h3 class="teddy_title"> ${teddy.name}</h3>
              <p class="teddy_color"> ${teddy.colors.join(', ')}</p>
              <p class="teddy_description"> ${teddy.description}</p>
            </div>
          <div class="price">
              <p class="teddy_price"> ${teddy.price /100} €</p>
          </div>
          </footer>
        </a> 
        `
    // insére l'enfant cardTeddy dans l'element recuperer par cardTeddys
    cardTeddys.appendChild(cardTeddy);
    }
}

//appel API avec fetch
fetch("http://localhost:3000/api/teddies")
    .then((response) => response.json())
    .then((teddies) => {
      addCardTeddy(teddies);
    })
    .catch((erreur) => console.log("erreur : " + erreur));