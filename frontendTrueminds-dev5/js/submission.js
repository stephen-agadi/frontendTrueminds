async function loadComponent(id, file) {
  const response = await fetch(`../components/${file}`);
  const data = await response.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("sidebar-container", "sidebar.html");
loadComponent("navbar-container", "navbar.html");

/* Placeholder for future API */
function getSubmissions() {
  return [];
}

/* Get DOM elements */
const fileInput = document.getElementById("fileInput");
const button = document.querySelector(".upload-box button");

/* Trigger file picker when button is clicked */
button.addEventListener("click", () => {
  fileInput.click();
});

/* Display selected file name */
fileInput.addEventListener("change", () => {
  if (fileInput.files.length > 0) {
    button.textContent = fileInput.files[0].name;
  }
});

/* Submit button logic */
document.querySelector(".submit").addEventListener("click", () => {
  alert("Submitted successfully!");
});

/* Cancel button returns to previous page */
document.querySelector(".cancel").addEventListener("click", () => {
  window.history.back();
});
