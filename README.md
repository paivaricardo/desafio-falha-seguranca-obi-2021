# Desafio Falha de Segurança

Implementação de uma solução para o desafio "Falha de Segurança", da XXIV Olimpíada Brasileira de Informática, ano 2021, Fase 3, na forma aplicativo com interface em linha de comando, em Node.js (JavaScript).

O problema consiste na verificação do número de pares ordenados (A,B) distintos de usuários tal que o usuário A, utilizando sua senha, consegue acesso à conta do usuário B. No caso, há uma falha de segurança no sistema, na qual se a senha digitada contiver, como subcadeia contígua, a senha correta, o sistema permite, indevidamente, o acesso.

Link para a página da OBI, contendo a descrição do problema: https://olimpiada.ic.unicamp.br/pratique/p2/2021/f3/falha/

## Executando a aplicação
Para executar a aplicação, é necessário primeiramento realizar o clone do repositório em seu computador, com o comando `git clone https://github.com/paivaricardo/desafio-falha-seguranca-obi-2021.git` em seu terminal.

É necessário possuir o Node instalado na sua máquina, que pode ser baixado por meio do site https://nodejs.org/en/download/. A versão utilizada para o projeto foi a 16.16.0.

Após instalado o Node na máquina e clonado o repositório do projeto, faz-se necessário navegar até a pasta raiz do projeto (por meio do comando `cd` e instalar as dependências da aplicação, com uso do comando `npm install` (com o diretório de trabalho na pasta raiz).

Por fim, o projeto pode ser executado por meio do comando `npm start`.