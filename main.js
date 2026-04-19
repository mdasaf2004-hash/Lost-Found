const form = document.getElementById("itemForm");
const itemsList = document.getElementById("itemsList");

function loadItems() {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  itemsList.innerHTML = "";

  // Sort by newest first using the 'id' (timestamp)
  const sortedItems = items.sort((a, b) => b.id - a.id);

  sortedItems.forEach((item) => {
    const div = document.createElement("div");
    div.className = `item ${item.type.toLowerCase()}`;

    div.innerHTML = `
      <h3>${item.type === 'Lost' ? '❌' : '🔍'} ${item.name}</h3>
      <p>${item.description}</p>
      <p>📍 <strong>${item.location}</strong></p>
      <p>📱 <strong>${item.contact}</strong></p>
      <button class="btn-delete" onclick="deleteItem(${item.id})">Remove</button>
    `;
    itemsList.appendChild(div);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const newItem = {
    id: Date.now(), // Unique ID for safer deletion
    type: document.getElementById("type").value,
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    location: document.getElementById("location").value,
    contact: document.getElementById("contact").value
  };

  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.push(newItem);
  localStorage.setItem("items", JSON.stringify(items));

  form.reset();
  loadItems();
});

function deleteItem(id) {
  let items = JSON.parse(localStorage.getItem("items")) || [];
  // Filter out the item with the matching ID
  items = items.filter(item => item.id !== id);
  localStorage.setItem("items", JSON.stringify(items));
  loadItems();
}

loadItems();