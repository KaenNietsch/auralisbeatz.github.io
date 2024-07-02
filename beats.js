let products = null;
let currentMusic = null; // Şu anda çalan müzik için global değişken
let currentPlayBtn = null; // Şu anda aktif olan play butonu

// JSON dosyasından verileri al
const initApp=()=>{
    fetch('products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
    });
}
initApp();
function addDataToHTML() {
    let listProductHTML = document.querySelector('.listProduct');

    // HTML'deki mevcut ürünleri temizle
    listProductHTML.innerHTML = '';

    // Verileri ekleyin
    if (products != null) {
        products.forEach(product => {
            let newProduct = document.createElement('a');
            //newProduct.href = '/detail.html?id=' + product.id;
            newProduct.classList.add('item');
            newProduct.innerHTML = `
                <div class="item-content">
                    <div class="cover-container">
                        <img src="${product.image}" alt=""> <!-- product.image -->
                        <i class="play-button" title="Play" data-sound="${product.sound}">▶</i> <!-- Play button -->
                    </div>
                    <h2 data-id="${product.id}">${product.name}</h2> <!-- product.name -->
                    <h2 class="prop">${' ' + product.key + ' ' + product.bpm + 'BPM'}</h2>
                    <div class="price">$${product.price}</div>
                    <div class="process">
                        <button class="purchase">Purchase</button> <!-- purchase -->
                        <button class="add">Add To Cart</button> <!-- add to cart -->
                    </div>
                    <div class="desc">${product.desc}</div>
                </div>
            `;

            let h2Element = newProduct.querySelector('h2');
            h2Element.addEventListener('click', function() {
                window.location.href = '/product.html?id=' + product.id;
            });
            h2Element.style.cursor = 'pointer';


            // Ürün üzerine hover olduğunda arka plan resmini değiştirme
            newProduct.addEventListener('mouseenter', function() {
                newProduct.style.transition = 'background-image 1s';
                newProduct.style.backgroundImage = `url("${product.bg}")`;

                newProduct.querySelector('h2').style.backgroundColor = '#ff6347';
                newProduct.querySelector('h2').style.borderRadius = '5px';
            });

            newProduct.addEventListener('mouseleave', function() {
                newProduct.style.transition = 'background-image 0.5s';
                newProduct.style.backgroundImage = 'none';
                newProduct.querySelector('h2').style.transition = 'background-color 1s';
                newProduct.querySelector('h2').style.backgroundColor = 'transparent';
            });

            listProductHTML.appendChild(newProduct);

            // Player kodları
            const playBtn = newProduct.querySelector('.play-button');
            const music = new Audio(product.sound);

            function togglePlay() {
                if (currentMusic && currentMusic !== music) {
                    currentMusic.pause();
                    currentMusic.currentTime = 0; // Çalan müziği durdur ve başa sar
                    currentPlayBtn.textContent = '▶'; // Önceki buton simgesini değiştir
                    currentPlayBtn.setAttribute('title', 'Play');
                }

                if (music.paused) {
                    playMusic(music, playBtn);
                } else {
                    pauseMusic(music, playBtn);
                }
            }

            function playMusic(music, playBtn) {
                currentMusic = music;
                currentPlayBtn = playBtn;
                music.play();
                playBtn.textContent = '❚❚'; // Pause icon
                playBtn.setAttribute('title', 'Pause');
            }

            function pauseMusic(music, playBtn) {
                music.pause();
                playBtn.textContent = '▶'; // Play icon
                playBtn.setAttribute('title', 'Play');
            }

            playBtn.addEventListener('click', togglePlay);
        });
    }
}
