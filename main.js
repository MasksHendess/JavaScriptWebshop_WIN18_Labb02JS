var product1 = {Name:"Deku Seeds", amount: 0 , color:"Blue", Size:"Small", Price: 10, img: "a.jpg"};
var product2 = {Name:"Bombs", amount: 0 , color:"Blue", Size:"Small", Price: 20, img: "Bomb.png"};
var product3 = {Name:"Deku Shield", amount: 0 , color:"Brown", Size:"Medium", Price: 40, img: "Deku_Shield.png"};
var product4 = {Name:"Arrows", amount: 0 , color:"Metal", Size:"Small", Price: 10, img: "Arrows.jpg"};
var product5 = {Name:"Big Goron Sword", amount: 0 , color:"Metal", Size:"Big", Price: 999, img: "B_BiggoronsSword.gif"};
var product6 = {Name:"Hyrule Shield", amount: 0 , color:"Blue", Size:"Small", Price: 80, img: "HuryleShield.jpg"};
var product7 = {Name:"Magic Potion", amount: 0 , color:"Green", Size:"Small", Price: 30, img: "Green_Potion_(Majora's_Mask).png"};
var product8 = {Name:"Healing Potion", amount: 0 , color:"Red", Size:"Small", Price: 40, img: "Heal.jpg"};
var product9 = {Name:"Hero Bow", amount: 0 , color:"Blue", Size:"Medium", Price: 500, img: "HeroBow.png"};
var product10 = {Name:"Hook Shoot", amount: 0 , color:"Blue", Size:"Medium", Price: 800, img: "Scrubshoot.jpg"};
var products = [product1, product2, product3, product4, product5, product6, product7, product8, product9, product10];
var SoldProducts = [];
var cart;
function ObjectThing()
{
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key))
}
}

function PlayMusic()
{
 var audio = new Audio("audio_file.mp3");
 //document.getElementById('a').play();
 audio.volume = 0.080;
 
 audio.play();

}

function LoadProducts()
{
    var DisplayedText="";
    console.log(products);
    products.forEach(element => {
        DisplayedText = DisplayedText +"<div id=\"griditem\"><h4>" + element.Name +"</h4><img src=\""+ element.img+"\"><br>"+element.Price+"\$ per item<br><button onclick=\"Buy('"+element.Name+"')\">Add to Cart</button></div>";
    
    });
document.getElementById("products").innerHTML= DisplayedText;
}

function Buy(productname)
{
    var SoldProduct;


    products.forEach(element => {
       if(element.Name == productname) 
       {
        SoldProduct = element;
        console.log("Buying " +SoldProduct.Name);
       }
    });
    SoldProduct.color = prompt("Which Color do you want:");
    SoldProduct.amount = prompt("How many you want");

    var StoredProducts = localStorage.getObj("SoldItems");
 if("SoldItems" in localStorage){
    console.log( StoredProducts);
    StoredProducts.push(SoldProduct);
    console.log( StoredProducts);
    localStorage.setObj("SoldItems", StoredProducts);
} else {
   var StoredProducts = [];
   StoredProducts.push(SoldProduct);
   localStorage.setObj("SoldItems", StoredProducts);
}
 
 //SoldProduct = element;

  localStorage.Size =  SoldProduct.Size; 
}  



function Checkout(id)
{
    switch(id)
    {
        case 1:
        window.location.href = 'sida1.html';
        break;

        case 2:
        window.location.href = 'sida2.html';
        break;

        case 3:
        window.location.href = 'sida3.html';
        break;
        case 4:
        alert("Thank You for your purchase!")
        localStorage.clear();
        window.location.href = 'sida1.html';
        break;
    }
}
function GetItemsFromLocalStorage()
{
    var storedNames = localStorage.getObj("SoldItems")
  console.log( storedNames);
 
    WriteProducts(storedNames);
 
}

function WriteProducts(storedNames)
{
    var Text="";
    var id = 1;
    storedNames.forEach(element => {
        Text = Text + "Product: "+ element.Name +"\tAmount: " + element.amount + "\tColor: " + element.color +
                      "\tSize: "+ element.Size +"\tPrice: " +element.amount * element.Price +
                      "$ <button onclick=\"Changeamount('-', '"+element.Name+"','"+element.color+"')\">-</button><button onclick=\"Changeamount('+', '"+element.Name+"','"+element.color+"')\">+</button>"+
                      "<button onclick=\"DeleteItem('"+element.Name+"')\">Delete Item</button> <br>";
    });
    
    document.getElementById("Products").innerHTML=Text;
}

function WriteProductsNoButton()
{
    var storedNames = localStorage.getObj("SoldItems")
    var Text="";
    storedNames.forEach(element => {
    Text = Text + "Product: "+ element.Name +"\tAmount: " + element.amount + "\tColor: " + element.color +
        "\tSize: "+ element.Size +"\tPrice: " +element.amount * element.Price +"$<br>";
});
    
    document.getElementById("Products").innerHTML= Text;
}

function DeleteItem(ProductName)
{
    
    console.log(ProductName);
        var Products = localStorage.getObj("SoldItems");
       
        Products = Products.filter(function(returnableObjects){
                return returnableObjects.Name != ProductName; // Mobba ut ProductName han suger!
        });
        
        localStorage.setObj("SoldItems", Products);
        UpdateCart(Products);
      
      //  Products = localStorage.getObj("SoldItems");
        
}

function UpdateCart(Products)
{
    WriteProducts(Products)
    GetMoms();
    GetShipment(localStorage.Size);
    GetTotal();
}

function Changeamount(operator, Name, color)
{ 
    console.log(color);
    var Products = localStorage.getObj("SoldItems");
    var SoldProduct;
    var SoldProducts = [];
    Products.forEach(element => {
        if(element.Name == Name && element.color == color)
        {
            if(operator == '-')
            {
            element.amount = Number(element.amount) - Number(1);
            console.log(element.amount);
            }else if (operator == '+')
            {
                element.amount = Number(element.amount) + Number(1);
            console.log(element.amount);
            }
        }
        
    SoldProduct = element;
    SoldProducts.push(SoldProduct);
    localStorage.setObj("SoldItems", SoldProducts);
    });
    UpdateCart(SoldProducts);
}

function GetMoms()
{
    var Products = localStorage.getObj("SoldItems");
    var totalPrice = 0;
    Products.forEach(element => {
       totalPrice = totalPrice + ( Number(element.Price) * Number(element.amount));
    });
    var moms = Number(totalPrice) * Number(1.25);
    console.log("Moms:" + moms);
    document.getElementById("moms").innerHTML="Moms:" + moms +"\$";
}

var shipment;
function GetShipment(size)
{ 
switch(size)
 {
    case"Small":
    shipment = 100; 
    break;
    case"Medium":
    shipment = 200;
    break;
    case"Big":
    shipment = 300;
    break;
    case "default":
    shipment =  50;
    break;
}
console.log("Shipment: "+shipment);
document.getElementById("shipment").innerHTML="Shipment Cost:" + shipment +"\$";
}

function GetTotal()
{
     var Products = localStorage.getObj("SoldItems");
    var totalPrice = 0;
    Products.forEach(element => {
       totalPrice = totalPrice + ( Number(element.Price) * Number(element.amount));
    });
    totalPrice = totalPrice + shipment;
    document.getElementById("total").innerHTML="Total:" + totalPrice +"\$";
}