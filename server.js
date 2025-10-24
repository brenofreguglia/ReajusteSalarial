const express = require("express");
const server = express();
const port = 3000;

server.get("/", (req, res) => {
  res.send(`
    <div style="max-width: 700px; margin: 50px auto; padding: 30px; border-radius: 16px; background: #fff; box-shadow: 0 4px 12px rgb(16 8 8 / 32%); font-family: 'Segoe UI', sans-serif; color: #333;">
      <h1 style="text-align: center; color: #000000ff; font-size: 28px; margin-bottom: 20px;">Atividade 1 - Reajuste Salarial</h1>
      
      <p style="font-size: 16px;">Para calcular o reajuste, informe os dados na URL, por exemplo:</p>
      <div style="background: #eef0ff; padding: 10px 15px; border-left: 4px solid #292f7f; border-radius: 6px; font-family: monospace; margin-bottom: 20px;">
        /reajuste?idade=25&sexo=F&salario=2000&anoContratacao=2018&matricula=12345
      </div>

      <p style="font-size: 16px; margin-bottom: 15px;">
        Exemplo de uso:
        <a href="https://reajuste-salarial-ten.vercel.app/reajuste?idade=25&sexo=F&salario=2000&anoContratacao=2018&matricula=12345" 
          target="_self" 
          style="color: #1a8f52; text-decoration: none; font-weight: 600;">
          Clique aqui para calcular o reajuste
        </a>
      </p>

      <p style="font-weight: bold; color: #292f7f;">Regras para o uso certo:</p>
      <ul style="line-height: 1.6; font-size: 15px; margin-left: 20px;">
        <li>Idade maior que 16</li>
        <li>Salário base deve ser um número válido (Ex: 2000)</li>
        <li>Ano de contratação maior que 1960</li>
        <li>Matrícula maior que 0 (Ex: 12345)</li>
      </ul>
    </div>
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
      <div style="max-width: 600px; margin: 60px auto; padding: 30px; border-radius: 16px; background: #fff; box-shadow: 0 4px 12px rgb(16 8 8 / 32%); font-family: 'Segoe UI', sans-serif; color: #333;">
        <h1 style="text-align: center; color: #000000ff; font-size: 26px; margin-bottom: 20px;">Erro nos dados informados</h1>
        <p style="font-size: 16px;">Verifique se todos os parâmetros foram passados corretamente.</p>
        
        <p style="font-weight: bold; color: #000000ff; margin-top: 20px;">Regras:</p>
        <ul style="line-height: 1.6; font-size: 15px; margin-left: 20px;">
          <li>Idade maior que 16</li>
          <li>Salário base deve ser um número válido (Ex: 2000)</li>
          <li>Ano de contratação maior que 1960</li>
          <li>Matrícula maior que 0 (Ex: 12345)</li>
        </ul>

        <div style="text-align: center; margin-top: 25px;">
          <a href="/" style="display: inline-block; background: #292f7f; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Voltar</a>
        </div>
      </div>
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
    return res.send(`
      <div style="max-width: 600px; margin: 60px auto; padding: 30px; border-radius: 16px; background: #fffaf0; box-shadow: 0 4px 12px rgb(16 8 8 / 32%); font-family: 'Segoe UI', sans-serif; color: #333;">
        <h3 style="text-align: center; color: #000000ff; font-size: 22px; margin-bottom: 15px;">
          A idade <span style="color:red;">${idade}</span> está fora das faixas consideradas.
        </h3>
        
        <p style="font-weight: bold; color: #292f7f; margin-top: 20px;">Regras:</p>
        <ul style="line-height: 1.6; font-size: 15px; margin-left: 20px;">
          <li>Idade maior que 16</li>
          <li>Salário base deve ser um número válido (Ex: 2000)</li>
          <li>Ano de contratação maior que 1960</li>
          <li>Matrícula maior que 0 (Ex: 12345)</li>
        </ul>

        <div style="text-align: center; margin-top: 25px;">
          <a href="/" style="display: inline-block; background: #292f7f; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 500;">Voltar</a>
        </div>
      </div>
    `);
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
        <div style="max-width: 500px; margin: 40px auto; padding: 30px; border-radius: 16px; background: #fff; box-shadow: 0 4px 12px rgb(16 8 8 / 32%); font-family: 'Segoe UI', sans-serif; color: #333;">
          <h1 style="text-align: center; color: #000000ff; margin-bottom: 20px; font-size: 26px;">Resultado do Reajuste Salarial</h1>

          <p style="margin: 8px 0; font-size: 16px;">
            <b style="color: #292f7f;">Matrícula:</b> ${matricula}
          </p>
          <p style="margin: 8px 0; font-size: 16px;">
            <b style="color: #292f7f;">Sexo:</b> ${sexo}
          </p>
          <p style="margin: 8px 0; font-size: 16px;">
            <b style="color: #292f7f;">Idade:</b> ${idade}
          </p>
          <p style="margin: 8px 0; font-size: 16px;">
            <b style="color: #292f7f;">Salário Base:</b> R$ ${salarioBase.toFixed(
              2
            )}
          </p>
          <p style="margin: 8px 0; font-size: 16px;">
            <b style="color: #292f7f;">Ano de Contratação:</b> ${anoContratacao}
          </p>
          <p style="margin: 8px 0; font-size: 16px;">
            <b style="color: #292f7f;">Tempo de Empresa:</b> ${tempoEmpresa} anos
          </p>

          <hr style="margin: 20px 0; border: none; height: 1px; background: #d1d3e0;">

          <h2 style="text-align: center; color: #1a8f52; font-size: 24px; margin: 20px 0 10px;">Novo Salário:
            <span style="color:#1a8f52;">R$ ${novoSalario.toFixed(2)}</span>
          </h2>

          <div style="text-align: center; margin-top: 25px;">
            <a href="/" style="display: inline-block; background: #292f7f; color: #fff; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 500; transition: background 0.3s;">
              Voltar
            </a>
          </div>
        </div>
    `);
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
