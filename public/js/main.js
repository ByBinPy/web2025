(function() {
    window.addEventListener('load', function() {
        const [performanceEntry] = performance.getEntriesByType('navigation');

        if (performanceEntry) {
            const loadTime = performanceEntry.domContentLoadedEventEnd - performanceEntry.startTime;
            const loadTimeDisplay = document.getElementById('load-time');

            if (loadTimeDisplay) {
                loadTimeDisplay.textContent = `Страница загружена за ${Math.round(loadTime)} мс.`;
            }
        } else {
            console.warn('Navigation timing API is not supported in this browser');
        }
    });
})();


document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('nav ul li a');
    menuItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            item.style.color = '#ff8ba0';
        });
        item.addEventListener('mouseout', function() {
            item.style.color = '#4a4a4a';
        });
    });

    const images = document.querySelectorAll('main img');
    images.forEach(img => {
        img.addEventListener('mouseover', function() {
            img.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.3)';
        });
        img.addEventListener('mouseout', function() {
            img.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
    });

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            button.style.backgroundColor = '#ffc2d1';
        });
        button.addEventListener('mouseout', function() {
            button.style.backgroundColor = '#ff8ba0';
        });
    });
});
document.addEventListener('DOMContentLoaded', function () {
    let currentPath = document.location.pathname;
    const menuItems = document.querySelectorAll('nav ul li a');

    menuItems.forEach(item => {
        let itemPath = item.getAttribute('href');
        const anchorUrl = new URL(itemPath, document.location.origin);
        if (currentPath.search(anchorUrl.pathname)>0) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    menuItems.forEach(item => {
        item.addEventListener('mouseover', function () {
            item.style.color = '#ff8ba0';
        });
        item.addEventListener('mouseout', function () {
            if (!item.classList.contains('active')) {
                item.style.color = '#4a4a4a';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const loadButton = document.getElementById('loadButton');

    function showPreloader() {
        preloader.style.display = 'block';
    }

    function hidePreloader() {
        preloader.style.display = 'none';
    }

    function showError(message) {
        content.innerHTML = `<p class="error">⚠ ${message}</p>`;
    }

    async function loadData() {
        try {
            showPreloader();
            console.log("Отправляем запрос...");

            const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
            console.log("Ответ сервера:", response);

            if (!response.ok) {
                throw new Error(`Ошибка: ${response.status}`);
            }

            const data = await response.json();
            console.log("Полученные данные:", data);

            renderData(data);
        } catch (error) {
            showError("Что-то пошло не так! Проверьте соединение с сетью.");
            console.error(error);
        } finally {
            hidePreloader();
        }
    }

    function renderData(data) {
        content.innerHTML = '';
        data.forEach(item => {
            const comment = document.createElement('div');
            comment.innerHTML = `
                <h3>${item.name}</h3>
                <p><strong>Email:</strong> ${item.email}</p>
                <p>${item.body}</p>
                <hr>
            `;
            content.appendChild(comment);
        });
    }

    loadButton.addEventListener('click', loadData);
});
document.addEventListener('DOMContentLoaded', function () {
    const swiper = new Swiper('.swiper-container', {
        loop: true, // Зацикливание слайдов
        autoplay: {
            delay: 3000, // Автопрокрутка каждые 3 секунды
        },
        pagination: {
            el: '.swiper-pagination', // Элемент для пагинации
            clickable: true, // Делаем точки кликабельными
        },
        navigation: {
            nextEl: '.swiper-button-next', // Кнопка вперед
            prevEl: '.swiper-button-prev', // Кнопка назад
        },
        slidesPerView: 1,
        spaceBetween: 10,
        effect: 'slide', // Эффект перехода (slide, fade, cube, coverflow)
    });
});

