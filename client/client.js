/* eslint-disable */

if (location.host.includes('localhost')) {
  // Load livereload script if we are on localhost
  document.write(
    '<script src="http://' +
      (location.host || 'localhost').split(':')[0] +
      ':35729/livereload.js?snipver=1"></' +
      'script>'
  )
}

console.log('This is a Test')

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.getElementById('login-form');
  const signupForm = document.getElementById('signup-form');
  const messageElement = document.getElementById('message');

  function isValidUsername(username) {
    // Ensure username is a string with 3 to 20 alphanumeric characters
    return typeof username === 'string' && /^[A-Za-z0-9]{3,20}$/.test(username);
  }
  
  function isValidPassword(password) {
    // Ensure password is a string with 8 to 100 characters
    return typeof password === 'string' && /^.{8,100}$/.test(password);
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      if (!isValidUsername(username) || !isValidPassword(password)) {
        messageElement.innerHTML = 'Invalid username or password format';
        return;
      }
      try {
        const response = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          window.location.href = '/mainPage/homepage.html'
          // Redirect to the main application page or handle navigation
        } else {
          messageElement.innerHTML = data.message;
        }
      } catch (error) {
        console.log(error);
        alert('Error logging in');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const username = document.getElementById('signup-username').value;
      const password = document.getElementById('signup-password').value;
      
      if (!isValidUsername(username) || !isValidPassword(password)) {
        messageElement.innerHTML = 'Invalid username or password format';
        return;
      }
      try {
        const response = await fetch('/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          window.location.href = '/index.html'
          // Redirect to the login page or handle navigation
        } else {
          messageElement.innerHTML = data.message;
        }
      } catch (error) {
        console.log(error);
        messageElement.innerHTML = 'Error registering';
      }
    });
  }
});
