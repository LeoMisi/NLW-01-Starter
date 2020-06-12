function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => res.json())
    .then((states) => {
      for (const state of states) {
        ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
      }
    });
}

populateUFs();

function getCities(event) {
  const citySelect = document.querySelector("[name=city]");
  const stateInput = document.querySelector("[name=state]");

  const ufValue = event.target.value;

  const indexOfSelectedState = event.target.selectedIndex;
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value> Selecione a Cidade</option>";
  citySelect.disabled = true;

  fetch(url)
    .then((res) => res.json())
    .then((cities) => {
      for (const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      }
      citySelect.disabled = false;
    });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

//Itens de Coleta
// Pegar todos os LI's

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItem = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  // Adicionar ou remover uma classe com JS

  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  // Verificar se existe items selecionados, se sim,
  //Pegar os Itens selecionados

  const alreadySelected = selectedItems.findIndex((item) => {
    const itemFound = item == itemId; //Isso será True ou False
    return itemFound;
  });

  //Se já estiver selecionado, tirar da seleção!

  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      const itemDifferent = item != itemId;
      return itemDifferent;
    });
    selectedItems = filteredItems;
  } else {
    //Se não estiver selecionado, adicionar à selecionar
    selectedItems.push(itemId);
  }

  //Atualizar o campo escondido com os itens selecionados
  collectedItem.value = selectedItems;
}
