document.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('register-form');
  const errorContainer = document.getElementById('error-message');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('name_reg').value,
      email: document.getElementById('email_reg').value,
      password: document.getElementById('password_reg').value
    };

    try {
      const response = await fetch('users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Ошибка регистрации');
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