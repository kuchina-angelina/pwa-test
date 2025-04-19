function showQR(type) {
    const qrContainer = document.getElementById('qr-container');
    qrContainer.innerHTML = ''; // Очищаем контейнер перед добавлением нового QR-кода
    
    let qrImage = '';
    let altText = '';
    let description = ''; // Добавляем переменную для текстового описания

    switch(type) {
        case 'phone':
            qrImage = 'images/mobile.png';
            description = 'Телефон';
            break;
        case 'telegram':
            qrImage = 'images/telegram.png';
            description = 'Ссылка на телеграмм';
            break;
        case 'vk':
            qrImage = 'images/vk.png';
            description = 'Ссылка на VK';
            break;
    }

    // Создаем контейнер для QR-кода и текста
    const qrBlock = document.createElement('div');
    qrBlock.className = 'qr-block';

    // Создаем элемент изображения QR-кода
    const img = document.createElement('img');
    img.src = qrImage;
    img.alt = altText;
    img.className = 'qr-image'; 

    // Создаем элемент для текста
    const descElement = document.createElement('p');
    descElement.className = 'qr-description';
    descElement.textContent = description;

    // Добавляем изображение и текст в контейнер
    qrBlock.appendChild(img);
    qrBlock.appendChild(descElement);

    // Добавляем контейнер в основной блок
    qrContainer.appendChild(qrBlock);
}

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/pwa-test/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}


