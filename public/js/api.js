document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const content = document.getElementById('content');
    const runAppButton = document.getElementById('runAppButton'); // Кнопка для запуска

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

    // Запускаем loadData() по нажатию на кнопку
    runAppButton.addEventListener('click', loadData);
});
