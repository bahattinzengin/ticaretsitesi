
// html den gelenler

const categoryList = document.querySelector('.categories');

const productList = document.querySelector('.products');

const modal = document.querySelector('.modal-wrapper');

const closeBtn = document.querySelector('#close-btn');

const basketBtn = document.querySelector('#basket-btn');

const basketList = document.querySelector('#list');

const totalInfo =document.querySelector ('#total');



// html in yüklenme anını izler

document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchProduct();
});



/*

-kategori biligilerini al
1-api ye istek at
2-gelen veriyi işle
3-gelen verileri ekrana basacak fonksiyon çalıştır
4-hata oluşursa kullnıcıyı bilgilendir


*/
const baseUrl = 'https://fakestoreapi.com';
function fetchCategories() {
    fetch(`${baseUrl}/products/categories`)
        .then((response) => response.json())
        .then(renderCategories) // then çalıştırdıgı fonksiyon verileri parametre olarak gönderir
        .catch((err) => alert("veri alınırken hata oldu"))

}

// her bir kategori için ekrana kart oluşturur

function renderCategories(categories) {


    categories.forEach((category) => {

        // 1-div oluştur

        const categoryDiv = document.createElement('div');
        // 2-dive class ekle
        categoryDiv.classList.add("category");
        // 3-içeriğini belirleme
        const randomNum = Math.round(Math.random() * 1000);

        categoryDiv.innerHTML = `
<img src="https://picsum.photos/300/300?r= ${randomNum} " alt="">
<h2>${category}</h2>
`;

        // 4- html gönderme

        categoryList.appendChild(categoryDiv);



    })
}


// data değişkenini global scope da tanımladık.Bu sayde bütün fonksiyonlar bu değere ulasabilecek
let data;
// ürünler verisini çeken fonksiyon

async function fetchProduct() {
    try {
        // api ye istek at

        const response = await fetch(`${baseUrl}/products`);

        // gelen cevabı işle

        data = await response.json();

        // ekrana bas
        renderProducts(data)

    }
    catch (err) {
        alert("Ürünleri alırken hata oluştu")


    }
}


// ürünleri ekrana bas

function renderProducts(products) {

    // herbir ürün için bir ürün kartı oluşturma

    const cardsHTML = products.map((product) => `

    <div class="card">
    <div class"img-wrapper">
    <img src=" ${product.image} " alt="">
    </div>
    <h4>${product.title}</h4>
    <h4>${product.category}</h4>
    <div class="info">
        <span>${product.price}</span>
        <button onclick="addToBasket(${product.id})">Sepete ekle</button>
    </div>
</div>

    `)
        .join(' ');

    // hazırladığımız html ekrana basma

    productList.innerHTML = cardsHTML;

}


//  sepet işlemleri

let basket = [];
let total = 0;

// modal ı açar

basketBtn.addEventListener('click', () => {
    modal.classList.add('active');
    renderBasket();
    calculateTotal();
});

// çarpıya veya dışarıya tıklayınca modulu kapat


document.addEventListener('click', (e) => {
    if
        (e.target.classList.contains('modal-wrapper') || e.target.id === 'close-btn')
        modal.classList.remove('active');
});

function addToBasket(id) {
    // id den yola çıkarak objenin değerlerini bulma
    const product = data .find((i)=> i.id===id);
// sepete  daha önce ürün eklendiyse arayıp bulma

  const found =basket.find((i) => i.id==id);

  if(found){
    // mmiktarını artır
    found.amount++;
  } else 
  {
    
    // sepete ürünü ekler

 basket.push({...product , amount:1 });

  }
//   bildirim çalışması

Toastify({
    text: "ürün sepete eklendi",
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  
  }).showToast();



}

// spete elemanları listele

function renderBasket (){
   basketList.innerHTML=basket.
   map(
        (item)=>
        `  <div class="item">
        <img src="${item.image}">
        <h3 class="title"> ${item.title.slice(0 , 20) + '...'} </h3>
        <h4 class="price">$${item.price} </h4>
        <p>Miktar :${item.amount}</p>
        <img onclick="handleDelete(${item.id})" id="delete-img" src="image/delete.png" alt="">
    </div>
        `
    )
    . join(' ');


}


// toplam ürün sayı vefiyatlarını hesaplar

function calculateTotal() {
    // reduce   diziyi tarar elemanların belirlediğimiz değerlerini matematiksel işlem yapar
    
    const total=basket.reduce((sum,i)=> sum+i.price*i.amount, 0);

    // toplam miktar hesaplama

    const amount = basket.reduce((sum,i) => sum +i.amount ,0);


// hesapladığımız bilgileri ekrana yazdırma
    totalInfo.innerHTML=
    `
    <span id="count"> ${amount} ürün </span>
    toplam
    <span id="price"> ${total.toFixed(2)} </span>$
    `
}


// elemanı siler

function handleDelete(deleteId) {
// kaldırılacak ürünü diziden çıkarma

const newArray= basket.filter((i) =>i.id!==deleteId );

basket=newArray;

// listeyi günceller
renderBasket();
// toplamı güncelle

calculateTotal();




}

