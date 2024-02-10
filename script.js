const accessKey = 'YOUR_ACCESS_KEY'; // Вставьте ваш API-ключ от Unsplash

const imageElement = document.getElementById('image');
const photographerElement = document.getElementById('photographer');
const likeButton = document.getElementById('likeBtn');
const likesCountElement = document.getElementById('likesCount');

let likesCount = localStorage.getItem('likesCount') || 0;

// Получение случайного изображения из Unsplash
async function getRandomImage() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${accessKey}`);
        const data = await response.json();
        const imageUrl = data.urls.regular;
        const photographerName = data.user.name || 'Unknown Photographer';
        
        imageElement.src = imageUrl;
        photographerElement.textContent = (`Photographer: ${photographerName}`);
    } catch (error) {
        console.error('Error fetching random image:', error);
    }
}

// Показываем количество лайков при загрузке страницы
likesCountElement.textContent = likesCount;

// Обработчик кнопки "Лайк"
likeButton.addEventListener('click', () => {
    if (!localStorage.getItem('likedImage')) {
        likesCount++;
        likesCountElement.textContent = likesCount;
        localStorage.setItem('likesCount', likesCount);
        localStorage.setItem('likedImage', true);
    } else {
        likesCount--;
        likesCountElement.textContent = likesCount;
        localStorage.setItem('likesCount', likesCount);
        localStorage.removeItem('likedImage');
    }
});

getRandomImage();
