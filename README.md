
# Projeto de automação com Cypress, Docker e SonarQube

O Zombie+ é uma aplicação que simula uma plataforma de streaming que ainda não foi lançada. No sistema atual, as pessoas podem se cadastrar para receberem uma oferta quando a aplicação for lançada. Além disso, o administrador consegue cadastrar filmes, séries e gerenciar os leads.

Esse projeto tem como intuito mostrar como utilizar a automação de testes utilizando o Cypress e configurando um ambiente de testes simulando o ambiente de produção. Além disso, também foi configurado para que o Sonar verifique a qualidade do código dos testes.

Você vai encontrar um projeto de teste que cobre cenários de front-end e back-end, além de integrações diretas com o banco de dados para gerenciar a massa de teste.

A aplicação aqui utilizada faz parte do [curso de Playwright](https://www.udemy.com/course/playwright-zombie) ministrado pelo [Papito](https://www.linkedin.com/in/papitodev/) (curso que eu recomendo demais).

## Tecnologias usadas

Para a automação foi utilizado o framework [Cypress.io](https://docs.cypress.io/guides/getting-started/installing-cypress) na sua versão 13.14.2. Para auxiliar o desenvolvimento dos testes foram utilizadas as bibliotecas:
- **faker-js** (v9.0): para geração de dados fakes
- **cypress-mochawesome-reporter** (v3.8.2): para geração de relatórios
- **cypress-plugin-api** (v2.11.2): para melhor visualização das requests
- **pg** (v8.12.0): biblioteca para integração do Cypress com o PostgreSQL

Para a configuração do ambiente de testes:
- **Node.js** (v19.1.0)
- **Npm** (8.19.3)
- **Docker Desktop** (v20.10.21)
- **Docker compose** (v2.13.0)
- **Aplicação Zombie+**
- **PostgreSQL**

## Configuração do ambiente

Primeiramente, instale o Docker, o Docker Compose e o Node. Após a instalação, clone o projeto no diretório de sua escolha. Abra o terminal e digite:

`git clone git@github.com:EderCuer/projeto-cypress.git`

Antes de subirmos o ambiente com o Docker, precisamos fazer um pequeno ajuste para evitar erros no buil do projeto. No diretório `projeto-cypress/apps/zombieplus/api`, verifique se a formatação dos arquivos `db.sh`, `entrypoint.sh` e `wait-for.sh` estão em formato LF (pode ocorrer de estarem CRLF).

![formatação](https://i.ibb.co/QCkwkmB/crlf-lf.png)

No VSCode, clique no local indicado acima. Na caixa de seleção que irá aparecer, selecione a opção LF.

![formatação LF](https://i.ibb.co/mTzNypm/Captura-de-tela-2024-09-22-202030.png)

Após clonar o projeto, inicie o Docker (caso seja o Docker Desktop), acesse a pasta do projeto e digite:

`docker-compose up --build`

Quando os três containers estiverem executando, acesso `http://localhost/3000/admin/login` e verifique se o ambiente está ok. Faça o login para garantir que tudo está funcionando corretamente (user: admin@zombiplus.com, senha: pwd123).

## Cenários cobertos

Os testes cobrem tanto cenários de front-end quanto de back-end. No front-end temos as features:
- Login
- Leads
- Filmes
- Séries

No back-end temos os endpoints:
- sessions
- leads
- companies
- movies
- tvshows

### Padrões utilizados

Para a melhor organização do projeto, foram utilizados alguns padrões de projeto e boas práticas no desenvolvimentos dos scripts de teste.

Na escrita dos testes Web foi utilizada a técnica [Four-Phase Test](https://thoughtbot.com/blog/four-phase-test) para melhor visualização e entendimento do código.

![padrão four-phase test](https://i.ibb.co/CPwnS68/Captura-de-tela-2024-09-17-065950.png)

Além disso, também foi utilizado o padrão de projeto [Application Actions](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions). A abordagem segue um modelo parecido com o Page Objects e também é mais indicado para o Cypress. Também foram criados arquivos contendo os elementos de cada página para que não haja duplicação de código, evitando assim complexidade na manutenção do código posteriormente.

O projeto foi desenvolvido para que suas funções sejam reutilizáveis entre os cenários, tornando o código limpo e de fácil leitura.

![app actions](https://i.ibb.co/MRFBd4x/Captura-de-tela-2024-09-17-070506.png)

![mapeamento dos elementos](https://i.ibb.co/2hgjGQK/Captura-de-tela-2024-09-17-070551.png)


## Executando os testes

Após a configuração do ambiente, dentro do projeto, execute:

`npm install`


Após a instalação das dependências do projeto, já podemos executar os testes. O projeto possui 4 scripts:
- `npm run cy:open`: abre a interface gráfica do Cypress
- `npm run regression:front`: executa os testes Web em modo headless
- `npm run regression:back`: executa os testes de API em modo headless
- `npm run cy:regression`: executa todos os testes em modo headless

Execute um dos comandos no terminal que os testes iniciarão.

![execução](https://i.ibb.co/2SmBjBc/Captura-de-tela-2024-09-16-164334.png)

## Bônus

Nesse projeto também foi adicionado um relatório para visualização das execuções. Após a execução dos testes, um relatório é gerado na pasta `cypress/reports`

![relatório dos testes](https://i.ibb.co/MSq8BHw/Captura-de-tela-2024-09-16-164709.png)

## Pipeline

Nesse projeto foi configurado para que o ambiente seja configurado na pipeline, assim como a execução dos testes e a geração do relatório.

![pipeline](https://i.ibb.co/pWprr4p/pipeline.png)

O relatório está integrado com o Github Pages, então a cada nova execução é feito o deploy com o relatório da execução

![deploy](https://i.ibb.co/QJvvVBB/deploy.png)

![relatório online](https://i.ibb.co/PjQqc0R/relatorio-online.png)

### Steps da pipeline

A pipeline é executada em 9 etapas:

![etapas da pipeline](https://i.ibb.co/ZJ22SG6/Captura-de-tela-2024-09-22-201258.png)

### SonarQube

Utilizei o SonarCloud para hospedar um projeto exemplo para visualizarmos o resultado da análise da qualidade do código. Após a finalização da execução, podemos acessar o projeto no [SonarCloud](https://sonarcloud.io/project/overview?id=EderCuer_projeto-cypress)

![projeto no sonarcloud](https://i.ibb.co/rv2K5SC/Captura-de-tela-2024-09-22-201819.png)
 