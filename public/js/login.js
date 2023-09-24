const loginFormHandler =  async (event) => {
    event.preventDefault();
    hideErrorMessage()
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        showErrorMessage(await response.json())
      }
    } else {
        showErrorMessage("You need to provide a Username and Password")
    }
  };

  const signupFormHandler =  async (event) => {
    event.preventDefault();
    hideErrorMessage()
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password) {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        showErrorMessage(await response.json())
      }
    } else {
        showErrorMessage("You need to provide a Username and Password")
    }

  };

const errorMessage = document.querySelector('#message')
function showErrorMessage (errorText) {
        errorMessage.textContent = errorText
        errorMessage.classList.remove('hidden')
}

function hideErrorMessage(){
    errorMessage.textContent = ""
    errorMessage.classList.add("hidden")
}

  document.querySelector('#login-submit').addEventListener('click', loginFormHandler);
  document.querySelector('#signup-submit').addEventListener('click', signupFormHandler);