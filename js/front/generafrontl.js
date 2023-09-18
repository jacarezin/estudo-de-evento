////// TAGS
const ulEl = document.querySelector("ul"),
  input = ulEl.querySelector("input");

let tags = [];

//DATA

function isValidDate(dia, mes, ano) {
  const currentYear = new Date().getFullYear().toString();

  const diasNoMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (ano.toString().length !== 4 || ano < 1000 || ano > currentYear) {
    return false;
  }

  if (ano % 400 === 0 || (ano % 4 === 0 && ano % 100 !== 0)) {
    diasNoMes[2] = 29;
  }

  if (mes < 1 || mes > 12 || dia < 1) {
    return false;
  } else if (dia > diasNoMes[mes]) {
    return false;
  }

  return true;
}

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

// CRIA A TAG NA ARRAY
function addTag(e) {
  let tagInput = document.querySelector("#caixa");
  let tagValue = tagInput.value.trim();
  let hasInvalidDate = false; // Variável de controle para verificar se há datas inválidas

  if ((e.key === "Enter" || e.key === ",") && tagValue.length > 0) {
    // Verifica se é uma data válida
    let tagsToAdd = tagValue.split(",");
    tagsToAdd.forEach((tag) => {
      tag = tag.trim();
      if (tag.length > 0 && !tags.includes(tag) && tags.length < 30) {
        const [day, month, year] = tag.split("/");
        if (!isValidDate(parseInt(day), parseInt(month), parseInt(year))) {
          // Marca que há pelo menos uma data inválida
          hasInvalidDate = true;
          document.querySelector(".datas").classList.add("invalido");
        } else {
          // Data válida, adiciona a tag
          tags.push(tag);
          createTag();
          document.querySelector(".datas").classList.remove("invalido");
          tagInput.value = "";
        }
      }
    });
  }

  checkAndApplyFullClass();
}

// Adicione um ouvinte de evento 'keyup' para chamar a função addTag
document.querySelector("#caixa").addEventListener("keyup", addTag);

// Mesma de cima mas pra ser acionada no console

// function adicionartag() {
//   let tagInput = input;
//   let tagValue = tagInput.value.trim();

//   if (tagValue) {
//     let tagsToAdd = tagValue.split(",");
//     tagsToAdd.forEach((tag) => {
//       tag = tag.trim();
//       if (tag.length > 0 && !tags.includes(tag) && tags.length < 30) {
//         tags.push(tag);
//         // console.log(tags);
//         createTag();
//       }
//     });
//   }
//   tagInput.value = "";

//   checkAndApplyFullClass();
// }

//checa data

// if (!isDate(tagValue) && tagValue.length > 0) {
//   // Se não for uma data válida, aplica a classe .invalido ao input
//   document.querySelector("#data").classList.add("invalido");
//   return; // Não faz nada mais se for uma data inválida
// }
// document.querySelector("#data").classList.remove("invalido");

// if (isDate(tagValue)) {
// //  DATA
// function isValidDate(day, month, year) {
//   const date = new Date(`${year}-${month}-${day}`);
//   return !isNaN(date.getTime());
// }

// // Função para verificar se um texto é uma data válida
// function isDate(text) {
//   const parts = text.split("/");
//   if (parts.length !== 3) {
//     return false;
//   }

//   const [day, month, year] = parts;
//   return isValidDate(day, month, year);
// }

// NÃO PERMITE !0-9 / ,
input.addEventListener("input", function (e) {
  const inputValue = e.target.value;
  const sanitizedValue = inputValue.replace(/[^0-9/,]/g, ""); // Remove todos os caracteres que não são números ou "/"

  if (inputValue !== sanitizedValue) {
    // Se o valor foi alterado devido à remoção de caracteres inválidos
    e.target.value = sanitizedValue; // Atualiza o valor do campo com o valor sanitizado
  }
});

/////////////////////////////////////////////////////////////////////
///////////// "não" atrapalham   ////////////////////////////////////
/////////////////////////////////////////////////////////////////////

// REMOVE TAG
function remove(element, tag) {
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.remove();

  checkAndApplyFullClass();
}

// FOCUS TAG
let isElementWithFocusDel = false;
input.addEventListener("keydown", focustag);
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
  let contador = document.querySelector("#num30 span");
  contador.textContent = tags.length.toString();

  if (tags.length >= 30) {
    document.querySelector(".datas").classList.add("full");
    document.querySelector(".datas").querySelector("input").disabled = true;
  } else {
    document.querySelector(".datas").classList.remove("full");
    document.querySelector(".datas").querySelector("input").disabled = false;
  }
}
input.addEventListener("keyup", addTag);

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
