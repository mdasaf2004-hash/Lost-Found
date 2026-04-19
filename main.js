const form = document.getElementById("itemForm");
const itemsList = document.getElementById("itemsList");

function loadItems() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  itemsList.innerHTML = "";

  items.slice().reverse().forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "item " + item.type.toLowerCase();

    div.innerHTML = `
      <h3>${item.type}: ${item.name}</h3>
      <p>${item.description}</p>
      <p><strong>Location:</strong> ${item.location}</p>
      <p><strong>Contact:</strong> ${item.contact}</p>
      <button onclick="deleteItem(${index})">Delete</button>
    `;

    itemsList.appendChild(div);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const item = {
    type: document.getElementById("type").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    location: document.getElementById("location").value,
    contact: document.getElementById("contact").value
  };

  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(item);

  localStorage.setItem("items", JSON.stringify(items));

  form.reset();
  loadItems();
});



function deleteItem(index) {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
}

loadItems();

