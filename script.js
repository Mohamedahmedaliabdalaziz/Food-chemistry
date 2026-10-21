const supervisors = [
  { name: "Prof. Dr. Rania Elgammal", role: "Project Supervisor" },
  { name: "Ass Prof. Dr. Eman Saafan", role: "Project Supervisor" },
  { name: "Prof. Dr. Shady Elshahawey", role: "Project Supervisor" }
];

const students = [
  "Rahaf Walid Mohamed Mahmoud",
  "Rawan Ibrahim Hassan Ahmed",
  "Rawan Ibrahim Mohamed Radwan",
  "Rawan Ahmed Tawakkol",
  "Rawan Ahmed Maher Hussein",
  "Rawan El-Saeed Hussein",
  "Rawan El-Sayed Helmy",
  "Rawan El-Sayed Farid",
  "Rawan Ayman Mousa",
  "Rawan Ehab Rizk",
  "Rawan Bakr Farouk",
  "Rawan Hassanein Essam",
  "Rawan Ramadan Ibrahim",
  "Rawan Saad Fathy",
  "Roland Tarek Ibrahim",
  "Rawan Arafa Abdel-Azim",
  "Rawan Essam Omar",
  "Roland Mohamed Tarek",
  "Rawan Mohamed Adel",
  "Rawan Mohamed Fayek",
  "Rawan Mohamed Fathy",
  "Rawan Mustafa Saad",
  "Rawan Mansour Ramadan",
  "Rawan Yasser Mohamed",
  "Rotag El-Sayed Mustafa"
];

const supervisorList = document.getElementById("supervisor-list");
const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("student-search");
const emptyState = document.getElementById("empty-state");
const visibleCount = document.getElementById("visible-count");
const sortButton = document.getElementById("sort-button");
const resetButton = document.getElementById("reset-button");

let alphabetical = false;

function renderSupervisors() {
  supervisorList.innerHTML = supervisors.map((person, index) => `
    <article class="supervisor-card">
      <span class="card-index">0${index + 1} / FACULTY</span>
      <h3>${escapeHTML(person.name)}</h3>
      <p>${escapeHTML(person.role)}</p>
    </article>
  `).join("");
}

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderStudents() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const orderedStudents = alphabetical
    ? [...students].sort((a, b) => a.localeCompare(b))
    : students;

  const filtered = orderedStudents.filter(name => name.toLocaleLowerCase().includes(query));

  studentList.innerHTML = filtered.map(name => {
    const originalIndex = students.indexOf(name) + 1;
    return `
      <article class="student-card">
        <span class="student-number">${String(originalIndex).padStart(2, "0")}</span>
        <span class="student-name">${escapeHTML(name)}</span>
      </article>
    `;
  }).join("");

  emptyState.hidden = filtered.length !== 0;
  visibleCount.textContent = `Showing ${filtered.length} of ${students.length} students`;
  document.getElementById("student-count").textContent = students.length;
}

searchInput.addEventListener("input", renderStudents);

sortButton.addEventListener("click", () => {
  alphabetical = !alphabetical;
  sortButton.innerHTML = alphabetical
    ? 'Sort by original order <span aria-hidden="true">↕</span>'
    : 'Sort A–Z <span aria-hidden="true">↕</span>';
  renderStudents();
});

resetButton.addEventListener("click", () => {
  searchInput.value = "";
  alphabetical = false;
  sortButton.innerHTML = 'Sort A–Z <span aria-hidden="true">↕</span>';
  renderStudents();
  searchInput.focus();
});

document.addEventListener("keydown", event => {
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});

renderSupervisors();
renderStudents();
