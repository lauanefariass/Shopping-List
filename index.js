const item = document.getElementById("input-item");
const btn_SaveItem = document.getElementById("add-item");
const shoppingList = document.getElementById("shopping-list");
const purchasedList = document.getElementById("purchased-list");
let contador = 0;

btn_SaveItem.addEventListener("click", addItem);

function addItem(event) {
  event.preventDefault();

  if (item.value === "") {
    alert("Please insert an item into the list");
    return;
  }
  const itemList = document.createElement("li");
  const containerItemList = document.createElement("div");
  containerItemList.classList.add("item-list-container");

  const checkboxContainer = document.createElement("div");
  checkboxContainer.classList.add("checkbox-container");

  const checkboxInput = document.createElement("input");
  checkboxInput.type = "checkbox";
  checkboxInput.classList.add("checkbox-input");
  checkboxInput.id = "checkbox-" + contador++;

  const checkboxCustomizado = document.createElement("div");
  checkboxCustomizado.classList.add("checkbox-customizado");

  // Título do item
  const nameItem = document.createElement("p");
  nameItem.innerText = item.value || `item-${contador}`;
  nameItem.classList.add("item-titulo");

  // Função para mover e riscar o item
  checkboxInput.addEventListener("change", function () {
    if (checkboxInput.checked) {
      checkboxCustomizado.classList.add("checked");
      nameItem.style.textDecoration = "line-through";
      purchasedList.appendChild(itemList);
    } else {
      checkboxCustomizado.classList.remove("checked");
      nameItem.style.textDecoration = "none";
      shoppingList.appendChild(itemList);
    }
  });

  // Adicionando os elementos ao checkbox
  const checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", checkboxInput.id);
  checkboxLabel.appendChild(checkboxInput);
  checkboxLabel.appendChild(checkboxCustomizado);
  checkboxContainer.appendChild(checkboxLabel);

  const containerBtn = document.createElement("div");

  // Botão de Remover
  const btnRemove = document.createElement("button");
  btnRemove.classList.add("btn-action");
  const imgRemove = document.createElement("img");
  imgRemove.src = "./img/delete.svg";
  imgRemove.alt = "remove";
  btnRemove.appendChild(imgRemove);

  btnRemove.addEventListener("click", () => {
    if (itemList.parentElement === shoppingList) {
      shoppingList.removeChild(itemList);
    } else {
      purchasedList.removeChild(itemList);
    }
  });

  // Botão de Editar
  const btnEdit = document.createElement("button");
  btnEdit.classList.add("btn-action");
  const imgEdit = document.createElement("img");
  imgEdit.src = "./img/edit.svg";
  imgEdit.alt = "edit";
  btnEdit.appendChild(imgEdit);

  btnEdit.addEventListener("click", () => {
    const newText = prompt("Edit item:", nameItem.innerText);
    if (newText !== null && newText.trim() !== "") {
      nameItem.innerText = newText;
    }
  });

  containerBtn.appendChild(btnRemove);
  containerBtn.appendChild(btnEdit);
  containerItemList.appendChild(checkboxContainer);
  containerItemList.appendChild(nameItem);
  containerItemList.appendChild(containerBtn);

  const itemData = document.createElement("p");
  itemData.innerHTML = `${new Date().toLocaleDateString("en-Br", {
    weekday: "long",
  })}
 (${new Date().toLocaleDateString()} as ${new Date().toLocaleTimeString(
    "en-Br",
    { hour: "numeric", minute: "numeric" }
  )}) `;
  itemData.classList.add("item-list-text");

  itemList.appendChild(containerItemList);
  itemList.appendChild(itemData);
  shoppingList.appendChild(itemList);

  item.value = "";
}
