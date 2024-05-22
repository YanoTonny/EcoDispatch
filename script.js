// Functionality JavaScript File

// Function to handle button click event
function handleButtonClick() {
  // Replace this alert with your desired functionality
  alert("Button clicked!");
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission

  // Replace this alert with your desired functionality
  alert("Form submitted!");
}

// Function to handle input change event
function handleInputChange(event) {
  // Replace this console log with your desired functionality
  console.log("Input value changed:", event.target.value);
}

// Add event listeners once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Select the button by its ID and add a click event listener
  var button = document.getElementById("btn-primary");
  if (button) {
    button.addEventListener("click", handleButtonClick);
  }

  // Select the form by its ID and add a submit event listener
  var form = document.getElementById("early-access-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmission);
  }

  // Select the input by its ID and add a change event listener
  var input = document.getElementById("input-1");
  if (input) {
    input.addEventListener("change", handleInputChange);
  }
});
