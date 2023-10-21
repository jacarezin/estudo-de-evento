import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const topicData = [
  { topico: "Dados", info: "" },
  { topico: "Regressão", info: "" },
  {
    topico: "Intervalo de Confiança",
    info: "",
  },
  { topico: "Resumo", info: "" },
];

const percentData = [
  { id: "n90", text: "90" },
  { id: "n95", text: "95" },
  { id: "n99", text: "99" },
];

const loremipsu =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...";

const updatedTopicData = topicData.map((topic) => ({
  ...topic,
  info: loremipsu,
}));

const acoesData = [
  {
    cod: "IBOVESPA",
    nome: "Índice Bovespa B3",
  },
  {
    cod: "IBrX 100",
    nome: "Índice Brasil 100",
  },
  {
    cod: "IBrX 50",
    nome: "Índice Brasil 50",
  },
  {
    cod: "IBrA B3",
    nome: "Índice Brasil Amplo",
  },
];

//  HTML
function App() {
  return (
    <div className="bodyfake">
      <Config />
      <Relat />
    </div>
  );
}
// ESQUERDA
function Config() {
  return (
    <div className="config">
      <div className="h-f">
        <Titulo />
        <Formulario />
      </div>
      <Button />
    </div>
  );
}
function Titulo() {
  return (
    <div className="h1-ico">
      <h1 className="p-h">
        Gerador de
        <br />
        Estudo de
        <br />
        Evento
      </h1>
      <a className="info" href="#">
        i
      </a>
    </div>
  );
}
function Formulario() {
  return (
    <form action="#">
      <Acoes />
      <Parametros />
      {/*
      <Datas /> */}
    </form>
  );
}
function Acoes() {
  const acoesD = acoesData;
  return (
    <React.Fragment>
      <label htmlFor="acoes">Ações</label>
      <select id="acoes" required>
        {acoesD.map((ac) => (
          <AcoesOptions acObj={ac} key={ac.cod} />
        ))}
      </select>
    </React.Fragment>
  );
}
function AcoesOptions({ acObj }) {
  return (
    <option value={acObj.cod}>
      {acObj.nome} ({acObj.cod})
    </option>
  );
}
function Parametros() {
  return (
    <React.Fragment>
      {/* Janela de estimação */}
      <label htmlFor="janesti">
        Janela de Estimação<span> (dias)</span>
      </label>
      <input
        className="curto"
        id="janesti"
        type="number"
        defaultValue="252"
        max="365"
        min="126"
      />
      {/* Janela do Evento */}
      <label htmlFor="janev">
        Janela do Evento<span> (dias)</span>
      </label>
      <div className="janevinput">
        <input
          id="janev"
          className="janev curto"
          type="number"
          defaultValue="5"
          max="30"
          min="1"
        />
        <p>d0</p>
        <input
          className="janev curto en"
          type="number"
          defaultValue="5"
          min="1"
          max="30"
        />
      </div>
      <LinhaJE />
      <CaixaJE />
    </React.Fragment>
  );
}
function LinhaJE() {
  return (
    <div className="janevlin">
      <div className="linha">
        <div className="quadr"></div>
        <div className="bola"></div>
        <div className="quadr en"></div>
      </div>
    </div>
  );
}

function CaixaJE() {
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

  const [inputValue, setInputValue] = useState("");

  const [tags, setTags] = React.useState(["21/10/2019", "01/05/2015"]);
  const removeTag = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };
  let contagem = tags.length;
  const addTag = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      const newtags = [];
      const dataerrada = [];
      const possi = e.target.value;
      const possiveis = possi.split(",");
      possiveis.map((cand) => {
        if (!tags.includes(cand) && isValidDate(cand)) {
          newtags.push(cand);
        }
        if (!tags.includes(cand) && !isValidDate(cand)) {
          dataerrada.push(cand.trim());
        }
      });
      setTags([...tags, ...newtags]);
      e.target.value = dataerrada;
    }
  };

  return (
    <label htmlFor="caixa">
      <div className="caixalab">
        <div>
          Data dos Eventos<span> &#40;separar com virgulas&#41;</span>
        </div>
        <div id="num30">
          &#40;<span id="num30">{contagem}</span>/30&#41;
        </div>
      </div>
      <div id="data" className="datas">
        <ul>
          {tags.map((tag, index) => (
            <li key={index}>
              {tag}{" "}
              <div clasNames="icone" onClick={() => removeTag(index)}>
                &#x00d7;
              </div>
            </li>
          ))}
          <input
            id="caixa"
            type="text"
            onKeyUp={addTag}
            placeholder={
              contagem > 2 ? "" : "dd/mm/aaaa, dd/mm/aaaa, dd/mm/aaaa"
            }
          />
        </ul>
        <div className="bob">Limite máximo atingido! &#40;30/30s&#41;</div>
        <div className="bub">Data inválida! Utilize o formato dd/mm/yyyy</div>
      </div>
    </label>
  );
}

function Datas() {
  return <form action="#"></form>;
}

function Button() {
  return (
    <a className="btn-cont" href="#">
      <button className="btn">Gerar Estudo</button>
    </a>
  );
}
// DIREITA
function Relat() {
  return (
    <div className="relat">
      <Relheader />
      <Topicos />
    </div>
  );
}
function Relheader() {
  return (
    <header className="relat-head">
      <Intervalos />
      <div className="exportdiv">
        <a href="#" className="export pdf">
          Exportar como .pdf
        </a>
      </div>
    </header>
  );
}
function Intervalos() {
  const percent = percentData;

  return (
    <div className="intervalos">
      <p className="text-head">Intervalo de Confiança</p>
      <div className="porcentagens">
        {percent.map((percent) => (
          <Porcentagens percObj={percent} key={percent.id} />
        ))}
      </div>
    </div>
  );
}

function Porcentagens({ percObj }) {
  return (
    <label className="box-por" htmlFor={percObj.id}>
      <input id={percObj.id} type="checkbox" defaultChecked />
      <span className="per">{percObj.text}%</span>
    </label>
  );
}
function Topicos() {
  const topico = updatedTopicData;

  return (
    <React.Fragment>
      {topico.map((topico) => (
        <Topico topObj={topico} key={topico.topico} />
      ))}
    </React.Fragment>
  );
}
function Topico({ topObj }) {
  const [btnState, setBtnState] = useState(false);
  function open() {
    setBtnState((btnState) => !btnState);
  }
  let toogle = btnState ? " open" : "";

  return (
    <div className={`section${toogle}`}>
      <div className="titulo" onClick={open}>
        <span>&#62;</span>
        {topObj.topico}
      </div>
      <div className="conteudo">{topObj.info}</div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
