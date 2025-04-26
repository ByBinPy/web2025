document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('login');
  const errorContainer = document.getElementById('error-message');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value
    };

    try {
      const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Ошибка входа');
      }

      if (response.redirected) {
        window.location.href = response.url;
      }

    } catch (error) {
      errorContainer.textContent = error.message;
      errorContainer.style.display = 'block';
    }
  });
});