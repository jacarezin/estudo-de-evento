const isValidDate = (data) => {
  const dia = parseInt(data.split("/")[0]),
    mes = parseInt(data.split("/")[1]),
    ano = parseInt(data.split("/")[2]),
    currentYear = new Date().getFullYear(),
    currentMonth = new Date().getMonth() + 1,
    currentDay = new Date().getDate();

  const diasNoMes = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (ano.toString().length !== 4 || ano < 1000 || ano > currentYear) {
    return false;
  }
  if (ano % 400 === 0 || (ano % 4 === 0 && ano % 100 !== 0)) {
    diasNoMes[2] = 29;
  }
  if (
    ano === currentYear &&
    (mes > currentMonth || (mes === currentMonth && dia >= currentDay))
  ) {
    return false;
  } else if (mes < 1 || mes > 12 || dia < 1) {
    return false;
  }

  return true;
};

const tags = ["teste", "testa"];
function addTag(teste) {
  const anc = teste;
  const possiveis = anc.split(",");
  console.log(possiveis);
  possiveis.map((cand) => {
    console.log(cand);
    if (!tags.includes(cand) && isValidDate(cand)) {
      tags.push(cand);
    }
  });
}

const teste = "21/10/2020, 01/01/2025, 27/11/2020, 19/10/2021";
addTag(teste);

tags;
