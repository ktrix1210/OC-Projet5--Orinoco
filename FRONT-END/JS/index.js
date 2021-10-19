//tableau (ressources)
const teddies = [
    {
      "colors": ["Tan", "Chocolate", "Black", "White"],
      "_id": "5be9c8541c9d440000665243",
      "name": "Norbert",
      "price": 2900,
      "imageUrl": "teddy_1.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Pale brown",
        "Dark brown",
        "White"
      ],
      "_id": "5beaa8bf1c9d440000a57d94",
      "name": "Arnold",
      "price": 3900,
      "imageUrl": "teddy_2.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      "colors": [
        "Brown"
      ],
      "_id": "5beaaa8f1c9d440000a57d95",
      "name": "Lenny and Carl",
      "price": 5900,
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "imageUrl": "teddy_3.jpg"
    },
    {
      "colors": [
        "Brown",
        "Blue",
        "Pink"
      ],
      "_id": "5beaabe91c9d440000a57d96",
      "name": "Gustav",
      "price": 4500,
      "imageUrl": "teddy_4.jpg",
      "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
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
  ];
  
  //constructeur pour l'element teddy
  class teddy {
    constructor(colors, _id, name, price, description, imageUrl) 
    {
        this.colors = colors;
        this._id = _id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}

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
              <p class="teddy_price"> ${teddy.price}</p>
          </div>
          </footer>
        </a> 
        `
    // insére l'enfant cardTeddy dans l'element recuperer par cardTeddys
    cardTeddys.appendChild(cardTeddy);
    }

} 

addCardTeddy(teddies);