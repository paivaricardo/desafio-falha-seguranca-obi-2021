import * as readline from "readline";
import chalk from "chalk";

// Variáveis globais da aplicação
// Constantes
const maxEntradas = 20000;
const padraoSenha = /^[a-z][a-z0-9]{0,9}$/;

// Dados de entrada
let numeroEntradas = 0;
let arraySenhasDigitadas = [];

// Função para verificar se uma senha individual digitada corresponde ao padrão: apenas letras minúsculas sem acento e dígitos de 0 a 9, com mínimo de 1 caracter e máximo de 10 caracteres
function verificarPadraoSenha(senha, regexPadraoSenha = padraoSenha) {
  return regexPadraoSenha.test(senha);
}

// Função para verificar se todas as senhas do array correspondem ao padrão
function verificarSenhasDigitadas(arraySenhas) {
  return arraySenhas.reduce((a, b) => {
    return a && verificarPadraoSenha(b);
  }, true);
}

function verificarLinhasSenhasForaPadrao(arraySenhas) {
  let arraySenhasForaPadrao = [];

  arraySenhas.forEach((senha, index) => {
    if (!verificarPadraoSenha(senha)) {
      arraySenhasForaPadrao.push(index + 1);
    }
  });

  return arraySenhasForaPadrao;
}

//  Função principal, que retorna o número de incidentes de segurança, no qual um usuário, utilizando sua senha, consegue acesso à conta de outro usuário (ou seja, a senha digitada é uma substring de outra). Complexidade temporal do algoritmo: O(n^2)
export function retornaNumeroIncidentes(arraySenhas) {
  const n = arraySenhas.length;
  let numeroIncidentesSenhas = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i != j && arraySenhas[i].includes(arraySenhas[j])) {
        numeroIncidentesSenhas++;
      }
    }
  }

  return numeroIncidentesSenhas;
}

// Função geral que verifica o atendimento às restrições fornecidas nas instruções do problema. Se todas as condições forem atendidas, chama a função para calcular o número de incidentes de segurança (usuários que logram acesso a conta de outros utiliza)
function verificarFalhasSeguranca(n, arraySenhas) {
  if (n == 1) {
    return "Não é possível fazer a verificação de possibilidades de incidente de segurança com apenas um usuário.";
  } else if (n > maxEntradas) {
    return `Erro: O número de senhas é maior que o máximo permitido (${maxEntradas}).`;
  } else if (arraySenhas.length !== n) {
    return "Erro: O número de senhas não corresponde à quantidade de usuários no sistema.";
  } else if (!verificarSenhasDigitadas(arraySenhas)) {
    let arraySenhasForaPadrao = verificarLinhasSenhasForaPadrao(arraySenhas);

    if (arraySenhasForaPadrao.length === 1) {
      return `Erro: a entrada contém uma senha inválida na linha ${arraySenhasForaPadrao} (padrão correto: inicia com letra minúscula sem acento e possui apenas letras minúsculas sem acento e dígitos de 0 a 9, com extensão mínima de 1 caracter e máxima de 10 caracteres).`;
    } else {
      return `Erro: a entrada contém senhas inválidas nas linhas ${arraySenhasForaPadrao} (padrão correto: inicia com letra minúscula sem acento e possui apenas letras minúsculas sem acento e dígitos de 0 a 9, com extensão mínima de 1 caracter e máxima de 10 caracteres).`;
    }
  } else {
    return `Saída: ${retornaNumeroIncidentes(arraySenhas)}`;
  }
}

function createReadLineInterface() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });
  return rl;
}

// Comandos para a execução do programa em linha de comando, solicitando as entradas do usuário:
async function promptSingleLine(
  comando,
  restricao,
  respostaBooleana = false,
  callbackRespostaBooleana = resposta => true
) {
  const rl = createReadLineInterface();

  return await new Promise((resolve, reject) => {
    rl.question(comando, (resposta) => {
      rl.close();

      if (restricao(resposta)) {
        if (respostaBooleana) {
          resolve(callbackRespostaBooleana(resposta));
        } else {
          resolve(resposta);
        }
      } else {
        reject();
      }
    });
  });
}

async function promptMultiLine(comando, extensao) {
  const rl = createReadLineInterface();
  let inputArray = [];

  console.log(comando);

  return await new Promise((resolve) => {
    rl.on("line", (line) => {
      inputArray.push(line);

      if (inputArray.length >= extensao) {
        rl.close();
        resolve(inputArray);
      }
    });
  });
}

const restringirNumeroEntradas = (input) =>
  Number.isInteger(Number(input)) &&
  Number(input) >= 1 &&
  Number(input) <= maxEntradas;

async function promptEntradas() {
  const logPromptEntrada = chalk.green(
    "Digite o número de usuários do sistema (N):\n"
  );

  return await new Promise(async (resolve) => {
    try {
      let numeroEntradas = Number(
        await promptSingleLine(logPromptEntrada, restringirNumeroEntradas)
      );
      resolve(numeroEntradas);
    } catch (error) {
      const logError = chalk.red(
        `Digite uma entrada numérica válida, correspondente a um número inteiro menor que ${maxEntradas} e maior que zero.`
      );
      console.log(logError);
      promptEntradas();
    }
  });
}

async function promptSenhas() {
  const promptText = chalk.blue(
    (() => {
      if (numeroEntradas == 1) {
        return "Digite a senha do usuário do sistema.";
      } else {
        return `Digite a senha de cada usuário no sistema (${numeroEntradas} usuário${
          numeroEntradas === 1 ? "" : "s"
        }), uma por linha. O programa vai parar quando a quantidade de senhas digitadas for igual à de usuários.`;
      }
    })()
  );

  return await promptMultiLine(promptText, numeroEntradas);
}

async function app() {
  let continuarExecucao = true;

  const textoBoasVindasDivider = chalk.blueBright('-'.repeat(60));
  const textoBoasVindasL1 = chalk.blueBright(`FALHA DE SEGURANÇA - OBI 2021 - Nível 2 - FASE 3`);
  const textoBoasVindasL2 = chalk.blueBright('Este programa implementa a solução para o problema "Falha de Segurança" da XXIV Olimpíada Brasileira de Informática (2021), Fase 3, consistente na verificação do número de pares ordenados (A,B) distintos de usuários tal que o usuário A, usando sua senha, consegue acesso à conta do usuário B. No caso, há uma falha de segurança no sistema, na qual se a senha digitada contiver, como subcadeia contígua, a senha correta, o sistema permite, indevidamente, o acesso.\n');
  const textoBoasVindasL3 = chalk.blueBright('Link para a página do problema: https://olimpiada.ic.unicamp.br/pratique/p2/2021/f3/falha/');

  console.log(textoBoasVindasDivider);
  console.log(textoBoasVindasL1);
  console.log(textoBoasVindasDivider);
  console.log(textoBoasVindasL2);
  console.log(textoBoasVindasL3);
  console.log(textoBoasVindasDivider);


  while (continuarExecucao) {
    numeroEntradas = await promptEntradas();
    arraySenhasDigitadas = await promptSenhas();

    const saidaPrograma = chalk.yellow(
      verificarFalhasSeguranca(numeroEntradas, arraySenhasDigitadas)
    );

    console.log(saidaPrograma);

    let continuarExecucaoResposta = await promptSingleLine(
      'Deseja fazer outra verificação? (digite S para "sim" ou qualquer outra tecla para "não"): ',
      () => true,
      true,
      resposta => /^s$/i.test(resposta)
    );

    if (!continuarExecucaoResposta) {
      console.log('Programa encerrado.');
      continuarExecucao = false;
    }
  }
}

// Rodar o app
app();
