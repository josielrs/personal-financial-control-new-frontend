# Bem Vindo ao SMART FIN - Controle Financeiro Pessoal!

Este projeto é um front-end de uma aplicação cujo propósito é auxiliar o usuário no controle de seus gastos mensais, registrando receitas, despesas e reservas num só lugar possibilitando ao usuário uma visão mais ampla de como sua vida financeira acontece, de onde vem as receitas, quanto elas são, e pra onde elas estão indo. Desta forma o usuário poderá tomar decisões mais estratégicas alinhadas com seus objetivos pessoais.


## ARQUIVOS

Segue abaixo uma descrição da estrutura do projeto

### assets

Arquivos estáticos da aplicação, tais como icones e imagens

### components

Componentes REACT que compem a aplicação

#### CreditCard

Componente referente ao grid de Cartão de Crédito

#### CreditCardForm

Componente referente ao formulário de cadastro/edição de um cartão de crédito

#### FinancialControlEntry

Componente referente ao grid de movimentações financeiras pertencentes a um controle mensal 

#### FinancialEntry

Componente referente ao grid de movimentações financeiras em geral da aplicação

#### FinancialEntryForm

Componente referente ao formulário de cadastro/edição de movimentações financeiras.

#### InitialInformation

Componente referente aos dados das movimentações financeiras correntes que são apresentadas na tela inicial da aplicação

#### MainContent

Component referente a estrutura principal da pagina da aplicação, nela temos o titulo da aplicação e o menu

#### Menu

Component referente ao menu da aplicação.

### pages

As paginas que compoem a aplicação

#### CreditCardMenu

Pagina da aplicação para cadastro, edição e exclusão de cartão de crédito.

#### FinancialControlMenu

Pagina da aplicação para montagem e edição de controles mensais

#### FinancialEntryMenu

Pagina da aplicação para cadastro, edição e exclusão de movimentações finaceiras

#### NotFoundPage
 
Pagina da aplicação para rotas incorretas

### App

Pagina principal da aplicação

### index.css

Aquivo CSS da aplicação

## PROTOTIPO DO FRONT-END DA APLICAÇÃO

Segue abaixo o link figma para navegação no protótipo da aplicação.

PARA AMBOS LINKS UTILIZAR A SENHA: emblem-relate-botany-plane

### Prototipo DESKTOP

https://www.figma.com/proto/DcCaO9oNCeLPuDfWPlVEBN/Untitled?node-id=16-2175&p=f&m=dev&scaling=scale-down&content-scaling=fixed&page-id=14%3A1168&starting-point-node-id=16%3A2175&t=tYZAKwMaNCVxNOjC-1

### Prototipo MOBILE

https://www.figma.com/proto/DcCaO9oNCeLPuDfWPlVEBN/Untitled?node-id=4-802&p=f&m=dev&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=4%3A802&t=OVZb0SvBX92Kiv0y-1


## COMO EXECUTAR

Será necessário ter NodeJS instalado (estou utilizando a versão 22.16.0) e também subir a aplicação BACK-END utilizada pela aplicação.

> Precisaremos subir o BACK-END da aplicação que pode ser acesso pelo link: https://github.com/josielrs/personal-financial-control-app , neste link você terá instruções para subir a aplicação.

Após o back-end estiver rodando, será necessário instalar as dependencias atráves do comando

```
npm install
```

Após isso basta subir o nosso servidor

```
npm start
```

Abra o [http://localhost:3000](http://localhost:3000) no navegador para verificar o status da API em execução.