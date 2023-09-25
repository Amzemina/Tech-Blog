//login
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
        const json = await response.json();
        showErrorMessage(json.message)
      }
    } else {
        showErrorMessage("You need to provide a Username and Password")
    }
  };

  //register
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
        const json = await response.json();
        showErrorMessage(json.message)
      }
    } else {
        showErrorMessage("You need to provide a Username and Password")
    }

  };

  document.querySelector('#login-submit').addEventListener('click', loginFormHandler);
  document.querySelector('#signup-submit').addEventListener('click', signupFormHandler);