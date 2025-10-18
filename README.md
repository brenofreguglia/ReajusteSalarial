# ReajusteSalarial
PPI - Reajuste de salário(AT1) 

## Descrição do Projeto
Este projeto é um **aplicativo web** desenvolvido em **Node.js** utilizando **Express**, que calcula o reajuste salarial de funcionários de uma empresa de Presidente Prudente-SP.  
O usuário informa os dados de um funcionário e o aplicativo retorna todos os dados fornecidos, além do **novo salário reajustado** com base em regras pré-definidas segundo idade, sexo e tempo de empresa.

---

## Funcionalidades
- Recebe dados do funcionário via URL.
- Valida os dados informados:
  - Idade maior que 16 anos.
  - Salário base como número real válido.
  - Ano de contratação maior que 1960.
  - Matrícula maior que 0.
  - Sexo deve ser "M" ou "F".
- Calcula o reajuste salarial considerando:
  - Faixa etária e sexo do funcionário.
  - Tempo de empresa para aplicar descontos ou acréscimos.
- Exibe os dados do funcionário e o **novo salário** de forma dinâmica em uma página HTML.
- Mensagem de erro clara quando os dados são inválidos.

---

## Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **HTML**
- Editor de código: **VSCode**

---

## Como Executar o Projeto

1. **Clonar o repositório**
```bash
git clone <URL_DO_REPOSITORIO>
Instalar dependências

bash
Copiar código
npm install
Executar o servidor

bash
Copiar código
node index.js
Acessar o aplicativo via navegador
Digite na barra de endereços a URL com os dados do funcionário. Exemplo:

bash
Copiar código
http://localhost:3000/reajuste?idade=25&sexo=F&salario=2000&anoContratacao=2018&matricula=12345
Visualizar o resultado

A página exibirá os dados do funcionário e o novo salário reajustado.

Caso algum dado seja inválido, uma mensagem de erro será exibida indicando as regras a serem seguidas.
````
## Breno Freguglia
