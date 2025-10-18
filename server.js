const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send(`
        <h1>Atividade 1 - Reajuste Salarial</h1>
        <p>Para calcular o reajuste, informe os dados na URL, por exemplo:</p>
        <span>"http://localhost:3000/reajuste?idade=25&sexo=F&salario=2000&anoContratacao=2018&matricula=12345""</span>
        <p>
            Exemplo de uso: 
            <a href="http://localhost:3000/reajuste?idade=25&sexo=F&salario=2000&anoContratacao=2018&matricula=12345" target="_self">
                Clique aqui para calcular o reajuste
            </a>
        </p>
        <p><b>Regras para o uso certo:</b></p>
        <ul>
        <li>Idade maior que 16</li>
        <li>Salário base deve ser um número válido Ex: 2000</li>
        <li>Ano de contratação maior que 1960</li>
        <li>Matrícula maior que 0, Ex: 12345</li>
        </ul>
    `);
});

server.get("/reajuste", (req, res) => {
  const idade = parseInt(req.query.idade);
  const sexo = req.query.sexo;
  const salarioBase = parseFloat(req.query.salario);
  const anoContratacao = parseInt(req.query.anoContratacao);
  const matricula = parseInt(req.query.matricula);

  if (
    !idade ||
    idade <= 16 ||
    !salarioBase ||
    salarioBase <= 0 ||
    !anoContratacao ||
    anoContratacao <= 1960 ||
    !matricula ||
    matricula <= 0 ||
    (sexo !== "M" && sexo !== "F")
  ) {
    return res.send(`
        <h1>Erro nos dados informados</h1>
        <p>Verifique se todos os parâmetros foram passados corretamente.</p>
        <p><b>Regras:</b></p>
        <ul>
        <li>Idade maior que 16</li>
        <li>Salário base deve ser um número válido Ex: 2000</li>
        <li>Ano de contratação maior que 1960</li>
        <li>Matrícula maior que 0, Ex: 12345</li>
        </ul>
        <a href="/">Voltar</a>
        `);
  }

  const anoAtual = new Date().getFullYear();
  const tempoEmpresa = anoAtual - anoContratacao;

  var reajuste = 0;
  var desconto = 0;
  var acrescimo = 0;

  if (idade >= 18 && idade <= 39) {
    if (sexo === "M") {
      reajuste = 0.1;
      desconto = 10;
      acrescimo = 17;
    } else {
      reajuste = 0.08;
      desconto = 11;
      acrescimo = 16;
    }
  } else if (idade >= 40 && idade <= 69) {
    if (sexo === "M") {
      reajuste = 0.08;
      desconto = 5;
      acrescimo = 15;
    } else {
      reajuste = 0.1;
      desconto = 7;
      acrescimo = 14;
    }
  } else if (idade >= 70 && idade <= 99) {
    if (sexo === "M") {
      reajuste = 0.15;
      desconto = 15;
      acrescimo = 13;
    } else {
      reajuste = 0.17;
      desconto = 17;
      acrescimo = 12;
    }
  } else {
    return res.send("<h3>Idade fora das faixas consideradas.</h3>");
  }

  const valorReajuste = salarioBase * reajuste;

  var fatorReajuste;

  if (tempoEmpresa <= 10) {
    fatorReajuste = 1 - desconto / 100;
  } else {
    fatorReajuste = 1 + acrescimo / 100;
  }

  const valorReajusteAjustado = valorReajuste * fatorReajuste;
  const novoSalario = salarioBase + valorReajusteAjustado;

  res.send(`
        <h1>Resultado do Reajuste Salarial</h1>
        <p><b>Matrícula:</b> ${matricula}</p>
        <p><b>Sexo:</b> ${sexo}</p>
        <p><b>Idade:</b> ${idade}</p>
        <p><b>Salário Base:</b> R$ ${salarioBase.toFixed(2)}</p>
        <p><b>Ano de Contratação:</b> ${anoContratacao}</p>
        <p><b>Tempo de Empresa:</b> ${tempoEmpresa} anos</p>
        <h2 style="color:#292f7f;">Novo Salário: R$ ${novoSalario.toFixed(
          2
        )}</h2>
        <a href="/">Voltar</a>
    `);
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
