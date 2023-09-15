////// TAGS
const ulEl = document.querySelector("ul"),
  input = ulEl.querySelector("input");

input.addEventListener("keydown", focustag);

let tags = [];
// CRIA A TAG NO ELEMENTO
function createTag() {
  ulEl.querySelectorAll("li").forEach((li) => li.remove());

  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <div class="icone" onclick="remove(this, '${tag}')">&#x00d7;</div></li>`;
      ulEl.insertAdjacentHTML("afterbegin", liTag);
    });
}
// REMOVE TAG
function remove(element, tag) {
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.remove();

  checkAndApplyFullClass();
}
// ADICIONA TAG E CHAMA "createtag"
// function addTag(e) {
//   if (e.key === "Enter" || e.key === ",") {
//     let tagInput = input;
//     let tagValue = tagInput.value.trim();

//     if (tagValue) {
//       let tagsToAdd = tagValue.split(",");
//       tagsToAdd.forEach((tag) => {
//         tag = tag.trim();
//         if (tag.length > 0 && !tags.includes(tag) && tags.length < 30) {
//           tags.push(tag);
//           // console.log(tags);
//           createTag();
//         }
//       });
//     }
//     tagInput.value = "";

//     checkAndApplyFullClass();
//   }
// }

function adicionartag() {
  let tagInput = input;
  let tagValue = tagInput.value.trim();

  if (tagValue) {
    let tagsToAdd = tagValue.split(",");
    tagsToAdd.forEach((tag) => {
      tag = tag.trim();
      if (tag.length > 0 && !tags.includes(tag) && tags.length < 30) {
        tags.push(tag);
        // console.log(tags);
        createTag();
      }
    });
  }
  tagInput.value = "";

  checkAndApplyFullClass();
}

// BACKSPACE E DELETE SELECIONAM E APAGAM ÚLTIMO ITEM
let isElementWithFocusDel = false;

function focustag(e) {
  if (tags.length > 0) {
    if (
      isElementWithFocusDel &&
      (e.key === "Backspace" || e.key === "Delete")
    ) {
      // Apaga da array e do elemento
      document
        .querySelector(".datas")
        .querySelectorAll("li")
        [tags.length - 1].remove();
      tags.pop();
      isElementWithFocusDel = false;
    } else if (
      (e.key === "Backspace" || e.key === "Delete") &&
      tags.length > 0 &&
      input.value === ""
    ) {
      // Se apagar, ele adiciona a classe no último
      isElementWithFocusDel = true;
      document
        .querySelector(".datas")
        .querySelectorAll("li")
        [tags.length - 1].classList.add("focusdel");
    }
  }
}

//  TIRA O FOCO
input.addEventListener("keydown", function (e) {
  // Verifica se a tecla digitada não é "Backspace" ou "Delete"
  if (e.key !== "Backspace" && e.key !== "Delete") {
    // Remove a classe .focusdel do último elemento de tags
    if (isElementWithFocusDel) {
      document
        .querySelector(".datas")
        .querySelectorAll("li")
        [tags.length - 1].classList.remove("focusdel");
      isElementWithFocusDel = false;
    }
  }
});
document.addEventListener("click", function (e) {
  if (e.target) {
    // Remove a classe .focusdel do último elemento de tags
    if (isElementWithFocusDel) {
      document
        .querySelector(".datas")
        .querySelectorAll("li")
        [tags.length - 1].classList.remove("focusdel");
      isElementWithFocusDel = false;
    }
  }
});

// CHECA LIMITE
function checkAndApplyFullClass() {
  if (tags.length >= 30) {
    document.querySelector(".datas").classList.add("full");
    document.querySelector(".datas").querySelector("input").disabled = true;
  } else {
    document.querySelector(".datas").classList.remove("full");
    document.querySelector(".datas").querySelector("input").disabled = false;
  }
}
input.addEventListener("keyup", addTag);

/////////////////////
//////   DATA
////////////////////
function isValidDate(day, month, year) {
  const date = new Date(`${year}-${month}-${day}`);
  return !isNaN(date.getTime());
}

// Função para verificar se um texto é uma data válida
function isDate(text) {
  const parts = text.split("/");
  if (parts.length !== 3) {
    return false;
  }

  const [day, month, year] = parts;
  return isValidDate(day, month, year);
}

function addTag(e) {
  let tagInput = input;
  let tagValue = tagInput.value.trim();

  // Remove a classe .invalido se for uma data válida

  if (e.key === "Enter" || e.key === ",") {
    if (!isDate(tagValue) && tagValue.length > 0) {
      // Se não for uma data válida, aplica a classe .invalido ao input
      document.querySelector("#data").classList.add("invalido");
      return; // Não faz nada mais se for uma data inválida
    }
    document.querySelector("#data").classList.remove("invalido");

    if (isDate(tagValue)) {
      // Verifica se é uma data válida
      let tagsToAdd = tagValue.split(",");
      tagsToAdd.forEach((tag) => {
        tag = tag.trim();
        if (tag.length > 0 && !tags.includes(tag) && tags.length < 30) {
          tags.push(tag);
          // console.log(tags);
          createTag();
        }
      });
    }
    tagInput.value = "";

    checkAndApplyFullClass();
  }
}

// Remove todos os caracteres não numéricos

// function isValidDate(day, month, year) {
//   const date = new Date(`${year}-${month}-${day}`);
//   return !isNaN(date.getTime());
// }

//////////////////////////////////////////////////////////////////////////
////////////////               LADO RESULTADO                /////////////
/////////////////////////////////////////////////////////////////////////

// Abre e fecha tópicos
const sectionEl = document.querySelectorAll(".section");

sectionEl.forEach((section) => {
  section.addEventListener("click", () => {
    section.classList.toggle("open");
  });
});