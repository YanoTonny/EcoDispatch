// Function to display messages
function displayMessage(message) {
  const messageDiv = document.getElementById('message');
  if (messageDiv) {
    messageDiv.textContent = message;
  } else {
    const newMessageDiv = document.createElement('div');
    newMessageDiv.id = 'message';
    newMessageDiv.textContent = message;
    document.body.appendChild(newMessageDiv);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // Early Access Form Submission
  const earlyAccessForm = document.getElementById('earlyAccessForm');
  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission
      // Retrieves form data
      const formData = new FormData(earlyAccessForm);
      const email = formData.get('email');
      // Sends form data to the server
      fetch('/early-access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            displayMessage('Welcome to the green revolution!');
          } else {
            displayMessage('There was an error. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          displayMessage('There was an error. Please try again.');
        });
      // Resets the form after submission
      earlyAccessForm.reset();
    });
  }

  const loginFormContainer = document.getElementById('login-form-container');
  const registrationFormContainer = document.getElementById(
    'registration-form-container'
  );
  const showRegistrationButton = document.getElementById('show-registration');
  const showLoginButton = document.getElementById('show-login');
  const loginForm = document.getElementById('loginForm');
  const registrationForm = document.getElementById('registrationForm');
  const authModal = document.getElementById('auth-modal');
  const content = document.querySelector('.content');

  const apiBaseUrl = 'http://localhost:3000'; // the port backend runs on

  // Checks if user is already authenticated
  const isAuthenticated = sessionStorage.getItem('authenticated');
  if (isAuthenticated) {
    authModal.style.display = 'none';
    content.style.display = 'block';
  }

  showRegistrationButton.addEventListener('click', function () {
    loginFormContainer.style.display = 'none';
    registrationFormContainer.style.display = 'block';
  });

  showLoginButton.addEventListener('click', function () {
    registrationFormContainer.style.display = 'none';
    loginFormContainer.style.display = 'block';
  });

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    fetch(`${apiBaseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.accessToken) {
          sessionStorage.setItem('authenticated', true);
          sessionStorage.setItem('token', data.accessToken);
          authModal.style.display = 'none';
          content.style.display = 'block';
          displayMessage('Welcome to EcoDispatch!');
        } else {
          displayMessage('Invalid credentials');
        }
      })
      .catch((error) => console.error('Error:', error));
  });

  registrationForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const newUsername = document.getElementById('newUsername').value;
    const newEmail = document.getElementById('newEmail').value;
    const newPassword = document.getElementById('newPassword').value;
    fetch(`${apiBaseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUsername,
        email: newEmail,
        password: newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'User registered successfully') {
          sessionStorage.setItem('authenticated', true);
          authModal.style.display = 'none';
          content.style.display = 'block';
          displayMessage('Welcome to the green eco-friendly revolution!');
        } else {
          displayMessage('Registration failed: ' + data.message);
        }
      })
      .catch((error) => console.error('Error:', error));
  });

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents default form submission
      // Retrieves form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      fetch(`${apiBaseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            displayMessage(
              'Thank you for contacting EcoDispatch. A representative will reach out to you shortly!'
            );
          } else {
            displayMessage('There was an error. Please try again.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          displayMessage('There was an error. Please try again.');
        });
      // Reset the form after submission
      contactForm.reset();
    });
  }

  // Restaurant Registration Form Submission
  const restaurantRegistrationForm = document.getElementById(
    'restaurantRegistrationForm'
  );

  if (restaurantRegistrationForm) {
    restaurantRegistrationForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      const formData = new FormData(restaurantRegistrationForm);
      const restaurantName = formData.get('restaurantName');
      const ownerName = formData.get('ownerName');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const address = formData.get('address');
      const description = formData.get('description');

      fetch(`${apiBaseUrl}/registerRestaurant`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          restaurantName,
          ownerName,
          email,
          phone,
          address,
          description,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Restaurant registered successfully') {
            displayMessage('Welcome to the green eco-friendly revolution!');
            restaurantRegistrationForm.reset();
          } else {
            displayMessage('Registration failed: ' + data.message);
          }
        })
        .catch((error) => console.error('Error:', error));
    });
  }

  // Organization Registration Form Submission
  const organizationRegistrationForm =
    document.getElementById('registration-form');

  if (organizationRegistrationForm) {
    organizationRegistrationForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const orgName = document.getElementById('org-name').value;
      const email = document.getElementById('email').value;

      fetch(`${apiBaseUrl}/registerOrganization`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orgName, email }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Organization registered successfully') {
            displayMessage('Thank you for registering!');
            organizationRegistrationForm.reset();
          } else {
            displayMessage('Registration failed: ' + data.message);
          }
        })
        .catch((error) => console.error('Error:', error));
    });
  }
});
