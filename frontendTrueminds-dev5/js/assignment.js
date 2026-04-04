async function loadComponent(id, file) {
  const response = await fetch(`../components/${file}`);
  const data = await response.text();
  document.getElementById(id).innerHTML = data;
}

loadComponent("sidebar-container", "sidebar.html");
loadComponent("navbar-container", "navbar.html");

/* Simulated API call to fetch assignments */
async function getAssignments() {
  return [
    { title: "Wireframe challenge", course: "Mobile app design basics", due: "May 5, 2026" },
    { title: "State management usage", course: "Introduction to React", due: "May 6, 2026" },
    { title: "WBS techniques", course: "Task planning & execution", due: "May 7, 2026" }
  ];
}

/* Load assignments into table */
async function loadAssignments() {
  const data = await getAssignments();
  const table = document.getElementById("assignmentTable");

  /* Populate table rows dynamically */
  table.innerHTML = data.map(a => `
    <tr>
      <td>${a.title}</td>
      <td>${a.course}</td>
      <td>${a.due}</td>
      <td>
        <!-- View button navigates to submission page -->
        <button class="primary" onclick="viewAssignment()">View</button>
      </td>
    </tr>
  `).join("");
}

/* Navigate to submissions page */
function viewAssignment() {
  window.location.href = "submission.html";
}

/* Initialize page */
loadAssignments();