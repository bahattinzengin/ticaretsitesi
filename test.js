
const url = 'https://jsonplaceholder.typicode.com/users';


// fetch: api lere istek atmamızı sağlar

fetch(url)

// olumlu cevap gelirse çalışır
.then ((response) => {
    // gelen json verisini js de kullanılabilir hale getirir.
    return response.json();
})
// veri işlendikten sonra çalışır

.then ((data)=>{

})

// olumsuz cevap gelirse çalışır

.catch((error)=>{



})





// ...   spread operatörüdür
// bir objenin veya dizinin sahip olduğu değerleri
// farklı bir objeye veya diziye aktarır

const arac={
    type:"elektric",
    wheel:4,
}


const tesla ={
    ...arac,
    wheel:2,
    marka:"tesla",
}

console.log(tesla)
