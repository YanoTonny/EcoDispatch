document.addEventListener('DOMContentLoaded', function () {
  // Product Search Functionality
  const productSearch = document.getElementById('productSearch');
  const products = document.querySelectorAll('.product');

  if (productSearch) {
    productSearch.addEventListener('keyup', function (event) {
      const searchValue = event.target.value.toLowerCase();
      products.forEach((product) => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        if (productName.includes(searchValue)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    });
  }

  // Contact Form Submission
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      // Retrieve form data
      const formData = new FormData(contactForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Dummy implementation: You would need to handle form submission via server-side processing

      // Dummy console log to display form data
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message);

      // Reset the form after submission
      contactForm.reset();
    });
  }

  // Early Access Form Submission
  const earlyAccessForm = document.getElementById('earlyAccessForm');

  if (earlyAccessForm) {
    earlyAccessForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      // Retrieve form data
      const formData = new FormData(earlyAccessForm);
      const email = formData.get('email');

      // Dummy implementation: You would need to handle form submission via server-side processing

      // Dummy console log to display form data
      console.log('Email:', email);

      // Reset the form after submission
      earlyAccessForm.reset();
    });
  }

  document
    .getElementById('registration-form')
    .addEventListener('submit', function (event) {
      event.preventDefault();

      const orgName = document.getElementById('org-name').value;
      const email = document.getElementById('email').value;

      console.log('Organization Name:', orgName);
      console.log('Email:', email);

      alert('Thank you for registering!');
    });

  // Restaurant Registration Form Submission
  const restaurantRegistrationForm = document.getElementById(
    'restaurantRegistrationForm'
  );

  if (restaurantRegistrationForm) {
    restaurantRegistrationForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      // Retrieve form data
      const formData = new FormData(restaurantRegistrationForm);
      const restaurantName = formData.get('restaurantName');
      const ownerName = formData.get('ownerName');
      const email = formData.get('email');
      const phone = formData.get('phone');
      const address = formData.get('address');
      const description = formData.get('description');

      // Dummy implementation: You would need to handle form submission via server-side processing

      // Dummy console log to display form data
      console.log('Restaurant Name:', restaurantName);
      console.log("Owner's Name:", ownerName);
      console.log('Email:', email);
      console.log('Phone:', phone);
      console.log('Address:', address);
      console.log('Description:', description);

      // Reset the form after submission
      restaurantRegistrationForm.reset();
    });
  }
});
