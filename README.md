# Reajuste Salarial
### PI - Reajuste de Salário (AT1)

## Descrição do Projeto
Aplicativo web em Node.js com Express que calcula o reajuste salarial de funcionários com base em idade, sexo e tempo de empresa. Os parâmetros são recebidos via query string na rota /reajuste.

## Rotas
- GET / — página inicial com instruções.
- GET /reajuste — calcula o novo salário. Parâmetros via query string:
  - idade (number)
  - sexo (string): "M" ou "F"
  - salario (number) — salário base
  - anoContratacao (number) — ano de contratação
  - matricula (number) — matrícula do funcionário

## Validações
O servidor verifica:
- idade deve ser número e maior que 16;
- sexo deve ser "M" ou "F";
- salario deve ser número real maior que 0;
- anoContratacao deve ser número e maior que 1960;
- matricula deve ser número e maior que 0.
Se algum parâmetro for inválido, o servidor retorna uma página HTML com mensagem de erro.

## Lógica de cálculo
1. Define faixa etária e, conforme sexo, aplica uma porcentagem de reajuste:
   - 18–39:
     - M: reajuste 10%, desconto 10% se tempo ≤10 anos, acréscimo 17% se >10 anos
     - F: reajuste 8%, desconto 11% / acréscimo 16%
   - 40–69:
     - M: reajuste 8%, desconto 5% / acréscimo 15%
     - F: reajuste 10%, desconto 7% / acréscimo 14%
   - 70–99:
     - M: reajuste 15%, desconto 15% / acréscimo 13%
     - F: reajuste 17%, desconto 17% / acréscimo 12%
2. Calcula valorReajuste = salarioBase * percentualReajuste.
3. Ajusta valorReajuste por fator (desconto ou acréscimo) dependendo do tempo de empresa (anoAtual - anoContratacao).
4. Novo salário = salarioBase + valorReajusteAjustado.

Obs.: Idades fora das faixas consideradas (por exemplo menores de 18 ou >=100) retornam uma mensagem específica.

## Exemplos de uso
URL de exemplo:

https://reajuste-salarial-ten.vercel.app/reajuste?idade=25&sexo=F&salario=2000&anoContratacao=2018&matricula=12345

A rota `/` exibe instruções e um link de exemplo.

## Como executar
1. Clonar repositório:
```bash
git clone https://github.com/brenofreguglia/ReajusteSalarial.git
cd ReajusteSalarial
```
2. Instalar dependências:
```bash
npm install
```
3. Iniciar servidor:
```bash
npm start ou npx nodemon start
```
Por padrão o servidor roda em http://localhost:3000

## Resultado esperado
A rota `/reajuste` retorna uma página HTML com os dados do funcionário, tempo de empresa e o novo salário formatado (R$ XX,XX). Em caso de entrada inválida, retorna uma página com erro e as regras.

## Autor
Breno Freguglia
